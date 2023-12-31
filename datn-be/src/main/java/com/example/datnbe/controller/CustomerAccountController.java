package com.example.datnbe.controller;


import com.example.datnbe.dto.AccountDTO;
import com.example.datnbe.dto.CustomerChangeInforDTO;
import com.example.datnbe.dto.CustomerDTO;
import com.example.datnbe.payload.LoginRequest;
import com.example.datnbe.request.ForgotPasswordRequest;
import com.example.datnbe.service.impl.CustomerChangePassServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/account/my-customer")
public class CustomerAccountController {
    @Autowired
    CustomerChangePassServiceImpl service;

    @CrossOrigin
    @GetMapping("/get-account")
    public ResponseEntity<CustomerChangeInforDTO> getAccount() {
        CustomerChangeInforDTO customer = service.inforCustomer();
        return ResponseEntity.ok().body(customer);
    }

    @CrossOrigin
    @GetMapping("/get-account/staff")
    public ResponseEntity<AccountDTO> getAccountStaff() {
        AccountDTO staff = service.inforStaff();
        return ResponseEntity.ok().body(staff);
    }

    @CrossOrigin
    @PutMapping("/change-infor")
    public ResponseEntity<String> updateInfor(@RequestBody CustomerDTO dto) {
        CustomerDTO customer = service.changeInforCustomer(dto);
        if (customer != null) {
            return ResponseEntity.ok().body("Update infor Successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update faill");
    }

    @CrossOrigin
    @PostMapping("/change-account")
    public ResponseEntity<?> changePassword(@RequestBody ForgotPasswordRequest dto) throws Exception {
        LoginRequest data = service.changePass(dto);
        if (data != null) {
            return ResponseEntity.ok().body(data);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("faill");
    }
    @CrossOrigin
    @PostMapping("/comfim-otp")
    public ResponseEntity<?> confimOtp( @RequestParam String otp) {
        Boolean confim = service.confimOtp(otp);
        if (confim) {
            return ResponseEntity.ok().body("Bạn đã đổi mật khẩu thành công.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Kiểm tra lại otp không chính xác hoặc hết hạn");
    }

    /**
     * check validate
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
