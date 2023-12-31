package com.example.datnbe.controller;

import com.example.datnbe.domain.ResponseObject;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.dto.StaffDTO;
import com.example.datnbe.service.impl.StaffServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/director/staff")
public class StaffController {
    @Autowired
    StaffServiceImpl staffService;


    /**
     * Get list Staff theo điều kiện truyền vào
     * @param keyword        dự liệu search
     * @param status         trạng thái muốn search
     * @param orderBy        sắp xếp theo trường nào.
     * @param orderDirection trạng thái muốn sắp xếp.
     * @param page           page hiện tại mặc định là 1
     * @param pageSize       Số lượng bản ghi trong 1 page
     * @return ResponseObject gồm status, message và data.
     */
    @CrossOrigin
    @GetMapping("/get-list-staff")
    public ResponseEntity<ResponseObject> getStaff(@RequestParam(required = false) String keyword,
                                                   @RequestParam(required = false) String orderBy,
                                                   @RequestParam(required = false) String orderDirection,
                                                   @RequestParam( defaultValue = "enable") String status,
                                                   @RequestParam( defaultValue = "1") int page,
                                                   @RequestParam( defaultValue = "10") int pageSize) {

        ResponsePagination output = staffService.getListStaff(keyword, page, pageSize,
                orderBy, orderDirection, status);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Get List Staff Successfully", output
                )
        );

    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getStaffById(@PathVariable long id) {
        try {
            StaffDTO staffById = staffService.finById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(
                            "OK", "successfully", staffById
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(
                            "False", "Cannot find Staff", ""
                    )
            );
        }
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<List<String>> addStaff(@Valid @RequestBody StaffDTO staffDTO) {
        List<String> errors = staffService.saveStaff(staffDTO);
        if (!errors.contains("add success")) {
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.status(HttpStatus.OK).body(errors);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<List<String>> updateStaff(@PathVariable long id, @Valid @RequestBody StaffDTO staffDTO) {
        List<String> errors = staffService.updateStaff(staffDTO, id);
        if (!errors.contains("update success")) {
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.status(HttpStatus.OK).body(errors);
    }
    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteStaff(@PathVariable long id) {

            StaffDTO staffById = staffService.finById(id);
            staffService.deleteStaff(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(
                            "OK", "Delete successfully", staffById
                    )
            );

    }

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





