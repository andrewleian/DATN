package com.example.datnbe.controller;

import com.example.datnbe.domain.Color;
import com.example.datnbe.domain.PagedResponse;
import com.example.datnbe.dto.ColorDTO;
import com.example.datnbe.request.ColorCreateRequest;
import com.example.datnbe.service.ColorService;
import com.example.datnbe.common.CommonString;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin
public class ColorController {

    private final ModelMapper modelMapper;
    private final ColorService colorService;

    @GetMapping("/color")
    public ResponseEntity<PagedResponse<ColorDTO>> getAllColor(Integer pageNumber, Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Color> colorPage = colorService.getAllColor(pageable);
        List<Color> colors = colorPage.getContent();
        List<ColorDTO> colorDTOS = modelMapper.map(colors, new TypeToken<List<ColorDTO>>() {}.getType());
        Page<ColorDTO> colorDTOPage = new PageImpl<>(colorDTOS,pageable,colorDTOS.size());
        PagedResponse<ColorDTO> response = new PagedResponse<>(colorDTOS,colorDTOPage.getTotalPages(),colorDTOPage.getTotalElements(),
                colorDTOPage.getNumber(),colorDTOPage.getSize());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/staff/color/{id}")
    public ResponseEntity<?> getColorById(@PathVariable(name = "id") String id){
        Color color = colorService.getColorById(id);
        if (color != null){
            ColorDTO colorDTO = modelMapper.map(color,ColorDTO.class);
            return ResponseEntity.ok(colorDTO);
        }else {
            throw new ServiceException("Color không tồn tại");
        }

    }
    @PostMapping("/staff/color")
    public ResponseEntity<?> createNewColor(@Valid @RequestBody ColorCreateRequest request, BindingResult result) {
        if (result.hasErrors()){
            return ResponseEntity.badRequest().build();
        }
        Timestamp timestamp = Timestamp.from(Instant.now());
        Color color = new Color();
        color.setId(request.getHexCode());
        color.setName(request.getName());
        color.setCreateAt(timestamp);
        color.setStatus(CommonString.Status.ACTIVATED.getValue());
        Color check = colorService.saveColor(color);
        if (check == null) {
            throw new RuntimeException("Tạo không thành công");
        } else {
            return ResponseEntity.ok(check);
        }
    }

    @PutMapping("/staff/color")
    public ResponseEntity<?> updateColor(@Valid @RequestBody ColorCreateRequest request, BindingResult result) {
        if (result.hasErrors()){
            return ResponseEntity.badRequest().build();
        }
        Timestamp timestamp = Timestamp.from(Instant.now());
        Color color = colorService.getColorById(request.getHexCode());
        color.setId(request.getHexCode());
        color.setName(request.getName());
        color.setCreateAt(timestamp);
        Color check = colorService.saveColor(color);
        if (check == null) {
            throw new RuntimeException("Cập nhật không thành công");
        } else {
            return ResponseEntity.ok(check);
        }
    }

    @PostMapping("/staff/color/{id}")
    public ResponseEntity<?> changeStatus(@PathVariable(name = "id") String id) {
        Color color = colorService.changeStatusColor(id);
        if (color == null) {
            throw new RuntimeException("Cập nhật không thành công");
        } else {
            return ResponseEntity.ok(color);
        }
    }

    @GetMapping("/staff/colors/active")
    public ResponseEntity<List<ColorDTO>> getAllColor(){

        List<Color> colors = colorService.findByStatus("active");
        List<ColorDTO> colorDTOS = modelMapper.map(colors, new TypeToken<List<ColorDTO>>() {}.getType());
        return ResponseEntity.ok(colorDTOS);
    }
}
