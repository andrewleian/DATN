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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bill {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;
    @Basic
    @Column(name = "customer_name")
    private String customerName;
    @Basic
    @Column(name = "phone")
    private String phone;
    @Basic
    @Column(name = "email")
    private String email;
    @Basic
    @Column(name = "address")
    private String address;
    @Basic
    @Column(name = "total_payment")
    private BigDecimal totalPayment;
    @Basic
    @Column(name = "note")
    private String note;
    @Basic
    @Column(name = "create_at")
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss")
    private Timestamp createAt;
    @Basic
    @Column(name = "update_at")
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss")
    private Timestamp updateAt;
    @Basic
    @Column(name = "status")
    private String status;
    @Basic
    @Column(name = "payment_date")
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Timestamp paymentDate;
    @Basic
    @Column(name = "payments")
    private String payments;
    @Basic
    @Column(name = "bill_code")
    private String billCode;
    @Basic
    @Column(name = "note_cancel")
    private String noteCancel;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_customer", referencedColumnName = "id")
    private Customer customer;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_staff", referencedColumnName = "id")
    private Staff staff;
    @OneToMany(mappedBy = "bill")
    @JsonIgnore
    private Collection<BillDetail> billDetails;

}
