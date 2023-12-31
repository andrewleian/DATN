import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import clsx from "clsx"
import style from './AdminProduct.module.scss'
import AddNew from './component/AddNew'
import ImportExcel from './component/ImportExcel'
import ProductColorSize from '../AdminProductCS'
import axios from 'axios'

function AdminProduct() {
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    const [sort, setSort] = useState({ tuKhoa: "", pageNumber: 0, pageSize: 10 })

    const setKeyword = (item) => {
        setSort(prevState => ({ ...prevState, tuKhoa: item }));
    }
    console.log(sort)
    // page
    const setPage = (item) => {
        setSort(prevState => ({ ...prevState, pageNumber: item }));
    }

    const setNextPage = (maxPage) => {
        if (sort.pageNumber <= maxPage - 1) {
            setSort(prevState => ({ ...prevState, pageNumber: prevState.page + 1 }));
        }
    }
    const setPrevPage = () => {
        if (sort.pageNumber >= 2) {
            setSort(prevState => ({ ...prevState, pageNumber: prevState.page - 1 }));
        }
    }
    //

    const setPageSize = (item) => {
        setSort(prevState => ({ ...prevState, pageSize: item }));
    }



    // sắp xếp
    const [products, setProducts] = useState({
        "data": [],
        "totalPages": 0,
        "totalElements": 0,
        "currentPage": 0,
        "pageSize": 10
    });

    const getProducts = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://localhost:8080/api/v1/staff/product?tuKhoa=${sort.tuKhoa}&pageNumber=${sort.pageNumber}&pageSize=${sort.pageSize}`)
            setProducts(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts();
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
                getProducts(); // cap nhat lai danh sach
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    // edit
    const [selectedProduct, setSelectedProduct] = useState({
        id: -1,
        name: "",
        productCode: "",
        manufacturer: "",
        createAt: "",
        updateAt: "",
        status: "",
        isNew: -1,
        isBestSeller: -1
    });

    const handleEdit = (item) => {
        setSelectedProduct(item);
        setIsAddNewActive(true)
    }

    //delete
    const handleDelete = (item) => {
        const deleteProduct = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.delete(`http://localhost:8080/api/v1/staff/product/status//${item.id}`);
                console.log(response.data);
                // if (response.data.message === 'Delete Customer successfully') {
                getProducts();
                // }
            } catch (error) {
                console.log(error);
            }
        };
        deleteProduct();
    }


    return (
        <div className={style.container}>
            <div className={style.header}>
                <ul>
                    <li><button onClick={() => setIsAddNewActive(true)}>Tạo mới sản phẩm</button></li>
                    <li><button onClick={() => setIsImportExcelActive(true)}>Import Excel</button></li>
                    <li><button>Export Excel</button></li>
                    <li><button>Export PDF</button></li>
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
                        <input value={sort.tuKhoa} placeholder='Tìm kiếm' onChange={(e) => setKeyword(e.target.value)}></input>
                    </div>
                </div>

                <div className={style.table}>
                    <table>
                        <thead>
                            <tr>
                                <th>Stt</th>
                                <th>Name</th>
                                <th>Product code</th>
                                <th>Manufacturer</th>
                                <th>Create at</th>
                                <th>Update at</th>
                                <th>Status</th>
                                <th>Is new</th>
                                <th>Is best seller</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.data?.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.productCode}</td>
                                    <td>{item.manufacturer}</td>
                                    <td>{item.createAt}</td>
                                    <td>{item.updateAt}</td>
                                    <td>{item.status}</td>
                                    <td>{item.isNew == 0 ? "False" : "True"}</td>
                                    <td>{item.isBestSeller == 0 ? "False" : "True"}</td>
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
                        <li><button>Previous</button></li>
                        <li><button>1</button></li>
                        <li><button>2</button></li>
                        <li><button>3</button></li>
                        <li><button>Next</button></li>
                    </ul>
                </div>
            </div>


            <div ref={displayAddnew} className={style.displayAddnew}>
                <AddNew value={{ getProducts: getProducts, displayAddnew: displayAddnew, setIsAddNewActive: setIsAddNewActive, selectedProduct: selectedProduct }}></AddNew>
            </div>

            <div ref={displayImportExcel} className={style.displayImportExcel}>
                <ImportExcel></ImportExcel>
            </div>

            {/* <div ref={displayProductCS} className={style.displayProductCS}>
                <ProductColorSize></ProductColorSize>
            </div> */}

        </div>
    )
}

export default AdminProduct