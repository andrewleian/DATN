/**
 * Dự án tốt nghiệp Foly
 * <p>
 * PromotionServiceImpl.java tientv34
 * <p>
 * tháng 6 2023
 */
package com.example.datnbe.service.impl;

import com.example.datnbe.domain.ProductColorSize;
import com.example.datnbe.domain.Promotion;
import com.example.datnbe.domain.PromotionDetail;
import com.example.datnbe.dto.ProductColorSizeDTO;
import com.example.datnbe.dto.PromotionDTO;
import com.example.datnbe.dto.PromotionDetailsDTO;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.exception.MyCustomException;
import com.example.datnbe.repository.ProductColorSizeRepository;
import com.example.datnbe.repository.PromotionDetailRepository;
import com.example.datnbe.repository.PromotionRepository;
import com.example.datnbe.request.ProductColorSizeRequest;
import com.example.datnbe.service.PromotionService;
import com.example.datnbe.common.CommonString;
import com.example.datnbe.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * @author tientv34
 */
@Service
public class PromotionServiceImpl implements PromotionService {
    @Autowired
    private PromotionRepository promotionRepository;
    @Autowired
    private ProductColorSizeRepository productColorSizeRepository;
    @Autowired
    private PromotionDetailRepository promotionDetailRepository;

    /**
     * tạo phiếu giảm giá theo sản phẩm
     *
     * @param promotionDTO : Thông tin cần thiết để tạo phiếu giảm giá
     * @return tạo thành công thì trả về 1 Promotion, thất bại thì trả ra exception
     * @throws MyCustomException
     */
    @Override
    @Transactional(rollbackFor = {Exception.class, Throwable.class}, timeout = 10)
    public Promotion createPromotion(PromotionDTO promotionDTO) throws CustomerException {
        try {
            if (promotionDTO == null) {
                throw new CustomerException("PromotionDTO không thể null");
            }
            BigDecimal bigDecimalValue = new BigDecimal(promotionDTO.getDiscount());
            if (!validate(bigDecimalValue)) {
                throw new CustomerException("Bạn đã nhập sai giá trị discount");
            }
            validateDatePromotion(promotionDTO.getStart_at(),promotionDTO.getEnd_at());
            Promotion promotion = new Promotion();
            Promotion promotionEntity = convertPromotionDTOtoPromotionEntity(promotionDTO, promotion);

            promotionEntity.setCreateAt(Utils.getCurrentTimestamp());
            promotionEntity.setUpdateAt(Utils.getCurrentTimestamp());
            promotionEntity.setStatus(promotionDTO.getStatus());
            Promotion promotionSave = promotionRepository.save(promotionEntity);
            if (promotionDTO.getId_product_color_size() != null || promotionDTO.getId_product_color_size().size() > 0) {
                for (ProductColorSizeRequest item : promotionDTO.getId_product_color_size()) {
                    ProductColorSize productColorSize = productColorSizeRepository.findById(item.getId()).orElse(null);
                    if (productColorSize != null) {
                        // lấy tổng giá trị giảm giá của sản phẩm xem có lớn hơn 100 không.
                        BigDecimal totalDiscount = BigDecimal.valueOf(0);
                        if (promotionRepository.totalDiscountValueByProduct(item.getId()) != null) {
                            totalDiscount = promotionRepository.totalDiscountValueByProduct(item.getId());
                            totalDiscount = totalDiscount.add(bigDecimalValue);
                        }
                        if (totalDiscount.compareTo(BigDecimal.valueOf(100)) > 0) {
                            throw new CustomerException("% Giảm giá không hợp lệ");
                        }
                        PromotionDetail promotionDetail = new PromotionDetail();
                        promotionDetail.setProductColorSize(productColorSize);
                        promotionDetail.setPromotion(promotionEntity);
                        promotionDetailRepository.save(promotionDetail);
                    } else {
                        throw new CustomerException("Product không tồn tại trong hệ thống");
                    }
                }
            }
            return promotionSave;
        } catch (CustomerException ex) {
            ex.printStackTrace();
            throw new CustomerException(ex.getError());
        }
    }

