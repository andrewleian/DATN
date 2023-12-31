package com.example.datnbe.service;

import com.example.datnbe.domain.Promotion;
import com.example.datnbe.dto.PromotionDTO;
import com.example.datnbe.dto.PromotionDetailsDTO;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.exception.CustomerException;


public interface PromotionService {
    Promotion createPromotion(PromotionDTO promotionDTO) throws CustomerException;

    ResponsePagination getAllPromotion(String keyword,String status, int page, int pageSize) throws CustomerException;

    Promotion updatePromotion(PromotionDTO promotionDTO) throws CustomerException;

    Boolean deletePromotion(Long promotionId) throws CustomerException;

    Boolean deletePromotionDetails(Long idPCZ, Long idPromotion) throws CustomerException;

    Promotion getPromotionById(Long promotionId) throws CustomerException;

    PromotionDetailsDTO getAllByIdPromotion(Long idPromotion) throws CustomerException;
}
