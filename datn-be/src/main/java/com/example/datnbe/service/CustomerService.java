/**
* Dự án tốt nghiệp Foly
*
* CustomerService.java tientv34
*
*@author tientv34
*/
package com.example.datnbe.service;

import com.example.datnbe.domain.Customer;
import com.example.datnbe.dto.CustomerDTO;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.request.CustomerRequest;

import javax.mail.MessagingException;
import java.util.List;

public interface CustomerService {
    Customer addCustomer(CustomerDTO customerDTO) throws CustomerException, Exception;

    Customer updateCustomer(CustomerDTO customerDTO,Long id) throws CustomerException;

    ResponsePagination getListCustomer(String dataSearch, int pageNumber, int pageSize,
                                       String orderBy, String orderDirection, String status);

    String deleteCustomer(Long id) throws CustomerException;

    Customer getCustomerById(Long id) throws CustomerException;

    Customer addCustomerOffLine(CustomerRequest customerRequest) throws CustomerException, MessagingException;

    List<Customer> searchCustomer(String keyword) throws CustomerException;
}
