import { useRef, useState, useEffect, useContext } from "react"
import { Link, parsePath, useNavigate } from 'react-router-dom'
import axios from "axios"
import style from './PaymentError.module.scss'
import clsx from 'clsx'
import { StoreContext, actions } from '../../store'

function UpdatePaymentError() {
    const navigate = useNavigate();
    const role = JSON.parse(localStorage.getItem('role'))
    const token = JSON.parse(localStorage.getItem('token'))
    const [state, dispatch] = useContext(StoreContext)

    const getCartLength = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const [response] = await Promise.all([
                axios.get(`http://localhost:8080/api/v1/customer/cartdetail/countcart`)
            ]);
            dispatch(actions.setCartTotalItems(response.data))
        } catch (error) {
            console.log(error);
        }
    }

    const idBillUpdate = JSON.parse(localStorage.getItem("idBillUpdate"));
    const updateAnOrder = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.put(`http://localhost:8080/api/v1/bill/updatePayOnline/${idBillUpdate}/?isPayOnline="false"`);
            if (response.status == 200) {
                getCartLength();
                navigate('/traCuuDonHang');
            }
        } catch (error) {
            console.log(error);
        }
    };
    updateAnOrder();

    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo-en.svg"></img>
            </div>

            <div className={style.main}>
                <div>
                    <img src="https://sandbox.vnpayment.vn/paymentv2/images/graph/error.svg"></img>
                    <p className={style.text1}>Thông báo</p>
                    <p className={style.text2}>Có lỗi xảy ra trong quá trình xử lý. Vui lòng liên hệ 1900 55 55 77 để được hỗ trợ</p>
                </div>
                <div className={style.formItem}>
                    <div className={style.item1}>
                        <p>Mã tra cứu</p>
                        <p>032399945</p>
                    </div>
                    <div className={style.item2}>
                        <p>Thời gian giao dịch</p>
                        <p>25/07/2023 11:20:58 SA</p>
                    </div>
                </div>
            </div>

            <div className={style.footer}>
                <div className={style.item}>
                    <i className="fa-solid fa-phone"></i>
                    <p>1900.5555.77</p>
                </div>
                <div className={style.item}>
                    <i className="fa-regular fa-envelope"></i>
                    <p>hotrovnpay@vnpay.vn</p>
                </div>
                <div className={style.item}>
                    <img src="https://sandbox.vnpayment.vn/paymentv2/images/img/logos/global-sign.svg"></img>
                    <img src="https://sandbox.vnpayment.vn/paymentv2/images/img/logos/pcidss.svg"></img>
                </div>
            </div>
        </div>
    )
}

export default UpdatePaymentError