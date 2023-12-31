package com.example.datnbe.repository.impl;

import com.example.datnbe.domain.Color;
import com.example.datnbe.domain.Image;
import com.example.datnbe.domain.QColor;
import com.example.datnbe.domain.QProduct;
import com.example.datnbe.domain.QProductColorSize;
import com.example.datnbe.domain.QProductDetail;
import com.example.datnbe.dto.ColorDTO;
import com.example.datnbe.dto.ProductDetailCustomerDTO;
import com.example.datnbe.dto.SizeProductDetailDTO;
import com.example.datnbe.repository.ColorRepository;
import com.example.datnbe.repository.ImageRepository;
import com.example.datnbe.repository.PromotionRepository;
import com.example.datnbe.repository.custom.CustomProductColorSizeRepository;
import com.example.datnbe.request.ProductDetailSearchRequest;
import com.querydsl.core.QueryResults;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class CustomProductColorSizeRepositoryImpl implements CustomProductColorSizeRepository {
    private final PromotionRepository promotionRepository;
    private final ImageRepository imageRepository;
    private final CustomProductDetailRepositoryImpl customProductDetailRepository;
    @PersistenceContext
    private EntityManager em;
    private final ColorRepository colorRepository;
    private final ModelMapper modelMapper;
    private QProduct p = QProduct.product;
    private QColor co = QColor.color;
    private QProductColorSize pcs = QProductColorSize.productColorSize;
    private QProductDetail pd = QProductDetail.productDetail;

    @Override
    public List<ProductDetailCustomerDTO> getAll(Pageable pageable, ProductDetailSearchRequest request
    ) {
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(em);

        JPAQuery<Tuple> query = jpaQueryFactory.select(
                        p.id,
                        pcs.id,
                        p.name,
                        p.productCode,
                        p.manufacturer,
                        pcs.price,
                        p.isBestSeller,
                        p.isNew,
                        co.id,
                        pcs.status
                ).from(pcs)
                .join(p).on(p.id.eq(pcs.product.id))
                .join(co).on(pcs.color.id.eq(co.id))
                .join(pcs).on(pcs.id.eq(pd.productColorSize.id))
                //TODO
//                 .join(s).on(s.id.eq(pd.size.id))
//                 .leftJoin(prd).on(pcs.id.eq(prd.productColorSize.id))
//                 .leftJoin(pr).on(pr.id.eq(prd.promotion.id))
//                 .leftJoin(cd).on(p.id.eq(cd.product.id))
//                 .leftJoin(ca).on(ca.id.eq(cd.category.id))
//                 .where(pcs.status.endsWithIgnoreCase("active"))
                .groupBy(pcs.id)
                .orderBy(
                        pcs.id.desc()
//                        pcs.updateAt.asc()
                )
//                .orderBy()
                ;
        if (request.getStatus() != null && request.getStatus().equalsIgnoreCase("Active")) {
            query.where(pcs.status.eq("active"));
        }
        if (request.getIdPcs() != null && request.getIdPcs() != 0) {
            query.where(pcs.id.eq(request.getIdPcs()));
        }

        if (request.getId() != null && request.getId() > 0) {
            query.where(pcs.id.eq(request.getId()));
        }
        if (request.getTuKhoa() != null) {
            query.where(p.name.contains(request.getTuKhoa())
                            .or(p.manufacturer.contains(request.getTuKhoa()))
                            .or(p.productCode.contains(request.getTuKhoa()))
//                    .or(co.name.contains(request.getTuKhoa()))
            );
        }
        if (request.getColor() != null) {
            query.where(co.name.contains(request.getColor()));
        }

        if (request.getMinPrice() != null && request.getMinPrice() != 0) {
            query.where(pcs.price.goe(request.getMinPrice()));
        }

        if (request.getMaxPrice() != null && request.getMaxPrice() != 0) {
            query.where(pcs.price.loe(request.getMaxPrice()));
        }

        if (request.getManufacturer() != null) {
            query.where(p.manufacturer.eq(request.getManufacturer()));
        }

        if (request.getIsBestSeller() != null && request.getIsBestSeller() == 1) {
            query.where(p.isBestSeller.eq(1));
        }

        if (request.getIsNew() != null && request.getIsNew() == 1) {
            query.where(p.isNew.eq(1));
        }

        QueryResults<Tuple> productQueryResults = query.offset(pageable.getOffset()).limit(pageable.getPageSize()).fetchResults();
        List<ProductDetailCustomerDTO> productDetailDTOS = productQueryResults.getResults().stream().map(tuple -> {
            Long productId = tuple.get(0, Long.class);
            Long pcsId = tuple.get(1, Long.class);
            String name = tuple.get(2, String.class);
            String productCode = tuple.get(3, String.class);
            String manufacturer = tuple.get(4, String.class);
            int unitPrice = tuple.get(5, Integer.class);
            int isNew = tuple.get(7, Integer.class);
            int isBestSeller = tuple.get(6, Integer.class);
            String colorId = tuple.get(8, String.class);
            String status = tuple.get(9, String.class);


            //Code cần tối ưu
            //TODO
            // List<String> categoryNames = categoryRepository.getCategoriesByProductId(productId);
            List<Image> images = imageRepository.getImageCodeByPcsId(pcsId);
            List<SizeProductDetailDTO> sizePds = customProductDetailRepository.getAllSizePd(pcsId);
            Optional<Color> colorOptional = colorRepository.findById(colorId);
            Integer promotionValue = promotionRepository.getByIdProDuctColorSize(pcsId);
            Integer promotionValueChecked = promotionValue == null ? 0 : promotionValue;

            ProductDetailCustomerDTO pdCustomer = new ProductDetailCustomerDTO();
            pdCustomer.setIdPcs(pcsId);
            pdCustomer.setName(name);
            pdCustomer.setManufacturer(manufacturer);
            pdCustomer.setPrice(unitPrice);
            pdCustomer.setId(productId);
            pdCustomer.setIsBestSeller(isBestSeller);
            pdCustomer.setIsNew(isNew);
            pdCustomer.setProductCode(productCode);
            pdCustomer.setPromotionValue(promotionValueChecked / 100d);
            pdCustomer.setStatus(status);
            colorOptional.ifPresent(color -> {
                ColorDTO dto = modelMapper.map(color, ColorDTO.class);
                pdCustomer.setColorDTO(dto);
            });
            //TODO
            // if (categoryNames.size() == 0) {
            //  productDetailDTO.setCategories(null);
            // } else {
            //  productDetailDTO.setCategories(categoryNames);
            // }

            if (images.size() == 0) {
                pdCustomer.setImages(null);
            } else {
                pdCustomer.setImages(images);
            }

            if (sizePds.size() == 0) {
                pdCustomer.setSizeProductDetailDTOS(null);
            } else {
                pdCustomer.setSizeProductDetailDTOS(sizePds);
            }

            return pdCustomer;
        }).collect(Collectors.toList());
        if (request.getSize() != null) {
            List<ProductDetailCustomerDTO> filteredProducts = productDetailDTOS.stream()
                    .filter(product -> Optional.ofNullable(product.getSizeProductDetailDTOS())
                            .orElse(Collections.emptyList())
                            .stream()
                            .anyMatch(size -> size.getName().equals(request.getSize()))
                    )
                    .collect(Collectors.toList());
            return filteredProducts;
        }

        if (request.getIsOnPromotion() != null && request.getIsOnPromotion() == 1) {
            List<ProductDetailCustomerDTO> filteredProducts = productDetailDTOS.stream()
                    .filter(product -> product.getPromotionValue() > 0)
                    .collect(Collectors.toList());
            return filteredProducts;
        }

        return productDetailDTOS;
    }


}
