package com.example.datnbe.controller.admin;

import com.example.datnbe.domain.Bill;
import com.example.datnbe.domain.Customer;
import com.example.datnbe.domain.ResponseObject;
import com.example.datnbe.dto.BillOffLine;
import com.example.datnbe.dto.BillOffLineDTO;
import com.example.datnbe.dto.ProductInfo;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.request.CustomerBillRequest;
import com.example.datnbe.request.CustomerRequest;
import com.example.datnbe.request.PayRequest;
import com.example.datnbe.request.ProductDetailsRequest;
import com.example.datnbe.service.BillService;
import com.example.datnbe.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

/**
 * @author tientv34
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/staff/offline")
public class PayOffLineController {
    @Autowired
    private BillService billService;
    @Autowired
    private CustomerService customerService;

    /**
     * api tạo hoá đơn tạm với trạng thái chưa thanh toán.
     *
     * @return
     */
    @PostMapping("/create/bill")
    public ResponseEntity<ResponseObject> createBillOffLine() throws CustomerException {
        //Xử lí logic
        BillOffLineDTO billOffLineDTO = billService.createBillOffLine();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Create bill Successfully", billOffLineDTO
                )
        );
    }

    /**
     * API xử lí khi thêm sản phẩm vào hoá đơn.
     *
     * @return
     */
    @PostMapping("/addProduct")
    public ResponseEntity<ResponseObject> addProductByBillDetails(@RequestBody ProductDetailsRequest productRequest)
            throws CustomerException {
        //Xử lí logic
        List<ProductInfo> productInfos = billService.offlineBillPayment(productRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Add product Successfully", productInfos
                )
        );
    }

    /**
     * Xoá 1 sản phẩm ra khỏi hoá đơn.
     *
     * @param id     là id của productDetails.
     * @param idBill là id của bill
     * @return
     * @throws CustomerException
     */
    @DeleteMapping("/deleteProduct/{id}/{idBill}")
    public ResponseEntity<ResponseObject> deleteProductByBillDetails(@PathVariable Long id,
                                                                     @PathVariable Long idBill)
            throws CustomerException {
        //Xử lí logic
        billService.deleteProductDetails(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "delete Successfully", ""
                )
        );
    }

    /**
     * API tạo customer mua hàng offline
     *
     * @return
     */
    @PostMapping("/create/customer")
    public ResponseEntity<ResponseObject> createCustomerOffLine(@RequestParam(name = "customerName")String customerName,
                                                                @RequestParam(name = "username")String username,
                                                                @RequestParam(name = "phone")String phone,
                                                                @RequestParam(name = "email")String email,
                                                                @RequestParam(name = "gender")String gender)
            throws CustomerException, MessagingException {
        CustomerRequest request = new CustomerRequest();
        request.setCustomerName(customerName);
        request.setEmail(email);
        request.setGender(gender);
        request.setUsername(username);
        request.setPhoneNumber(phone);

        Customer customer = customerService.addCustomerOffLine(request);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Successfully", customer
                )
        );
    }

    /**
     * Api khi ấn button thanh toán
     *
     * @param payRequest gồm idBill và tổng tiền khách phải thanh toán.
     * @return
     * @throws CustomerException
     */
    @PostMapping("/thanh-toan")
    public ResponseEntity<ResponseObject> createPayment(@RequestBody PayRequest payRequest) throws CustomerException {
        Bill bill = billService.payOffLine(payRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Successfully", "id Bill " + bill.getId()
                )
        );
    }

    /**
     * Huỷ hoá đơn khi khác hàng không muốn mua nữa.
     *
     * @param
     * @return
     * @throws CustomerException
     */
    @DeleteMapping("/cancelPayment")
    public ResponseEntity<ResponseObject> cancelPayment(@RequestParam(name = "bill_id") Long billId) throws CustomerException {
        PayRequest payRequest = new PayRequest();
        payRequest.setIdBill(billId);
        payRequest.setNoteCancel("Hủy mua offline");
        Bill bill = billService.cancelOffLine(payRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Successfully", "id Bill " + bill.getId()
                )
        );
    }

    /**
     * api lấy danh sách hoá đơn bán hàng tại quầy theo trạng thái (trạng thái mặc định là chờ thanh toán.)
     *
     * @return
     * @throws CustomerException
     */
    @GetMapping("/getAllPaysOffLine")
    public ResponsePagination getAllPaysOffLine(
//            @RequestParam(name = "page", defaultValue = "1") int page,
//            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
//            @RequestParam(name = "status", defaultValue = "Chờ thanh toán") String status
    ) throws CustomerException {
        //Xử lí logic
        ResponsePagination listBill = billService.getAllBillOffLine("Chờ thanh toán", 1, 200);
        return ResponseEntity.status(HttpStatus.OK).body(listBill).getBody();
    }

    /**
     * Tìm kiếm khách hàng theo email, sdt, tên đăng nhập.
     *
     * @param keyword là email, sdt, tên đăng nhập.
     * @return
     * @throws CustomerException
     */
    @GetMapping("/search-cusomter-by-key")
    public ResponseEntity<ResponseObject> searchCustomer(@RequestParam(name = "key_word") String keyword) throws CustomerException {
        List<Customer> customers = customerService.searchCustomer(keyword);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Successfully", customers
                )
        );
    }

    /**
     * api xử lí get thông tin bill theo id;
     * @param id
     * @return
     * @throws CustomerException
     */
    @GetMapping("/get-bill-detail/{id}")
    public ResponseEntity<ResponseObject> getByIdBill(@PathVariable Long id) throws CustomerException {
        BillOffLine lst = billService.getBillById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Successfully",  lst
                )
        );
    }

    /**
     * api update số lượng
     * @param id id billdetails
     * @param amount số lượng muốn update
     * @return
     * @throws CustomerException
     */
    @PutMapping("/update-quantity/{id}")
    public ResponseEntity<ResponseObject> updateAmount (@PathVariable Long id, @RequestParam("amount") int amount)
            throws CustomerException {
        billService.updateAmount(id,amount);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Successfully",  ""
                )
        );
    }
}
