package com.example.datnbe.config;

import org.springframework.stereotype.Component;

@Component
public class VnPayConfig {
    public static String vnp_Version = "2.1.0"; // Phiên bản api mà merchant kết nối. Phiên bản hiện tại là : 2.0.1 và 2.1.0
    public static String vnp_Command = "pay";//Mã API sử dụng, mã cho giao dịch thanh toán là: pay
    public static String vnp_TmnCode = "PY9ALLGU"; //Mã website của merchant trên hệ thống của VNPAY.
    public static String vnp_CurrCode = "VND";
    public static String vnp_Locale = "vn";
    public static String vnp_OrderType = "100000";
    public static String vnp_HashSecret = "COHSEVXLKYLKPXKLQEFVKMSLAGWGSOVA";
    public static String vnp_PayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public static String vnp_ReturnUrl = "http://localhost:8080/api/v1/payment-infor"; // khi thanh toán thành công hay 0 thì VnPay tự động trả về URL này
    public static String vnp_ReturnUrl2 = "http://localhost:8080/api/v1/update/payment-infor"; // khi thanh toán thành công hay 0 thì VnPay tự động trả về URL này
}