    /**
     * Get all phiếu giảm giá
     *
     * @param pageNumber
     * @param pageSize
     * @return ResponsePagination dùng để phân trang.
     */
    @Override
    public ResponsePagination getAllPromotion(String keyword, String status, int pageNumber, int pageSize)
            throws CustomerException {
//        Sort sort = Sort.by(new Sort.Direction("id"), "DESC");
        try {
            Pageable page = PageRequest.of(pageNumber - 1, pageSize);
            Page<Promotion> promotionPage = null;
            if (keyword.isEmpty() && status.isEmpty()) {
                promotionPage = promotionRepository.findAllByOrderByIdDesc(page);
            } else if (keyword.isEmpty() && !status.isEmpty()) {
                promotionPage = promotionRepository.getAllByStatus(status, page);
            } else if (!keyword.isEmpty() && status.isEmpty()) {
                promotionPage = promotionRepository.getAllByInput(keyword, page);
            } else {
                promotionPage = promotionRepository.getAllByInputAndStatus(keyword, status, page);
            }
            if (promotionPage != null) {
                List<Promotion> output = promotionPage.getContent();
                return new ResponsePagination(
                        output,
                        pageNumber,
                        promotionPage.getTotalPages(),
                        (int) promotionPage.getTotalElements(),
                        promotionPage.getSize()
                );
            } else {
                throw new CustomerException("promotion rỗng");
            }
        } catch (CustomerException ex) {
            ex.printStackTrace();
            throw new CustomerException(ex.getError());
        }


    }

    /**
     * update phiếu giảm giá
     *
     * @param promotionDTO thông tin của phiếu giảm giá cần update
     * @return Promotion nếu thành công ngược lại thì trả ra exception
     */
    @Override
    @Transactional(rollbackFor = {Exception.class, Throwable.class}, timeout = 10)
    public Promotion updatePromotion(PromotionDTO promotionDTO) throws CustomerException {
        Promotion promotion = getPromotionById(promotionDTO.getId());
        if (promotion == null) {
            throw new MyCustomException("Promotion không tồn tại");
        }
        BigDecimal bigDecimalValue = BigDecimal.valueOf(0);
        if (!promotionDTO.getDiscount().isEmpty()) {
            bigDecimalValue = new BigDecimal(promotionDTO.getDiscount());
            if (!validate(bigDecimalValue)) {
                throw new CustomerException("Bạn đã nhập sai giá trị discount");
            }
        }
        Promotion promotionEntity = convertPromotionDTOtoPromotionEntity(promotionDTO, promotion);
        promotionEntity.setUpdateAt(Utils.getCurrentTimestamp());
        promotionEntity.setStatus(promotionDTO.getStatus());
        promotionDetailRepository.deleteAllByIDPromotion(promotionDTO.getId());
        //Nếu tồn tại ID của product_color_size thì set phiếu giảm giá đó cho sản phẩm
        if (promotionDTO.getId_product_color_size().size() > 0) {
            // lấy tổng giá trị giảm giá của sản phẩm xem có lớn hơn 100 không.
            for (ProductColorSizeRequest item : promotionDTO.getId_product_color_size()) {
                ProductColorSize productColorSize = productColorSizeRepository.findById(item.getId())
                        .orElse(null);
                if (productColorSize != null) {
                    BigDecimal totalDiscount = BigDecimal.valueOf(0);
                    if (promotionRepository.totalDiscountValueByProduct(item.getId()) != null) {
                        totalDiscount = promotionRepository.totalDiscountValueByProduct(item.getId());
                        totalDiscount = totalDiscount.add(bigDecimalValue);
                    }
                    if (totalDiscount.compareTo(BigDecimal.valueOf(100)) > 0) {
                        throw new CustomerException("Giảm giá của product color size có id là " + item + " quá 100%");
                    }
                    PromotionDetail promotionDetail = new PromotionDetail();
                    promotionDetail.setProductColorSize(productColorSize);
                    promotionDetail.setPromotion(promotionEntity);
                    promotionDetailRepository.save(promotionDetail);
                } else {
                    throw new CustomerException("productColorSize có id: " + item + " không tồn tại");
                }
            }
        }
        Promotion promotionSave = promotionRepository.save(promotionEntity);
        if (promotionSave != null) {
            return promotionSave;
        } else {
            throw new CustomerException("Update promotion thất bại");
        }
    }

    /**
     * Delete phiếu giảm giá theo trạng thái.
     *
     * @param promotionId id của phiếu giảm giá cần delete
     * @return thành công -> true ngược lại false
     */
    @Override
    public Boolean deletePromotion(Long promotionId) throws CustomerException {
        Promotion promotion = getPromotionById(promotionId);
        if (promotion == null) {
            return false;
        }
        promotion.setStatus(CommonString.Status.INACTIVATED.getValue());
        Promotion promotionSave = promotionRepository.save(promotion);
        if (promotionSave != null) {
            return true;
        } else {
            throw new CustomerException("Không tìm thây promotion có id: " + promotionId);
        }
    }

    /**
     * xoá phiếu giảm xoá của 1 product color size trong promotion details
     *
     * @param idPCZ       id product color size
     * @param idPromotion id promotion
     * @return
     * @throws CustomerException
     */
    @Override
    public Boolean deletePromotionDetails(Long idPCZ, Long idPromotion) throws CustomerException {
        try {
            PromotionDetail promotionDetail = promotionDetailRepository.getPromotionDetails(idPCZ, idPromotion).orElse(null);
            if (promotionDetail != null) {
                promotionDetailRepository.deleteById(promotionDetail.getId());
                return true;
            } else {
                throw new CustomerException("Không tìm thất promotion details");
            }
        } catch (CustomerException ex) {
            ex.printStackTrace();
            throw new CustomerException(ex.getError());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Lỗi khi xoá productDetails trong promotion details" + e.getMessage());
        }
    }

