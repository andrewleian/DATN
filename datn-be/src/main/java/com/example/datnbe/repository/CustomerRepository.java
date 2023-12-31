package com.example.datnbe.repository;


import com.example.datnbe.domain.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("select c from Customer c where c.username=?1")
    Optional<Customer> findByUsername(String username);

    @Query("select c from Customer c where c.email=?1 or c.phone=?1")
    Optional<Customer> findByKeyWord(String key);

    Optional<Customer> findByPhone(String phone);

    Optional<Customer> findCustomerByEmail(String email);

    @Query("SELECT c FROM Customer c WHERE c.status = :status AND (c.email LIKE %:search% OR c.customerName LIKE %:search% OR c.phone LIKE %:search%)")
    Page<Customer> findAllBySearch(String status, String search, Pageable pageable);

    Page<Customer> findAllByStatus(String status, Pageable pageable);

    Customer findCustomerByUsername(String username);

    @Query("SELECT c FROM Customer c WHERE c.status = 'enable' AND (c.email LIKE %:search% OR c.customerName LIKE %:search% OR c.phone LIKE %:search%)")
    List<Customer> searchCustomer(String search);
}
