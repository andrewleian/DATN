package com.example.datnbe.service;

import com.example.datnbe.domain.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SizeService {
    Page<Size> getAllSize(Pageable pageable);

    Size getSizeById(Integer id);

    Size saveSize(Size Size);

    Size changeStatusSize(Integer id);

    Size updateSize(Size size);

    List<Size> findSizesActive();

}
