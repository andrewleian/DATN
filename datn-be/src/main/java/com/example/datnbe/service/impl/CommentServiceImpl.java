package com.example.datnbe.service.impl;

import com.example.datnbe.common.CommonString;
import com.example.datnbe.domain.Bill;
import com.example.datnbe.domain.Comment;
import com.example.datnbe.domain.Customer;
import com.example.datnbe.dto.CommentDTO;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.exception.MyCustomException;
import com.example.datnbe.repository.BillRepository;
import com.example.datnbe.repository.CommentRepository;
import com.example.datnbe.repository.CustomerRepository;
import com.example.datnbe.service.CommentService;
import com.example.datnbe.utils.Utils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;
    @Autowired
    BillRepository billRepo;

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public ResponsePagination getAllCommentsByProduct(Long idProduct, int pageNo, int pageSize) {
        Pageable paging = PageRequest.of(pageNo - 1, pageSize);
        Page<Comment> pagedResult = commentRepository.getAllComments(paging, idProduct);
        List<CommentDTO> commentDto = pagedResult.getContent()
                .stream()
                .map(comment -> modelMapper.map(comment, CommentDTO.class))
                .collect(Collectors.toList());
        return new ResponsePagination(
                commentDto,
                pagedResult.getNumber() + 1,
                pagedResult.getTotalPages(),
                (int) pagedResult.getTotalElements(),
                pagedResult.getSize()
        );
    }

    @Override
    public CommentDTO saveComment(CommentDTO commentDTO) throws MyCustomException {
        String userDetails = Utils.getCurrentUser().getUsername();
        Optional<Customer> customer = customerRepository.findByUsername(userDetails);
        if (!customer.isPresent()) {
            throw new MyCustomException("Không tìm thấy tông tin customer");
        }
        List<Bill> getBillByStatus = billRepo.getBillByStatus(getCustomer().getId(), commentDTO.getIdProduct());
        List<Comment> getCommentByDay = commentRepository.numberOfCommentsByCustomer(commentDTO.getIdProduct(), getCustomer().getId());
        /**
         *  soLuotMua : là lấy tổng các bill có status là thành công and idCustommer | soLuotComment: tổng tất cả comment theo idProduc and idCustomer
         *  countBillByDay : số bill mua trong thời gian < 15 ngày và đk comment | countCommentByDay : sô đã comment trong vòng < 15 day
         *  Case1: soLuotMua = 0 : chưa mua lên 0 đk comment
         *  case2 : soLuotComment == soLuotMua : mua lần đầu || countBillByDay == countCommentByDay : mua nhiều lần tiếp theo
         *  Case3 : soLuotMua > soLuotComment && countBillByDay > countCommentByDay : tổng mua > tông comment
         *          AND countBillByDay > countCommentByDay : so sánh sô lượt mua và lượt comment trong thời gian 15 ngày, quá 15 ngày 0 đk comment
         **/
        Integer soLuotMua = getBillByStatus.size();
        Integer soLuotComment = getCommentByDay.size();
        long countBillByDay = getBillByStatus.stream()
                .filter(bill -> {
                    long daysBetween = daysBetweenss(bill.getUpdateAt());
                    return daysBetween <= 15;
                }).count();
        Long countCommentByDay = getCommentByDay.stream()
                .filter(bill -> {
                    long daysBetween = daysBetweenss(bill.getCreateAt());
                    return daysBetween <= 15;
                }).count();
        if (soLuotMua == 0) {
            throw new MyCustomException(" Bạn chưa mua khong được comment.");
        } else if (soLuotComment == soLuotMua || countBillByDay == countCommentByDay) {
            throw new MyCustomException("Bạn chỉ được comment 1 lần.");
        } else if (soLuotMua > soLuotComment && countBillByDay > countCommentByDay) {  // sl comment =sooso lương thành oong và o quá ngày
            for (Bill b : getBillByStatus) {
                if (daysBetweenss(b.getUpdateAt()) <= 15) {
                    commentDTO.setCreateAt(Utils.getCurrentTimestamp());
                    commentDTO.setStatus(CommonString.Status.ACTIVATED.getValue());
                    commentDTO.setIdCustomer(getCustomer().getId());
                    Comment comment = commentRepository.save(modelMapper.map(commentDTO, Comment.class));
                    return modelMapper.map(comment, CommentDTO.class);
                }
            }
        }
        return null;
    }

    @Override
    public CommentDTO editComment(Long id,String conten) throws MyCustomException {
        Optional<Comment> check = commentRepository.findById(id);
        if (!check.isPresent()) {
            throw new MyCustomException("Không tìm thấy comment nào có id : " + id);
        }
        Comment comment = check.get();
        if (daysBetweenss(check.get().getCreateAt()) <= 15 && check.get().getUpdateAt() == null) {  // trong khoảng 15 ngày được sửa 1 lần ( updateAt == null)
            comment.setContent(conten);
            comment.setUpdateAt(Utils.getCurrentTimestamp());
            Comment commentSave = commentRepository.save(comment);
            return modelMapper.map(commentSave, CommentDTO.class);
        } else if (daysBetweenss(check.get().getCreateAt()) > 15 && check.get().getUpdateAt() == null) {
            throw new MyCustomException("Đã quá thời gian 15 ngày không được comment.");
        }
        throw new MyCustomException("Chỉ đươợc sửa comment 1 lần.");

    }

    /**
     * daysBetweenss : tính số ngày giữa 2 Date
     */
    public Long daysBetweenss(Timestamp date) {
        LocalDateTime localDateTime = date.toLocalDateTime();
        LocalDate start = localDateTime.toLocalDate();
        LocalDate currentDate = LocalDate.now();
        long durationInDays = ChronoUnit.DAYS.between(start, currentDate);
        return durationInDays;
    }


    /**
     * check customer
     */
    public Customer getCustomer() {
        String userDetails = Utils.getCurrentUser().getUsername();
        Optional<Customer> customer = customerRepository.findByUsername(userDetails);
        if (!customer.isPresent()) {
            throw new MyCustomException("Không tìm thấy tông tin customer");
        }
        return customer.get();
    }
}
