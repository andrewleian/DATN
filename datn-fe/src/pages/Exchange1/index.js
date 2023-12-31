import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import style from './OfflineSales.module.scss'
import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import axios from 'axios'
function AdminExchange1() {
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    // tabs
    const [tabs, setTabs] = useState([]);

    //dropdown get bill
    const dropdownSearchBillRef = useRef(null);
    const [isDropdownSearchBillOpen, setIsDropdownSearchBillOpen] = useState(false);

    const toggleDropdownSearchBill = () => {
        setIsDropdownSearchOpen(!isDropdownSearchOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownSearchBillRef.current && !dropdownSearchBillRef.current.contains(event.target)) {
                setIsDropdownSearchBillOpen(false);
            } else {
                // setIsDropdownSearchOpen(true)
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const clickToBill = (item) => {
        setIsDropdownSearchBillOpen(false)
    }

    // get bill
    const [keySearchBill, setKeySearchBill] = useState("")
    const [bills, setBills] = useState([]);
    const getBills = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/staff/getBill?search=${keySearchBill}`);
            setBills(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBills();
    }, [keySearchBill])

    const HanldeSetKeySearchBill = (item) => {
        setKeySearchBill(item)
        if (item.trim() == "" || item.trim() == null) {
            setIsDropdownSearchBillOpen(false)
        } else {
            setSort(prevState => ({ ...prevState, tu_khoa: item }))
            setIsDropdownSearchBillOpen(true)
        }
    }

    //dropdown get product
    const dropdownSearchProductRef = useRef(null);
    const [isDropdownSearchProductOpen, setIsDropdownSearchProductOpen] = useState(false);

    const toggleDropdownSearchProduct = () => {
        setIsDropdownSearchProductOpen(!isDropdownSearchProductOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownSearchProductRef.current && !dropdownSearchProductRef.current.contains(event.target)) {
                setIsDropdownSearchProductOpen(false);
            } else {
                // setIsDropdownSearchOpen(true)
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // get product
    const dropdownRef = useRef(null);
    const [isDropdownSearchOpen, setIsDropdownSearchOpen] = useState(false);

    const toggleDropdownSearch = () => {
        setIsDropdownSearchOpen(!isDropdownSearchOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownSearchOpen(false);
            } else {
                // setIsDropdownSearchOpen(true)
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    // get product
    const [sort, setSort] = useState({ tu_khoa: "", category: "", min_price: 0, max_price: 0, size: "", color: "", manufacturer: "", pageNumber: 0, pageSize: 5 })
    const [productDetails, setProductDetails] = useState([]);
    const getProductDetailsByPage = async () => {
        try {
            const sizeParam = sort.size !== "" ? `&size=${sort.size}` : "";
            const manufacturerParam = sort.manufacturer !== "" ? `&manufacturer=${sort.manufacturer}` : "";
            const response = await axios.get(`http://localhost:8080/api/v1/list-products/?pageNumber=${sort.pageNumber}&pageSize=${sort.pageSize}&color=${sort.color}${manufacturerParam}${sizeParam}&min_price=${sort.min_price}&max_price=${sort.max_price}&tu_khoa=${sort.tu_khoa.trim()}`);
            setProductDetails(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductDetailsByPage();
    }, [sort])

    const setKeySearch = (item) => {
        setSort(prevState => ({ ...prevState, tu_khoa: item }))
        if (item.trim() == "" || item.trim() == null) {
            setIsDropdownSearchOpen(false)
        } else {
            setSort(prevState => ({ ...prevState, tu_khoa: item }))
            setIsDropdownSearchOpen(true)
        }
    }

    ///
    const clickToProduct = (item) => {
        setIsDropdownSearchOpen(false)
    }

    console.log(bills)
    return (
        <div className={clsx(style.container)}>

            <div className={style.row1Container}>
                <div className={clsx(style.row1)}>
                    <div className={clsx(style.searchProducts)}>
                        <button>Hóa đơn</button>

                        <div className={style.dropdownSearchBill} ref={dropdownSearchBillRef}>
                            <div className={style.dropdownToggle} data-bs-toggle="dropdown">
                                <input value={keySearchBill} onChange={(e) => HanldeSetKeySearchBill(e.target.value)} onClick={() => setIsDropdownSearchBillOpen(true)} className={clsx(style.headerEndInput)} placeholder='Tìm kiếm'></input>
                            </div>

                            <ul className={style.dropdownMenu} style={{ display: isDropdownSearchBillOpen ? 'block' : 'none' }}>

                                {bills?.map((item, index) => {

                                    return (
                                        <li>
                                            <div className={style.item} key={index}>
                                                <div className={style.row1}>
                                                    <p>Đơn hàng: <span>#{item.billCode}</span></p>
                                                </div>
                                                <div className={style.row2}>

                                                    <div className={style.col2}>
                                                        <div >
                                                            <p className={style.customerName}>Khách hàng: <span>{item.customerNam}</span></p>
                                                        </div>

                                                        <div >
                                                            <p className={style.phone}>SĐT: <span>{item.phone}</span></p>
                                                        </div>

                                                        <div >
                                                            <p className={style.email}>Email: <span>{item.email}</span></p>
                                                        </div>


                                                    </div>

                                                    <div className={style.col3}>
                                                        <div >
                                                            <p className={style.totalPayment}>Tổng tiền: <span>{item?.totalPayment?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
                                                        </div>
                                                        <div >
                                                            <p className={style.paymentDate}>Ngày thanh toán: <span>{format(new Date(item.paymentDate), ' dd-MM-yyyy')}</span></p>
                                                        </div>
                                                        <div >
                                                            <p className={style.status}>Trạng thái: <span>{item?.status}</span></p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    )
                                })}


                                {productDetails?.data?.length == 0 && <div>
                                    <p className={style.blankProduct}>Không tìm thấy sản phẩm nào</p>
                                </div>}
                            </ul>
                        </div>
                    </div>
                    <div className={clsx(style.bills)}>
                        <ul>
                            <li>Hóa đơn 1 <span></span></li>
                            <li className={clsx(style.active)}>Hóa đơn 2 <span></span></li>
                        </ul>
                    </div>
                    <div className={clsx(style.addBill)}>
                        <button><i class="fa-sharp fa-solid fa-plus"></i></button>
                    </div>
                </div>

                <div className={clsx(style.row2)}>
                    <div className={style.billCustomerInfor}>
                        <h2>Thông tin hóa đơn</h2>
                        <p>Họ và tên: <span>Nguyễn Khánh Trang</span></p>
                        <p>Số điện thoại: <span>0775499998</span></p>
                        <p>Email: <span>trang@gmail.com</span></p>
                        <p>Địa chỉ: <span>Khoan tế đa tốn gia lâm hà nội</span></p>
                        <p>Tổng tiền hóa đơn: <span>1.111.000</span></p>
                        <p>Trạng thái: <span>Chờ xác nhận</span></p>
                        <p>Ngày thanh toán: <span>10/11/2023</span></p>
                        <p>Hình thức thanh toán: <span>Online</span></p>
                    </div>
                    <div className={style.table}>
                        <h2>Thông tin sản phẩm</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Sản phẩm</th>
                                    <th>Ảnh</th>
                                    <th>Giá</th>
                                    <th>SL</th>
                                    <th>Tổng</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>3</td>
                                    <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                    <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                    <td>650.000 VND</td>
                                    <td>1</td>
                                    <td>650.000 VND</td>
                                    <td><button>Đổi</button></td>
                                </tr>

                                <tr>
                                    <td>2</td>
                                    <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                    <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                    <td>650.000 VND</td>
                                    <td>1</td>
                                    <td>650.000 VND</td>
                                    <td><button>Đổi</button></td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                    <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                    <td>650.000 VND</td>
                                    <td>1</td>
                                    <td>650.000 VND</td>
                                    <td><button>Đổi</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >

            <div className={style.row2Container}>
                <div className={clsx(style.row1)}>
                    <h2>Sản phẩm đổi trả</h2>
                </div>

                <div className={clsx(style.row2)}>
                    <div className={style.table}>
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Sản phẩm trả</th>
                                    <th>Ảnh</th>
                                    <th>Size</th>
                                    <th>Màu sắc</th>
                                    <th>Giá</th>
                                    <th>SL</th>
                                    <th>Sản phẩm đổi</th>
                                    <th>Ảnh</th>
                                    <th>Size</th>
                                    <th>Màu sắc</th>
                                    <th>Giá</th>
                                    <th>SL</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                    <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                    <td>40</td>
                                    <td>Trắng</td>
                                    <td>650.000 VND</td>
                                    <td>1</td>
                                    <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                    <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                    <td>41</td>
                                    <td>Vàmg</td>
                                    <td>650.000 VND</td>
                                    <td>1</td>
                                    <td><button>Xóa</button></td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                    <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                    <td>40</td>
                                    <td>Trắng</td>
                                    <td>650.000 VND</td>
                                    <td>1</td>
                                    <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                    <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                    <td>41</td>
                                    <td>Vàmg</td>
                                    <td>650.000 VND</td>
                                    <td>1</td>
                                    <td><button>Xóa</button></td>
                                </tr>


                                <tr>
                                    <td>1</td>
                                    <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                    <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                    <td>40</td>
                                    <td>Trắng</td>
                                    <td>650.000 VND</td>
                                    <td>1</td>
                                    <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                    <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                    <td>41</td>
                                    <td>Vàmg</td>
                                    <td>650.000 VND</td>
                                    <td>1</td>
                                    <td><button>Xóa</button></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* <div className={style.row2Container}>

                <div className={style.col1}>
                    <div className={clsx(style.row1)}>
                        <h2>Sản phẩm muốn đổi</h2>

                        <div className={style.dropdown} ref={dropdownRef}>
                            <div className={style.dropdownToggle} data-bs-toggle="dropdown">
                                <input value={sort.tu_khoa} onChange={(e) => setKeySearch(e.target.value)} onClick={() => setIsDropdownSearchOpen(true)} className={clsx(style.headerEndInput)} placeholder='Tìm kiếm'></input>
                            </div>

                            <ul className={style.dropdownMenu} style={{ display: isDropdownSearchOpen ? 'block' : 'none' }}>

                                {productDetails?.data?.map((item, index) => {
                                    let list = [];
                                    if (item && item.images && Array.isArray(item.images)) {
                                        if (item.images.length > 0) {
                                            for (let i = 0; i < item.images.length; i++) {
                                                let imageLink = window.location.origin + "/image/" + item.images[i]?.name;
                                                list.push(imageLink);
                                            }
                                        }
                                        else {
                                            list = ["https://ananas.vn/wp-content/uploads/Pro_AV00174_1.jpeg",
                                                "https://ananas.vn/wp-content/uploads/Pro_AV00174_2.jpeg",
                                                "https://ananas.vn/wp-content/uploads/Pro_AV00174_3.jpeg",
                                                "https://ananas.vn/wp-content/uploads/Pro_AV00174_4.jpeg",
                                                "https://ananas.vn/wp-content/uploads/Pro_AV00174_5.jpeg",
                                                "https://ananas.vn/wp-content/uploads/Pro_AV00174_6.jpeg",
                                                "https://ananas.vn/wp-content/uploads/Pro_AV00174_7.jpeg",
                                                "https://ananas.vn/wp-content/uploads/Pro_AV00174_8.jpeg",
                                                "https://ananas.vn/wp-content/uploads/Pro_AV00174_9.jpeg"
                                            ]
                                        }
                                    } else {
                                        console.log("mainProduct.images is not available");
                                        list = ["https://ananas.vn/wp-content/uploads/Pro_AV00174_1.jpeg",
                                            "https://ananas.vn/wp-content/uploads/Pro_AV00174_2.jpeg",
                                            "https://ananas.vn/wp-content/uploads/Pro_AV00174_3.jpeg",
                                            "https://ananas.vn/wp-content/uploads/Pro_AV00174_4.jpeg",
                                            "https://ananas.vn/wp-content/uploads/Pro_AV00174_5.jpeg",
                                            "https://ananas.vn/wp-content/uploads/Pro_AV00174_6.jpeg",
                                            "https://ananas.vn/wp-content/uploads/Pro_AV00174_7.jpeg",
                                            "https://ananas.vn/wp-content/uploads/Pro_AV00174_8.jpeg",
                                            "https://ananas.vn/wp-content/uploads/Pro_AV00174_9.jpeg"
                                        ]
                                    }
                                    return (
                                        <Link className={style.linkItem} key={index} to={`/productDetails/${item.id}/${item.colorDTO.name}`} onClick={() => clickToProduct(item)}>
                                            <li >
                                                <div className={style.row2}>
                                                    <div className={style.col1}>
                                                        <img src={list[0]} alt="Product Image" />
                                                    </div>

                                                    <div className={style.col2}>
                                                        <div>
                                                            <p className={style.name}>{item.name}</p>
                                                        </div>

                                                        <div>
                                                            <p className={style.color}>Màu sắc: {item.colorDTO.name}</p>
                                                        </div>

                                                        <div>
                                                            {item.isBestSeller !== 0 && <p className={style.status}>Best Seller</p>}
                                                            {item.isNew !== 0 && <p className={style.status}>New arrival</p>}
                                                        </div>

                                                        <div>
                                                            <p className={style.price}>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    )
                                })}


                                {productDetails?.data?.length == 0 && <div>
                                    <p className={style.blankProduct}>Không tìm thấy sản phẩm nào</p>
                                </div>}
                            </ul>
                        </div>
                    </div>

                    <div className={clsx(style.row2)}>
                        <div className={style.table}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Sản phẩm</th>
                                        <th>Ảnh</th>
                                        <th>Giá</th>
                                        <th>SL</th>
                                        <th>Tổng</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>3</td>
                                        <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                        <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                        <td>650.000 VND</td>
                                        <td>1</td>
                                        <td>650.000 VND</td>
                                        <td><button>Đổi</button></td>
                                    </tr>

                                    <tr>
                                        <td>2</td>
                                        <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                        <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                        <td>650.000 VND</td>
                                        <td>1</td>
                                        <td>650.000 VND</td>
                                        <td><button>Đổi</button></td>
                                    </tr>

                                    <tr>
                                        <td>1</td>
                                        <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                        <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                        <td>650.000 VND</td>
                                        <td>1</td>
                                        <td>650.000 VND</td>
                                        <td><button>Đổi</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className={style.col2}>
                    <div className={clsx(style.row1)}>
                        <h2>Sản phẩm muốn trả</h2>
                    </div>

                    <div className={clsx(style.row2)}>
                        <div className={style.table}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Sản phẩm</th>
                                        <th>Ảnh</th>
                                        <th>Giá</th>
                                        <th>SL</th>
                                        <th>Tổng</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>3</td>
                                        <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                        <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                        <td>650.000 VND</td>
                                        <td>1</td>
                                        <td>650.000 VND</td>
                                        <td><button>Đổi</button></td>
                                    </tr>

                                    <tr>
                                        <td>2</td>
                                        <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                        <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                        <td>650.000 VND</td>
                                        <td>1</td>
                                        <td>650.000 VND</td>
                                        <td><button>Đổi</button></td>
                                    </tr>

                                    <tr>
                                        <td>1</td>
                                        <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                        <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                        <td>650.000 VND</td>
                                        <td>1</td>
                                        <td>650.000 VND</td>
                                        <td><button>Đổi</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> */}
            <hr></hr>
            <button>Xác nhận</button>
        </div >
    )
}

export default AdminExchange1