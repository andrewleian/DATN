/**
 * Dự án tốt nghiệp Foly
 * <p>
 * CommonString.java tientv34
 *
 * @author tientv34
 */
package com.example.datnbe.common;


public class CommonString {

    /**
     * Trạng thái của customer and staff
     */
    public enum StatusAccount {
        ENABLED("enable"),
        DISABLED("disable");

        private String value;

        StatusAccount(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }

    /**
     * Trạng thái hoá đơn thanh toán online hay offline
     */
    public enum Payments {
        ONLINE("online"),
        OFFLINE("offline"),
        PAYING_AT_THE_STORE("Thanh toán tại quầy");

        private String value;

        Payments(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }

    /**
     * Trạng thái của các bảng
     */
    public enum Status {
        ACTIVATED("active"),
        INACTIVATED("inactive");

        String value;

        Status(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }

    /**
     * Trạng thái của hoá đơn
     */
    public enum OrderStatus {
        TO_PAY("Chờ xác nhận"), //Trạng thái khi đặt hàng thành công
        PREPARING_GOODS("Đang chuẩn bị hàng"), //trạng thái của quản trị viên
        TO_SHIPPING("Chờ đơn vị vận chuyển"),//trạng thái của quản trị viên
        TO_RECEIVE("Đang giao"),//trạng thái của quản trị viên
        CANCELED("Huy"),//trạng thái của quản trị viên
        RETURNS("Trả hàng"), //Của bên thứ 3
        SUCCESSFUL("Thành công"), //Của bn thứ 3
        EXCHANGE_AND_RETURN("Đổi hàng"), // trạng thái của hóa đơn đổi.
        WAIT_FOR_PAY("Chờ thanh toán"); //Trạng thái chờ thanh toán đơn hàng

        String value;

        OrderStatus(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }

    public enum ErrorExcel {
        ERR_DATA_IMPORT("Lỗi dữ liệu");
//        EXISTS_PRODUCT("Đã có product"),
//        EXISTS_PCS("inactive"),
//        EXISTS_PRODUCT_DETAIL("inactive"),
//        EXISTS_COLOR("inactive"),
//        EXISTS_SIZE("inactive");

        String value;

        ErrorExcel(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }
}
