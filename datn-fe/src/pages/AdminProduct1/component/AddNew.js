import { useState, useRef, useEffect } from "react"
import axios from "axios";
import clsx from "clsx"
import style from '../../AdminProduct/AdminProduct.module.scss'

import Modal from 'react-modal';
function AddNew({ value }) {
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

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

    const [product, setProduct] = useState({ ...value.selectedProduct });
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
        setProduct({ ...value.selectedProduct })
    }, [value.selectedProduct])

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
    }

    //
    const loadAndResetData = () => {
        value.getProducts();
        value.displayAddnew.current.style.display = "none"
        value.setIsAddNewActive(false)
        handleDefaultValue('cancel')
    }

    // modal message
    const [message, setMessage] = useState("")
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);
  
    const handleCloseModalMsg = () => {
        setIsModalMsgOpen(false);
        loadAndResetData();
    };


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
                        if (response.status == 201) {
                            setMessage("Thêm thành công")
                            setIsModalMsgOpen(true);
                        }
                    } catch (error) {
                        console.log(error);

                    }
                };
                addProduct();
            }
        }
    };

    console.log(product)






    return (
        <div className={style.addNew}>
            <div className={style.title}>
                {product.id !== -1 ? <p>EDIT SẢN PHẨM</p> : <p>TẠO MỚI SẢN PHẨM</p>}
            </div>

            <div className={style.row3SB}>
                <div className={style.item}>
                    <label>Name</label>
                    <input value={product.name} onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}></input>
                    {/* <label className={style.errorMessage}>Không được để trống</label> */}
                </div>

                <div className={style.item}>
                    <label>Product code</label>
                    <input value={product.productCode} onChange={(e) => setProduct(prev => ({ ...prev, productCode: e.target.value }))}></input>
                </div>

                <div className={style.item}>
                    <label>Manufacturer</label>
                    <select value={product.manufacturer} onChange={(e) => setProduct(prev => ({ ...prev, manufacturer: e.target.value }))}>
                        <option hidden>Chọn manufacturer</option>
                        {manufacturers?.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    {/* <label className={style.errorMessage}>Không được để trống</label> */}
                </div>

                {/* <div className={style.item}>
                    <label>Create at</label>
                    <input ></input>
                    <label className={style.errorMessage}>Không được để trống</label>
                </div> */}

                {/* <div className={style.item}>
                    <label>Update at</label>
                    <input></input>
                    <label className={style.errorMessage}>Không được để trống</label>
                </div> */}

                <div className={style.item}>
                    <label >Status</label>
                    <select value={product.status} onChange={(e) => setProduct(prev => ({ ...prev, status: e.target.value }))}>
                        <option hidden></option>
                        <option value='active'>active</option>
                        <option value='inactive'>inactive</option>
                    </select>
                    {/* <label className={style.errorMessage}>Không được để trống</label> */}
                </div>

                <div className={style.item}>
                    <label >Is new</label>
                    <select value={product.isNew} onChange={(e) => setProduct(prev => ({ ...prev, isNew: e.target.value }))}>
                        <option hidden></option>
                        <option value='1'>True</option>
                        <option value='0'>False</option>
                    </select>
                    {/* <label className={style.errorMessage}>Không được để trống</label> */}
                </div>

                <div className={style.item}>
                    <label >Is best seller</label>
                    <select value={product.isBestSeller} onChange={(e) => setProduct(prev => ({ ...prev, isBestSeller: e.target.value }))}>
                        <option hidden></option>
                        <option value='1'>True</option>
                        <option value='0'>False</option>
                    </select>
                    {/* <label className={style.errorMessage}>Không được để trống</label> */}
                </div>



            </div>

            <div className={style.flex}>
                <button onClick={handleSubmit}>Lưu lại</button>
                <button>Clear</button>
                <button onClick={loadAndResetData}>Hủy bỏ</button>
            </div>

            
        </div>
    )
}

export default AddNew