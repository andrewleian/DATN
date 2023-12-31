package com.example.datnbe.service.impl;

import com.example.datnbe.common.CommonString;
import com.example.datnbe.domain.Cart;
import com.example.datnbe.domain.CartDetail;
import com.example.datnbe.domain.Customer;
import com.example.datnbe.domain.ProductDetail;
import com.example.datnbe.dto.CartDTO;
import com.example.datnbe.dto.CartDetailDTO;
import com.example.datnbe.dto.SizeCartDetailDTO;
import com.example.datnbe.dto.ShowCartDetail;
import com.example.datnbe.exception.MyCustomException;
import com.example.datnbe.repository.CartDetailRepository;
import com.example.datnbe.repository.CartRepository;
import com.example.datnbe.repository.CustomerRepository;
import com.example.datnbe.repository.ProductDetailRepository;
import com.example.datnbe.service.CartDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CartDetailImpl implements CartDetailService {
    @Autowired
    CartDetailRepository cartDlRepository;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ProductDetailRepository productDelRepo;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<ShowCartDetail> getAllCart() {

        List<Object[]> results = cartDlRepository.getAllCartDetail(cartRepository.getIdCart(getIdCustomer().get().getId()));
        return results.stream().map(result -> {
            Long id = (Long) result[0];
            Long cartId = (Long) result[1];
            Long productDetailId = (Long) result[2];
            Integer amount = (Integer) result[3];
            String sizeName = (String) result[4];
            String colorName = (String) result[9];
            Integer soLuongKho = (Integer) result[5];
            Integer priceProduct = (Integer) result[6];
            Long idPsc = (Long) result[7];
            String namProduct = (String) result[8];
            List<Object[]> sizeProductDetails = productDelRepo.getSizes(idPsc);
            List<SizeCartDetailDTO> sizes = new ArrayList<>();
            for (Object[] sizeProduct : sizeProductDetails) {
                String sizeNames = (String) sizeProduct[0];
                int amounts = (int) sizeProduct[1];
                Long idproducDetail = (Long) sizeProduct[2];
                SizeCartDetailDTO sizeCartDTO = new SizeCartDetailDTO(sizeNames, amounts, idproducDetail);
                sizes.add(sizeCartDTO);
            }
            List<String> imageCodes = cartDlRepository.getImage(idPsc);
            String firstImageCode = "";
            if (!imageCodes.isEmpty()) {
                firstImageCode = imageCodes.stream().findFirst().orElse(null);
            }
            String messages = "";
            if (amount > soLuongKho) {
                messages = "Sản phẩm chỉ còn " + soLuongKho + ",Vui lòng cập nhật lại số lượng";
            } else {
                messages = "Còn hàng ";
            }

            float remainder = discountValue(idPsc).floatValue()/100f;
//            System.out.println("Giá trị" + remainder);
            ShowCartDetail dto = new ShowCartDetail(id, cartId, productDetailId, idPsc, namProduct, amount, priceProduct, soLuongKho, sizeName, colorName, firstImageCode, messages,remainder,sizes);
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public CartDetailDTO addToCartDetail(CartDetailDTO dto) throws MyCustomException {
        List<String> errors = new ArrayList<>();
        ProductDetail checkIdProductDetail = productDelRepo.checkProductDetail(dto.getProductDetailId());
        if (checkIdProductDetail == null) {
            throw new MyCustomException("Không tìm thấy id ProductDetail nào có id : " + dto.getProductDetailId());
        }
        // check đã có giỏ hàng chưa, chưa thì tạo.
        addCart();
        Long idCart = cartRepository.getIdCart(getIdCustomer().get().getId());
        CartDetail checkAmountAndProductInCartDL = cartDlRepository.checkSoLuongProducDetailInCartDL(dto.getProductDetailId(), idCart);
        int checkSlKho = productDelRepo.checkSoluongProducDl(dto.getProductDetailId());

        // check SL input  > SL kho
        if (dto.getAmount() > checkSlKho && checkAmountAndProductInCartDL == null) {
            throw new MyCustomException("Số lượng bạn mua vượt quá số lượng trong kho: kho còn :" + checkSlKho + "sản phẩm");
        } else if (checkAmountAndProductInCartDL != null) { // số lượng ( input + trong cart_detai) > SL kho
            if ((dto.getAmount() + checkAmountAndProductInCartDL.getAmount()) > checkSlKho) {
                throw new MyCustomException("Số lượng trong kho không còn đủ còn :" + (checkSlKho - checkAmountAndProductInCartDL.getAmount()));
            }
        }

        dto.setCartId(idCart);
        dto.setStatus(CommonString.Status.ACTIVATED.getValue());
        System.out.println("show cart : " + cartRepository.getIdCart(getIdCustomer().get().getId()));
        // check xem Sp có trong giỏ hàng chưa
        // sản phẩm có trong giỏ update số lượng
        if (checkAmountAndProductInCartDL != null) {
            dto.setId(checkAmountAndProductInCartDL.getId());
            dto.setAmount(dto.getAmount() + checkAmountAndProductInCartDL.getAmount());
            CartDetail cartDetail = modelMapper.map(dto, CartDetail.class);
            cartDlRepository.save(cartDetail);
            return modelMapper.map(cartDetail, CartDetailDTO.class);
        }
        dto.setAmount(dto.getAmount());  // chưa có add bình thường
        CartDetail cartDetail = modelMapper.map(dto, CartDetail.class);
        cartDlRepository.save(cartDetail);
        return modelMapper.map(cartDetail, CartDetailDTO.class);
    }

    @Override
    public CartDetailDTO updateToCartDetail(CartDetailDTO dto) throws MyCustomException {
        Optional<CartDetail> getCartDL = cartDlRepository.findById(dto.getId());
        if (!getCartDL.isPresent()) {
            throw new MyCustomException("Không tìm thấy cart detail nào có id : " + dto.getId());
        }
        int checkSlKho = productDelRepo.checkSoluongProducDl(dto.getProductDetailId());
        CartDetail checkSLProductInCartDl = cartDlRepository.checkSoLuongProducDetailInCartDL(dto.getProductDetailId(), cartRepository.getIdCart(getIdCustomer().get().getId()));
        // check sL thay đổi còn size thì không
        if (dto.getAmount() > checkSlKho) {
            throw new MyCustomException("Hiện tại sản phẩm trong kho chỉ còn :" + (checkSlKho));
        }
        dto.setStatus(CommonString.Status.ACTIVATED.getValue());
        // cần check khi nó đổi thằng size thành 1 thằng size khác == trùng Product detail
        // - delete cái thằng đó đổi số lượng đó đi , và cộng số lượng lại

        CartDetail cartDetail = modelMapper.map(dto, CartDetail.class);
        cartDlRepository.save(cartDetail);
        return modelMapper.map(cartDetail, CartDetailDTO.class);
    }

    @Override
    public String deleteOutCart(Long id) throws MyCustomException {
        Optional<CartDetail> cart = cartDlRepository.findById(id);
        if (!cart.isPresent()) {
            new MyCustomException("Không có sản phẩm có id này trong giỏ hàng id:  " + id);
        }
        cartDlRepository.deleteById(id);
        return "Delete sản phẩm thành công";
    }

    @Override
    @Transactional
    public String deleteAll() {
        Long idCart = cartRepository.getIdCart(getIdCustomer().get().getId());
        if (idCart != null) {
            cartDlRepository.deleteAllByCartId(idCart);
        }
        return "Bạn đã xóa hết sản phẩm trong giỏ hàng";
    }

    @Override
    public int countProductDetailInCart() {
        return cartDlRepository.countProducts(getIdCustomer().get().getId());
    }

    int CheckCart() {  // check xem cart có chưa
        int countCart = cartRepository.checkCart(getIdCustomer().get().getId());
        return countCart;
    }

    //tạo giỏ hàng cho khách nếu chưa có
    void addCart() throws MyCustomException {
        CartDTO cartDto = new CartDTO();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        // check id khách hàng
        if (!getIdCustomer().isPresent()) {
            throw new MyCustomException("Khách hàng chưa đăng nhập không thể tạo giỏ hàng");
        }
        if (CheckCart() == 0) {
            // add cart
            cartDto.setCreateAt(timestamp);
            cartDto.setUpdateAt(timestamp);
            cartDto.setStatus(CommonString.Status.ACTIVATED.getValue());
            cartDto.setCustomerId(getIdCustomer().get().getId());
            Cart cartMd = modelMapper.map(cartDto, Cart.class);
            cartRepository.save(cartMd);
        } else {
            new MyCustomException("Khách hàng chưa đăng nhập không thể tạo giỏ hàng");
        }
    }

    //Lấy id của thàng khách hàng qua usename
    Optional<Customer> getIdCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String usename = authentication.getName();
        return customerRepository.findByUsername(usename);
    }

    @Override
    public List<CartDetailDTO> saveAll(List<CartDetailDTO> dtos) throws MyCustomException {
        //note : kiểm tra id_ProdcutDetail có không ,lấy sản phẩm chưa có in cart add vào, có 0 add
        if (dtos.size() == 0) {
            throw new MyCustomException("Không số sản phẩn nào truyền vào");
        }
        List<Long> getListId = dtos.stream().map(CartDetailDTO::getProductDetailId).collect(Collectors.toList());
        List<ProductDetail> checkProductDetail = productDelRepo.checkProductDetails(getListId);
        if (checkProductDetail != null) {
            for (ProductDetail pro : checkProductDetail) { ///2
                for (Long id : getListId) {  //3
                    if (id == pro.getId() && getListId.size() > checkProductDetail.size()) {
                        throw new MyCustomException("Không tìm thấy id");
                    }
                }
            }
        }

        // check đã có giỏ hàng chưa, chưa thì tạo.
        addCart();
        Long idCart = cartRepository.getIdCart(getIdCustomer().get().getId());
        List<CartDetail> checkSoLuongInCart = cartDlRepository.checkAmountProducInCartAll(getListId, idCart); //lấy list trong cart
        dtos.forEach(dto -> dto.setStatus(CommonString.Status.ACTIVATED.getValue()));
        // check xem Sp có trong giỏ hàng chưa , chưa thì add
        // sản phẩm có trong giỏ thì ko add vào nữa
        Set<Long> idSet = checkSoLuongInCart.stream().map(obj -> obj.getProductDetail().getId()).collect(Collectors.toSet());
        List<CartDetailDTO> differentObjects = dtos.stream().filter(obj -> !idSet.contains(obj.getProductDetailId())).collect(Collectors.toList());
        differentObjects.forEach(obj -> obj.setCartId(idCart));
        List<CartDetail> cartDetails = differentObjects.stream()
                .map(cartDlDTO -> modelMapper.map(cartDlDTO, CartDetail.class))
                .collect(Collectors.toList());
        cartDlRepository.saveAll(cartDetails);
        return cartDetails.stream()
                .map(CartDetail -> modelMapper.map(CartDetail, CartDetailDTO.class))
                .collect(Collectors.toList());
    }

    // check số lượng khi nhấn tiếp tục thanh toán
    @Override
    public String checkSlSendBill() throws MyCustomException {
        List<CartDetail> getAll = cartDlRepository.getAllCheckAmuont(cartRepository.getIdCart(getIdCustomer().get().getId()));
        List<String> errors = new ArrayList<>();
        for (CartDetail dl : getAll) {
            if (dl.getAmount() > dl.getProductDetail().getAmount()) {
                errors.add(" ERRORS: ProducDetail id: " + dl.getProductDetail().getId() + " SL kho còn: " + dl.getProductDetail().getAmount());
            }
        }
        if (!errors.isEmpty()) {
            throw new MyCustomException(errors);
        }
        return "OK";
    }

    /**
     * Gọi hàm này trong bill_detail
     * dể đổi Status CartDetal thành " inactive "
     */
    @Override
    public void deleteCartDetailBill(Long idCartDetail) throws MyCustomException {
        Optional<CartDetail> cartDetail = cartDlRepository.findById(idCartDetail);
        if (!cartDetail.isPresent()) {
            throw new MyCustomException(" Không tìm thấy id_CartDetail này : " + cartDetail.get().getId());
        }
        CartDetail cart = cartDetail.get();
        cart.setStatus(CommonString.Status.INACTIVATED.getValue());
        cartDlRepository.save(cart);
    }

    @Override
   public BigDecimal discountValue(Long id) {
        BigDecimal dis = cartDlRepository.discountValue(id);
        if (dis == null) {
            dis = BigDecimal.ZERO;
            return BigDecimal.ZERO;
        }
        return dis;
    }
}
