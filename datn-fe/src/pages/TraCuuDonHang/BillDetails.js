import { useState, useRef, useEffect } from "react"
import axios from "axios";
import clsx from "clsx"
import style from './index.module.scss'

import Modal from 'react-modal';


function BillDetails({ value }) {

    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    const [bill, setBill] = useState(value.selectedCustomer);
    const [billDetails, setBillDetails] = useState(value.selectedBillDetails);
    useEffect(() => {
        setBill(value.selectedBill)
        setBillDetails(value.selectedBillDetails)
    }, [value.selectedBill, value.selectedBillDetails])

    const handleInput = (key, value) => {
        setBill((prev) => ({
            ...prev,
            [key]: value
        }));

    };


    const handleDefaultValue = (action) => {
        setBill({
            productInfo: [
                {
                    unitPrice: 0,
                    amount: 0,
                    nameSize: "0",
                    nameColor: "",
                    productName: "",
                    nameImage: null
                }
            ],
            pay_date: "2023-07-25",
            totalPrice: 0,
            payments: ""
        })
    }
    //
    const loadAndResetData = () => {
        value.getAllBill();
        value.displayAddnew.current.style.display = "none"
        value.setIsAddNewActive(false)
        handleDefaultValue('cancel')
    }

    const handleSubmit = () => {

        if (bill.id) {
            const updateBill = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.put(`http://localhost:8080/api/v1/director/customer/${bill.id}`, bill);
                    if (response.status == 200) {
                        handleDefaultValue('update')
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            updateBill();

        };
    }

    // modal lý do hủy
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInputErrorOpen, setIsInputErrorOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // modal message
    const [message, setMessage] = useState("")
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);
    const handleOpenModalMsg = () => {
        setIsModalMsgOpen(true);
    };

    const handleCloseModalMsg = () => {
        setIsModalMsgOpen(false);
    };


    // hủy bill
    const handleDeleteBill = () => {
        if (inputValue.trim().length < 1) {
            setIsInputErrorOpen(true)
            return;
        } else {
            setIsInputErrorOpen(false)
        }
        const billID = bill.id;
        const deleteBill = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.delete(`http://localhost:8080/api/v1/bill/delete/${billID}?noteCancel=${inputValue}`);
                loadAndResetData();
                handleCloseModal();
                setMessage("Hủy thành công");
                setIsModalMsgOpen(true)
            } catch (error) {
                console.log(error);
            }
        };
        deleteBill();
    }


    // continue pay
    const handleContinuePay = () => {
        localStorage.setItem("idBillUpdate", JSON.stringify(bill.id))
        const updatePay = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.post(`http://localhost:8080/api/v1/customer/update-pay`, { amount: bill.totalPayment });
                console.log(response.data)
                window.location.href = response.data.url
            } catch (error) {
                console.log(error);
            }
        };
        updatePay();
    }

    return (
        <div className={style.addNew}>
            <div className={style.title}>
                <p>Bill details</p>
            </div>

            <div className={style.row1}>
                <div className={style.col1}>

                </div>

                <div className={style.col2}>
                    <p className={style.title}>SHOE SHOE</p>
                    <p className={style.address}>455 Foggy Heights, AZ 85004, US</p>
                    <p className={style.phone}>(123) 456-789</p>
                    <p className={style.email}>company@example.com</p>
                </div>
            </div>

            <hr></hr>

            <div className={style.row2}>
                <div className={style.col1}>
                    <p className={style.invoiceTo}>INVOICE TO:</p>
                    <p className={style.customerName}>{bill && bill.customerName}</p>
                    <p className={style.address}>{bill && bill.address}</p>
                    <p className={style.email}>{bill && bill.email}</p>
                </div>

                <div className={style.col2}>
                    <p className={style.title}>INVOICE: {bill?.billCode?.substring(0, 4)}</p>
                    <p className={style.statusBill}>Status: {bill && bill.status} </p>
                    <p className={style.btnCancelBill}>  {bill && bill.status == "Chờ xác nhận" ? <button onClick={handleOpenModal}>Hủy</button> : ""}</p>
                    <p className={style.updateAt}> {bill && bill.status == "Chờ thanh toán" ? <button onClick={handleContinuePay}>Thanh toán</button> : ""}</p>
                </div>
            </div>

            <div className={style.row3}>

                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Amount</th>
                            <th>Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {billDetails?.productInfo?.map((item, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>  <img src='https://ananas.vn/wp-content/uploads/Pro_AV00153_1.jpg'></img></td>
                                <td>{item.productName}</td>
                                <td>{item.nameColor}</td>
                                <td>{item.nameSize}</td>
                                <td>{item.amount}</td>
                                <td>{item.unitPrice}</td>
                            </tr>
                        })}


                    </tbody>
                </table>

            </div>

            <div className={style.row6}>
                <div className={style.col1}>
                    <p className={style.title}>Thank you!</p>
                </div>
                <div className={style.col2}>
                    <p className={style.title}>GRAND TOTAL</p>
                    <p className={style.total}>{billDetails.totalPrice}</p>
                </div>
            </div>

            <div className={style.row7}>
                <div className={style.col1}></div>
                <div className={style.col2}>
                    <p className={style.text}>NOTICE:</p>
                    <p className={style.text}>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
                </div>
            </div>

            <div className={style.row8}>
                <p className={style.text}>Invoice was created on a computer and is valid without the signature and seal.</p>
            </div>

            <div>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    className={style.modalWrapper}
                    overlayClassName={style.modalOverlay}
                >
                    <h2>Nhập lý do bạn muốn hủy đơn hàng</h2>
                    {isInputErrorOpen && <p style={{ color: 'red' }}>Vui lòng nhập lý do hủy đơn hàng</p>}
                    <textarea type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className={style.input}
                        placeholder='Nhập lý do bạn muốn hủy đơn hàng'
                    >
                    </textarea>
                    <div className={style.btn}>
                        <button onClick={handleDeleteBill} className={style.btnSave}>Save</button>
                        <button onClick={handleCloseModal} className={style.btnCancel}>Cancel</button>
                    </div>
                </Modal>
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

export default BillDetails