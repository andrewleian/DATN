package com.example.datnbe.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer implements UserDetails {
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
    @Column(name = "birthday")
    private LocalDate birthday;
    @Basic
    @Column(name = "username")
    private String username;
    @Basic
    @JsonIgnore
    @Column(name = "password")
    private String password;
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
    @Basic
    @Column(name = "gender")
    private String gender;
    @JsonIgnore
    @OneToMany(mappedBy = "customer",fetch = FetchType.LAZY)
    private Collection<Address> addresses;
    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    private Collection<Bill> bills;
    @OneToOne(mappedBy = "customer")
    @JsonIgnore
    private Cart cart;
    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private Collection<Comment> comments;

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", customerName='" + customerName + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", birthday=" + birthday +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", createAt=" + createAt +
                ", updateAt=" + updateAt +
                ", status='" + status + '\'' +
                '}';
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities=new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("CUSTOMER"));
        return  authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.status.equals("enable");
    }
}
