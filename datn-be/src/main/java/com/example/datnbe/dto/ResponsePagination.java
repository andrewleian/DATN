package com.example.datnbe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePagination {
    private Object data;
    private int current_page;
    private int total_page;
    private int total_item;
    private int size;
}
