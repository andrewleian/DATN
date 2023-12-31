package com.example.datnbe.service.impl;

//import com.example.datnbe.dto.TopProductDTO;
import com.example.datnbe.repository.BillRepository;
        import com.example.datnbe.response.ThongKeResponse;
import com.example.datnbe.service.ThongKeService;
import lombok.RequiredArgsConstructor;
        import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
        import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
        import java.util.List;

@Service
@RequiredArgsConstructor
public class ThongKeServiceImpl implements ThongKeService {

    private final BillRepository billRepository;
    @Override
    public Integer getDoanhThuTheoTuan() {
        return billRepository.getDoanhThuTheoKhoang() == null ? 0:billRepository.getDoanhThuTheoKhoang();
    }

    @Override
    public int getSanPhamTheoTuan() {
        return billRepository.getSanPhamTheoTuan();
    }

    @Override
    public int getDonDaBan() {
        return billRepository.getBillDaBan();
    }

    @Override
    public List<ThongKeResponse> getDoangThuTheoKhoang(String fromDate, String toDate) {

        SimpleDateFormat inputFormat = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        List<ThongKeResponse> doanhThu = new ArrayList<>();
        try {
            Date fromDateObj = inputFormat.parse(fromDate);
            Date toDateObj = inputFormat.parse(toDate);

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(toDateObj);
            calendar.add(Calendar.DAY_OF_MONTH, 1);
            Date modifiedToDate = calendar.getTime();

            String formattedFromDate = outputFormat.format(fromDateObj);
            String formattedToDate = outputFormat.format(modifiedToDate);
            List<Object[]> objectList = billRepository.getDoanhTuTheoKhoang(formattedFromDate, formattedToDate);

            for (Object[] obj : objectList) {
                String createAt = (String) obj[0];
                BigDecimal totalPaymentDecimal = (BigDecimal) obj[1];
                int totalPayment = totalPaymentDecimal == null ? 0 :totalPaymentDecimal.intValue();

                ThongKeResponse response = new ThongKeResponse();
                response.setName(createAt);
                response.setValue(totalPayment);
                doanhThu.add(response);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }


        return doanhThu;
    }

    @Override
    public List<ThongKeResponse> getHoaDonTheoKhoang(String fromDate, String toDate) {
        List<ThongKeResponse> hoaDon = new ArrayList<>();
        List<Object[]> objectList = billRepository.getHoaDonTheoKhoang(fromDate, toDate);

        for (Object[] obj : objectList) {
            String createAt = (String) obj[0];
            BigInteger bigInteger = (BigInteger) obj[1];
            Long longValue = bigInteger.longValue();
            int amountFinal = longValue.intValue();

            ThongKeResponse response = new ThongKeResponse();
            response.setName(createAt);
            response.setValue(amountFinal);
            hoaDon.add(response);
        }
        return hoaDon;
    }
}
