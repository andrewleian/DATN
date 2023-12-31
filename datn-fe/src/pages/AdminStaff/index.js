import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import clsx from "clsx"
import style from './AdminStaff.module.scss'
import AddNew1 from './AddNew1'
import ImportExcel from './ImportExcel'
import axios from 'axios'

import Modal from 'react-modal';
function AdminStaff() {
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    // sort 
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


    //api

    // sắp xếp
    // const [pageSize, setPageSize] = useState(10)
    // const [pageNumber, setPageNumber] = useState(1)
    const [staffs, setStaffs] = useState({
        data: [],
        current_page: 0,
        total_page: "",
        total_item: 0,
        size: 0
    });
    // const getStaffs = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/api/v1/director/staff`)
    //         setStaffs(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const getStaffs = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://localhost:8080/api/v1/director/staff/get-list-staff?keyword=${sort.keyword}&status=${sort.status}&orderBy=${sort.orderBy}&orderDirection=${sort.orderDirection}&page=${sort.page}&pageSize=${sort.pageSize}`)
            setStaffs(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStaffs();
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
                getStaffs(); // cap nhat lai danh sach
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    // edit
    const [selectedStaff, setSelectedStaff] = useState({
        id: null,
        staffName: '',
        phone: '',
        email: '',
        birthday: '',
        gender: '',
        username: '',
        password: '',
        createAt: null,
        updateAt: null,
        status: '',
        roleId: ''
    });

    const handleEdit = (item) => {
        setSelectedStaff(item);
        setIsAddNewActive(true)
    }

    //delete
    const handleDelete = (item) => {
        const deleteStaff = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.delete(`http://localhost:8080/api/v1/director/staff/${item.id}`);
                setMessage("Xoá thành công")
                setIsModalMsgOpen(true)
                getStaffs();

            } catch (error) {
                console.log(error);
                setMessage(error.response.data)
                setIsModalMsgOpen(true)
            }
        };
        deleteStaff();
    }

    // modal message
    const [message, setMessage] = useState("")
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);

    const handleCloseModalMsg = () => {
        setIsModalMsgOpen(false);
        // loadAndResetData();
    };

    //

    return (
        <div className={style.container}>
            <div className={style.header}>
                <ul>
                    <li><button onClick={() => setIsAddNewActive(true)}>Tạo mới nhân viên</button></li>
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
                        <input placeholder='Tìm kiếm' value={sort.key} onChange={(e) => setKeyword(e.target.value)}></input>
                    </div>
                </div>

                <div className={style.table}>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th onClick={() => setOrderBy("staffName")}>Họ và tên</th>
                                <th >Địa chỉ</th>
                                <th onClick={() => setOrderBy("birthday")}>Ngày sinh</th>
                                <th >Giới tính</th>
                                <th onClick={() => setOrderBy("phone")}>SĐT</th>
                                <th onClick={() => setOrderBy("email")}>Email</th>
                                <th onClick={() => setOrderBy("roleId")}>Chức vụ</th>
                                <th >Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {staffs.data && staffs.data.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1 + (((sort.page - 1) * sort.pageSize))}</td>
                                    <td>{item.staffName}</td>
                                    <td>Gia Lâm - Hà Nội</td>
                                    <td>{item.birthday}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.roleId == 1 ? "DIRECTOR" : "STAFF"}</td>
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

                        {Array.from({ length: staffs.total_page }, (_, index) => (
                            <li key={index}>
                                <button className={clsx({ [style.pageSelected]: index + 1 === sort.page })} onClick={() => setPage(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                        <li><button onClick={() => setNextPage(staffs.total_page)}>Next</button></li>
                    </ul>
                </div>
            </div>


            <div ref={displayAddnew} className={style.displayAddnew}>
                <AddNew1 value={{ getStaffs: getStaffs, displayAddnew: displayAddnew, setIsAddNewActive: setIsAddNewActive, selectedStaff: selectedStaff, setSort: setSort, setMessage: setMessage, setIsModalMsgOpen: setIsModalMsgOpen }}></AddNew1>
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

export default AdminStaff