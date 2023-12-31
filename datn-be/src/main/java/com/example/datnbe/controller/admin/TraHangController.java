//package com.example.datnbe.controller.admin;
//
//import com.example.datnbe.domain.Bill;
//import com.example.datnbe.domain.BillDetail;
//import com.example.datnbe.domain.ResponseObject;
//import com.example.datnbe.dto.BillDetailDTO;
//import com.example.datnbe.dto.TraHangDTOs.BIllDetailDoiDTO;
//import com.example.datnbe.dto.TraHangDTOs.BillDetaiInfor;
//import com.example.datnbe.dto.TraHangDTOs.BillDoiDTO;
//import com.example.datnbe.dto.TraHangDTOs.BuyAddProductDTO;
//import com.example.datnbe.service.BillService;
//import com.example.datnbe.service.TraHangService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/v1/staff/")
//@CrossOrigin
//public class TraHangController {
//    @Autowired
//    TraHangService traHangService;
//    @Autowired
//    BillService billService;
//

//    /**
//     * Lấy  bill khi khách hàng cầm bill đến trả
//     * search : billCode, số điện thoại, email.
//     */
//    @GetMapping("getBill")
//    public ResponseEntity<?> getBill(@RequestParam(required = false) String search) {
//        return ResponseEntity.ok(traHangService.getBillTime(search));
//
//    }
//
//    /**
//     * API : lấy bill theo id bill
//     * Dùng chung cho bill Gốc và Bill đổi
//     */
//    @GetMapping("getBillById/{id}")
//    public ResponseEntity<?> getBillById(@PathVariable Long id) {
//        return ResponseEntity.ok(traHangService.getBillById(id));
//
//    }
//
//    /**
//     * API : lấy billDetai theo id billDetail
//     * Dùng chung cho billDetail Gốc và BillDetail đổi
//     */
//    @GetMapping("getBill-detail-ById/{id}")
//    public ResponseEntity<?> getBillDetailById(@PathVariable Long id) {
//        return ResponseEntity.ok(traHangService.getBillDetalById(id));
//
//    }
//
//    /**
//     * API : Lấy List bill detail từ hóa đơn khách cầm đến
//     *
//     * @param id : truyền vào idBill Cũ, khách cầm đến
//     * @return
//     */
//    @GetMapping("getListBill-detai/{id}")
//    public ResponseEntity<?> getListBillDetaiCu(@PathVariable Long id) {
//        return ResponseEntity.ok(traHangService.getBillDetai(id));
//    }
//
//    /**
//     * API : lấy tất cả billDoi có trạng thái  [ chờ thanh toán đôi. ]
//     * Do nhân viên tạo
//     */
//    @GetMapping("getBillDoi")
//    public ResponseEntity<?> getBillDoi() {
//        return ResponseEntity.ok(traHangService.getBillDoi());
//    }
//
//
//    /**
//     * API : Lấy bill detail Đổi, do nhân viên tạo
//     *
//     * @param id : idBillĐôi (New) do nhân viên tạo
//     * @return
//     */
//    @GetMapping("getBill-detai-doi/{id}")
//    public ResponseEntity<?> getBillDetaiDoi(@PathVariable Long id) {
//        return ResponseEntity.ok(traHangService.getBillDetailDoi(id));
//    }
//
//    /**
//     * API : Tính tiền khách cần phải trả thêm
//     *
//     * @param key : truyền vào id của billDoi ( bill do nhân viên tạo )
//     */
//    @GetMapping("getTotalMonny")
//    public ResponseEntity<?> getToTalMonny(@RequestParam Long key) {
//        return ResponseEntity.ok(traHangService.getTotalBillDoi(key));
//    }
//
//    /**
//     * API: Tạo billDOi và BillDetailDoi
//     * Mô tả luồng : Nếu Bảng BillDoi chưa có đơn nào, trong table BillDetail nhấn vào đổi chọn sp muốn đổi rồi ấn gửi ( thì phải truyền "idBillDoiMoi":"")
//     * là rỗng như này (lúc này sẽ Be sẽ tạo billDoi và BillDetailDoi luôn )
//     * Nếu muốn đổi tiếp sản phẩm ,trong table BillDetail nhấn vào đổi chọn sp muốn đổi rồi ấn gửi ( thì phải truyền "idBillDoiMoi":"45"), lúc này phải truyền
//     * IdBillDoi vào .
//     * ++ Tạo BillDoi mới thì tìm hóa đơn khác rồi làm tương tự
//     *
//     * @param bill
//     * @return
//     */
//    @PostMapping("create-bill-doi")
//    public ResponseEntity<ResponseObject> saveBillDoi(@RequestBody BillDoiDTO bill) {
//        Bill billDoi = traHangService.createBillDoi(bill);
//        if (billDoi != null) {
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject(
//                            "OK", "Tạo bill đổi thành công", billDoi
//                    )
//            );
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject(
//                        "ok", "Vui lòng tìm đúng hóa đơn của bạn để đổi hàng., Bill này dang được đổi.", ""
//                )
//        );
//
//
//    }
//
//    @PutMapping("update-bill-detail/{id}")
//    public ResponseEntity<ResponseObject> updateBillDetail(@PathVariable Long id, @RequestBody BIllDetailDoiDTO dto) {
//        BIllDetailDoiDTO billDetail = traHangService.updateBillDetail(id, dto);
//        if (billDetail != null) {
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject(
//                            "OK", "Update bill detail thành công: ", billDetail
//                    )
//            );
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject(
//                        "OK", "Update bill detail thất bại", ""
//                )
//        );
//    }
//
//    @PutMapping("save-bill-doi/{id}")
//    public ResponseEntity<ResponseObject> saveBill(@PathVariable Long id) {
//        Bill billDoi = traHangService.saveBill(id);
//        if (billDoi != null) {
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject(
//                            "OK", "Lưu bill thành công", billDoi
//                    )
//            );
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject(
//                        "faill", "Lưu bill thất bại.", ""
//                )
//        );
//    }
//
//    /**
//     * APi :Add thêm sản phẩm vào billdetaiDoi | khi khách hàng có ý định mua thêm
//     *
//     * @param bill
//     * @return
//     */
//    @PostMapping("buy-add-product")
//    public ResponseEntity<ResponseObject> buyAddProduct(@RequestBody BuyAddProductDTO bill) {
//        BillDetail billDoi = traHangService.buyAddProduct(bill);
//        if (billDoi != null) {
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject(
//                            "OK", "Thêm sản phẩm mới thành công.", billDoi
//                    )
//            );
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject(
//                        "ok", " Thêm sản phẩm mới thất bại.", ""
//                )
//        );
//    }
//
//    /**
//     * API : delete BillDetaiDoi | billDetal do nhân viên tạo
//     *
//     * @param id : chuyền vào id của BillDetail
//     * @return
//     */
//    @DeleteMapping("delete-billdetail-doi/{id}")
//    public ResponseEntity<ResponseObject> deleteBillDetailDoi(@PathVariable Long id) {
//        Boolean billDoi = traHangService.deleteBillDetailDoi(id);
//        if (billDoi == true) {
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject(
//                            "OK", "Đã xóa khỏi khỏi billDetailDoi.", ""
//                    )
//            );
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject(
//                        "faill", "Xóa thất bại.", ""
//                )
//        );
//    }
//
//    /**
//     * API: Delete billDoi : trường hợn nhân viên chọn nhầm hoạc 1 lý do nào đó.
//     *
//     * @param id : chuyền vào id của billDoi
//     */
//
//    @DeleteMapping("delete-bill/{id}")
//    public ResponseEntity<ResponseObject> removeBillDoi(@PathVariable Long id) {
//        String billDoi = traHangService.deleteBillDoi(id);
//        if (billDoi != null) {
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject(
//                            "OK", "Bạn đã xóa bill thành công.", ""
//                    )
//            );
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject(
//                        "faill", "Xóa thất bại.", ""
//                )
//        );
//    }
//
//}
//
