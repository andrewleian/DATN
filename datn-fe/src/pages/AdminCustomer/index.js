import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import clsx from "clsx"
import style from './AdminCustomer.module.scss'
import AddNew from './AddNew'
import ImportExcel from './ImportExcel'
import axios from 'axios'

import Modal from 'react-modal';
function AdminCustomer() {
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
        setIsAddNewActive(true)
    }

    //delete
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

    // modal message
    const [message, setMessage] = useState("")
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);

    const handleCloseModalMsg = () => {
        setIsModalMsgOpen(false);
    };

    //

    return (
        <div className={style.container}>
            <div className={style.header}>
                <ul>
                    <li><button onClick={() => setIsAddNewActive(true)}>Tạo mới khách hàng</button></li>
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
                                        <button onClick={() => { handleDelete(item) }}><i className="fa-solid fa-trash"></i></button>
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


            <div ref={displayAddnew} className={style.displayAddnew}>
                <AddNew value={{ getCustomers: getCustomers, displayAddnew: displayAddnew, setIsAddNewActive: setIsAddNewActive, selectedCustomer: selectedCustomer, setSort: setSort, setMessage: setMessage, setIsModalMsgOpen: setIsModalMsgOpen }}></AddNew>
            </div>

            <div ref={displayImportExcel} className={style.displayImportExcel}>
                <ImportExcel></ImportExcel>
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

export default AdminCustomer