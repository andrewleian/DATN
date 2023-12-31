package com.example.datnbe.repository;

import com.example.datnbe.domain.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    @Query("SELECT b FROM Bill b where b.customer.id = :customerId AND b.status = :status")
    Page<Bill> findByCustomerId(Long customerId, String status, Pageable pageable);

    @Query("SELECT b FROM Bill b where b.customer.id = :customerId")
    Page<Bill> findByIdCustomer(Long customerId, Pageable pageable);

    @Query(value = "SELECT max(id) FROM Bill ")
    Integer getMaxIdBill();

    @Query("select  b from Bill b where b.status <> 'Chờ thanh toán' " +
            "AND (b.email like %:search% or " +
            "b.customerName like %:search% or " +
            "b.phone like %:search% or " +
            "b.status = :search)")
    Page<Bill> findAllBySearch(@Param("search") String search, Pageable pageable);

    @Query("select b from Bill b where b.status <> 'Chờ thanh toán' " +
            "AND (b.email like %:search% or " +
            "b.customerName like %:search% or " +
            "b.phone like %:search%) AND (b.status = :status)")
    Page<Bill> findAllBySearchAndStatus(@Param("search") String search, @Param("status") String status, Pageable pageable);


    @Query("select b from Bill b where b.status <> 'Chờ thanh toán'")
    Page<Bill> findAllBill(Pageable pageable);

    @Query("select b from Bill b join BillDetail c on b.id = c.bill.id " +
            " join ProductDetail d on c.productDetail.id = d.id " +
            " join ProductColorSize e on d.productColorSize.id = e.id" +
            " join Product f on e.product.id = f.id" +
            " where b.status= 'Thành công' and b.customer.id =:key and f.id =:key2")
    List<Bill> getBillByStatus(Long key, Long key2);

    @Query(value = "SELECT sum(total_payment) FROM bill where status ='Thành công' and date_format(payment_date,\"%y-%m-%d\") between (SELECT \n" +
            "    DATE_SUB(CURRENT_DATE(), INTERVAL WEEKDAY(CURRENT_DATE()) DAY)) and\n" +
            "    (DATE_ADD(CURRENT_DATE(), INTERVAL 6 - WEEKDAY(CURRENT_DATE()) DAY));", nativeQuery = true)
    Integer getDoanhThuTheoKhoang();

    @Query(value = "SELECT count(*) FROM datn_en.bill_detail bd \n" +
            "join bill b on bd.id_bill = b.id where  date_format(b.create_at,\"%y-%m-%d\") between (SELECT\n" +
            "            DATE_SUB(CURRENT_DATE(), INTERVAL WEEKDAY(CURRENT_DATE()) DAY)) and\n" +
            "            (DATE_ADD(CURRENT_DATE(), INTERVAL 6 - WEEKDAY(CURRENT_DATE()) DAY)) ", nativeQuery = true)
    int getSanPhamTheoTuan();

    @Query(value = "SELECT COUNT(*) FROM bill where status in ('Thành công','Đổi hàng') and date_format(create_at,\"%y-%m-%d\") between (SELECT \n" +
            "    DATE_SUB(CURRENT_DATE(), INTERVAL WEEKDAY(CURRENT_DATE()) DAY)) and\n" +
            "    (DATE_ADD(CURRENT_DATE(), INTERVAL 6 - WEEKDAY(CURRENT_DATE()) DAY));", nativeQuery = true)
    int getBillDaBan();

    @Query(value = "SELECT date_format(payment_date,'%d-%m-%Y') as date_tk , SUM(total_payment) AS total_payment_sum\n" +
            "FROM bill\n" +
            "where payment_date >= :fromDate and payment_date <= :toDate and status in ('Thành công','Đổi hàng')\n" +
            "GROUP BY date_tk\n" +
            "order by date_tk;", nativeQuery = true)
    List<Object[]> getDoanhTuTheoKhoang(String fromDate, String toDate);

    @Query(value = "SELECT DISTINCT all_statuses.status, COALESCE(subquery.status_count, 0) AS status_count\n" +
            "FROM (\n" +
            "  SELECT status, COUNT(*) AS status_count\n" +
            "  FROM bill\n" +
            "  WHERE date_format(create_at,'%d-%m-%m') >= :fromDate AND date_format(create_at,'%d-%m-%m') <= :toDate\n" +
            "  GROUP BY status\n" +
            ") AS subquery\n" +
            "RIGHT JOIN (\n" +
            "  SELECT DISTINCT status\n" +
            "  FROM bill\n" +
            ") AS all_statuses\n" +
            "ON subquery.status = all_statuses.status", nativeQuery = true)
    List<Object[]> getHoaDonTheoKhoang(String fromDate, String toDate);

    @Query("SELECT b FROM Bill b WHERE b.status = :status AND b.payments = 'Thanh toán tại quầy'")
    Page<Bill> findBillOffLine(String status, Pageable pageable);
}
