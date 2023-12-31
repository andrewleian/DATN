import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import clsx from "clsx"
import style from './AdminPromotion.module.scss'
import AddNew from './AddNew'
import ImportExcel from './ImportExcel'
import axios from 'axios'
import Modal from 'react-modal';

function AdminPromotion() {
    Modal.setAppElement('#root');
    //api
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    const [sort, setSort] = useState({ page: 1, pageSize: 10 })


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


    const [promotions, setPromotions] = useState({
        "data": [],
        "current_page": 1,
        "total_page": 0,
        "total_item": 0,
        "size": 10
    });

    const getPromotions = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://localhost:8080/api/v1/director/promotions/getAll?page=${sort.page}&pageSize=${sort.pageSize}`)
            setPromotions(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPromotions();
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
                getPromotions(); // cap nhat lai danh sach
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    // edit
    const [selectedPromotions, setSelectedPromotions] = useState({
        id: null,
        title: '',
        content: '',
        discount: 0,
        start_at: '',
        end_at: '',
        // createAt: '',
        // updateAt: '',
        status: ''
    });

    const handleEdit = (item) => {
        setSelectedPromotions(item);
        setIsAddNewActive(true)
    }

    //delete
    const handleDelete = (item) => {
        const deletePromotion = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.delete(`http://localhost:8080/api/v1/director/promotions/${item.id}`);
                console.log(response.data);
                // if (response.data.message === 'Delete Customer successfully') {
                getPromotions();
                // }
            } catch (error) {
                console.log(error);
            }
        };
        deletePromotion();
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <ul>
                    <li><button onClick={() => setIsAddNewActive(true)}>Add new promotion</button></li>
                    <li><button>Export Excel</button></li>
                    <li><button>Export PDF</button></li>
                </ul>
            </div>
            <hr />

            <div className={style.danhSach}>
                <div className={style.rowSpaceBettween}>
                    <div className={style.col1}>
                        <label> Hiện </label>
                        <select>
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
                        <input placeholder='Tìm kiếm'></input>
                    </div>
                </div>

                <div className={style.table}>
                    <table>
                        <thead>
                            <tr>
                                {/* <th><input type='checkbox'></input></th> */}
                                <th>Stt</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Discount value</th>
                                <th>Start at</th>
                                <th>End at</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {promotions.data.map((item, index) => {
                                return <tr key={index}>
                                    {/* <td><input type='checkbox'></input></td> */}
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.content}</td>
                                    <td>{item.discountValue}%</td>
                                    <td>{item.startAt}</td>
                                    <td>{item.endAt}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button onClick={() => { handleEdit(item) }}><i className="fa-regular fa-pen-to-square"></i></button>
                                        <button>Product</button>
                                        <button onClick={() => { handleDelete(item) }}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <div className={style.page}>
                    <ul>
                        <li><button>Previous</button></li>
                        <li><button>1</button></li>
                        <li><button>2</button></li>
                        <li><button>3</button></li>
                        <li><button>Next</button></li>
                    </ul>
                </div>
            </div>


            <div ref={displayAddnew} className={style.displayAddnew}>
                <AddNew value={{ getPromotions: getPromotions, displayAddnew: displayAddnew, setIsAddNewActive: setIsAddNewActive, selectedPromotions: selectedPromotions }}></AddNew>
            </div>

            <div ref={displayImportExcel} className={style.displayImportExcel}>
                <ImportExcel></ImportExcel>
            </div>

        </div>
    )
}

export default AdminPromotion