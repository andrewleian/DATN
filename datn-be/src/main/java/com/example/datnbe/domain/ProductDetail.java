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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Collection;

@Entity
@Table(name = "product_detail", schema = "datn_en", catalog = "")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetail {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;
    @Basic
    @Column(name = "amount")
    private Integer amount;
    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "productDetail")
    private Collection<BillDetail> billDetails;
    @OneToMany(mappedBy = "productDetail")
    private Collection<CartDetail> cartDetails;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_pcs", referencedColumnName = "id")
    private ProductColorSize productColorSize;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_size", referencedColumnName = "id")
    private Size size;

}
