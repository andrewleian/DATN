package com.example.datnbe.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class SizeCreateRequest {
    @NotBlank
    String name;
}
