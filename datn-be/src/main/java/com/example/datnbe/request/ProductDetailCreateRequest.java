package com.example.datnbe.request;

import com.example.datnbe.domain.Image;
import com.example.datnbe.dto.ColorDTO;
import com.example.datnbe.dto.SizeDTO;
import com.example.datnbe.dto.SizeProductDetailDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.NumberFormat;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Setter
@Getter
public class ProductDetailCreateRequest {
    @NotBlank
    @NumberFormat
    long productId;
    @NotBlank
    String colorId;
    List<SizeDTO> sizeDTOSs;
    Long id;//id product
    long idPcs; //Theo product color size
    @NotBlank
    String name; //Product name
    @NotBlank
    String manufacturer;
    @NotBlank
    String productCode;
    @NotBlank
    String status;
    @NotBlank
    @NumberFormat
    int isNew;
    @NotBlank
    @NumberFormat
    int isBestSeller;
    @NotBlank
    @NumberFormat
    int price;
    ColorDTO colorDTO; //mã màu hex
    List<SizeProductDetailDTO> sizeProductDetailDTOS;// chứa id productDetail,size và số lượng
    List<Image> images;
}
