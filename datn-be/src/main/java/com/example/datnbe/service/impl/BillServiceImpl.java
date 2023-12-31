/**
 * Dự án tốt nghiệp Foly
 * <p>
 * BillService.java tientv34
 *
 * @author tientv34
 */
package com.example.datnbe.service.impl;

import com.example.datnbe.common.CommonString;
import com.example.datnbe.domain.*;
import com.example.datnbe.dto.*;
import com.example.datnbe.dto.TraHangDTOs.ProductGhn;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.exception.MyCustomException;
import com.example.datnbe.repository.*;
import com.example.datnbe.request.*;
import com.example.datnbe.service.BillService;
import com.example.datnbe.service.CartDetailService;
import com.example.datnbe.service.GiaoHangNhanhService;
import com.example.datnbe.service.MailService;
import com.example.datnbe.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BillServiceImpl implements BillService {
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private BillDetailRepository billDetailRepository;
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private CartDetailService cartDetailService;
    @Autowired
    private MailService mailService;
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private GiaoHangNhanhService giaoHangNhanhService;


    /**
     * @param billDTO Thông tin cần để tạo ra 1 bill
     * @return trả về 1 Bill nếu tạo bill thành công ngược lại thì trả về null hoặc exception
     * @throws CustomerException custom exception trả ra
     */
    //Tạo ra 1 bill khi thánh toán.
    @Override
    @Transactional(rollbackFor = {Exception.class, Throwable.class}, timeout = 10)
    public Bill createBill(BillDTO billDTO, String isPayOnline) throws CustomerException, MessagingException {
        try {
            if (billDTO == null) {
                throw new CustomerException("BillDTO cannot be null!!!");
            }
            UserDetails userDetails = Utils.getCurrentUser();
            if (userDetails == null) {
                throw new CustomerException("Bạn chưa đăng nhập");
            }
            Customer customer = customerRepository.findCustomerByUsername(userDetails.getUsername());
            //check số lượng trước khi tạo bill
            String result = cartDetailService.checkSlSendBill();
            if (!result.equalsIgnoreCase("OK")) {
                throw new CustomerException("Số lượng sản không đủ. Vui lòng thử lại");
            }
            int length = 12;
            String billCode = generateRandomString(length);
            //Tạo bill
            Bill billEntity = new Bill();
            billEntity.setPhone(billDTO.getPhone());
            billEntity.setEmail(billDTO.getEmail());
            billEntity.setAddress(billDTO.getAddress());
            billEntity.setTotalPayment(billDTO.getTotalPayment());
            billEntity.setNote(billDTO.getNote());
            billEntity.setCreateAt(Utils.getCurrentTimestamp());
            billEntity.setUpdateAt(Utils.getCurrentTimestamp());
            billEntity.setCustomerName(billDTO.getName());
            billEntity.setBillCode(billCode);
            if (customer != null) {
                billEntity.setCustomer(customer);
            } else {
                throw new CustomerException("Bạn chưa đăng nhập");
            }
            Bill billSave = billRepository.save(billEntity);
            if (billSave != null) {
                if (billDTO.getLstCartDetails().size() == 0) {
                    throw new CustomerException("Bạn chưa có sản phẩm trong giỏ hàng");
                }
                // add bill Details
                Boolean results = addOrderDetails(billDTO.getLstCartDetails());
                if (results) {
                    //Thanh toán offline
                    if (isPayOnline.isEmpty()) {
                        billSave.setStatus(CommonString.OrderStatus.TO_PAY.getValue());
                        billSave.setPayments(CommonString.Payments.OFFLINE.getValue());
                    }
                    //thanh toán online thành công.
                    if (isPayOnline.equals("true")) { //Nếu isPayOnline = true tức là thành toàn online thành công
                        billSave.setStatus(CommonString.OrderStatus.TO_PAY.getValue());
                        billSave.setPayments(CommonString.Payments.ONLINE.getValue());
                        billSave.setPaymentDate(Utils.getCurrentTimestamp());
                    }
                    //thanh toán online thất bại.
                    if (isPayOnline.equals("false")) { //Nếu isPayOnline = false tức là thành toàn online thành công
                        billSave.setStatus(CommonString.OrderStatus.WAIT_FOR_PAY.getValue());
                        billSave.setPayments(CommonString.Payments.ONLINE.getValue());
                    }
                    Bill billSave2 = billRepository.save(billSave);
                    //Gửi email khi tạo hoá đơn thành công
                    DataEmailDTO dataSendEmail = new DataEmailDTO();
                    dataSendEmail.setTo(customer.getEmail());
                    dataSendEmail.setSubject(Utils.SUCCESSFUL_PURCHASE);
                    Map<String, Object> props = new HashMap<>();
                    props.put("billCode", billEntity.getBillCode());
                    props.put("name", customer.getCustomerName());
                    props.put("username", customer.getUsername());
                    props.put("phone", billEntity.getPhone());
                    props.put("address", billEntity.getAddress());
                    props.put("total_payment", Utils.convertToVND(billEntity.getTotalPayment()));
                    props.put("create_at", Utils.convertTimestampToDate(billEntity.getCreateAt()));
                    props.put("status", billEntity.getStatus());
                    dataSendEmail.setProps(props);

                    //Gửi email
                    mailService.sendHtmlMail(dataSendEmail, "templateSendEmailBill");

                    return billSave2;
                } else {
                    throw new CustomerException("Add BillDetails Failed");
                }
            } else {
                throw new CustomerException("Đã có lỗi xảy ra khi tạo hoá đơn");
            }
        } catch (CustomerException ex) {
            ex.printStackTrace();
            throw new CustomerException(ex.getError());
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Lỗi hệ thống khi tạo hoá đơn");
        }
    }

    /**
     * update thanh toán online cho đơn hàng chờ thanh toán.
     *
     * @param billId
     * @param isPayOnline
     * @return
     * @throws CustomerException
     */
    @Override
    public String updatePayOnline(Long billId, String isPayOnline) throws CustomerException {
        Bill billEntity = billRepository.findById(billId).orElse(null);
        if (billEntity == null) {
            throw new MyCustomException("Bạn Chưa có hoá đơn nào?");
        }
        //Check trạng thái thanh toán online. update trạng thái.
        if (billEntity.getStatus().equals(CommonString.OrderStatus.WAIT_FOR_PAY.getValue())) {
            if (isPayOnline.equals("true")) { //Thanh toán online thành công.
                billEntity.setStatus(CommonString.OrderStatus.TO_PAY.getValue());
                billEntity.setPaymentDate(Utils.getCurrentTimestamp());
                billEntity.setUpdateAt(Utils.getCurrentTimestamp());
            }
            if (isPayOnline.equals("false")) { // TH thanh toán thất bại
                throw new CustomerException("Thanh toán online thất bại!!!");
            }
            billRepository.save(billEntity);
        }
        return "Thanh toán online thành công";
    }

    /**
     * @param billRequest các thông tin mà customer có thể sửa khi đặt hàng theo trạng thái đơn hàng
     * @return trả về 1 Bill nếu tạo bill thành công ngược lại thì trả về null hoặc exception
     */
    //Cho phép cập nhập lại các thuộc tính của bill
    @Override
    public Bill updateBill(UpdateBillRequest billRequest) throws CustomerException {
        if (billRequest == null) {
            throw new CustomerException("Chưa có thông tin update");
        }
        UserDetails userDetails = Utils.getCurrentUser();
        if (userDetails == null) {
            throw new CustomerException("Bạn chưa đăng nhập");
        }
        Bill billEntity = billRepository.findById(billRequest.getIdBill()).orElse(null);
        if (billEntity == null) {
            throw new CustomerException("Bạn Chưa có hoá đơn nào?");
        }
        //Kiểm tra trạng thái đơn hàng để cho update thông tin khách trạng thái TO_PAY thì không được sửa
        if (!(billEntity.getStatus().equals(CommonString.OrderStatus.TO_PAY.getValue())) &&
                !(billEntity.getStatus().equals(CommonString.OrderStatus.WAIT_FOR_PAY.getValue()))) {
            throw new CustomerException("Bạn không thể sửa thông tin đơn hàng");
        }
        billEntity.setCustomerName(billRequest.getCustomerName());
        billEntity.setPhone(billRequest.getPhone());
        billEntity.setEmail(billRequest.getEmail());
//        billEntity.setAddress(billRequest.getAddress());
        billEntity.setNote(billRequest.getNote());
        billEntity.setUpdateAt(Utils.getCurrentTimestamp());
        Bill billSave = billRepository.save(billEntity);
        if (billSave != null) {
            return billSave;
        } else {
            throw new CustomerException("Đã có lỗi xảy ra khi update");
        }
    }

    /**
     * Confirm bill xác nhận trạng thái đơn hàng phần của quan trị viên
     *
     * @param id     id của bill
     * @param status trang thái cần update
     * @return 1 thông báo.
     * @throws CustomerException
     */
    @Override
    public String confirmBill(Long id, String status, String note) throws CustomerException {
        Bill bill = billRepository.findById(id).orElse(null);
        if (bill == null) {
            throw new CustomerException("Đơn hàng có id: " + id + " không tồn tại");
        }
        if (status.equalsIgnoreCase(CommonString.OrderStatus.RETURNS.getValue())) {
            if (note.isEmpty()) {
                throw new CustomerException("Bạn chưa nhập lí do trả hàng");
            }
            bill.setNoteCancel("Trả hàng: " + note);
        }
        if (status.equalsIgnoreCase(CommonString.OrderStatus.SUCCESSFUL.getValue())) {
            bill.setPaymentDate(Utils.getCurrentTimestamp());
        }
        if (status.equalsIgnoreCase(CommonString.OrderStatus.CANCELED.getValue())) {
            bill.setPaymentDate(Utils.getCurrentTimestamp());
        }
        if (status.equalsIgnoreCase(CommonString.OrderStatus.RETURNS.getValue())) {
            bill.setPaymentDate(Utils.getCurrentTimestamp());
        }
        bill.setStatus(status);
        billRepository.save(bill);
        return "Cập nhập thành công!";
    }

    /**
     * @param idBill id của hoá đơn cần được huỷ
     * @return nếu huỷ thành công thì sẽ trả về true ngược lại là false
     */
    //Huỷ đơn hàng theo trạng thái
    @Override
    @Transactional(rollbackFor = {Exception.class, Throwable.class}, timeout = 10)
    public Boolean deleteBill(Long idBill, String note) throws CustomerException {
        Bill order = billRepository.findById(idBill).orElse(null);
        if (order == null) {
            throw new CustomerException("Không tồn tại hoá đơn có id là: " + idBill);
        }
        List<BillDetail> billDetails = billDetailRepository.findByIdBill(idBill);
        //Nếu trạng thái là TO_PAY (Chờ xác nhận) thì người dùng có thể huỷ đơn hàng còn các trạng thái khac thì không.
        if (order.getStatus().equalsIgnoreCase(CommonString.OrderStatus.TO_PAY.getValue())) {
            order.setStatus(CommonString.OrderStatus.CANCELED.getValue());
            order.setNoteCancel("Huỷ " + note);
            billRepository.save(order);
            if (billDetails.size() > 0) {
                for (BillDetail billDetail : billDetails) {
                    ProductDetail productDetail = productDetailRepository.findById(billDetail.getProductDetail()
                            .getId()).orElse(null);
                    if (productDetail == null) {
                        throw new CustomerException("Sản phẩm đã ngưng bán vui lòng liên hệ cửa hàng");
                    }
                    productDetail.setAmount(productDetail.getAmount() + billDetail.getAmount());
                    productDetailRepository.save(productDetail);
                }
                return true;
            } else {
                throw new CustomerException("Không có sản phẩm nào trong hoá đơn");
            }
        } else {
            throw new CustomerException("Bạn không thể huỷ đơn hàng vì trạng thái đơn hàng của bạn đang là: "
                    + order.getStatus() + " !Vui lòng liên hệ shop để được hỗ trợ");
        }
    }

    /**
     * @param input      keyword cần search
     * @param pageNumber số trang cần lấy bắt đầu từ trang nào
     * @param pageSize   kích thước của mỗi trang.
     * @return trả về 1 đối tượng ResponsePagination dùng để phân trang
     * Đối tượng này chứa danh sách khách hàng, số trang hiện tại, tổng số trang, tổng số phần tử và kích thước trang
     */
    //Tìm kiếm danh sách bill theo phone, email, customer_name, status
    @Override
    public ResponsePagination getListBill(String input, String status, int pageNumber, int pageSize,
                                          String orderBy, String orderDirection) throws CustomerException {
        String finalOrderBy = orderDirection == null ? "DESC" : orderDirection;
        String finalOrderField = orderBy == null ? "id" : orderBy;
        Sort sort = Sort.by(Sort.Direction.fromString(finalOrderBy), finalOrderField);

        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, sort);
        Page<Bill> billPage = null;

        if (input.isEmpty() && status.isEmpty()) {
            billPage = billRepository.findAllBill(pageable);
        } else if (!input.isEmpty() && !status.isEmpty()) {
            billPage = billRepository.findAllBySearchAndStatus(input, status, pageable);
        } else if (!input.isEmpty()) {
            billPage = billRepository.findAllBySearch(input, pageable);
        } else if (!status.isEmpty()) {
            billPage = billRepository.findAllBySearch(status, pageable);
        }
        List<Bill> outputBill = billPage.getContent();
        List<Bill> lst = new ArrayList<>();
        for (Bill bill : outputBill) {
            bill.setAddress(cutAddress(bill.getAddress()));
            lst.add(bill);
        }
        return new ResponsePagination(lst,
                pageNumber,
                billPage.getTotalPages(),
                (int) billPage.getTotalElements(),
                billPage.getSize());
    }

    /**
     * @param cart là một danh sách thông tin các sản phẩm trong giỏ hàng
     */
    //Add thông tin của bill_details
    public Boolean addOrderDetails(List<CartDetailsRequest> cart) throws CustomerException {
        int idMaxBill = billRepository.getMaxIdBill();
        Bill bill = billRepository.findById(Long.valueOf(idMaxBill)).orElse(null);
        if (bill == null) {
            throw new CustomerException("Tạo hoá đơn thất bại");
        }
        if (idMaxBill > 0 && cart.size() > 0) {
            for (CartDetailsRequest x : cart) {
                ProductDetail prd = productDetailRepository.findById(x.getProductDetailId()).orElse(null);
                if (prd == null) {
                    throw new CustomerException("Không tồn tại product details có id: " + x.getProductDetailId());
                }
                BillDetail billDetail = new BillDetail();
                billDetail.setBill(bill);
                billDetail.setProductDetail(prd);
                billDetail.setAmount(x.getAmount());
                billDetail.setUnitPrice(x.getPrice());
                billDetail.setDiscount(x.getDiscount());
                billDetail.setPromotionalPrice(x.getPromotionalPrice());
                BillDetail billDetailSave = billDetailRepository.save(billDetail);
                if (billDetailSave == null) {
                    throw new MyCustomException("Add BillDetails Failed");
                }
                //Tính lại số lượng sản phẩm còn lại trong kho sau khi khách đã mua.
                int totalProductDetails = prd.getAmount() - x.getAmount();
                prd.setAmount(totalProductDetails);
                productDetailRepository.save(prd);
                cartDetailService.deleteCartDetailBill(x.getId());
            }
            return true;
        } else {
            throw new CustomerException("Tạo chi tiết hoá đơn thất bại");
        }
    }

    /**
     * get all billdetails by id bill
     *
     * @param id id của bill
     * @return về 1 list billdetails.
     */
    @Override
    public BillDetailsDTO getBillDetailsByIdBill(Long id) throws CustomerException {
        List<BillDetail> lstBillDetails = billDetailRepository.findByIdBill(id);
        Bill bill = billRepository.findById(id).orElse(null);
        BillDetailsDTO billDetailsDTO = new BillDetailsDTO();
        if (lstBillDetails.size() > 0) {
            List<ProductInfo> lstProductInfo = new ArrayList<>();
            for (BillDetail billDetail : lstBillDetails) {
                Long idProductDetail = billDetail.getProductDetail().getId();
                List<ProductInfo> productInfos = billDetailRepository.findAllBillDetailCustomer(idProductDetail, id);
                if (productInfos == null || productInfos.size() == 0) {
                    throw new CustomerException("Không tìm thấy thông tin sản phẩm");
                }
                lstProductInfo.add(productInfos.get(0));
            }
            if (bill != null) {
                billDetailsDTO.setPay_date(convertToLocalDateWithTimeZone(bill.getCreateAt(), ZoneId.of("Asia/Ho_Chi_Minh")));
                billDetailsDTO.setPayments(bill.getPayments());
            }
            billDetailsDTO.setProductInfo(lstProductInfo);
            billDetailsDTO.setTotalPrice(bill.getTotalPayment());
            billDetailsDTO.setTotalProduct(lstBillDetails.size());
            return billDetailsDTO;
        } else {
            throw new CustomerException("Không tìm thất hoá đơn chi tiết có id: " + id);
        }
    }

    /**
     * get all bill by id customer
     *
     * @param pageNumber
     * @param pageSize
     * @return
     */
    @Override
    public ResponsePagination getAllBilByIdCustomer(int pageNumber, int pageSize, String status) throws CustomerException {
        if (pageNumber < 0 || pageSize < 0) {
            throw new CustomerException("pageNumber hoặc pageSize không hp lệ ");
        }
        UserDetails userDetails = Utils.getCurrentUser();
        Customer customer = customerRepository.findCustomerByUsername(userDetails.getUsername());
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<Bill> billPage;
        if (status.isEmpty()) {
            billPage = billRepository.findByIdCustomer(customer.getId(), pageable);
        } else {
            billPage = billRepository.findByCustomerId(customer.getId(), status, pageable);
        }
        List<Bill> output = billPage.getContent();
        List<ListBillDTO> listBillDTOS = output.stream().map(this::convertBill).collect(Collectors.toList());
        List<ListBillDTO> listBill = new ArrayList<>();
        if (listBillDTOS.size() > 0) {
            for (ListBillDTO bill : listBillDTOS) {
                List<BillDetail> billDetail = billDetailRepository.findByIdBill(bill.getId());
                if (billDetail != null && billDetail.size() > 0) {
                    Long idProductDetail = billDetail.get(0).getProductDetail().getId();
                    Long idBill = billDetail.get(0).getBill().getId();
                    List<ProductInfo> productInfos = billDetailRepository.findAllBillDetailInfoByIdProductDetails(idProductDetail, idBill);
                    if (productInfos == null || productInfos.size() == 0) {
                        throw new CustomerException("Không tìm thấy thông tin sản phẩm");
                    }
                    bill.setProductInfo(productInfos.get(0));
                    listBill.add(bill);
                } else {
                    throw new CustomerException("Bill không có sản phẩm nào");
                }
            }
        }
        return new ResponsePagination(
                listBill,
                pageNumber,
                billPage.getTotalPages(),
                (int) billPage.getTotalElements(),
                billPage.getSize()
        );

    }

    /**
     * Xử lí logic cho api update lại bill bên phía admin.
     *
     * @return
     * @throws CustomerException
     */
    @Override
    public Bill updateBillAdmin(BillRequest billRequest) throws CustomerException {
        if (billRequest == null) {
            throw new CustomerException("Bạn chưa nhập thông tin update");
        }
        Bill bill = billRepository.findById(billRequest.getIdBill()).orElse(null);
        if (bill == null) {
            throw new CustomerException("Không tồn tại bill trong hệ thống");
        }
        bill.setCustomerName(billRequest.getCustomerName());
        bill.setPhone(billRequest.getPhone());
        bill.setEmail(billRequest.getEmail());
//        bill.setAddress(billRequest.getAddress());
        bill.setNote(billRequest.getNote());
        String status = billRequest.getStatus().trim();
        if (status.equalsIgnoreCase(CommonString.OrderStatus.TO_RECEIVE.getValue())) {
            boolean result = callApiGiaoHangNhanh(bill);
            if (!result) {
                throw new CustomerException("Giao hành cho shiper thất bại");
            }
        }
        if (status.equalsIgnoreCase(CommonString.OrderStatus.RETURNS.getValue())) {
            if (billRequest.getNoteCancel().isEmpty()) {
                throw new CustomerException("Bạn chưa nhập lí do trả hàng");
            }
            bill.setNoteCancel("Trả hàng: " + billRequest.getNoteCancel());
            bill.setPaymentDate(Utils.getCurrentTimestamp());
        } else if (status.equalsIgnoreCase(CommonString.OrderStatus.SUCCESSFUL.getValue())) {
            bill.setPaymentDate(Utils.getCurrentTimestamp());
        } else if (status.equalsIgnoreCase(CommonString.OrderStatus.CANCELED.getValue())) {
            if (billRequest.getNoteCancel().isEmpty()) {
                throw new CustomerException("Bạn chưa nhập lí do huỷ đơn hàng");
            }
            bill.setNoteCancel("Huỷ đơn: " + billRequest.getNoteCancel());
            bill.setPaymentDate(Utils.getCurrentTimestamp());
        }
        bill.setStatus(billRequest.getStatus());
        bill.setUpdateAt(Utils.getCurrentTimestamp());
        billRepository.save(bill);
        return bill;
    }

    /**
     * Xử lí logic api update billDetails;
     *
     * @param billDetailsRequest thông tin cần update bao gồm idBillDetails and số lượng
     * @return
     * @throws CustomerException
     */
    @Override
    public BillDetail updateBillDetail(BillDetailsRequest billDetailsRequest) throws CustomerException {
        try {
            BillDetail billDetail = billDetailRepository.findById(billDetailsRequest.getIdBillDetails()).orElse(null);
            if (billDetail == null) {
                throw new CustomerException("Không tồn tại hoá đơn chi tiết có id " + billDetailsRequest.getIdBillDetails());
            }
            if (billDetailsRequest.getAmount() <= 0) {
                throw new CustomerException("Bạn nhập sai số lượng rồi");
            }

            ProductDetail productDetail = productDetailRepository.findById(billDetail.getProductDetail().getId())
                    .orElse(null);
            if (productDetail == null) {
                throw new CustomerException("Sản phầm đã ngưng bán hoặc không tồn tại");
            }
            if (productDetail.getAmount() < billDetailsRequest.getAmount()) {
                throw new CustomerException("Số lượng sản phẩm không đủ");
            }
            billDetail.setAmount(billDetailsRequest.getAmount());
            billDetailRepository.save(billDetail);
            productDetail.setAmount(productDetail.getAmount() - billDetailsRequest.getAmount());
            productDetailRepository.save(productDetail);
            return billDetail;
        } catch (CustomerException ex) {
            ex.printStackTrace();
            throw new CustomerException(ex.getError());
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Lỗi hệ thống khi update thông tin");
        }
    }

    /**
     * Xử lí logic tạo bill mua hàng offline
     *
     * @return
     * @throws CustomerException
     * @throws MessagingException
     */
    @Override
    public BillOffLineDTO createBillOffLine() throws CustomerException {
        UserDetails userDetails = Utils.getCurrentUser();
        if (userDetails == null) {
            throw new CustomerException("Bạn chưa đăng nhập");
        }
        Staff staff = staffRepository.findByUsername(userDetails.getUsername()).orElse(null);
        if (staff == null) {
            throw new CustomerException("Không tồn tại nhân viên có username là : " + userDetails.getUsername());
        }
        Bill bill = new Bill();
        bill.setCreateAt(Utils.getCurrentTimestamp());
        bill.setBillCode(generateRandomString(12));
        bill.setStatus(CommonString.OrderStatus.WAIT_FOR_PAY.getValue());
        bill.setStaff(staff);
        bill.setPayments(CommonString.Payments.PAYING_AT_THE_STORE.getValue());
        billRepository.save(bill);
        BillOffLineDTO billOffLineDTO = convertBillToBillOffLineDTO(bill);
        return billOffLineDTO;
    }

    /**
     * xử lí logic thêm thông tin khách hàng vào bill;
     *
     * @return
     * @throws CustomerException
     */
    @Override
    public BillOffLineDTO updateBillOffLine(CustomerBillRequest input) throws CustomerException {
        if (input == null) {
            throw new CustomerException("Bạn chưa nhập thông tin khách hàng");
        }
        if (input.getIdBill() == null || input.getIdBill() < 0) {
            throw new CustomerException("Vui lòng truyền id bill muốn thêm khách hàng");
        }
        Bill bill = billRepository.findById(input.getIdBill()).orElse(null);
        if (bill == null) {
            throw new CustomerException("ID bill " + input.getIdBill() + " không tồn tại");
        }
        Customer customer = customerRepository.findById(input.getIdCustomer()).orElse(null);
        if (customer == null) {
            throw new CustomerException("Không tồn tại khách hàng có id là: " + input.getIdCustomer());
        }
        bill.setCustomerName(customer.getCustomerName());
        bill.setPhone(customer.getPhone());
        bill.setEmail(customer.getEmail());
        bill.setCustomer(customer);
        billRepository.save(bill);
        BillOffLineDTO billOffLineDTO = convertBillToBillOffLineDTO(bill);
        return billOffLineDTO;
    }

    /**
     * Xử lí logic thanh toán khi mua hàng tại quầy
     *
     * @return
     * @throws CustomerException
     */
    @Override
    @Transactional(rollbackFor = {Exception.class, Throwable.class}, timeout = 10)
    public List<ProductInfo> offlineBillPayment(ProductDetailsRequest productDetailsRequest) throws CustomerException {
        try {
            if (productDetailsRequest.getProductRequest().getAmount() == null || productDetailsRequest.getProductRequest().getAmount() <= 0) {
                productDetailsRequest.getProductRequest().setAmount(1);
            }
            if (productDetailsRequest.getIdBill() < 0) {
                throw new CustomerException("idBill không tồn tại");
            }
            if (productDetailsRequest.getProductRequest() == null) {
                throw new CustomerException("Sản phẩm không tồn tại");
            }
            Bill bill = billRepository.findById(productDetailsRequest.getIdBill()).orElse(null);
            if (bill == null) {
                throw new CustomerException("Không tồn tại bill");
            }
            ProductRequest productRequest = productDetailsRequest.getProductRequest();

            ProductDetail prd = productDetailRepository.findById(productRequest.getProductDetailId()).orElse(null);
            if (prd == null) {
                throw new CustomerException("Không tồn tại product details");
            }
            if (prd.getAmount() < productRequest.getAmount()) {
                throw new CustomerException("Số lượng sản phẩm không đủ");
            }
            BillDetail billDetail;
            billDetail = billDetailRepository.findByBillDetails(bill.getId(), prd.getId()).orElse(null);
            if (billDetail != null) {
                throw new CustomerException("Sản phẩm đã tồn tại trong giỏ hàng!");
            } else {
                billDetail = new BillDetail();
                billDetail.setBill(bill);
                billDetail.setProductDetail(prd);
                billDetail.setAmount(productRequest.getAmount());
                billDetail.setUnitPrice(productRequest.getPrice());
                billDetail.setDiscount(productRequest.getDiscount());
                billDetail.setPromotionalPrice(productRequest.getPromotionalPrice());
            }
            BillDetail billDetailSave = billDetailRepository.save(billDetail);
            List<ProductInfo> lstProductInfos = new ArrayList<>();
            List<BillDetail> lstProductDetails = billDetailRepository.findAllByBillId(bill.getId());
            if (lstProductDetails.size() == 0) {
                throw new CustomerException("Không có sản phẩm trong bill");
            }
            for (BillDetail billDetail1 : lstProductDetails) {
                Long idProductDetails = billDetail1.getProductDetail().getId();
                Long idBill = bill.getId();
                List<ProductInfo> productInfo = billDetailRepository.findAllBillDetail(idProductDetails, idBill);
                if (productInfo == null || productInfo.size() == 0) {
                    throw new CustomerException("Không tồn tại sản phẩm trong chi tiết hoá đơn");
                }
                lstProductInfos.add(productInfo.get(0));
            }
            return lstProductInfos;
        } catch (CustomerException ex) {
            ex.printStackTrace();
            throw new CustomerException(ex.getError());
        }

    }

    /**
     * Xoá 1 productDetails khỏi bill
     *
     * @param idProductDetail id của productDetail
     * @param idBill          id của bill;
     * @throws CustomerException
     */
    @Override
    @Transactional(rollbackFor = {Exception.class, Throwable.class}, timeout = 10)
    public void deleteProductDetails(Long idProductDetail) throws CustomerException {
        if (idProductDetail < 0) {
            throw new CustomerException("Dữ liệu không hợp lệ");
        }
        BillDetail billDetail = billDetailRepository.findById(idProductDetail).orElse(null);
        if (billDetail == null) {
            throw new CustomerException("Xoá thất bại! BillDetails không tồn tại!");
        }
        billDetailRepository.delete(billDetail);
    }

    /**
     * Xử lí logic api thanh toán
     *
     * @return
     * @throws CustomerException
     */
    @Override
    @Transactional(rollbackFor = {Exception.class, Throwable.class}, timeout = 10)
    public Bill payOffLine(PayRequest payRequest) throws CustomerException {
        Bill bill = billRepository.findById(payRequest.getIdBill()).orElse(null);
        Customer customer = customerRepository.findById(payRequest.getIdCustomer()).orElse(null);
        if (bill == null) {
            throw new CustomerException("Không tồn tại hoá đơn!!!");
        }
        List<BillDetail> lstProductDetails = billDetailRepository.findAllByBillId(bill.getId());
        if (lstProductDetails.size() == 0) {
            throw new CustomerException("Vui lòng thêm sản phẩm");
        }
        for (BillDetail billDetail : lstProductDetails) {
            ProductDetail productDetail = productDetailRepository.findById(billDetail.getProductDetail().getId()).orElse(null);
            if (productDetail == null) {
                throw new CustomerException("Không tìm thất sản phẩm có id là: " + productDetail.getId());
            }
            if (productDetail.getAmount() < billDetail.getAmount()) {
                throw new CustomerException("Số lượng sản phẩm không đủ");
            }
            productDetail.setAmount(productDetail.getAmount() - billDetail.getAmount());
            productDetailRepository.save(productDetail);
        }
        if (customer != null){
            bill.setCustomer(customer);
        }
        bill.setTotalPayment(payRequest.getTotalPayment()); //Set lại tổng tiền bill.
        bill.setNote(payRequest.getNote());
        bill.setNoteCancel(payRequest.getNoteCancel());
        bill.setStatus(CommonString.OrderStatus.SUCCESSFUL.getValue());
        bill.setPaymentDate(Utils.getCurrentTimestamp());
        billRepository.save(bill);
        return bill;
    }

    /**
     * Xử lí logic api khi khác hàng huỷ hoá đơn không mua nũa (mua hàng tại quầy)
     *
     * @param payRequest
     * @return
     * @throws CustomerException
     */
    @Override
    public Bill cancelOffLine(PayRequest payRequest) throws CustomerException {
        Bill bill = billRepository.findById(payRequest.getIdBill()).orElse(null);
        if (bill == null) {
            throw new CustomerException("Không tồn tại hoá đơn!!!");
        }
        if (bill.getStatus().equalsIgnoreCase(CommonString.OrderStatus.SUCCESSFUL.getValue())) {
            throw new CustomerException("Bạn không thể huỷ trạng thái đơn thành thành công");
        }
        bill.setTotalPayment(payRequest.getTotalPayment()); //Set lại tổng tiền bill.
        bill.setNote(payRequest.getNote());
        if (payRequest.getNoteCancel().isEmpty()) {
            throw new CustomerException("Vui lòng nhập lí do huỷ hoá đơn");
        }
        bill.setNoteCancel(payRequest.getNoteCancel());
        bill.setStatus(CommonString.OrderStatus.CANCELED.getValue());
        bill.setUpdateAt(Utils.getCurrentTimestamp());
        billRepository.save(bill);
        return bill;
    }

    /**
     * Xử lí logic API lấy danh sách bill chờ thanh toán tại quầy.
     *
     * @return
     * @throws CustomerException
     */
    @Override
    public ResponsePagination getAllBillOffLine(String status, int pageNumber, int pageSize) throws CustomerException {
        if (status == null || status.isEmpty()) {
            throw new CustomerException("Vui lòng chọn trạng thái muốn xem");
        }
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<Bill> billList = billRepository.findBillOffLine(status, pageable);
        return new ResponsePagination(billList.getContent(),
                pageNumber,
                billList.getTotalPages(),
                (int) billList.getTotalElements(),
                billList.getSize());
    }

    /**
     * Lấy thông tin cho build details
     *
     * @param idBill id bill cần lấy
     * @return
     * @throws CustomerException
     */
    @Override
    public BillOffLine getBillById(Long idBill) throws CustomerException {
        BillOffLine billOffLine = new BillOffLine();
        if (idBill == null) {
            throw new CustomerException("Dữ liệu không hợp lệ");
        }
        Bill bill = billRepository.findById(idBill).orElse(null);
        if (bill == null) {
            throw new CustomerException("Hoá đơn không tồn tại trong hệ thống");
        }
        List<BillDetail> lstBillDetails = billDetailRepository.findByIdBill(idBill);
        if (lstBillDetails.size() == 0) {
            return billOffLine;
        }

        List<ProductInfo> lst = new ArrayList<>();
        for (BillDetail billDetail : lstBillDetails) {
            Long idProductDetails = billDetail.getProductDetail().getId();
            List<ProductInfo> productInfos = billDetailRepository.findAllBillDetail(idProductDetails, idBill);
            if (productInfos == null || productInfos.size() == 0) {
                throw new CustomerException("Không tồn tại sản phẩm trong chi tiết hoá đơn");
            }
            lst.add(productInfos.get(0));
        }
        billOffLine.setCodeBill(bill.getBillCode());
        billOffLine.setCreate_at(bill.getCreateAt());
        if (!(bill.getStaff() == null)) {
            billOffLine.setIdStart(bill.getStaff().getId());
            billOffLine.setNameStart(bill.getStaff().getStaffName());
        }
        billOffLine.setPayments(bill.getPayments());
        billOffLine.setStatus(bill.getStatus());
        billOffLine.setProductInfos(lst);
        return billOffLine;
    }

    @Override
    public String updateAmount(Long idBillDetail, int amount) throws CustomerException {
        try {
            BillDetail billDetail = billDetailRepository.findById(idBillDetail).orElse(null);
            if (billDetail == null) {
                throw new CustomerException("Không tìm thấy hoá đơn chi tiết");
            }
            if(amount < 0){
                throw new CustomerException("Số lượng update không đúng");
            }
            ProductDetail productDetail = productDetailRepository.findById(billDetail.getProductDetail().getId()).orElse(null);
            if (productDetail == null){
                throw new CustomerException("Không tìm thất sản phẩm");
            }
            if (productDetail.getAmount() < amount){
                throw new CustomerException("Số lượng sản phẩm không đủ");
            }
            billDetail.setAmount(amount);
            billDetailRepository.save(billDetail);
            return "Update thành công";
        }catch (CustomerException e) {
            e.printStackTrace();
            throw new CustomerException(e.getError());
        }catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Lỗi hệ thống khi update");
        }

    }

    public static LocalDate convertToLocalDateWithTimeZone(Timestamp timestamp, ZoneId zoneId) throws CustomerException {
        try {
            LocalDateTime localDateTime = timestamp.toLocalDateTime().atZone(zoneId).toLocalDateTime();
            return localDateTime.toLocalDate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomerException("Lỗi convert Timestamp về Local Date");
        }
    }

    /**
     * Tạo ra mã code bill ngẫu nhiên
     *
     * @param length
     * @return
     */
    public static String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder randomString = new StringBuilder();

        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            char randomChar = characters.charAt(index);
            randomString.append(randomChar);
        }

        return randomString.toString();
    }

    /**
     * convert bill sang List Bill DTO
     *
     * @param bill thông tin bill
     * @return List Bill DTO
     */
    private ListBillDTO convertBill(Bill bill) {
        ListBillDTO billDTO = new ListBillDTO();
        billDTO.setId(bill.getId());
        billDTO.setCustomerName(bill.getCustomerName());
        billDTO.setPhone(bill.getPhone());
        billDTO.setEmail(bill.getEmail());
        billDTO.setAddress(bill.getAddress());
        billDTO.setTotalPayment(bill.getTotalPayment());
        billDTO.setNote(bill.getNote());
        billDTO.setCreateAt(bill.getCreateAt());
        billDTO.setUpdateAt(bill.getUpdateAt());
        billDTO.setStatus(bill.getStatus());
        billDTO.setPaymentDate(bill.getPaymentDate());
        billDTO.setPayments(bill.getPayments());
        billDTO.setBillCode(bill.getBillCode());
        billDTO.setNoteCancel(bill.getNoteCancel());
        return billDTO;
    }

    private BillOffLineDTO convertBillToBillOffLineDTO(Bill bill) {
        BillOffLineDTO billOffLineDTO = new BillOffLineDTO();
        billOffLineDTO.setIdBill(bill.getId());
        billOffLineDTO.setCustomerName(bill.getCustomerName());
        billOffLineDTO.setPhone(bill.getPhone());
        billOffLineDTO.setEmail(bill.getEmail());
        billOffLineDTO.setNote(bill.getNote());
        billOffLineDTO.setCreateAt(bill.getCreateAt());
        billOffLineDTO.setUpdateAt(bill.getUpdateAt());
        billOffLineDTO.setStatus(bill.getStatus());
        billOffLineDTO.setPaymentDate(bill.getPaymentDate());
        billOffLineDTO.setPayments(bill.getPayments());
        billOffLineDTO.setBillCode(bill.getBillCode());
        billOffLineDTO.setNoteCancel(bill.getNoteCancel());
        billOffLineDTO.setIdStaff(bill.getStaff().getId());
        billOffLineDTO.setNameStaff(bill.getStaff().getStaffName());
        return billOffLineDTO;
    }

    public boolean callApiGiaoHangNhanh(Bill bill) throws CustomerException {
        List<ProductGhn> lst = new ArrayList<>();
        ProductGhn giaoHangNhanhDTO = new ProductGhn();
        List<BillDetail> billDetails = billDetailRepository.findAllByBillId(bill.getId());
        if (billDetails.size() == 0) {
            throw new CustomerException("Không có sản phẩm nào");
        }
        List<ProductInfo> lstProductInfo = new ArrayList<>();
        for (BillDetail billDetail : billDetails) {
            Long idProductDetail = billDetail.getProductDetail().getId();
            List<ProductInfo> productInfos = billDetailRepository.findAllBillDetailInfoByIdProductDetails(idProductDetail, bill.getId());
            if (productInfos == null || productInfos.size() == 0) {
                throw new CustomerException("Không tìm thấy thông tin sản phẩm");
            }
            lstProductInfo.add(productInfos.get(0));
        }
        for (ProductInfo productInfo : lstProductInfo) {
            BigDecimal bigDecimalValue = new BigDecimal(String.valueOf(productInfo.getPromotionalPrice()));
            int doubleValue = bigDecimalValue.intValue();
            giaoHangNhanhDTO.setName(productInfo.getProductName());
            giaoHangNhanhDTO.setCode("Code " + productInfo.getIdBillDetail());
            giaoHangNhanhDTO.setPrice(productInfo.getPromotionalPrice() == null ? Integer.parseInt(productInfo.getUnitPrice().toString()) : doubleValue);
            giaoHangNhanhDTO.setQuantity(productInfo.getAmount());
            lst.add(giaoHangNhanhDTO);
        }
        Customer customer = customerRepository.findById(bill.getCustomer().getId()).orElse(null);
        if (customer == null) {
            throw new CustomerException("Không tìm thấy thông tin khách hàng");
        }
        String address = cutAddress(bill.getAddress());
        BigDecimal bigDecimalValue = new BigDecimal(String.valueOf(bill.getTotalPayment()));
        int totalPrice = bigDecimalValue.intValue();
        String[] parts = bill.getAddress().split("----------");
        int totalProduct = billDetails.size();
        if (parts.length == 2) {
            String selectedWardDistrict = parts[1].trim(); // Lấy chuỗi "selectedWard,selectedDistrict"
            String[] subParts = selectedWardDistrict.split(",");
            if (subParts.length == 2) {
                String selectedWard = subParts[0].trim(); // Lấy biến selectedWard
                String selectedDistrict = subParts[1].trim(); // Lấy biến selectedDistrict
                ShippingOrderDTO shippingOrderDTO = new ShippingOrderDTO();
                shippingOrderDTO.setNote("Shoe Shoe");
                shippingOrderDTO.setContent("");
                shippingOrderDTO.setItems(lst);
                shippingOrderDTO.setHeight(5 * totalProduct);
                shippingOrderDTO.setWeight(10 * totalProduct);
                shippingOrderDTO.setWidth(3 * totalProduct);
                shippingOrderDTO.setLength(6 * totalProduct);
                shippingOrderDTO.setCod_amount(totalPrice);
                shippingOrderDTO.setCod_failed_amount(2000);
                shippingOrderDTO.setService_type_id(2);
                shippingOrderDTO.setTo_name(customer.getCustomerName());
                shippingOrderDTO.setTo_phone(bill.getPhone());
                shippingOrderDTO.setTo_address(address);
                shippingOrderDTO.setTo_ward_code(selectedWard);
                shippingOrderDTO.setTo_district_id(Integer.parseInt(selectedDistrict));
                shippingOrderDTO.setPayment_type_id(2);
                shippingOrderDTO.setRequired_note("KHONGCHOXEMHANG");
                giaoHangNhanhService.createShippingOrder(shippingOrderDTO);
                // Sử dụng selectedWard và selectedDistrict theo nhu cầu của bạn
            } else {
                throw new CustomerException("Địa chỉ không đúng định dạng");
            }
        } else {
            throw new CustomerException("Địa chỉ không đúng định dạng");
        }
        return true;
    }

    private String cutAddress(String address) throws CustomerException {
        String[] parts = address.split("----------");
        if (parts.length >= 1) {
            String desiredValue = parts[0].trim(); // Lấy giá trị "số 1 ,đường HN,Đống Đa"
            return desiredValue;
        } else {
            throw new CustomerException("Địa chỉ không hợp lệ");
        }
    }
}
