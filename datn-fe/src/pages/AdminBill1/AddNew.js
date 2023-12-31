import { useState, useRef, useEffect } from "react"
import axios from "axios";
import clsx from "clsx"
import style from './AdminCustomer.module.scss'

import Modal from 'react-modal';
function AddNew1({ value }) {

    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    const [bill, setBill] = useState({ ...value.selectedBill });

    useEffect(() => {
        setBill({ ...value.selectedBill })
    }, [value.selectedBill])

    const handleInput = (key, value) => {
        setBill((prev) => ({
            ...prev,
            [key]: value
        }));
    };



    const handleDefaultValue = (action) => {
        setBill({
            id: -1,
            customerName: "",
            phone: "",
            email: "",
            address: "",
            totalPayment: 0,
            note: null,
            createAt: "",
            updateAt: "",
            status: "",
            paymentDate: "",
            payments: ""
        })

    }


    const handleSubmit = () => {

        const updateBill = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.put(`http://localhost:8080/api/v1/staff/bill/${bill.id}?status=${bill.status}`);
                if (response.status == 200) {
                    setMessage("Cập nhật thành công")
                    setIsModalMsgOpen(true)
                }
            } catch (error) {
                console.log(error);
            }
        };
        updateBill();

    }




    //
    const loadAndResetData = () => {
        value.getBills();
        value.displayAddnew.current.style.display = "none"
        value.setIsAddNewActive(false)
        handleDefaultValue('cancel')
    }

    // modal message
    const [message, setMessage] = useState("")
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);
    const handleOpenModalMsg = () => {
        setIsModalMsgOpen(true);
    };

    const handleCloseModalMsg = () => {
        setIsModalMsgOpen(false);
        loadAndResetData();
    };

    //

    return (
        <div className={style.addNew}>
            <div className={style.title}>
                <p>Bill details</p>
            </div>

            <div className={style.row3SB}>

                <div className={style.item}>
                    <label>Customer name</label>
                    <input readonly value={bill.customerName} ></input>
                </div>

                <div className={style.item}>
                    <label>Phone</label>
                    <input readonly value={bill.phone} ></input>
                </div>

                <div className={style.item}>
                    <label>Email</label>
                    <input readonly type='email' value={bill.email} ></input>
                </div>

                <div className={style.item}>
                    <label>Address</label>
                    <input readonly value={bill.address}></input>
                </div>

                <div className={style.item}>
                    <label>Total payment</label>
                    <input readonly value={bill.totalPayment} ></input>
                </div>

                <div className={style.item}>
                    <label>Create at</label>
                    <input readonly value={bill.createAt} ></input>
                </div>

                <div className={style.item}>
                    <label>Update at</label>
                    <input readonly value={bill.updateAt} ></input>
                </div>

                <div className={style.item}>
                    <label>Status</label>
                    <select value={bill.status} onChange={(e) => handleInput('status', e.target.value)}>
                        <option hidden></option>
                        <option value='Chờ xác nhận'>Chờ xác nhận</option>
                        <option value='Đang chuẩn bị hàng'>Đang chuẩn bị hàng</option>
                        <option value='Chờ đơn vị vận chuyển'>Chờ đơn vị vận chuyển</option>
                        <option value='Đang giao'>Đang giao</option>
                        <option value='Huỷ'>Huỷ</option>
                        <option value='Trả hàng'>Trả hàng</option>
                        <option value='Thành công'>Thành công</option>
                        <option value='Chờ thanh toán'>Chờ thanh toán</option>
                    </select>
                </div>

                <div className={style.item}>
                    <label>Payment date</label>
                    <input readonly value={bill.paymentDate} onChange={(e) => handleInput('password', e.target.value)}></input>
                </div>

                <div className={style.item}>
                    <label>Payment</label>
                    <input readonly value={bill.payments} onChange={(e) => handleInput('password', e.target.value)}></input>
                </div>

                <div className={style.itemNote}>
                    <label>Note</label>
                    <textarea value={bill.note} onChange={(e) => handleInput('note', e.target.value)}></textarea>
                </div>
            </div>

            <div className={style.flex}>
                <button onClick={handleSubmit}>Lưu lại</button>
                <button onClick={loadAndResetData}>Hủy bỏ</button>
            </div>

            <div>
                <Modal
                    isOpen={isModalMsgOpen}
                    onRequestClose={handleCloseModalMsg}
                    className={style.modalWrapper}
                    overlayClassName={style.modalOverlay}
                >
                    <h2>{message}</h2>

                    <div className={style.btn}>
                        <button onClick={handleCloseModalMsg} className={style.btnSave}>OK</button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default AddNew1