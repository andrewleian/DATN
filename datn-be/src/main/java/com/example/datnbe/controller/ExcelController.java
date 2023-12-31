package com.example.datnbe.controller;

import com.example.datnbe.common.CommonString;
import com.example.datnbe.domain.Color;
import com.example.datnbe.domain.Product;
import com.example.datnbe.domain.ProductColorSize;
import com.example.datnbe.domain.ProductDetail;
import com.example.datnbe.domain.Size;
import com.example.datnbe.repository.ColorRepository;
import com.example.datnbe.repository.ProductColorSizeRepository;
import com.example.datnbe.repository.ProductDetailRepository;
import com.example.datnbe.repository.ProductRepository;
import com.example.datnbe.repository.SizeRepository;
import jdk.nashorn.internal.runtime.options.Option;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.service.spi.ServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin
public class ExcelController {

    private final ProductRepository productRepository;
    private final ProductColorSizeRepository productColorSizeRepository;
    private final ProductDetailRepository productDetailRepository;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;

    @GetMapping("/staff/product-detail/download-template")
    public void downloadExcel(HttpServletResponse response) throws IOException {
        // Tạo workbook mới
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Dữ liệu mẫu");

        // Tạo các cột trong file Excel
        Row headerRow = sheet.createRow(0);
        String[] headers = {"Tên sản phẩm", "Mã sản phẩm", "Nhà sản xuất", "Màu", "Mã màu", "Size", "Giá (VND)", "Số lượng"};
        CellStyle boldCellStyle = workbook.createCellStyle();
        Font boldFont = workbook.createFont();
        boldFont.setBold(true);
        boldCellStyle.setFont(boldFont);

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(boldCellStyle);
        }

        // Thêm dữ liệu mẫu vào file Excel
        Row dataRow = sheet.createRow(1);
        String[] data = {"Sản phẩm 1", "SP0001", "NXS 1", "Đỏ", "FFFFFF", "48", "100000", "50"};
        for (int i = 0; i < data.length; i++) {
            Cell cell = dataRow.createCell(i);
            cell.setCellValue(data[i]);
        }

        // Thiết lập header và body của response
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=sample-data.xlsx");

        // Ghi workbook vào response
        workbook.write(response.getOutputStream());
        workbook.close();
    }

    @PostMapping("/staff/product-detail/import-excel-pd")
    public ResponseEntity<String> importExcel(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Không có file được chọn.");
        }

        try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            // Bỏ qua dòng tiêu đề
            int startRow = 1;
            // Lặp qua từng dòng trong sheet
            for (int i = startRow; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                // Đọc dữ liệu từ từng ô
                String name = null;
                String productCode = null;
                String manufacturer = null;
                String colorName = null;
                String colorCode = null;
                String sizeName = null;
                int price = 0;
                int quantity = 0;
                try {
                    name = getCellValueAsString(row.getCell(0));
                    productCode = getCellValueAsString(row.getCell(1));
                    manufacturer = getCellValueAsString(row.getCell(2));
                    colorName = getCellValueAsString(row.getCell(3));
                    colorCode = getCellValueAsString(row.getCell(4));
                    sizeName = getCellValueAsString(row.getCell(5)).substring(0,2);
                    price = Integer.parseInt(getCellValueAsString(row.getCell(6)));
                    quantity = Integer.parseInt(getCellValueAsString(row.getCell(7)));
                } catch (Exception e) {
                    ResponseEntity.ok("Lỗi dữ liệu dòng thứ "+ row + " trong file excel");
//                    throw new ServiceException("Lỗi dữ liệu nhập");
                }

                // Kiểm tra product

                Product product = null;
                Color color = null;
                ProductColorSize pcs = null;
                Size size = null;
                ProductDetail productDetail = null;
                List<Product> products = productRepository.findByNameOrProductCode(name, productCode);
                if (products.size() > 1) {
                    return ResponseEntity.ok("Sai dữ liệu sản phẩm dòng thứ "+ row.getRowNum() + " trong file excel");
//                    throw new ServiceException("Sai dữ liệu sản phẩm");
                } else if (products.size() < 1) {
                    product = new Product();
                    product.setName(name);
                    product.setProductCode(productCode);
                    product.setManufacturer(manufacturer);
                    product.setIsNew(1);
                    product.setIsBestSeller(0);
                    product.setIsActive(1);
                    product.setStatus("Active");
                    product = productRepository.save(product);
                } else {
                    product = products.get(0);
                }
                //Kiểm tra color
                List<Color> colors = colorRepository.findByNameOrId(colorName,colorCode);
                if (colors.size() > 1){
                    return ResponseEntity.ok("Lỗi dữ liệu dòng thứ "+ row.getRowNum() + " trong file excel");
//                    throw new ServiceException("Sai dữ liệu màu sắc");
                } else if (colors.size() < 1) {
                    color = new Color();
                    color.setId(colorCode);
                    color.setName(colorName);
                    color.setStatus("Active");
                    color = colorRepository.save(color);
                }else {
                    color = colors.get(0);
                }
                // Kiểm tra product color size
                Optional<ProductColorSize> pcsOptional = productColorSizeRepository.getByIdColorAndIdProduct(product.getId(), color.getId());
                if (!pcsOptional.isPresent()) {
                    pcs = new ProductColorSize();
                    pcs.setColor(color);
                    pcs.setProduct(product);
                    pcs.setPrice(price);
                    pcs.setStatus("Active");
                    pcs = productColorSizeRepository.save(pcs);
                } else {
                    pcs = pcsOptional.get();
                    pcs.setPrice(price);
                }
                //Kiểm tra size
                Optional<Size> sizeOptional = sizeRepository.findByName(sizeName);
                if (!sizeOptional.isPresent()) {
                    size = new Size();
                    size.setName(sizeName);
                    size.setStatus("Active");
                    size = sizeRepository.save(size);

                }else {
                    size = sizeOptional.get();
                }
                //Kiểm tra pd detail
                Optional<ProductDetail> pddOptional = productDetailRepository.getBySizeId(size.getId(), pcs.getId());
                if (!pddOptional.isPresent()){
                    productDetail = new ProductDetail();
                    productDetail.setSize(size);
                    productDetail.setProductColorSize(pcs);
                    productDetail.setAmount(quantity);
                    productDetail.setStatus("Active");
                }else {
                    productDetail = pddOptional.get();
                    productDetail.setAmount(productDetail.getAmount()+ quantity);
                }
                productDetail = productDetailRepository.save(productDetail);
            }
            return ResponseEntity.ok("Import success");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi xử lý file Excel.");
        }
    }

    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    // Xử lý dữ liệu số (number)
                    cell.setCellType(CellType.STRING);
                    return cell.getStringCellValue();
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }
}