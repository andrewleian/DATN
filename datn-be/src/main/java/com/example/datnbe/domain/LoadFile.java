package com.example.datnbe.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoadFile {
    private String filename;
    private String fileType;
    private String fileSize;
    private byte[] file;

}
