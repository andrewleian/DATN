package com.example.datnbe.repository;

import com.example.datnbe.domain.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ColorRepository extends JpaRepository<Color,String> {

    List<Color> findByNameOrId(String name, String id);

    List<Color> findByStatusIs(String status);
}
