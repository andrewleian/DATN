import { useState, useRef, useEffect, useContext } from "react"
import { Link, json, parsePath, useLocation, useParams, useNavigate } from 'react-router-dom'
import { StoreContext, actions } from '../../../store'
import axios from "axios";
import clsx from "clsx"
import style from "./Header1.module.scss"
import Modal from 'react-modal';
import routes from "../../../config/routes";


function Login1({ value }) {

    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))
    const [state, dispatch] = useContext(StoreContext)
    const navigate = useNavigate();
    const [account, setAccount] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("")

    // modal message
    const [messageModal, setMessageModal] = useState("")
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);

    const handleCloseModalMsg = () => {
        setIsModalMsgOpen(false);
        // loadAndResetData();
    };



    //template
    const [currentTemplate, setCurrentTemplate] = useState("signIn");
    // const signInRef = useRef();
    // const signUpRef = useRef();
    // const forgotPasswordRef = useRef();

    // sign in

    const handleUsername = (username) => {
        const password = account.password;
        setAccount({ username: username, password: password })
    }
    const handlePassword = (password) => {
        const username = account.username;
        setAccount({ username: username, password: password })
    }

    const login = async () => {
        try {
            delete axios.defaults.headers.common['Authorization'];
            const response = await axios.post(`http://localhost:8080/api/v1/authenticate/login`, account);
            localStorage.setItem("username", JSON.stringify(account.username))
            localStorage.setItem("token", JSON.stringify(response.data.accessToken))
            localStorage.setItem("role", JSON.stringify(response.data.role))
            setMessage("")
            if (response.data.role == 'CUSTOMER') {
                // navigate('/');
                value.displayLogin.current.style.display = "none"
                dispatch(actions.setIsLogin(false))
                window.location.reload();
                // value.setIsLoginActive(false)
            }
            if (response.data.role == 'DIRECTOR' || response.data.role == "STAFF") {
                navigate(routes.adminWelcome);
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 403 || error.response.status === 401) {
                setMessage("Tài khoản hoặc mật khẩu không chính xác")
            } else {
                setMessage("Lỗi hệ thống, xin thử lại sau")
            }
        }
    };

    // sign up
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerm, setAgreeTerm] = useState(false);
    const [signUpForm, setSignUpForm] = useState({
        customerName: '',
        phone: '',
        email: '',
        username: '',
        password: '',
    });
    const [msgSignUpForm, setMsgSignUpForm] = useState({
        customerName: -1,
        phone: -1,
        email: -1,
        username: -1,
        password: -1,
    });

    const handleInput = (key, value) => {
        setSignUpForm((prev) => ({
            ...prev,
            [key]: value
        }));

        validateInput(key, value)
    };

    const validateInput = (key, value) => {
        const validators = {
            customerName: /^[a-zA-ZÀ-Ỹà-ỹ]+(\s[a-zA-ZÀ-Ỹà-ỹ]+)*$/,
            phone: /^(?:\+?84|0)(?:\d{9}|\d{10})$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            username: /^[a-zA-Z0-9_-]{3,16}$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        };

        const validator = validators[key];
        if (validator) {

            if (value === undefined || value === null || value.trim() === '') {
                setMsgSignUpForm((prevMessages) => ({
                    ...prevMessages,
                    [key]: 2
                }));
                return false;
            }


            const isValid = validator.test(value);
            setMsgSignUpForm((prevMessages) => ({
                ...prevMessages,
                [key]: isValid ? 1 : 0,
            }));
            return isValid;
        }

        return true;
    };

    const handleDefaultValue = (action) => {
        setSignUpForm({
            customerName: '',
            phone: '',
            email: '',
            username: '',
            password: '',
        })

        setMsgSignUpForm({
            customerName: -1,
            phone: -1,
            email: -1,
            username: -1,
            password: -1,
        })
    }


    const handleSignUp = () => {
        let isValid = true;

        for (const key in signUpForm) {
            if (signUpForm.hasOwnProperty(key)) {
                if (signUpForm.id && key === 'password') {
                    continue;
                }
                // if (!validateInput(key, signUpForm[key])) {
                //     isValid = false;
                // }
                isValid = validateInput(key, signUpForm[key])
            }
        }

        if (!agreeTerm) {
            setMessageModal("Vui lòng đồng ý với điều khoản dịch vụ")
            setIsModalMsgOpen(true)
            return
        }


        if (isValid) {
            const addCustomer = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.post(`http://localhost:8080/api/v1/authenticate/register`, { username: signUpForm.username, password: signUpForm.password, email: signUpForm.email, customerName: signUpForm.customerName, phone: signUpForm.phone });
                    // if (response.status == 201) {
                    handleDefaultValue('create')
                    setMessageModal("Chúc mừng bạn đã tạo tài khoản thành công")
                    setIsModalMsgOpen(true)
                    setCurrentTemplate("signIn")
                } catch (error) {
                    if (error.response.data[0]) {
                        setMessageModal(error.response.data[0])
                        setIsModalMsgOpen(true)
                    } else {
                        setMessageModal(error.response.data.message)
                        setIsModalMsgOpen(true)
                    }
                }
            };
            addCustomer();
        }
    };

    //
    const loadAndResetData = () => {
        value.getCustomers();
        value.displayAddnew.current.style.display = "none"
        value.setIsAddNewActive(false)
        handleDefaultValue('cancel')
    }


    // forgot password

    // show otp
    const [showOTP, setShowOTP] = useState(false);

    // mã otp
    const [otp, setOTP] = useState("");
    const [displayOTP, setDisplayOTP] = useState(false);

    // change password
    const [changePassword, setChangePassword] = useState({ email: "", newPass: "", confirmPass: "" });
    const [changePasswordMsg, setChangePasswordMsg] = useState({ email: -1, newPass: -1, confirmPass: -1 })

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

        // if (key === "newPass") {
        //     const validatorPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        //     if (value === undefined || value === null || value === '') {
        //         setChangePasswordMsg((prevMessages) => ({
        //             ...prevMessages,
        //             newPass: 2
        //         }));
        //         // return false;
        //     }

        //     const isValid = validatorPassword.test(value);
        //     setChangePasswordMsg((prevMessages) => ({
        //         ...prevMessages,
        //         newPass: isValid ? 1 : 0,
        //     }));
        //     // return isValid;

        //     if (value === changePassword.confirmPass) {
        //         setChangePasswordMsg((prevMessages) => ({
        //             ...prevMessages,
        //             confirmPass: 1,
        //         }));
        //     } else {
        //         setChangePasswordMsg((prevMessages) => ({
        //             ...prevMessages,
        //             confirmPass: 0,
        //         }));
        //     }
        //     if (changePassword.confirmPass === undefined || changePassword.confirmPass === null || changePassword.confirmPass === '') {
        //         setChangePasswordMsg((prevMessages) => ({
        //             ...prevMessages,
        //             confirmPass: 2
        //         }));
        //         // return false;
        //     }
        // }

        // if (key === "confirmPass") {
        //     if (changePassword.newPass === value) {
        //         setChangePasswordMsg((prevMessages) => ({
        //             ...prevMessages,
        //             confirmPass: 1,
        //         }));
        //     } else {
        //         setChangePasswordMsg((prevMessages) => ({
        //             ...prevMessages,
        //             confirmPass: 0,
        //         }));
        //     }
        //     if (value === undefined || value === null || value === '') {
        //         setChangePasswordMsg((prevMessages) => ({
        //             ...prevMessages,
        //             confirmPass: 2
        //         }));
        //         // return false;
        //     }
        // }
    };

    const submitChangePass = () => {
        let isvalid = true;

        const validatorPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (changePassword.email === undefined || changePassword.email === null || changePassword.email === '') {
            setChangePasswordMsg((prevMessages) => ({
                ...prevMessages,
                email: 2
            }));
            setMessageModal("Vui lòng nhập đầy đủ dữ liệu")
            setIsModalMsgOpen(true)
            return
            isvalid = false;
        }
        let isValidEmail = validateEmail.test(changePassword.email);
        setChangePasswordMsg((prevMessages) => ({
            ...prevMessages,
            email: isValidEmail ? 1 : 0,
        }));

        if (!isValidEmail) {
            setMessageModal("Địa chỉ email không hợp lệ")
            setIsModalMsgOpen(true)
            return
            isvalid = false;
        }

        if (changePassword.newPass === undefined || changePassword.newPass === null || changePassword.newPass === '') {
            // setChangePasswordMsg((prevMessages) => ({
            //     ...prevMessages,
            //     newPass: 2
            // }));
            setMessageModal("Vui lòng nhập đầy đủ dữ liệu")
            setIsModalMsgOpen(true)
            return
            isvalid = false;
        }

        let isValidNewPass = validatorPassword.test(changePassword.newPass);
        // setChangePasswordMsg((prevMessages) => ({
        //     ...prevMessages,
        //     newPass: isValid ? 1 : 0,
        // }));
        // isvalid = isValid;
        if (!isValidNewPass) {
            isvalid = false;
        }
        if (!isValidNewPass) {
            setMessageModal("Mật khẩu phải chứa ít nhất một chữ cái thường, một chữ cái hoa, một chữ số, một ký tự đặc biệt và có ít nhất 8 ký tự")
            setIsModalMsgOpen(true)
            return
        }


        if (changePassword.confirmPass === undefined || changePassword.confirmPass === null || changePassword.confirmPass === '') {
            // setChangePasswordMsg((prevMessages) => ({
            //     ...prevMessages,
            //     confirmPass: 2
            // }));
            setMessageModal("Vui lòng xác nhận lại mật khẩu mới")
            setIsModalMsgOpen(true)
            return
            isvalid = false;
        }

        if (changePassword.newPass === changePassword.confirmPass) {
            // setChangePasswordMsg((prevMessages) => ({
            //     ...prevMessages,
            //     confirmPass: 1,
            // }));

        } else {
            // setChangePasswordMsg((prevMessages) => ({
            //     ...prevMessages,
            //     confirmPass: 0,
            // }));
            setMessageModal("Mật khẩu mới và mật khẩu xác nhận không khớp")
            setIsModalMsgOpen(true)
            return
            isvalid = false;
        }
        if (isvalid) {

            const changePasswordApi = async () => {
                try {
                    delete axios.defaults.headers.common['Authorization'];
                    const response = await axios.post(`http://localhost:8080/api/v1/authenticate/forgot-password`, { email: changePassword.email, password: changePassword.newPass, confirmPassword: changePassword.confirmPass });
                    setChangePasswordMsg({ email: "", newPass: "", confirmPass: "" })
                    setChangePassword({ email: "", newPass: "", confirmPass: "" })
                    setDisplayOTP(true)

                } catch (error) {
                    setMessageModal(error.response.data)
                    setIsModalMsgOpen(true)
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
                const response = await axios.post(`http://localhost:8080/api/v1/authenticate/comfim-otp/?otp=${otp}`);
                // setChangePasswordMsg({ email: "", newPass: "", confirmPass: "" })
                // setChangePassword({ email: "", newPass: "", confirmPass: "" })
                // console.log(response.data)
                // setDisplayOTP(false)
                setMessageModal("Thành công")
                setIsModalMsgOpen(true)
                setCurrentTemplate("signIn")
            } catch (error) {
                setMessageModal(error.response.data)
                setIsModalMsgOpen(true)
                console.log(error);
            }
        };
        changePasswordApi();
    }

    // thoát sign in
    const btnExit = () => {
        value.displayLogin.current.style.display = "none"
        dispatch(actions.setIsLogin(false))
        setCurrentTemplate("signIn")
    }

    return (
        <div className={style.formLogin}>


            <button onClick={btnExit} className={style.btnExit}><i className="fa-solid fa-x"></i></button>

            {currentTemplate == "forgotPassword" && <div className={style.rowSignUp}>
                <div className={style.col2}>
                    <p className={style.title}>Quên mật khẩu</p>
                    <div className={style.form}>

                        {!displayOTP && <div>
                            {/* <div className={style.formGroup}>
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-envelope"></i> </div>
                                    <input value={changePassword.email} onChange={(e) => handleChangePassword('email', e.target.value)} placeholder="Your Email" />
                                </div>
                            </div> */}

                            <div className={style.formGroup}>
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-user"></i></div>
                                    <input value={changePassword.email} onChange={(e) => handleChangePassword('email', e.target.value)} placeholder="Email" />
                                    {changePasswordMsg.email === 1 && <div className={style.iconRightCorrect}><i className="fa-solid fa-check"></i></div>}
                                    {changePasswordMsg.email === 2 || changePasswordMsg.email === 0 &&
                                        <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div>}
                                </div>
                                {changePasswordMsg.newPass === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            </div>

                            {/* <div className={style.formGroup}>
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-lock"></i> </div>
                                    <input value={changePassword.newPass} onChange={(e) => handleChangePassword('newPass', e.target.value)} placeholder="New password" />
                                </div>
                            </div> */}

                            {/* <div className={style.formGroup}>
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-user"></i></div>
                                    <input value={changePassword.newPass} onChange={(e) => handleChangePassword('newPass', e.target.value)} placeholder="New password" />
                                    {changePasswordMsg.newPass === 1 && <div className={style.iconRightCorrect}><i className="fa-solid fa-check"></i></div>}
                                    {changePasswordMsg.newPass === 2 || changePasswordMsg.newPass === 0 &&
                                        <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div>}
                                </div>
                                {changePasswordMsg.newPass === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            </div> */}

                            <div className={style.formGroup}>
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-lock"></i> </div>
                                    <input type={showPassword ? 'text' : 'password'} value={changePassword.newPass} onChange={(e) => handleChangePassword('newPass', e.target.value)} placeholder="Mật khẩu mới" />
                                    <div className={style.iconRightPassword} onClick={() => setShowPassword(!showPassword)}>
                                        <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </div>
                                </div>
                                {changePasswordMsg.newPass === 2 && <label className={style.errorMessage}><br></br>Không được để trống</label>}
                                {changePasswordMsg.newPass === 0 && <label className={style.errorMessage}><br></br>Mật khẩu phải chứa ít nhất một chữ cái thường, một chữ cái hoa, một chữ số, một ký tự đặc biệt và có ít nhất 8 ký tự</label>}
                            </div>

                            {/* <div className={style.formGroup}>
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-lock"></i> </div>
                                    <input value={changePassword.confirmPass} onChange={(e) => handleChangePassword('confirmPass', e.target.value)} type="password" placeholder="Confirm new password" />
                                </div>
                            </div> */}

                            {/* <div className={style.formGroup}>
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-lock"></i></div>
                                    <input value={changePassword.confirmPass} onChange={(e) => handleChangePassword('confirmPass', e.target.value)} type="password" placeholder="Xác nhận mật khẩu" />
                                    {changePasswordMsg.confirmPass === 1 && <div className={style.iconRightCorrect}><i className="fa-solid fa-check"></i></div>}
                                    {changePasswordMsg.confirmPass === 2 || changePasswordMsg.confirmPass === 0 &&
                                        <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div>}
                                </div>
                                {changePasswordMsg.confirmPass === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            </div> */}

                            <div className={style.formGroup}>
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-lock"></i> </div>
                                    <input type={showPassword ? 'text' : 'password'} value={changePassword.confirmPass} onChange={(e) => handleChangePassword('confirmPass', e.target.value)} placeholder="Xác nhận mật khẩu" />
                                    <div className={style.iconRightPassword} onClick={() => setShowPassword(!showPassword)}>
                                        <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </div>
                                </div>
                                {/* {changePasswordMsg.confirmPass === 2 && <label className={style.errorMessage}><br></br>Không được để trống</label>}
                                {changePasswordMsg.confirmPass === 0 && <label className={style.errorMessage}><br></br>Mật khẩu phải chứa ít nhất một chữ cái thường, một chữ cái hoa, một chữ số, một ký tự đặc biệt và có ít nhất 8 ký tự</label>} */}
                            </div>
                        </div>}

                        {displayOTP &&
                            <div className={style.formGroup}>
                                <div class="form-group">
                                    <div className={style.inputWithIcon}>
                                        <i className="fa-solid fa-user"></i>
                                        <input value={otp} onChange={(e) => setOTP(e.target.value)} type="text" placeholder="Nhập mã OTP" />
                                    </div>
                                </div>
                            </div>}

                        <div className={style.formGroupBtn}>
                            {!displayOTP && <button onClick={submitChangePass}>Lấy mã otp</button>}
                            {displayOTP && <button onClick={submitOTP}>Lưu</button>}
                        </div>
                    </div>

                </div>
                <div className={style.col1}>
                    <img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"></img>
                    <p onClick={() => setCurrentTemplate("signIn")}>I am already member</p>
                </div>


            </div>}

            {currentTemplate == "signUp" && <div className={style.rowSignUp}>
                <div className={style.col2}>
                    <p className={style.title}>Đăng ký</p>
                    <div className={style.form}>
                        <div className={style.formGroup}>
                            <div className="form-group">
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-user"></i></div>
                                    <input value={signUpForm.customerName} onChange={(e) => handleInput('customerName', e.target.value)} type="text" placeholder="Your Name" />
                                    {msgSignUpForm.customerName === 1 && <div className={style.iconRightCorrect}><i className="fa-solid fa-check"></i></div>}
                                    {msgSignUpForm.customerName === 2 || msgSignUpForm.customerName === 0 &&
                                        <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div>}
                                </div>
                                {msgSignUpForm.customerName === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            </div>
                        </div>

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                <div className={style.iconLeft}> <i className="fa-solid fa-envelope"></i> </div>

                                <input value={signUpForm.email} onChange={(e) => handleInput('email', e.target.value)} placeholder="Your Email" />
                                {msgSignUpForm.email === 1 && <div className={style.iconRightCorrect}><i className="fa-solid fa-check"></i></div>}
                                {msgSignUpForm.email === 2 || msgSignUpForm.email === 0 &&
                                    <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div>}
                            </div>
                            {msgSignUpForm.email === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            {/* {msgSignUpForm.email === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>} */}
                        </div>

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                <div className={style.iconLeft}> <i className="fa-solid fa-phone"></i> </div>
                                <input value={signUpForm.phone} onChange={(e) => handleInput('phone', e.target.value)} placeholder="Your Phone number" />
                                {msgSignUpForm.phone === 1 && <div className={style.iconRightCorrect}><i className="fa-solid fa-check"></i></div>}
                                {msgSignUpForm.phone === 2 || msgSignUpForm.phone === 0 &&
                                    <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div>}
                            </div>
                            {msgSignUpForm.phone === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            {/* {msgSignUpForm.phone === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>} */}
                        </div>

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                <div className={style.iconLeft}> <i className="fa-solid fa-user"></i></div>
                                <input value={signUpForm.username} onChange={(e) => handleInput('username', e.target.value)} placeholder="Username" />
                                {msgSignUpForm.username === 1 && <div className={style.iconRightCorrect}><i className="fa-solid fa-check"></i></div>}
                                {msgSignUpForm.username === 2 || msgSignUpForm.username === 0 &&
                                    <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div>}
                            </div>
                            {msgSignUpForm.username === 2 && <label className={style.errorMessage}>Không được để trống</label>}
                            {/* {msgSignUpForm.username === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>} */}
                        </div>
                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                <div className={style.iconLeft}> <i className="fa-solid fa-lock"></i> </div>
                                <input type={showPassword ? 'text' : 'password'} value={signUpForm.password} onChange={(e) => handleInput('password', e.target.value)} placeholder="Password" />
                                <div className={style.iconRightPassword} onClick={() => setShowPassword(!showPassword)}>
                                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </div>
                            </div>
                            {msgSignUpForm.password === 2 && <label className={style.errorMessage}><br></br>Không được để trống</label>}
                            {msgSignUpForm.password === 0 && <label className={style.errorMessage}><br></br>Mật khẩu phải chứa ít nhất một chữ cái thường, một chữ cái hoa, một chữ số, một ký tự đặc biệt và có ít nhất 8 ký tự</label>}
                        </div>

                        <div className={style.formGroupCBX}>
                            <input checked={agreeTerm} onChange={(e) => setAgreeTerm(e.target.checked)} type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                            <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>I agree all statements in <a>Terms of service</a></label>
                        </div>

                        <div className={style.formGroupBtn}>
                            <button onClick={handleSignUp}>Register</button>
                        </div>
                    </div>

                </div>
                <div className={style.col1}>
                    <img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"></img>
                    <p onClick={() => setCurrentTemplate("signIn")}>I am already member</p>
                </div>


            </div>}

            {currentTemplate == "signIn" &&
                <div className={style.rowLogin}>
                    <div className={style.col1}>
                        <img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"></img>
                        <p onClick={() => setCurrentTemplate("signUp")}>Tạo tài khoản</p>
                    </div>

                    <div className={style.col2}>
                        <p className={style.title}>Đăng nhập</p>
                        <div className={style.form}>
                            <div className={style.formGroup}>
                                <div className="form-group">
                                    <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <div className={style.inputWithIcon}>
                                        <div className={style.iconLeft}> <i className="fa-solid fa-user"></i></div>
                                        <input value={account.username} onChange={(e) => handleUsername(e.target.value)} type="text" name="your_name" id="your_name" placeholder="Tài khoản" />
                                    </div>
                                </div>
                            </div>

                            <div className={style.formGroup}>
                                <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-lock"></i> </div>
                                    <input type="password" value={account.password} onChange={(e) => handlePassword(e.target.value)} name="your_pass" id="your_pass" placeholder="Mật khẩu" />
                                </div>
                            </div>

                            {message && <p className={style.message}>{message}</p>}
                            <div className={style.formGroupCBX}>
                                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Nhớ mật khẩu</label>
                            </div>

                            <div className={style.formGroupBtn}>
                                <button onClick={login}>Log in</button>
                            </div>
                        </div>

                        <p className={style.forgotPassword} onClick={() => setCurrentTemplate("forgotPassword")} >Quên mật khẩu</p>
                    </div>
                </div>
            }

            <div>
                <Modal
                    isOpen={isModalMsgOpen}
                    onRequestClose={handleCloseModalMsg}
                    className={style.modalWrapper}
                    overlayClassName={style.modalOverlay}
                >
                    <h2>{messageModal}</h2>

                    <div className={style.btn}>
                        <button onClick={handleCloseModalMsg} className={style.btnSave}>OK</button>
                    </div>
                </Modal>
            </div>

        </div>
    )
}

export default Login1