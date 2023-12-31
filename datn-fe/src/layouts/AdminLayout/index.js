import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import style from "./AdminLayout.module.scss";
import routes from "../../config/routes";
import { useState } from "react";

function AdminLayout({ children }) {
    const [currentPage, setCurrentPage] = useState(routes.offlineSales);

    return (
        <div>
            <div className={clsx(style.header)}>
                <ul>
                    <li onClick={() => setCurrentPage(routes.offlineSales)}>
                        <Link
                            to={routes.offlineSales}
                            className={clsx(
                                currentPage === routes.offlineSales && style.headerActive,
                                style.link
                            )}
                        >
                            Bán hàng
                        </Link>
                    </li>
                    <li onClick={() => setCurrentPage(routes.adminBill)}>
                        <Link
                            to={routes.adminBill}
                            className={clsx(
                                currentPage === routes.adminBill && style.headerActive,
                                style.link
                            )}
                        >
                            Hóa đơn
                        </Link>
                    </li>
                    <li onClick={() => setCurrentPage(routes.adminProduct)}>
                        <Link
                            to={routes.adminProduct}
                            className={clsx(
                                currentPage === routes.adminProduct && style.headerActive,
                                style.link
                            )}
                        >
                            Sản phẩm
                        </Link>
                    </li>
                    <li onClick={() => setCurrentPage(routes.adminProductDetail)}>
                        <Link
                            to={routes.adminProductDetail}
                            className={clsx(
                                currentPage === routes.adminProductDetail && style.headerActive,
                                style.link
                            )}
                        >
                            Sản phẩm chi tiết
                        </Link>
                    </li>
                    <li onClick={() => setCurrentPage(routes.adminPromotion)}>
                        <Link
                            to={routes.adminPromotion}
                            className={clsx(
                                currentPage === routes.adminPromotion && style.headerActive,
                                style.link
                            )}
                        >
                            Khuyến mãi
                        </Link>
                    </li>
                    <li onClick={() => setCurrentPage(routes.adminStaff)}>
                        <Link
                            to={routes.adminStaff}
                            className={clsx(
                                currentPage === routes.adminStaff && style.headerActive,
                                style.link
                            )}
                        >
                            Nhân viên
                        </Link>
                    </li>
                    <li onClick={() => setCurrentPage(routes.adminCustomer)}>
                        <Link
                            to={routes.adminCustomer}
                            className={clsx(
                                currentPage === routes.adminCustomer && style.headerActive,
                                style.link
                            )}
                        >
                            Khách hàng
                        </Link>
                    </li>
                    <li onClick={() => setCurrentPage(routes.adminStatistical)}>
                        <Link
                            to={routes.adminStatistical}
                            className={clsx(
                                currentPage === routes.adminStatistical && style.headerActive,
                                style.link
                            )}
                        >
                            Thống kê
                        </Link>
                    </li>
                    {/* <li>Báo cáo</li> */}
                    <li>
                        <Link to={routes.home} className={style.link}>
                            Website
                        </Link>
                    </li>
                </ul>
            </div>

            <div className={style.main}>{children}</div>
        </div>
    );
}

export default AdminLayout;
