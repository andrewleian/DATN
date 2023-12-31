package com.example.datnbe.service.impl;

import com.example.datnbe.domain.Color;
import com.example.datnbe.repository.ColorRepository;
import com.example.datnbe.service.ColorService;
import com.example.datnbe.common.CommonString;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ColorServiceImpl implements ColorService {
    private final ColorRepository colorRepository;

    @Override
    public Page<Color> getAllColor(Pageable pageable) {
        Page<Color> colors = colorRepository.findAll(pageable);
        return colors;
    }

    @Override
    public Color getColorById(String id) {
        Optional<Color> colorOptional = colorRepository.findById(id);
        if (colorOptional.isPresent()) {
            return colorOptional.get();
        }
        return null;
    }

    @Override
    public Color saveColor(Color color) {
        try {
            return colorRepository.save(color);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public Color changeStatusColor(String id) {
        Color color = getColorById(id);
        if (color != null) {
            if (color.getStatus().equalsIgnoreCase(CommonString.Status.ACTIVATED.getValue())) {
                color.setStatus(CommonString.Status.INACTIVATED.getValue());
            } else {
                color.setStatus(CommonString.Status.ACTIVATED.getValue());
            }
        }
        colorRepository.save(color);
        return getColorById(id);
    }

    @Override
    public List<Color> findByStatus(String status) {
        List<Color> colors = colorRepository.findByStatusIs(status);
        return colors;
    }

}
