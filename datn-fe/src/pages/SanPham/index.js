import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'
import routes from '../../config/routes'
import style from './SanPham.module.scss'
import { getProducts } from '../../services/SanPham/index.js'

function SanPham() {
    const [sort, setSort] = useState({ tu_khoa: "", category: "", min_price: 0, max_price: 0, size: "", color: "", manufacturer: "", pageNumber: 0, pageSize: 12, is_best_seller: 0, is_new: 0, is_on_promotion: 0 })
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
        let isNew = sort.is_new == 1 ? "&is_new=1" : "";
        let isBestSeller = sort.is_best_seller == 1 ? "&is_best_seller=1" : "";
        let isOnPromotion = sort.is_on_promotion == 1 ? "&is_on_promotion=1" : "";
        try {
            const sizeParam = sort.size !== "" ? `&size=${sort.size}` : "";
            const manufacturerParam = sort.manufacturer !== "" ? `&manufacturer=${sort.manufacturer}` : "";
            const response = await axios.get(`http://localhost:8080/api/v1/list-products/?pageNumber=${sort.pageNumber}&pageSize=${sort.pageSize}&color=${sort.color}${manufacturerParam}${sizeParam}&min_price=${sort.min_price}&max_price=${sort.max_price}${isNew}${isBestSeller}${isOnPromotion}`);
            setProductDetails(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getAllColor = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/color?pageNumber=0&pageSize=1111`);
            setColors(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getAllManufacturer = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/manufacturer`);
            setManufacturers(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getAllSize = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/size?pageNumber=0&pageSize=1111`);
            setSizes(response.data.content)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllColor();
        getAllSize();
        getAllManufacturer();                                                  ///////////////////////////check
        // getProductDetailsByPage();
    }, [])

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
    //

    // filter product by color
    const filterProductByColor = (item) => {
        sort.color == item ? setSort(prevState => ({ ...prevState, color: "" })) : setSort(prevState => ({ ...prevState, color: item, pageNumber: 0 }));
    }

    // filter product by manufacturer
    const filterProductByManufacturer = (item) => {
        sort.manufacturer == item ? setSort(prevState => ({ ...prevState, manufacturer: "" })) : setSort(prevState => ({ ...prevState, manufacturer: item, pageNumber: 0 }));
    }

    // filter product by size
    const filterProductBySize = (item) => {

        sort.size == item ? setSort(prevState => ({ ...prevState, size: "" })) : setSort(prevState => ({ ...prevState, size: item, pageNumber: 0 }));;
    }

    // filter product by is new
    const filterProductByIsNew = () => {
        sort.is_new == 1 ? setSort(prevState => ({ ...prevState, is_new: 0 })) : setSort(prevState => ({ ...prevState, is_new: 1, pageNumber: 0 }));;
    }

    // filter product by is Best seler
    const filterProductByIsBestSeller = () => {
        sort.is_best_seller == 1 ? setSort(prevState => ({ ...prevState, is_best_seller: 0 })) : setSort(prevState => ({ ...prevState, is_best_seller: 1, pageNumber: 0 }));;
    }

    // filter product by is sale
    const filterProductByIsSale = () => {
        sort.is_on_promotion == 1 ? setSort(prevState => ({ ...prevState, is_on_promotion: 0 })) : setSort(prevState => ({ ...prevState, is_on_promotion: 1, pageNumber: 0 }));;
    }

    // filter product by price
    // const [isFilterProductByPriceInput, setIsFilterProductByPriceInput] = useState(false);

    // useEffect(() => {

    // }, [isFilterProductByPriceInput])

    // const filterProductByPrice = (min_price, max_price) => {
    //     (sort.min_price == min_price && sort.max_price == max_price) ? setSort(prevState => ({ ...prevState, min_price: 0, max_price: 0 })) : setSort(prevState => ({ ...prevState, min_price: min_price, max_price: max_price }));
    // }

    // filter product by price
    const [isFilterProductByPriceInput, setIsFilterProductByPriceInput] = useState(false);
    const [filterMinPrice, setFilterMinPrice] = useState(0);
    const [filterMaxPrice, setFilterMaxPrice] = useState(0);

    // useEffect(() => {

    // }, [isFilterProductByPriceInput])

    const handleFilterByPriceInput = (value) => {
        setIsFilterProductByPriceInput(value);
        value ? setSort(prevState => ({ ...prevState, min_price: filterMinPrice, max_price: filterMaxPrice })) : setSort(prevState => ({ ...prevState, min_price: 0, max_price: 0 }));
    }

    useEffect(() => {
        if (isFilterProductByPriceInput) {
            setSort(prevState => ({ ...prevState, min_price: filterMinPrice, max_price: filterMaxPrice }))
        }
    }, [isFilterProductByPriceInput, filterMinPrice, filterMaxPrice]);

    const filterProductByPrice = (minPrice, maxPrice) => {
        (sort?.min_price == minPrice && sort?.max_price == maxPrice) ? setSort(prevState => ({ ...prevState, min_price: 0, max_price: 0 })) : setSort(prevState => ({ ...prevState, min_price: minPrice, max_price: maxPrice }));
        setIsFilterProductByPriceInput(false);
    }

    // fi

    // filter product by key search
    const filterProductBySearch = (item) => {
        setSort(prevState => ({ ...prevState, tu_khoa: item }));
    }

    // dropDown
    const statusRef = useRef();
    const statusUpRef = useRef();
    const statusDownRef = useRef();
    const manufacturerRef = useRef();
    const manufacturerUpRef = useRef();
    const manufacturerDownRef = useRef();
    // const categoryRef = useRef(null);
    const categoryUpRef = useRef();
    const categoryDownRef = useRef();
    const priceRef = useRef();
    const priceUpRef = useRef();
    const priceDownRef = useRef();
    const sizeRef = useRef();
    const sizeUpRef = useRef();
    const sizeDownRef = useRef();
    const colorRef = useRef();
    const colorUpRef = useRef();
    const colorDownRef = useRef();

    const [statusDD, setStatusDD] = useState(false)
    const [manufacturerDD, setManufacturerDD] = useState(false)
    const [priceDD, setPriceDD] = useState(false)
    const [sizeDD, setSizeDD] = useState(false)
    const [colorDD, setColorDD] = useState(false)
    const [categoryDD, setCategorDD] = useState(false)

    const handleStatus = () => {
        setStatusDD((prevStaste) => prevStaste === true ? false : true)
    }

    // const handleCategory = () => {
    //     setCategorDD((prevStaste) => prevStaste === true ? false : true)
    // }

    const handlemanufacturer = () => {
        setManufacturerDD((prevStaste) => prevStaste === true ? false : true)
    }

    const handlePrice = () => {
        setPriceDD((prevStaste) => prevStaste === true ? false : true)
    }

    const handleSize = () => {
        setSizeDD((prevStaste) => prevStaste === true ? false : true)
    }

    const handleColor = () => {
        setColorDD((prevStaste) => prevStaste === true ? false : true)
    }

    useEffect(() => {
        setTimeout(() => {
            {
                if (statusDD) {
                    statusRef.current.style.display = 'block';
                    statusDownRef.current.style.display = 'none'
                    statusUpRef.current.style.display = "inline"
                } else {
                    statusRef.current.style.display = 'none';
                    statusDownRef.current.style.display = 'inline'
                    statusUpRef.current.style.display = "none"
                }
            }
        }, 100)
    }, [statusDD])


    useEffect(() => {
        setTimeout(() => {
            if (manufacturerDD) {
                manufacturerRef.current.style.display = 'block';
                manufacturerDownRef.current.style.display = 'none'
                manufacturerUpRef.current.style.display = "inline"
            } else {
                manufacturerRef.current.style.display = 'none';
                manufacturerDownRef.current.style.display = 'inline'
                manufacturerUpRef.current.style.display = "none"
            }
        }, 100)
    }, [manufacturerDD])

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (categoryDD) {
    //             categoryRef.current.style.display = 'block';
    //             categoryDownRef.current.style.display = 'none'
    //             categoryUpRef.current.style.display = "inline"
    //         } else {
    //             categoryRef.current.style.display = 'none';
    //             categoryDownRef.current.style.display = 'inline'
    //             categoryUpRef.current.style.display = "none"
    //         }
    //     }, 100)
    // }, [categoryDD])

    useEffect(() => {
        setTimeout(() => {
            if (priceDD) {
                priceRef.current.style.display = 'block';
                priceDownRef.current.style.display = 'none'
                priceUpRef.current.style.display = "inline"
            } else {
                priceRef.current.style.display = 'none';
                priceDownRef.current.style.display = 'inline'
                priceUpRef.current.style.display = "none"
            }
        }, 100)
    }, [priceDD])

    useEffect(() => {
        setTimeout(() => {
            if (sizeDD) {
                sizeRef.current.style.display = 'block';
                sizeDownRef.current.style.display = 'none'
                sizeUpRef.current.style.display = "inline"
            } else {
                sizeRef.current.style.display = 'none';
                sizeDownRef.current.style.display = 'inline'
                sizeUpRef.current.style.display = "none"
            }
        }, 100)
    }, [sizeDD])

    useEffect(() => {
        setTimeout(() => {
            if (colorDD) {
                colorRef.current.style.display = 'block';
                colorDownRef.current.style.display = 'none'
                colorUpRef.current.style.display = "inline"
            } else {
                colorRef.current.style.display = 'none';
                colorDownRef.current.style.display = 'inline'
                colorUpRef.current.style.display = "none"
            }
        }, 100)
    }, [colorDD])

    // end dropDown


    const [selectedValues, setSelectedValues] = useState({}); // State to store selected values

    const handleLiClick = (value) => {
        if (selectedValues[value]) {
            // Remove value if already selected
            const updatedValues = { ...selectedValues };
            delete updatedValues[value];
            setSelectedValues(updatedValues);
        } else {
            // Add value if not selected
            setSelectedValues(prevValues => ({
                ...prevValues,
                [value]: true
            }));
        }
    };


    //  // ảnh
    //  const [listImg, setListImg] = useState([]);
    //  useEffect(() => {
    //      let list = [];
    //      if (mainProduct && mainProduct.images && Array.isArray(mainProduct.images)) {
    //          if (mainProduct.images.length > 0) {
    //              for (let i = 0; i < mainProduct.images.length; i++) {
    //                  let imageLink = window.location.origin + "/image/" + mainProduct.images[i]?.name;
    //                  list.push(imageLink);
    //              }
    //          }
    //          else {
    //              list = ["https://ananas.vn/wp-content/uploads/Pro_AV00174_1.jpeg",
    //                  "https://ananas.vn/wp-content/uploads/Pro_AV00174_2.jpeg",
    //                  "https://ananas.vn/wp-content/uploads/Pro_AV00174_3.jpeg",
    //                  "https://ananas.vn/wp-content/uploads/Pro_AV00174_4.jpeg",
    //                  "https://ananas.vn/wp-content/uploads/Pro_AV00174_5.jpeg",
    //                  "https://ananas.vn/wp-content/uploads/Pro_AV00174_6.jpeg",
    //                  "https://ananas.vn/wp-content/uploads/Pro_AV00174_7.jpeg",
    //                  "https://ananas.vn/wp-content/uploads/Pro_AV00174_8.jpeg",
    //                  "https://ananas.vn/wp-content/uploads/Pro_AV00174_9.jpeg"
    //              ]
    //          }
    //      } else {
    //          console.log("mainProduct.images is not available");
    //          list = ["https://ananas.vn/wp-content/uploads/Pro_AV00174_1.jpeg",
    //              "https://ananas.vn/wp-content/uploads/Pro_AV00174_2.jpeg",
    //              "https://ananas.vn/wp-content/uploads/Pro_AV00174_3.jpeg",
    //              "https://ananas.vn/wp-content/uploads/Pro_AV00174_4.jpeg",
    //              "https://ananas.vn/wp-content/uploads/Pro_AV00174_5.jpeg",
    //              "https://ananas.vn/wp-content/uploads/Pro_AV00174_6.jpeg",
    //              "https://ananas.vn/wp-content/uploads/Pro_AV00174_7.jpeg",
    //              "https://ananas.vn/wp-content/uploads/Pro_AV00174_8.jpeg",
    //              "https://ananas.vn/wp-content/uploads/Pro_AV00174_9.jpeg"
    //          ]
    //      }

    //      setListImg(list);
    //  }, [mainProduct]);

    return (
        <div className={clsx(style.container)}>
            <div className={clsx(style.left)}>

                <div className={clsx(style.type)}>
                    <ul >
                        <li className={clsx(style.mainType)}>TẤT CẢ</li>
                        {/* <li className={clsx(style.typeBorder, style.mainType)}>NAM</li>
                        <li className={clsx(style.mainType)}>NỮ</li> */}
                    </ul>

                    {/* <div className={clsx(style.typeItem)}>
                        <ul>
                            <li>Accessories | Phụ kiện</li>
                            <li>Footwear | Lên chân</li>
                            <li>Top | Nửa trên</li>
                        </ul>
                    </div> */}
                </div>

                <div className={clsx(style.status)}>
                    <button onClick={handleStatus}>
                        TRẠNG THÁI
                        <span ref={statusDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                        <span ref={statusUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                    </button>
                    <ul ref={statusRef}>
                        <li onClick={() => filterProductByIsSale()}>
                            Sale Off
                            {sort.is_on_promotion === 1 && <button><i className="fa-solid fa-xmark"></i></button>}
                        </li>
                        <li onClick={() => filterProductByIsBestSeller()}>
                            Best Seller
                            {sort.is_best_seller === 1 && <button><i className="fa-solid fa-xmark"></i></button>}
                        </li>
                        <li onClick={() => filterProductByIsNew()}>
                            New Arrival
                            {sort.is_new === 1 && <button><i className="fa-solid fa-xmark"></i></button>}
                        </li>
                    </ul>
                </div>

                {/* <div className={style.manufacturer}>
                    <button onClick={handleCategory}>
                        CATEGORY
                        <span ref={categoryDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                        <span ref={categoryUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                    </button>
                    <ul ref={categoryRef}>
                        <li onClick={() => handleLiClick('Nike')}>
                            Nike {selectedValues['Nike'] && <button><i className="fa-solid fa-xmark"></i></button>}
                        </li>
                        <li onClick={() => handleLiClick('Adidas')}>
                            Adidas {selectedValues['Adidas'] && <button><i className="fa-solid fa-xmark"></i></button>}
                        </li>
                    </ul>
                </div> */}

                <div className={style.manufacturer}>
                    <button onClick={handlemanufacturer}>
                        THƯƠNG HIỆU
                        <span ref={manufacturerDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                        <span ref={manufacturerUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                    </button>
                    <ul ref={manufacturerRef}>
                        {manufacturers?.map((item, index) => (
                            <li key={index} onClick={() => filterProductByManufacturer(item)}>
                                {item}
                                {sort.manufacturer === item && <button><i className="fa-solid fa-xmark"></i></button>}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={clsx(style.price)}>
                    <button onClick={handlePrice}>
                        GIÁ
                        <span ref={priceDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                        <span ref={priceUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                    </button>
                    <ul ref={priceRef}>
                        <li onClick={() => filterProductByPrice(600000, 99999999)}>
                            <input checked={(99999999 === sort.max_price) && (600000 === sort.min_price)} type='radio' name='priceFilter'></input> {'>'}
                            600k
                            {/* <button><i className="fa-solid fa-xmark"></i></button> */}
                            {/* {(99999999 === sort.max_price) && (600000 === sort.min_price) && <button><i className="fa-solid fa-xmark"></i></button>} */}
                        </li>
                        <li onClick={() => filterProductByPrice(500000, 599000)}>
                            <input checked={(599000 === sort.max_price) && (500000 === sort.min_price)} type='radio' name='priceFilter'></input> 500k - 599k
                        </li>
                        <li onClick={() => filterProductByPrice(400000, 499000)}>
                            <input checked={(499000 === sort.max_price) && (400000 === sort.min_price)} type='radio' name='priceFilter'></input> 400k - 499k
                        </li>
                        <li onClick={() => filterProductByPrice(300000, 399000)}>
                            <input checked={(399000 === sort.max_price) && (300000 === sort.min_price)} type='radio' name='priceFilter'></input> 300k - 399k
                        </li>
                        <li onClick={() => filterProductByPrice(200000, 299000)}>
                            <input checked={(299000 === sort.max_price) && (200000 === sort.min_price)} type='radio' name='priceFilter'></input> 200k - 299k
                        </li>
                        <li onClick={() => filterProductByPrice(0, 200000)}>
                            <input checked={(200000 === sort.max_price) && (0 === sort.min_price)} type='radio' name='priceFilter'></input> {'<'} 200k
                        </li>
                        <li>
                            <input
                                type='radio'
                                checked={isFilterProductByPriceInput}
                                onClick={() => handleFilterByPriceInput(!isFilterProductByPriceInput)}
                            />
                            <div className={style.inputGroup}>
                                <input value={filterMinPrice} onChange={(e) => setFilterMinPrice(e.target.value)} className={style.fromPrice} type='number' placeholder='Min' ></input>
                                <input value={filterMaxPrice} onChange={(e) => setFilterMaxPrice(e.target.value)} className={style.toPrice} type='number' placeholder='Max'></input>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={clsx(style.size)}>
                    <button onClick={handleSize}>
                        SIZE
                        <span ref={sizeDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                        <span ref={sizeUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                    </button>
                    <div ref={sizeRef} className={clsx(style.sizeItem)}>
                        <button className={`${35 === sort.size ? style.buttonSelected : ''}`} onClick={() => filterProductBySize(35)}>35</button>
                        <button className={`${36 === sort.size ? style.buttonSelected : ''}`} onClick={() => filterProductBySize(36)}>36</button>
                        <button className={`${37 === sort.size ? style.buttonSelected : ''}`} onClick={() => filterProductBySize(37)}>37</button>
                        <button className={`${38 === sort.size ? style.buttonSelected : ''}`} onClick={() => filterProductBySize(38)}>38</button>
                        <button className={`${39 === sort.size ? style.buttonSelected : ''}`} onClick={() => filterProductBySize(39)}>39</button>
                        <button className={`${40 === sort.size ? style.buttonSelected : ''}`} onClick={() => filterProductBySize(40)}>40</button>
                        <button className={`${41 === sort.size ? style.buttonSelected : ''}`} onClick={() => filterProductBySize(41)}>41</button>
                        <button className={`${42 === sort.size ? style.buttonSelected : ''}`} onClick={() => filterProductBySize(42)}>42</button>
                        <button className={`${43 === sort.size ? style.buttonSelected : ''}`} onClick={() => filterProductBySize(43)}>43</button>
                        <button className={`${44 === sort.size ? style.buttonSelected : ''}`} onClick={() => filterProductBySize(44)}>44</button>
                        <button className={`${45 === sort.size ? style.buttonSelected : ''}`} onClick={() => filterProductBySize(45)}>45</button>
                        <button className={`${46 === sort.size ? style.buttonSelected : ''}`} onClick={() => filterProductBySize(46)}>46</button>
                    </div>
                </div>

                <div className={clsx(style.color)}>
                    <button onClick={handleColor}>
                        MÀU SẮC
                        <span ref={colorDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                        <span ref={colorUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                    </button>
                    <div className={clsx(style.colorItem)} ref={colorRef}>
                        {colors?.data?.map((item, index) =>
                            <button className={`${item.name === sort.color ? style.buttonSelected : ''}`} onClick={() => filterProductByColor(item.name)} key={index} style={{ backgroundColor: '#' + item.id }}></button>)}
                    </div>
                </div>


            </div>

            <div className={clsx(style.right)}>

                <div className={clsx(style.banner)}>
                    <img src="https://ananas.vn/wp-content/uploads/desktop_productlist.jpg"></img>
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

export default SanPham;