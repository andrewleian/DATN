package com.example.datnbe.repository;

import com.example.datnbe.domain.CategoryDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDetailRepository extends JpaRepository<CategoryDetail,Long> {
}
