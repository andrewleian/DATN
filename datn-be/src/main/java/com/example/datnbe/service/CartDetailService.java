package com.example.datnbe.service;

import com.example.datnbe.dto.CartDetailDTO;
import com.example.datnbe.dto.ShowCartDetail;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


public interface CartDetailService {

    List<ShowCartDetail> getAllCart();

    CartDetailDTO addToCartDetail(CartDetailDTO dto);

    CartDetailDTO updateToCartDetail(CartDetailDTO dto);

    String deleteOutCart(Long id);

    String deleteAll();

    int countProductDetailInCart();

    List<CartDetailDTO> saveAll( List<CartDetailDTO> dtos);

    String checkSlSendBill();

    void deleteCartDetailBill(Long idCartDetail);

    BigDecimal discountValue(Long id);


}
