
import clsx from 'clsx'
import style from './index.module.scss'

function DiscoverYou() {
    return (
        // <h1 style={{ margin: '200px auto', width: '180px' }}>Discover You</h1>
        <div className="container">
            <div className={clsx(style.discover)}>
                <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/news_discover.png"></img>
            </div>

            <div className={clsx(style.banner)}>
                <div className={clsx(style.left)}>
                    <img src="https://ananas.vn/wp-content/uploads/Corluray_bannerweb_desktop1920x1050.jpg"></img>
                </div>
                <div className={clsx(style.right)}>
                    <p className={clsx(style.title)}>URBAS CORLURAY PACK</p>
                    <p className={clsx(style.subtitle)}>- SẮC THU KHÓ CƯỠNG -</p>
                    <p className={clsx(style.description)}>Urbas Corluray Pack đem đến lựa chọn “làm mới mình” với sự kết hợp 5 gam màu mang sắc thu; phù hợp với những người trẻ năng động, mong muốn thể hiện cá tính riêng biệt khó trùng lặp.</p>
                    <p className={clsx(style.detail)}><a href="">Đọc thêm</a> | <span>22.09.2020</span></p>
                </div>
            </div>

            <div className={clsx(style.list)}>

                <div className={clsx(style.item)}>
                    <div>
                        <img src="https://ananas.vn/wp-content/uploads/Mobile_Blog-1980s_0.jpg"></img>
                    </div>

                    <div>
                        <p className={clsx(style.title)}>VINTAS SAIGON 1980s</p>
                        <p className={clsx(style.description)}>Với bộ 5 sản phẩm, Vintas Saigon 1980s Pack đem đến một sự lựa chọn “cũ kỹ thú vị” cho những người trẻ sống giữa thời hiện đại nhưng lại yêu nét bình dị của Sài Gòn ngày xưa ...</p>
                        <p className={clsx(style.detail)}><a>Đọc thêm</a> | 24.07.2019</p>
                    </div>
                </div>

                <div className={clsx(style.item)}>
                    <div>
                        <img src="https://ananas.vn/wp-content/uploads/peeping_pattas01.jpg"></img>
                    </div>

                    <div>
                        <p className={clsx(style.title)}>SNEAKER FEST VIETNAM VÀ SỰ KẾT HỢP</p>
                        <p className={clsx(style.description)}>Việc sử dụng dáng giày Vulcanized High Top của Ananas trong thiết kế và cảm hứng bắt nguồn từ linh vật Peeping - đại diện cho tinh thần xuyên suốt 6 năm qua Sneaker Fest Vietnam, chúng tôi tự tin đây sẽ là sản phẩm đáng mong chờ cho mọi “đầu giày” vào mùa hè năm nay...</p>
                        <p className={clsx(style.detail)}><a>Đọc thêm</a> | 19.07.2019</p>
                    </div>
                </div>

                <div className={clsx(style.item)}>
                    <div>
                        <img src="https://ananas.vn/wp-content/uploads/shoes-anatomy-thumbnail.jpg"></img>
                    </div>

                    <div>
                        <p className={clsx(style.title)}>"GIẢI PHẪU" GIÀY VULCANIZED</p>
                        <p className={clsx(style.description)}>Trong phạm vi bài viết ngắn, hãy cùng nhau tìm hiểu cấu tạo giày Vulcanized Sneaker - loại sản phẩm mà Ananas đã chọn làm "cốt lõi" để theo đuổi trong suốt hành trình của mình...</p>
                        <p className={clsx(style.detail)}><a>Đọc thêm</a> | 05.07.2019</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DiscoverYou;