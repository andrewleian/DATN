package com.example.datnbe.dto;

import com.example.datnbe.dto.TraHangDTOs.ProductGhn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShippingOrderDTO {
    private int payment_type_id;
    private String note;
    private String required_note; // Lưu ý đơn đặt hàng vận chuyển. Giá trị được phép:CHOTHUHANG, CHOXEMHANGKHONGTHU, KHONGCHOXEMHANG
    private String to_name;
    private String to_phone;
    private String to_address;
    private String to_ward_code;
    private int to_district_id;
    private int cod_amount;
    private String content;
    private int weight;
    private int length;
    private int width;
    private int height;
    private int cod_failed_amount;  // tiền khi giao hàng thất bại
    private int service_type_id;
    List<ProductGhn> items;
}
