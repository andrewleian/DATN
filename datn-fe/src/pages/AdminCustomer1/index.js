import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import clsx from "clsx"
import style from './AdminCustomer.module.scss'
import AddNew from './AddNew'
import ImportExcel from './ImportExcel'
import axios from 'axios'

import Modal from 'react-modal';
function AdminCustomer1() {
    Modal.setAppElement('#root');
    //api
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    const [sort, setSort] = useState({ keyword: "", status: "enable", orderBy: "id", orderDirection: "DESC", page: 1, pageSize: 10 })

    const setKeyword = (item) => {
        setSort(prevState => ({ ...prevState, keyword: item, page: 1 }));
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
    const setPage = (item) => {
        setSort(prevState => ({ ...prevState, page: item }));
    }

    const setNextPage = (maxPage) => {
        if (sort.page <= maxPage - 1) {
            setSort(prevState => ({ ...prevState, page: prevState.page + 1 }));
        }
    }

    const setPrevPage = () => {
        if (sort.page >= 2) {
            setSort(prevState => ({ ...prevState, page: prevState.page - 1 }));
        }
    }
    //

    const setPageSize = (item) => {
        setSort(prevState => ({ ...prevState, pageSize: item, page: 1 }));
    }



    // sắp xếp
    // const [pageSize, setPageSize] = useState(10)
    // const [pageNumber, setPageNumber] = useState(1)
    const [customers, setCustomers] = useState({
        "data": [],
        "current_page": 1,
        "total_page": 0,
        "total_item": 0,
        "size": 10
    });
    // const getStaffs = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/api/v1/director/staff`)
    //         setStaffs(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const getCustomers = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://localhost:8080/api/v1/director/customer/lstCustomers?keyword=${sort.keyword}&status=${sort.status}&orderBy=${sort.orderBy}&orderDirection=${sort.orderDirection}&page=${sort.page}&pageSize=${sort.pageSize}`)
            setCustomers(response.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCustomers();
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
                getCustomers(); // cap nhat lai danh sach
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    // edit
    const [selectedCustomer, setSelectedCustomer] = useState({
        id: null,
        customerName: '',
        phone: '',
        email: '',
        birthday: '',
        gender: '',
        username: '',
        password: '',
        createAt: null,
        updateAt: null,
        status: ''
    });

    const handleEdit = (item) => {
        setSelectedCustomer(item);
        setIsModalUpdateOpen(true)
    }

    //delete
    const [itemDelete, setItemDelete] = useState(null);

    const confirmDelete = (item) => {
        setItemDelete(item)
        setMessage("Bạn chắc chứ?")
        setIsModalMsgOpen(true)
    }

    const acceptedToDelete = () => {
        handleDelete(itemDelete)
    }

    const handleDelete = (item) => {
        const deleteCustomer = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.delete(`http://localhost:8080/api/v1/director/customer/${item.id}`);
                setMessage("Xoá thành công")
                setIsModalMsgOpen(true)
                getCustomers();

            } catch (error) {
                console.log(error);
            }
        };
        deleteCustomer();
    }


    /// addnew

    const [customer, setCustomer] = useState({ ...selectedCustomer });
    const [messages, setMessages] = useState({
        customerName: -1,
        phone: -1,
        email: -1,
        birthday: -1,
        gender: -1,
        username: -1,
        password: -1,
        status: -1,
    });

    useEffect(() => {
        setCustomer({ ...selectedCustomer })
    }, [selectedCustomer])

    const handleInput = (key, value) => {
        setCustomer((prev) => ({
            ...prev,
            [key]: value
        }));

        validateInput(key, value)
    };

    const today = new Date();
    const isFutureDate = (selectedDate) => {
        const selectedDateTime = new Date(selectedDate).getTime();
        const todayTime = today.getTime();
        return selectedDateTime > todayTime;
    };

    const validateInput = (key, value) => {
        const validators = {
            customerName: /^[a-zA-ZÀ-Ỹà-ỹ]+(\s[a-zA-ZÀ-Ỹà-ỹ]+)*$/,
            phone: /^(?:\+?84|0)(?:\d{9}|\d{10})$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            birthday: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            username: /^[a-zA-Z0-9_-]{3,16}$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            gender: /.*/,
            status: /.*/
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

            if (key == "birthday") {
                if (isFutureDate(value)) {
                    setMessages((prevMessages) => ({
                        ...prevMessages,
                        [key]: 0,
                    }));
                    return false
                } else {
                    setMessages((prevMessages) => ({
                        ...prevMessages,
                        [key]: 1,
                    }));
                    return true
                }
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
        console.log("Đã")
        setCustomer({
            id: null,
            customerName: '',
            phone: '',
            email: '',
            birthday: '',
            gender: '',
            username: '',
            password: '',
            createAt: null,
            updateAt: null,
            status: ''
        })

        setMessages({
            customerName: -1,
            phone: -1,
            email: -1,
            birthday: -1,
            gender: -1,
            username: -1,
            password: -1,
            status: -1
        })
    }


    const handleSubmit = () => {
        let isValid = true;

        for (const key in customer) {
            if (customer.hasOwnProperty(key)) {
                if (customer.id && key === 'password') {
                    continue;
                }
                if (!validateInput(key, customer[key])) {
                    isValid = false;
                }
            }
        }

        // if (!isValid) {
        //     setIsModalAddNewMsgOpen(true)
        // }
        console.log(isModalAddNewOpen)

        if (isValid) {
            if (customer.id) {
                const updateCustomer = async () => {

                    try {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        const response = await axios.put(`http://localhost:8080/api/v1/director/customer/${customer.id}`, customer);
                        setMessage("Cập nhật thành công")
                        setIsModalMsgOpen(true)
                        setIsModalUpdateOpen(false);
                        loadAndResetData();
                    } catch (error) {

                        console.log(error);
                    }
                };
                updateCustomer();
            } else {
                const addStaff = async () => {
                    try {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        const response = await axios.post(`http://localhost:8080/api/v1/director/customer/addCustomer`, customer);
                        setSort(prevState => ({ ...prevState, page: 1 }));
                        setMessage("Thêm thành công")
                        setIsModalMsgOpen(true)
                        loadAndResetData();

                    } catch (error) {
                        setMessage(error.response.data.message)
                        setIsModalMsgOpen(true)
                        console.log(error);
                    }
                };
                addStaff();
            }
        }
    };

    //
    const loadAndResetData = () => {
        getCustomers();
        handleDefaultValue('cancel')
    }

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

    //

    return (
        <div className={style.container}>

            <div className={style.header}>
                <ul>
                    <li><button onClick={() => setIsModalAddNewMsgOpen(true)}>Tạo mới khách hàng</button></li>
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
                                {/* <th><input type='checkbox'></input></th> */}
                                <th>STT</th>
                                <th onClick={() => setOrderBy("customerName")}>Họ và tên</th>
                                {/* <th>Địa chỉ</th> */}
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th onClick={() => setOrderBy("phone")}>SĐT</th>
                                <th onClick={() => setOrderBy("email")}>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {customers.data.map((item, index) => {
                                return <tr key={index}>
                                    {/* <td><input type='checkbox'></input></td> */}
                                    <td>{index + 1 + ((sort.page - 1) * sort.pageSize)}</td>
                                    <td>{item.customerName}</td>
                                    {/* <td>BE chưa trả địa chỉ</td> */}
                                    <td>{item.birthday}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button onClick={() => { handleEdit(item) }}><i className="fa-regular fa-pen-to-square"></i></button>
                                        <button onClick={() => { confirmDelete(item) }}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            })}


                        </tbody>
                    </table>
                </div>

                <div className={style.page}>
                    <ul>
                        <li><button onClick={setPrevPage}>Previous</button></li>

                        {Array.from({ length: customers.total_page }, (_, index) => (
                            <li key={index}>
                                <button className={clsx({ [style.pageSelected]: index + 1 === sort.page })} onClick={() => setPage(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                        <li><button onClick={() => setNextPage(customers.total_page)}>Next</button></li>
                    </ul>
                </div>
            </div>


            {/* add new */}
            <div>
                <Modal
                    isOpen={isModalAddNewOpen}
                    onRequestClose={handleCloseModalAddNew}
                    className={style.modalWrapper}
                    overlayClassName={style.modalOverlay}
                >
                    <div className={style.container}>
                        <h6 className={style.title}>Tạo mới khách hàng</h6>
                        <div className={style.form}>
                            <form>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Username</label>
                                        <input value={customer.username} onChange={(e) => handleInput('username', e.target.value)}></input>
                                        {messages.username === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                        {messages.username === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                        {messages.username === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Password</label>
                                        <input type='password' value={customer.password} onChange={(e) => handleInput('password', e.target.value)}></input>
                                        {messages.password === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                        {messages.password === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                        {messages.password === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                </div>
                                <div className={style.formGroup}>
                                    <label>Họ và tên</label>
                                    <input value={customer.customerName} onChange={(e) => handleInput('customerName', e.target.value)}></input>
                                    {messages.customerName === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                    {messages.customerName === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                    {messages.customerName === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>
                                <div className={style.formGroup}>
                                    <label>Email</label>
                                    <input type='email' value={customer.email} onChange={(e) => handleInput('email', e.target.value)}></input>
                                    {messages.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                    {messages.email === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                    {messages.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>SĐT</label>
                                        <input value={customer.phone} onChange={(e) => handleInput('phone', e.target.value)}></input>
                                        {messages.phone === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                        {messages.phone === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                        {messages.phone === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Giới Tính</label>
                                        <select value={customer.gender} onChange={(e) => handleInput('gender', e.target.value)}>
                                            <option value="" hidden></option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                        {messages.gender === 2 && <label className={style.errorMessage}>Vui lòng chọn giới tính</label>}
                                        {messages.gender === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                        {messages.gender === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Status</label>
                                        <select value={customer.status} onChange={(e) => handleInput('status', e.target.value)}>
                                            <option hidden></option>
                                            <option value='enable'>Active</option>
                                            <option value='disable'>Inactive</option>
                                        </select>
                                        {messages.status === 2 && <label className={style.errorMessage}>Vui lòng chọn status</label>}
                                        {messages.status === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                        {messages.status === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                </div>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Ngày sinh</label>
                                        <input type="date" value={customer.birthday} onChange={(e) => handleInput('birthday', e.target.value)}></input>
                                        {messages.birthday === 2 && <label className={style.errorMessage}>Vui lòng chọn ngày sinh</label>}
                                        {messages.birthday === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                        {messages.birthday === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                </div>
                                <button className={style.buttonSubmit} type="button" onClick={handleSubmit}>Lưu lại</button>
                            </form>
                        </div>
                    </div>

                </Modal>
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
                        <h6 className={style.title}>Cập nhật khách hàng</h6>
                        <div className={style.form}>
                            <form>
                                {/* <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Username</label>
                                        <input value={customer.username} onChange={(e) => handleInput('username', e.target.value)}></input>
                                        {messages.username === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                        {messages.username === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                        {messages.username === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Password</label>
                                        <input type='password' value={customer.password} onChange={(e) => handleInput('password', e.target.value)}></input>
                                        {messages.password === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                        {messages.password === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                        {messages.password === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                </div> */}
                                <div className={style.formGroup}>
                                    <label>Username</label>
                                    <input value={customer.username} onChange={(e) => handleInput('username', e.target.value)}></input>
                                    {messages.username === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                    {messages.username === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                    {messages.username === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>

                                <div className={style.formGroup}>
                                    <label>Họ và tên</label>
                                    <input value={customer.customerName} onChange={(e) => handleInput('customerName', e.target.value)}></input>
                                    {messages.customerName === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                    {messages.customerName === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                    {messages.customerName === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>
                                <div className={style.formGroup}>
                                    <label>Email</label>
                                    <input type='email' value={customer.email} onChange={(e) => handleInput('email', e.target.value)}></input>
                                    {messages.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                    {messages.email === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                    {messages.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>SĐT</label>
                                        <input value={customer.phone} onChange={(e) => handleInput('phone', e.target.value)}></input>
                                        {messages.phone === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                                        {messages.phone === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                        {messages.phone === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Giới Tính</label>
                                        <select value={customer.gender} onChange={(e) => handleInput('gender', e.target.value)}>
                                            <option value="" hidden></option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                        {messages.gender === 2 && <label className={style.errorMessage}>Vui lòng chọn giới tính</label>}
                                        {messages.gender === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                        {messages.gender === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Status</label>
                                        <select value={customer.status} onChange={(e) => handleInput('status', e.target.value)}>
                                            <option hidden></option>
                                            <option value='enable'>Active</option>
                                            <option value='disable'>Inactive</option>
                                        </select>
                                        {messages.status === 2 && <label className={style.errorMessage}>Vui lòng chọn status</label>}
                                        {messages.status === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                        {messages.status === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                </div>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Ngày sinh</label>
                                        <input type="date" value={customer.birthday} onChange={(e) => handleInput('birthday', e.target.value)}></input>
                                        {messages.birthday === 2 && <label className={style.errorMessage}>Vui lòng chọn ngày sinh</label>}
                                        {messages.birthday === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                                        {messages.birthday === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                </div>
                                <button className={style.buttonSubmit} type="button" onClick={handleSubmit}>Lưu lại</button>
                            </form>
                        </div>
                    </div>


                </Modal>
            </div>

            <div>
                <Modal
                    isOpen={isModalMsgOpen}
                    onRequestClose={handleCloseModalMsg}
                    className={style.modalWrapperMsg}
                    overlayClassName={style.modalOverlayMsg}
                >
                    <h2>{message}</h2>

                    {message != "Bạn chắc chứ?" && <div className={style.btn}>
                        <button onClick={handleCloseModalMsg} className={style.btnSave}>OK</button>
                    </div>}
                    {message == "Bạn chắc chứ?" && <div className={style.btn}>
                        <button onClick={acceptedToDelete} className={style.btnSave}>Chắc chắn</button>
                        <button onClick={handleCloseModalMsg} className={style.btnSave}>Hủy</button>
                    </div>}
                </Modal>
            </div>
        </div>
    )
}

export default AdminCustomer1