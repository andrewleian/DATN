package com.example.datnbe.repository.impl;

import com.example.datnbe.domain.QProduct;
import com.example.datnbe.dto.ProductDTO;
import com.example.datnbe.repository.custom.CustomProductRepository;
import com.querydsl.core.QueryResults;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class CustomProductRepositoryImpl implements CustomProductRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<ProductDTO> getAll(Pageable pageable, String tuKhoa) {
        QProduct p = QProduct.product;

        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(em);

        JPAQuery<Tuple> query = jpaQueryFactory.select(
                p.id,
                p.name,
                p.manufacturer,
                p.status,
                p.createAt,
                p.updateAt,
                p.isNew,
                p.isBestSeller,
                p.productCode
        ).from(p);

        if (tuKhoa != null) {
            query.where(p.name.contains(tuKhoa).or(p.manufacturer.contains(tuKhoa)));
        }

        QueryResults<Tuple> queryResults = query.offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        List<ProductDTO> productDTOS = queryResults.getResults().stream().map(tuple -> {
            Long id = tuple.get(0, Long.class);
            String name = tuple.get(1, String.class);
            String manufacturer = tuple.get(2, String.class);
            String status = tuple.get(3, String.class);
            Timestamp createAt = tuple.get(4, Timestamp.class);
            Timestamp updateAt = tuple.get(5, Timestamp.class);
            Integer isNew = tuple.get(6,Integer.class);
            Integer isBestSeller = tuple.get(7,Integer.class);
            String productCode = tuple.get(8, String.class);

            ProductDTO productDTO = new ProductDTO();
            productDTO.setName(name);
            productDTO.setManufacturer(manufacturer);
            productDTO.setId(id);
            productDTO.setStatus(status);
            productDTO.setCreateAt(createAt);
            productDTO.setUpdateAt(updateAt);
            productDTO.setIsNew(isNew);
            productDTO.setIsBestSeller(isBestSeller);
            productDTO.setProductCode(productCode);

            return productDTO;
        }).collect(Collectors.toList());

        Page<ProductDTO> productPage = new PageImpl<>(productDTOS, pageable, productDTOS.size());
        return productPage;
    }
}
