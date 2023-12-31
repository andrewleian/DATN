package com.example.datnbe.service.impl;

import com.example.datnbe.dto.ShippingOrderDTO;
import com.example.datnbe.service.GiaoHangNhanhService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;

@Service
@RequiredArgsConstructor
public class GiaoHangNhanhServiceImpl implements GiaoHangNhanhService {
    private final RestTemplate restTemplate;
    private HttpEntity<Object> httpEntity;
    private HttpHeaders httpHeaders;
    private String tokenApiGhn;
    private String shopId;
    @Value("${api.ghn.ShopId}")
    public void getshopId(String shopId) {
        this.shopId = shopId;
    }
    @Value("${api.ghn.token}")
    public void getTokenApiGhn(String tokenApiGhn) {
        this.tokenApiGhn = tokenApiGhn;
    }

    @PostConstruct
    public void init(){
        httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.add("token",tokenApiGhn);
        httpHeaders.add("ShopId", shopId);
        httpEntity = new HttpEntity<>(httpHeaders);
    }
    @Override
    public ResponseEntity<?> getAllProvince() {  // tỉnh thành
        return restTemplate.exchange("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
                HttpMethod.GET, httpEntity, Object.class);
    }

    /**
     * Lấy Quận Huyện
     * @param id : là mã của tỉnh thành
     * @return : 1 Quận huyện
     */
    @Override
    public ResponseEntity<?> getDistrict(String id) { // Quận huyện
        return restTemplate.exchange("https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id="+id,
                HttpMethod.GET, httpEntity, Object.class);
    }

    @Override
    public ResponseEntity<?> getWard(String id) { // Phường xã
        return restTemplate.exchange("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id="+id,
                HttpMethod.GET, httpEntity, Object.class);
    }

    @Override
    public ResponseEntity<?> shippingFee(String jsonPayload) {
        HttpEntity<String> entity = new HttpEntity<>(jsonPayload,httpHeaders);
        String apiUrl = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
        return restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);

    }

    @Override
    public ResponseEntity<?> createShippingOrder(ShippingOrderDTO jsonBody) {
        HttpEntity<ShippingOrderDTO> entity = new HttpEntity<>(jsonBody,httpHeaders);
        String apiUrl = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create";
        return restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);
    }


}
