//package com.example.datnbe.service.impl;
//
//import com.example.datnbe.common.CommonString;
//import com.example.datnbe.domain.Bill;
//import com.example.datnbe.domain.BillDetail;
//import com.example.datnbe.domain.Customer;
//import com.example.datnbe.domain.ProductDetail;
//import com.example.datnbe.domain.Staff;
//import com.example.datnbe.dto.BillDetailDTO;
//import com.example.datnbe.dto.TraHangDTOs.BIllDetailDoiDTO;
//import com.example.datnbe.dto.TraHangDTOs.BillDetaiInfor;
//import com.example.datnbe.dto.TraHangDTOs.BillDoiDTO;
//import com.example.datnbe.dto.TraHangDTOs.BuyAddProductDTO;
//import com.example.datnbe.dto.TraHangDTOs.ShowBIllDetailDoiDTO;
//import com.example.datnbe.dto.TraHangDTOs.ShowBill;
//import com.example.datnbe.exception.MyCustomException;
//import com.example.datnbe.repository.BillDetailRepository;
//import com.example.datnbe.repository.BillRepository;
//import com.example.datnbe.repository.CustomerRepository;
//import com.example.datnbe.repository.ProductDetailRepository;
//import com.example.datnbe.repository.StaffRepository;
//import com.example.datnbe.repository.TraHangRepository;
//import com.example.datnbe.service.TraHangService;
//import com.example.datnbe.utils.Utils;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.math.BigDecimal;
//import java.math.BigInteger;
//import java.sql.Timestamp;
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Comparator;
//import java.util.List;
//import java.util.Optional;
//import java.util.Random;
//import java.util.stream.Collectors;
//
//@Service
//public class TraHangServiceImpl implements TraHangService {
//    @Autowired
//    TraHangRepository trahangPepo;
//    @Autowired
//    BillDetailRepository billDetailRepo;
//    @Autowired
//    BillRepository billRepository;
//    @Autowired
//    StaffRepository staffRepo;
//
//    @Autowired
//    CustomerRepository customerRepo;
//
//    @Autowired
//    ProductDetailRepository productDlRepo;
//    @Autowired
//    ModelMapper modelMapper;
//    public int monny = 0;
//    private String getBillCode = null;
//
//
//    @Override
//    public List<ShowBill> getBillTime(String billCode) {
//        List<Object[]> results = new ArrayList<>();
//
//        // Lọc theo billCode nếu được truyền vào
//        if (billCode != null && !billCode.isEmpty()) {
//            results = trahangPepo.billTime2(billCode);
//        }
//
//        if (billCode == null || billCode.equals("")) {
//            results = trahangPepo.billTime();
//        }
//
//        // Sắp xếp theo hanDoi
//        results.sort(Comparator.comparing(result -> {
//            String hanDoi = result[6].toString();
//            return hanDoi.equals("Được đổi") ? 0 : 1;
//        }));
//
//        return results.stream()
//                .map(result -> {
//                    BigInteger id = (BigInteger) result[0];
//                    String code = result[1].toString();
//                    String customerName = result[2].toString();
//                    String phone = result[3].toString();
//                    String email = result[4].toString();
//                    BigDecimal totalPayment = (BigDecimal) result[5];
//                    Timestamp paymentDate = (Timestamp) result[6];
//                    String status = result[7].toString();
//                    String hanDoi = result[8].toString();
//
//                    String formattedPaymentDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(paymentDate);
//                    ShowBill showBill = new ShowBill(id.longValue(), code, customerName, phone, email, totalPayment, formattedPaymentDate, status, hanDoi);
//                    return showBill;
//                })
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<BillDetaiInfor> getBillDetai(Long idBill) {
//        List<BillDetaiInfor> bill = trahangPepo.getBillDetaiCu(idBill);
//        return bill;
//    }
//
//    @Override
//    @Transactional(rollbackFor = {Exception.class, Throwable.class}, timeout = 30)
//    public Bill createBillDoi(BillDoiDTO listSp) {
//        Bill checkbill = trahangPepo.checkKhongTaoBill(listSp.getIdBill()); // check origin cũ
//        Bill checkKhongTaoBillByIdBilldoi = trahangPepo.checkKhongTaoBillByIdBilldoi(listSp.getIdBillDoiMoi());// check bill ms theo id.
//        /**
//         * Nếu checkBill == null thì tạo mới bill || checkBill != null không tạo bill nữa. mà add sản phẩm luôn.
//         */
//        if (checkbill == null && checkKhongTaoBillByIdBilldoi == null) {
//            Bill getBillCu = billRepository.findById(listSp.getIdBill()).get();
//            if (getBillCu == null) {
//                throw new MyCustomException(" Không thấy đơn nào có id: " + listSp.getIdBill());
//            }
//            int length = 12;
//            String billCode = generateRandomString(length);
//            Bill billEntity = new Bill();
//            billEntity.setCustomerName(getBillCu.getCustomerName());
//            billEntity.setPhone(getBillCu.getPhone());
//            billEntity.setEmail(getBillCu.getEmail());
//            billEntity.setAddress(getBillCu.getAddress());
//            billEntity.setCreateAt(Utils.getCurrentTimestamp());
//            billEntity.setUpdateAt(Utils.getCurrentTimestamp());
//            billEntity.setBillCode(billCode);
//            billEntity.setStaff(getStaff());
//            billEntity.setCustomer(getCustomer(getBillCu.getCustomer().getId()));
//            billEntity.setNoteCancel("Đổi hàng");
//            billEntity.setPayments("off");
//            billEntity.setOriginBill(getBillCu);
//            billEntity.setStatus("Chờ thanh toán đổi");
//            // Chưa có TotalPayment, paymentDate
//            Bill saveBillDoi = billRepository.save(billEntity);
//            if (saveBillDoi != null) {
//                boolean result = addBIllDetail(listSp);
//                if (result == true) {
//                    return saveBillDoi;
//                }
//                throw new MyCustomException("Số sản phẩm đổi quá số lượng đã mua");
//            }
//            throw new MyCustomException(" Tạo bil đổi thất bại.");
//        } else if (checkbill != null && checkKhongTaoBillByIdBilldoi != null) {
//            Boolean result = addBIllDetail(listSp);
//            if (result) {
//                return new Bill();
//            }
//            throw new MyCustomException("Số sản phẩm đổi quá số lượng đã mua 2");
//        }
//        return null;
//    }
//
//    @Override
//    @Transactional(rollbackFor = {Exception.class, Throwable.class}, timeout = 30)
//    public boolean addBIllDetail(BillDoiDTO sp) {
//
//        // Bill detail gốc, lấy số lượng sản phảm của iidProduct muốn đổi.
//
//        int slSanPhamtuBillMua = sp.getAmount();  // lấy số lượng mua từ bill gốc (Bill cầm đến đổi)
//        Integer slSanPhamBillDoi = trahangPepo.soLuongSanPhamBillDoi(sp.getIdBillDoiMoi(), sp.getIdProductDetail()); // số lượng đã đổi trong billdetaildoi
//        if (slSanPhamBillDoi == null) {
//            slSanPhamBillDoi = 0;
//        }
//        //check số lượng để không cho add quá sản phẩm đã mua
//        System.out.println(" ố lượng mua :" + slSanPhamtuBillMua);
//        System.out.println(" list :" + sp.getGetListProduct().size());
//        if (sp.getIdBillDoiMoi() == null) {
//            Bill checkbill = trahangPepo.checkKhongTaoBill(sp.getIdBill());
//            sp.setIdBillDoiMoi(checkbill.getId());
//        }
//
//        if (slSanPhamBillDoi == 0 && sp.getGetListProduct().size() <= slSanPhamtuBillMua) {
//            for (ProductDetail pro : sp.getGetListProduct()) {
//                BillDetail billDetail = new BillDetail();
//                billDetail.setBill(billRepository.findById(sp.getIdBillDoiMoi()).get());
//                billDetail.setProductDetail(productDlRepo.findById(sp.getIdProductDetail()).get());
//                billDetail.setAmount(1);
//                billDetail.setUnitPrice(pro.getProductColorSize().getPrice().doubleValue());
//                billDetail.setProductDetailDoi(pro);
//                BillDetail billDetailSave = billDetailRepo.save(billDetail);
//                System.out.println("Vào đay không Add snar phẩm chi tiết");
//                if (billDetailSave == null) {
//                    throw new MyCustomException("Add BillDetails Failed");
//                }
//            }
//            return true;
//        } else if (slSanPhamBillDoi + sp.getGetListProduct().size() <= slSanPhamtuBillMua) {
//            for (ProductDetail pro : sp.getGetListProduct()) {
//                BillDetail billDetail = new BillDetail();
//                billDetail.setBill(billRepository.findById(sp.getIdBillDoiMoi()).get());
//                billDetail.setProductDetail(productDlRepo.findById(sp.getIdProductDetail()).get());
//                billDetail.setAmount(1);
//                billDetail.setUnitPrice(pro.getProductColorSize().getPrice().doubleValue());
//                billDetail.setProductDetailDoi(pro);
//                BillDetail billDetailSave = billDetailRepo.save(billDetail);
//                System.out.println("Vào đay không Add snar phẩm chi tiết khi đã có sản phẩm .");
//                if (billDetailSave == null) {
//                    throw new MyCustomException("Add BillDetails Failed");
//                }
//            }
//            System.out.println("Vhayj vào  khi bill đã cso");
//
//            return true;
//
//        }
//        System.out.println("Chạy false luôn. kaka");
//        return false;
//    }
//
//    @Override
//    public List<Bill> getBillDoi() {
//        return trahangPepo.getBillDoi();
//    }
//
//    @Override
//    public List<ShowBIllDetailDoiDTO> getBillDetailDoi(Long idBillDo) {
//        return trahangPepo.getBillDetaiDoi(idBillDo);
//    }
////    @Override
////    public List<Bill> getBillDoi() {
////        return null;
////    }
////
//
//
//    //    @Override
////    public List<BIllDetailDoiDTO> getBillDetails(Long id) {
////        List<BillDetail> bill = trahangPepo.getBillDetailsByIdBill(id);
////        List<BIllDetailDoiDTO> billDTOList = bill.stream()
////                .map(b -> modelMapper.map(b, BIllDetailDoiDTO.class))
////                .collect(Collectors.toList());
////        return billDTOList;
////    }
////
////    @Override
////    public BIllDetailDoiDTO getBillDetail(Long id) {
////        return modelMapper.map(trahangPepo.getBillDetail(id), BIllDetailDoiDTO.class);
////    }
////
////
////    /**
////     * Tạo billDoi và Add sản phẩm vào billDetailDoi
////     */
////    @Override
////    @Transactional(rollbackFor = {Exception.class, Throwable.class}, timeout = 30)
////    public Boolean createBillDoi(BillDoiDTO idBillOriginal) throws MyCustomException {
////
////        Bill checkbill = trahangPepo.checkKhongTaoBill(idBillOriginal.getIdBillOriginal());
////        if (checkbill == null) {
////            Optional<Bill> billOrrigin = billRepository.findById(idBillOriginal.getIdBillOriginal());
////            if (!billOrrigin.isPresent()) {
////                throw new MyCustomException("Không tìm thấy thông tin bill gốc có id :" + idBillOriginal.getIdBillOriginal());
////            }
////            int length = 12;
////            getBillCode = generateRandomString(length);
////            //Tạo bill
////            Staff staff = getStaff();
////            Bill billEntity = new Bill();
////            billEntity.setCustomerName(billOrrigin.get().getCustomerName());
////            billEntity.setPhone(billOrrigin.get().getPhone());
////            billEntity.setEmail(billOrrigin.get().getEmail());
////            billEntity.setAddress(billOrrigin.get().getAddress());
////            billEntity.setCreateAt(Utils.getCurrentTimestamp());
////            billEntity.setUpdateAt(Utils.getCurrentTimestamp());
////            billEntity.setBillCode(getBillCode);
////            billEntity.setStaff(getStaff());
////            billEntity.setCustomer(getCustomer(billOrrigin.get().getCustomer().getId()));
////            billEntity.setNoteCancel("Đổi hàng");
////            billEntity.setPayments("off");
////            billEntity.setOriginBill(billOrrigin.get());
////            billEntity.setStatus("Đổi hàng");
////            // Chưa có TotalPayment, paymentDate
////
////            Bill saveBillDoi = billRepository.save(billEntity);
////            System.out.println("Tạo bill thành công sssss");
////            if (saveBillDoi != null) {
////                Boolean result = addBIllDetail(idBillOriginal);
////                if (result) {
////                    return true;
////                }
////
////                throw new MyCustomException("Số sản phẩm đổi quá số lượng đã mua");
////            }
////        } else if (checkbill != null) {
////            Boolean result = addBIllDetail(idBillOriginal);
////            if (result) {
////                return true;
////            }
////            throw new MyCustomException("Số sản phẩm đổi quá số lượng đã mua 2");
////        }
////        return false;
////
////    }
////
////    /**
////     * add sanr phẩm vào billDetail.
////     */
////
////    @Override
////    public boolean addBIllDetail(BillDoiDTO sp) {
////        // lấy bill Dổi
////        Bill idBillDoi = trahangPepo.getMaxIdBill(getBillCode);
////        if (sp.getGetListProduct() == null) {
////            throw new MyCustomException("Không có sản phẩn nào.");
////        }
////        // Bill detail gốc, lấy số lượng sản phảm của iidProduct muốn đổi.
////
////        int slSanPhamtuBillMua = trahangPepo.soLuongSanPhamGoc(sp.getIdBillDetailOriginal());
////        System.out.println("id billDoisss  " + idBillDoi.getId());
////        System.out.println("Bill code " + getBillCode);
////        Integer slSanPhamBillDoi = trahangPepo.soLuongSanPhamBillDoi(idBillDoi.getId(), sp.getIdProductDetailOriginal());
////        if (slSanPhamBillDoi == null) {
////            slSanPhamBillDoi = 0;
////        }
////        //check số lượng để không cho add quá sản phẩm đã mua
////        System.out.println(" ố lượng mua :" + slSanPhamtuBillMua);
////        System.out.println(" list :" + sp.getGetListProduct().size());
////
////        if (slSanPhamBillDoi == 0 && sp.getGetListProduct().size() <= slSanPhamtuBillMua) {
////            for (ProductDetail pro : sp.getGetListProduct()) {
////                BillDetail billDetail = new BillDetail();
////                billDetail.setBill(idBillDoi);
////                billDetail.setProductDetail(productDlRepo.findById(sp.getIdProductDetailOriginal()).get());
////                billDetail.setAmount(1);
////                billDetail.setUnitPrice(pro.getProductColorSize().getPrice().doubleValue());
////                billDetail.setProductDetailDoi(pro);
////                BillDetail billDetailSave = billDetailRepo.save(billDetail);
////                System.out.println("Vào đay không Add snar phẩm chi tiết");
////                if (billDetailSave == null) {
////                    throw new MyCustomException("Add BillDetails Failed");
////                }
////            }
////            return true;
////        } else if (slSanPhamBillDoi + sp.getGetListProduct().size() <= slSanPhamtuBillMua) {
////            for (ProductDetail pro : sp.getGetListProduct()) {
////                BillDetail billDetail = new BillDetail();
////                billDetail.setBill(idBillDoi);
////                billDetail.setProductDetail(productDlRepo.findById(sp.getIdProductDetailOriginal()).get());
////                billDetail.setAmount(1);
////                billDetail.setUnitPrice(pro.getProductColorSize().getPrice().doubleValue());
////                billDetail.setProductDetailDoi(pro);
////                BillDetail billDetailSave = billDetailRepo.save(billDetail);
////                System.out.println("Vào đay không Add snar phẩm chi tiết khi đã có sản phẩm .");
////                if (billDetailSave == null) {
////                    throw new MyCustomException("Add BillDetails Failed");
////                }
////            }
////            System.out.println("Vhayj vào  khi bill đã cso");
////
////            return true;
////
////        }
////        System.out.println("Chạy false luôn. kaka");
////        return false;
////    }
////
////    /**
////     * Update số lượng của sản phẩm đổi.
////     */
//    @Override
//    public BIllDetailDoiDTO updateBillDetail(Long id, BIllDetailDoiDTO dto) {
//        if (dto == null) {
//            throw new MyCustomException("Data truyền vào rỗng");
//        } else if (dto.getAmount() < 1) {
//            throw new MyCustomException("Vui lòng nhập lại số lượng");
//        }
//        int soLuongDaDoi = trahangPepo.soLuongSanPhamBillDoi(dto.getIdBill(), dto.getIdProductDetail());
//        System.out.println("Số lượng đã đổi" + soLuongDaDoi);
//        // check so Lượng sản phẩm cũ
//        Long check1 = trahangPepo.checkLaySLCu1(id);
//        int soLuongCuaDonGoc = trahangPepo.checkLaySLCu2(check1, dto.getIdProductDetail());
//        System.out.println("Số lượng đơn gốcsssssssssssssssssssssssssssssss1111111111" + soLuongCuaDonGoc);
//        //
//
//        int soLuongSanPhamKho = trahangPepo.getSoLuongSanPhamKho(dto.getIdProductDetail());
//        System.out.println("Số lượng Kho" + soLuongSanPhamKho);
//
//        BillDetail billDetail = billDetailRepo.findById(id).get();
//        billDetail.setAmount(dto.getAmount());
//
//        if (billDetail != null && soLuongCuaDonGoc >= dto.getAmount() && soLuongSanPhamKho >= dto.getAmount()) {
//            return modelMapper.map(billDetailRepo.save(billDetail), BIllDetailDoiDTO.class);
//        } else if (billDetail != null && soLuongSanPhamKho < dto.getAmount()) {
//            throw new MyCustomException("Số lượng trong kho không đủ.");
//        } else if (billDetail != null && soLuongCuaDonGoc < soLuongDaDoi + dto.getAmount()) {
//            throw new MyCustomException("Số lượng đổi quá số lượng sản phẩm đã mua");
//
//        }
//        return null;
//    }
//
//    @Override
//    public BillDetail buyAddProduct(BuyAddProductDTO dto) {
//         Optional<Bill> checkBill = billRepository.findById(dto.getBillId());
//         if(!checkBill.isPresent()){
//             throw new MyCustomException("Không tìm thấy bill với id: "+dto.getBillId());
//         }
//        BillDetail billDl = new BillDetail();
//         billDl.setAmount(1);
//         billDl.setBill(checkBill.get());
//         billDl.setUnitPrice(dto.getUnitPrice());
//         billDl.setProductDetail(productDlRepo.findById(dto.getIdProductDetail()).get());
//        BillDetail buyAddNew = billDetailRepo.save(billDl);
//        if(buyAddNew !=null){
//            return buyAddNew;
//        }
//        return null;
//    }
//
//    @Override
//    public Boolean deleteBillDetailDoi(Long id) {
//        BillDetail billDetail = billDetailRepo.findById(id).get();
//        if (billDetail == null) {
//            throw new MyCustomException("Không tìm thấy thông tin bill detail có id: " + id);
//        }
//        billDetailRepo.deleteById(id);
//        return true;
//    }
//
//
//
//    @Override
//    public Bill saveBill(Long idBillDoi) {
//        Optional<Bill> bills = billRepository.findById(idBillDoi);
//        if (!bills.isPresent()) {
//            throw new MyCustomException("không tìm thấy id bill để update");
//        }
//        Bill bill = bills.get();
//        BigDecimal totalPayment = new BigDecimal(getTotalBillDoi(bill.getId()));
//        bill.setTotalPayment(totalPayment);
//        bill.setPaymentDate(Utils.getCurrentTimestamp());
//        bill.setStatus(CommonString.OrderStatus.EXCHANGE_AND_RETURN.getValue());
//        bill.setNote("Đổi hàng.");
//        bill.setUpdateAt(Utils.getCurrentTimestamp());
//        Bill saveBill = billRepository.save(bill);
//        if (saveBill != null) {
//            return saveBill;
//        }
//        return null;
//    }
//
//    @Override
//    public String deleteBillDoi(Long id) {
//        String deleteTableN = trahangPepo.deleteTableN(id);
//        String deleteTable1 = trahangPepo.deleteTable1(id);
//        return "Bạn đã xóa bill thành công.";
//    }
//
//    @Override
//    public int getTotalBillDoi(Long key) {
//        Integer spmuaThem = trahangPepo.tinhTienDoi(key);
//        return spmuaThem;
//    }
//
//    @Override
//    public Bill getBillById(Long id) {
//        Bill bill = billRepository.findById(id).get();
//        if (bill == null) {
//            throw new MyCustomException("Không tìm thấy thông tin bill");
//        }
//        return bill;
//    }
//
//    @Override
//    public BillDetail getBillDetalById(Long id) {
//        BillDetail bill = billDetailRepo.findById(id).get();
//        if (bill == null) {
//            throw new MyCustomException("Không tìm thấy thông tin billDetail");
//        }
//        return bill;
//    }
//
//    @Override
//    public Staff getStaff() {
//        String userDetails = Utils.getCurrentUser().getUsername();
//        Optional<Staff> staff = staffRepo.findByUsername(userDetails);
//        if (!staff.isPresent()) {
//            throw new MyCustomException("Không tìm thấy tông tin Staff");
//        }
//        return staff.get();
//    }
//
//    public Customer getCustomer(Long id) {
//        Optional<Customer> customer = customerRepo.findById(id);
//        if (!customer.isPresent()) {
//            throw new MyCustomException("Không tìm thấy tông tin Customer");
//        }
//        return customer.get();
//    }
//
//    public static String generateRandomString(int length) {
//        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//        StringBuilder randomString = new StringBuilder();
//
//        Random random = new Random();
//        for (int i = 0; i < length; i++) {
//            int index = random.nextInt(characters.length());
//            char randomChar = characters.charAt(index);
//            randomString.append(randomChar);
//        }
//
//        return randomString.toString();
//    }
//
//
//}
