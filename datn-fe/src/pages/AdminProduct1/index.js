import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import clsx from "clsx"
import style from './AdminProduct.module.scss'
import AddNew from './component/AddNew'
import ImportExcel from './component/ImportExcel'
import ProductColorSize from '../AdminProductCS'
import axios from 'axios'
import { format } from 'date-fns';
import Modal from 'react-modal';
function AdminProduct1() {
    Modal.setAppElement('#root');
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
            setSort(prevState => ({ ...prevState, pageNumber: parseInt(prevState.page + 1) }));
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

    // addddddddddđ neeeeeeeeeeeeeeeeeeeeewwwwwwwwwwww

    //manufacturer
    const [manufacturers, setManufacturers] = useState([]);
    const getManufacturers = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://localhost:8080/api/v1/manufacturer`)
            setManufacturers(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getManufacturers();
    }, [])

    console.log(manufacturers)

    const [product, setProduct] = useState({ ...selectedProduct });
    const [messages, setMessages] = useState({
        id: -1,
        name: -1,
        productCode: -1,
        manufacturer: -1,
        status: -1,
        isNew: -1,
        isBestSeller: -1,
        createAt: -1,
        updateAt: -1,
    });

    useEffect(() => {
        setProduct({ ...selectedProduct })
    }, [selectedProduct])

    const handleInput = (key, value) => {
        setProduct((prev) => ({
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
        // const validators = {
        //     customerName: /^[a-zA-ZÀ-Ỹà-ỹ]+(\s[a-zA-ZÀ-Ỹà-ỹ]+)*$/,
        //     phone: /^(?:\+?84|0)(?:\d{9}|\d{10})$/,
        //     email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        //     birthday: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        //     username: /^[a-zA-Z0-9_-]{3,16}$/,
        //     password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        //     gender: /.*/,
        //     status: /.*/
        // };

        // const validator = validators[key];
        // if (validator) {

        //     if (value === undefined || value === null || value === '') {
        //         setMessages((prevMessages) => ({
        //             ...prevMessages,
        //             [key]: 2
        //         }));
        //         return false;
        //     }

        //     if (key == "birthday") {
        //         if (isFutureDate(value)) {
        //             setMessages((prevMessages) => ({
        //                 ...prevMessages,
        //                 [key]: 0,
        //             }));
        //             return false
        //         } else {
        //             setMessages((prevMessages) => ({
        //                 ...prevMessages,
        //                 [key]: 1,
        //             }));
        //             return true
        //         }
        //     }

        //     const isValid = validator.test(value);
        //     setMessages((prevMessages) => ({
        //         ...prevMessages,
        //         [key]: isValid ? 1 : 0,
        //     }));
        //     return isValid;
        // }

        return true;
    };

    const handleDefaultValue = (action) => {
        setProduct({
            id: -1,
            name: "",
            productCode: "",
            manufacturer: "",
            createAt: "",
            updateAt: "",
            status: "",
            isNew: -1,
            isBestSeller: -1
        })

        setMessages({
            id: -1,
            name: -1,
            productCode: -1,
            manufacturer: -1,
            status: -1,
            isNew: -1,
            isBestSeller: -1,
            createAt: -1,
            updateAt: -1,
        })
        getProducts();
    }

    //
    const loadAndResetData = () => {
        getProducts();
        // value.displayAddnew.current.style.display = "none"
        // value.setIsAddNewActive(false)
        handleDefaultValue('cancel')
    }

    const handleSubmit = () => {
        let isValid = true;

        // for (const key in product) {
        //     if (product.hasOwnProperty(key)) {
        //         if (product.id && key === 'password') {
        //             continue;
        //         }
        //         if (!validateInput(key, product[key])) {
        //             isValid = false;
        //         }
        //     }
        // }


        if (isValid) {
            if (product.id) {
                const updateProduct = async () => {
                    try {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        const response = await axios.put(`http://localhost:8080/api/v1/staff/product/${product.id}`, product);
                        if (response.status == 200) {
                            setMessage("Cập nhật thành công")
                            setIsModalMsgOpen(true);
                            setIsModalUpdateOpen(false)
                            handleDefaultValue();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                };
                updateProduct();
            } else {
                const addProduct = async () => {
                    try {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        const response = await axios.post(`http://localhost:8080/api/v1/staff/product`, product);
                        // if (response.status == 201) {
                        // setSort(prevState => ({ ...prevState, page: 0 }));
                        setMessage("Thêm thành công")
                        setIsModalMsgOpen(true);
                        handleDefaultValue();
                        // }
                    } catch (error) {
                        console.log(error);

                    }
                };
                addProduct();
            }
        }
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

    return (
        <div className={style.container}>

            <div className={style.header}>
                <ul>
                    <li><button onClick={() => setIsModalAddNewMsgOpen(true)}>Tạo mới sản phẩm</button></li>
                    {/* <li><button onClick={() => setIsImportExcelActive(true)}>Import Excel</button></li>
                    <li><button>Export Excel</button></li>
                    <li><button>Export PDF</button></li> */}
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
                                <th>Tên</th>
                                <th>Mã sản phẩm</th>
                                <th>Nhà sản xuất</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                                <th>Trạng thái</th>
                                <th>Sản phẩm mới</th>
                                <th>Sản phẩm bán chạy</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.data?.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.productCode}</td>
                                    <td>{item.manufacturer}</td>
                                    <td>{format(new Date(item.createAt), 'dd/MM/yyyy')}</td>
                                    <td>{format(new Date(item.updateAt), 'dd/MM/yyyy')}</td>
                                    <td>{item.status}</td>
                                    <td>{item.isNew == 0 ? "Inactive" : "Active"}</td>
                                    <td>{item.isBestSeller == 0 ? "Inactive" : "Active"}</td>
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

                        {Array.from({ length: products.totalPages }, (_, index) => (
                            <li key={index}>
                                <button className={clsx({ [style.pageSelected]: index === sort.page })} onClick={() => setPage(index + 1)}>{index + 1}</button>
                            </li>
                        ))}


                        <li><button onClick={() => setNextPage(products.totalPages)}>Next</button></li>
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
                        <h6 className={style.title}>Tạo mới sản phẩm</h6>
                        <div className={style.form}>
                            <form>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Tên sản phẩm</label>
                                        <input value={product.name} onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}></input>
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Mã sản phẩm</label>
                                        <input value={product.productCode} onChange={(e) => setProduct(prev => ({ ...prev, productCode: e.target.value }))}></input>
                                    </div>
                                </div>
                                <div className={style.formGroup}>
                                    <label>Nhà sản xuất</label>
                                    <select value={product.manufacturer} onChange={(e) => setProduct(prev => ({ ...prev, manufacturer: e.target.value }))}>
                                        <option hidden>Chọn nhà sản xuất</option>
                                        {manufacturers?.map((item, index) => (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={style.formGroup}>
                                    <label >Trạng thái</label>
                                    <select value={product.status} onChange={(e) => setProduct(prev => ({ ...prev, status: e.target.value }))}>
                                        <option hidden></option>
                                        <option value='active'>active</option>
                                        <option value='inactive'>inactive</option>
                                    </select>
                                </div>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label >Sản phẩm mới</label>
                                        <select value={product.isNew} onChange={(e) => setProduct(prev => ({ ...prev, isNew: e.target.value }))}>
                                            <option hidden></option>
                                            <option value='1'>Active</option>
                                            <option value='0'>Inactive</option>
                                        </select>
                                    </div>
                                    <div className={style.formGroup}>
                                        <label >Sản phẩm bán chạy</label>
                                        <select value={product.isBestSeller} onChange={(e) => setProduct(prev => ({ ...prev, isBestSeller: e.target.value }))}>
                                            <option hidden></option>
                                            <option value='1'>Active</option>
                                            <option value='0'>Inactive</option>
                                        </select>
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
                        <h6 className={style.title}>Cập nhật sản phẩm</h6>
                        <div className={style.form}>
                            <form>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Tên sản phẩm</label>
                                        <input value={product.name} onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}></input>
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Mã sản phẩm</label>
                                        <input value={product.productCode} onChange={(e) => setProduct(prev => ({ ...prev, productCode: e.target.value }))}></input>
                                    </div>
                                </div>
                                <div className={style.formGroup}>
                                    <label>Nhà sản xuất</label>
                                    <select value={product.manufacturer} onChange={(e) => setProduct(prev => ({ ...prev, manufacturer: e.target.value }))}>
                                        <option hidden>Chọn nhà sản xuất</option>
                                        {manufacturers?.map((item, index) => (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={style.formGroup}>
                                    <label >Trạng thái</label>
                                    <select value={product.status} onChange={(e) => setProduct(prev => ({ ...prev, status: e.target.value }))}>
                                        <option hidden></option>
                                        <option value='active'>active</option>
                                        <option value='inactive'>inactive</option>
                                    </select>
                                </div>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label >Sản phẩm mới</label>
                                        <select value={product.isNew} onChange={(e) => setProduct(prev => ({ ...prev, isNew: e.target.value }))}>
                                            <option hidden></option>
                                            <option value='1'>Active</option>
                                            <option value='0'>Inactive</option>
                                        </select>
                                    </div>
                                    <div className={style.formGroup}>
                                        <label >Is best seller</label>
                                        <select value={product.isBestSeller} onChange={(e) => setProduct(prev => ({ ...prev, isBestSeller: e.target.value }))}>
                                            <option hidden></option>
                                            <option value='1'>Active</option>
                                            <option value='0'>Inactive</option>
                                        </select>
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

export default AdminProduct1