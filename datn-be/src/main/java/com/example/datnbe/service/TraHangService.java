//package com.example.datnbe.service;
//
//import com.example.datnbe.domain.Bill;
//import com.example.datnbe.domain.BillDetail;
//import com.example.datnbe.domain.ProductDetail;
//import com.example.datnbe.domain.Staff;
//import com.example.datnbe.dto.BillDetailDTO;
//import com.example.datnbe.dto.TraHangDTOs.BIllDetailDoiDTO;
//import com.example.datnbe.dto.TraHangDTOs.BillDetaiInfor;
//import com.example.datnbe.dto.TraHangDTOs.BillDoiDTO;
//import com.example.datnbe.dto.TraHangDTOs.BuyAddProductDTO;
//import com.example.datnbe.dto.TraHangDTOs.ShowBIllDetailDoiDTO;
//import com.example.datnbe.dto.TraHangDTOs.ShowBill;
//import com.example.datnbe.exception.MyCustomException;
//
//import java.util.List;
//import java.util.Map;
//
//public interface TraHangService {
//    List<ShowBill> getBillTime(String billCode); // lấy các hóa có trong hạn được đổi trả
//
//    List<BillDetaiInfor> getBillDetai(Long idBill); // lấy tất cả sản phẩm lên
//
//    Bill createBillDoi(BillDoiDTO listSp);
//
//    boolean addBIllDetail(BillDoiDTO sp); // add sản phẩm vào bill
//
//    List<Bill> getBillDoi(); // lấy các bill đổi có trạng thái là chờ thanh toán đổi đổi.
//
//    List<ShowBIllDetailDoiDTO> getBillDetailDoi(Long idBillDoi);
//
//
//    BIllDetailDoiDTO updateBillDetail(Long id, BIllDetailDoiDTO dto);
//
//    BillDetail buyAddProduct(BuyAddProductDTO dto);
//
//    Boolean deleteBillDetailDoi(Long id);
//
//    Staff getStaff();
//
//    //
//    int getTotalBillDoi(Long key);
//
//    Bill getBillById(Long id);
//
//    BillDetail getBillDetalById(Long id);
//
//    Bill saveBill(Long idBillDoi);
//
//    String deleteBillDoi(Long id);
//
//    //    List<BIllDetailDoiDTO> getBillDetails(Long id);// get BillDetail Đổi theo idBill (Show đầy đủ thông tin cho khách.)
////
////    BIllDetailDoiDTO getBillDetail(Long id); // lấy 1 bill detail
////
////    Boolean createBillDoi(BillDoiDTO idBillOriginal) throws MyCustomException; // tạo bill and
////
//
//
//}
