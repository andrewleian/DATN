package com.example.datnbe.service;

import com.example.datnbe.dto.ShippingOrderDTO;
import org.springframework.http.ResponseEntity;

public interface GiaoHangNhanhService {
    ResponseEntity<?> getAllProvince();
    ResponseEntity<?> getDistrict(String id);
    ResponseEntity<?> getWard(String id);
    ResponseEntity<?> shippingFee(String jsonPayload);
    ResponseEntity<?> createShippingOrder(ShippingOrderDTO jsonBody);


}
