package com.example.datnbe.repository;

import com.example.datnbe.domain.Color;
import com.example.datnbe.domain.Product;
import com.example.datnbe.domain.ProductColorSize;
import com.example.datnbe.domain.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductColorSizeRepository extends JpaRepository<ProductColorSize,Long> {
    @Modifying
    @Query(value = "UPDATE product_color_size\n" +
            "SET status = :productStatus\n" +
            "WHERE id_product = :idProduct;",nativeQuery = true)
    int changeStatusByProductBy(Long idProduct,String productStatus);

    @Modifying
    @Query(value = "UPDATE product_color_size\n" +
            "SET status = \n" +
            "  CASE \n" +
            "    WHEN status = 'active' THEN 'inactive'\n" +
            "    ELSE 'active'\n" +
            "  END\n" +
            "WHERE id = :id;",nativeQuery = true)
    int changeStatusByID(Long id);

    @Query(value = "Select * from product_color_size where id_product = :idProduct",nativeQuery = true)
    List<ProductColorSize> getByIdProduct(long idProduct);

    @Query(value = "select * from product_color_size where id_color = :idColor and id_product = :idProduct",nativeQuery = true)
    Optional<ProductColorSize> getByIdColorAndIdProduct(long idProduct,String idColor);

    Optional<ProductColorSize> findByProductAndColor(Product product, Color color);
}
