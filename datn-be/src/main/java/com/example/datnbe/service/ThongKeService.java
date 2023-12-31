package com.example.datnbe.service;

import com.example.datnbe.response.ThongKeResponse;

import java.util.List;

public interface ThongKeService {

    Integer getDoanhThuTheoTuan();

    int getDonDaBan();

    int getSanPhamTheoTuan();

    List<ThongKeResponse> getDoangThuTheoKhoang(String fromDate, String toDate);

    List<ThongKeResponse> getHoaDonTheoKhoang(String fromDate, String toDate);

}
