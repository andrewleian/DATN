package com.example.datnbe.repository;


import com.example.datnbe.domain.ProductColorSize;
import com.example.datnbe.domain.ProductDetail;
import com.example.datnbe.domain.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {

    @Query("select c.amount from ProductDetail c where c.id=:key")
    int checkSoluongProducDl(@Param("key") Long key);

    @Query("select  c from ProductDetail c where c.id =:key")
    ProductDetail checkProductDetail(Long key);

    @Query("select DISTINCT  c.size.id from  ProductDetail c where c.amount >0 and c.productColorSize.id =:key")
    List<Integer> getSize(Long key);

    @Query("select c from ProductDetail c where c.id in :keys")
        // update doạn này
    List<ProductDetail> checkProductDetails(List<Long> keys);

    @Query("select c.size.name,c.amount,c.id from ProductDetail c where c.productColorSize.id=:key")
    List<Object[]> getSizes(Long key);

    @Query("select  concat(b.product.productCode,b.color.id,a.size.name,a.id)  " +
            "from ProductDetail a join ProductColorSize b on a.productColorSize.id = b.id  join Product c on b.product.id = c.id" +
            " where a.id =:key")
    String getserialCode(Long key);

    @Query("select max (c.id) from ProductDetail c")
    Long getMaxById();

    @Query("select c.amount from ProductDetail c where c.id= (select max (c.id) from ProductDetail c)")
    int getAmountProduct();

    @Query(value = "select * from product_detail where id_size = :idSize and id_pcs =:idPcs", nativeQuery = true)
    Optional<ProductDetail> getBySizeId(Integer idSize,Long idPcs);
    @Query(value = "select * from product_detail where id_pcs =:idPcs", nativeQuery = true)
    List<ProductDetail> getByProductColorSize(Long idPcs);

    Optional<ProductDetail> getProductDetailByProductColorSizeAndSize(ProductColorSize pcs, Size size);
}
