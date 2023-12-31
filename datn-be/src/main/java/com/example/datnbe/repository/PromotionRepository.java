package com.example.datnbe.repository;

import com.example.datnbe.domain.Promotion;
import com.example.datnbe.domain.PromotionDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    Page<Promotion> findAllByOrderByIdDesc(Pageable pageable);
//    SELECT * FROM promotion as p where p.status = 'Active' ;

    @Query("select p from Promotion p where p.status = :status")
    Page<Promotion> getAllByStatus(String status, Pageable pageable);


    @Query("SELECT p FROM Promotion p " +
            "WHERE p.content LIKE %:search% " +
            "OR p.title LIKE %:search% " +
            "OR p.discountValue = :search")
    Page<Promotion> getAllByInput(String search, Pageable pageable);

    @Query("SELECT p FROM Promotion p " +
            "WHERE (p.content LIKE %:search% OR p.title LIKE %:search% OR p.discountValue = :search) " +
            "AND p.status = :status")
    Page<Promotion> getAllByInputAndStatus(String search,String status, Pageable pageable);

    @Query("SELECT COALESCE(SUM(p.discountValue), 0) FROM Promotion p  JOIN PromotionDetail  ps ON p.id = ps.promotion.id " +
            "WHERE ps.productColorSize.id = :id and p.status = 'active'" +
            "GROUP BY ps.productColorSize.id")
    BigDecimal totalDiscountValueByProduct (Long id);

    @Query(value = "select sum(p.discount_value) from promotion p\n" +
            "join promotion_detail pd on pd.id_promotion = p.id  \n" +
            "join product_color_size pcs on pcs.id = pd.id_pcs\n" +
            "where pcs.id = :id and \n" +
            "p.status = 'active' and\n" +
            "p.start_at <= current_timestamp() and p.end_at >= current_timestamp()",nativeQuery = true)
    Integer getByIdProDuctColorSize(Long id);
}
