package com.example.datnbe.service;

import com.example.datnbe.dto.CommentDTO;
import com.example.datnbe.dto.ResponsePagination;

public interface CommentService {

    ResponsePagination getAllCommentsByProduct(Long idProduct,int pageNo, int pageSize);

    CommentDTO saveComment( CommentDTO comment);

    CommentDTO editComment(Long idComment, String conten);

}
