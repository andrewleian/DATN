/**
 * Dự án tốt nghiệp Foly
 * <p>
 * CustomerController.java tientv34
 *
 * @author tientv34
 */
package com.example.datnbe.controller;

import com.example.datnbe.domain.Customer;
import com.example.datnbe.domain.ResponseObject;
import com.example.datnbe.dto.CustomerDTO;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/director/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    /**
     * Lấy thông tin của 1 nhân viên theo id
     * @param id id của nhân viên
     * @return trả về 1 customer cần tìm kiếm
     * @throws CustomerException
     */
    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> getCustomerById(@PathVariable Long id) throws CustomerException {
        Customer customer = customerService.getCustomerById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Query Customer successfully", customer
                )
        );
    }

    /**
     * Get list customer theo điều kiện truyền vào
     *
     * @param keyword        dự liệu search
     * @param status         trạng thái muốn search
     * @param orderBy        sắp xếp theo trường nào.
     * @param orderDirection trạng thái muốn sắp xếp.
     * @param page           page hiện tại mặc định là 1
     * @param pageSize       Số lượng bản ghi trong 1 page
     * @return ResponseObject gồm status, message và data.
     */
    @GetMapping("/lstCustomers")
    ResponseEntity<ResponseObject> getListCustomer(@RequestParam(name = "keyword") String keyword,
                                                   @RequestParam(name = "status", defaultValue = "enable") String status,
                                                   @RequestParam(name = "orderBy") String orderBy,
                                                   @RequestParam(name = "orderDirection") String orderDirection,
                                                   @RequestParam(name = "page", defaultValue = "1") int page,
                                                   @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {
        ResponsePagination output = customerService.getListCustomer(keyword, page, pageSize,
                orderBy, orderDirection, status);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Get List Customer Successfully", output
                )
        );
    }

    /**
     * Hàm thêm 1 nhân viên mới
     * @param customerDTO Thông tin của customer cần thêm
     * @return
     * @throws CustomerException
     * @throws Exception
     */
    @PostMapping("/addCustomer")
    ResponseEntity<ResponseObject> insertCustomer(@RequestBody CustomerDTO customerDTO) throws CustomerException, Exception {
        Customer customer = customerService.addCustomer(customerDTO);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Insert Customer successfully", customer.getId()
                )
        );
    }

    /**
     * Update 1 customer theo id và thông tin truyền vào.
     * @param id id của customer cần update
     * @param customerDTO thong tin cần update hiện tại chỉ cho update phone, username, ngày sinh, giới tính, status
     * @return id customer đã update
     * @throws CustomerException
     */
    @PutMapping("/{id}")
    ResponseEntity<ResponseObject> updateCustomer(@PathVariable Long id,@RequestBody CustomerDTO customerDTO)
                                                  throws CustomerException {
        Customer customer = customerService.updateCustomer(customerDTO,id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Update Customer successfully", customer.getId()
                )
        );
    }

    /**
     * Xoá 1 customer (update trạng thái)
     * @param id id customer cần xoá
     * @return
     * @throws CustomerException
     */
    @DeleteMapping("/{id}")
    ResponseEntity<ResponseObject> deleteCustomer(@PathVariable Long id) throws CustomerException {
        String result = customerService.deleteCustomer(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Delete Customer successfully", ""
                )
        );
    }
}
