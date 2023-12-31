/**
 * Dự án tốt nghiệp Foly
 *
 * BillService.java tientv34
 *
 *@author tientv34
 */
package com.example.datnbe.service;

import com.example.datnbe.domain.Bill;
import com.example.datnbe.domain.BillDetail;
import com.example.datnbe.dto.*;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.request.*;

import javax.mail.MessagingException;
import java.util.List;


public interface BillService {

    Bill createBill(BillDTO billDTO, String isPayOnline) throws CustomerException, MessagingException;

    String updatePayOnline(Long billId, String isPayOnline) throws CustomerException;

    Bill updateBill(UpdateBillRequest billRequest) throws CustomerException;

    String confirmBill(Long id, String status, String note) throws CustomerException;

    Boolean deleteBill(Long idBill, String note) throws CustomerException;

    ResponsePagination getListBill(String dataSearch, String status, int pageNumber, int pageSize,
                                   String orderBy, String orderDirection) throws CustomerException;

    BillDetailsDTO getBillDetailsByIdBill(Long id) throws CustomerException;

    ResponsePagination getAllBilByIdCustomer(int pageNumber, int pageSize, String status) throws CustomerException;

    Bill updateBillAdmin(BillRequest billRequest) throws CustomerException;

    BillDetail updateBillDetail(BillDetailsRequest billDetailsRequest) throws CustomerException;

    //Hàm để xử l logic cho các api mua hàng offline.
    BillOffLineDTO createBillOffLine() throws CustomerException; //Tạo bill mua hàng offline;

    BillOffLineDTO updateBillOffLine(CustomerBillRequest input) throws CustomerException; //Update thông tin khách hàng vào bill mua hàng;

    List<ProductInfo> offlineBillPayment(ProductDetailsRequest productRequest) throws CustomerException; // Xứ lí logic thêm 1 sản phẩm vào bill khi mua hàng.

    void deleteProductDetails(Long idProductDetail) throws CustomerException; //Xoá 1 sản phẩm khỏi bill;

    Bill payOffLine(PayRequest payRequest) throws CustomerException;

    Bill cancelOffLine(PayRequest payRequest) throws CustomerException;

    ResponsePagination getAllBillOffLine(String status, int pageNumber, int pageSize) throws CustomerException;

    BillOffLine getBillById (Long idBill) throws CustomerException;

    String updateAmount (Long idBillDetail, int amount) throws CustomerException;
}
