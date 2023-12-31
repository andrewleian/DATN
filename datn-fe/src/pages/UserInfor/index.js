import { useState, useRef, useEffect, useContext } from "react"
import { Link, json, parsePath, useLocation, useParams, useNavigate } from 'react-router-dom'
import { StoreContext, actions } from '../../store'
import axios from "axios";
import clsx from "clsx"
import style from './UserInfor.module.scss'
import { parseISO, format } from 'date-fns';
import Modal from 'react-modal';
function UserInfor() {
    Modal.setAppElement('#root');
    const role = JSON.parse(localStorage.getItem('role'))
    const token = JSON.parse(localStorage.getItem('token'))

    const [userInfor, setUserInfor] = useState([]);

    const getUserInfor = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const [response] = await Promise.all([
                axios.get(`http://localhost:8080/api/v1/account/my-customer/get-account`)
            ]);
            setUserInfor(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserInfor();
    }, [])


    // modal message
    const [notificationMessage, setNotificationMessage] = useState("");
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);
    const handleCloseModalMsg = () => {
        setIsModalMsgOpen(false);
    };

    ///
    const [messages, setMessages] = useState({
        customerName: -1,
        phone: -1,
        email: -1,
        birthday: -1,
        gender: -1,
        username: -1,
    });

    // Định dạng lại ngày để hiển thị trong input
    // const formattedDate = format(new Date(userInfor.birthday), 'yyyy-MM-dd');

    const handleInput = (key, value) => {
        // if (key === 'birthday') {
        //     const dateObject = parseISO(value);
        //     const formattedDate = format(dateObject, 'yyyy/MM/dd');
        //     setUserInfor((prev) => ({
        //         ...prev,
        //         [key]: formattedDate
        //     }));
        // } else {
        setUserInfor((prev) => ({
            ...prev,
            [key]: value
        }));
        // }

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
            // username: /^[a-zA-Z0-9_-]{3,16}$/,
            gender: /.*/,
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

    const handleDefaultValue = () => {
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

        for (const key in userInfor) {
            if (userInfor.hasOwnProperty(key)) {
                if (!validateInput(key, userInfor[key])) {
                    isValid = false;
                }
            }
        }



        if (isValid) {
            const changeInfor = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.put(`http://localhost:8080/api/v1/account/my-customer/change-infor`, userInfor);
                    // if (response.status == 201) {
                    handleDefaultValue()
                    setNotificationMessage("Cập nhật thông tin thành công")
                    setIsModalMsgOpen(true)
                    // }
                } catch (error) {
                    setNotificationMessage(error.response.data)
                    setIsModalMsgOpen(true)
                    console.log(error);
                }
            };
            changeInfor();
        }
    };

    // show otp
    const [showOTP, setShowOTP] = useState(false);

    // mã otp
    const [otp, setOTP] = useState("");
    const [displayOTP, setDisplayOTP] = useState(false);

    // change password
    const [changePassword, setChangePassword] = useState({ email: "", newPass: "", confirmPass: "" });
    const [changePasswordMsg, setChangePasswordMsg] = useState({ email: "", newPass: "", confirmPass: "" })
    const [isShowNewPass, setIsShowNewPass] = useState(false)
    const [isShowConfirmPass, setIsShowConfirmPass] = useState(false)

    const handleChangePassword = (key, value) => {
        setChangePassword((prev) => ({
            ...prev,
            [key]: value
        }));

        if (key === "email") {
            const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (value === undefined || value === null || value === '') {
                setChangePasswordMsg((prevMessages) => ({
                    ...prevMessages,
                    email: 2
                }));
                // return false;
            }
            const isValid = validateEmail.test(value);
            setChangePasswordMsg((prevMessages) => ({
                ...prevMessages,
                email: isValid ? 1 : 0,
            }));
        }

        if (key === "newPass") {
            const validatorPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (value === undefined || value === null || value === '') {
                setChangePasswordMsg((prevMessages) => ({
                    ...prevMessages,
                    newPass: 2
                }));
                // return false;
            }

            const isValid = validatorPassword.test(value);
            setChangePasswordMsg((prevMessages) => ({
                ...prevMessages,
                newPass: isValid ? 1 : 0,
            }));
            // return isValid;
        }

        if (key === "confirmPass") {
            if (value === undefined || value === null || value === '') {
                setChangePasswordMsg((prevMessages) => ({
                    ...prevMessages,
                    confirmPass: 2
                }));
                // return false;
            }

            if (changePassword.newPass === value) {
                setChangePasswordMsg((prevMessages) => ({
                    ...prevMessages,
                    confirmPass: 1,
                }));
            } else {
                setChangePasswordMsg((prevMessages) => ({
                    ...prevMessages,
                    confirmPass: 0,
                }));
            }
        }
    };

    const submitChangePass = () => {
        let isvalid = true;

        const validatorPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (changePassword.newPass === undefined || changePassword.newPass === null || changePassword.newPass === '') {
            setChangePasswordMsg((prevMessages) => ({
                ...prevMessages,
                newPass: 2
            }));
            isvalid = false;
        }

        const isValid = validatorPassword.test(changePassword.newPass);
        setChangePasswordMsg((prevMessages) => ({
            ...prevMessages,
            newPass: isValid ? 1 : 0,
        }));
        isvalid = isValid;



        if (changePassword.confirmPass === undefined || changePassword.confirmPass === null || changePassword.confirmPass === '') {
            setChangePasswordMsg((prevMessages) => ({
                ...prevMessages,
                confirmPass: 2
            }));
            isvalid = false;
        }

        if (changePassword.newPass === changePassword.confirmPass) {
            setChangePasswordMsg((prevMessages) => ({
                ...prevMessages,
                confirmPass: 1,
            }));
        } else {
            setChangePasswordMsg((prevMessages) => ({
                ...prevMessages,
                confirmPass: 0,
            }));
            isvalid = false;
        }
        console.log(isValid)

        if (isvalid) {

            const changePasswordApi = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.post(`http://localhost:8080/api/v1/account/my-customer/change-account`, { email: changePassword.email, password: changePassword.newPass, confirmPassword: changePassword.confirmPass });
                    setChangePasswordMsg({ email: "", newPass: "", confirmPass: "" })
                    setChangePassword({ email: "", newPass: "", confirmPass: "" })
                    setDisplayOTP(true)

                } catch (error) {
                    console.log(error);
                }
            };
            changePasswordApi();
        }

    }

    // submit otp
    const submitOTP = () => {
        const changePasswordApi = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.post(`http://localhost:8080/api/v1/account/my-customer/comfim-otp/?otp=${otp}`);
                // setChangePasswordMsg({ email: "", newPass: "", confirmPass: "" })
                // setChangePassword({ email: "", newPass: "", confirmPass: "" })
                setDisplayOTP(false)
                setNotificationMessage("Đổi mật khẩu thành công")
                setIsModalMsgOpen(true)
            } catch (error) {
                console.log(error);
                setNotificationMessage(error.response.data)
                setIsModalMsgOpen(true)
            }
        };
        changePasswordApi();
    }



    // set menu selected
    const [selectedItem, setSelectedItem] = useState("profile");
    const profileRef = useRef();
    const changePasswordRef = useRef();

    const profileSelected = () => {
        setSelectedItem("profile");
        profileRef.current.style.display = 'block';
        changePasswordRef.current.style.display = 'none'
        // addressRef.current.style.display = "none"
    }

    const changePasswordSelected = () => {
        setSelectedItem("changePassword");
        changePasswordRef.current.style.display = 'block';
        profileRef.current.style.display = 'none'
        // addressRef.current.style.display = "none"
    }

    return (
        <div className={style.container}>
            <div className={style.menu}>
                <ul>
                    <li className={selectedItem === "profile" ? style.selected : ""} onClick={profileSelected}>Hồ Sơ Của Tôi</li>
                    <li className={selectedItem === "changePassword" ? style.selected : ""} onClick={changePasswordSelected}>Đổi Mật Khẩu</li>
                    <li>Địa Chỉ</li>
                </ul>
            </div>

            <div ref={profileRef} className={style.profile}>
                <p className={style.title}>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                <hr />
                <div className={style.item}>
                    <div className={style.label}>
                        <label>Username</label>
                    </div>
                    <input disabled value={userInfor.username} onChange={(e) => handleInput('username', e.target.value)}></input>
                    <div className={style.notification}>
                        {messages.username === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {/* {messages.username === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>} */}
                        {messages.username === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                    </div>
                </div>

                <div className={style.item}>
                    <div className={style.label}>
                        <label>Họ và tên</label>
                    </div>
                    <input value={userInfor.customerName} onChange={(e) => handleInput('customerName', e.target.value)}></input>
                    <div className={style.notification}>
                        {messages.customerName === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {/* {messages.customerName === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>} */}
                        {messages.customerName === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                    </div>
                </div>

                <div className={style.item}>
                    <div className={style.label}>
                        <label>Email</label>
                    </div>
                    <input value={userInfor.email} onChange={(e) => handleInput('email', e.target.value)}></input>
                    <div className={style.notification}>
                        {messages.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {/* {messages.email === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>} */}
                        {messages.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                    </div>
                </div>

                <div className={style.item}>
                    <div className={style.label}>
                        <label>Số điện thoại</label>
                    </div>
                    <input value={userInfor.phone} onChange={(e) => handleInput('phone', e.target.value)}></input>
                    <div className={style.notification}>
                        {messages.phone === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {/* {messages.phone === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>} */}
                        {messages.phone === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                    </div>
                </div>

                <div className={style.item}>
                    <div className={style.label}>
                        <label>Ngày sinh</label>
                    </div>
                    <input type="date" value={userInfor.birthday} onChange={(e) => handleInput('birthday', e.target.value)}></input>
                    <div className={style.notification}>
                        {messages.birthday === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {/* {messages.birthday === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>} */}
                        {messages.birthday === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                    </div>
                </div>

                <div className={style.item}>
                    {/* <div className={style.label}>
                        <label>Giới Tính</label>
                    </div> */}
                    {/* <div className={style.input}>
                        <input type="radio" name="gender" value="Nam" onChange={(e) => handleInput('gender', e.target.value)}></input>Nam
                        <input type="radio" name="gender" value="Nữ" onChange={(e) => handleInput('gender', e.target.value)}></input>Nữ
                        <input type="radio" name="gender" onChange={(e) => handleInput('gender', e.target.value)}></input>Khác
                    </div> */}
                    <div className={style.notification}>
                        {/* {messages.birthday === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                        {messages.birthday === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                        {messages.birthday === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>} */}
                    </div>
                </div>

                <button onClick={handleSubmit}>Lưu</button>
            </div>


            <div ref={changePasswordRef} className={style.changePassword}>
                <p className={style.title}>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
                <hr />
                {!displayOTP && <div>
                    <div className={style.item}>
                        <div className={style.label}>
                            <label>Email</label>
                        </div>
                        <input value={changePassword.email} onChange={(e) => handleChangePassword('email', e.target.value)} placeholder="Email"></input>
                        <div className={style.notification}>
                            {changePasswordMsg.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            {/* {changePasswordMsg.email === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>} */}
                            {changePasswordMsg.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                        </div>
                    </div>

                    <div className={style.item}>
                        {/* <div className={style.label}>
                            <label>Mật khẩu mới</label>
                        </div>
                        <input type={isShowNewPass ? 'text' : 'password'} value={changePassword.newPass} onChange={(e) => handleChangePassword('newPass', e.target.value)} placeholder="Mật khẩu mới"></input>

                        <div className={style.iconRightPassword} onClick={() => setIsShowNewPass(!isShowNewPass)}>
                            <i className={`fa-solid ${isShowNewPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </div> */}

                        <div className={style.inputWithIcon}>
                            <div className={style.label}>
                                <label>Mật khẩu mới</label>
                            </div>
                            <input type={isShowNewPass ? 'text' : 'password'} value={changePassword.newPass} onChange={(e) => handleChangePassword('newPass', e.target.value)} placeholder="Mật khẩu mới"></input>
                            <div className={style.iconRightPassword} onClick={() => setIsShowNewPass(!isShowNewPass)}>
                                <i className={`fa-solid ${isShowNewPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </div>
                        </div>
                        <div className={style.notification}>
                            {changePasswordMsg.newPass === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            {/* {changePasswordMsg.newPass === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>} */}
                            {changePasswordMsg.newPass === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                        </div>
                    </div>

                    <div className={style.item}>

                        <div className={style.inputWithIcon}>
                            <div className={style.label}>
                                <label>Xác nhận mật khẩu</label>
                            </div>
                            <input type={isShowConfirmPass ? 'text' : 'password'} value={changePassword.confirmPass} onChange={(e) => handleChangePassword('confirmPass', e.target.value)} placeholder="Xác nhận mật khẩu"></input>
                            <div className={style.iconRightPassword} onClick={() => setIsShowConfirmPass(!isShowConfirmPass)}>
                                <i className={`fa-solid ${isShowConfirmPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </div>
                        </div>

                        <div className={style.notification}>
                            {changePasswordMsg.confirmPass === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            {/* {changePasswordMsg.confirmPass === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>} */}
                            {changePasswordMsg.confirmPass === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                        </div>
                    </div>
                </div>}

                {displayOTP &&
                    <div className={style.item}>
                        <div className={style.label}>
                            <label>Mã OTP</label>
                        </div>
                        <input value={otp} onChange={(e) => setOTP(e.target.value)} placeholder="Nhập mã otp"></input>
                        {/* <div className={style.notification}>
                     {changePasswordMsg.confirmPass === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                     {changePasswordMsg.confirmPass === 1 && <label className={style.successMessage}>Dữ liệu hợp lệ</label>}
                     {changePasswordMsg.confirmPass === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                 </div> */}
                    </div>
                }

                {!displayOTP && <button onClick={submitChangePass}>Lấy mã otp</button>}
                {displayOTP && <button onClick={submitOTP}>Lưu</button>}
            </div>

            <div>
                <Modal
                    isOpen={isModalMsgOpen}
                    onRequestClose={handleCloseModalMsg}
                    className={style.modalWrapper}
                    overlayClassName={style.modalOverlay}
                >
                    <h2>{notificationMessage}</h2>

                    <div className={style.btn}>
                        <button onClick={handleCloseModalMsg} className={style.btnSave}>OK</button>
                    </div>
                </Modal>
            </div>
        </div >
    )
}

export default UserInfor