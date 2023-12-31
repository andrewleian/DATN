import React, { useState, useEffect, useRef, useContext } from 'react';
import style from './AdminLayout.module.scss';
import { Link, useNavigate } from "react-router-dom";
import routes from "../../config/routes";
import clsx from "clsx"
import logo from './logo.png'
import axios from "axios";
// import { StoreContext, actions } from '../../store'
function AdminLayout1({ children }) {
    const role = JSON.parse(localStorage.getItem('role'))
    const token = JSON.parse(localStorage.getItem('token'))
    const currentPageAdmin = JSON.parse(localStorage.getItem('currentPageAdmin'))
    // const [state, dispatch] = useContext(StoreContext)
    const navigate = useNavigate();

    // set current selected page
    const setCurrentPageSelected = (page) => {
        localStorage.setItem("currentPageAdmin", JSON.stringify(page))
    }


    // thông tin ng dùng
    const [userInfor, setUserInfor] = useState([]);

    const getUserInfor = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const [response] = await Promise.all([
                axios.get(`http://localhost:8080/api/v1/account/my-customer/get-account/staff`)
            ]);
            if (
                response.data.roleName == 'STAFF' &&
                (window.location.href.endsWith('/adminStatistical1') || window.location.href.endsWith('/adminStaff1'))
            ) {
                navigate(routes.home);
            }
            setUserInfor(response.data)
        } catch (error) {
            console.log(error);
            navigate(routes.home);
            // window.location.reload();
        }
    }

    useEffect(() => {
        getUserInfor();
    }, [])

    // logout
    const signOut = () => {
        localStorage.setItem("username", JSON.stringify(""))
        localStorage.setItem("token", JSON.stringify(""))
        localStorage.setItem("role", JSON.stringify(""))
        navigate(routes.home);
        window.location.reload();
    }
    //
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [isDropdownUserOpen, setIsDropdownUserOpen] = useState(false);

    const toggleDropdownUser = () => {
        setIsDropdownUserOpen(!isDropdownUserOpen);
    };

    /// đóng mở left sidebar
    const sidebarRef = useRef();
    const pageContainerRef = useRef();
    const headerNavbarRef = useRef();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const handleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }



    useEffect(() => {
        if (isSidebarOpen) {
            pageContainerRef.current.style.width = 'calc(100% - 280px)'
            headerNavbarRef.current.style.width = 'calc(100% - 280px)'
            sidebarRef.current.style.backgroundColor = "#ffffff"
            sidebarRef.current.style.boxShadow = "0 2px 8px rgba(24, 24, 24, 0.15)"

        } else {
            pageContainerRef.current.style.width = '100%'
            headerNavbarRef.current.style.width = '100%'
            sidebarRef.current.style.backgroundColor = "#f9fafb"
            sidebarRef.current.style.boxShadow = "none"
        }
    }, [isSidebarOpen])


    return (

        <div className={style.container}>

            {/* <div id='loader'>
        <div className="spinner"></div>
      </div> */}

            {/* <!-- @App Content -->
      <!-- =================================================== --> */}
            {/* <!-- #Left Sidebar ==================== --> */}
            <div className={style.sidebar} ref={sidebarRef}>
                <div className={style.sidebarInner}>
                    {/* <!-- ### $Sidebar Header ### --> */}


                    {/* <!-- ### $Sidebar Menu ### --> */}
                    {isSidebarOpen && <div>
                        <div className={style.sidebarLogo} >
                            <a className={style.sidebarLink}>
                                <div className={style.peers}>
                                    <div className={style.peer}>
                                        <div className={style.logo}>
                                            <img src={logo}></img>
                                        </div>
                                    </div>
                                    <div className={style.peer}>
                                        <h5 className="">Shoeshoe</h5>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <ul className={style.sidebarMenu}>
                            <li className={clsx(style.navItem, { [style.navItemSelected]: currentPageAdmin === routes.offlineSales1 })}>
                                <Link to={routes.offlineSales1} onClick={() => setCurrentPageSelected(routes.offlineSales1)} className={clsx(style.link)}>
                                    <div className={style.sidebarLink} >
                                        <span className={style.icon}>
                                            <i className="fa-solid fa-store" style={{ color: "#27ae60" }}></i>
                                        </span>
                                        <span className={style.title}>Bán hàng</span>
                                    </div>
                                </Link>
                            </li>


                            <li className={clsx(style.navItem, { [style.navItemSelected]: currentPageAdmin === routes.adminBill1 })}>
                                <Link to={routes.adminBill1} onClick={() => setCurrentPageSelected(routes.adminBill1)} className={clsx(style.link)}>
                                    <div className={style.sidebarLink} >
                                        <span className={style.icon}>
                                            <i className="fa-solid fa-receipt" style={{ color: "#3498db" }}></i>
                                        </span>
                                        <span className={style.title}>Đơn hàng</span>
                                    </div>
                                </Link>
                            </li>

                            {/* <li className={clsx(style.navItem, { [style.navItemSelected]: currentPageAdmin === routes.adminExchange1 })}>
                                <Link to={routes.adminExchange1} onClick={() => setCurrentPageSelected(routes.adminExchange1)} className={clsx(style.link)}>
                                    <div className={style.sidebarLink} >
                                        <span className={style.icon}>
                                            <i className="fa-solid fa-arrow-right-arrow-left" style={{ color: "pink" }}></i>
                                        </span>
                                        <span className={style.title}>Đổi trả</span>
                                    </div>
                                </Link>
                            </li> */}


                            <li className={clsx(style.navItem, { [style.navItemSelected]: currentPageAdmin === routes.adminPromotion1 })}>
                                <Link to={routes.adminPromotion1} onClick={() => setCurrentPageSelected(routes.adminPromotion1)} className={clsx(style.link)}>
                                    <div className={style.sidebarLink} >
                                        <span className={style.icon}>
                                            <i className="fa-solid fa-percent" style={{ color: "#e74c3c" }}></i>
                                        </span>
                                        <span className={style.title}>Giảm giá</span>
                                    </div>
                                </Link>

                            </li>



                            <li className={clsx(style.navItem, { [style.navItemSelected]: currentPageAdmin === routes.adminCustomer1 })}>
                                <Link to={routes.adminCustomer1} onClick={() => setCurrentPageSelected(routes.adminCustomer1)} className={clsx(style.link)}>
                                    <div className={style.sidebarLink} >
                                        <span className={style.icon}>
                                            <i className="fa-solid fa-users"></i>
                                        </span>
                                        <span className={style.title}>Khách hàng</span>
                                    </div>
                                </Link>
                            </li>


                            {
                                userInfor.roleName == "DIRECTOR" && <li className={clsx(style.navItem, { [style.navItemSelected]: currentPageAdmin === routes.adminStaff1 })}>
                                    <Link to={routes.adminStaff1} onClick={() => setCurrentPageSelected(routes.adminStaff1)} className={clsx(style.link)}>
                                        <div className={style.sidebarLink} >
                                            <span className={style.icon}>
                                                <i className="fa-solid fa-person" Adminator ></i>
                                            </span>
                                            <span className={style.title}>Nhân viên</span>
                                        </div>
                                    </Link>
                                </li>
                            }




                            {/* {
                                userInfor.roleName == "DIRECTOR" && <li className={style.navItem}>
                                    <div className={style.sidebarLink} >
                                        <span className={style.icon}>
                                            <i class="fa-solid fa-clock-rotate-left" style={{ color: "#3498db" }}></i>
                                        </span>
                                        <span className={style.title}>Lịch sử thao tác</span>
                                    </div>
                                </li>
                            } */}

                            <li className={style.navItemDropDown}>
                                <div className={style.dropdownToggle} onClick={toggleDropdown}>
                                    <span className={style.icon} >
                                        <i className="fa-brands fa-product-hunt" style={{ color: "#e67e22" }}></i>
                                    </span>
                                    <span className={style.title}>Sản phẩm</span>
                                    <span className={style.arrow}>
                                        <i className={`fa-solid fa-angle-${isDropdownOpen ? 'down' : 'right'}`}></i>
                                    </span>
                                </div>

                                <ul className={style.dropdownMenu} style={{ display: isDropdownOpen ? 'block' : 'none' }}>
                                    <li className={clsx({ [style.navItemSelected]: currentPageAdmin === routes.adminProduct1 })}>
                                        <Link to={routes.adminProduct1} onClick={() => setCurrentPageSelected(routes.adminProduct1)} className={clsx(style.link)}>
                                            <div className={style.sidebarLink} >Sản phẩm</div>
                                        </Link>

                                    </li>
                                    <li className={clsx({ [style.navItemSelected]: currentPageAdmin === routes.adminProductDetail1 })}>
                                        <Link to={routes.adminProductDetail1} onClick={() => setCurrentPageSelected(routes.adminProductDetail1)} className={clsx(style.link)}>
                                            <div className={style.sidebarLink} >Sản phẩm chi tiết</div>
                                        </Link>
                                    </li>
                                    <li className={clsx({ [style.navItemSelected]: currentPageAdmin === routes.adminColor1 })}>
                                        <Link to={routes.adminColor1} onClick={() => setCurrentPageSelected(routes.adminColor1)} className={clsx(style.link)}>
                                            <div className={style.sidebarLink} >Màu sắc</div>
                                        </Link>
                                    </li>
                                    <li className={clsx({ [style.navItemSelected]: currentPageAdmin === routes.adminSize1 })}>
                                        <Link to={routes.adminSize1} onClick={() => setCurrentPageSelected(routes.adminSize1)} className={clsx(style.link)}>
                                            <div className={style.sidebarLink} >Size</div>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            {
                                userInfor.roleName == "DIRECTOR" && <li className={style.navItem}>
                                    <Link to={routes.adminStatistical1} onClick={() => setCurrentPageSelected(routes.adminStatistical1)} className={clsx(style.link)}>
                                        <div className={style.sidebarLink}>
                                            <span className={style.icon}>
                                                <i className="fa-solid fa-chart-simple" style={{ color: "#9b59b6" }}></i>
                                            </span>
                                            <span className={style.title}>Thống kê</span>
                                        </div>
                                    </Link>
                                </li>
                            }
                        </ul>
                    </div>}
                </div>
            </div>

            {/* <!-- #Main ============================ --> */}
            <div className={style.pageContainer} ref={pageContainerRef}>
                {/* <!-- ### $Topbar ### --> */}
                <div className={style.headerNavbar} ref={headerNavbarRef}>
                    <div className={style.headerContainer}>
                        {/* 1 */}
                        <ul className={style.navLeft}>
                            <li>
                                <a id='sidebar-toggle' className={style.sidebarToggle} onClick={handleSidebar}>
                                    <i className="fa-solid fa-bars"></i>
                                </a>
                            </li>
                            <li className={style.searchBox}>
                                <a className={style.searchToggle} >
                                    {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                                </a>
                            </li>
                            <li className={style.searchInput}>
                                <input readOnly className={style.formControl} type="text" />
                            </li>
                        </ul>
                        {/* 2 */}
                        <ul className={style.navRight}>
                            {/* <li className={style.notificationsDropdown}>
                                <span className={style.counter}>3</span>
                                <a className={style.dropdown} id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <i className="fa-regular fa-bell"></i>
                                </a>

                            </li> */}

                            {/* 3 */}
                            {/* <li className={style.notificationsDropdown}>
                                <span className={style.counter}>3</span>
                                <a className={style.dropdownToggle} data-bs-toggle="dropdown">
                                    <i className="fa-regular fa-envelope"></i>
                                </a>
                            </li> */}

                            <li className={style.dropdown}>
                                <div className={style.dropdownToggle} data-bs-toggle="dropdown" onClick={toggleDropdownUser}>
                                    <div className={style.peer}>
                                        <img className="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/10.jpg" alt="" />
                                    </div>
                                    <div className={style.peer}>
                                        <span className="fsz-sm c-grey-900">{userInfor.staffName}</span>
                                    </div>
                                </div>

                                <ul className={style.dropdownMenu} style={{ display: isDropdownUserOpen ? 'block' : 'none' }}>
                                    {/* <li>
                                        <a  >
                                            <i className="fa-solid fa-gear"></i>
                                            <span>Setting</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a  >
                                            <i className="fa-solid fa-user"></i>
                                            <span>Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a  >
                                            <i className="fa-solid fa-envelope"></i>
                                            <span>Messages</span>
                                        </a>
                                    </li> */}
                                    {/* <li role="separator" className={style.divider}></li> */}
                                    <li className={style.logout}>
                                        <a>
                                            <i className="fa-solid fa-right-from-bracket"></i>
                                            <span onClick={signOut}>Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* <!-- ### $App Screen Content ### --> */}
                <div className={style.mainContent}>
                    {children}
                </div>

                {/* <!-- ### $App Screen Footer ### --> */}
                <footer className={style.copyright}>
                    <span>Copyright © Shoeshoe</span>
                </footer>
            </div>
        </div >


    );
}

export default AdminLayout1;