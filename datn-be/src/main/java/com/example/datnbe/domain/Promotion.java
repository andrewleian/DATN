package com.example.datnbe.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
import javax.persistence.OneToMany;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Promotion {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;
    @Basic
    @Column(name = "title")
    private String title;
    @Basic
    @Column(name = "content")
    private String content;
    @Basic
    @Column(name = "discount_value")
    private BigDecimal discountValue;
    @Basic
    @Column(name = "start_at")
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Timestamp startAt;
    @Basic
    @Column(name = "end_at")
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Timestamp endAt;
    @Basic
    @Column(name = "create_at")
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Timestamp createAt;
    @Basic
    @Column(name = "update_at")
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Timestamp updateAt;
    @Basic
    @Column(name = "status")
    private String status;
    @JsonIgnore
    @OneToMany(mappedBy = "promotion")
    private Collection<PromotionDetail> promotionDetails;

}
