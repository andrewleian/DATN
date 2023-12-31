package com.example.datnbe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Long id;
    @NotBlank(message = "Vui lòng nhập Comment.")
    @NotNull(message = "Comment Không được trống")
    private String content;
    private Timestamp createAt;
    private Timestamp updateAt;
    private String status;

    private Long idCustomer;
    private String nameCustomer;
    @NotNull(message = "id_Product null")
    private Long idProduct;
}
