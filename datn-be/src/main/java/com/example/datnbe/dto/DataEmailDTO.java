package com.example.datnbe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataEmailDTO {
    private String to;  //Gửi đến ai
    private String subject; //Chủ đề của email
    private String content; //Nội dung của email.
    private Map<String, Object> props; //Có thể truyền các thông tin khác như thông tin đơn hàng, mật khẩu mới, tokken,..
}
