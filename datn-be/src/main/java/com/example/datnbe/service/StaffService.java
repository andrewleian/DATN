package com.example.datnbe.service;

import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.dto.StaffDTO;

import java.sql.Timestamp;
import java.util.List;

public interface StaffService {
    ResponsePagination getListStaff(String dataSearch, int pageNumber, int pageSize,
                                    String orderBy, String orderDirection, String status);

    List<String> saveStaff(StaffDTO staffDTO);

    List<String> updateStaff(StaffDTO staffDTO, Long id);

    StaffDTO finById(long id);

    void deleteStaff(long id);

    Timestamp getTimestamp();

}
