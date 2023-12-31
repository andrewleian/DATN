package com.example.datnbe.service.impl;

import com.example.datnbe.common.CommonString;
import com.example.datnbe.domain.Color;
import com.example.datnbe.domain.Image;
import com.example.datnbe.domain.Product;
import com.example.datnbe.domain.ProductColorSize;
import com.example.datnbe.domain.ProductDetail;
import com.example.datnbe.domain.Size;
import com.example.datnbe.dto.SizeDTO;
import com.example.datnbe.repository.ColorRepository;
import com.example.datnbe.repository.ImageRepository;
import com.example.datnbe.repository.ProductColorSizeRepository;
import com.example.datnbe.repository.ProductDetailRepository;
import com.example.datnbe.repository.ProductRepository;
import com.example.datnbe.repository.SizeRepository;
import com.example.datnbe.request.ProductDetailCreateRequest;
import com.example.datnbe.service.ProductDetailService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductDetailServiceImpl implements ProductDetailService {
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;
    private final ProductDetailRepository productDetailRepository;
    private final ProductColorSizeRepository productColorSizeRepository;
    private String imagePath = "du-an-tot-nghiep";
    private final ImageRepository imageRepository;
    private final SizeRepository sizeRepository;

    @Override
    public ProductColorSize createProductDetail(ProductDetailCreateRequest request, List<MultipartFile> files) {
        Optional<ProductColorSize> optionalPcs = productColorSizeRepository.getByIdColorAndIdProduct(request.getProductId(), request.getColorId());
        ProductColorSize pcs = null;
        if (!optionalPcs.isPresent()) {
            pcs = new ProductColorSize();
            pcs.setPrice(request.getPrice());
            pcs.setProduct(productRepository.findById(request.getProductId()).get());
            pcs.setColor(colorRepository.findById(request.getColorId()).get());
        } else {
            pcs = optionalPcs.get();
        }
        //xử lí size
        for (SizeDTO sd : request.getSizeDTOSs()) {
            Optional<ProductDetail> optionalPd = productDetailRepository.getBySizeId(sd.getId(), pcs.getId());
            ProductDetail pd = null;
            if (optionalPd.isPresent()) {
                pd = optionalPd.get();
            } else {
                pd = new ProductDetail();
            }
            pd.setAmount(sd.getAmount());
            pd.setProductColorSize(pcs);
        }
        //Xử lý ảnh
        for (MultipartFile file : files) {
            addOneImage(file, pcs.getId());
        }
        return productColorSizeRepository.getByIdColorAndIdProduct(pcs.getProduct().getId(), pcs.getColor().getId()).get();
    }

    @Override
    public void deleteSize(long idPd) {
        ProductDetail pd = productDetailRepository.findById(idPd).orElseThrow(() -> new ServiceException("Size not found"));
        pd.setStatus(CommonString.Status.INACTIVATED.getValue());
        productDetailRepository.save(pd);
    }

    @Override
    public String addNewSize(long idPcs, int amount, String sizeName) {
        Size size = sizeRepository.findByName(sizeName).orElseThrow(() -> new ServiceException("Size not found"));
        ProductColorSize pcs = productColorSizeRepository.findById(idPcs).orElseThrow(() -> new ServiceException("PCS not found"));

        Optional<ProductDetail> productDetailCheck = productDetailRepository.getProductDetailByProductColorSizeAndSize(pcs, size);
        if (productDetailCheck.isPresent() && productDetailCheck.get().getStatus().equalsIgnoreCase("active")) {
            return "Size exists";
        } else {
            ProductDetail pd = new ProductDetail();
            pd.setStatus(CommonString.Status.ACTIVATED.getValue());
            pd.setSize(size);
            pd.setProductColorSize(pcs);
            pd.setAmount(amount);

            productDetailRepository.save(pd);
            return "Create success";
        }

    }

    @Override
    public String updateProductDetail(long idPd, long idPcs, String colorName, int price, String status) {
        if (price <= 0) {
            return "Giá phải lớn hơn hoặc bằng 0!";
        }

        List<Color> colors = colorRepository.findByNameOrId(colorName, null);
        ProductColorSize pcs = productColorSizeRepository.findById(idPcs).orElseThrow(() -> new ServiceException("Pcs not found!"));
        Product product = productRepository.findById(idPd).orElseThrow(() -> new ServiceException("Product not found!"));

        Optional<ProductColorSize> pcsCheck = productColorSizeRepository.findByProductAndColor(product, colors.get(0));
        if (colors.size() == 0) {
            return "Lỗi không tìm thấy màu yêu cầu!";
        } else if (colors.size() > 1) {
            throw new ServiceException("Lỗi dữ liệu không xác định!");
        }
        //Cần tối ưu
        if (pcsCheck.isPresent() && pcsCheck.get().getId() != pcs.getId()) {
            return "Sản phẩm đã có màu này!";
        }
        pcs.setPrice(price);
        pcs.setColor(colors.get(0));
        pcs.setStatus(status);
        productColorSizeRepository.save(pcs);
        return "Cập nhật thành công";
    }

    @Override
    public String saveImages(MultipartFile mainImg, MultipartFile secondImg, long idPcs) {
        // Lấy thời gian hiện tại
        LocalDateTime currentTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String timestamp = currentTime.format(formatter);
        // Đảm bảo tên tệp không trùng lặp bằng cách thêm số có 12 chữ số (thời gian) vào tên
        String newMainImgName = idPcs + "main" + "-" + timestamp;
        String newSecondaryImgName = idPcs + "second" + "-" + timestamp;
        // Lấy phần mở rộng của tệp ảnh
        String extensionMain = FilenameUtils.getExtension(mainImg.getOriginalFilename());
        String extensionSecond = FilenameUtils.getExtension(secondImg.getOriginalFilename());
        // Kết hợp tên mới và phần mở rộng để tạo tên đầy đủ cho tệp ảnh
        String finalMainImgName = newMainImgName + "." + extensionMain;
        String finalSecondImgName = newSecondaryImgName + "." + extensionSecond;

        try {
            // Đường dẫn tới thư mục để lưu ảnh
            String currentDirectory = System.getProperty("user.dir");
            Path currentPath = Paths.get(currentDirectory);
            Path parentPath = currentPath.getParent();
            Path absolutePath = Paths.get(parentPath.toString(), "datn-fe","public","image");
            String uploadDir = absolutePath.toString();

            // Tạo thư mục lưu trữ nếu chưa tồn tại
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }

            // Lưu ảnh chính
            String mainImgPath = uploadDir + File.separator + finalMainImgName;
            File mainImgFile = new File(mainImgPath);
            FileUtils.writeByteArrayToFile(mainImgFile, mainImg.getBytes());

            // Lưu ảnh phụ
            String secondImgPath = uploadDir + File.separator + finalSecondImgName;
            File secondImgFile = new File(secondImgPath);
            FileUtils.writeByteArrayToFile(secondImgFile, secondImg.getBytes());

            Image imageMain = new Image();
            imageMain.setName(finalMainImgName);
            imageMain.setPath(uploadDir + "/" + finalMainImgName);
            imageMain.setStatus("active");
            imageMain.setProductColorSize(productColorSizeRepository.findById(idPcs).orElseThrow(() -> new ServiceException("PCS not found!")));
            imageRepository.save(imageMain);

            Image imageSecond = new Image();
            imageSecond.setName(finalSecondImgName);
            imageSecond.setPath(uploadDir + "/" + finalSecondImgName);
            imageSecond.setStatus("active");
            imageSecond.setProductColorSize(productColorSizeRepository.findById(idPcs).orElseThrow(() -> new ServiceException("PCS not found!")));
            imageRepository.save(imageSecond);

//            List<Image> imageList = new ArrayList<>();
//            imageList.add(imageMain);
//            imageList.add(imageSecond);
//            imageRepository.saveAll(imageList);
            // Trả về đường dẫn đến thư mục lưu ảnh
            return "Lưu ảnh thành công!";
        } catch (IOException e) {
            // Xử lý ngoại lệ nếu có lỗi khi lưu ảnh
            e.printStackTrace();
            return "Lưu ảnh thất bại!";
        }
    }

    @Override
    public void addOneImage(MultipartFile file, Long idPcs) {
        Optional<ProductColorSize> optionalPcs = productColorSizeRepository.findById(idPcs);
        ProductColorSize pcs = optionalPcs.get();
        try {
            Image image = new Image();
            image.setProductColorSize(pcs);
            String imageName = UUID.randomUUID() + "-" + file.getOriginalFilename();
            file.transferTo(new File(imagePath + "/" + imageName));
            image.setName(imageName);
            imageRepository.save(image);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
