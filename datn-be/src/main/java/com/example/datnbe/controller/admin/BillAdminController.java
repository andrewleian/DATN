package com.example.datnbe.controller.admin;


import com.example.datnbe.domain.Bill;
import com.example.datnbe.domain.BillDetail;
import com.example.datnbe.domain.ResponseObject;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.request.BillDetailsRequest;
import com.example.datnbe.request.BillRequest;
import com.example.datnbe.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/staff/bill")
@CrossOrigin
public class BillAdminController {
    @Autowired
    private BillService billService;
    /**
     * Get list bill theo điều kiện truyền vào
     *
     * @param keyword        dự liệu search
     * @param orderBy        sắp xếp theo trường nào.
     * @param orderDirection trạng thái muốn sắp xếp.
     * @param page           page hiện tại mặc định là 1
     * @param pageSize       Số lượng bản ghi trong 1 page
     * @return ResponseObject gồm status, message và data.
     */
    @GetMapping("/getAllBill")
    public ResponseEntity<ResponseObject> getAllBill(@RequestParam(name = "keyword") String keyword,
                                                     @RequestParam(name = "status") String status,
                                         @RequestParam(name = "orderBy",defaultValue = "id") String orderBy,
                                         @RequestParam(name = "orderDirection", defaultValue = "DESC") String orderDirection,
                                         @RequestParam(name = "page", defaultValue = "1") int page,
                                         @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) throws CustomerException {
        ResponsePagination output =  billService.getListBill(keyword,status,page, pageSize,orderBy,orderDirection);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "Get List bill Successfully", output
                )
        );
    }

//    /**
//     * Cập nhập trạng thái đơn hàng cho bên quan rị viên các trạng thái.
//     * @param id của bill
//     * @param status trạng thái muốn cập nhập cho bill
//     * @param note có thể rỗng nhưng khi trạng thái là: "Trả hàng" thì bắt buộc phải có lí do trả hàng.
//     * @return
//     * @throws CustomerException
//     */
//    @PutMapping("/{id}")
//    public ResponseEntity<ResponseObject> updateStatusBill(@PathVariable Long id,
//                                                           @RequestParam(name = "status") String status,
//                                                           @RequestParam(name = "note", required = false) String note )
//                                                            throws CustomerException {
//        String message = billService.confirmBill(id, status, note) +" " +status;
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject(
//                        "OK", "update status bill Successfully", message
//                )
//        );
//    }

    /**
     * api xử lí sửa thông tin đơn hàng khi khách hàng gọi điện đến shop nhờ sửa các thông tin giao hàng như:
     * địa chỉ số điện thoại,....
     * @return
     */
    @PutMapping("/updatebill")
    public ResponseEntity<ResponseObject> updateBillAdmin(@RequestBody BillRequest billRequest) throws CustomerException {
        Bill bill = billService.updateBillAdmin(billRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "update bill Successfully", "Cập nhập thành công bill: "+ bill.getId()
                )
        );
    }

    /**
     * api xử lí update lại số lượng sản phẩm trong đơn hàng
     * @return
     */
    @PutMapping("/updateBillDetails")
    public ResponseEntity<ResponseObject> updateBillDetails(@RequestBody BillDetailsRequest billDetailsRequest)
                                            throws CustomerException {
        BillDetail billDetail = billService.updateBillDetail(billDetailsRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(
                        "OK", "update bill details Successfully",
                        "Cập nhập thành công billDetail : "+billDetail.getId()
                )
        );
    }
}
