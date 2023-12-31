package com.example.datnbe.repository;

import com.example.datnbe.domain.BillDetail;
import com.example.datnbe.dto.ProductInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface BillDetailRepository extends JpaRepository<BillDetail,Long> {
    BillDetail findById(int id);

    @Query("SELECT b FROM BillDetail b where b.bill.id = :idBill")
    List<BillDetail> findByIdBill (Long idBill);

    @Modifying
    @Transactional
    @Query("DELETE FROM BillDetail b WHERE b.bill.id = :idBill and b.productDetail.id = :idProductDetail")
    void deleteProductDetail (Long idBill, Long idProductDetail);

    @Query("SELECT new com.example.datnbe.dto.ProductInfo(a.unitPrice, a.amount, c.name, f.name, p.name, e.name, " +
            "a.promotionalPrice, a.discount) " +
            "FROM BillDetail a " +
            "LEFT JOIN ProductDetail b ON a.productDetail.id = b.id " +
            "LEFT JOIN Size c ON b.size.id = c.id " +
            "LEFT JOIN ProductColorSize d ON b.productColorSize.id = d.id " +
            "LEFT JOIN Image e ON d.id = e.productColorSize.id " +
            "LEFT JOIN Color f ON d.color.id = f.id " +
            "LEFT JOIN Product p ON d.product.id = p.id " +
            "WHERE a.productDetail.id = :idProductDetails AND a.bill.id = :idBill")
    List<ProductInfo> findAllBillDetailInfoByIdProductDetails(Long idProductDetails, Long idBill);

    @Query("SELECT new com.example.datnbe.dto.ProductInfo(a.unitPrice, a.amount, c.name, f.name, p.name, e.name, " +
            "a.promotionalPrice, a.discount, a.id, p.id) " +
            "FROM BillDetail a " +
            "LEFT JOIN ProductDetail b ON a.productDetail.id = b.id " +
            "LEFT JOIN Size c ON b.size.id = c.id " +
            "LEFT JOIN ProductColorSize d ON b.productColorSize.id = d.id " +
            "LEFT JOIN Image e ON d.id = e.productColorSize.id " +
            "LEFT JOIN Color f ON d.color.id = f.id " +
            "LEFT JOIN Product p ON d.product.id = p.id " +
            "WHERE a.productDetail.id = :idProductDetails AND a.bill.id = :idBill")
    List<ProductInfo> findAllBillDetailCustomer(Long idProductDetails, Long idBill);

    @Query("SELECT new com.example.datnbe.dto.ProductInfo(a.unitPrice, a.amount, c.name, f.name, p.name, e.name, " +
            "a.promotionalPrice, a.discount, a.id) " +
            "FROM BillDetail a " +
            "LEFT JOIN ProductDetail b ON a.productDetail.id = b.id " +
            "LEFT JOIN Size c ON b.size.id = c.id " +
            "LEFT JOIN ProductColorSize d ON b.productColorSize.id = d.id " +
            "LEFT JOIN Image e ON d.id = e.productColorSize.id " +
            "LEFT JOIN Color f ON d.color.id = f.id " +
            "LEFT JOIN Product p ON d.product.id = p.id " +
            "WHERE a.productDetail.id = :idProductDetails AND a.bill.id = :idBill")
    List<ProductInfo> findAllBillDetail(Long idProductDetails, Long idBill);

    @Query("SELECT bd FROM BillDetail bd WHERE bd.bill.id = :billId")
    List<BillDetail> findAllByBillId(Long billId);

    @Query("SELECT bd FROM BillDetail bd WHERE (bd.bill.id = :billId AND bd.productDetail.id = :idProductDetails)")
    Optional<BillDetail> findByBillDetails(Long billId,Long idProductDetails);
}
