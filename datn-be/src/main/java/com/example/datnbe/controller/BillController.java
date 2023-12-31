/**
 * Dự án tốt nghiệp Foly
 * <p>
 * BillController.java tientv34
 *
 * @author tientv34
 */
package com.example.datnbe.controller;

import com.example.datnbe.domain.Bill;
import com.example.datnbe.domain.ResponseObject;
import com.example.datnbe.dto.BillDTO;
import com.example.datnbe.dto.BillDetailsDTO;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.request.UpdateBillRequest;
import com.example.datnbe.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;


@RestController
@RequestMapping("/api/v1/bill")
@CrossOrigin
public class BillController {
    @Autowired
    private BillService billService;

    /**
     * Tạo bill
     *
     * @param billDTO     Thông tin để tạo bill
     * @param isPayOnline Nếu thanh toán online thành công thì = true, thất bại = false, offline thì == null;
     * @return id bill đã to mới
     * @throws CustomerException
     * @throws MessagingException
     */
    @PostMapping("/add")
    public ResponseEntity<ResponseObject> addBill(@RequestBody BillDTO billDTO,
                                                  @RequestParam(name = "isPayOnline", required = false) String isPayOnline) //Thanh toán online
            throws CustomerException, MessagingException {
        Bill bill = billService.createBill(billDTO, isPayOnline);
        String result = "Bill ID: " + bill.getId() + " Trạng thái: " + bill.getStatus();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Add Bill Successfully", result
                )
        );
    }

    // Cập nhập thông tin bill
    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseObject> updateBill(@RequestBody UpdateBillRequest billRequest,
                                                     @PathVariable Long id) throws CustomerException {
        billRequest.setIdBill(id);
        Bill billUpdate = billService.updateBill(billRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Update Bill Successfully", billUpdate.getId()
                )
        );

    }

    /**
     * Tiếp tục thanh toán online với những đơn hàng có trjang thái chờ thành toán
     *
     * @param id          id của đơn hàng bill
     * @param isPayOnline là thành toán thành công hay thất bại thành công = "true", thất bại = "false"
     * @return
     * @throws CustomerException
     */
    @PutMapping("/updatePayOnline/{id}")
    public ResponseEntity<ResponseObject> updatePayOnline(@PathVariable Long id,
                                                          @RequestParam(name = "isPayOnline") String isPayOnline)
            throws CustomerException {
        String billPayOnline = billService.updatePayOnline(id, isPayOnline);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Update Bill payOnline Successfully", billPayOnline
                )
        );
    }

    /**
     * Delete bill (Chuyển trạng thái đơn hàng sang là huỷ)
     *
     * @param id
     * @param noteCancel lí do huỷ đơn hàng của khách hàng. bắt buộc nhập. khi muốn huy đơn.
     * @return
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseObject> deleteBill(@PathVariable Long id, @RequestParam(name = "noteCancel") String noteCancel) throws CustomerException {
        Boolean result = billService.deleteBill(id, noteCancel);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Delete Bill Successfully", ""
                )
        );
    }

    /**
     * Lấy ra tất cả các bill mà khách hàng đã mua theo id customer
     *
     * @param page
     * @param pageSize
     * @param status   trạng thái của bill muốn lấy
     * @return
     */
    @GetMapping("/getAllBill")
    public ResponsePagination getAllBillByIdCustomer(@RequestParam(name = "page", defaultValue = "1") int page,
                                                     @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                                     @RequestParam(name = "status") String status) throws CustomerException {
        return billService.getAllBilByIdCustomer(page, pageSize, status);
    }

    //Danh sách chi biết bill details theo id bill.
    @GetMapping("getBillDetails/{id}")
    public ResponseEntity<ResponseObject> getAllBillDetails(@PathVariable Long id) throws CustomerException {
        BillDetailsDTO billDetails = billService.getBillDetailsByIdBill(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Successfully", billDetails)
        );
    }
}
