package com.example.datnbe.controller;

import com.example.datnbe.common.CommonString;
import com.example.datnbe.domain.PagedResponse;
import com.example.datnbe.domain.Size;
import com.example.datnbe.dto.ColorDTO;
import com.example.datnbe.dto.SizeDTO;
import com.example.datnbe.request.SizeCreateRequest;
import com.example.datnbe.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin
public class SizeController {
    private final ModelMapper modelMapper;
    private final SizeService sizeService;

    @GetMapping("/size")
    public ResponseEntity<PagedResponse<SizeDTO>> getAllSize(Integer pageNumber, Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Size> sizes = sizeService.getAllSize(pageable);
        List<SizeDTO> sizeDTOS = modelMapper.map(sizes.getContent(), new TypeToken<List<SizeDTO>>() {}.getType());
        Page<SizeDTO> sizeDTOPage = new PageImpl<>(sizeDTOS,pageable,sizeDTOS.size());
        PagedResponse<SizeDTO> response = new PagedResponse<>(sizeDTOS,sizeDTOPage.getTotalPages(),sizeDTOPage.getTotalElements(),
                sizeDTOPage.getNumber(),sizeDTOPage.getSize());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/staff/size")
    public ResponseEntity<List<SizeDTO>> getAllSizeActive(){
        List<Size> sizes = sizeService.findSizesActive();
        List<SizeDTO> sizeDTOS = modelMapper.map(sizes, new TypeToken<List<SizeDTO>>() {}.getType());
        return ResponseEntity.ok(sizeDTOS);
    }
    @GetMapping("/staff/size/{id}")
    public ResponseEntity<?> getSizeById(@PathVariable(name = "id") Integer id){
        Size size = sizeService.getSizeById(id);
        SizeDTO sizeDTO = modelMapper.map(size,SizeDTO.class);
        return ResponseEntity.ok(sizeDTO);
    }
    @PostMapping("/staff/size")
    public ResponseEntity<?> createNewsize(@RequestBody @Valid SizeCreateRequest request, BindingResult result) {
        if (result.hasErrors()){
            return ResponseEntity.badRequest().build();
        }
        Size size = new Size();
        size.setName(request.getName());
        size.setStatus(CommonString.Status.ACTIVATED.getValue());
        Size check = sizeService.saveSize(size);
        if (check == null){
            throw new RuntimeException("Tạo không thành công");
        }else {
            return ResponseEntity.ok(check);
        }
    }

    @PutMapping("/staff/size/{id}")
    public ResponseEntity<?> updatesize(
            @PathVariable(name = "id") Integer id
            ,@Valid @RequestBody SizeCreateRequest request,
            BindingResult result
    ){
        if (result.hasErrors()){
            return ResponseEntity.badRequest().build();
        }
        System.out.println("id"+id);
        Timestamp timestamp = Timestamp.from(Instant.now());
        Size size = sizeService.getSizeById(id);
        size.setId(id);
        size.setName(request.getName());
        size.setCreateAt(timestamp);
        Size check = sizeService.updateSize(size);
        if (check == null){
            throw new RuntimeException("Cập nhật không thành công");
        }else {
            return ResponseEntity.ok(check);
        }
    }
    @DeleteMapping("/staff/size/{id}")
    public ResponseEntity<?> changeStatus(@PathVariable(name = "id") Integer id){
        Size size = sizeService.changeStatusSize(id);
        if (size == null){
            throw new RuntimeException("Cập nhật không thành công");
        }else {
            return ResponseEntity.ok(size);
        }
    }
    @GetMapping("/staff/size/active")
    public List<SizeDTO> getSizeActice(){
        List<Size> sizes = sizeService.findSizesActive();

        List<SizeDTO> sizeDTOS = modelMapper.map(sizes, new TypeToken<List<ColorDTO>>() {}.getType());
        return sizeDTOS;
    }
}
