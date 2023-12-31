package com.example.datnbe.repository;


import com.example.datnbe.domain.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c where c.product.id =:key")
    Page<Comment> getAllComments( Pageable pageable, Long key);
    @Override
    Optional<Comment> findById(Long id);
    @Query("select c from Comment c where c.product.id=:key and c.customer.id=:key2")
    List<Comment> numberOfCommentsByCustomer( Long key, Long key2);
}
