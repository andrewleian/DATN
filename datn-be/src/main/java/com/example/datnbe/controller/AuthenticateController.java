package com.example.datnbe.controller;

import com.example.datnbe.domain.Customer;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.payload.LoginRequest;
import com.example.datnbe.payload.LoginResponse;
import com.example.datnbe.request.ForgotPasswordRequest;
import com.example.datnbe.request.RegisterRequest;
import com.example.datnbe.service.AuthenticateService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/authenticate")
@AllArgsConstructor
public class AuthenticateController {

    private final AuthenticateService authenticateService;

    @PostMapping(value = "/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req){
        return ResponseEntity.ok(authenticateService.authenticate(req));
    }

    /**
     * API đăng kí tài khoản mua hàng cho customers
     * @param registerRequest thông tin đăng kí của khách hàng.
     * @param bindingResult validate nếu xảy ra lỗi
     * @return về 1 string là lỗi hoặc thông báo thành công
     * @throws MessagingException
     */
    @PostMapping(value = "/register")
    public ResponseEntity<List<String>> register(@RequestBody @Valid RegisterRequest registerRequest,
                                                 BindingResult bindingResult) throws MessagingException, CustomerException {
        List<String> errors=new ArrayList<>();
        if(bindingResult.hasErrors()){
            List<FieldError> fieldErrorList= bindingResult.getFieldErrors();
            for(FieldError err:fieldErrorList){
                errors.add(err.getDefaultMessage()) ;
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
        Customer registerStatus = authenticateService.register(registerRequest);
        if(registerStatus != null){
            errors.add("Add customer successfully");
        }
        return ResponseEntity.ok(errors);
    }

    /**
     * API thêm địa chỉ cho khách hàng.
     * @param address địa chỉ truyền vào
     * @return về 1 string thôn báo thành công hay thất bại
     * @throws MessagingException
     */
    @PostMapping(value = "/address")
    public ResponseEntity<List<String>> addAddress(@RequestParam(name = "address") String address) throws MessagingException {
        List<String> errors=new ArrayList<>();
        String result = authenticateService.address(address);
        if (!result.equalsIgnoreCase("ok")){
            errors.add("Add address failed");
        }else {
            errors.add("Add address successfully");
        }
        return ResponseEntity.ok(errors);
    }

    /**
     * API update thông tin địa chỉ giao hàng của customer khi khách hàng đã có tài khoản
     * @param addressId id của address muốn update
     * @param address thông tin địa chỉ muốn update
     * @return 1 string để thông báo
     * @throws MessagingException
     */
    @PutMapping(value = "/address")
    public ResponseEntity<List<String>> editAddress(@RequestParam(name = "addressId") Long addressId,
                                                    @RequestParam(name = "address") String address)
                                                    throws MessagingException {
        List<String> errors=new ArrayList<>();
        String result = authenticateService.editAddress(addressId, address);
        if (!result.equalsIgnoreCase("ok")){
            errors.add("update address failed");
        }else {
            errors.add("update address successfully");
        }
        return ResponseEntity.ok(errors);
    }

    /**
     * API xoá 1 địa chỉ của khách hàng xoá hẳng khỏi database
     * @param addressId id của address muốn xoá
     * @return về 1 string thôn báo thành công hay thất bại
     * @throws MessagingException
     */
    @DeleteMapping(value = "/address")
    public ResponseEntity<List<String>> deleteAddress(@RequestParam(name = "addressId") Long addressId) throws MessagingException {
        List<String> errors=new ArrayList<>();
        String result = authenticateService.deleteAddress(addressId);
        if (!result.equalsIgnoreCase("ok")){
            errors.add("delete address failed");
        }else {
            errors.add("delete address successfully");
        }
        return ResponseEntity.ok(errors);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody @Valid ForgotPasswordRequest request) throws Exception {
        LoginRequest login = authenticateService.forgotPassword(request);
        if(login !=null){
            return ResponseEntity.ok().body(login);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Faill");
    }
    @PostMapping("/comfim-otp")
    public ResponseEntity<?> confimOtp(@RequestParam String otp) {
        Boolean confim = authenticateService.confimOtp(otp);
        if(confim){
            return ResponseEntity.ok().body("Bạn đã đổi mật khẩu thành công.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Kiểm tra lại otp không chính xác hoặc hết hạn");
    }
    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendPassword()throws Exception{
        String sendOtp =authenticateService.resendPassword();
        if (sendOtp !=null){
            return ResponseEntity.ok().body(sendOtp);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Send mail thất bại");
    }

    /**
     * validate
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
            Map<String, String> errors = new HashMap<>();
            ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
