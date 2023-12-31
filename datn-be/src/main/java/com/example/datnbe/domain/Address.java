package com.example.datnbe.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;
    @Basic
    @Column(name = "province")
    private String province;
    @Basic
    @Column(name = "district")
    private String district;
    @Basic
    @Column(name = "ward")
    private String ward;

    @Basic
    @Column(name = "content")
    private String content;
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

    @ManyToOne
    @JoinColumn(name = "id_customer", referencedColumnName = "id")
    @JsonIgnore
    private Customer customer;

    public Address(String content, Customer value) {
    }
}
