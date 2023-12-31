package com.example.datnbe.controller;


import com.example.datnbe.config.VnPayConfig;
import com.example.datnbe.dto.PaymentDTO;
import com.example.datnbe.dto.PaymentResDTO;
import com.example.datnbe.service.impl.VnPayServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;


import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@CrossOrigin
public class VnPayController {
   @Autowired
   VnPayServiceImpl vnPayService;
   @Autowired
   VnPayConfig configVnPay;

    /**
     * Tạo thông tin thanh toán VnPay,
     * @param requestParams : nhận vào tổng tiền cần thanh toán , và nội dung thanh toán
     * @param request : chỉ để lấy ra IpAddress
     * @return : về URL của thanh toán bằng VN pay
     */
    @PostMapping("/api/v1/customer/create-pay")
    public ResponseEntity<?> createPayment(@RequestBody PaymentDTO requestParams, HttpServletRequest request) throws IOException {

        int amount = requestParams.getAmount() * 100;

        Map<String, String> vnp_params = new HashMap<>();
        vnp_params.put("vnp_Version", configVnPay.vnp_Version);
        vnp_params.put("vnp_Command", configVnPay.vnp_Command);
        vnp_params.put("vnp_TmnCode", configVnPay.vnp_TmnCode);
        vnp_params.put("vnp_Amount", String.valueOf(amount));
        vnp_params.put("vnp_BankCode", "NCB");

        LocalDateTime time = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String vnp_CreateDate = time.format(formatter);
        vnp_params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_params.put("vnp_CurrCode", configVnPay.vnp_CurrCode);
        vnp_params.put("vnp_IpAddr", vnPayService.getIpAddress(request)); // bỏ thằng này đi là lỗi VNPAy : 03
        vnp_params.put("vnp_Locale", configVnPay.vnp_Locale);
        vnp_params.put("vnp_OrderInfo", "Thanh toan hon hang" + requestParams.getDescription());
        vnp_params.put("vnp_OrderType", configVnPay.vnp_OrderType);
        vnp_params.put("vnp_ReturnUrl", configVnPay.vnp_ReturnUrl);
        vnp_params.put("vnp_TxnRef", vnPayService.getOTP(8));
//		vnp_params.put("vnp_SecureHash",PaymentConfig.vnp_SecureHash);

        List fieldName = new ArrayList(vnp_params.keySet());
        Collections.sort(fieldName);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        Iterator iterator = fieldName.iterator();
        while (iterator.hasNext()) {
            String name = (String) iterator.next();
            String value = vnp_params.get(name);
            if ((value != null) && (value.length() > 0)) {

                hashData.append(name);
                hashData.append("=");
                hashData.append(URLEncoder.encode(value, StandardCharsets.US_ASCII.toString()));

                query.append(URLEncoder.encode(name, StandardCharsets.US_ASCII.toString()));
                query.append("=");
                query.append(URLEncoder.encode(value, StandardCharsets.US_ASCII.toString()));

                if (iterator.hasNext()) {
                    query.append("&");
                    hashData.append("&");
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = vnPayService.hmacSHA512(configVnPay.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = configVnPay.vnp_PayUrl + "?" + queryUrl;

        PaymentResDTO result = new PaymentResDTO();
        result.setStatus("00");
        result.setMessage("success");
        result.setUrl(paymentUrl);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    /**
     * Khi thanh toán VnPay thành công hay không thì sẽ trả về Api này
     * @param vnp_ResponseCode : trạng thái trả về: 00 là thanh toán thành công
     */
    @GetMapping("/api/v1/payment-infor")
    public RedirectView transaction(@RequestParam String vnp_ResponseCode) {
        if (!vnp_ResponseCode.equals("00")) {
            return new RedirectView("http://localhost:3000/createPaymentError"); // thay URL bằng URL thanh toán thất bại
        }
            return new RedirectView("http://localhost:3000/createPaymentSuccess"); // thay URL bằng URL thanh toán thành công
    }

    //
    @PostMapping("/api/v1/customer/update-pay")
    public ResponseEntity<?> updatePayment(@RequestBody PaymentDTO requestParams, HttpServletRequest request) throws IOException {

        int amount = requestParams.getAmount() * 100;

        Map<String, String> vnp_params = new HashMap<>();
        vnp_params.put("vnp_Version", configVnPay.vnp_Version);
        vnp_params.put("vnp_Command", configVnPay.vnp_Command);
        vnp_params.put("vnp_TmnCode", configVnPay.vnp_TmnCode);
        vnp_params.put("vnp_Amount", String.valueOf(amount));
        vnp_params.put("vnp_BankCode", "NCB");

        LocalDateTime time = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String vnp_CreateDate = time.format(formatter);
        vnp_params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_params.put("vnp_CurrCode", configVnPay.vnp_CurrCode);
        vnp_params.put("vnp_IpAddr", vnPayService.getIpAddress(request)); // bỏ thằng này đi là lỗi VNPAy : 03
        vnp_params.put("vnp_Locale", configVnPay.vnp_Locale);
        vnp_params.put("vnp_OrderInfo", "Thanh toan hon hang" + requestParams.getDescription());
        vnp_params.put("vnp_OrderType", configVnPay.vnp_OrderType);
        vnp_params.put("vnp_ReturnUrl", configVnPay.vnp_ReturnUrl2);
        vnp_params.put("vnp_TxnRef", vnPayService.getOTP(8));
//		vnp_params.put("vnp_SecureHash",PaymentConfig.vnp_SecureHash);

        List fieldName = new ArrayList(vnp_params.keySet());
        Collections.sort(fieldName);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        Iterator iterator = fieldName.iterator();
        while (iterator.hasNext()) {
            String name = (String) iterator.next();
            String value = vnp_params.get(name);
            if ((value != null) && (value.length() > 0)) {

                hashData.append(name);
                hashData.append("=");
                hashData.append(URLEncoder.encode(value, StandardCharsets.US_ASCII.toString()));

                query.append(URLEncoder.encode(name, StandardCharsets.US_ASCII.toString()));
                query.append("=");
                query.append(URLEncoder.encode(value, StandardCharsets.US_ASCII.toString()));

                if (iterator.hasNext()) {
                    query.append("&");
                    hashData.append("&");
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = vnPayService.hmacSHA512(configVnPay.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = configVnPay.vnp_PayUrl + "?" + queryUrl;

        PaymentResDTO result = new PaymentResDTO();
        result.setStatus("00");
        result.setMessage("success");
        result.setUrl(paymentUrl);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    /**
     * Khi thanh toán VnPay thành công hay không thì sẽ trả về Api này
     * @param vnp_ResponseCode : trạng thái trả về: 00 là thanh toán thành công
     */
    @GetMapping("/api/v1/update/payment-infor")
    public RedirectView transactionUp(@RequestParam String vnp_ResponseCode) {
        if (!vnp_ResponseCode.equals("00")) {
            return new RedirectView("http://localhost:3000/updatePaymentError"); // thay URL bằng URL thanh toán thất bại
        }
        return new RedirectView("http://localhost:3000/updatePaymentSuccess"); // thay URL bằng URL thanh toán thành công
    }

}
