package com.example.datnbe.repository.impl;


import com.example.datnbe.domain.QProductDetail;
import com.example.datnbe.domain.QSize;
import com.example.datnbe.dto.ProductDetailDTO;
import com.example.datnbe.dto.SizeProductDetailDTO;
import com.example.datnbe.repository.CategoryRepository;
import com.example.datnbe.repository.ColorRepository;
import com.example.datnbe.repository.ImageRepository;
import com.example.datnbe.repository.SizeRepository;
import com.example.datnbe.repository.custom.CustomProductDetailRepository;
import com.example.datnbe.request.ProductDetailSearchRequest;
import com.querydsl.core.QueryResults;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class CustomProductDetailRepositoryImpl implements CustomProductDetailRepository {
    private final CategoryRepository categoryRepository;
    private final ImageRepository imageRepository;
    private final SizeRepository sizeRepository;

    @PersistenceContext
    private EntityManager em;
    private final ColorRepository colorRepository;

    private final ModelMapper modelMapper;


    @Override
    public List<SizeProductDetailDTO> getAllSizePd(Long idPcs) {
        QProductDetail pd = QProductDetail.productDetail;
        QSize s = QSize.size;

        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(em);

        JPAQuery<Tuple> query = jpaQueryFactory.select(
                        pd.id,
                        s.name,
                        pd.amount
                ).from(pd)
                .join(s).on(s.id.eq(pd.size.id))
                .groupBy(pd.id)
                .where(pd.productColorSize.id.eq(idPcs).and(pd.status.eq("active")))
                .orderBy(s.name.asc());
        QueryResults<Tuple> productQueryResults = query.fetchResults();
        List<SizeProductDetailDTO> sizePds = productQueryResults.getResults().stream().map(tuple -> {
            Long productDetailId = tuple.get(0, Long.class);
            String sizeName = tuple.get(1, String.class);
            Integer amount = tuple.get(2, Integer.class);

            SizeProductDetailDTO spd = new SizeProductDetailDTO();
            spd.setIdProductDetail(Long.parseLong(productDetailId.toString()));
            spd.setName(sizeName);
            spd.setAmount(amount);
            return spd;
        }).collect(Collectors.toList());
        return sizePds;
    }

    @Override
    public Page<ProductDetailDTO> getAllForStaff(Pageable pageable, ProductDetailSearchRequest request) {
        return null;
    }
}
