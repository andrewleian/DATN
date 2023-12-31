package com.example.datnbe.repository;

import com.example.datnbe.domain.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SizeRepository extends JpaRepository<Size, Integer> {

    @Query(value = "Select s.name as size\n" +
            "from product_detail pd \n" +
            "left join size_detail sd on sd.id_product_detail = pd.id\n" +
            "left join size s on sd.id_size = s.id\n" +
            "join color c on pd.id_color = c.id\n" +
            "where pd.id = 2\n" +
            "order by pd.id asc",nativeQuery = true)
    List<String> getSizeByProductDetailId(long id);

    boolean existsSizeByNameIs(String name);

    List<Size> findByStatusIs(String status);

    Optional<Size> findByName(String name);
}

