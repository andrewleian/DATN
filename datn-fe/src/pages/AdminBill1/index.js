import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import clsx from "clsx"
import style from './AdminCustomer.module.scss'
import AddNew from './AddNew'
import ImportExcel from './ImportExcel'
import axios from 'axios'
import { format } from 'date-fns';

import Modal from 'react-modal';
function AdminBill1() {
    //api
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    const [sort, setSort] = useState({ keyword: "", status: "Chờ xác nhận", orderBy: "id", orderDirection: "DESC", page: 1, pageSize: 10 })

    const setKeyword = (item) => {
        setSort(prevState => ({ ...prevState, keyword: item }));
    }

    const setStatus = (item) => {
        setSort(prevState => ({ ...prevState, status: item }));
    }

    const setOrderBy = (item) => {
        if (sort.orderDirection == "DESC") {
            setSort(prevState => ({ ...prevState, orderBy: item, orderDirection: "ASC" }));
        } else {
            setSort(prevState => ({ ...prevState, orderBy: item, orderDirection: "DESC" }));
        }
    }

    // page
    const [selectedPage, setSelectedPage] = useState(1);
    const setPage = (item) => {
        setSelectedPage(item);
        setSort(prevState => ({ ...prevState, page: item }));
    }

    const setNextPage = (maxPage) => {
        if (selectedPage <= maxPage - 1) {
            setSelectedPage(prevState => (prevState + 1));
            setSort(prevState => ({ ...prevState, page: prevState.page + 1 }));
        }
    }
    const setPrevPage = () => {
        if (selectedPage >= 2) {
            setSelectedPage(prevState => prevState - 1);
            setSort(prevState => ({ ...prevState, page: prevState.page - 1 }));
        }
    }
    //

    const setPageSize = (item) => {
        setSort(prevState => ({ ...prevState, pageSize: item }));
    }



    // sắp xếp
    // const [pageSize, setPageSize] = useState(10)
    // const [pageNumber, setPageNumber] = useState(1)
    const [bills, setBills] = useState({
        data: [],
        current_page: 1,
        total_page: 0,
        total_item: 0,
        size: 10
    });

    const getBills = async () => {
        console.log(sort.status)
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://localhost:8080/api/v1/staff/bill/getAllBill?keyword=${sort.keyword}&status=${sort.status}&&orderBy=${sort.orderBy}&orderDirection=${sort.orderDirection}&page=${sort.page}&pageSize=${sort.pageSize}`)
            setBills(response.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBills();
    }, [sort])

    //
    const [isAddNewActive, setIsAddNewActive] = useState(false)
    const [isImportExcelActive, setIsImportExcelActive] = useState(false)
    const displayAddnew = useRef();
    const displayImportExcel = useRef();

    useEffect(() => {
        if (isImportExcelActive) {
            displayImportExcel.current.style.display = 'block'
        }
        if (isAddNewActive) {
            displayAddnew.current.style.display = 'block'
        }
    }, [isAddNewActive, isImportExcelActive])


    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.keyCode === 27) {
                displayAddnew.current.style.display = 'none';
                displayImportExcel.current.style.display = 'none';
                setIsAddNewActive(false)
                setIsImportExcelActive(false)
                getBills(); // cap nhat lai danh sach
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


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
        paymentDate: "",
        payments: ""
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

    const handleEdit = (item) => {
        const getBillDetails = async () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const response = await axios.get(` http://localhost:8080/api/v1/bill/getBillDetails/${item.id}`)
                setSelectedBillDetails(response.data.data)
                console.log(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        // getBillDetails();
        setSelectedBill(item);
        setIsModalUpdateOpen(true)
    }

    // chi tiết sp của hóa đơn
    const productsOfBill = (item) => {
        const getBillDetails = async () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const response = await axios.get(` http://localhost:8080/api/v1/bill/getBillDetails/${item.id}`)
                setSelectedBillDetails(response.data.data)
                console.log(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getBillDetails();
        setSelectedBill(item);
        setIsModalProductsOfBillOpen(true)
    }

    //delete
    // const handleDelete = (item) => {
    //     const deleteCustomer = async () => {
    //         try {
    //             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //             const response = await axios.delete(`http://localhost:8080/api/v1/director/customer/${item.id}`);
    //             console.log(response.data);
    //             if (response.data.message === 'Delete Customer successfully') {
    //                 getBills();
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     deleteCustomer();
    // }

    // update bill
    const [bill, setBill] = useState({ ...selectedBill });

    useEffect(() => {
        setBill({ ...selectedBill })
    }, [selectedBill])

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


    const [messages, setMessages] = useState({
        idBill: -1,
        customerName: -1,
        phone: -1,
        address: -1,
        email: -1,
        note: -1
    });

    const validateInput = (key, value) => {
        const validators = {
            customerName: /^[a-zA-ZÀ-Ỹà-ỹ]+(\s[a-zA-ZÀ-Ỹà-ỹ]+)*$/,
            phone: /^(?:\+?84|0)(?:\d{9}|\d{10})$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            // address: /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/
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

    const handleSubmit = () => {
        console.log("đã chạy vào đây")

        let isValid = true;

        for (const key in bill) {
            if (bill.hasOwnProperty(key)) {
                if (!validateInput(key, bill[key])) {
                    isValid = false;
                }
            }
        }

        if ((bill.status == "Huy" || bill.status == "Trả hàng") && inputValue.trim().length < 1) {
            setIsInputErrorOpen(true)
            return;
        } else {
            setIsInputErrorOpen(false)
        }

        if (isValid) {

            let billDataUpdate = {
                idBill: bill.id,
                customerName: bill.customerName,
                phone: bill.phone,
                email: bill.email,
                address: bill.address,
                note: bill.note,
                status: bill.status,
                noteCancel: inputValue
            }

            // const updateBillStatus = async () => {
            //     try {
            //         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            //         const response = await axios.put(`http://localhost:8080/api/v1/staff/bill/${bill.id}?status=${bill.status}`);
            //         if (response.status == 200) {
            //             setMessage("Cập nhật thành công")
            //             setIsModalMsgOpen(true)
            //             setIsModalUpdateOpen(false);
            //             loadAndResetData();
            //         }
            //     } catch (error) {
            //         console.log(error);
            //     }
            // };


            const updateBillInfor = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.put(`http://localhost:8080/api/v1/staff/bill/updatebill`, billDataUpdate);
                    if (response.status == 200) {
                        setIsModalOpenCancel(false);
                        setMessage("Cập nhật thành công")
                        setIsModalMsgOpen(true)
                        setIsModalUpdateOpen(false);
                        loadAndResetData();
                        setInputValue("");
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            updateBillInfor();
            // updateBillStatus();

        }

    }




    //
    const loadAndResetData = () => {
        getBills();
        handleDefaultValue('cancel')
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

    // modal message
    const [message, setMessage] = useState("")
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);

    const handleCloseModalMsg = () => {
        setIsModalAddNewMsgOpen(false)
        setIsModalMsgOpen(false);
    };

    const [isModalAddNewOpen, setIsModalAddNewMsgOpen] = useState(false);

    const handleCloseModalAddNew = () => {
        setIsModalAddNewMsgOpen(false);
    };

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const handleCloseModalUpdate = () => {
        setIsModalUpdateOpen(false);
        loadAndResetData();
    };

    const [isModalProductsOfBillOpen, setIsModalProductsOfBillOpen] = useState(false);

    const handleCloseModalProductsOfBill = () => {
        setIsModalProductsOfBillOpen(false);
        loadAndResetData();
    };

    let totalPrice = 0;

    // address
    const cutAddress = (item) => {
        const textAddress = item;
        const parts = textAddress.split("----------");
        const firstPart = parts[0];
        return firstPart
    }

    return (
        <div className={style.container}>

            <div className={style.header}>
                <ul>
                    <li><button className={sort.status == "Chờ xác nhận" ? style.statusSelected : ""} onClick={() => setStatus("Chờ xác nhận")}>Chờ xác nhận</button></li>
                    <li><button className={sort.status == "Đang chuẩn bị hàng" ? style.statusSelected : ""} onClick={() => setStatus("Đang chuẩn bị hàng")}>Đang chuẩn bị hàng</button></li>
                    <li><button className={sort.status == "Chờ đơn vị vận chuyển" ? style.statusSelected : ""} onClick={() => setStatus("Chờ đơn vị vận chuyển")}>Chờ đơn vị vận chuyển</button></li>
                    <li><button className={sort.status == "Đang giao" ? style.statusSelected : ""} onClick={() => setStatus("Đang giao")}>Đang giao</button></li>
                    <li><button className={sort.status == "Huy" ? style.statusSelected : ""} onClick={() => setStatus("Huy")}>Hủy</button></li>
                    <li><button className={sort.status == "Trả hàng" ? style.statusSelected : ""} onClick={() => setStatus("Trả hàng")}>Trả hàng</button></li>
                    <li><button className={sort.status == "Thành công" ? style.statusSelected : ""} onClick={() => setStatus("Thành công")}>Thành công</button></li>
                    {/* <li><button onClick={() => setStatus("Chờ thanh toán")}>Chờ thanh toán</button></li> */}
                </ul>
            </div>
            <hr />

            <div className={style.danhSach}>

                <div className={style.rowSpaceBettween}>
                    <div className={style.col1}>
                        <label> Hiện </label>
                        <select value={sort.pageSize} onChange={(e) => setPageSize(e.target.value)}>
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            <option>40</option>
                            <option>50</option>
                        </select>
                        <label> danh mục </label>
                    </div>

                    <div className={style.col2}>
                        <label> Tìm kiếm: </label>
                        <input value={sort.keyword} placeholder='Tìm kiếm' onChange={(e) => setKeyword(e.target.value)}></input>
                    </div>
                </div>

                <div className={style.table}>
                    <table>
                        <thead>

                            <tr>
                                <th>STT</th>
                                <th>Tên khách hàng</th>
                                <th>SĐT</th>
                                <th >Email</th>
                                <th >Địa chỉ</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                {sort.status == "Huy" && <th>Ngày hủy hóa đơn</th>}
                                {sort.status == "Trả hàng" && <th>Ngày trả hàng</th>}
                                {sort.status != "Huy" && sort.status != "Trả hàng" && <th>Ngày thanh toán</th>}
                                <th>Thanh toán</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bills?.data?.map((item, index) => {

                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.customerName}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{cutAddress(item.address)}</td>
                                    <td>{item.totalPayment?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td>{item.status}</td>
                                    <td>  {item.paymentDate && format(new Date(item.paymentDate), 'dd/MM/yyyy')}</td>

                                    <td>{item.payments}</td>
                                    <td>
                                        <button onClick={() => { handleEdit(item) }}><i className="fa-regular fa-pen-to-square"></i></button>
                                        <button onClick={() => { productsOfBill(item) }}>Chi tiết</button>
                                        {/* <button onClick={() => { handleDelete(item) }}><i className="fa-solid fa-trash"></i></button> */}
                                    </td>
                                </tr>
                            })}


                        </tbody>
                    </table>
                </div>

                <div className={style.page}>
                    <ul>
                        <li><button onClick={setPrevPage}>Previous</button></li>

                        {Array.from({ length: bills.total_page }, (_, index) => (
                            <li key={index}>
                                <button className={clsx({ [style.pageSelected]: index + 1 === selectedPage })} onClick={() => setPage(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                        <li><button onClick={() => setNextPage(bills.total_page)}>Next</button></li>
                    </ul>
                </div>
            </div>


            {/* update */}

            <div>
                <Modal
                    isOpen={isModalUpdateOpen}
                    onRequestClose={handleCloseModalUpdate}
                    className={style.modalWrapperUpdate}
                    overlayClassName={style.modalOverlayUpdate}
                >
                    <div className={style.container}>
                        <h6 className={style.title}>Cập nhật hóa đơn</h6>
                        <div className={style.form}>
                            <form>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Tên khách hàng</label>
                                        <input value={bill.customerName} onChange={(e) => handleInput("customerName", e.target.value)}></input>
                                        {messages.customerName === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                        {messages.customerName === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Số điện thoại</label>
                                        <input value={bill.phone} onChange={(e) => handleInput("phone", e.target.value)}></input>
                                        {messages.phone === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                        {messages.phone === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                </div>

                                <div className={style.formGroup}>
                                    <label>Email</label>
                                    <input type='email' value={bill.email} onChange={(e) => handleInput("email", e.target.value)}></input>
                                    {messages.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                    {messages.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>
                                <div className={style.formGroup}>
                                    <label>Địa chỉ</label>
                                    <input readonly value={cutAddress(bill.address)}></input>
                                    {messages.address === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                    {messages.address === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Tổng tiền</label>
                                        <input readonly value={bill.totalPayment} ></input>
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Tạo lúc</label>
                                        <input readonly value={bill.createAt} ></input>
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Sửa lúc</label>
                                        <input readonly value={bill.updateAt} ></input>
                                    </div>
                                </div>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Trạng thái</label>
                                        <select value={bill.status} onChange={(e) => handleInput('status', e.target.value)}>
                                            <option hidden></option>
                                            <option value='Chờ xác nhận'>Chờ xác nhận</option>
                                            <option value='Đang chuẩn bị hàng'>Đang chuẩn bị hàng</option>
                                            <option value='Chờ đơn vị vận chuyển'>Chờ đơn vị vận chuyển</option>
                                            <option value='Đang giao'>Đang giao</option>
                                            <option value='Huy'>Hủy</option>
                                            <option value='Trả hàng'>Trả hàng</option>
                                            <option value='Thành công'>Thành công</option>
                                            <option value='Chờ thanh toán'>Chờ thanh toán</option>
                                        </select>
                                    </div>

                                    <div className={style.formGroup}>
                                        {bill.status == "Huy" && <label>Ngày hủy hóa đơn</label>}
                                        {bill.status == "Trả hàng" && <label>Ngày trả hàng</label>}
                                        {bill.status != "Huy" && bill.status != "Trả hàng" && <label>Ngày thanh toán</label>}
                                        <input readonly value={bill.paymentDate} onChange={(e) => handleInput('password', e.target.value)}></input>
                                    </div>
                                </div>

                                <div className={style.formGroup}>
                                    <label>Thanh  toán</label>
                                    <input readonly value={bill.payments} onChange={(e) => handleInput('password', e.target.value)}></input>
                                </div>

                                <div className={style.formGroup}>
                                    <label>Ghi chú</label>
                                    <input value={bill.note} onChange={(e) => handleInput('note', e.target.value)}></input>
                                </div>


                                {(bill.status == "Huy" || bill.status == "Trả hàng") && <button className={style.buttonSubmit} type="button" onClick={handleOpenModal}>Lưu lại</button>}
                                {bill.status != "Huy" && bill.status != "Trả hàng" && <button className={style.buttonSubmit} type="button" onClick={handleSubmit}>Lưu lại</button>}

                            </form>
                        </div>
                    </div>
                </Modal >
            </div >

            {/* product of bill */}
            < div >
                <Modal
                    isOpen={isModalProductsOfBillOpen}
                    onRequestClose={handleCloseModalProductsOfBill}
                    className={style.modalWrapperProductsOfBill}
                    overlayClassName={style.modalOverlayProductsOfBill}
                >
                    <div className={style.container}>

                        <div className={style.invoiceId}>
                            <p >Đơn hàng<span>: #{selectedBill.billCode}</span></p>
                        </div>

                        <div className={style.item}>

                            <div className={style.row2}>
                                <div className={style.col1}>
                                    <p className={style.invoiceTo}>To: <span>{selectedBill.customerName}</span></p>
                                    <p className={style.address}>{cutAddress(selectedBill.address)}</p>
                                    <p className={style.email}>{selectedBill.email}</p>
                                    <p className={style.phone}>{selectedBill.phone}</p>
                                </div>

                                <div className={style.col2}>
                                    <p className={style.invoice}><span>Hóa đơn</span></p>
                                    <p className={style.statusBill}>ID: <span>#{selectedBill.billCode}</span></p>
                                    {selectedBill.createAt && <p className={style.statusBill}>Ngày tạo: <span>{format(new Date(selectedBill?.createAt), 'dd/MM/yyyy')}</span></p>}

                                    <p className={style.statusBill}>Status: <span>{selectedBill.status}</span></p>
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
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {selectedBillDetails?.productInfo?.map((item, index) => {
                                            { console.log(item) }
                                            let img = "";
                                            if (item.nameImage) {
                                                img = window.location.origin + "/image/" + item.nameImage;
                                            } else {
                                                console.log("mainProduct.images is not available");
                                                img = "https://ananas.vn/wp-content/uploads/Pro_AV00174_1.jpeg";
                                            }
                                            { totalPrice += item.promotionalPrice * item.amount }
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
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                            </div>

                            <div className={style.row4}>
                                <div className={style.col1}>
                                    {/* {
                                        selectedBill.status == "Chờ xác nhận" && <p className={style.text} onClick={() => setIsModalUpdateInforOpen(true)}>Cập nhật/chỉnh sửa thông tin</p>
                                    }
                                    {
                                        selectedBill.status == "Chờ thanh toán" && <p className={style.text} onClick={() => setIsModalUpdateInforOpen(true)}>Cập nhật/chỉnh sửa thông tin</p>
                                    } */}
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
                    {bill.status == "Trả hàng" && <h2>Nhập lý do bạn muốn trả hàng</h2>}
                    {bill.status == "Huy" && <h2>Nhập lý do bạn muốn hủy đơn hàng</h2>}
                    {isInputErrorOpen && <p style={{ color: 'red' }}>Vui lòng nhập lý do hủy đơn hàng</p>}
                    <textarea type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className={style.input}
                        placeholder='Nhập lý do bạn muốn hủy đơn hàng'
                    >
                    </textarea>
                    <div className={style.btn}>
                        <button onClick={handleSubmit} className={style.btnSave}>Lưu</button>
                        <button onClick={handleCloseModal} className={style.cancelBtn}>Hủy</button>
                    </div>
                </Modal>
            </div >

            {/* message */}
            < div >
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
            </div >
        </div >
    )
}

export default AdminBill1