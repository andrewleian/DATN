import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'
import routes from '../../config/routes'
import style from './SaleOff.module.scss'
import { getProducts } from '../../services/SanPham/index.js'

function SaleOff() {
    const [sort, setSort] = useState({ tu_khoa: "", category: "", min_price: 0, max_price: 0, size: "", color: "", manufacturer: "", pageNumber: 0, pageSize: 12 })
    const [productDetails, setProductDetails] = useState([]);
    // const [productDetailsByPage, setProductDetailsByPage] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const setPageNumber = (item) => {
        setSort(prevState => ({ ...prevState, pageNumber: item }));
    }

    // api

    const getProductDetailsByPage = async () => {
        try {
            const sizeParam = sort.size !== "" ? `&size=${sort.size}` : "";
            const manufacturerParam = sort.manufacturer !== "" ? `&manufacturer=${sort.manufacturer}` : "";
            const response = await axios.get(`http://localhost:8080/api/v1/list-products/?pageNumber=${sort.pageNumber}&pageSize=${sort.pageSize}&color=${sort.color}${manufacturerParam}${sizeParam}&min_price=${sort.min_price}&max_price=${sort.max_price}&is_on_promotion=1`);
            setProductDetails(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    // end api

    // go to top
    const [showGoToTop, setShowGoToTop] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // scroll
    // let currentPageNumber = 0;
    useEffect(() => {
        const handleScroll = () => {
            setShowGoToTop(window.scrollY >= 700);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        getProductDetailsByPage();
    }, [sort])

    // page
    const setPage = (item) => {
        setSort(prevState => ({ ...prevState, pageNumber: item }));
    }

    const setNextPage = (maxPage) => {
        if (sort.pageNumber <= maxPage - 1) {
            // setSelectedPage(prevState => (prevState + 1));
            setSort(prevState => ({ ...prevState, pageNumber: prevState.pageNumber + 1 }));
        }
    }
    const setPrevPage = () => {
        if (sort.pageNumber >= 1) {
            // setSelectedPage(prevState => prevState - 1);
            setSort(prevState => ({ ...prevState, pageNumber: prevState.pageNumber - 1 }));
        }
    }





    return (
        <div className={clsx(style.container)}>

            <div className={clsx(style.right)}>

                <div className={clsx(style.banner)}>
                    <img src="https://ananas.vn/wp-content/uploads/Clearance-Sale-Desktop.jpg"></img>
                </div>

                <div className={clsx(style.listItem)}>
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

                        return <div key={index} className={clsx(style.item)}>
                            <Link to={`/productDetails/${item.id}/${item.colorDTO.name}`} onClick={scrollToTop}>

                                {item.promotionValue > 0 &&
                                    <div className={style.itemImg}>
                                        <img src={list[0]}></img>
                                        <p className={clsx(style.text)}>-{item.promotionValue / 1 * 100}%</p>
                                        <button className={clsx(style.btnInsideImg, style.btnHidden)}>Mua ngay</button>
                                    </div>
                                }
                                {item.promotionValue === 0 &&
                                    <div className={style.itemImg}>
                                        <img src={list[0]}></img>
                                        <button className={clsx(style.btnInsideImg, style.btnHidden)}>Mua ngay</button>
                                    </div>
                                }
                            </Link>
                            {item.isBestSeller !== 0 && <p className={clsx(style.productStatus)}>Best Seller</p>}
                            {item.isNew !== 0 && <p className={clsx(style.productStatus)}>New Arrival</p>}
                            <Link to={`/productDetails/${item.id}/${item.colorDTO.name}`} onClick={scrollToTop} className={style.link}>
                                <p className={clsx(style.productName)}>{item.name}</p>
                            </Link>
                            <p className={clsx(style.productColor)}>{item.colorDTO.name}</p>
                            {item.promotionValue > 0 &&
                                <div className={style.promotion}>
                                    <p className={clsx(style.realPrice)}>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    <p className={clsx(style.promotionalPrice)}>{(item.price * (1 - item.promotionValue)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                </div>
                            }
                            {item.promotionValue === 0 && <p className={clsx(style.productPrice)}>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>}
                        </div>
                    })}

                </div>
                {/* {productDetails.content.length > 0 && } */}

                <div className={style.page}>
                    <ul>
                        <li><button onClick={setPrevPage}>Previous</button></li>
                        {Array.from({ length: productDetails.totalPages + 1 }, (_, index) => (
                            <li key={index}>
                                <button className={clsx({ [style.pageSelected]: index === sort.pageNumber })} onClick={() => setPage(index)}>{index + 1}</button>
                            </li>
                        ))}
                        <li><button onClick={() => setNextPage(productDetails.totalPages)}>Next</button></li>
                    </ul>
                </div>
            </div>

            {
                showGoToTop && <div className={style.showGoToTop}>
                    <button onClick={scrollToTop}><i className="fa-solid fa-arrow-up"></i></button>
                </div>
            }
        </div >
    )
}

export default SaleOff;