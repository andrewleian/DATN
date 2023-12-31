package com.example.datnbe.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ColorCreateRequest {
    @NotBlank
    String hexCode;
    @NotBlank
    String name;
}
