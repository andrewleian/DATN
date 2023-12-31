import { useState, useRef, useEffect } from "react"
import axios from "axios";
import clsx from "clsx"
import style from './AdminPromotion.module.scss'

function AddNew1({ value }) {

    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    const [promotion, setPromotion] = useState({ ...value.selectedPromotions });
    const [messages, setMessages] = useState({
        customerName: -1,
        phone: -1,
        email: -1,
        birthday: -1,
        gender: -1,
        username: -1,
        password: -1,
        status: -1,
    });

    useEffect(() => {
        setPromotion({ ...value.selectedPromotions })
    }, [value.selectedPromotions])

    const handleInput = (key, value) => {
        console.log(value)
        setPromotion((prev) => ({
            ...prev,
            [key]: value
        }));

        // validateInput(key, value)
    };

    const today = new Date();
    const isFutureDate = (selectedDate) => {
        const selectedDateTime = new Date(selectedDate).getTime();
        const todayTime = today.getTime();
        return selectedDateTime > todayTime;
    };

    const validateInput = (key, value) => {
        const validators = {
            customerName: /^[a-zA-ZÀ-Ỹà-ỹ]+(\s[a-zA-ZÀ-Ỹà-ỹ]+)*$/,
            phone: /^(?:\+?84|0)(?:\d{9}|\d{10})$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            birthday: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            username: /^[a-zA-Z0-9_-]{3,16}$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            gender: /.*/,
            status: /.*/
        };

        const validator = validators[key];
        if (validator) {

            if (value === undefined || value === null || value === '') {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    [key]: 2
                }));
                return false;
            }

            if (key == "birthday") {
                if (isFutureDate(value)) {
                    setMessages((prevMessages) => ({
                        ...prevMessages,
                        [key]: 0,
                    }));
                    return false
                } else {
                    setMessages((prevMessages) => ({
                        ...prevMessages,
                        [key]: 1,
                    }));
                    return true
                }
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

    const handleDefaultValue = (action) => {
        setPromotion({
            id: null,
            title: '',
            content: '',
            discount: 0,
            start_at: '',
            end_at: '',
            // createAt: '',
            // updateAt: '',
            status: ''
        })

        setMessages({
            customerName: -1,
            phone: -1,
            email: -1,
            birthday: -1,
            gender: -1,
            username: -1,
            password: -1,
            status: -1
        })
    }

    console.log(promotion)

    const handleSubmit = () => {
        // let isValid = true;

        // for (const key in customer) {
        //     if (customer.hasOwnProperty(key)) {
        //         if (customer.id && key === 'password') {
        //             continue;
        //         }
        //         if (!validateInput(key, customer[key])) {
        //             isValid = false;
        //         }
        //     }
        // }


        // if (isValid) {
        if (promotion.id) {
            const updatePromotion = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.put(`http://localhost:8080/api/v1/director/promotions/${promotion.id}`, promotion);
                    if (response.status == 200) {
                        handleDefaultValue('update')
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            updatePromotion();
        } else {
            const addPromotion = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.post(`http://localhost:8080/api/v1/director/promotions/createPromotion`, promotion);
                    if (response.status == 201) {
                        handleDefaultValue('create')
                    }
                } catch (error) {
                    console.log(error);

                }
            };
            addPromotion();
        }
        // }
    };



    //
    const loadAndResetData = () => {
        value.getPromotions();
        value.displayAddnew.current.style.display = "none"
        value.setIsAddNewActive(false)
        handleDefaultValue('cancel')
    }

    return (
        <div className={style.addNew}>
            <div className={style.title}>
                <p>ADD NEW PROMOTION</p>
            </div>

            <div className={style.row3SB}>
                <div className={style.item}>
                    <label>Title</label>
                    <input onChange={(e) => handleInput("title", e.target.value)} value={promotion.title}></input>
                </div>

                <div className={style.item}>
                    <label>Content</label>
                    <input onChange={(e) => handleInput("content", e.target.value)} value={promotion.content}></input>
                </div>


                <div className={style.item}>
                    <label>Discount value <span style={{ color: 'black' }}> % </span></label>
                    <input onChange={(e) => handleInput("discount", e.target.value)} value={promotion.discount}></input>
                </div>


                <div className={style.item}>
                    <label>Start at</label>
                    <input onChange={(e) => handleInput("start_at", e.target.value)} type="date" promotion={promotion.start_at}></input>
                </div>


                <div className={style.item}>
                    <label>End at</label>
                    <input onChange={(e) => handleInput("end_at", e.target.value)} type="date" value={promotion.end_at}></input>
                </div>

                <div className={style.item}>
                    <label>Status</label>
                    <select onChange={(e) => handleInput("status", e.target.value)}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
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

export default AddNew1