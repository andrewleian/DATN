package com.example.datnbe.controller;

import com.example.datnbe.domain.ResponseObject;
import com.example.datnbe.dto.CartDetailDTO;
import com.example.datnbe.dto.ShowCartDetail;
import com.example.datnbe.exception.MyCustomException;
import com.example.datnbe.service.impl.CartDetailImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/customer/cartdetail")
public class CartDetailController {
    @Autowired
    CartDetailImpl cartDetailService;

    @CrossOrigin
    @GetMapping
    ResponseEntity<List<ShowCartDetail>> getAllCartDetail() {
        List<ShowCartDetail> getAll = cartDetailService.getAllCart();
        return ResponseEntity.ok(getAll);
    }

    @CrossOrigin
    @GetMapping("/countcart")
    ResponseEntity<Integer> getCountProductsToCart() {
        int counts = cartDetailService.countProductDetailInCart();
        return ResponseEntity.ok(counts);
    }

    @CrossOrigin
    @PostMapping("/addtocart")
    ResponseEntity<?> addToCartDetail(@Valid @RequestBody CartDetailDTO cartDl) {
        try {
            CartDetailDTO addCart = cartDetailService.addToCartDetail(cartDl);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(
                            "ok", "add to cart thành công", addCart
                    )
            );
        } catch (MyCustomException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(
                            "Faill", e.getMessage(), ""
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(
                            "Faill", "Faill add to cart", ""
                    )
            );
        }
    }

    @CrossOrigin
    @PostMapping("/add-all-tocart")
    ResponseEntity<ResponseObject> addAllCartDetail(@Valid @RequestBody List<CartDetailDTO> cartDl) {
        try{
            List<CartDetailDTO> addCart = cartDetailService.saveAll(cartDl);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(
                            "ok", "add to cart thành công", addCart
                    )
            );
        } catch (MyCustomException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject(
                            "ok", e.getMessage(),""
                    )
            );
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject(
                            "Faill", "Faill add that bai", ""
                    )
            );
        }
    }

    @CrossOrigin
    @PutMapping("/updatecart")
    ResponseEntity<?> updateToCart(@Valid @RequestBody CartDetailDTO cartDetaiDto) {
        try {
            CartDetailDTO updateCart = cartDetailService.updateToCartDetail(cartDetaiDto);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(
                            "ok", "update to cart thành công", updateCart
                    )
            );
        } catch (MyCustomException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(
                            "Faill", "Faill update to cart", ""
                    )
            );
        }
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteOutCart(@PathVariable Long id) {
        String delete = cartDetailService.deleteOutCart(id);
        return ResponseEntity.status(HttpStatus.OK).body(delete);
    }

    @CrossOrigin
    @DeleteMapping("/deleteall_cartdetail")
    ResponseEntity<String> deleteAllCartDetail() {
        String delete = cartDetailService.deleteAll();
        return ResponseEntity.status(HttpStatus.OK).body(delete);
    }

    @CrossOrigin
    @GetMapping("/check-amount-gui-bill")
    ResponseEntity<String> checkAmountKhiGuiChoBill() {
        String message = cartDetailService.checkSlSendBill();
        if (message.equals("OK")) {
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
