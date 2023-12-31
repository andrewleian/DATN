import { Link, parsePath, useNavigate } from 'react-router-dom'
import style from './Header1.module.scss'
import clsx from 'clsx'
import routes from '../../../config/routes'
import axios from 'axios'
import { useContext, useEffect, useState, useRef } from 'react'
import { StoreContext, actions } from '../../../store'

import Login1 from './Login2'
function Header1() {
    const navigate = useNavigate();

    const [state, dispatch] = useContext(StoreContext)
    const role = JSON.parse(localStorage.getItem('role'))
    const token = JSON.parse(localStorage.getItem('token'))

    // const checkLogin = () => {
    //     if (role != "CUSTOMER") {
    //         dispatch(actions.setIsLogin(true))
    //     }
    // }

    const checkLoginDonMua = () => {
        if (role != "CUSTOMER") {
            dispatch(actions.setIsLogin(true))
        } else {
            navigate('/traCuuDonHang');
        }
    }

    // profile
    const redirectProfile = () => {
        if (role != "CUSTOMER") {
            dispatch(actions.setIsLogin(true))
        } else {
            navigate('/userInfor');
        }
    }

    //show login
    const displayLogin = useRef();
    useEffect(() => {
        if (state.isLogin) {
            displayLogin.current.style.display = 'block'
        }
    }, [state.isLogin])

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.keyCode === 27) {
                displayLogin.current.style.display = 'none';
                // setIsLoginActive(false)
                dispatch(actions.setIsLogin(false))
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    // get user infor

    const [userInfor, setUserInfor] = useState([]);

    const getUserInfor = async () => {
        // if (token.length > 0) {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const [response] = await Promise.all([
                axios.get(`http://localhost:8080/api/v1/account/my-customer/get-account`)
            ]);
            setUserInfor(response.data)
        } catch (error) {
            console.log(error);
            localStorage.setItem("username", JSON.stringify(""))
            localStorage.setItem("token", JSON.stringify(""))
            localStorage.setItem("role", JSON.stringify(""))
        }
        // }
    }

    useEffect(() => {
        getUserInfor();
    }, [])

    // log out

    const logout = () => {
        localStorage.setItem("username", JSON.stringify(""))
        localStorage.setItem("token", JSON.stringify(""))
        localStorage.setItem("role", JSON.stringify(""))
        navigate(routes.home);
        window.location.reload();
    }

    // tat login

    // const turnOffLogin = () => {
    //     // displayLogin.current.style.display = 'none';
    //     // setIsLoginActive(false)
    //     // dispatch(actions.setIsLogin(false))
    // }
    //



    const [cart, setCart] = useState([]);

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

    // 

    useEffect(() => {

        if (role === "CUSTOMER") {
            getCartApi();
        } else {
            const storageCart = JSON.parse(localStorage.getItem('cart'))
            setCart(storageCart ?? [])
        }
        dispatch(actions.setCartTotalItems(cart.length))
    }, [])

    useEffect(() => {
        dispatch(actions.setCartTotalItems(cart.length))
    }, [cart])
    return (
        <div className={clsx(style.container)}>

            <ul className={clsx(style.ul)}>
                {role == "CUSTOMER" && <li className={clsx(style.li)} onClick={redirectProfile}><i className="fa-solid fa-user"></i> {userInfor.customerName}</li>}
                <li className={clsx(style.li)} onClick={checkLoginDonMua}>
                    <i className="fa-solid fa-cube"></i> Đơn mua
                </li>
                {/* <li className={clsx(style.li)}><i className="fa-solid fa-location-dot"></i> Tìm cửa hàng</li> */}
                {/* <li className={clsx(style.li)}><i className="fa-solid fa-heart"></i> Yêu thích</li> */}
                <li className={clsx(style.li)}>
                    <Link to={routes.cart} className={clsx(style.link)}><i className="fa-solid fa-cart-shopping"></i> Giỏ hàng ({state.cartTotalItems})</Link>
                </li>
                {role !== "CUSTOMER" && <li className={clsx(style.li)} onClick={() => dispatch(actions.setIsLogin(true))}><i className="fa-solid fa-user"></i> Đăng nhập</li>}
                {role == "CUSTOMER" && <li onClick={logout} className={clsx(style.li)}> <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất</li>}
            </ul>
            <div ref={displayLogin} className={style.displayLogin}>
                <Login1 value={{ displayLogin: displayLogin }} ></Login1>
            </div>
        </div>
    )
}

export default Header1