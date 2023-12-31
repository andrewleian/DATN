//package com.example.datnbe.repository;
//
//import com.example.datnbe.domain.Bill;
//import com.example.datnbe.domain.BillDetail;
//import com.example.datnbe.dto.ProductInfo;
//import com.example.datnbe.dto.TraHangDTOs.BillDetaiInfor;
//import com.example.datnbe.dto.TraHangDTOs.ShowBIllDetailDoiDTO;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface TraHangRepository extends JpaRepository<Bill, Long> {
//
//    @Query(value = "SELECT bill.id, bill.bill_code, bill.customer_name,bill.phone ,bill.email, bill.total_payment, bill.payment_date, bill.status,\n" +
//            "  CASE\n" +
//            "    WHEN DATEDIFF(CURDATE(), payment_date) < 10 THEN 'Được đổi'\n" +
//            "    ELSE 'Hết hạn đổi'\n" +
//            "  END AS hanDoi\n" +
//            "FROM bill\n" +
//            "  WHERE status='Thành công' and YEAR(payment_date) = YEAR(CURDATE()) AND MONTH(payment_date) >= MONTH(CURDATE()) - 1 \n" +
//            "  AND bill.id NOT IN (\n" +
//            "    SELECT sub_bill.original_bill\n" +
//            "    FROM bill AS sub_bill\n" +
//            "    WHERE sub_bill.original_bill = bill.id AND sub_bill.status = 'Đổi hàng'\n" +
//            "  ) ", nativeQuery = true)
//    List<Object[]> billTime();
//
//    // lấy các hóa đơn còn trong ngày thanh toán kèm search
//    @Query(value = "SELECT bill.id, bill.bill_code, bill.customer_name,bill.phone ,bill.email, bill.total_payment, bill.payment_date, bill.status,\n" +
//            "  CASE\n" +
//            "    WHEN DATEDIFF(CURDATE(), payment_date) < 10 THEN 'Được đổi'\n" +
//            "    ELSE 'Hết hạn đổi'\n" +
//            "  END AS hanDoi\n" +
//            "FROM bill\n" +
//            "  WHERE status='Thành công' and YEAR(payment_date) = YEAR(CURDATE()) AND MONTH(payment_date) >= MONTH(CURDATE()) - 1 \n" +
//            "  AND ( bill_code like %:search% or bill.phone like %:search% or bill.email like %:search%)   \n" +
//            "  AND bill.id NOT IN (\n" +
//            "    SELECT sub_bill.original_bill\n" +
//            "    FROM bill AS sub_bill\n" +
//            "    WHERE sub_bill.original_bill = bill.id AND sub_bill.status = 'Đổi hàng'\n" +
//            "  )", nativeQuery = true)
//    List<Object[]> billTime2(String search);
//
//    // Lấy sản billDetail từ id hóa đơn cữ
//    @Query("SELECT new com.example.datnbe.dto.TraHangDTOs.BillDetaiInfor(a.id,a.bill.id,a.productDetail.id ,a.unitPrice, a.amount, c.name, f.name, p.name) " +
//            "FROM BillDetail a " +
//            "LEFT JOIN ProductDetail b ON a.productDetail.id = b.id " +
//            "LEFT JOIN Size c ON b.size.id = c.id " +
//            "LEFT JOIN ProductColorSize d ON b.productColorSize.id = d.id " +
//            "LEFT JOIN Image e ON d.id = e.productColorSize.id " +
//            "LEFT JOIN Color f ON d.color.id = f.id " +
//            "LEFT JOIN Product p ON d.product.id = p.id " +
//            "WHERE a.bill.id = :idBill")
//    List<BillDetaiInfor> getBillDetaiCu(Long idBill);
//
//    // Lấy sản billDetailDoi (Mới)
//    @Query("SELECT new com.example.datnbe.dto.TraHangDTOs.ShowBIllDetailDoiDTO(a.id ,a.unitPrice, a.amount,a.bill.id,a.bill.billCode,a.productDetail.id ,a.productDetailDoi.id " +
//            ", concat(a.productDetail.productColorSize.product.name,' ( ',a.productDetail.productColorSize.color.name,' ',a.productDetail.size.name,' )') ," +
//            " concat(a.productDetailDoi.productColorSize.product.name,' ( ',a.productDetailDoi.productColorSize.color.name,' ',a.productDetailDoi.size.name,' )') , a.note) " +
//            "FROM BillDetail a " +
//            "LEFT JOIN ProductDetail b ON a.productDetail.id = b.id " +
//            "LEFT JOIN Size c ON b.size.id = c.id " +
//            "LEFT JOIN ProductColorSize d ON b.productColorSize.id = d.id " +
//            "LEFT JOIN Image e ON d.id = e.productColorSize.id " +
//            "LEFT JOIN Color f ON d.color.id = f.id " +
//            "LEFT JOIN Product p ON d.product.id = p.id " +
//            "WHERE a.bill.id = :idBill")
//    List<ShowBIllDetailDoiDTO> getBillDetaiDoi(Long idBill);
//
//
//    // Lấy List billDoi [select hết muốn hiển thị j thì lấy.]
//    @Query("SELECT c FROM Bill c WHERE c.status='Chờ thanh toán đổi'")
//    List<Bill> getBillDoi();
//
//
//    //Check không tạo bill nếu đã có , chuyền vào id bill cũ
//    @Query("SELECT c FROM Bill c where c.originBill.id =:idBill")
//    Bill checkKhongTaoBill(Long idBill);
//
//    @Query("SELECT c FROM Bill c where c.id =:idBill")
//    Bill checkKhongTaoBillByIdBilldoi(Long idBill);
//
//    // check số lượng sản phẩm ở bill cũ (Đã mua)
//    @Query("select c.amount from BillDetail c where c.id =:key")
//    int soLuongSanPhamGoc(Long key);
//
//    // check số lượng sản phẩm (A) có bao nhiêu trong billDetailDoi
//    @Query("select sum(c.amount) from BillDetail c where c.bill.id =:key and c.productDetail.id =:key2")
//    Integer soLuongSanPhamBillDoi(Long key, Long key2);
//
//    //Check số lượng sản phẩm ở kho
//    @Query("select c.amount from ProductDetail c where c.id=:key")
//    Integer getSoLuongSanPhamKho(Long key);
//
//    // Lấy idBill detail cũ
//    @Query(value = "SELECT \n" +
//            "  (SELECT bill.original_bill FROM bill WHERE bill.id = bill_detail.id_bill) AS \"bill gốc\"\n" +
//            "FROM\n" +
//            "  bill_detail\n" +
//            "JOIN\n" +
//            "  bill ON bill_detail.id_bill = bill.id\n" +
//            "WHERE\n" +
//            "  bill_detail.id =:idBillDoi", nativeQuery = true)
//    Long checkLaySLCu1(Long idBillDoi);
//
//    @Query(value = "  select bill_detail.amount from " +
//            "bill_detail where bill_detail.id_bill =:key1 and bill_detail.id_product_details =:key2", nativeQuery = true)
//    Integer checkLaySLCu2(Long key1, Long key2);
//
//
////    // Lấy List Bill Detail Đổi theo id bill []
////    @Query("SELECT C FROM BillDetail C WHERE C.id =:id")
////    List<BillDetail> getBillDetailsByIdBill(Long id);
//
//    //
//    // tinh giá tiền sản phẩm đổi và mua thêm., truyền vào id thằng billĐổi
//    @Query(value = "SELECT SUM(subquery.TongTien) AS \"Tiền chuẩn\"\n" +
//            "FROM (\n" +
//            "  SELECT\n" +
//            "    bill_detail.amount,\n" +
//            "    bill_detail.id_bill,\n" +
//            "    bill_detail.id_product_details_doi,\n" +
//            "    bill_detail.unit_price AS \"GiaMoi\",\n" +
//            "    bill_detail.id_product_details,\n" +
//            "    (SELECT product_color_size.price FROM product_detail JOIN product_color_size ON product_detail.id_pcs = product_color_size.id WHERE product_detail.id = bill_detail.id_product_details) AS \"GiaCu\",\n" +
//            "    CASE\n" +
//            "      WHEN (bill_detail.id_product_details_doi IS NULL) THEN bill_detail.unit_price * bill_detail.amount\n" +
//            "      WHEN (bill_detail.unit_price =  (SELECT product_color_size.price FROM product_detail JOIN product_color_size ON product_detail.id_pcs = product_color_size.id WHERE product_detail.id = bill_detail.id_product_details))\n" +
//            "      THEN 0\n" +
//            "      WHEN (bill_detail.unit_price >  (SELECT product_color_size.price FROM product_detail JOIN product_color_size ON product_detail.id_pcs = product_color_size.id WHERE product_detail.id = bill_detail.id_product_details))\n" +
//            "      THEN (bill_detail.unit_price -  (SELECT product_color_size.price FROM product_detail JOIN product_color_size ON product_detail.id_pcs = product_color_size.id WHERE product_detail.id = bill_detail.id_product_details)) * bill_detail.amount\n" +
//            "    END AS \"TongTien\"\n" +
//            "  FROM bill\n" +
//            "  JOIN bill_detail ON bill.id = bill_detail.id_bill\n" +
//            "  WHERE bill_detail.id_bill =:key" +
//            ") subquery", nativeQuery = true)
//    Integer tinhTienDoi(Long key);
//
//    // Delete billDoi nếu khác hàng không đổi nữa.
//    //Delete bảng nhiều trước
//    @Query("delete from BillDetail c where c.bill.id =:key")
//    String deleteTableN(Long key);
//
//    @Query("delete from Bill c where c.id =:key")
//    String deleteTable1(Long key);
//
//    // check billdetail
//    @Query("SELECT c from Bill c where c.id =:key")
//    Optional<Bill> checkBillNull(int key);
//
//
//}
