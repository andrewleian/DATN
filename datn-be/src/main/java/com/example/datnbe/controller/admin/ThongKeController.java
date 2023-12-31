package com.example.datnbe.controller.admin;

import com.example.datnbe.response.ThongKeResponse;
import com.example.datnbe.service.ThongKeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/thong-ke")
@RequiredArgsConstructor
@CrossOrigin
public class ThongKeController {

    private final ThongKeService thongKeService;

    @GetMapping("/doanh-thu-tuan")
    public ResponseEntity<Integer> getDoanhThuTrongTuan(){
        int doanhThu = thongKeService.getDoanhThuTheoTuan();

        return ResponseEntity.ok(doanhThu);
    }

    @GetMapping("/san-pham-tuan")
    public ResponseEntity<Integer> getSanPhamTrongTuan(){
        int sanPhamTuan = thongKeService.getSanPhamTheoTuan();

        return ResponseEntity.ok(sanPhamTuan);
    }

    @GetMapping("/don-da-ban")
    public ResponseEntity<Integer> getBillDaBan(){
        int donDaBan = thongKeService.getDonDaBan();

        return ResponseEntity.ok(donDaBan);
    }
    @GetMapping("/doanh-thu-theo-khoang")
    public ResponseEntity<List<ThongKeResponse>> doanhThuTheoKhoang(@RequestParam("from_date")String fromDate,
                                                                    @RequestParam("to_date")String toDate){
        List<ThongKeResponse> doanhThuMap = thongKeService.getDoangThuTheoKhoang(fromDate, toDate);

        return ResponseEntity.ok(doanhThuMap);
    }

    @GetMapping("/hoa-don-theo-khoang")
    public ResponseEntity<List<ThongKeResponse>> hoaDonTheoKhoang(@RequestParam("from_date")String fromDate,
                                                                    @RequestParam("to_date")String toDate){
        List<ThongKeResponse> hoaDonTk = thongKeService.getHoaDonTheoKhoang(fromDate, toDate);

        return ResponseEntity.ok(hoaDonTk);
    }
}
