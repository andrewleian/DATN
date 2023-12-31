package com.example.datnbe.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Color {
    @Id
    @Column(name = "id")
    private String id;
    @Basic
    @Column(name = "name")
    private String name;
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
    @OneToMany(mappedBy = "color")
    private Collection<ProductColorSize> productColorSizes;

}
