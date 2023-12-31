package com.example.datnbe.repository;

import com.example.datnbe.domain.PromotionDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface PromotionDetailRepository extends JpaRepository<PromotionDetail,Long> {
    @Query("SELECT pd from PromotionDetail pd where pd.productColorSize.id = :idPCZ and pd.promotion.id = :idPromotion")
    Optional<PromotionDetail> getPromotionDetails(Long idPCZ, Long idPromotion);

    List<PromotionDetail> getPromotionDetailByPromotionId(Long idPromotion);
    @Modifying
    @Transactional
    @Query("DELETE FROM PromotionDetail pd WHERE pd.promotion.id = :idPromotion")
    void deleteAllByIDPromotion(Long idPromotion);
}
