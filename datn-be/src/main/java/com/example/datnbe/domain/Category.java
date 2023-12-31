package com.example.datnbe.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
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
import java.sql.Timestamp;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;
    @Basic
    @Column(name = "name")
    private String name;
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
    @OneToMany(mappedBy = "category")
    private List<CategoryDetail> categoryDetails;

}
