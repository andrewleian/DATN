
import clsx from 'clsx'
import style from './Home.module.scss'

function Home() {
    return (
        <div className={style.container}>
            <div className={style.banner}>
                <img src='https://ananas.vn/wp-content/uploads/Hi-im-Mule_1920x1050-Desktop.jpg'></img>
            </div>

            <div className={style.homeCollection}>
                <div className={style.item}>
                    <div className={style.img}>
                        <img src='https://ananas.vn/wp-content/uploads/banner-phu%CC%A3_2m-600x320.jpg'></img>
                    </div>
                    <div className={style.title}>
                        <p>ALL BLACK IN BLACK</p>
                    </div>
                    <div className={style.description}>
                        <p>Mặc dù được ứng dụng rất nhiều, nhưng sắc đen lúc nào cũng toát lên một vẻ huyền bí không nhàm chán</p>
                    </div>
                </div>

                <div className={style.item}>
                    <div className={style.img}>
                        <img src='https://ananas.vn/wp-content/uploads/Banner_Sale-off-1.jpg'></img>
                    </div>
                    <div className={style.title}>
                        <p>OUTLET SALE</p>
                    </div>
                    <div className={style.description}>
                        <p>Danh mục những sản phẩm bán tại "giá tốt hơn" chỉ được bán kênh online - Online Only, chúng đã từng làm mưa làm gió một thời gian và hiện đang rơi vào tình trạng bể size, bể số.</p>
                    </div>
                </div>
            </div>

            <div className={style.homeBuy}>
                <div className={style.homeBuyTitle}>
                    <p>DANH MỤC MUA HÀNG</p>
                </div>

                <div className={style.row}>
                    <div className={style.item}>
                        <img src='https://ananas.vn/wp-content/uploads/catalogy-1.jpg'></img>
                        <div className={style.itemGroup}>
                            <p className={style.title}>GIÀY NAM</p>
                            <p className={style.sub}>New Arrivals</p>
                            <p className={style.sub}>Best Seller</p>
                            <p className={style.sub}>Sale-off</p>
                        </div>
                    </div>

                    <div className={style.item}>
                        <img src='https://ananas.vn/wp-content/uploads/catalogy-2.jpg'></img>
                        <div className={style.itemGroup}>
                            <p className={style.title}>GIÀY NỮ</p>
                            <p className={style.sub}>New Arrivals</p>
                            <p className={style.sub}>Best Seller</p>
                            <p className={style.sub}>Sale-off</p>
                        </div>
                    </div>

                    <div className={style.item}>
                        <img src='	https://ananas.vn/wp-content/uploads/catalogy-3.jpg'></img>
                        <div className={style.itemGroup}>
                            <p className={style.title}>DÒNG SẢN PHẨM</p>
                            <p className={style.sub}>Basas</p>
                            <p className={style.sub}>Vintas</p>
                            <p className={style.sub}>Urbas</p>
                            <p className={style.sub}>Pattas</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className={style.banner}>
                <img src='https://ananas.vn/wp-content/uploads/Banner_Clothing.jpg'></img>
            </div>

            <div className={style.homeNews}>
                <div className={style.col}>
                    <div className={style.homeNewsTitle}>
                        <p>INSTAGRAM</p>
                    </div>

                </div>

                <div className={style.col}>
                    <div className={style.homeNewsTitle}>
                        <p>TIN TỨC & BÀI VIẾT</p>
                    </div>
                    <div className={style.homeNewsItem}>
                        <div className={style.row}>
                            <div className={clsx(style.item)}>
                                <div>
                                    <img src="https://ananas.vn/wp-content/uploads/kvngang_mobile_web-300x160.jpg"></img>
                                </div>

                                <div>
                                    <p className={clsx(style.title)}>URBAS CORLURAY PACK</p>
                                    <p className={clsx(style.description)}>Urbas Corluray Pack đem đến lựa chọn “làm mới mình” với sự kết hợp 5 gam màu mang sắc thu; phù hợp với những người trẻ năng động, mong muốn thể...</p>
                                    <p className={clsx(style.detail)}><a>Đọc thêm</a></p>
                                </div>
                            </div>

                            <div className={clsx(style.item)}>
                                <div>
                                    <img src="https://ananas.vn/wp-content/uploads/Mobile_Blog-1980s_0-300x160.jpg"></img>
                                </div>

                                <div>
                                    <p className={clsx(style.title)}>VINTAS SAIGON 1980s</p>
                                    <p className={clsx(style.description)}>Với bộ 5 sản phẩm, Vintas Saigon 1980s Pack đem đến một sự lựa chọn “cũ kỹ thú vị” cho những người trẻ sống giữa thời hiện đại nhưng lại yêu nét...</p>
                                    <p className={clsx(style.detail)}><a>Đọc thêm</a></p>
                                </div>
                            </div>

                            <div className={clsx(style.item)}>
                                <div>
                                    <img src="https://ananas.vn/wp-content/uploads/peeping_pattas01-300x160.jpg"></img>
                                </div>

                                <div>
                                    <p className={clsx(style.title)}>SNEAKER FEST VIETNAM VÀ SỰ KẾT HỢP</p>
                                    <p className={clsx(style.description)}>Việc sử dụng dáng giày Vulcanized High Top của Ananas trong thiết kế và cảm hứng bắt nguồn từ linh vật Peeping - đại diện cho tinh thần xuyê...</p>
                                    <p className={clsx(style.detail)}><a>Đọc thêm</a></p>
                                </div>
                            </div>

                            <div className={clsx(style.item)}>
                                <div>
                                    <img src="https://ananas.vn/wp-content/uploads/shoes-anatomy-thumbnail.jpg"></img>
                                </div>

                                <div>
                                    <p className={clsx(style.title)}>"GIẢI PHẪU" GIÀY VULCANIZED</p>
                                    <p className={clsx(style.description)}>Trong phạm vi bài viết ngắn, hãy cùng nhau tìm hiểu cấu tạo giày Vulcanized Sneaker - loại sản phẩm mà Ananas đã chọn làm "cốt lõi" để theo đuổi trong...</p>
                                    <p className={clsx(style.detail)}><a>Đọc thêm</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;