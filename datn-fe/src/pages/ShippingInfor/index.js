import { useRef, useState, useEffect, useContext } from "react"
import { Link, parsePath, useNavigate } from 'react-router-dom'
import axios from "axios"
import style from './ShippingInfor.module.scss'
import clsx from 'clsx'
import { StoreContext, actions } from '../../store'
import routes from "../../config/routes"

import Modal from 'react-modal';
function ShippingInfor() {
    const navigate = useNavigate();

    const [state, dispatch] = useContext(StoreContext)
    const role = JSON.parse(localStorage.getItem('role'))
    const token = JSON.parse(localStorage.getItem('token'))

    const checkLogin = () => {
        if (role != "CUSTOMER") {
            dispatch(actions.setIsLogin(true))
            navigate('/cart');
        }
    }

    // tỉnh thành phố
    const [provinces, setProvinces] = useState([])
    const [selectedProvince, setSelectedProvince] = useState(null);  //id
    const [provinceMsg, setProvinceMsg] = useState("")
    const getProvince = async () => {
        try {
            const [response] = await Promise.all([
                axios.get(`http://localhost:8080/api/ghn/province`)
            ]);
            setProvinces(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (selectedProvince) {
            setProvinceMsg("")
        }
    }, [selectedProvince])



    // quận huyện
    const [districts, setDistricts] = useState([])
    const [selectedDistrict, setSelectedDistrict] = useState(null);  //id
    const [districtMsg, setDistrictMsg] = useState("");
    const getDistricts = async (idProvince) => {
        try {
            const [response] = await Promise.all([
                axios.get(`http://localhost:8080/api/ghn/district/?province_id=${idProvince}`)
            ]);
            setDistricts(response.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (selectedProvince) {
            getDistricts(JSON.parse(selectedProvince).ProvinceID)
            setSelectedDistrict(null)
        }
    }, [selectedProvince])

    useEffect(() => {
        if (selectedDistrict) {
            setDistrictMsg("")
        }
    }, [selectedDistrict])

    // phường xã
    const [wards, setWards] = useState([])
    const [selectedWard, setSelectedWard] = useState(null);  // WardCode
    const [wardMsg, setWardMsg] = useState("")
    const getWards = async (districtID) => {
        try {
            const [response] = await Promise.all([
                axios.get(`http://localhost:8080/api/ghn/ward/?district_id=${districtID}`)
            ]);
            setWards(response.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (selectedDistrict) {
            getWards(JSON.parse(selectedDistrict).DistrictID)
            setSelectedWard(null)
        }
    }, [selectedDistrict])

    useEffect(() => {
        if (selectedWard) {
            setWardMsg("")
        }
    }, [selectedWard])

    // shipping fee
    const [shippingFee, setShippingFee] = useState({})
    const getShippingFee = async (shippingInfor) => {
        try {
            const [response] = await Promise.all([
                axios.post(`http://localhost:8080/api/ghn/shipping-fee`, shippingInfor)
            ]);
            setShippingFee(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    // delivery method
    const [deliveryMethod, setDeliveryMethod] = useState(2);
    const handleDeliveryMethod = (val, event) => {
        const value = event.target.checked ? val : -1;
        setDeliveryMethod(value);
    };

    useEffect(() => {
        if (selectedWard && deliveryMethod) {
            const shippingInfor = {
                "service_type_id": deliveryMethod,
                "to_district_id": parseInt(JSON.parse(selectedDistrict).DistrictID),
                "to_ward_code": JSON.parse(selectedWard).WardCode,
                "height": 5 * state.cartTotalItems,
                "length": 6 * state.cartTotalItems,
                "weight": 10 * state.cartTotalItems,
                "width": 3 * state.cartTotalItems,
                "cod_failed_amount": 2000,
                "insurance_value": 10000
            }
            getShippingFee(shippingInfor);
        }
    }, [selectedWard, deliveryMethod])

    // payment method
    const [paymentMethod, setPaymentMethod] = useState(-1)

    const handlePaymentMethod = (val, event) => {
        const value = event.target.checked ? val : -1;
        setPaymentMethod(value);
    };

    // api cart
    const [cart, setCart] = useState([])
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

    const getCartLength = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const [response] = await Promise.all([
                axios.get(`http://localhost:8080/api/v1/customer/cartdetail/countcart`)
            ]);
            dispatch(actions.setCartTotalItems(response.data))
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        checkLogin();
        getCart();
        getProvince();
    }, [])

    useEffect(() => {
        dispatch(actions.setCartTotalItems(cart.length))
    }, [cart])

    // update price and amount to selectedProductToPay
    const selectedProductToPay = JSON.parse(localStorage.getItem("selectedProductToPay"))
    const [productToBuy, setProductToBuy] = useState([]);

    useEffect(() => {
        let totalItem = [];
        cart.forEach((item) => {
            if (selectedProductToPay.some((selectedItem) => selectedItem.id === item.id)) {
                totalItem.push(item)
            }
        });
        setProductToBuy(totalItem)
    }, [cart])

    // pre total bill
    const [preTotall, setPreTotall] = useState(0);
    useEffect(() => {
        let totalPrice = 0;
        productToBuy.forEach(item => {
            totalPrice += item.amount * item.price;
        });
        setPreTotall(totalPrice)
    }, [productToBuy]);



    // total bill
    const [totall, setTotall] = useState(0);
    useEffect(() => {
        let totalPrice = 0;
        productToBuy.forEach(item => {
            totalPrice += item.amount * (item.price * (1 - item.promotionValue));
        });
        setTotall(totalPrice)
    }, [productToBuy]);

    // grand total
    const [grandTotal, setGrandTotal] = useState(0);
    useEffect(() => {
        if (shippingFee?.data?.total) {
            setGrandTotal(totall + parseInt(shippingFee.data.total));
        }

    }, [productToBuy, shippingFee]);
    // form 
    const [customerInfor, setCustomerInfor] = useState({ name: "", phone: "", email: "", address: '' });

    const getUserInfor = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const [response] = await Promise.all([
                axios.get(`http://localhost:8080/api/v1/account/my-customer/get-account`)
            ]);
            setCustomerInfor(prev => ({ ...prev, name: response.data.customerName, phone: response.data.phone, email: response.data.email }))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserInfor();
    }, [])

    const [messages, setMessages] = useState({
        name: -1,
        phone: -1,
        email: -1,
        address: -1,
    });

    const handleInput = (key, value) => {
        setCustomerInfor((prev) => ({
            ...prev,
            [key]: value
        }));

        validateInput(key, value)
    };



    const validateInput = (key, value) => {
        const validators = {
            name: /^[a-zA-ZÀ-Ỹà-ỹ]+(\s[a-zA-ZÀ-Ỹà-ỹ]+)*$/,
            phone: /^(?:\+?84|0)(?:\d{9}|\d{10})$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            address: /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/
        };

        const validator = validators[key];
        if (validator) {
            if (value === undefined || value === null || value.trim() === '') {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    [key]: 2
                }));
                return false;
            }

            const isValid = validator.test(value);
            setMessages((prevMessages) => ({
                ...prevMessages,
                [key]: isValid ? 1 : 0,
            }));
            return isValid;
        }

        return true;
    };

    const handleDefaultValue = () => {
        setCustomerInfor({ name: '', phone: '', email: '', address: '' })

        setMessages({
            name: -1,
            phone: -1,
            email: -1,
            address: -1,
        })
        getCart();
    }
    // cart

    //delete cart
    const deleteCartIfSuccess = async (lstCartDetailId) => {


        const deleteCart = async (id) => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const [responseCartProducts] = await Promise.all([
                    axios.delete(`http://localhost:8080/api/v1/customer/cartdetail/delete/${id}`)
                ]);
            } catch (error) {
                console.log(error);
            }
        }

        lstCartDetailId.map(item => {
            deleteCart(item)
        });
    }


    const handleSubmit = () => {
        let isValid = true;

        for (const key in customerInfor) {
            if (customerInfor.hasOwnProperty(key)) {
                if (!validateInput(key, customerInfor[key])) {
                    isValid = false;
                }
            }
        }

        if (!selectedProvince) {
            setProvinceMsg("Vui lòng chọn tỉnh/thành phố")
            isValid = false
        } else {
            setProvinceMsg("")
        }

        if (!selectedDistrict) {
            setDistrictMsg("Vui lòng chọn quận/huyện")
            isValid = false
        } else {
            setDistrictMsg("")
        }

        if (!selectedWard) {
            setWardMsg("Vui lòng chọn phường/xã")
            isValid = false
        } else {
            setWardMsg("")
        }

        if (paymentMethod === -1) {
            setMessage("Vui lòng chọn hình thức thanh toán")
            setIsModalMsgOpen(true)
            isValid = false
        }

        if (isValid) {
            const lstCartDetails = productToBuy.map(item => {
                return {
                    id: item.id,
                    productDetailId: item.idProductDetail,
                    amount: item.amount,
                    price: item.price,
                    promotionalPrice: "" + (item.price * (1 - item.promotionValue)),
                    discount: (item.promotionValue * 100) + ""
                }
            });

            // const lstCartDetailId = cart.map(item => item.id);


            let newAddress = customerInfor.address + " " + JSON.parse(selectedWard).WardName + " - " + JSON.parse(selectedDistrict).DistrictName + " - " + JSON.parse(selectedProvince).ProvinceName + "----------" + JSON.parse(selectedWard).WardCode + "," + JSON.parse(selectedDistrict).DistrictID;

            const addInfor = {
                ...customerInfor,
                address: newAddress,
                totalPayment: grandTotal,
                lstCartDetails: lstCartDetails
            }


            const placeAnOrder = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.post(`http://localhost:8080/api/v1/bill/add?isPayOnline=`, addInfor);

                    handleDefaultValue();
                    getCartLength();
                    setMessage("Đặt hàng thành công")
                    setIsModalMsgOpen(true)

                } catch (error) {
                    console.log(error);
                }
            };

            if (paymentMethod == null) {
                placeAnOrder();
            } else {
                if (paymentMethod == "VNPAY") {
                    localStorage.setItem("addInfor", JSON.stringify(addInfor))
                    const createPay = async () => {
                        try {
                            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                            const response = await axios.post(`http://localhost:8080/api/v1/customer/create-pay`, { amount: grandTotal });
                            window.location.href = response.data.url
                        } catch (error) {
                            console.log(error);
                        }
                    };
                    createPay();
                }
            }
        }
    };

    //end

    // handle ok btn của poppup thông báo

    // modal message
    const [message, setMessage] = useState("")
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);
    const handleCloseModalMsg = () => {
        setIsModalMsgOpen(false);
        if (message == "Đặt hàng thành công") {
            navigate(routes.traCuuDonHang);
        }
    };

    // const [restOfTime, setRestOfTime] = useState(0);
    // const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    // const handleCloseModalMsg = async () => {
    //     await wait(5000);
    //     setIsModalMsgOpen(false);
    // };

    // const [restOfTime, setRestOfTime] = useState(0);
    // const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // const handleCloseModalMsg = async () => {
    //     const startTime = Date.now();
    //     const waitTime = 5000;

    //     while (Date.now() - startTime < waitTime) {
    //         const remainingTime = waitTime - (Date.now() - startTime);
    //         setRestOfTime(remainingTime);
    //         await wait(1000);
    //     }

    //     setIsModalMsgOpen(false);
    // };

    // useEffect(() => {
    //     if (isModalMsgOpen) {
    //         handleCloseModalMsg();
    //     }
    // }, [isModalMsgOpen]);




    return (
        <div className={style.container}>
            <div className={style.row}>
                <div className={style.col1}>
                    <div className={style.title}>
                        <p>THÔNG TIN GIAO HÀNG</p>
                    </div>

                    <div className={style.customerInfor}>
                        {/* <input value={customerInfor.name} placeholder="Họ tên" onChange={(e) => { handleInput("name", e.target.value) }}></input>
                        {messages.name === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {messages.name === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                        {messages.name === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>} */}

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                <div className={style.iconLeft}> <i className="fa-solid fa-user"></i> </div>

                                <input value={customerInfor.name} onChange={(e) => { handleInput("name", e.target.value) }} placeholder="Họ tên" />
                                {messages.name === 1 && <div className={style.iconRightCorrect}><i className="fa-solid fa-check"></i></div>}
                                {messages.name === 2 || messages.name === 0 &&
                                    <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div>}
                            </div>
                            {messages.name === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            {/* {msgSignUpForm.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>} */}
                        </div>

                        {/* <input value={customerInfor.phone} placeholder="Số điện thoại" onChange={(e) => { handleInput("phone", e.target.value) }}></input>
                        {messages.phone === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {messages.phone === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                        {messages.phone === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>} */}

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                <div className={style.iconLeft}> <i className="fa-solid fa-phone"></i> </div>

                                <input value={customerInfor.phone} onChange={(e) => { handleInput("phone", e.target.value) }} placeholder="Số điện thoại" />
                                {messages.phone === 1 && <div className={style.iconRightCorrect}><i className="fa-solid fa-check"></i></div>}
                                {messages.phone === 2 || messages.phone === 0 &&
                                    <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div>}
                            </div>
                            {messages.phone === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            {/* {msgSignUpForm.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>} */}
                        </div>

                        {/* <input value={customerInfor.email} placeholder="Email" onChange={(e) => { handleInput("email", e.target.value) }}></input>
                        {messages.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {messages.email === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                        {messages.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>} */}

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                <div className={style.iconLeft}> <i className="fa-solid fa-envelope"></i> </div>

                                <input value={customerInfor.email} onChange={(e) => { handleInput("email", e.target.value) }} placeholder="Email" />
                                {messages.email === 1 && <div className={style.iconRightCorrect}><i className="fa-solid fa-check"></i></div>}
                                {messages.email === 2 || messages.email === 0 &&
                                    <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div>}
                            </div>
                            {messages.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            {/* {msgSignUpForm.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>} */}
                        </div>

                        <select onChange={(e) => setSelectedProvince(e.target.value)}>
                            <option hidden>Tỉnh / Thành Phố</option>
                            {provinces.data?.map((item, index) => {
                                return <option key={index} value={JSON.stringify(item)}>{item.ProvinceName}</option>
                            })}
                        </select>
                        <label className={style.errorMessage}>{provinceMsg}</label>

                        <div className={style.row}>
                            <div className={style.district}>
                                <select onChange={(e) => setSelectedDistrict(e.target.value)}>
                                    <option hidden>Quận / Huyện</option>
                                    {districts.data?.map((item, index) => {
                                        return <option key={index} value={JSON.stringify(item)}>{item.DistrictName}</option>
                                    })}
                                </select>
                                <label className={style.errorMessage}>{districtMsg}</label>
                            </div>


                            <div className={style.ward}>
                                <select onChange={(e) => setSelectedWard(e.target.value)}>
                                    <option hidden>Phường / Xã</option>
                                    {wards.data?.map((item, index) => {
                                        return <option key={index} value={JSON.stringify(item)}>{item.WardName}</option>
                                    })}
                                </select>
                                <label className={style.errorMessage}>{wardMsg}</label>
                            </div>
                        </div>

                        {/* <input value={customerInfor.address} placeholder="Địa chỉ chi tiết" onChange={(e) => { handleInput("address", e.target.value) }}></input>
                        {messages.address === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {messages.address === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                        {messages.address === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>} */}

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                <div className={style.iconLeft}> <i className="fa-solid fa-location-dot"></i> </div>

                                <input value={customerInfor.address} onChange={(e) => { handleInput("address", e.target.value) }} placeholder="Địa chỉ chi tiết" />
                                {messages.address === 1 && <div className={style.iconRightCorrect}><i className="fa-solid fa-check"></i></div>}
                                {messages.address === 2 || messages.address === 0 &&
                                    <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div>}
                            </div>
                            {messages.address === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            {/* {msgSignUpForm.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>} */}
                        </div>

                        <div className={style.checkbox}>
                            <input type="checkbox"></input> <label>Cập nhật các thông tin mới nhất về chương trình từ Shoe Shoe.</label>
                        </div>

                    </div>

                    <div className={style.title}>
                        <p>PHƯƠNG THỨC GIAO HÀNG</p>
                    </div>

                    <div className={style.deliveryMethod}>
                        <div className={style.checkbox}>
                            <input checked={deliveryMethod === 2} type="radio" name="deliveryMethod" id="delivery2" onChange={(e) => handleDeliveryMethod(2, e)}></input> <label htmlFor="delivery2">Chuyển phát thương mại điện tử</label>
                        </div>
                        {/* <label className={style.errorMessage}><br></br>Dữ liệu không hợp lệ</label> */}
                    </div>

                    <div className={style.title}>
                        <p>PHƯƠNG THỨC THANH TOÁN</p>
                    </div>

                    <div className={style.paymentMethod}>
                        <div className={style.checkbox}>
                            <input checked={paymentMethod === null} type="radio" name="paymentMethod" id="paymentOffline" onChange={(e) => handlePaymentMethod(null, e)}></input> <label htmlFor="paymentOffline">Thanh toán trực tiếp khi giao hàng </label>
                        </div>

                        <div className={style.checkbox}>
                            <input checked={paymentMethod === "VNPAY"} type="radio" name="paymentMethod" id="paymentVNPAY" onChange={(e) => handlePaymentMethod('VNPAY', e)}></input> <label htmlFor="paymentVNPAY">Thanh toán bằng ví VNPAY</label>
                        </div>
                    </div>
                </div>

                <div className={clsx(style.col2)}>
                    <div className={style.background}>
                        <div className={clsx(style.order)}>
                            <p>ĐƠN HÀNG</p>
                        </div>
                        {productToBuy.map((item, index) => {
                            return <div key={index} className={clsx(style.product)}>
                                <div className={style.row}>
                                    <p className={style.productName}>{item.productName + ' - ' + item.colorName}</p>
                                    <p className={style.price}>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                </div>
                                <div className={style.row}>
                                    <p className={style.productSize}>Size: {item.sizeName}</p>
                                    <p className={style.productQuantity}>x {item.amount}</p>
                                </div>
                            </div>
                        })}




                        <div className={clsx(style.totalOrder)}>
                            <p>Đơn hàng</p> <span>{preTotall.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                        <div className={clsx(style.discount)}>
                            <p>Giảm</p> <span>{(preTotall - totall).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                        <div className={clsx(style.transpotFee)}>
                            <p>Phí vận chuyển</p> <span>{shippingFee?.data?.total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                        <div className={clsx(style.paymentFee)}>
                            <p>Phí thanh toán</p> <span>0 VND</span>
                        </div>
                        <div className={clsx(style.total)}>
                            <p className={clsx(style.title)}>TỔNG CỘNG</p> <span>{grandTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                        <div className={clsx(style.payment)}>
                            <button onClick={handleSubmit}>HOÀN TẤT ĐẶT HÀNG</button>
                        </div>
                    </div>
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

export default ShippingInfor