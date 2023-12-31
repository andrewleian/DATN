package com.example.datnbe.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerBillRequest {
    private Long idBill;
    private Long idCustomer;
}
