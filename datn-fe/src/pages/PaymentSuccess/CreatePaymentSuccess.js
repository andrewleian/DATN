import { useRef, useState, useEffect, useContext } from "react"
import { Link, parsePath, useNavigate } from 'react-router-dom'
import axios from "axios"
import style from './PaymentSuccess.module.scss'
import clsx from 'clsx'
import { StoreContext, actions } from '../../store'

function CreatePaymentSuccess() {
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

    const addInfor = JSON.parse(localStorage.getItem("addInfor"));
    const placeAnOrder = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.post(`http://localhost:8080/api/v1/bill/add?isPayOnline=true`, addInfor);
            if (response.status == 200) {
                getCartLength();
                navigate('/traCuuDonHang');
            }
        } catch (error) {
            console.log(error);
        }
    };
    placeAnOrder();

    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo-en.svg"></img>
            </div>

            <div className={style.main}>
                <div>
                    <i className="fa-solid fa-circle-check"></i>
                    <p className={style.text1}>Thông báo</p>
                    <p className={style.text2}>Thanh toán thành công</p>
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

export default CreatePaymentSuccess