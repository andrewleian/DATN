/**
* Dự án tốt nghiệp Foly
*
* Utils.java tientv34
*
*@author tientv34
*/
package com.example.datnbe.utils;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Locale;

public class Utils {
    public static final String FOR_GOT_PASSWORD  = "Thông báo cập đổi mật khẩu!";
    public static final String SUCCESSFUL_PURCHASE  = "Thông báo đặt hàng thành công!";
    public static final String SIGN_UP_FOR_REGISTER_ACCOUNT  = "Thông báo đăng kí tài khoản thành công!";
    public static final String LOGIN_INFORMATION  = "Thông báo đăng kí tài khoản thành công!";


    // Lấy ra UserDetails hiện tại đạng login nếu không có th trả về null
    public static UserDetails getCurrentUser(){
        //Truy xuất thông tin của người dùng hiện tại đang đăng nhập trả về 1 Object.
        Object o = SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        // Kiểm tra xem đối tượng trả về có phải là 1 chuỗi hãy không. Nếu là 1 chuỗi thì nghĩa là người dùng chưa được xác thực
        // và sẽ trả về null và ngược lại nếu không phải là 1 chuỗi thì ép kiểu về CustomUserDetails.
        return o instanceof String ? null : (UserDetails) o;
    }

    public  static Timestamp getCurrentTimestamp(){
        ZoneId vietnamZone = ZoneId.of("Asia/Ho_Chi_Minh"); // Định nghĩa múi giờ Việt Nam
        Instant currentInstant = Instant.now();
        ZonedDateTime vietnamTime = currentInstant.atZone(vietnamZone);

        return Timestamp.valueOf(vietnamTime.toLocalDateTime());
    }

    public static String convertTimestampToDate(Timestamp timestamp) {
        Date date = new Date(timestamp.getTime());
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        return formatter.format(date);
    }

    public static String convertToVND(BigDecimal amount) {
        Locale locale = new Locale("vi", "VN");
        DecimalFormatSymbols symbols = new DecimalFormatSymbols(locale);
        symbols.setCurrencySymbol(""); // Loại bỏ ký hiệu tiền tệ
        DecimalFormat formatter = new DecimalFormat("#,### ₫", symbols);
        return formatter.format(amount);
    }
}
