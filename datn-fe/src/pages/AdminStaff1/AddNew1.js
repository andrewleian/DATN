import { useState, useRef, useEffect } from "react"
import axios from "axios";
import clsx from "clsx"
import style from './AdminStaff.module.scss'

import Modal from 'react-modal';
function AddNew1({ value }) {
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    const [staff, setStaff] = useState({ ...value.selectedStaff });
    const [messages, setMessages] = useState({
        staffName: -1,
        phone: -1,
        email: -1,
        birthday: -1,
        gender: -1,
        username: -1,
        password: -1,
        status: -1,
        roleId: -1
    });

    useEffect(() => {
        setStaff({ ...value.selectedStaff })
    }, [value.selectedStaff])

    const handleInput = (key, value) => {
        setStaff((prevStaff) => ({
            ...prevStaff,
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
            staffName: /^[a-zA-ZÀ-Ỹà-ỹ]+(\s[a-zA-ZÀ-Ỹà-ỹ]+)*$/,
            phone: /^(?:\+?84|0)(?:\d{9}|\d{10})$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            birthday: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            username: /^[a-zA-Z0-9_-]{3,16}$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            gender: /.*/,
            status: /.*/,
            roleId: /.*/
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
        setStaff({
            id: null,
            staffName: '',
            phone: '',
            email: '',
            birthday: '',
            gender: '',
            username: '',
            password: '',
            createAt: null,
            updateAt: null,
            status: '',
            roleId: ''
        })

        setMessages({
            staffName: -1,
            phone: -1,
            email: -1,
            birthday: -1,
            gender: -1,
            username: -1,
            password: -1,
            status: -1,
            roleId: -1
        })
    }


    const handleSubmit = () => {
        let isValid = true;

        for (const key in staff) {
            if (staff.hasOwnProperty(key)) {
                if (staff.id && key === 'password') {
                    continue;
                }
                if (!validateInput(key, staff[key])) {
                    isValid = false;
                }
            }
        }


        if (isValid) {
            if (staff.id) {
                const updateStaff = async () => {
                    try {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        const response = await axios.put(`http://localhost:8080/api/v1/director/staff/${staff.id}`, staff);
                        value.setMessage("Cập nhật thành công")
                        value.setIsModalMsgOpen(true)
                        loadAndResetData();
                    } catch (error) {
                        console.log(error);
                    }
                };
                updateStaff();
            } else {
                const addStaff = async () => {
                    try {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        const response = await axios.post(`http://localhost:8080/api/v1/director/staff`, staff);

                        value.setSort(prevState => ({ ...prevState, page: 1 }));
                        value.setMessage("Thêm thành công")
                        value.setIsModalMsgOpen(true)
                        loadAndResetData();
                    } catch (error) {
                        value.setMessage(error.response.data)
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
        value.getStaffs();
        value.displayAddnew.current.style.display = "none"
        value.setIsAddNewActive(false)
        handleDefaultValue('cancel')
    }



    return (
        <div className={style.addNew}>
            <div className={style.title}>
                {staff.id == null ? <p>TẠO MỚI NHÂN VIÊN</p> : <p>CẬP NHẬT NHÂN VIÊN</p>}
                {/* <p>TẠO MỚI NHÂN VIÊN</p> */}
            </div>

            <div className={style.row3SB}>

                <div className={style.item}>
                    <label>Họ và tên</label>
                    <input value={staff.staffName} onChange={(e) => handleInput('staffName', e.target.value)}></input>
                    {messages.staffName === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                    {messages.staffName === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.staffName === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>

                <div className={style.item}>
                    <label>SĐT</label>
                    <input value={staff.phone} onChange={(e) => handleInput('phone', e.target.value)}></input>
                    {messages.phone === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                    {messages.phone === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.phone === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>

                <div className={style.item}>
                    <label>Email</label>
                    <input type='email' value={staff.email} onChange={(e) => handleInput('email', e.target.value)}></input>
                    {messages.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                    {messages.email === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>

                <div className={style.item}>
                    <label>Ngày sinh</label>
                    <input type="date" value={staff.birthday} onChange={(e) => handleInput('birthday', e.target.value)}></input>
                    {messages.birthday === 2 && <label className={style.errorMessage}>Vui lòng chọn ngày sinh</label>}
                    {messages.birthday === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.birthday === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>

                <div className={style.item}>
                    <label>Giới Tính</label>
                    <select value={staff.gender} onChange={(e) => handleInput('gender', e.target.value)}>
                        <option value="" hidden></option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                    {messages.gender === 2 && <label className={style.errorMessage}>Vui lòng chọn giới tính</label>}
                    {messages.gender === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.gender === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>

                <div className={style.item}>
                    <label>Username</label>
                    <input value={staff.username} onChange={(e) => handleInput('username', e.target.value)}></input>
                    {messages.username === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                    {messages.username === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.username === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>

                {staff.id == null ? <div className={style.item}>
                    <label>Password</label>
                    <input value={staff.password} onChange={(e) => handleInput('password', e.target.value)}></input>
                    {messages.password === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                    {messages.password === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.password === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div> : ""}


                <div className={style.item}>
                    <label>Status</label>
                    <select value={staff.status} onChange={(e) => handleInput('status', e.target.value)}>
                        <option hidden></option>
                        <option value='enable'>Active</option>
                        <option value='disable'>Inactive</option>
                    </select>
                    {messages.status === 2 && <label className={style.errorMessage}>Vui lòng chọn status</label>}
                    {messages.status === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.status === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>

                <div className={style.item}>
                    <label>Role</label>
                    <select value={staff.roleId || ''} onChange={(e) => handleInput('roleId', e.target.value)}>
                        <option hidden></option>
                        <option value='1'>DIRECTOR</option>
                        <option value='2'>STAFF</option>
                    </select>
                    {messages.roleId === 2 && <label className={style.errorMessage}>Vui lòng chọn role</label>}
                    {messages.roleId === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                    {messages.roleId === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                </div>
                {staff.id !== null && <div className={style.item}></div>}
                {/* <div className={style.item}>
                    <label>Ảnh 3x4</label>
                    <input type="file"></input>
                </div> */}
            </div>

            <div className={style.flex}>
                <button onClick={handleSubmit}>Lưu lại</button>
                {/* <button>Clear</button> */}
                <button onClick={loadAndResetData}>Hủy bỏ</button>
            </div>


        </div>
    )
}

export default AddNew1