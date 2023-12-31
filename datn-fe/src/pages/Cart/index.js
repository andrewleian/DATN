
import clsx from 'clsx'
import style from "./Cart.module.scss";
import { useRef, useState, useEffect, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import routes from '../../config/routes'
import { StoreContext, actions } from '../../store'

import Modal from 'react-modal';
function Cart() {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(StoreContext)
    const isLogined = JSON.parse(localStorage.getItem('role'));
    const token = JSON.parse(localStorage.getItem('token'))

    // check login
    const checkLogin = () => {
        if (isLogined != "CUSTOMER") {
            dispatch(actions.setIsLogin(true))
        }
    }
    // fake api
    const products = [
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
    // const [allProducts, setAllProducts] = useState([]);
    // useEffect(() => {
    //     const getProductDetails = async () => {
    //         try {
    //             const [responseAllProducts] = await Promise.all([
    //                 axios.get(`http://localhost:8080/api/v1/list-products`)
    //             ]);
    //             setAllProducts(responseAllProducts.data.content)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     getProductDetails();
    // }, [])



    //cart
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) ?? [])

    const getCart = async () => {
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

    const updateCart = async (index) => {
        const cartDetailDTO = {
            id: cart[index].id,
            cartId: cart[index].cartId,
            productDetailId: cart[index].idProductDetail,
            amount: cart[index].amount,
            price: cart[index].price
        }

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const [responseCartProducts] = await Promise.all([
                axios.put(`http://localhost:8080/api/v1/customer/cartdetail/updatecart`, cartDetailDTO)
            ]);
            console.log(responseCartProducts.data[0].priceProductDetail)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCart = async (index) => {

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const [responseCartProducts] = await Promise.all([
                axios.delete(`http://localhost:8080/api/v1/customer/cartdetail/delete/${cart[index].id}`)
            ]);
            console.log(responseCartProducts.data)
            getCart();
        } catch (error) {
            console.log(error);
        }
    }
    // check chuyển cart offline qua be (Chuyển qua page login khi api login sửa)
    const addAllToCart = async () => {
        const listProducts = JSON.parse(localStorage.getItem("cart")) ?? []
        const products = [];
        for (const item of listProducts) {
            products.push({
                productDetailId: item.idProductDetail,
                amount: item.amount
            });
        }

        if (products.length > 0) {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const [responseCartProducts] = await Promise.all([
                    axios.post(`http://localhost:8080/api/v1/customer/cartdetail/add-all-tocart`, products)
                ]);
                localStorage.removeItem('cart')
            } catch (error) {
                console.log(error);
            }
        }
        getCart()

    }

    //end

    useEffect(() => {
        if (isLogined == 'CUSTOMER') {
            addAllToCart();
            getCart()
        }
    }, [])


    function hanleRemoveProduct(index) {
        if (isLogined === "CUSTOMER") {
            deleteCart(index);
        } else {
            setCart(prevState => {
                var newCart = [...prevState];
                newCart.splice(index, 1)
                return newCart;
            })
        }
    }

    useEffect(() => {
        if (isLogined !== 'CUSTOMER') {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        dispatch(actions.setCartTotalItems(cart.length))
    }, [cart]);


    function handleRemoveAllProducts() {
        dispatch(actions.setCartTotalItems(0))
        setCart([])

        if (isLogined == 'CUSTOMER') {
            const deleteAllCart = async (index) => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const [responseCartProducts] = await Promise.all([
                        axios.delete(`http://localhost:8080/api/v1/customer/cartdetail/deleteall_cartdetail`)
                    ]);
                    getCart();
                } catch (error) {
                    console.log(error);
                }
            }
            deleteAllCart();
        }
    }


    // size

    function handleChangeSize(index, size) {
        const selectedSize = cart[index].sizes.find(item => item.name === size);
        if (selectedSize.amount < 1) {
            setMessage("size " + selectedSize.name + " đã hết");
            setIsModalMsgOpen(true)
        } else {
            setCart(prevState => {
                var newCart = [...prevState];
                newCart[index].sizeName = selectedSize.name;
                newCart[index].idProductDetail = selectedSize.idProductDetail;
                newCart[index].amount = 1;
                if (isLogined === 'CUSTOMER') {
                    updateCart(index)
                }
                return newCart;
            })
        }
    }

    // const handleKeyDown = (event) => {
    //     if (event.key === 'Backspace' || event.key === 'Delete') {
    //         setCart(prevState => {
    //             var newCart = [...prevState];
    //             newCart[index].amount = '';
    //             return newCart;
    //         })
    //     }
    // };

    function hanleChangeQuantity(index, amount) {
        const { amount: oldAmount, maxAmount } = cart[index];
        let newAmount = parseInt(amount) - oldAmount;
        if (newAmount !== 0 && parseInt(amount) <= maxAmount && parseInt(amount) >= 1) { // thay doi 0 thanh 1
            setCart(prevState => {
                var newCart = [...prevState];
                newCart[index].amount = parseInt(amount);
                updateCart(index)
                return newCart;
            })
        }


    }



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
    };

    //

    // select product
    const [selectedAll, setSelectedAll] = useState(false);

    // useState(() => {

    // }, [selectedAll])

    const handleSelectedAll = (e) => {
        setSelectedAll(e.target.checked);

        if (e.target.checked) {
            setSelectedProduct([...cart]);
        } else {
            setSelectedProduct([]);
        }
    }


    const [selectedProduct, setSelectedProduct] = useState([]);

    const handleSelectedProduct = (productDetails, e) => {
        const existedIndex = selectedProduct.findIndex(
            (item) => item.id === productDetails.id
        );

        if (e.target.checked) {
            if (existedIndex === -1) {
                setSelectedProduct((prevState) => [...prevState, productDetails]);
            }
        } else {
            if (existedIndex !== -1) {
                setSelectedProduct((prevState) => {
                    const updatedProductList = [...prevState];
                    updatedProductList.splice(existedIndex, 1);
                    return updatedProductList;
                });
            }
        }
    };

    // xử lý tiếp tục thanh toán
    const handleContinueBtn = () => {
        if (selectedProduct.length > 0) {
            localStorage.setItem("selectedProductToPay", JSON.stringify(selectedProduct))
            navigate(routes.shippingInfor);
        } else {
            setMessage("Danh sách sản phẩm thanh toán trống")
            setIsModalMsgOpen(true);
        }
    }
    // total price
    const [preTotal, setPreTotal] = useState(0);
    useEffect(() => {
        let totalPrice = 0;
        selectedProduct.forEach(item => {
            totalPrice += item.amount * item.price;
        });
        setPreTotal(totalPrice);
    }, [selectedProduct, cart]);

    // total price sau giảm giá
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let totalPrice = 0;
        selectedProduct.forEach(item => {
            totalPrice += item.amount * (item.price * (1 - item.promotionValue));
        });
        setTotal(totalPrice);
    }, [selectedProduct, cart]);


    return (
        <div>
            <div className={clsx(style.row, style.container)}>
                <div className={clsx(style.col1)}>

                    <div className={clsx(style.needMore)}>
                        {/* <p>Need more</p> */}
                        <img src='https://ananas.vn/wp-content/uploads/Web1920-1.jpeg'></img>
                    </div>

                    <div className={clsx(style.cart)}>

                        <div className={style.row}>
                            <div className={clsx(style.cbx)}>
                                <input checked={selectedAll} onChange={(e) => handleSelectedAll(e)} type='checkbox'></input>
                            </div>
                            <div className={clsx(style.cartTitle)}>
                                <p>GIỎ HÀNG</p>
                            </div>
                        </div>
                        {cart.map((item, index) => {
                            const isChecked = selectedProduct.some((selectedItem) => selectedItem.id === item.id);
                            let img = "";
                            if (item && item.images) {
                                img = window.location.origin + "/image/" + item.images;
                            } else {
                                console.log("mainProduct.images is not available");
                                img = "https://ananas.vn/wp-content/uploads/Pro_AV00174_1.jpeg";
                            }

                            return <div key={index} className={style.item}>
                                <div className={clsx(style.cbx)}>
                                    <input checked={isChecked} onChange={(e) => handleSelectedProduct(item, e)} type='checkbox'></input>
                                </div>
                                <div className={clsx(style.product)}>
                                    {/* <Link to={`/productDetails/${item.id}/${item.colorDTO.name}`} */}
                                    <div className={clsx(style.productImg)}>
                                        {isLogined == "CUSTOMER" && <Link to={`/productDetails/${item.idProducCls}/${item.colorName}`} className={style.link}>
                                            <img src={img}></img>
                                        </Link>}
                                        {isLogined != "CUSTOMER" && <Link to={`/productDetails/${item.idProducCls}/${item.colorName}`} className={style.link}>
                                            <img src={img}></img>
                                        </Link>}
                                        {/* <Link to={`/productDetails/${item.idProducCls}/${item.colorName}`} className={style.link}>
                                            <img src={img}></img>
                                        </Link> */}
                                    </div>

                                    <div className={clsx(style.productDetails)}>
                                        <Link to={`/productDetails/${item.idProducCls}/${item.colorName}`} className={style.link}>
                                            <p className={clsx(style.name)}>{item.productName} - {item.colorName}</p>
                                        </Link>


                                        {item.promotionValue > 0 &&
                                            <div className={style.promotion}>
                                                <p className={clsx(style.price)}>Giá:
                                                    <span className={clsx(style.promotionalPrice)}> {(item.price * (1 - item.promotionValue)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                    <span className={clsx(style.realPrice)}> {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                </p>
                                            </div>
                                        }
                                        {item.promotionValue === 0 && <p className={clsx(style.price)}>Giá: <span>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>}


                                        <div className={clsx(style.row)}>
                                            <div className={clsx(style.size)}>
                                                <label>Size</label>
                                                <select value={item.sizeName} onChange={(e) => handleChangeSize(index, e.target.value)}>
                                                    {item.sizes.map((item, index) => <option key={index} value={item.name} >{item.name}</option>)}
                                                </select>
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
                                            </div>

                                            <div className={clsx(style.quantity)}>
                                                <label>Số lượng</label>
                                                <input type="number" value={item.amount} onChange={(e) => hanleChangeQuantity(index, e.target.value)}></input>
                                            </div>

                                        </div>
                                    </div>

                                    <div className={clsx(style.other)}>
                                        {item.promotionValue > 0 &&
                                            <p className={clsx(style.productTotal)}>{(item.amount * (item.price * (1 - item.promotionValue))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                        }
                                        {item.promotionValue === 0 &&
                                            <p className={clsx(style.productTotal)}>{(item.amount * item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                        }

                                        <p className={clsx(style.productStatus)}>Còn hàng</p>
                                        {/* <div className={clsx(style.favorite)}><button><i className="fa-solid fa-heart"></i></button></div> */}
                                        <br></br>
                                        <div className={clsx(style.delete)}><button onClick={() => hanleRemoveProduct(index)}><i className="fa-sharp fa-solid fa-trash"></i></button></div>
                                    </div>

                                </div>

                                <div className={index == cart.length - 1 ? style.lastBorderBot : style.borderBot} ></div>

                            </div>
                        })}

                    </div>

                    <div className={clsx(style.row)}>

                        <button onClick={handleRemoveAllProducts} className={clsx(style.deleteAll)}>XÓA HẾT</button>

                        <Link to={routes.sanPham} className={style.linkButton}>
                            <button className={clsx(style.back)}>QUAY LẠI MUA HÀNG</button>
                        </Link>

                    </div>
                </div>

                <div className={clsx(style.col2)}>
                    <div className={clsx(style.order)}>
                        <p>ĐƠN HÀNG</p>
                    </div>

                    {/* <div className={clsx(style.promotionCode)}>
                        <label>NHẬP MÃ KHUYẾN MÃI</label>
                        <div className={style.row}>
                            <input /> <button>ÁP DỤNG</button>
                        </div> 
                    </div> */}

                    <div className={clsx(style.totalOrder)}>
                        <p>Đơn hàng</p> <p>{preTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </p>
                    </div>
                    <div className={clsx(style.discount)}>
                        <p>Giảm</p> <span>{(preTotal - total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                    <div className={clsx(style.temporary)}>
                        <p>TẠM TÍNH</p> <span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                    <div className={clsx(style.continueOrderBtn)}>
                        <button onClick={handleContinueBtn}>TIẾP TỤC THANH TOÁN</button>
                    </div>
                    {/* </Link> */}

                </div>
            </div>

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
        </div>
    )
}

export default Cart