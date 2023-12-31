
import clsx from 'clsx'
import style from './OfflineSales.module.scss'

function OfflineSales() {

    return (
        <div className={clsx(style.container)}>

            <div className={clsx(style.main)}>
                <div className={clsx(style.col1)}>
                    <div className={clsx(style.row1)}>

                        <div className={clsx(style.searchProducts)}>
                            <button>Giỏ hàng</button>
                            <input placeholder="Tìm kiếm sản phẩm"></input>
                        </div>
                        <div className={clsx(style.bills)}>
                            <ul>
                                <li>Hóa đơn 1 <span></span></li>
                                <li className={clsx(style.active)}>Hóa đơn 2 <span></span></li>
                            </ul>
                        </div>
                        <div className={clsx(style.addBill)}>
                            <button><i class="fa-sharp fa-solid fa-plus"></i></button>
                        </div>
                    </div>

                    <div className={clsx(style.row2)}>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Sản phẩm</th>
                                    <th>Ảnh</th>
                                    <th>Giá</th>
                                    <th>SL</th>
                                    <th>Tổng</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>3</td>
                                    <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                    <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                    <td>650.000 VND</td>
                                    <td>1</td>
                                    <td>650.000 VND</td>
                                    <td><i class="fa-solid fa-delete-left"></i></td>
                                </tr>

                                <tr>
                                    <td>2</td>
                                    <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                    <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                    <td>650.000 VND</td>
                                    <td>1</td>
                                    <td>650.000 VND</td>
                                    <td><i class="fa-solid fa-delete-left"></i></td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>URBAS CORLURAY MIX - HIGH TOP - CORLURAY MIX</td>
                                    <td><img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1.jpeg"></img></td>
                                    <td>650.000 VND</td>
                                    <td>1</td>
                                    <td>650.000 VND</td>
                                    <td><i class="fa-solid fa-delete-left"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={clsx(style.row3)}>
                        <div className={clsx(style.top)}>
                            <div className={clsx(style.customer)}>
                                <button>Khách hàng</button>
                                <input placeholder="Tìm kiếm khách hàng"></input>
                                <input placeholder="Tìm kiếm đơn hàng (mã đh , sdt)"></input>
                            </div>

                            <div className={clsx(style.employee)}>
                                <button>Nhân viên: Lê Văn A</button>
                            </div>
                        </div>

                        <div className={clsx(style.customerInfor)}>
                            <div className={clsx(style.col_4)}>
                                <div>
                                    <label>Name</label>
                                    <input></input>
                                </div>

                                <div>
                                    <label>Phone</label>
                                    <input></input>
                                </div>

                                <div>
                                    <label>Email</label>
                                    <input></input>
                                </div>

                                <div>
                                    <label>Birthday</label>
                                    <input type="date"></input>
                                </div>
                            </div>

                            <div className={clsx(style.col_4)}>
                                <div>
                                    <label>Thành phố</label>
                                    <select>
                                        <option>-Thành phố-</option>
                                    </select>
                                </div>

                                <div>
                                    <label>Quận huyện</label>
                                    <select>
                                        <option>-Quận huyện-</option>
                                    </select>
                                </div>

                                <div>
                                    <label>Phường xã</label>
                                    <select>
                                        <option>-Phường xã-</option>
                                    </select>
                                </div>

                                <div>
                                    <label>Địa chỉ</label>
                                    <input></input>
                                </div>
                            </div>

                            <div className={clsx(style.col_4)}>
                                <div>
                                    <button>Lưu khách hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={clsx(style.col2)}>
                    <div className={clsx(style.order)}>
                        <p>ĐƠN HÀNG</p>
                    </div>

                    <div className={clsx(style.promotionCode)}>
                        <label>NHẬP MÃ KHUYẾN MÃI</label>
                        <div className={style.row}>
                            <input /> <button>ÁP DỤNG</button>
                        </div>
                    </div>

                    <div className={clsx(style.totalOrder)}>
                        <p>Đơn hàng</p> <p>32.060.000 VND</p>
                    </div>

                    <div className={clsx(style.discount)}>
                        <p>Giảm</p> <span>0 VND</span>
                    </div>

                    <div className={clsx(style.temporary)}>
                        <p>Khách cần trả</p> <span>32.060.000 VND</span>
                    </div>
                    <div className={clsx(style.cash)}>
                        <div className={clsx(style.cashLabel)}>
                            <label>Tiền mặt</label>
                        </div>
                        <div className={clsx(style.cashInput)}>
                            <input></input>
                        </div>
                    </div>
                    <div className={clsx(style.cash)}>
                        <div className={clsx(style.cashLabel)}>
                            <label>Trả lại khách</label>
                        </div>
                        <div className={clsx(style.cashInput)}>
                            <input></input>
                        </div>
                    </div>



                    <div className={clsx(style.continueOrderBtn)}>
                        <button>HOÀN TẤT HÓA ĐƠN</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfflineSales