import clsx from "clsx";
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import style from './ProductCS.module.scss'
import Color from "../AdminColor/Color";
import Details from "./Details";
function ProductColorSize() {
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
                // getCustomers(); // cap nhat lai danh sach
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    // const displayColor = useRef();
    // const [isColorActive, setIsColorActive] = useState(false)

    // useEffect(() => {
    //     if (isColorActive) {
    //         displayColor.current.style.display = 'block'
    //     }
    // }, [isColorActive])

    // useEffect(() => {
    //     const handleKeyPress = (event) => {
    //         if (event.keyCode === 27) {
    //             displayColor.current.style.display = 'none';
    //             setIsColorActive(false)
    //             // getStaffs(); // cap nhat lai danh sach
    //         }
    //     };

    //     window.addEventListener('keydown', handleKeyPress);

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyPress);
    //     };
    // }, []);

    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    const [sort, setSort] = useState({ tu_khoa: "", category: "", min_price: 0, max_price: 0, size: "", color: "", manufacturer: "", pageNumber: 0, pageSize: 9 })

    const setKeyword = (item) => {
        setSort(prevState => ({ ...prevState, tuKhoa: item }));
    }
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
    const [productDetails, setProductDetails] = useState([]);

    const getProductDetailsByPage = async () => {
        try {
            const sizeParam = sort.size !== "" ? `&size=${sort.size}` : "";
            const response = await axios.get(`http://localhost:8080/api/v1/list-products/?pageNumber=${sort.pageNumber}&pageSize=${sort.pageSize}&color=${sort.color}${sizeParam}&min_price=${sort.min_price}&max_price=${sort.max_price}`);
            setProductDetails(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductDetailsByPage();
    }, [sort])

    //
    // const [isAddNewActive, setIsAddNewActive] = useState(false)
    // const [isImportExcelActive, setIsImportExcelActive] = useState(false)
    // const displayAddnew = useRef();
    // const displayImportExcel = useRef();

    // useEffect(() => {
    //     if (isImportExcelActive) {
    //         displayImportExcel.current.style.display = 'block'
    //     }
    //     if (isAddNewActive) {
    //         displayAddnew.current.style.display = 'block'
    //     }
    // }, [isAddNewActive, isImportExcelActive])

    // useEffect(() => {
    //     const handleKeyPress = (event) => {
    //         if (event.keyCode === 27) {
    //             displayAddnew.current.style.display = 'none';
    //             displayImportExcel.current.style.display = 'none';
    //             setIsAddNewActive(false)
    //             setIsImportExcelActive(false)
    //             getProducts(); // cap nhat lai danh sach
    //         }
    //     };

    //     window.addEventListener('keydown', handleKeyPress);

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyPress);
    //     };
    // }, []);


    // // edit
    // const [selectedProduct, setSelectedProduct] = useState({
    //     id: -1,
    //     name: "",
    //     productCode: "",
    //     manufacturer: "",
    //     createAt: "",
    //     updateAt: "",
    //     status: "",
    //     isNew: -1,
    //     isBestSeller: -1
    // });

    const handleEdit = (item) => {
        // setSelectedProduct(item);
        setIsAddNewActive(true)
    }

    // //delete
    const handleDelete = (item) => {
        const deleteProduct = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.delete(`http://localhost:8080/api/v1/staff/product/status//${item.id}`);
                // if (response.data.message === 'Delete Customer successfully') {
                // getProducts();
                // }
            } catch (error) {
                console.log(error);
            }
        };
        deleteProduct();
    }



    return (
        <div className={style.container}>
            <div className={style.title}>
                <p>PRODUCT DETAILS</p>
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
                                <th>Name</th>
                                <th>manufacturer</th>
                                <th>productCode</th>
                                <th>Status</th>
                                <th>isNew</th>
                                <th>isBestSeller</th>
                                <th>price</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {productDetails?.content?.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.manufacturer}</td>
                                    <td>{item.productCode}</td>
                                    <td>{item.status}</td>
                                    <td>{item.isNew == 1 ? "True" : "False"}</td>
                                    <td>{item.isBestSeller == 1 ? "True" : "False"}</td>
                                    <td>{item.price}</td>
                                    <td>{item.colorDTO.name}</td>
                                    <td></td>
                                    <td>{item.images}</td>
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

            {/* <div className={style.displayColor} ref={displayColor}>
                <Color></Color>
            </div> */}
            <div ref={displayAddnew} className={style.displayAddnew}>
                <Details value={{ getProductDetailsByPage: getProductDetailsByPage, displayAddnew: displayAddnew, setIsAddNewActive: setIsAddNewActive }}></Details>
            </div>
        </div >
    )
}

export default ProductColorSize