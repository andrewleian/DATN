package com.example.datnbe.service.impl;

import com.example.datnbe.domain.Staff;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.dto.StaffDTO;
import com.example.datnbe.exception.MyCustomException;
import com.example.datnbe.repository.StaffRepository;
import com.example.datnbe.service.StaffService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StaffServiceImpl implements StaffService {
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    StaffRepository staffRepository;
    List<String> getSearch = new ArrayList<>();
    private final PasswordEncoder passwordEncoder;

    public StaffServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ResponsePagination getListStaff(String dataSearch, int pageNumber, int pageSize, String orderBy, String orderDirection, String status) {
        String finalOrderBy = orderDirection == null ? "DESC" : orderDirection;
        String finalOrderField = orderBy == null ? "id" : orderBy;
        Sort sort = Sort.by(Sort.Direction.fromString(finalOrderBy), finalOrderField);

        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, sort);
        Page<Staff> staffPage = null;
        if (StringUtils.isEmpty(dataSearch)) {
            staffPage = staffRepository.findAllByStatus(status, pageable);
        }
        if (dataSearch != null) {
            staffPage = staffRepository.findAllSeach(status, dataSearch, pageable);
        }

        List<StaffDTO> staffDTOs = staffPage.getContent()
                .stream()
                .map(staff -> modelMapper.map(staff, StaffDTO.class))
                .collect(Collectors.toList());
        return new ResponsePagination(
                staffDTOs,
                staffPage.getNumber() + 1,
                staffPage.getTotalPages(),
                (int) staffPage.getTotalElements(),
                staffPage.getSize()
        );

    }

    @Override
    public List<String> saveStaff(StaffDTO staffDTO) {
        String userNameCus = staffRepository.checkUseCus(staffDTO.getUsername());
        List<String> err = new ArrayList<>();
        List<Staff> getAll = staffRepository.getAll();
        System.out.println("Sao không bắt lõi");
        if (getAll.stream().anyMatch(staff -> staff.getUsername().equals(staffDTO.getUsername())) || userNameCus != null) {
            err.add("Username đã tồn tại");
            System.out.println("vào name");
        }
        if (getAll.stream().anyMatch(staff -> staff.getPhone().equals(staffDTO.getPhone()))) {
            err.add("Phone đã tồn tại");
            System.out.println("vào phone");

        }
        if (getAll.stream().anyMatch(staff -> staff.getEmail().equals(staffDTO.getEmail()))) {
            err.add("Email đã tồn tại");
            System.out.println("vào email");

        }
        if (!getAll.stream().anyMatch(staff -> staff.getUsername().equals(staffDTO.getUsername())) && userNameCus == null &&
                !getAll.stream().anyMatch(staff -> staff.getPhone().equals(staffDTO.getPhone())) &&
                !getAll.stream().anyMatch(staff -> staff.getEmail().equals(staffDTO.getEmail()))
        ) {
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            staffDTO.setUpdateAt(timestamp);
            staffDTO.setCreateAt(timestamp);
            staffDTO.setStatus("enable");
            Staff staff = modelMapper.map(staffDTO, Staff.class);
            staff.setPassword(passwordEncoder.encode(staffDTO.getPassword()));
            Staff saveStaff = staffRepository.save(staff);
            // modelMapper.map(saveStaff, StaffDTO.class);
            err.add("add success");
        }
        return err;
    }

    @Override
    public List<String> updateStaff(StaffDTO staffDTO, Long id) {
        List<String> err = new ArrayList<>();
        Optional getStaff = staffRepository.findById(id);
        if (!getStaff.isPresent()) {
            err.add("không có nhân viên nào có id :" + id);
            return err;
        }
        String userNameCus = staffRepository.checkUseCus(staffDTO.getUsername());
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Staff staff1 = staffRepository.findById(id).get();
        List<Staff> getCheck = staffRepository.getCheckUpdate(id);
        if (getCheck.stream().anyMatch(staff -> staff.getUsername().equals(staffDTO.getUsername()))) {
            err.add("Username đã tồn tại 1");
        }
        if (getCheck.stream().anyMatch(staff -> staff.getPhone().equals(staffDTO.getPhone()))) {
            err.add("Phone đã tồn tại");
        }
        if (getCheck.stream().anyMatch(staff -> staff.getEmail().equals(staffDTO.getEmail()))) {
            err.add("Email đã tồn tại");
        }
        if (!getCheck.stream().anyMatch(staff -> staff.getUsername().equals(staffDTO.getUsername())) &&
                !getCheck.stream().anyMatch(staff -> staff.getPhone().equals(staffDTO.getPhone())) &&
                !getCheck.stream().anyMatch(staff -> staff.getEmail().equals(staffDTO.getEmail())) && userNameCus == null
        ) {
            staffDTO.setUpdateAt(timestamp);
            staffDTO.setId(id);
           // staffDTO.setStatus("enable");
            staffDTO.setCreateAt(staff1.getCreateAt());
            Staff staff = modelMapper.map(staffDTO, Staff.class);
            staff.setPassword(passwordEncoder.encode(staffDTO.getPassword()));
            Staff saveStaff = staffRepository.save(staff);
            modelMapper.map(saveStaff, StaffDTO.class);
            err.add("update success");
        }
        return err;
    }

    @Override
    public StaffDTO finById(long id)throws MyCustomException  {
        Optional<Staff> staff = staffRepository.findById(id);
        if (!staff.isPresent()) {
            throw new MyCustomException("Không tìm thấy nhân viên với id " + id);
        }
        Staff staffDTO = staffRepository.findById(id).get();
        return modelMapper.map(staffDTO, StaffDTO.class);
    }

    @Override
    public void deleteStaff(long id) throws MyCustomException {
        Optional<Staff> staff = staffRepository.findById(id);
        if (!staff.isPresent()) {
            throw new MyCustomException("Không tìm thấy nhân viên với id: " + id);
        } else if (staff.get().getRole().getId()==1) {
            throw new MyCustomException("Không được xóa admin: ");
        }
        Staff update = staff.get();
        update.setStatus("disable");
        staffRepository.save(update);
    }

    @Override
    public Timestamp getTimestamp() {
        return new Timestamp(new Date().getTime());
    }
}
