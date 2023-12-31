package com.example.datnbe.repository;


import com.example.datnbe.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image,String> {

    @Query(value = "SELECT * from image i where id_pcs = :id and status = 'active'",nativeQuery = true)
    List<Image> getImageCodeByPcsId(long id);
}