    @Override
    public Promotion getPromotionById(Long promotionId) throws CustomerException {
        Promotion promotion = promotionRepository.findById(promotionId).orElse(null);
        if (promotion != null) {
            return promotion;
        } else {
            throw new CustomerException("Promotion có id " + promotionId + " không tồn tại");
        }
    }

    /**
     * Lấy ra tất cả các promotion details theo id promotion
     *
     * @param idPromotion là id củta promotion truyền vào
     * @return promotionDetailsDTO chưa thông tin của product color size and id promotion
     * @throws CustomerException
     */
    @Override
    public PromotionDetailsDTO getAllByIdPromotion(Long idPromotion) throws CustomerException {
        List<PromotionDetail> lstPromotionDetail = promotionDetailRepository.getPromotionDetailByPromotionId(idPromotion);
        if (lstPromotionDetail == null || lstPromotionDetail.size() == 0) {
            throw new CustomerException("Không tồn tại promotion có id là : " + idPromotion);
        }
        List<ProductColorSizeDTO> lstProductColorSizeDTOS = new ArrayList<>();
        for (PromotionDetail promotionDetail : lstPromotionDetail) {
            ProductColorSizeDTO productColorSizeDTO = new ProductColorSizeDTO();
            ProductColorSize productColorSize = productColorSizeRepository.findById(promotionDetail
                    .getProductColorSize()
                    .getId()).orElse(null);
            productColorSizeDTO.setId(productColorSize.getId());
            productColorSizeDTO.setName(productColorSize.getProduct().getName());
            productColorSizeDTO.setColor(productColorSize.getColor().getName());
            productColorSizeDTO.setIdPromotionDetails(promotionDetail.getId());
            lstProductColorSizeDTOS.add(productColorSizeDTO);
        }
        PromotionDetailsDTO promotionDetailsDTO = new PromotionDetailsDTO();
        promotionDetailsDTO.setIdPromotion(idPromotion);
        promotionDetailsDTO.setIdProductDetails(lstProductColorSizeDTOS);
        return promotionDetailsDTO;
    }

    public boolean validate(BigDecimal discount) {
        return discount.compareTo(BigDecimal.valueOf(0)) >= 0 && discount.compareTo(BigDecimal.valueOf(100)) <= 0;
    }

    /**
     * convert PromotionsDTO to Promotions
     *
     * @param promotionDTO
     * @param promotion
     * @return
     */
    public Promotion convertPromotionDTOtoPromotionEntity(PromotionDTO promotionDTO, Promotion promotion) {
        promotion.setTitle(promotionDTO.getTitle());
        promotion.setContent(promotionDTO.getContent());
        if (!promotionDTO.getDiscount().isEmpty()) {
            BigDecimal bigDecimalValue = new BigDecimal(promotionDTO.getDiscount());
            promotion.setDiscountValue(bigDecimalValue);
        }
        Timestamp timesStart_at = Timestamp.valueOf(promotionDTO.getStart_at() + " 00:00:00");
        Timestamp timesEnd_at = Timestamp.valueOf(promotionDTO.getEnd_at() + " 00:00:00");
        int comparisonResult_start_end = promotionDTO.getEnd_at().compareTo(promotionDTO.getStart_at());
        if (comparisonResult_start_end < 0) {
            throw new MyCustomException("Ngày kết thúc không được nhỏ hơn ngày bắt đầu");
        }
        promotion.setEndAt(timesEnd_at);
        promotion.setStartAt(timesStart_at);
        return promotion;
    }

    private void validateDatePromotion(String start_at, String end_at) throws CustomerException {
        if (start_at == null || start_at.isEmpty()) {
            throw new CustomerException("Chưa chọn ngày bắt đầu");
        }
        if (end_at == null || end_at.isEmpty()) {
            throw new CustomerException("Chưa chọn ngày kết thúc");
        }
        LocalDate currentDate = LocalDate.now(); // Lấy ngày hiện tại mà không bao gồm thông tin thời gian
        LocalDate dateStart_at = LocalDate.parse(start_at);
        LocalDate dateEnd_at = LocalDate.parse(end_at);
        int comparisonResult_start = dateStart_at.compareTo(currentDate);
        int comparisonResult_end = dateEnd_at.compareTo(currentDate);
        if (comparisonResult_start < 0 || comparisonResult_end < 0) {
            throw new MyCustomException("Ngày bắt đầu và ngày kết thúc không được nhỏ hơn ngày hiện tại");
        }
    }
}
