package com.example.datnbe.service.impl;

import com.example.datnbe.config.confimOtpConfig;
import com.example.datnbe.domain.Customer;
import com.example.datnbe.domain.Staff;
import com.example.datnbe.dto.AccountDTO;
import com.example.datnbe.dto.CustomerChangeInforDTO;
import com.example.datnbe.dto.CustomerDTO;
import com.example.datnbe.dto.DataEmailDTO;
import com.example.datnbe.exception.MyCustomException;
import com.example.datnbe.payload.LoginRequest;
import com.example.datnbe.repository.CustomerRepository;
import com.example.datnbe.repository.StaffRepository;
import com.example.datnbe.request.ForgotPasswordRequest;
import com.example.datnbe.service.CustomerChangePass;
import com.example.datnbe.service.MailService;
import com.example.datnbe.utils.Utils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class CustomerChangePassServiceImpl implements CustomerChangePass {
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    StaffRepository staffRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private MailService mailService;
    @Autowired
    private confimOtpConfig confimOtpConfig;

    private final PasswordEncoder passwordEncoder;

    public CustomerChangePassServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public CustomerChangeInforDTO inforCustomer() throws MyCustomException {
        return modelMapper.map(getCustomer(), CustomerChangeInforDTO.class);
    }

    public AccountDTO inforStaff() throws MyCustomException {
        return modelMapper.map(getStaff(), AccountDTO.class);
    }

    /**
     * Có thể đổi các thông tin :  Tên,ngày sinh, giới tính,sdt, Eamil thì có thể cần gửi mail
     */
    @Override
    public CustomerDTO changeInforCustomer(CustomerDTO dto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(dto.getBirthday(), formatter);
        Customer customer = getCustomer();
        customer.setCustomerName(dto.getCustomerName());
        customer.setPhone(dto.getPhone());
        customer.setEmail(dto.getEmail());
        customer.setGender(dto.getGender());
        customer.setBirthday(localDate);
        customer.setUpdateAt(Utils.getCurrentTimestamp());
        Customer updateInfor = customerRepository.save(customer);
        return modelMapper.map(updateInfor, CustomerDTO.class);
    }

    @Override
    public LoginRequest changePass(ForgotPasswordRequest dto) throws MyCustomException, Exception {
        Optional<Customer> customerOP = customerRepository.findCustomerByEmail(dto.getEmail());
        if (!customerOP.isPresent()) {
            throw new MyCustomException("Không tìm thấy tông tin customer c email "+dto.getEmail());
        }
        Customer customer = customerOP.get();
        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new MyCustomException("Password không giống nhau, kiểm tra lại");
        }
        confimOtpConfig.setUserName(customer.getUsername());
        confimOtpConfig.setPassWord(dto.getPassword());
        sendMail(customer.getEmail(), customer.getUsername());
        return new LoginRequest(customer.getUsername(), dto.getPassword());
    }

    @Override
    public Boolean confimOtp( String otp) {
        Optional<Customer> customerOp = customerRepository.findByUsername(confimOtpConfig.getUserName());
        Customer customer = customerOp.get();
        LocalDateTime endTime = LocalDateTime.now();
        long time = ChronoUnit.MINUTES.between(confimOtpConfig.getCurrentDateTime(), endTime); // Tổng time otp được gửi đi
        System.out.println(confimOtpConfig.getCurrentDateTime());
        if (confimOtpConfig.getOptCode().equals(otp) && time <= 5) {
            customer.setPassword(passwordEncoder.encode(confimOtpConfig.getPassWord()));
            customer.setUpdateAt(Utils.getCurrentTimestamp());
            customerRepository.save(customer);
            return true;
        } else if (!confimOtpConfig.getOptCode().equals(otp)) {
            throw new MyCustomException(" Opt Không chính xác");
        } else if (time > 5) {
            throw new MyCustomException(" Otp quá hạn vui lòng gửi lại.");
        }
        return false;
    }

    /**
     * Lấy thông tin Customer bằng Username
     */
    public Customer getCustomer() {
        String userDetails = Utils.getCurrentUser().getUsername();
        Optional<Customer> customer = customerRepository.findByUsername(userDetails);
        if (!customer.isPresent()) {
            throw new MyCustomException("Không tìm thấy tông tin customer");
        }
        return customer.get();
    }

    /**
     * Send Email
     */
    private void sendMail(String email, String username) throws Exception {
        DataEmailDTO dataSendEmail = new DataEmailDTO();
        dataSendEmail.setTo(email);
        dataSendEmail.setSubject("Thông báo OTP đổi mật khẩu.");

        confimOtpConfig.setOptCode(generateOptCode()); //Mã OTP sinh ra
        Map<String, Object> props = new HashMap<>();
        props.put("name", username);
        props.put("OTP", confimOtpConfig.getOptCode());
        dataSendEmail.setProps(props);

        //Gửi email
        mailService.sendHtmlMail(dataSendEmail, "sendMailForgotPassword");
        confimOtpConfig.setCurrentDateTime(LocalDateTime.now()); // Thời gian mail gửi đi
        confimOtpConfig.setEmail(email);
    }

    // tạo gen code
    private static String generateOptCode() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int digit = random.nextInt(10); // Tạo số ngẫu nhiên từ 0 đến 9
            sb.append(digit);
        }
        return sb.toString();
    }
    public Staff getStaff() {
        String userDetails = Utils.getCurrentUser().getUsername();
        Optional<Staff> staff = staffRepository.findByUsername(userDetails);
        if (!staff.isPresent()) {
            throw new MyCustomException("Không tìm thấy tông tin Staff");
        }
        return staff.get();
    }

}
