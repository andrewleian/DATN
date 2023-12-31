package com.example.datnbe.service.impl;

import com.example.datnbe.domain.Size;
import com.example.datnbe.repository.SizeRepository;
import com.example.datnbe.service.SizeService;
import com.example.datnbe.common.CommonString;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SizeServiceImpl implements SizeService {
    private final SizeRepository sizeRepository;

    @Override
    public Page<Size> getAllSize(Pageable pageable) {
        Page<Size> colors = sizeRepository.findAll(pageable);
        return colors;
    }

    @Override
    public Size getSizeById(Integer id) {
        Optional<Size> optional = sizeRepository.findById(id);
        if (optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

    @Override
    public Size saveSize(Size size) {
        try {
            boolean checkExists = sizeRepository.existsSizeByNameIs(size.getName());
            if (checkExists == true){
                throw new RuntimeException("Size đã tồn tại!");
            }
            return sizeRepository.save(size);
        } catch (DataAccessException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Size changeStatusSize(Integer id) {
        Size size = getSizeById(id);
        if (size != null) {
            if (size.getStatus().equalsIgnoreCase(CommonString.Status.ACTIVATED.getValue())) {
                size.setStatus(CommonString.Status.INACTIVATED.getValue());
            } else {
                size.setStatus(CommonString.Status.ACTIVATED.getValue());
            }
            return saveSize(size);
        } else {
            throw new RuntimeException("Size not found");
        }
    }

    @Override
    public Size updateSize(Size size) {
        Timestamp timestamp = Timestamp.from(Instant.now());
        size.setUpdateAt(timestamp);
        return sizeRepository.save(size);
    }

    @Override
    public List<Size> findSizesActive() {
        List<Size> sizes = sizeRepository.findByStatusIs("active");
        return sizes;
    }

}
