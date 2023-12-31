package com.example.datnbe.repository;

import com.example.datnbe.domain.Bill;
import com.example.datnbe.domain.ProductColorSize;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface ThongKeRepository extends JpaRepository<Bill, Long> {

    @Query("select  month(b.paymentDate)as Month, year(b.paymentDate)as Year, sum(b.totalPayment) as doanhThu" +
            " from Bill b where b.status= 'Thành công' and year(b.paymentDate) =:yea" +
            " group by year(b.paymentDate), month(b.paymentDate)" +
            " order by year(b.paymentDate), month(b.paymentDate)")
    List<Object[]> getDoanhThuTungThang(int yea);

    @Query("select  sum(b.totalPayment) from Bill b " +
            "where b.paymentDate between :start and :end and b.status= 'Thành công' ")
    int getDoanhThuTheoKhoangTime(Timestamp start, Timestamp end);

    @Query(value = "SELECT sum(temp.total_quantity) as banRa, temp.id_hi as idPCSS, temp.namSP , temp.price\n" +
            "FROM (\n" +
            " SELECT product_detail.id as detail, product_detail.id_pcs as id_hi, SUM(bill_detail.amount) AS total_quantity , product.name as namSP, product_color_size.price as price\n" +
            "FROM bill  inner join bill_detail on bill.id = bill_detail.id_bill\n" +
            "INNER JOIN product_detail ON bill_detail.id_product_details = product_detail.id\n" +
            "inner join product_color_size on product_detail.id_pcs = product_color_size.id\n" +
            "inner join product on product_color_size.id_product = product.id\n" +
            "WHERE bill.payment_date BETWEEN :start AND :end and bill.status='Thành công'\n" +
            "GROUP BY product_detail.id\n" +
            "ORDER BY total_quantity DESC\n" +
            ") temp  \n" +
            "GROUP BY temp.id_hi\n" +
            "ORDER BY banRa DESC limit 10;", nativeQuery = true)
    List<Object[]> getTopProducts(Timestamp start, Timestamp end);

    @Query(value = " SELECT  sum(bill_detail.amount) ,count(DISTINCT  bill.id)\n" +
            " FROM bill  join bill_detail on bill.id = bill_detail.id_bill\n" +
            "WHERE bill.payment_date BETWEEN :start AND :end and bill.status =:statuss", nativeQuery = true)
    List<Object[]> sanPhamBanRa(Timestamp start, Timestamp end, @Param("statuss") String statuss);


//    @Query(value = "select product_detail.id_pcs, sum(product_detail.amount) as tongSP  \n" +
//            "from (SELECT * FROM product_color_size \n" +
//            "WHERE product_color_size.id NOT IN (\n" +
//            "SELECT  hihi.idofPcs \n" +
//            "FROM (\n" +
//            "SELECT  temp.id_hi as idofPcs ,sum(temp.total_quantity) as ok\n" +
//            "FROM (\n" +
//            " SELECT product_detail.id as detail, product_detail.id_pcs as id_hi, SUM(bill_detail.amount) AS total_quantity\n" +
//            "FROM bill  inner join bill_detail on bill.id = bill_detail.id_bill\n" +
//            "INNER JOIN product_detail ON bill_detail.id_product_details = product_detail.id\n" +
//            "WHERE bill.payment_date BETWEEN :start AND :end  and bill.status='Thành cồng'\n" +
//            "GROUP BY product_detail.id\n" +
//            "ORDER BY total_quantity DESC\n" +
//            ") temp  \n" +
//            "GROUP BY temp.id_hi\n" +
//            "ORDER BY ok DESC     -- San phẩm ban chay\n" +
//            ") hihi \n" +
//            "GROUP BY hihi.idofPcs\n" +
//            ")  -- lấy những sp không trong cái bán chạy\n" +
//            ") ok  join product_detail on ok.id = product_detail.id_pcs       -- đếm product detail có cùng id pcs xem cái nào nhi\n" +
//            " group by product_detail.id_pcs\n" +
//            " order by tongSP desc limit 10;",nativeQuery = true)

//    List<Object[]> sanPhamBanIt(Timestamp start, Timestamp end);


}
