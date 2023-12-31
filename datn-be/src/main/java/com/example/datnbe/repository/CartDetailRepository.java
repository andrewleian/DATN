package com.example.datnbe.repository;

import com.example.datnbe.domain.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
    @Query("select count(c) from CartDetail c where c.status ='active' and c.cart.customer.id =:key")
    int countProducts(Long key);

    @Query("select c from CartDetail c where c.productDetail.id=:key and c.cart.id =:key1 and c.status='active'")
    CartDetail checkSoLuongProducDetailInCartDL(@Param("key") Long key, @Param("key1") Long key1);

    void deleteAllByCartId(Long cartId);

    @Query("select c from CartDetail c where c.productDetail.id in :keys and c.cart.id = :key1 and  c.status ='active'")
    List<CartDetail> checkAmountProducInCartAll(@Param("keys") List<Long> keys, @Param("key1") Long key1);

    @Query("select c from CartDetail c where c.cart.id=:key and c.status ='active'")
    List<CartDetail> getAllCheckAmuont(Long key);

    @Query("select c.name from Image c  join ProductColorSize d on c.productColorSize.id=d.id where c.productColorSize.id=:key")
    List<String> getImage(Long key);

    @Query("select a.id, a.cart.id, a.productDetail.id, a.amount, a.productDetail.size.name, a.productDetail.amount, a.productDetail.productColorSize.price" +
            ",a.productDetail.productColorSize.id, a.productDetail.productColorSize.product.name , a.productDetail.productColorSize.color.name " +
            "from CartDetail a  join ProductDetail b on a.productDetail.id = b.id " +
            " join ProductColorSize c on b.productColorSize.id = c.id " +
            "where a.cart.id = :key and a.status ='active'")
    List<Object[]> getAllCartDetail(Long key);

    @Query(value = "SELECT SUM(DISTINCT promotion.discount_value) AS total_discount\n" +
            "FROM promotion\n" +
            "JOIN promotion_detail ON promotion.id = promotion_detail.id_promotion\n" +
            "WHERE promotion_detail.id_pcs =:key ",nativeQuery = true)
    BigDecimal discountValue(Long key);

}
