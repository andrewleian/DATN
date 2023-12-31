import clsx from 'clsx'
import { Link } from 'react-router-dom'
import style from './Footer.module.scss'
import routes from '../../../config/routes'
import shoeshoe from './shoeshoe.png'

function Footer() {

    return (
        <div className={clsx(style.container)}>
            <div className={style.firstCol}>
                <img className={clsx(style.imgFirstCol)} src={shoeshoe}></img>
                <p className={clsx(style.timCuaHang)}>TÌM CỬA HÀNG</p>
            </div>

            <div className={style.secondCol}>
                <div className={style.row1}>
                    <div className={style.item}>
                        <p className={clsx(style.title)}>SẢN PHẨM</p>

                        <ul>
                            <li className={clsx(style.li)}>Giày Nam</li>
                            <li className={clsx(style.li)}>Giày Nữ</li>
                            <li className={clsx(style.li)}>Thời trang & Phụ kiện</li>
                            <li className={clsx(style.li)}>Sale-off</li>
                        </ul>
                    </div>

                    <div className={style.item}>
                        <p className={clsx(style.title)}>VỀ CÔNG TY</p>

                        <ul>
                            <li className={clsx(style.li)}><Link to={routes.career} className={clsx(style.link)}>Dứa tuyển dụng</Link></li>
                            <li className={clsx(style.li)}>
                                <Link to={routes.franchisePolicy} className={clsx(style.link)}>Liên hệ nhượng quyền</Link>
                            </li>
                            <li className={clsx(style.li)}>Về SHOE SHOE</li>
                        </ul>
                    </div>

                    <div className={style.item}>
                        <p className={clsx(style.title)}>HỖ TRỢ</p>

                        <ul>
                            <li className={clsx(style.li)}> <Link to={routes.faqs} className={clsx(style.link)}>FAQs</Link></li>
                            <li className={clsx(style.li)}>
                                <Link to={routes.privacy} className={clsx(style.link)}>Bảo mật thông tin</Link>
                            </li>
                            <li className={clsx(style.li)}>
                                <Link to={routes.policy} className={clsx(style.link)}>Chính sách chung</Link>
                            </li>
                            <li className={clsx(style.li)}>
                                <Link to={routes.traCuuDonHang} className={clsx(style.link)}>Tra cứu đơn hàng</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={style.item}>
                        <p className={clsx(style.title)}>LIÊN HỆ</p>

                        <ul>
                            <li className={clsx(style.li)}>Email góp ý</li>
                            <li className={clsx(style.li)}>Hotline</li>
                            <li className={clsx(style.li)}>0963 429 749</li>
                        </ul>
                    </div>

                </div>

                <div className={clsx(style.row2)}>
                    <div className={style.item}>
                        <p className={clsx(style.title)}>SHOESHOE SOCIAL</p>

                        <ul className={clsx(style.ul)}>
                            <li className={clsx(style.liSocial)}>
                                <Link className={clsx(style.link)}><i className="fa-brands fa-square-facebook"></i></Link>
                            </li>
                            <li className={clsx(style.liSocial)}>
                                <Link className={clsx(style.link)}><i className="fa-brands fa-square-instagram"></i></Link>
                            </li>
                            <li className={clsx(style.liSocial)}>
                                <Link className={clsx(style.link)}><i className="fa-brands fa-square-youtube"></i></Link>
                            </li>
                        </ul>
                    </div>

                    <div className={style.item}>
                        <p className={clsx(style.title)}>ĐĂNG KÝ NHẬN MAIL</p>
                        <ul className={clsx(style.ul)}>
                            <input className={clsx(style.inputEmail)}></input>
                            <button className={clsx(style.btnEmail)}><i className="fa-regular fa-paper-plane"></i></button>
                        </ul>
                    </div>

                    <div className={style.item}>
                        {/* <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/Logo_Ananas_Footer.svg"></img> */}
                        <p className={clsx(style.textLogo)}>SHOE SHOE</p>
                    </div>
                </div>

                <div className={clsx(style.row3)}>
                    <div className={style.item}>
                        <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/icon_bocongthuong.png"></img>
                    </div>

                    <div className={style.itemCopyright}>
                        <p className={style.copyright}><Link className={clsx(style.link)}>Copyright © 2022 SHOE SHOE. All rights reserved.</Link></p>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
    )
}

export default Footer