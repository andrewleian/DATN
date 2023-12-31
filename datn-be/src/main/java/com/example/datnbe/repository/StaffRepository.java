package com.example.datnbe.repository;


import com.example.datnbe.domain.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    @Query("select s from Staff s where s.username=?1")
    public Optional<Staff> findByUsername(String username);

    @Query("select c.username from Customer  c where c.username =:key")
    String checkUseCus(@PathVariable("key") String key);

    @Query("Select c from Staff c where c.status = 'enable' ORDER BY c.id desc ")
    List<Staff> getAll();

    @Query("select distinct c from Staff c where c.status = :status and( c.gender like %:search% or c.email like %:search% or c.username like %:search% or c.phone like %:search% or c.staffName like %:search% )")
    Page<Staff> findAllSeach(String status,String search, Pageable pageable);

    Page<Staff> findAllByStatus(String status, Pageable pageable);

    @Query(" SELECT c FROM Staff c WHERE  c.id <> :key ")
    List<Staff> getCheckUpdate(Long key);

}
