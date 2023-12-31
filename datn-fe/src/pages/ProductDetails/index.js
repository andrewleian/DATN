import { useRef, useState, useEffect, useContext } from "react"
import { Link, json, parsePath, useLocation, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx';
import style from './ProductDetails.module.scss'
import routes from "../../config/routes.js"
import { StoreContext, actions } from '../../store'
import { TextField } from "@mui/material";

import Modal from 'react-modal';
function ProductDetails() {
    Modal.setAppElement('#root');
    const navigate = useNavigate();
    const role = JSON.parse(localStorage.getItem('role'))
    const token = JSON.parse(localStorage.getItem('token'))
    const [state, dispatch] = useContext(StoreContext)
    // fake api

    const id = 1;
    const products1 = [
        {
            img: ["https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00167_3.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00167_4.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00167_5.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00167_6.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00167_7.jpeg"
            ],
            status: "New Arrival",
            name: "Urbas Corluray Mix - High Top",
            color: "Corluray Mix",
            price: 650000
        },
        {
            img: ["https://ananas.vn/wp-content/uploads/Pro_AV00174_1.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00174_2.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00174_3.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00174_4.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00174_5.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00174_6.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00174_7.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00174_8.jpeg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00174_9.jpeg"
            ],
            status: "",
            name: "Vintas Jazico - High Top",
            color: "Royal White",
            price: 780000
        },
        {
            img: ["https://ananas.vn/wp-content/uploads/Lgbt1080-1.jpg",
                "https://ananas.vn/wp-content/uploads/Lgbt97222-1.jpg",
                "https://ananas.vn/wp-content/uploads/Lgbt0029-1.jpg",
                "https://ananas.vn/wp-content/uploads/Lgbt0051-1.jpg",
                "https://ananas.vn/wp-content/uploads/Lgbt3138-1.jpg",
                "https://ananas.vn/wp-content/uploads/Lgbt2107-1.jpg",
                "https://ananas.vn/wp-content/uploads/Lgbt3139-1.jpg"
            ],
            status: "Limited Edition",
            name: "Urbas Love+ 22 - High Top",
            color: "Rustic",
            price: 850000
        },
        {
            img: ["https://ananas.vn/wp-content/uploads/Pro_AV00200_1.jpg",
                "hhttps://ananas.vn/wp-content/uploads/Pro_AV00200_2.jpg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00200_3.jpg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00200_4.jpg",
                "https://ananas.vn/wp-content/uploads/Pro_AV00200_5.jpg"
            ],
            status: "",
            name: "Urbas SC - Mule ",
            color: "Cornsilk",
            price: 580000
        }

    ]


    // api
    const { productId, colorName } = useParams();
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState({ pageNumber: 0, pageSize: 99999 })
    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const [responseAllProducts] = await Promise.all([
                    axios.get(`http://localhost:8080/api/v1/list-products?pageSize=${sort.pageSize}&pageNumber=${sort.pageNumber}`) // check
                ]);
                setAllProducts(responseAllProducts.data.content)
            } catch (error) {
                console.log(error);
            }
        }

        getProductDetails();
    }, [])

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const [responseProducts] = await Promise.all([
                    axios.get(`http://localhost:8080/api/v1/product-detail/${productId}`),
                ]);
                setProducts(responseProducts.data)
            } catch (error) {
                console.log(error);
            }
        }

        getProductDetails();
    }, [productId]) // truoc la productName

    // viewed products
    const [viewedProduct, setViewedProduct] = useState(() => {
        const storedData = localStorage.getItem('viewedProducts');
        return storedData ? JSON.parse(storedData) : [];
    });
    useEffect(() => {
        if (products[0]) {
            const check = viewedProduct.some(item => products[0].name === item.name && colorName === item.colorName);
            if (!check) {
                setViewedProduct(prevState => [...prevState, { name: products[0].name, colorName: colorName }])
            }
        }
    }, [products])

    useEffect(() => {
        localStorage.setItem('viewedProducts', JSON.stringify(viewedProduct));
    }, [viewedProduct]);

    const filteredViewedProducts = allProducts?.filter((product) =>
        viewedProduct.some(item => product.name == item.name && item.colorName == product.colorDTO.name)
    );

    // color

    const [color, setColor] = useState(colorName);
    const [mainProduct, setMainProduct] = useState({});
    const handleSetColor = (newName) => {
        setColor(newName);
    }


    useEffect(() => {
        const newMainProduct = products.filter((item) => {
            return item.colorDTO.name === color;
        })
        if (newMainProduct) {
            setMainProduct(newMainProduct[0])
        }
    }, [color, products])

    // update page
    useEffect(() => {
        handleSetColor(colorName)
    }, [colorName])



    // size
    const [sizeSelected, setSizeSelected] = useState(false)
    const [sizePurchase, setSizePurchase] = useState("");
    const [valueBySize, setValueBySize] = useState(0);
    const [idProductDetail, setIdProductDetail] = useState(0);
    const [quantityPurchase, setQuantityPurchase] = useState(0);

    const handleSizePurchase = (size) => {
        const selectedSize = mainProduct.sizeProductDetailDTOS.find(item => item.name === size);
        if (selectedSize) {
            setValueBySize(selectedSize.amount);
            setIdProductDetail(selectedSize.idProductDetail)
        }
        setQuantityPurchase(1)
        setSizePurchase(parseInt(size))
        setSizeSelected(true)
        setValidate("");
        setSizeDropDown(false)
    }
    // quantity
    const handleKeyDown = (event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            setQuantityPurchase('');
        }
    };

    const handleQuantityPurchase = (number) => {
        const existingCartItemIndex = cart.findIndex(
            (item) => item.id === mainProduct.id && item.size === sizePurchase && item.colorName === color
        );
        let restQuantity = 0;
        if (existingCartItemIndex != -1) {
            restQuantity = valueBySize - cart[existingCartItemIndex].quantity;
            if (parseInt(number) > restQuantity) {
                setValidate("Bạn chỉ có thể thêm tối đa " + restQuantity + " sản phẩm vào giỏ hàng")
            } else {
                setValidate("")
            }
        }

        if (parseInt(number) <= valueBySize && parseInt(number) >= 0) {
            setQuantityPurchase(parseInt(number))
            setValidate("")
        }
    }

    const handleIncreaseQuantity = () => {
        const existingCartItemIndex = cart.findIndex(
            (item) => item.id === mainProduct.id && item.size === sizePurchase && item.colorName === color
        );
        let restQuantity = 0;
        if (existingCartItemIndex != -1) {
            restQuantity = valueBySize - cart[existingCartItemIndex].quantity;
            if (quantityPurchase + 1 > restQuantity) {
                setValidate("Bạn chỉ có thể thêm tối đa " + restQuantity + " sản phẩm vào giỏ hàng")
            } else {
                setValidate("")
            }
        }

        if (quantityPurchase + 1 <= valueBySize && quantityPurchase + 1 >= 0) {
            setQuantityPurchase((prevState) => prevState + 1)
            setValidate("")
        }
    }

    const handleDecreaseQuantity = () => {
        const existingCartItemIndex = cart.findIndex(
            (item) => item.id === mainProduct.id && item.size === sizePurchase && item.colorName === color
        );
        let restQuantity = 0;
        if (existingCartItemIndex != -1) {
            restQuantity = valueBySize - cart[existingCartItemIndex].quantity;
            if (quantityPurchase - 1 > restQuantity) {
                setValidate("Bạn chỉ có thể thêm tối đa " + restQuantity + " sản phẩm vào giỏ hàng")
            } else {
                setValidate("")
            }
        }

        if (quantityPurchase - 1 <= valueBySize && quantityPurchase - 1 >= 0) {
            setQuantityPurchase((prevState) => prevState - 1)
            setValidate("")
        }
    }



    // validate
    const [validate, setValidate] = useState("");
    // xử lý mua hàng



    //cart
    const getCartApi = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const [responseCartProducts] = await Promise.all([
                axios.get(`http://localhost:8080/api/v1/customer/cartdetail`)
            ]);
            setCart(responseCartProducts.data)
        } catch (error) {
            console.log(error);
        }
    }

    const [cart, setCart] = useState([]);
    useEffect(() => {
        if (role === "CUSTOMER") {
            getCartApi();
        } else {
            const storageCart = JSON.parse(localStorage.getItem('cart'))
            setCart(storageCart ?? [])
        }
    }, [])


    useEffect(() => {
        dispatch(actions.setCartTotalItems(cart.length))
    }, [cart])

    const addToCartApi = async () => {
        const cartDetailDTO = {
            productDetailId: idProductDetail,
            amount: quantityPurchase,
        }
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const [addToCart] = await Promise.all([
                axios.post(`http://localhost:8080/api/v1/customer/cartdetail/addtocart`, cartDetailDTO)
            ]);
            setMessage("Thêm vào giỏ hàng thành công")
            // setIsDisplayNotification(true)
            setIsModalMsgOpen(true)
            // setCart(responseCartProducts.data)
        } catch (error) {
            console.log(error);
        }
    }

    const addToCart = (btn) => {
        if (!sizeSelected) {
            setValidate("Vui lòng chọn size");
            return;
        }

        if (quantityPurchase === "" || quantityPurchase === 0) {
            setValidate("Số lượng tối thiểu phải là 1");
            return;
        }

        const existingCartItemIndex = cart.findIndex(
            (item) => item.idProductDetail == idProductDetail
        );

        let restQuantity = valueBySize;
        if (existingCartItemIndex != -1) {
            restQuantity = valueBySize - cart[existingCartItemIndex].amount;
            if (quantityPurchase > restQuantity) {
                setValidate("Bạn chỉ có thể thêm tối đa " + restQuantity + " sản phẩm vào giỏ hàng")
            } else {
                setValidate("")
            }
        }

        if (restQuantity >= quantityPurchase) {

            setCart((prevState) => {

                var newCart;
                if (existingCartItemIndex !== -1) {
                    newCart = [...prevState];
                    newCart[existingCartItemIndex].amount += quantityPurchase;
                    // localStorage.removeItem("cart")

                    if (role === "CUSTOMER") {
                        addToCartApi();
                        // getCartApi();
                    } else {
                        setMessage("Thêm vào giỏ hàng thành công")
                        setIsModalMsgOpen(true)
                        localStorage.setItem("cart", JSON.stringify(newCart))
                    }
                } else {

                    newCart = [...prevState,
                    {
                        idProductDetail: idProductDetail,
                        idProducCls: mainProduct.id,
                        amount: quantityPurchase,
                        sizeName: sizePurchase,
                        images: mainProduct.images[0].name,
                        maxAmount: valueBySize,
                        price: mainProduct.price,
                        productName: mainProduct.name,
                        colorName: color,
                        sizes: mainProduct.sizeProductDetailDTOS,
                        promotionValue: mainProduct.promotionValue
                    },];
                    if (role === "CUSTOMER") {
                        addToCartApi();
                        // getCartApi();
                    } else {
                        setMessage("Thêm vào giỏ hàng thành công")
                        setIsModalMsgOpen(true)
                        localStorage.setItem("cart", JSON.stringify(newCart))
                    }

                }
                //redirect

                setIsModalMsgOpen(true)
                if (btn == 'checkout') {
                    navigate('/cart');
                }
                return newCart;
            })

        }



    }

    //scroll top
    const scrollToTop = () => {
        window.scrollTo({
            top: 150,
            behavior: "smooth"
        });
    };




    // carousel  // khi có api thì check lại handleNextSlideVP,RP handlePrevSlideVP,RP


    // const carouselItemVPRef = useRef();    // viewed product . khi muốn dùng thì uncomment đoạn này
    // const [slideVPIndex, setSlideVPIndex] = useState(0);

    // const handleNextSlideVP = () => {
    //     setSlideVPIndex(prevState => prevState >= filteredViewedProducts.length - 4 ? prevState : prevState + 1);
    // }

    // const handlePrevSlideVP = () => {
    //     setSlideVPIndex(prevState => prevState === 0 ? prevState : prevState - 1);
    // }

    // useEffect(() => {
    //     carouselItemVPRef.current.style.transform = `translateX(-${slideVPIndex * 100}%)`
    // }, [slideVPIndex])

    //

    // const carouselItemRPRef = useRef();
    // const [slideRPIndex, setSlideRPIndex] = useState(0);

    // const handleNextSlideRP = () => {
    //     setSlideRPIndex(prevState => prevState >= allProducts.length - 4 ? prevState : prevState + 1);
    // }

    // const handlePrevSlideRP = () => {
    //     setSlideRPIndex(prevState => prevState === 0 ? prevState : prevState - 1);
    // }

    // useEffect(() => {
    //     carouselItemRPRef.current.style.transform = `translateX(-${slideRPIndex * 100}%)`
    // }, [slideRPIndex])

    //



    // end carousel



    //tab cmt
    const additionalInforRef = useRef();
    const commentRef = useRef();
    const shippingRef = useRef();

    const [additionalInfor, setAdditionalInfor] = useState(false);
    const [comment, setComment] = useState(true);
    const [shipping, setShipping] = useState(false);

    const handleAdditionalInfor = () => {
        setAdditionalInfor(prevState => !prevState)
    }

    const handleComment = () => {
        setComment(prevState => !prevState)
    }

    const handleShipping = () => {
        setShipping(prevState => !prevState)
    }

    useEffect(() => {
        if (shipping) {
            shippingRef.current.style.display = 'block';
            additionalInforRef.current.style.display = 'none';
            commentRef.current.style.display = 'none';
        }

    }, [shipping])

    useEffect(() => {

        if (additionalInfor) {
            additionalInforRef.current.style.display = 'block';
            commentRef.current.style.display = 'none';
            shippingRef.current.style.display = 'none';
        }

    }, [additionalInfor])

    useEffect(() => {
        if (comment) {
            commentRef.current.style.display = 'block';
            additionalInforRef.current.style.display = 'none';
            shippingRef.current.style.display = 'none';
        }

    }, [comment])

    //end tab cmt

    // comment
    const [commentInfor, setCommentInfor] = useState({
        id: -1,
        content: "",
        createAt: "",
        updateAt: "",
        status: "",
        idCustomer: "",
        nameCustomer: "",
        idProduct: ""
    });

    // drop down
    const detailInforRef = useRef();
    const detailInforDRef = useRef();
    const detailInforURef = useRef();
    const returnPolicyRef = useRef();
    const returnPolicyDRef = useRef();
    const returnPolicyURef = useRef();
    const guaranteeRef = useRef();
    const guaranteeDRef = useRef();
    const guaranteeURef = useRef();
    const sizeRef = useRef();

    const [sizeDropDown, setSizeDropDown] = useState(false);
    const [detailInfor, setDetailInfor] = useState(true);
    const [returnPolicy, setReturnPolicy] = useState(false);
    const [guarantee, setGuarantee] = useState(false);

    const handleSizeDropDown = () => {
        setSizeDropDown(prevState => prevState === false ? true : false)
    }

    const handleDetailInfor = () => {
        setDetailInfor(prevState => prevState === false ? true : false)
    }

    const handleReturnPolicy = () => {
        setReturnPolicy(prevState => prevState === false ? true : false)
    }

    const handleGuarantee = () => {
        setGuarantee(prevState => prevState === false ? true : false)
    }

    useEffect(() => {
        setTimeout(() => {
            const displayValue = sizeDropDown ? 'block' : 'none';
            if (sizeRef.current) {
                sizeRef.current.style.display = displayValue;
            }
        }, 100);
    }, [sizeDropDown]);

    useEffect(() => {
        setTimeout(() => {
            const displayValue = detailInfor ? 'block' : 'none';
            if (detailInforRef.current) {
                detailInforRef.current.style.display = displayValue;
                detailInforDRef.current.style.display = detailInfor ? 'none' : 'inline';
                detailInforURef.current.style.display = detailInfor ? 'inline' : 'none';
            }
        }, 100);
    }, [detailInfor]);

    useEffect(() => {
        setTimeout(() => {
            const displayValue = returnPolicy ? 'block' : 'none';
            if (returnPolicyRef.current) {
                returnPolicyRef.current.style.display = displayValue;
                returnPolicyDRef.current.style.display = returnPolicy ? 'none' : 'inline';
                returnPolicyURef.current.style.display = returnPolicy ? 'inline' : 'none';
            }
        }, 100);
    }, [returnPolicy]);


    useEffect(() => {
        setTimeout(() => {
            const displayValue = guarantee ? 'block' : 'none';
            if (guaranteeRef.current) {
                guaranteeRef.current.style.display = displayValue;
                guaranteeDRef.current.style.display = guarantee ? 'none' : 'inline';
                guaranteeURef.current.style.display = guarantee ? 'inline' : 'none';
            }
        }, 100);
    }, [guarantee]);


    //end dropDown

    // // display notification
    // const displayNotification = useRef();
    // const [isDisplayNotification, setIsDisplayNotification] = useState(false)

    // useEffect(() => {
    //     if (isDisplayNotification) {
    //         displayNotification.current.style.display = 'block'
    //     } else {
    //         displayNotification.current.style.display = 'none'
    //     }
    // }, [isDisplayNotification])

    // modal message
    const [message, setMessage] = useState("")
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);
    const handleOpenModalMsg = () => {
        setIsModalMsgOpen(true);
    };

    const handleCloseModalMsg = () => {
        setIsModalMsgOpen(false);
        // loadAndResetData();
    };


    // message thông báo
    // const [message, setMessage] = useState("");

    //comment 
    const [inputCmt, setInputCmt] = useState("")
    const [listCmt, setListCmt] = useState({
        data: [],
        current_page: 0,
        total_page: 0,
        total_item: 0,
        size: 10
    });
    // get all cmt
    const getAllCmt = async () => {
        try {
            delete axios.defaults.headers.common['Authorization'];
            const [response] = await Promise.all([
                axios.get(`http://localhost:8080/api/v1/comment/get-list/${productId}`)
            ]);
            setListCmt(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllCmt()
    }, [])

    // add cmt
    const addCmt = async () => {
        let valid = true
        const checkLogin = () => {
            if (role != "CUSTOMER") {
                dispatch(actions.setIsLogin(true))
                valid = false
            }
        }
        checkLogin();
        if (valid) {
            if (inputCmt.trim().length < 1) {
                setMessage("Vui lòng nhập comment")
                setIsModalMsgOpen(true)
                return;
            }

            let commentDTO = {
                content: inputCmt,
                idProduct: productId
            }
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const [response] = await Promise.all([
                    axios.post(`http://localhost:8080/api/v1/customer/comment/add`, commentDTO)
                ]);
                setMessage("Comment thành công")
                setIsModalMsgOpen(true)
                setInputCmt("");
                getAllCmt();
            } catch (error) {
                setMessage(error.response.data)
                setIsModalMsgOpen(true)
                console.log(error);
            }
        }
    }


    // ảnh
    const [listImg, setListImg] = useState([]);
    useEffect(() => {
        let list = [];
        if (mainProduct && mainProduct.images && Array.isArray(mainProduct.images)) {
            if (mainProduct.images.length > 0) {
                for (let i = 0; i < mainProduct.images.length; i++) {
                    let imageLink = window.location.origin + "/image/" + mainProduct.images[i]?.name;
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

        setListImg(list);
    }, [mainProduct]);

    // carousel ảnh 

    const carouselItemPDRef = useRef();
    const [slidePDIndex, setSlidePDIndex] = useState(0);

    const handleNextSlidePD = () => {
        if (slidePDIndex !== listImg.length - 4 && listImg.length - 4 >= 0) {
            setSlidePDIndex(prevState => prevState + 1);
        }
    }

    const handlePrevSlidePD = () => {
        setSlidePDIndex(prevState => prevState === 0 ? prevState : prevState - 1);
    }

    useEffect(() => {
        carouselItemPDRef.current.style.transform = `translateX(-${slidePDIndex * 100}%)`
    }, [slidePDIndex])

    const [mainImgPD, setMainImgPD] = useState(0);
    const handleSetMainImgPD = (index) => {
        setMainImgPD(index);
    }

    // zoom img
    const lightbox = useRef();
    const [isZoom, setIsZoom] = useState(false);

    function handleLightBox() {
        document.body.style.overflow = "hidden";
        setIsZoom(prevState => prevState === true ? false : true)
    }

    useEffect(() => {
        if (isZoom) {
            lightbox.current.style.display = 'block'
        } else {
            document.body.style.overflow = "auto";
            lightbox.current.style.display = 'none'
        }
    }, [isZoom])

    const [mainImgLB, setMainImgLB] = useState(0);
    const handleSetMainImgLB = (index) => {
        setMainImgLB(index);
    }

    return (
        <div className={style.container}>
            {mainProduct &&
                <div className={style.productDetails}>
                    <div className={style.row1}>
                        <ul>
                            <li className={style.row1FirstLi}>Giày</li>
                            <li className={style.row1SecondLi}>{mainProduct.manufacturer}</li>
                            <li className={style.row1ThirdLi}>{mainProduct.name}</li>
                        </ul>
                    </div>

                    <div className={style.row2}>

                        <div className={style.col1}>
                            <div className={style.mainImg}>
                                {/* <img onClick={handleLightBox} className={clsx(style.zoomable)} src={products1[1].img[mainImgPD]}></img> */}
                                <img onClick={handleLightBox} className={clsx(style.zoomable)} src={listImg[mainImgPD]}></img>
                            </div>

                            <div ref={lightbox} className={clsx(style.lightbox)}>
                                <img className={clsx(style.zoomed)} src={listImg[mainImgLB]}></img>

                                <div className={clsx(style.carouselLB)}>
                                    {listImg.map((img, index) =>
                                        <div key={index} className={style.carouselImgLB}>
                                            <img onClick={() => handleSetMainImgLB(index)} src={img} alt="Ảnh" />
                                        </div>
                                    )}
                                </div>

                                <div className={clsx(style.exit)}>
                                    <button onClick={handleLightBox}><i className="fa-sharp fa-solid fa-xmark"></i></button>
                                </div>
                            </div>

                            <div className={style.carouselPD} >
                                <div ref={carouselItemPDRef} className={style.carouselInnerPD}>
                                    {listImg.map((img, index) => {
                                        return (
                                            <div key={index} className={style.carouselItemPD}>
                                                <img onClick={() => handleSetMainImgPD(index)} src={img} alt="Ảnh" />
                                            </div>
                                        )
                                    })}
                                </div>

                                <button className={clsx(style.btnLeftPD)} onClick={handlePrevSlidePD}><i className="fa-solid fa-angle-left"></i></button>
                                <button className={style.btnRightPD} onClick={handleNextSlidePD}><i className="fa-solid fa-angle-right"></i></button>
                            </div>



                        </div>

                        <div className={style.col2}>
                            <div className={style.productName}>
                                <p>{mainProduct.name?.toUpperCase() + " - " + mainProduct.colorDTO?.name?.toUpperCase()}</p>
                            </div>

                            <div className={style.row}>
                                <p className={style.productCode}>Mã sản phẩm: <span>AV00155</span></p>
                                {mainProduct.isNew != 0 && <p className={style.productStatus}>Tình trạng: <span>New Arrival</span></p>}
                                {mainProduct.isBestSeller != 0 && <p className={style.productStatus}>Tình trạng: <span>Best Seller</span></p>}
                            </div>

                            <div className={style.productPrice}>
                                {mainProduct.promotionValue > 0 &&
                                    <div className={style.promotion}>
                                        <p className={clsx(style.promotionalPrice)}>{(mainProduct?.price * (1 - mainProduct.promotionValue)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                        <p className={clsx(style.realPrice)}>{mainProduct?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                }
                                {mainProduct.promotionValue === 0 && <p>{mainProduct.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>}
                            </div>

                            <div className={clsx(style.productColors)}>
                                {products.map((item, index) => <button onClick={() => handleSetColor(item.colorDTO.name)} key={index} style={{ backgroundColor: '#' + item.colorDTO.id }}></button>)}
                            </div>

                            <div className={style.rowSizeQuantity}>

                                {/* <div className={style.row}> */}

                                {/* <div className={style.size}>
                                    <label>SIZE</label>
                                    <button onClick={handleSizeDropDown}>
                                        <span className={style.left}>{sizePurchase}</span>
                                        <span className={style.right}><i className="fa-solid fa-angle-down"></i></span>
                                    </button>
                                    <div ref={sizeRef} className={clsx(style.sizeItem)}>
                                        <div className={clsx(style.pading)}>
                                            {mainProduct.sizeProductDetailDTOS?.map((s, index) => <button key={index} onClick={(event) => handleSizePurchase(s.name)}>{s.name}</button>)}
                                        </div>
                                    </div>
                                </div> */}

                                <div className={style.size}>
                                    <label>SIZE</label>
                                    <div className={style.btns}>
                                        {mainProduct.sizeProductDetailDTOS?.length > 0 ?
                                            (mainProduct.sizeProductDetailDTOS?.map((s, index) => <button key={index} onClick={(event) => handleSizePurchase(s.name)} className={sizePurchase == s.name ? style.selectedSize : ""} >{s.name}</button>))
                                            :
                                            <p className={style.outOfSize}>Hết size</p>
                                        }
                                    </div>
                                </div>
                                {validate == "Vui lòng chọn size" && <p className={clsx(style.validate)}>{validate}</p>}

                                <div className={style.quantity}>
                                    <label>SỐ LƯỢNG</label>
                                    <div className={style.row}>
                                        <div className={style.quantityItem}>
                                            <button onClick={handleDecreaseQuantity}>-</button>
                                            <input type="number" value={quantityPurchase} onChange={(e) => handleQuantityPurchase(e.target.value)} onKeyDown={handleKeyDown}></input>
                                            <button onClick={handleIncreaseQuantity}>+</button>
                                        </div>
                                        <br></br>
                                        <div className={style.restQuantity}>
                                            <p>{valueBySize} sản phẩm có sẵn</p>
                                        </div>
                                    </div>
                                </div>
                                {validate !== "Vui lòng chọn size" && <p className={clsx(style.validate)}>{validate}</p>}

                            </div>

                            <div className={style.row}>
                                <div className={style.addToCart}>
                                    <button onClick={() => addToCart('addToCart')}>THÊM VÀO GIỎ HÀNG</button>
                                </div>

                                {/* <div className={style.favorite}>
                                    <button><i className="fa-regular fa-heart"></i></button>
                                </div> */}
                            </div>

                            <div className={style.pay}>
                                <button onClick={() => addToCart('checkout')}>THANH TOÁN</button>
                            </div>



                            <div className={clsx(style.detailInfor)}>
                                <button onClick={handleDetailInfor}>
                                    HƯỚNG DẪN CHỌN SIZE
                                    <span ref={detailInforDRef}> <i className="fa-solid fa-angle-down"></i></span>
                                    <span ref={detailInforURef}> <i className="fa-solid fa-angle-up"></i></span>
                                </button>
                                <div ref={detailInforRef} className={clsx(style.detailInforItem)}>
                                    {/* <p>Gender: Unisex</p>
                                    <p>Size run: 35 - 46</p>
                                    <p>Upper: Corduroy</p>
                                    <p>Outsole: Rubber</p> */}
                                    <img src='https://ananas.vn/wp-content/uploads/Size-chart-1-e1559209680920.jpg'></img>
                                </div>
                            </div>

                            <div className={clsx(style.returnPolicy)}>
                                <button onClick={handleReturnPolicy}>
                                    QUY ĐỊNH ĐỔI SẢN PHẨM
                                    <span ref={returnPolicyDRef}> <i className="fa-solid fa-angle-down"></i></span>
                                    <span ref={returnPolicyURef}> <i className="fa-solid fa-angle-up"></i></span>
                                </button>
                                <div ref={returnPolicyRef} className={clsx(style.detailInforItem)}>
                                    <ul>
                                        <li>Chỉ đổi hàng 1 lần duy nhất, mong bạn cân nhắc kĩ trước khi quyết định.</li>
                                        <li>Thời hạn đổi sản phẩm khi mua trực tiếp tại cửa hàng là 07 ngày, kể từ ngày mua. Đổi sản phẩm khi mua online là 14 ngày, kể từ ngày nhận hàng.</li>
                                        <li>Sản phẩm đổi phải kèm hóa đơn. Bắt buộc phải còn nguyên tem, hộp, nhãn mác.</li>
                                        <li>Sản phẩm đổi không có dấu hiệu đã qua sử dụng, không giặt tẩy, bám bẩn, biến dạng.</li>
                                        <li>Ananas chỉ ưu tiên hỗ trợ đổi size. Trong trường hợp sản phẩm hết size cần đổi, bạn có thể đổi sang 01 sản phẩm khác:
                                            - Nếu sản phẩm muốn đổi ngang giá trị hoặc có giá trị cao hơn, bạn sẽ cần bù khoảng chênh lệch tại thời điểm đổi (nếu có).
                                            - Nếu bạn mong muốn đổi sản phẩm có giá trị thấp hơn, chúng tôi sẽ không hoàn lại tiền.</li>
                                        <li>Trong trường hợp sản phẩm - size bạn muốn đổi không còn hàng trong hệ thống. Vui lòng chọn sản phẩm khác.</li>
                                        <li>Không hoàn trả bằng tiền mặt dù bất cứ trong trường hợp nào. Mong bạn thông cảm.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={clsx(style.guarantee)}>
                                <button onClick={handleGuarantee}>
                                    BẢO HÀNH THẾ NÀO ?
                                    <span ref={guaranteeDRef}> <i className="fa-solid fa-angle-down"></i></span>
                                    <span ref={guaranteeURef}> <i className="fa-solid fa-angle-up"></i></span>
                                </button>
                                <div ref={guaranteeRef} className={clsx(style.detailInforItem)}>
                                    <p>Mỗi đôi giày Ananas trước khi xuất xưởng đều trải qua nhiều khâu kiểm tra. Tuy vậy, trong quá trình sử dụng, nếu nhận thấy các lỗi: gãy đế, hở đế, đứt chỉ may,...trong thời gian 6 tháng từ ngày mua hàng, mong bạn sớm gửi sản phẩm về Ananas nhằm giúp chúng tôi có cơ hội phục vụ bạn tốt hơn. Vui lòng gửi sản phẩm về bất kỳ cửa hàng Ananas nào, hoặc gửi đến trung tâm bảo hành Ananas ngay trong trung tâm TP.HCM trong giờ hành chính:</p>
                                    <p>Địa chỉ: 170-172, Đinh Bộ Lĩnh, P.26 , Q.Bình Thạnh, TP.HCM
                                        Hotline: 028 2211 0067</p>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            }

            <div className={style.border}></div>

            <div className={style.commentArea}>

                <div className={style.tabBtn}>
                    <button onClick={handleAdditionalInfor}>Thông tin bổ sung</button>
                    <button onClick={handleComment}>Đánh giá (0)</button>
                    <button onClick={handleShipping}>Vận chuyển & Giao hàng</button>
                </div>

                <div ref={additionalInforRef}>
                    <div className={style.additionalInfor}>
                        <div className={style.title}><p>Thông tin bổ sung</p></div>
                        <div className={style.item}>
                            <p className={style.col1}>Nhà sản xuất</p>
                            <p>{mainProduct?.manufacturer}</p>
                        </div>

                        <div className={style.item}>
                            <p className={style.col1}>Size</p>
                            {mainProduct?.sizeProductDetailDTOS?.length > 0 ? (
                                <p>{mainProduct.sizeProductDetailDTOS.map(item => item.name).join(',')}</p>
                            ) : (
                                <p>Hết hàng</p>
                            )}
                        </div>

                    </div>
                </div>

                <div ref={commentRef}>
                    <div className={style.comment}>
                        <div className={style.col1}>
                            <div className={style.title}><p>Đánh giá</p></div>
                            {/* <div className={style.item}><p>Chưa có đánh giá nào</p></div> */}
                            {listCmt.data.length < 1 && <div className={style.item}><p>Chưa có đánh giá nào</p></div>}
                            <div className={style.row}>

                                <div className={style.dFlex}>
                                    <div className={style.card}>

                                        {listCmt.data.map((item, index) => {
                                            return (
                                                <div key={index} className={style.mainComment}>
                                                    <div className={style.dFlex}>
                                                        <p className={style.name}>
                                                            {item.nameCustomer} <span>- 2 hours ago</span>
                                                        </p>

                                                        <p className={style.reply}><i className="fa-solid fa-reply"></i> reply</p>
                                                    </div>
                                                    <p className={style.text}>
                                                        {item.content}
                                                    </p>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={style.col2}>

                            {!listCmt.data || listCmt.data.length < 1 ? (
                                <div className={style.title}>
                                    <p>Hãy là người đầu tiên nhận xét "{mainProduct?.name}"</p>
                                </div>
                            ) : (
                                <div className={style.title}>
                                    <p>Nhận xét sản phẩm "{mainProduct?.name}"</p>
                                </div>
                            )}

                            {/* <div className={style.title}><p>Hãy là người đầu tiên nhận xét "{mainProduct?.name}"</p></div> */}
                            <div className={style.item}>
                                <p className={style.col1}>Đánh giá của bạn * :</p>
                                <p>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </p>
                            </div>
                            <div className={style.itemEvaluate}>
                                <p className={style.col1}>Nhận xét của bạn * :</p>
                                <textarea value={inputCmt} onChange={(e) => setInputCmt(e.target.value)}></textarea>
                                <button onClick={addCmt}>GỬI ĐI</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={shippingRef} className={style.shippingContainer}>
                    <div className={style.shipping}>
                        <div className={style.col1}>
                            <img src="https://suno.vn/wp-content/uploads/2019/09/shipper.png"></img>
                        </div>
                        <div className={style.col2}>
                            <p>Sản xuất nhà chăm sóc xoắn ốc bây giờ diam dui ante tiện lợi bậc đại học thung lũng vocābulum ante ante a. Nhân viên đình chỉ cảm giác nibh nhiệt ante đã tốt nghiệp đại học cho một Cục sản xuất và một cuộc đói kém ròng.</p>
                            <p>Vestibulum parturient suspendisse parturient a.Parturient in parturient scelerisque nibh lectus quam a natoque adipiscing a vestibulum hendrerit et pharetra fames.Consequat netus.</p>
                            <p>Sinh viên đại học uống sô cô la trên một sản xuất truyền hình và tốt nghiệp từ vị ớt tincidunt ớt tốt nghiệp từ eros. Người chơi lớp học và con chuột ullamcorper chính tả và yếu tố đáng buồn của trò chơi cá cược này cho người mới bắt đầu</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className={style.border}></div>

            <div className={style.test}>

                {/* <div className={style.relatedProducts}>
                    <p className={style.title}>SẢN PHẨM LIÊN QUAN</p>
                    <div className={style.carouselRP}>
                        <button className={clsx(style.btnLeftRP)} onClick={handlePrevSlideRP}><i className="fa-solid fa-angle-left"></i></button>
                        <button className={style.btnRightRP} onClick={handleNextSlideRP}><i className="fa-solid fa-angle-right"></i></button>
                        <div ref={carouselItemRPRef} className={style.carouselRPInner}>

                            {allProducts?.map((item, index) => {
                                return <div key={index} className={style.carouselRPItem}>
                                    <div className={clsx(style.RPitem)}>
                                        <Link to={`/productDetails/${item.name}/${item.colorDTO.name}`} onClick={scrollToTop}>
                                            <img src={products1[0].img[0]}></img>
                                        </Link>
                                        <Link to={`/productDetails/${item.name}/${item.colorDTO.name}`} onClick={scrollToTop} className={style.link}>
                                            <p className={clsx(style.productName)}>{item.name}</p>
                                        </Link>
                                        <p className={clsx(style.productColor)}>{item.colorDTO.name}</p>
                                        <p className={clsx(style.productPrice)}>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                </div>
                            })}

                        </div>



                    </div>
                </div> */}

            </div>

            {/* <div className={style.border}></div> */}

            {/* <div className={style.viewedProducts}>
                <p className={style.title}>SẢN PHẨM ĐÃ XEM</p>
                <div className={style.carouselVP}>
                    <button className={clsx(style.btnLeftVP)} onClick={handlePrevSlideVP}><i className="fa-solid fa-angle-left"></i></button>
                    <button className={style.btnRightVP} onClick={handleNextSlideVP}><i className="fa-solid fa-angle-right"></i></button>
                    <div ref={carouselItemVPRef} className={style.carouselVPInner}>

 
                        {filteredViewedProducts.map((item, index) => {
                            return <div key={index} className={style.carouselVPItem}>
                                <div className={clsx(style.VPitem)}>
                                    <Link to={`/productDetails/${item.name}/${item.colorDTO.name}`} onClick={scrollToTop}>
                                        <img src={products1[0].img[0]}></img>
                                    </Link>
                                    <Link to={`/productDetails/${item.name}/${item.colorDTO.name}`} onClick={scrollToTop} className={style.link}>
                                        <p className={clsx(style.productName)}>{item.name}</p>
                                    </Link>
                                    <p className={clsx(style.productColor)}>{item.colorDTO.name}</p>
                                    <p className={clsx(style.productPrice)}>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                                </div>
                            </div>
                        })}

                    </div>
                </div>
            </div> */}

            {/* <div ref={displayNotification} className={style.displayNotification}>
                <div className={style.notification}>
                    <p>{message}</p>
                    <button onClick={() => setIsDisplayNotification(false)}>OK</button>
                </div>
            </div> */}
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


        </div >
    )
}

export default ProductDetails;