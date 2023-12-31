package com.example.datnbe.service;

import com.example.datnbe.domain.Color;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ColorService {
    Page<Color> getAllColor(Pageable pageable);

    Color getColorById(String id);

    Color saveColor(Color color);

    Color changeStatusColor(String id);

    List<Color> findByStatus(String status);
}
