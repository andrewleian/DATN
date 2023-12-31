package com.example.datnbe.repository;

import com.example.datnbe.domain.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query("select  count (c) from Cart c where c.customer.id=:key")
    int checkCart(Long key);

    @Query("select c.id from  Cart c where c.customer.id =:key1")
    Long getIdCart(@PathVariable("key1") Long key1);
}
