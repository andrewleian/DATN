/**
 * Dự án tốt nghiệp Foly
 * <p>
 * CustomerServiceImpl.java tientv34
 *
 * @author tientv34
 */
package com.example.datnbe.service.impl;

import com.example.datnbe.common.CommonString;
import com.example.datnbe.domain.Customer;
import com.example.datnbe.dto.CustomerDTO;
import com.example.datnbe.dto.DataEmailDTO;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.repository.CustomerRepository;
import com.example.datnbe.request.CustomerRequest;
import com.example.datnbe.service.CustomerService;
import com.example.datnbe.service.MailService;
import com.example.datnbe.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.mail.MessagingException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Pattern;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private MailService mailService;

    public CustomerServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    //convert CustomerDTO to CustomerEntity
    public Customer convertFromCustomerDTO(CustomerDTO dto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(dto.getBirthday(), formatter);
        Customer customerEntity = new Customer();
        customerEntity.setCustomerName(dto.getCustomerName());
        customerEntity.setPhone(dto.getPhone());
        customerEntity.setBirthday(localDate);
        customerEntity.setEmail(dto.getEmail());
        customerEntity.setGender(dto.getGender());
        customerEntity.setPassword(passwordEncoder.encode(dto.getPassword()));
        return customerEntity;
    }

    //create customer

    /**
     *
     * @param customerDTO Đối tượng customer nhận từ FE
     * @return nếu create thành công thì sẽ trả về 1 customer entity
     * @throws CustomerException trả ra exception có format là customerException
     */
    @Override
    public Customer addCustomer(CustomerDTO customerDTO) throws CustomerException {
        if (customerDTO == null) return null;
        Optional<Customer> findCustomerByEmail = customerRepository.findCustomerByEmail(customerDTO.getEmail());
        if (findCustomerByEmail.isPresent()) {
            throw new CustomerException("Địa chỉ email này đã được đăng kí");
        }
        isValidatorCustomer(customerDTO); //validator các trường dữ liệu customer
        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        Customer customerEntity = convertFromCustomerDTO(customerDTO);
        customerEntity.setUsername(customerDTO.getUsername());
        customerEntity.setCreateAt(currentTimestamp);
        customerEntity.setUpdateAt(currentTimestamp);
        //Set trang thái mặc định khi đăng kí
        customerEntity.setStatus(CommonString.StatusAccount.ENABLED.getValue());
        Customer customerSave = customerRepository.save(customerEntity);
        if (customerSave != null) {
            try {
                DataEmailDTO dataSendEmail = new DataEmailDTO();
                dataSendEmail.setTo(customerSave.getEmail());
                dataSendEmail.setSubject(Utils.SIGN_UP_FOR_REGISTER_ACCOUNT);
                Map<String, Object> props = new HashMap<>();
                props.put("name", customerSave.getCustomerName());
                props.put("username", customerSave.getUsername());
                dataSendEmail.setProps(props);
                mailService.sendHtmlMail(dataSendEmail, "templateRegisterAccount");
            }catch (Exception ex){
                ex.printStackTrace();
                throw new CustomerException("Gửi email thất bại");
            }
        }
        return customerEntity;
    }

    /**
     * Xử lí logic cho hàm update customer
     * @param customerDTO Đối tượng customer nhận từ FE
     * @return nếu update thành công sẽ trả vê 1 customer entity còn thất bại sẽ trả về exception hoặc null
     * @throws CustomerException trả ra exception có format là customerException
     */
    //Cập nhâp thông tin của customer
    @Override
    public Customer updateCustomer(CustomerDTO customerDTO, Long id) throws CustomerException {
        if (!CommonString.StatusAccount.ENABLED.getValue().equals(customerDTO.getStatus()) &&
                !CommonString.StatusAccount.DISABLED.getValue().equals(customerDTO.getStatus())){
            throw new CustomerException("Trạng thái "+ customerDTO.getStatus() +" không hợp lệ");
        }
        Customer customer = getCustomerById(id);
        Customer customerPhone = customerRepository.findByPhone(customerDTO.getPhone()).orElse(null);
        if (customer == null){
            throw new CustomerException("Không tìm thấy khách hàng có id là: "+ id);
        }
        if(customerPhone != null && !customerPhone.getId().equals(customer.getId())){
            throw new CustomerException("Số điện thoại đã tồn tại!");
        }
        try{
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate localDate = LocalDate.parse(customerDTO.getBirthday(), formatter);
            //Set các thuộc tính của customerDTO vào customerEntity.
            customer.setCustomerName(customerDTO.getCustomerName());
            customer.setBirthday(localDate);
            customer.setPhone(customerDTO.getPhone());
            customer.setStatus(customerDTO.getStatus());
            customer.setGender(customerDTO.getGender());
            customer.setUpdateAt(Utils.getCurrentTimestamp());
        }catch (Exception ex){
            ex.printStackTrace();
            throw new CustomerException("Định dạng ngày tháng của bạn không đúng (yyyy-mm-dd)");
        }
        return customerRepository.save(customer);
    }

    /**
     * Xử lí logic cho api get list customer
     * @param dataSearch
     * @param pageNumber
     * @param pageSize
     * @param orderBy
     * @param orderDirection
     * @param status
     * @return
     */
    @Override
    public ResponsePagination getListCustomer(String dataSearch, int pageNumber, int pageSize,
                                              String orderBy, String orderDirection, String status) {
        String finalOrderBy = orderDirection == null ? "DESC" : orderDirection;
        String finalOrderField = orderBy == null ? "id" : orderBy;
        Sort sort = Sort.by(Sort.Direction.fromString(finalOrderBy), finalOrderField);

        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, sort);
        Page<Customer> customerPage = null;
        if (StringUtils.isEmpty(dataSearch)) {
            customerPage = customerRepository.findAllByStatus(status, pageable);
        }
        if (dataSearch != null) {
            customerPage = customerRepository.findAllBySearch(status, dataSearch, pageable);
        }
        List<Customer> outputCustomer = customerPage.getContent();
        return new ResponsePagination(outputCustomer,
                                        pageNumber,
                                        customerPage.getTotalPages(),
                                        (int) customerPage.getTotalElements(),
                                        customerPage.getSize());
    }

    /**
     *
     * @param id là id của customer cần xoá
     * @return trả ok nếu xoá thành công xoá thất bại trả về null.
     * @throws CustomerException custom exception trả ra.
     */
    //Xoá 1 customer
    @Override
    public String deleteCustomer(Long id) throws CustomerException {
        Optional<Customer> customerFinByID = customerRepository.findById(id);
        if (!customerFinByID.isPresent()) {
            throw new CustomerException("Không tìm thấy khách hàng có " + id);
        }
        Customer customer = customerFinByID.get();
        customer.setStatus(CommonString.StatusAccount.DISABLED.getValue());
        customerRepository.save(customer);
        return "ok";
    }

    /**
     *
     * @param id id của customer cần lấy dữ liệu
     * @return trả về 1 đối tượng customer nếu thành công
     * @throws CustomerException custom exception trả ra.
     */
    @Override
    public Customer getCustomerById(Long id) throws CustomerException {
        Optional<Customer> customer = customerRepository.findById(id);
        if (!customer.isPresent()) {
            throw new CustomerException("Không tìm thấy customer này");
        }
        return customerRepository.findById(id).get();
    }

    /**
     * Tajo customer khi mua hàng offline
     * @param customerRequest
     * @return
     * @throws CustomerException
     */
    @Override
    public Customer addCustomerOffLine(CustomerRequest customerRequest) throws CustomerException, MessagingException {
        try {
            if (customerRequest == null){
                throw new CustomerException("Bạn chưa nhập thông tin khách hàng");
            }
            Customer customerEmail = customerRepository.findCustomerByEmail(customerRequest.getEmail()).orElse(null);
            if (customerEmail != null){
                throw new CustomerException("Địa chỉ email đã tồn tại trong hệ thống");
            }
            Customer customerPhone = customerRepository.findByPhone(customerRequest.getPhoneNumber()).orElse(null);
            if (customerPhone != null){
                throw new CustomerException("Số điện thoại đã tồn tại trong hệ thống");
            }
            String password = BillServiceImpl.generateRandomString(12);
            Customer customer = new Customer();
            customer.setCustomerName(customerRequest.getCustomerName());
            customer.setPhone(customerRequest.getPhoneNumber());
            customer.setEmail(customerRequest.getEmail());
            customer.setGender(customerRequest.getGender());
            customer.setUsername(customerRequest.getEmail());
            customer.setCreateAt(Utils.getCurrentTimestamp());
            customer.setStatus(CommonString.StatusAccount.ENABLED.getValue());
            customer.setPassword(passwordEncoder.encode(password));
            customerRepository.save(customer);

            DataEmailDTO dataSendEmail = new DataEmailDTO();
            dataSendEmail.setTo(customer.getEmail());
            dataSendEmail.setSubject(Utils.LOGIN_INFORMATION);
            Map<String, Object> props = new HashMap<>();
            props.put("name", customer.getUsername());
            props.put("password", password);
            dataSendEmail.setProps(props);

            //Gửi email
            mailService.sendHtmlMail(dataSendEmail, "sendEmailMuaHangOffLine");
            return customer;
        }catch (CustomerException ex){
            ex.printStackTrace();
            throw new CustomerException(ex.getError());
        }catch (Exception ex){
            ex.printStackTrace();
            throw new RuntimeException("Lỗi khi tạo khách hàng");
        }
    }

    /**
     * Xử lí search customer.
     * @param keyword
     * @return
     * @throws CustomerException
     */
    @Override
    public List<Customer> searchCustomer(String keyword) throws CustomerException {
        List<Customer> listCustomers = new ArrayList<>();
        if (keyword == null || keyword.isEmpty()) {
            throw new CustomerException("Vui lòng nhập từ khoá tìm kiếm");
        }
        listCustomers = customerRepository.searchCustomer(keyword);
        if (listCustomers.size() == 0){
            throw new CustomerException("Không có dữ liệu hợp lệ");
        }
        return listCustomers;
    }

    /**
     *
     * @param customerDTO thông tin của customerDTO cần validator
     * @throws CustomerException custom exception trả ra.
     */
    public void isValidatorCustomer(CustomerDTO customerDTO) throws CustomerException {
        List<Customer> lstCustomer = customerRepository.findAll();
        String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        if (!Pattern.matches(EMAIL_PATTERN, customerDTO.getEmail())) {
            throw new CustomerException("Địa chỉ email không đúng định dạng");
        }
        if (lstCustomer.stream().anyMatch(x -> x.getPhone().equals(customerDTO.getPhone()))) {
            throw new CustomerException("Số điện thoại đã tồn tại");
        }
        if (lstCustomer.stream().anyMatch(x -> x.getUsername().equals(customerDTO.getUsername()))) {
            throw new CustomerException("UserName đã tồn tại");
        }
    }
}
