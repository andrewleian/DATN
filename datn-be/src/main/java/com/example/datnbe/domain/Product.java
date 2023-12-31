package com.example.datnbe.domain;

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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "product_code")
    private String productCode;
    @Basic
    @Column(name = "manufacturer")
    private String manufacturer;
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
    @Basic
    @Column(name = "is_new")
    private Integer isNew;
    @Basic
    @Column(name = "is_best_seller")
    private Integer isBestSeller;
    @Basic
    @Column(name = "is_active")
    private Integer isActive;
    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Collection<CategoryDetail> categoryDetails;
    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Collection<Comment> comments;
    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Collection<ProductColorSize> productColorSizes;

}
