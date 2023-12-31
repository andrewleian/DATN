package com.example.datnbe.controller;

import com.example.datnbe.dto.ShippingOrderDTO;
import com.example.datnbe.service.GiaoHangNhanhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ghn")
@CrossOrigin
public class GiaoHangNhanhController {
    @Autowired
    GiaoHangNhanhService ghnService;

    /**
     * API : lấy Tỉnh or Thành Phố
     */
    @GetMapping("/province")
    public ResponseEntity<?> getAllProvinces() {
        return ghnService.getAllProvince();
    }

    /**
     * API : lấy Quận or Huyện
     */
    @GetMapping("/district")
    public ResponseEntity<?> getDistrict(@RequestParam String province_id) {
        return ghnService.getDistrict(province_id);
    }

    /**
     * API : lấy  phường or Xã
     */
    @GetMapping("/ward")
    public ResponseEntity<?> getWard(@RequestParam String district_id) {
        return ghnService.getWard(district_id);
    }


    /**
     * API : Tính phí ship của đơn hàng dựa trên ( khoảng cách), cân nặng .... do mặt hàng là giầy lên chỉ để mỗi cân nặng.
     * Link DOCS : https://api.ghn.vn/home/docs/detail?id=95
     * {
     * "service_type_id":2, :       | id = 2 :Chuyển phát thương mại điện tử     | id = 5 :Chuyển phát tuyên thống.
     * "to_district_id":3695,       | (id)  quận huyện người nhân hàng.
     * "to_ward_code":"90768",      | (mã) Phường xã người nhận hàng
     * "weight":400,                | cân nặng
     * "cod_failed_amount":2000,    | Giá trị giao thất bại thu tiền .
     * "insurance_value":10000,     | Giá trị của đơn hàng ( Trường hợp mất hàng, bể hàng sẽ đền theo giá trị của đơn hàng).
     * "cod_value":100000           | Tiền thu hộ người gửi.
     * }
     *
     * @return : trả về phí ship: ( các khoản phí khác do GHN tính .....)
     */
    @PostMapping("/shipping-fee")
    public ResponseEntity<?> getShippingFee(@RequestBody String jsonPayload) {
        return ghnService.shippingFee(jsonPayload);
    }

    /**
     * Docs : https://api.ghn.vn/home/docs/detail?id=122
     * APi : Đưa sản phẩn lên
     * @return
     */
    @PostMapping("/shipping-order-create")
    public ResponseEntity<?> createOrder(@RequestBody ShippingOrderDTO jsonPayload) {
        return ghnService.createShippingOrder(jsonPayload);
    }
}
