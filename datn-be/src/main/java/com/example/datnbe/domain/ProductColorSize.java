package com.example.datnbe.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
@Table(name = "product_color_size", schema = "datn_en", catalog = "")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductColorSize {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;
    @Basic
    @Column(name = "price")
    private Integer price;
    @Basic
    @Column(name = "create_at")
    @CreationTimestamp
    private Timestamp createAt;
    @Basic
    @Column(name = "update_at")
    @UpdateTimestamp
    private Timestamp updateAt;
    @Basic
    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "productColorSize")
    @JsonManagedReference
    private Collection<Image> images;
    @ManyToOne
    @JoinColumn(name = "id_product", referencedColumnName = "id")
    @JsonIgnore
    private Product product;
    @ManyToOne
    @JoinColumn(name = "id_color", referencedColumnName = "id")
    private Color color;
    @OneToMany(mappedBy = "productColorSize")
    private Collection<ProductDetail> productDetails;
    @OneToMany(mappedBy = "productColorSize")
    private Collection<PromotionDetail> promotionDetails;

}
