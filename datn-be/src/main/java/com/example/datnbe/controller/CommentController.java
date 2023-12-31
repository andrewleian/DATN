package com.example.datnbe.controller;

import com.example.datnbe.dto.CommentDTO;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.exception.MyCustomException;
import com.example.datnbe.service.impl.CommentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class CommentController {
    @Autowired
    CommentServiceImpl service;

    @CrossOrigin
    @GetMapping("/comment/get-list/{idProduct}")
    public ResponsePagination getAllComment(@PathVariable Long idProduct, @RequestParam(defaultValue = "1") Integer pageNumber,
                                            @RequestParam(defaultValue = "10") Integer pageSize) {

        return service.getAllCommentsByProduct(idProduct, pageNumber, pageSize);
    }

    @CrossOrigin
    @PostMapping("/customer/comment/add")
    public ResponseEntity<?> saveComment(@Valid @RequestBody CommentDTO dto) {
        CommentDTO comment = service.saveComment(dto);
        if (comment != null) {
            return ResponseEntity.ok().body("Create successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @CrossOrigin
    @PutMapping("/customer/comment/edit-comment/{id}")
    public ResponseEntity<?> editComment(@Valid @PathVariable Long id,@RequestParam String conten) {
        CommentDTO comment = service.editComment(id,conten);
        if (comment != null) {
            return ResponseEntity.ok().body("Update successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    /**
     * check validate
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
            Map<String, String> errors = new HashMap<>();
            ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
