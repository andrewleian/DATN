import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react';
import style from './Header.module.scss'
import clsx from 'clsx'
import axios from 'axios'
import HeaderMenuItem from '../HeaderMenuItem'
import routes from '../../../config/routes'
import logo from './logo.png'

function Header() {
    const discoverYou = 'https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/DiscoverYOU.svg';
    const navigate = useNavigate();

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
    return (
        <div className={clsx(style.container)}>
            <div className={clsx(style.headerStart)}>
                <div className={clsx(style.logo)}>
                    <img className={clsx(style.imgLogo)} src={logo} onClick={() => navigate('/')}></img>
                </div>
            </div>

            <div className={clsx(style.headerMid)}>
                <ul className={clsx(style.ulMid)}>
                    <li className={clsx(style.liMid)}> <Link to={routes.sanPham} className={clsx(style.link)}>SẢN PHẨM</Link> </li>
                    {/* <li className={clsx(style.liMid, style.borderLi)}> <Link to={routes.nam} className={clsx(style.link)}>Nam</Link> </li>
                    <li className={clsx(style.liMid, style.borderLi)}> <Link to={routes.nu} className={clsx(style.link)}>Nữ</Link> </li> */}
                    <li className={clsx(style.liMid, style.borderLi)}> <Link to={routes.saleOff} className={clsx(style.link)}>Sale Off</Link> </li>
                    <li className={clsx(style.liMid, style.borderLi)}> <Link to={routes.discoverYou} className={clsx(style.link)}> <img src={discoverYou}></img> </Link> </li>
                </ul>
            </div>

            <div className={clsx(style.headerEnd)}>
 
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
                                <Link key={index} to={`/productDetails/${item.id}/${item.colorDTO.name}`} onClick={() => clickToProduct(item)}>
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



        </div >
    )
}

export default Header