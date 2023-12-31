package com.example.datnbe.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "bill_detail", schema = "datn_en", catalog = "")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BillDetail {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;
    @Basic
    @Column(name = "unit_price")
    private Double unitPrice; //giá gốc của sản phẩm
    @Basic
    @Column(name = "amount")
    private Integer amount;
    @Basic
    @Column(name = "note")
    private String note;
    @Basic
    @Column(name = "promotional_price")
    private BigDecimal promotionalPrice; //Giá khuyến mại
    @Basic
    @Column(name = "discount")
    private BigDecimal discount; //% giảm giá khi có khuyến mại
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_bill", referencedColumnName = "id")
    private Bill bill;
    @ManyToOne
    @JoinColumn(name = "id_product_details", referencedColumnName = "id")
    @JsonIgnore
    private ProductDetail productDetail;

}
