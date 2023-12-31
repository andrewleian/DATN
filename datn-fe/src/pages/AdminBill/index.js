import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import clsx from "clsx"
import style from './AdminCustomer.module.scss'
import AddNew from './AddNew'
import ImportExcel from './ImportExcel'
import axios from 'axios'
import { format } from 'date-fns';

function AdminBill() {
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
    // const getStaffs = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/api/v1/director/staff`)
    //         setStaffs(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

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

    const handleEdit = (item) => {
        setSelectedBill(item);
        setIsAddNewActive(true)
    }

    //delete
    const handleDelete = (item) => {
        const deleteCustomer = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.delete(`http://localhost:8080/api/v1/director/customer/${item.id}`);
                console.log(response.data);
                if (response.data.message === 'Delete Customer successfully') {
                    getBills();
                }
            } catch (error) {
                console.log(error);
            }
        };
        deleteCustomer();
    }
    console.log(bills)

    return (
        <div className={style.container}>
            <div className={style.header}>
                <ul>
                    {/* <li><button>Tất cả</button></li>
                    <li><button>Chờ thanh toán</button></li>
                    <li><button>Vận chuyển</button></li>
                    <li><button>Đang giao</button></li>
                    <li><button>Hoàn thành</button></li>
                    <li><button>Đã hủy</button></li>
                    <li><button>Trả hàng/Hoàn tiền</button></li> */}
                    <li><button onClick={() => setStatus("Chờ xác nhận")}>Chờ xác nhận</button></li>
                    <li><button onClick={() => setStatus("Đang chuẩn bị hàng")}>Đang chuẩn bị hàng</button></li>
                    <li><button onClick={() => setStatus("Chờ đơn vị vận chuyển")}>Chờ đơn vị vận chuyển</button></li>
                    <li><button onClick={() => setStatus("Đang giao")}>Đang giao</button></li>
                    <li><button onClick={() => setStatus("Hủy")}>Hủy</button></li>
                    <li><button onClick={() => setStatus("Trả hàng")}>Trả hàng</button></li>
                    <li><button onClick={() => setStatus("Thành công")}>Thành công</button></li>
                    <li><button onClick={() => setStatus("Chờ thanh toán")}>Chờ thanh toán</button></li>
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
                                <th>#</th>
                                {/* <th onClick={() => setOrderBy("customerName")}>Họ và tên</th> */}
                                <th>Tên khách hàng</th>
                                <th>SĐT</th>
                                <th >Email</th>
                                <th >Địa chỉ</th>
                                <th>Tổng tiền</th>
                                {/* <th>note</th> */}
                                {/* <th>createAt</th>
                                <th>updateAt</th> */}
                                <th>Trạng thái</th>
                                <th>Ngày thanh toán</th>
                                <th>Thanh toán</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bills?.data?.map((item, index) => {
                                return <tr key={index}>
                                    {/* <td><input type='checkbox'></input></td> */}
                                    <td>{index + 1}</td>
                                    <td>{item.customerName}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.totalPayment?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    {/* <td>{item.note}</td> */}
                                    {/* <td>{item.createAt}</td>
                                    <td>{item.updateAt}</td> */}
                                    <td>{item.status}</td>
                                    <td>{format(new Date(item.paymentDate), 'dd/MM/yyyy     |    HH:mm:ss')}</td>
                                    <td>{item.payments}</td>
                                    <td>
                                        <button className="edit" onClick={() => { handleEdit(item) }}><i className="fa-regular fa-pen-to-square"></i></button>
                                        <button className="delete" onClick={() => { handleDelete(item) }}><i className="fa-solid fa-trash"></i></button>
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


            <div ref={displayAddnew} className={style.displayAddnew}>
                <AddNew value={{ getBills: getBills, displayAddnew: displayAddnew, setIsAddNewActive: setIsAddNewActive, selectedBill: selectedBill }}></AddNew>
            </div>

            <div ref={displayImportExcel} className={style.displayImportExcel}>
                <ImportExcel></ImportExcel>
            </div>

        </div>
    )
}

export default AdminBill