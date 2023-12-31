import { useState, useRef, useEffect } from "react"
import axios from "axios";
import clsx from "clsx"
import style from './AdminCategory.module.scss'

function AddNew1({ value }) {

    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    const [customer, setCustomer] = useState({ ...value.selectedCustomer });
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
        setCustomer({ ...value.selectedCustomer })
    }, [value.selectedCustomer])

    const handleInput = (key, value) => {
        setCustomer((prev) => ({
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
        console.log("Đã")
        setCustomer({
            id: null,
            customerName: '',
            phone: '',
            email: '',
            birthday: '',
            gender: '',
            username: '',
            password: '',
            createAt: null,
            updateAt: null,
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


    const handleSubmit = () => {
        let isValid = true;

        for (const key in customer) {
            if (customer.hasOwnProperty(key)) {
                if (customer.id && key === 'password') {
                    continue;
                }
                if (!validateInput(key, customer[key])) {
                    isValid = false;
                }
            }
        }


        if (isValid) {
            if (customer.id) {
                const updateCustomer = async () => {

                    try {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        const response = await axios.put(`http://localhost:8080/api/v1/director/customer/${customer.id}`, customer);
                        // if (response.status == 200) {
                        // handleDefaultValue('update')
                        value.setMessage("Cập nhật thành công")
                        value.setIsModalMsgOpen(true)
                        loadAndResetData();
                        // }
                    } catch (error) {
                        console.log(error);
                    }
                };
                updateCustomer();
            } else {
                const addStaff = async () => {
                    try {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        const response = await axios.post(`http://localhost:8080/api/v1/director/customer/addCustomer`, customer);
                        value.setSort(prevState => ({ ...prevState, page: 1 }));
                        value.setMessage("Thêm thành công")
                        value.setIsModalMsgOpen(true)
                        loadAndResetData();
                        // handleDefaultValue('create')

                    } catch (error) {
                        value.setMessage(error.response.data.message)
                        value.setIsModalMsgOpen(true)
                        console.log(error);
                    }
                };
                addStaff();
            }
        }
    };

    //
    const loadAndResetData = () => {
        value.getCustomers();
        value.displayAddnew.current.style.display = "none"
        value.setIsAddNewActive(false)
        handleDefaultValue('cancel')
    }



    return (
        <div className={style.addNew}>
            <div className={style.title}>

                {customer.id == null ? <p>TẠO MỚI KHÁCH HÀNG</p> : <p>CẬP NHẬT KHÁCH HÀNG</p>}
            </div>

            <div className={style.row3SB}>

                <div className={style.item}>
                    <label>Họ và tên</label>
                    <input value={customer.customerName} onChange={(e) => handleInput('customerName', e.target.value)}></input>
                    {messages.customerName === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                    {messages.customerName === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.customerName === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>

                <div className={style.item}>
                    <label>SĐT</label>
                    <input value={customer.phone} onChange={(e) => handleInput('phone', e.target.value)}></input>
                    {messages.phone === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                    {messages.phone === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.phone === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>

                {customer.id == null ?
                    <div className={style.item}>
                        <label>Email</label>
                        <input type='email' value={customer.email} onChange={(e) => handleInput('email', e.target.value)}></input>
                        {messages.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {messages.email === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                        {messages.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                    </div>
                    :
                    <div className={style.item}>
                        <label>Email</label>
                        <input disabled type='email' value={customer.email} onChange={(e) => handleInput('email', e.target.value)}></input>
                        {messages.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {messages.email === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                        {messages.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                    </div>}
                {/* <div className={style.item}>
                    <label>Email</label>
                    <input type='email' value={customer.email} onChange={(e) => handleInput('email', e.target.value)}></input>
                    {messages.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                    {messages.email === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div> */}

                <div className={style.item}>
                    <label>Ngày sinh</label>
                    <input type="date" value={customer.birthday} onChange={(e) => handleInput('birthday', e.target.value)}></input>
                    {messages.birthday === 2 && <label className={style.errorMessage}>Vui lòng chọn ngày sinh</label>}
                    {messages.birthday === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.birthday === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>

                <div className={style.item}>
                    <label>Giới Tính</label>
                    <select value={customer.gender} onChange={(e) => handleInput('gender', e.target.value)}>
                        <option value="" hidden></option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                    {messages.gender === 2 && <label className={style.errorMessage}>Vui lòng chọn giới tính</label>}
                    {messages.gender === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.gender === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>

                {customer.id == null ?
                    <div className={style.item}>
                        <label>Username</label>
                        <input value={customer.username} onChange={(e) => handleInput('username', e.target.value)}></input>
                        {messages.username === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {messages.username === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                        {messages.username === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                    </div>
                    :
                    <div className={style.item}>
                        <label>Username</label>
                        <input disabled value={customer.username} onChange={(e) => handleInput('username', e.target.value)}></input>
                        {messages.username === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {messages.username === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                        {messages.username === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                    </div>}

                {/* <div className={style.item}>
                    <label>Username</label>
                    <input value={customer.username} onChange={(e) => handleInput('username', e.target.value)}></input>
                    {messages.username === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                    {messages.username === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.username === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div> */}

                {customer.id == null ?
                    <div className={style.item}>
                        <label>Password</label>
                        <input value={customer.password} onChange={(e) => handleInput('password', e.target.value)}></input>
                        {messages.password === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {messages.password === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                        {messages.password === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                    </div>
                    :
                    <div className={style.item}></div>}

                {/* <div className={style.item}>
                    <label>Password</label>
                    <input value={customer.password} onChange={(e) => handleInput('password', e.target.value)}></input>
                    {messages.password === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                    {messages.password === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.password === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div> */}

                <div className={style.item}>
                    <label>Status</label>
                    <select value={customer.status} onChange={(e) => handleInput('status', e.target.value)}>
                        <option hidden></option>
                        <option value='enable'>Active</option>
                        <option value='disable'>Inactive</option>
                    </select>
                    {messages.status === 2 && <label className={style.errorMessage}>Vui lòng chọn status</label>}
                    {messages.status === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.status === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>

                <div className={style.item}>

                </div>
            </div>

            <div className={style.flex}>
                <button onClick={handleSubmit}>Lưu lại</button>
                <button onClick={loadAndResetData}>Hủy bỏ</button>
            </div>


        </div>
    )
}

export default AddNew1