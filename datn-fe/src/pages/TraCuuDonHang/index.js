import clsx from 'clsx'
import style from './index.module.scss'
import axios from "axios";
import { useEffect, useState, useRef } from "react";

// import BillDetails from './BillDetails';
import { format } from 'date-fns';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';


function TraCuuDonHang() {
    Modal.setAppElement('#root');
    const navigate = useNavigate();
    //api
    const role = JSON.parse(localStorage.getItem('role'))
    const token = JSON.parse(localStorage.getItem('token'))


    // page
    const [pageNumber, setPageNumber] = useState(1)

    const setNextPage = (maxPage) => {
        if (pageNumber <= maxPage - 1) {
            setPageNumber(prevState => (prevState + 1));
        }
    }
    const setPrevPage = () => {
        if (pageNumber >= 2) {
            setPageNumber(prevState => prevState - 1);
        }
    }
    // sắp xếp
    const [pageSize, setPageSize] = useState(5)

    // status (lọc)
    const [statusFilter, setStatusFilter] = useState("Chờ xác nhận")

    const changeStatusFilter = (item) => {
        setStatusFilter(item)
        setPageNumber(1)
    }

    const [bills, setBills] = useState({
        "data": [],
        "current_page": 1,
        "total_page": 0,
        "total_item": 0,
        "size": 10
    });

    const getAllBill = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/bill/getAllBill?page=${pageNumber}&pageSize=${pageSize}&status=${statusFilter}`)
            setBills(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllBill();
    }, [pageSize, pageNumber, statusFilter])

    // edit
    const [selectedBill, setSelectedBill] = useState({
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
        paymentDate: null,
        payments: "",
        billCode: "",
        noteCancel: null,
        productInfo: {
            unitPrice: 0,
            amount: 0,
            nameSize: "",
            nameColor: "",
            productName: "",
            nameImage: null,
            promotionalPrice: 0,
            discount: 0
        }
    });

    const [selectedBillDetails, setSelectedBillDetails] = useState({
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
        pay_date: "",
        totalPrice: 0,
        payments: ""
    });

    const [billCustomerInfor, setBillCustomerInfor] = useState({
        idBill: -1,
        customerName: "",
        phone: "",
        address: "",
        email: "",
        note: ""
    });



    const handleEdit = (item) => {
        const getBillDetails = async () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const response = await axios.get(` http://localhost:8080/api/v1/bill/getBillDetails/${item.id}`)
                setSelectedBillDetails(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getBillDetails();
        setSelectedBill(item)
        setBillCustomerInfor({
            idBill: item.id,
            customerName: item.customerName,
            phone: item.phone,
            address: item.address,
            email: item.email,
            note: item.note
        })
        setIsModalUpdateOpen(true)
    }

    // bill details
    const [bill, setBill] = useState(selectedBill);
    const [billDetails, setBillDetails] = useState(selectedBillDetails);
    useEffect(() => {
        setBill(selectedBill)
        setBillDetails(selectedBillDetails)
    }, [selectedBill, selectedBillDetails])

    // bill detail infor customer

    const [messages, setMessages] = useState({
        idBill: -1,
        customerName: -1,
        phone: -1,
        address: -1,
        email: -1,
        note: -1
    });

    const handleInput = (key, value) => {
        setBillCustomerInfor((prev) => ({
            ...prev,
            [key]: value
        }));

        validateInput(key, value)
    };

    const validateInput = (key, value) => {
        const validators = {
            customerName: /^[a-zA-ZÀ-Ỹà-ỹ]+(\s[a-zA-ZÀ-Ỹà-ỹ]+)*$/,
            phone: /^(?:\+?84|0)(?:\d{9}|\d{10})$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            address: /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/
        };

        const validator = validators[key];
        if (validator) {

            if (value === undefined || value === null || value === '') {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    [key]: 2
                }));
                return false;
            }

            const isValid = validator.test(value);
            setMessages((prevMessages) => ({
                ...prevMessages,
                [key]: isValid ? 1 : 0,
            }));
            return isValid;
        }

        return true;
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
            pay_date: "",
            totalPrice: 0,
            payments: ""
        })
    }
    //
    const loadAndResetData = () => {
        getAllBill();
        setInputValue("")
        handleDefaultValue('cancel')
    }

    const handleSubmit = () => {

        let isValid = true;

        for (const key in billCustomerInfor) {
            if (billCustomerInfor.hasOwnProperty(key)) {
                if (!validateInput(key, billCustomerInfor[key])) {
                    isValid = false;
                }
            }
        }

        if (isValid && billCustomerInfor.idBill) {
            const updateBill = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.put(`http://localhost:8080/api/v1/bill/update/${billCustomerInfor.idBill}`, billCustomerInfor);
                    setIsModalUpdateInforOpen(false)
                    loadAndResetData();
                    setIsModalUpdateOpen(false)
                    setMessage("Cập nhật thông tin thành công");
                    setIsModalMsgOpen(true)
                } catch (error) {
                    console.log(error);
                    setMessage(error.response.data.status);
                    setIsModalMsgOpen(true)
                }
            };
            updateBill();

        };
    }

    // modal lý do hủy
    const [isModalOpenCancel, setIsModalOpenCancel] = useState(false);
    const [isInputErrorOpen, setIsInputErrorOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');


    const handleOpenModal = () => {
        setIsModalOpenCancel(true);
    };

    const handleCloseModal = () => {
        setIsModalOpenCancel(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
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
                setIsModalUpdateOpen(false)
                setMessage("Hủy thành công");
                setIsModalMsgOpen(true)
            } catch (error) {
                console.log(error);
                handleCloseModal();
                setMessage(error.response.data.message);
                setIsModalMsgOpen(true)
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

    // modal message
    const [message, setMessage] = useState("")
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);

    const handleCloseModalMsg = () => {
        setIsModalMsgOpen(false);
    };

    const [isModalUpdateInforOpen, setIsModalUpdateInforOpen] = useState(false);

    const handleCloseModalUpdateInfor = () => {
        setIsModalUpdateInforOpen(false);
    };



    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const handleCloseModalUpdate = () => {
        setIsModalUpdateOpen(false);
    };

    //
    let totalPrice = 0;

    // caswst chuỗi adress
    const textAddress = selectedBill.address;
    const parts = textAddress.split("----------");
    const firstPart = parts[0];

    // comment
    const comment = (item) => {
        navigate(item)
    }
    return (
        <div className={style.container}>

            <div className={style.title}>
                <p>Đơn hàng đã mua gần đây</p>
            </div>
            <div className={style.header}>
                <ul>
                    <li onClick={() => changeStatusFilter("Chờ xác nhận")} style={{ borderBottom: statusFilter == "Chờ xác nhận" ? "2px solid #f15e2c" : "" }} >Chờ xác nhận</li>
                    <li onClick={() => changeStatusFilter("Đang chuẩn bị hàng")} style={{ borderBottom: statusFilter == "Đang chuẩn bị hàng" ? "2px solid #f15e2c" : "" }}>Đang chuẩn bị hàng</li>
                    <li onClick={() => changeStatusFilter("Chờ đơn vị vận chuyển")} style={{ borderBottom: statusFilter == "Chờ đơn vị vận chuyển" ? "2px solid #f15e2c" : "" }}>Chờ đơn vị vận chuyển</li>
                    <li onClick={() => changeStatusFilter("Đang giao")} style={{ borderBottom: statusFilter == "Đang giao" ? "2px solid #f15e2c" : "" }}>Đang giao</li>
                    <li onClick={() => changeStatusFilter("Huỷ")} style={{ borderBottom: statusFilter == "Huỷ" ? "2px solid #f15e2c" : "" }}>Huỷ</li>
                    <li onClick={() => changeStatusFilter("Trả hàng")} style={{ borderBottom: statusFilter == "Trả hàng" ? "2px solid #f15e2c" : "" }}>Trả hàng</li>
                    <li onClick={() => changeStatusFilter("Thành công")} style={{ borderBottom: statusFilter == "Thành công" ? "2px solid #f15e2c" : "" }}>Thành công</li>
                    <li onClick={() => changeStatusFilter("Chờ thanh toán")} style={{ borderBottom: statusFilter == "Chờ thanh toán" ? "2px solid #f15e2c" : "" }}>Chờ thanh toán</li>
                </ul>
            </div>
            <hr />

            <div className={style.danhSach}>

                {bills.data.map((item, index) => {
                    let img = "";
                    if (item && item.productInfo && item.productInfo.nameImage) {
                        img = window.location.origin + "/image/" + item.productInfo.nameImage;
                    } else {
                        console.log("mainProduct.images is not available");
                        img = "https://ananas.vn/wp-content/uploads/Pro_AV00174_1.jpeg";
                    }


                    return (
                        <div className={style.item} key={index}>
                            <div className={style.row1}>
                                <p>Đơn hàng: <span>#{item.billCode}</span></p>
                            </div>
                            <div className={style.row2}>
                                <div className={style.col1}>
                                    <img src={img}></img>
                                </div>

                                <div className={style.col2}>
                                    <div >
                                        <p className={style.title}>{item.productInfo.productName}</p>
                                    </div>

                                    <div >
                                        <p className={style.dateBuy}>Ngày đặt:{format(new Date(item.createAt), ' dd-MM-yyyy')}</p>
                                    </div>

                                    <div >
                                        <p className={style.details} onClick={() => handleEdit(item)}>Xem chi tiết</p>
                                    </div>
                                </div>
                                <div className={style.col3}>


                                    <div >
                                        <p className={style.totalPrice}>{item?.totalPayment?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    </div>

                                    <div >
                                        <p className={style.status}>{item?.status}</p>
                                    </div>
                                </div>
                            </div>

                        </div>)
                })}


                {bills.total_page > 0 && <div className={style.page}>
                    <ul>
                        <li><button onClick={setPrevPage}>Previous</button></li>
                        {Array.from({ length: bills.total_page }, (_, index) => (
                            <li key={index}>
                                <button className={clsx({ [style.pageSelected]: index + 1 === pageNumber })} onClick={() => { setPageNumber(index + 1) }}>{index + 1}</button>
                            </li>
                        ))}
                        <li><button onClick={setNextPage}>Next</button></li>
                    </ul>
                </div>
                }

                {
                    bills.total_page == 0 && <div>
                        <p className={style.emptyBill}>Không có hóa đơn nào</p>
                    </div>
                }
            </div>



            <div>
                <Modal
                    isOpen={isModalUpdateOpen}
                    onRequestClose={handleCloseModalUpdate}
                    className={style.modalWrapperUpdate}
                    overlayClassName={style.modalOverlayUpdate}
                >
                    <div className={style.container}>

                        <div className={style.invoiceId}>
                            <p >Đơn hàng<span>: #{selectedBill.billCode}</span></p>
                        </div>

                        <div className={style.item}>
                            <div className={style.title}>
                                <p>SHOE SHOE</p>
                            </div>

                            <div className={style.website}>
                                <p>Shoeshoe.com</p>
                            </div>

                            <div className={style.row2}>
                                <div className={style.col1}>
                                    <p className={style.invoiceTo}>To: <span>{selectedBill.customerName}</span></p>
                                    <p className={style.address}>{firstPart}</p>
                                    <p className={style.email}>{selectedBill.email}</p>
                                    <p className={style.phone}>{selectedBill.phone}</p>
                                </div>

                                <div className={style.col2}>
                                    <p className={style.invoice}><span>Hóa đơn</span></p>
                                    <p className={style.statusBill}>ID: <span>#{selectedBill.billCode}</span></p>
                                    {selectedBill.createAt && <p className={style.statusBill}>Ngày tạo: <span>{format(new Date(selectedBill?.createAt), 'dd/MM/yyyy')}</span></p>}

                                    <p className={style.statusBill}>Trạng thái: <span>{selectedBill.status}</span></p>
                                </div>
                            </div>

                            <div className={style.row3}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Ảnh</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Màu sắc</th>
                                            <th>Size</th>
                                            <th>Số lượng</th>
                                            <th>Giá</th>
                                            <th>Giảm(%)</th>
                                            <th>Thành tiền</th>

                                            {selectedBill.status == "Thành công" && <th>Hành động</th>}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {billDetails?.productInfo?.map((item, index) => {
                                            { totalPrice += item.promotionalPrice * item.amount }
                                            let img = "";
                                            if (item && item.nameImage) {
                                                img = window.location.origin + "/image/" + item.nameImage;
                                            } else {
                                                img = "https://ananas.vn/wp-content/uploads/Pro_AV00174_1.jpeg";
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td><img src={img}></img></td>
                                                    <td>{item.productName}</td>
                                                    <td>{item.nameColor}</td>
                                                    <td>{item.nameSize}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{item.unitPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                    <td>{item.discount}</td>
                                                    <td>{(item.promotionalPrice * item.amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>

                                                    {selectedBill.status == "Thành công" && <td><button onClick={() => comment(`/productDetails/${item.idProduct}/${item.nameColor}`)}>Đánh giá</button></td>}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                            </div>

                            <div className={style.row4}>
                                <div className={style.col1}>
                                    {
                                        selectedBill.status == "Chờ xác nhận" && <p className={style.text} onClick={() => setIsModalUpdateInforOpen(true)}>Cập nhật/chỉnh sửa thông tin</p>
                                    }
                                    {
                                        selectedBill.status == "Chờ thanh toán" && <p className={style.text} onClick={() => setIsModalUpdateInforOpen(true)}>Cập nhật/chỉnh sửa thông tin</p>
                                    }
                                </div>
                                <div className={style.col2}>
                                    <p className={style.title}>Tạm tính <span>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
                                </div>
                            </div>

                            <div className={style.row6}>
                                <div className={style.col1}>
                                </div>
                                <div className={style.col2}>
                                    <p className={style.title}>Phí ship: <span>{(selectedBill?.totalPayment - totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
                                </div>
                            </div>

                            <div className={style.row7}>
                                <div className={style.col1}>
                                </div>
                                <div className={style.col2}>
                                    <p className={style.title}>Tổng tiền: <span>{selectedBill.totalPayment.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
                                </div>
                            </div>

                            <div className={style.row8}>
                                <div className={style.col1}>
                                    <p className={style.title}>Cảm ơn bạn đã mua hàng</p>
                                </div>
                                <div className={style.col2}>
                                    {selectedBill.status == "Chờ xác nhận" && <button className={style.cancelBtn} onClick={handleOpenModal}>Hủy</button>}
                                    {selectedBill.status == "Chờ thanh toán" && <div >
                                        <button onClick={handleContinuePay}>Tiếp tục thanh toán</button>
                                        <button className={style.cancelBtn} style={{ marginLeft: "10px" }} onClick={handleOpenModal}>Hủy</button>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal>
            </div >

            {/* modal update information */}

            < div >
                <Modal
                    isOpen={isModalUpdateInforOpen}
                    onRequestClose={handleCloseModalUpdateInfor}
                    className={style.modalWrapperUpdateInfor}
                    overlayClassName={style.modalOverlayUpdateInfor}
                >
                    <div className={style.container}>
                        <h6 className={style.title}>Cập nhật thông tin</h6>
                        <div className={style.form}>
                            <form>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Tên khách hàng</label>
                                        <input value={billCustomerInfor.customerName} onChange={(e) => handleInput('customerName', e.target.value)}></input>
                                        {messages.customerName === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                        {messages.customerName === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Số điện thoại</label>
                                        <input value={billCustomerInfor.phone} onChange={(e) => handleInput('phone', e.target.value)}></input>
                                        {messages.phone === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                        {messages.phone === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                </div>
                                <div className={style.formGroup}>
                                    <label>Email</label>
                                    <input value={billCustomerInfor.email} onChange={(e) => handleInput('email', e.target.value)}></input>
                                    {messages.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                    {messages.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>
                                <div className={style.formGroup}>
                                    <label>Địa chỉ</label>
                                    <input readOnly value={firstPart} onChange={(e) => handleInput('address', e.target.value)}></input>
                                    {messages.address === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                    {messages.address === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>

                                <div className={style.formGroup}>
                                    <label>Ghi chú</label>
                                    <textarea type="text"
                                        value={billCustomerInfor.note}
                                        onChange={(e) => handleInput('note', e.target.value)}
                                        className={style.input}
                                        placeholder='Ghi chú'
                                    >
                                    </textarea>
                                </div>

                                <button className={style.buttonSubmit} type="button" onClick={handleSubmit}>Lưu lại</button>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div >

            {/* modal cancel */}
            < div >
                <Modal
                    isOpen={isModalOpenCancel}
                    onRequestClose={handleCloseModal}
                    className={style.modalWrapperCancel}
                    overlayClassName={style.modalOverlayCancel}
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
                        <button onClick={handleDeleteBill} className={style.btnSave}>Lưu</button>
                        <button onClick={handleCloseModal} className={style.cancelBtn}>Hủy</button>
                    </div>
                </Modal>
            </div >

            <div>
                <Modal
                    isOpen={isModalMsgOpen}
                    onRequestClose={handleCloseModalMsg}
                    className={style.modalWrapperMsg}
                    overlayClassName={style.modalOverlayMsg}
                >
                    <h2>{message}</h2>

                    <div className={style.btn}>
                        <button onClick={handleCloseModalMsg} className={style.btnSave}>OK</button>
                    </div>
                </Modal>
            </div>

        </div >
    )
}

export default TraCuuDonHang;