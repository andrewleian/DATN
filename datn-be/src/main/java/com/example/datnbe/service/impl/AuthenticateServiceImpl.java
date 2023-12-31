package com.example.datnbe.service.impl;

import com.example.datnbe.config.security.AccountFilterService;
import com.example.datnbe.config.confimOtpConfig;
import com.example.datnbe.domain.Address;
import com.example.datnbe.domain.Customer;
import com.example.datnbe.common.CommonString;
import com.example.datnbe.dto.DataEmailDTO;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.exception.MyCustomException;
import com.example.datnbe.payload.LoginRequest;
import com.example.datnbe.payload.LoginResponse;
import com.example.datnbe.repository.AddressRepository;
import com.example.datnbe.repository.CustomerRepository;
import com.example.datnbe.repository.StaffRepository;
import com.example.datnbe.request.ForgotPasswordRequest;
import com.example.datnbe.request.RegisterRequest;
import com.example.datnbe.service.AuthenticateService;
import com.example.datnbe.service.MailService;
import com.example.datnbe.utils.Utils;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
@AllArgsConstructor
public class AuthenticateServiceImpl implements AuthenticateService {
    @Autowired
    private MailService mailService;
    @Autowired
    private confimOtpConfig confimOtpConfig;



    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final AccountFilterService accountFilterService;
    private final ModelMapper modelMapper;
    private final PasswordEncoder encoder;
    private final CustomerRepository customerRepository;
    private final StaffRepository staffRepository;
    private final AddressRepository addressRepository;
    @Override
    public LoginResponse authenticate(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsername(),
                        req.getPassword()
                )
        );
        UserDetails account = userDetailsService.loadUserByUsername(req.getUsername());
        String token= accountFilterService.generateToken(account);
        return new LoginResponse(token,account);
    }

    /**
     * Hàm xử lí tạo mới 1 account của customer khi đăng kí tài khoản
     * @param registerRequest tham số thông tin customer đầu vào
     * @return về 1 customer nếu thành công
     * @throws MessagingException bắt các exception xảy ra
     * @throws MyCustomException bắt các exception xảy ra
     */
    @Transactional(rollbackFor = {Exception.class, Throwable.class})
    public Customer register(RegisterRequest registerRequest) throws MessagingException, CustomerException {
        boolean isUsernamePresentInCustomer=customerRepository.findByUsername(registerRequest.getUsername()).isPresent();
        boolean isUsernamePresentInStaff=staffRepository.findByUsername(registerRequest.getUsername()).isPresent();
        if(isUsernamePresentInStaff||isUsernamePresentInCustomer){
            throw new CustomerException("Tên đăng nhập đã tồn tại");
        }
        if(customerRepository.findByKeyWord(registerRequest.getEmail()).isPresent()){
            throw new CustomerException("Email đã tồn tại");
        }
        if(customerRepository.findByKeyWord(registerRequest.getPhone()).isPresent()){
            throw new CustomerException("Số điện thoại đã tồn tại");
        }
        Customer customer= modelMapper.map(registerRequest, Customer.class);
        customer.setCreateAt(new Timestamp(System.currentTimeMillis()));
        customer.setStatus(CommonString.StatusAccount.ENABLED.getValue());
        customer.setPassword(encoder.encode(customer.getPassword()));
        Customer customerSave = customerRepository.save(customer);
        if (customerSave != null){
            Address address = new Address();
            address.setCustomer(customerSave);
            address.setContent(registerRequest.getAddress());
            address.setCreateAt(Utils.getCurrentTimestamp());
            address.setUpdateAt(Utils.getCurrentTimestamp());
            address.setStatus(CommonString.Status.ACTIVATED.getValue());
            addressRepository.save(address);

            DataEmailDTO dataSendEmail = new DataEmailDTO();
            dataSendEmail.setTo(customerSave.getEmail());
            dataSendEmail.setSubject(Utils.SIGN_UP_FOR_REGISTER_ACCOUNT);
            Map<String, Object> props = new HashMap<>();
            props.put("name", customerSave.getCustomerName());
            props.put("username", customerSave.getUsername());
            dataSendEmail.setProps(props);
            mailService.sendHtmlMail(dataSendEmail, "templateRegisterAccount");
        }
        return customerSave;
    }

    /**
     * Hàm xử lí thêm 1 địa chỉ giao hàng mới cho khách hàng (Khi khách hàng đã đăng kí tài khoản xong)
     * @param input Dự liệu tham số đầu vào địa chỉ của khách hàng
     * @return 1 thông báo
     * @throws MessagingException
     */
    @Override
    public String address(String input) throws MessagingException {
        if (input == null){
            throw new IllegalArgumentException("Chưa nhập địa chỉ");
        }
        UserDetails userDetails = Utils.getCurrentUser();
        Customer customer = customerRepository.findCustomerByUsername(userDetails.getUsername());
        Address address = new Address();
        address.setCustomer(customer);
        address.setContent(input);
        address.setCreateAt(Utils.getCurrentTimestamp());
        address.setUpdateAt(Utils.getCurrentTimestamp());
        address.setStatus(CommonString.Status.ACTIVATED.getValue());
        addressRepository.save(address);
        return "ok";
    }

    /**
     * Xàm xử lí khi khách hàng muốn sửa thông tin địa chỉ giao hàng
     * @param addressId id của address trong database
     * @param input Thông tin địa chỉ mới.
     * @return 1 thông báo
     * @throws MessagingException
     */
    @Override
    public String editAddress(Long addressId, String input) throws MessagingException {
        Address address = addressRepository.findById(addressId).get();
        if (address == null) {
            throw new MessagingException("Địa chỉ address không tồn tại");
        }
        if (input == null) throw new MessagingException("Chưa có input");
        address.setContent(input);
        address.setUpdateAt(Utils.getCurrentTimestamp());
        addressRepository.save(address);
        return "ok";
    }

    /**
     * hàm xử lí xoá 1 đia chỉ giao hàng của khách hàng
     * @param addressId id của address trong database muốn xoá.
     * @return về 1 string.
     * @throws MessagingException
     */
    @Override
    public String deleteAddress(Long addressId) throws MessagingException {
        Address address = addressRepository.findById(addressId).get();
        if (address == null) {
            throw new MessagingException("Địa chỉ address không tồn tại");
        }
        addressRepository.delete(address);
        return "ok";
    }

    /**
     *B1 : Nhập mail ,password , confimPassword | sai đẩy lỗi
     * đúng gửi Otp về mail, trả về longinRequest { usernam, password}
     */
    @Override
    public LoginRequest forgotPassword(ForgotPasswordRequest req)throws MyCustomException , Exception{


         Optional<Customer> customerOp = customerRepository.findCustomerByEmail(req.getEmail());
         if(!customerOp.isPresent()){
             throw new MyCustomException("Không tìm thông tin khác hàng có emai : "+req.getEmail());
         }
         if (!req.getPassword().equals(req.getConfirmPassword())){
             throw new MyCustomException(" kiểm tra lại Password không trùng,");
         }
         Customer customer = customerOp.get();

        confimOtpConfig.setUserName(customer.getUsername());
        confimOtpConfig.setPassWord(req.getPassword());
        sendMail(customer.getEmail(),customer.getUsername());
        return new LoginRequest(customerOp.get().getUsername(),req.getPassword());
    }

    public Boolean confimOtp( String otp) {
        Optional<Customer> customerOp = customerRepository.findByUsername(confimOtpConfig.getUserName());
        Customer customer = customerOp.get();
        LocalDateTime endTime = LocalDateTime.now();
        long time = ChronoUnit.MINUTES.between(confimOtpConfig.getCurrentDateTime(), endTime); // Tổng time otp được gửi đi
        System.out.println(confimOtpConfig.getCurrentDateTime());
        if( confimOtpConfig.getOptCode().equals(otp) && time<=5) {
            customer.setPassword(encoder.encode(confimOtpConfig.getPassWord()));
            customer.setUpdateAt(Utils.getCurrentTimestamp());
            customerRepository.save(customer);
            return true;
        }else if(!confimOtpConfig.getOptCode().equals(otp)){
            throw new MyCustomException(" Opt Không chính xác");
        } else if (time>5) {
            throw new MyCustomException(" Otp quá hạn vui lòng gửi lại.");
        }
        return false;
    }

    /**
     * Gửi lại otp
     */
    @Override
    public String resendPassword()throws  Exception{
        Optional<Customer> customerOp = customerRepository.findCustomerByEmail(confimOtpConfig.getEmail());
        System.out.println("đâu là username "+ confimOtpConfig.getEmail());
        if(!customerOp.isPresent()){
            throw new MyCustomException("Không tìm thấy khách hàng với username: ");
        }
        Customer customer = customerOp.get();
        sendMail(customer.getEmail(),customer.getUsername());
        return "ok";
    }

    /**
     * Hàm chung để gửi mail
     */
    private void sendMail(String email,String username)throws  Exception{
        DataEmailDTO dataSendEmail = new DataEmailDTO();
        dataSendEmail.setTo(email);
        dataSendEmail.setSubject(Utils.FOR_GOT_PASSWORD);

        confimOtpConfig.setOptCode(generateOptCode()); //Mã OTP sinh ra
        Map<String, Object> props = new HashMap<>();
        props.put("name", username);
        props.put("OTP", confimOtpConfig.getOptCode());
        dataSendEmail.setProps(props);

        //Gửi email
        mailService.sendHtmlMail(dataSendEmail,"sendMailForgotPassword");
        confimOtpConfig.setCurrentDateTime(LocalDateTime.now()); // Thời gian mail gửi đi
        confimOtpConfig.setEmail(email);
    }

    /**
     * Tạo ãm OTP ngẫu nhiên để gửi email lấy lại mật khẩu.
     * @return về 1 chuỗi mã OTP
     */
    private static String generateOptCode() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int digit = random.nextInt(10); // Tạo số ngẫu nhiên từ 0 đến 9
            sb.append(digit);
        }
        return sb.toString();
    }
}
