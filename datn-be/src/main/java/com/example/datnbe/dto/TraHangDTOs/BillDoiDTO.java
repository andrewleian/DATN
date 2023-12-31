package com.example.datnbe.dto.TraHangDTOs;

import com.example.datnbe.domain.ProductDetail;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BillDoiDTO {  // dùng rồi
    private Long idBillDetail;
    private Long idBill;
    private Long idProductDetail;
    private Long idCustomer;
    private Double unitPrice;
    private Integer amount;
    private String nameSize;
    private String nameColor;
    private String productName;
    //

    private Long idBillDoiMoi;
    private List<ProductDetail> getListProduct;

}
