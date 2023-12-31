package com.example.datnbe.repository;

import com.example.datnbe.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>  {

    @Query(value = "SELECT c.name\n" +
            "            FROM category c\n" +
            "            INNER JOIN category_detail cd ON c.id = cd.id_category\n" +
            "            INNER JOIN product p ON cd.id_product = p.id\n" +
            "            WHERE p.id = :id",nativeQuery = true)
    List<String> getCategoriesByProductId(long id);
}
