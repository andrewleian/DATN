
import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import style from './Faqs.module.scss'

function Faq() {
    // dropDown
    const buyOderSearchRef = useRef();
    const buyOderSearcUpRef = useRef();
    const buyOderSearcDownRef = useRef();

    const payMethodRef = useRef();
    const payMethodUpRef = useRef();
    const payMethodDownRef = useRef();

    const promotionRef = useRef();
    const promotionUpRef = useRef();
    const promotionDownRef = useRef();

    const shippingRef = useRef();
    const shippingUpRef = useRef();
    const shippingDownRef = useRef();

    const exchangeWarrantyRef = useRef();
    const exchangeWarrantyUpRef = useRef();
    const exchangeWarrantyDownRef = useRef();

    const [buyOderSearchDD, setBuyOderSearchDD] = useState(true)
    const [payMethodDD, setPayMethodDD] = useState(true)
    const [promotionDD, setPromotionDD] = useState(true)
    const [shippingDD, setShippingDD] = useState(true)
    const [exchangeWarrantyDD, setExchangeWarrantyDD] = useState(true)

    const handleBuyOderSearch = () => {
        setBuyOderSearchDD((prevStaste) => prevStaste === true ? false : true)
    }

    const handlePayMethod = () => {
        setPayMethodDD((prevStaste) => prevStaste === true ? false : true)
    }

    const handlePromotion = () => {
        setPromotionDD((prevStaste) => prevStaste === true ? false : true)
    }

    const handleShipping = () => {
        setShippingDD((prevStaste) => prevStaste === true ? false : true)
    }

    const handleExchangeWarranty = () => {
        setExchangeWarrantyDD((prevStaste) => prevStaste === true ? false : true)
    }

    useEffect(() => {
        setTimeout(() => {
            {
                if (buyOderSearchDD) {
                    buyOderSearchRef.current.style.display = 'block';
                    buyOderSearcDownRef.current.style.display = 'none'
                    buyOderSearcUpRef.current.style.display = "inline"
                } else {
                    buyOderSearchRef.current.style.display = 'none';
                    buyOderSearcDownRef.current.style.display = 'inline'
                    buyOderSearcUpRef.current.style.display = "none"
                }
            }
        }, 100)
    }, [buyOderSearchDD])

    useEffect(() => {
        setTimeout(() => {
            if (payMethodDD) {
                payMethodRef.current.style.display = 'block';
                payMethodDownRef.current.style.display = 'none'
                payMethodUpRef.current.style.display = "inline"
            } else {
                payMethodRef.current.style.display = 'none';
                payMethodDownRef.current.style.display = 'inline'
                payMethodUpRef.current.style.display = "none"
            }
        }, 100)
    }, [payMethodDD])

    useEffect(() => {
        setTimeout(() => {
            if (promotionDD) {
                promotionRef.current.style.display = 'block';
                promotionDownRef.current.style.display = 'none'
                promotionUpRef.current.style.display = "inline"
            } else {
                promotionRef.current.style.display = 'none';
                promotionDownRef.current.style.display = 'inline'
                promotionUpRef.current.style.display = "none"
            }
        }, 100)
    }, [promotionDD])

    useEffect(() => {
        setTimeout(() => {
            if (shippingDD) {
                shippingRef.current.style.display = 'block';
                shippingDownRef.current.style.display = 'none'
                shippingUpRef.current.style.display = "inline"
            } else {
                shippingRef.current.style.display = 'none';
                shippingDownRef.current.style.display = 'inline'
                shippingUpRef.current.style.display = "none"
            }
        }, 100)
    }, [shippingDD])

    useEffect(() => {
        setTimeout(() => {
            if (exchangeWarrantyDD) {
                exchangeWarrantyRef.current.style.display = 'block';
                exchangeWarrantyDownRef.current.style.display = 'none'
                exchangeWarrantyUpRef.current.style.display = "inline"
            } else {
                exchangeWarrantyRef.current.style.display = 'none';
                exchangeWarrantyDownRef.current.style.display = 'inline'
                exchangeWarrantyUpRef.current.style.display = "none"
            }
        }, 100)
    }, [exchangeWarrantyDD])

    // end dropDown

    return (
        <div className={style.container}>
            <div className={style.mainTitle}>
                <p>CÂU HỎI THƯỜNG GẶP</p>
            </div>

            <div className={style.row}>
                <div className={style.col1}></div>
                <div className={style.col2}>
                    <div className={style.borderSolidBot}>

                    </div>
                </div>

            </div>

            <div className={style.row}>
                <div className={style.col1}>
                    <div className={style.item}>
                        <div className={style.icon}><i className="fa-sharp fa-solid fa-location-dot"></i></div>
                        <div className={style.title}>TÌM CỬA HÀNG</div>
                        <div className={style.description}>
                            Mở cửa suốt tuần từ<br />
                            9:00 - 22:00</div>
                    </div>

                    <div className={style.item}>
                        <div className={style.icon}><i className="fa-solid fa-people-group"></i></div>
                        <div className={style.title}>LIÊN HỆ HỢP TÁC</div>
                        <div className={style.description}>
                            Hợp tác truyền thông qua email:
                            info@shoeshoe.vn
                        </div>
                    </div>

                    <div className={style.item}>
                        <div className={style.icon}><i className="fa-regular fa-envelope"></i></div>
                        <div className={style.title}>ĐÓNG GÓP Ý KIẾN</div>
                        <div className={style.description}>
                            Mail phản hồi và đóng góp về chất
                            lượng dịch vụ: cs@shoeshoe.vn
                        </div>
                    </div>

                    <div className={style.item}>
                        <div className={style.icon}><i className="fa-solid fa-phone"></i></div>
                        <div className={style.title}>CHĂM SÓC KHÁCh HÀNG</div>
                        <div className={style.description}>
                            Làm việc từ thứ 2 - thứ 7 từ:<br />
                            9:00 - 17:00<br />
                            Hotline: 0963429749
                        </div>
                    </div>
                </div>

                <div className={style.col2}>
                    <div className={style.item}>
                        <div className={style.title} onClick={handleBuyOderSearch}>MUA HÀNG - ĐẶT HÀNG - TRA CỨU ĐƠN HÀNG
                            <span ref={buyOderSearcDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                            <span ref={buyOderSearcUpRef}> <i className="fa-solid fa-angle-up"></i></span></div>
                        <div ref={buyOderSearchRef} className={style.child}>
                            <p className={style.description}>
                                <strong> 1. CÁCH THỨC MUA HÀNG TẠI shoeshoe THẾ NÀO ?</strong>
                                <br /><br />
                                Để mua hàng, bạn có thể trực tiếp đến hệ thống các cửa hàng chính thức của Shoehoe (tra cứu địa chỉ các cửa hàng tại đây nhằm có những trải nghiệm mua sắm tốt nhất.
                                <br /><br />
                                Hoặc, bạn có thể đặt mua các sản phẩm của chúng tôi ngay tại website theo các bước vô cùng đơn giản như sau:
                                <br /><br />
                                <ul>
                                    <li>Chọn sản phẩm bạn thích.</li>
                                    <li>Chọn size sản phẩm phù hợp.</li>
                                    <li>Hoàn tất các bước đặt hàng khác trên hệ thống.</li>
                                    <li>Nhận email cùng cuộc gọi xác nhận đặt hàng thành công từ bộ phận Customer Service.</li>
                                    <li>Đợi chờ thêm một vài ngày để sản phẩm được giao đến bạn.</li>
                                </ul>
                                <br />
                                <strong>2. LÀM THẾ NÀO ĐỂ MUA CÁC SẢN PHẨM CÓ TRẠNG THÁI PRE-ORDER (ĐẶT HÀNG TRƯỚC) CỦA ShoeShoe?</strong>
                                <br /><br />
                                Đối với các sản phẩm Pre-order, bạn có thể đặt mua tại website theo các bước sau:
                                <br /><br />
                                <ul>
                                    <li>Chọn sản phẩm yêu thích.</li>
                                    <li>Chọn size phù hợp.</li>
                                    <li>Hoàn tất các bước đặt hàng khác theo quy trình trên hệ thống.</li>
                                    <li>Nhận email cùng cuộc gọi xác nhận đặt hàng thành công từ bộ phận Customer Service.</li>
                                    <li>Đợi đến ngày hẹn để sản phẩm bắt đầu được giao đến tay bạn.</li>
                                </ul>
                                <br />
                                <span>Lưu ý:</span>
                                <br /><br />
                                <ul>
                                    <li>Đối với những sản phẩm Pre-order, phương thức thanh toán COD sẽ không được áp dụng. Bạn phải thanh toán trước bằng các hình thức thanh toán trực tuyến để có thể đặt hàng thành công.</li>
                                    <li> Ngày giao hàng chính thức các sản phẩm Pre-order sẽ được hiển thị khi bạn hoàn tất việc chọn size và số lượng khả dụng sản phẩm đó. Trong một số trường hợp, mong bạn thông cảm vì ngày giao hàng có thể thay đổi từ một lí do không mong muốn, bạn có thể cập nhật thông tin tại chính trang chi tiết của sản phẩm để quyết định liệu có thể chờ đợi hay không.</li>
                                </ul>
                                <br />
                                <strong>3. KHI ĐẶT HÀNG TRÊN WEBSITE ShoeShoe, TÔI CÓ NHẬN ĐƯỢC EMAIL HAY CUỘC GỌI ĐỂ XÁC NHẬN TÔI ĐÃ ĐẶT HÀNG THÀNH CÔNG HAY KHÔNG?</strong>
                                <br /><br />
                                Hiện tại, sau khi đặt hàng thành công tại website shoeshoe.vn, bạn sẽ nhận được xác nhận việc đặt hàng bằng email mà bạn đã dùng để đăng ký cùng cuộc gọi xác nhận đơn hàng từ bộ phận Customer Service của ShoeShoe.
                                <br /><br />
                                <span>Một số lưu ý quan trọng:</span>
                                <br /><br />
                                – Thời gian mà ShoeShoe gọi điện cho bạn nhằm xác nhận đơn hàng sẽ từ:
                                <br />
                                <ul>
                                    <li>Thứ 2 – thứ 7, 9h00 đến 19h30</li>
                                    <li>Các đơn hàng chưa được xử lí sau thời gian trên sẽ được chúng tôi tiếp tục xử lí vào ngày làm việc tiếp theo.</li>
                                </ul>
                                <br />
                                – ShoeShoe luôn luôn cố gắng liên lạc với bạn bằng 2 cuộc gọi/ngày và trong 2 ngày liên tiếp. Qua thời hạn trên nhưng chúng tôi vẫn chưa thể liên lạc được với bạn, đơn hàng của bạn sẽ tự động bị hủy trên hệ thống.
                                <br /><br />
                                – Ở một số thời điểm, việc xác nhận đơn hàng có thể chậm hơn dự kiến, mong bạn thông cảm và chờ đợi thêm từ 2 – 3 ngày.
                                <br /><br />
                                <strong>4. LÀM THẾ NÀO TÔI CÓ THỂ TRA CỨU, HỦY BỎ HAY THAY ĐỔI ĐƠN HÀNG?</strong>
                                <br /><br />
                                Để tra cứu đơn hàng, bạn có thể truy cập mục Tra cứu đơn hàng, điền đầy đủ thông tin về “mã đơn hàng” và “email/số điện thoại” mà bạn đã đăng ký.
                                <br /><br />
                                Ở phần tra cứu đơn hàng, ngoài việc theo dõi quy trình xử lý, bạn cũng có thể trực tiếp hủy bỏ đơn hàng nếu đơn hàng đó chưa được chuyển qua giao nhận. Trong trường hợp đơn hàng đã được ShoeShoe chuyển qua đơn vị giao nhận, bạn vui lòng liên hệ trực tiếp với bộ phận Customer Service qua số hotline 0963 429 749 để được hướng dẫn chi tiết hơn.
                                <br /><br />
                                Ngoài ra, bạn cũng có thể liên lạc với bộ phận Customer Service trong trường hợp có thay đổi thông tin đơn hàng hay mong muốn đổi qua một sản phẩm khác.
                                <br /><br />
                                <strong>5. ĐỐI VỚI ĐƠN HÀNG ĐÃ THANH TOÁN BẰNG PHƯƠNG THỨC THANH TOÁN TRỰC TUYẾN, KHI HỦY ĐƠN HÀNG TÔI CÓ ĐƯỢC HOÀN LẠI KHOẢN THANH TOÁN HAY KHÔNG?</strong>
                                <br /><br />
                                <ul>
                                    <li>Khi yêu cầu hủy đơn hàng đó đáp ứng đúng hướng dẫn thay đổi hoặc hủy bỏ các giao dịch của ShoeShoe, chúng tôi sẽ hoàn lại khoản thanh toán cho bạn dù với bất cứ lí do gì.</li>
                                    <li>Lưu ý ShoeShoe không hoàn lại phí thanh toán bằng thẻ (1% trên tổng thanh toán khi sử dụng thẻ nội địa và 3% trên tổng thanh toán khi sử dụng thẻ quốc tế) trong mọi trường hợp đơn hàng bị hủy. Mong bạn cân nhắc trước khi quyết định.</li>
                                    <li>Thời gian hoàn lại khoản thanh toán tuỳ thuộc vào loại thẻ mà bạn sử dụng để thanh toán, thông thường là từ 1-3 ngày làm việc đối với thẻ nội địa, và 7-10 ngày làm việc đối với thẻ quốc tế kể từ khi đơn hàng bị hủy. Trong một số trường hợp có sự cố đến từ việc xử lí giao dịch từ ngân hàng hay cổng thanh toán, thời gian hoàn tiền có thể sẽ lâu hơn.</li>
                                </ul>
                                <br />
                                <strong>6. TÔI CÓ ĐƯỢC KIỂM TRA SẢN PHẨM TRƯỚC KHI NHẬN HÀNG HAY KHÔNG?</strong>
                                <br /><br />
                                Hiện tại, đơn hàng gửi đến bạn sẽ được chúng tôi niêm phong cẩn thận và bạn sẽ không thể kiểm tra sản phẩm trước khi nhận hàng nhằm tránh những vấn đề phát sinh khác nhau trong lúc vận chuyển và giao dịch mà ShoeShoe không thể kiểm soát được. Mong bạn thông cảm.
                            </p>
                        </div>
                    </div>

                    <div className={style.item}>
                        <div className={style.title} onClick={handlePayMethod}>PHƯƠNG THỨC THANH TOÁN
                            <span ref={payMethodDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                            <span ref={payMethodUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                        </div>
                        <div ref={payMethodRef} className={style.child}>
                            <p className={style.description}>
                                <strong>
                                    NHỮNG PHƯƠNG THỨC THANH TOÁN NÀO ĐANG ĐƯỢC ShoeShoe ÁP DỤNG?
                                </strong>
                                <br /><br />
                                Hiện tại, chúng tôi đang có các hình thức thanh toán sau:
                                <br /><br />
                                – Tại cửa hàng:
                                <br /><br />
                                <ul>
                                    <li>Thanh toán bằng tiền mặt</li>
                                    <li>Thanh toán bằng thẻ qua dịch vụ POS (Point of sale)</li>
                                </ul>
                                <br />
                                – Mua hàng online tại website https://shoeshoe.vn:
                                <br /><br />
                                <ul>
                                    <li>COD (cash on delivery): thanh toán bằng tiền mặt khi bạn nhận hàng.</li>
                                    <li>Thanh toán bằng thẻ thanh toán nội địa (ATM): là hình thức thanh toán sử dụng các thẻ thanh toán nội địa được phát hành bởi các ngân hàng trong nước (Vietcombank, Vietinbank, Sacombank,…). Lưu ý rằng thẻ của bạn cần được đăng ký dịch vụ thanh toán thực tuyến tại ngân hàng để có thể sử dụng được hình thức này.</li>
                                    <li>Thanh toán bằng thẻ thanh toán quốc tế: là hình thức thanh toán sử dụng các thẻ được phát hành bởi các tổ chức thẻ quốc tế (Visa, Master Card, JCB,…).</li>
                                    <li>Thanh toán bằng ví điện tử Momo: là hình thức thanh toán sử dụng tài khoản ví Momo cá nhân của khách hàng.</li>
                                </ul>
                            </p>
                        </div>
                    </div>

                    <div className={style.item}>
                        <div className={style.title} onClick={handlePromotion}>
                            CHƯƠNG TRÌNH KHUYẾN MÃI
                            <span ref={promotionDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                            <span ref={promotionUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                        </div>
                        <div ref={promotionRef} className={style.child}>
                            <p className={style.description}>

                                <strong>1. CÁC CHƯƠNG TRÌNH KHUYẾN MÃI CỦA ShoeShoe CÓ GÌ ?</strong>
                                <br /><br />
                                Hiện tại, chúng tôi đang áp dụng các chương trình khuyến mãi không thời hạn sau:
                                <br /><br />
                                <ul>
                                    <li>Chương trình MIỄN PHÍ VẬN CHUYỂN (Free Shipping) toàn quốc với mỗi hóa đơn từ 800.000 VNĐ, áp dụng cho tất cả sản phẩm tại website shoeshoe.vn.</li>
                                    <li>
                                        Chương trình BUY MORE – PAY LESS áp dụng với tất cả sản phẩm phụ kiện trên cả kênh online và offline, cụ thể:
                                        <ul>
                                            <li>Giảm 5% trên giá phụ kiện khi mua 2 sản phẩm phụ kiện cùng loại bất kì trong một hoá đơn.</li>
                                            <li>Giảm 10% trên giá phụ kiện khi mua 3 sản phẩm phụ kiện cùng loại bất kì trong một hoá đơn.</li>
                                            <li>Giảm 15% trên giá phụ kiện khi mua từ 4 sản phẩm phụ kiện cùng loại bất kì trở lên trong một hoá đơn.</li>
                                        </ul>
                                    </li>
                                    <li>Chương trình BUY 2 GET 10% OFF áp dụng với tất cả áo Basic Tee trên cả kênh online và offline, cụ thể khi mua từ 2 áo Basic Tee bất kì trở lên trong một hoá đơn, hệ thống sẽ tự động tính giảm 10% cho bạn trên mỗi sản phẩm áo.</li>
                                </ul>
                                <br />
                                Lưu ý:
                                <br /><br />
                                –  Ưu đãi sẽ được hệ thống tự động áp dụng khi hoá đơn đạt đủ điều kiện tại trang điền “Thông Tin Mua Hàng”.
                                <br /><br />
                                – Chương trình Free Shipping chỉ áp dụng cho phí giao hàng, không áp dụng trong các trường hợp đổi hàng hoặc bảo hành.
                                <br /><br />
                                Các chương trình khuyến mãi khác nằm trong phân mục này sẽ được chúng tôi tiếp tục cập nhật khi có những thông báo chính thức trên Website, Email và Fanpage ShoeShoe.
                                <br /><br />
                                <strong>2. LÀM SAO ĐỂ TÔI CÓ THỂ CẬP NHẬT CÁC CHƯƠNG TRÌNH KHUYẾN MÃI TỪ ShoeShoe ?</strong>
                                <br /><br />
                                Có 2 cách để bạn luôn cập nhật kịp thời và không bỏ lỡ các chương trình khuyến mãi, ưu đãi đặc biệt từ ShoeShoe là:
                                <br /><br />
                                – Để chế độ xem trước các bài đăng của chúng tôi tại Fanpage ShoeShoe.
                                <br /><br />
                                – Hoặc Subcirbe và để lại địa chị email để chúng tôi có thể gửi đến bạn các thông tin mới nhất từ ShoeShoe.
                                <br /><br />
                                <strong>3. TÔI CÓ THỂ SỬ DỤNG MÃ KHUYẾN MÃI CHO CẢ MUA HÀNG ONLINE VÀ OFFLINE?</strong>
                                <br /><br />
                                Tùy vào chương trình mà mã khuyến mãi của bạn có thể áp dụng cho cả đơn hàng mua trực tiếp tại cửa hàng và tại website https://shoeshoe.vn hoặc chỉ áp dụng cho 1 hình thức mua hàng.
                                <br /><br />
                                <strong>4. MÃ KHUYẾN MÃI CỦA TÔI CÓ THỜI HẠN LÀ BAO LÂU VÀ CÓ THỂ DÙNG ĐỒNG THỜI VỚI CÁC CHƯƠNG TRÌNH KHUYẾN MÃI KHÁC KHÔNG?</strong>
                                <br /><br />
                                Tùy vào loại mã mà hạn sử dụng sẽ khác nhau. Hiện tại, các mã khuyến mãi tại ShoeShoe đều có thể sử dụng trong một khoảng thời gian nhất định (được quy định rõ khi phát hành). Mỗi mã khuyến mãi sẽ có quy định về việc có thể sử dụng cùng với các khuyến mãi khác hay không.
                            </p>
                        </div>
                    </div>

                    <div className={style.item}>
                        <div className={style.title} onClick={handleShipping}>
                            GIAO HÀNG - VẬN CHUYỂN
                            <span ref={shippingDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                            <span ref={shippingUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                        </div>
                        <div ref={shippingRef} className={style.child}>
                            <p className={style.description}>
                                <strong>1. TÔI CÓ TỐN PHÍ VẬN CHUYỂN KHI ĐẶT HÀNG HAY KHÔNG VÀ MỨC PHÍ LÀ BAO NHIÊU?</strong>
                                <br /><br />
                                Phí vận chuyển sẽ được tính tùy theo khu vực và sẽ được hiển thị sau khi bạn nhập đầy đủ các thông tin cần thiết.
                                <br /><br />
                                <strong>2. SẼ MẤT BAO LÂU ĐỂ TÔI NHẬN ĐƯỢC HÀNG TỪ ShoeShoe?</strong>
                                <br /><br />
                                Thời gian giao hàng dự kiến ở nội thành TP.HCM sẽ mất từ 2-3 ngày; ngoại thành và các thành phố lớn sẽ từ 3-5 ngày; các tỉnh thành khác sẽ mất khoảng từ 5-7 ngày.
                                <br /><br />
                                Đối với các đơn hàng pre-order, sản phẩm sẽ được chúng tôi gửi đến bạn bắt đầu tính từ ngày mở bán chính thức của sản phẩm đó.
                                <br /><br />
                                <span>Một số lưu ý quan trọng:</span>
                                <br /><br />
                                – Thời gian giao hàng trên được tính kể từ ngày đơn vị vận chuyển bắt đầu phát hàng đi, chưa bao gồm thời gian xử lý đơn hàng.
                                <br /><br />
                                – Các đơn hàng sẽ không được giao vào các ngày Chủ nhật và ngày Lễ.
                                <br /><br />
                                – Trong thời gian đơn hàng được chuyển đi, nếu có nhu cầu thay đổi thông tin địa chỉ nhận hàng, tuỳ trường hợp có thể sẽ phải thanh toán thêm phí vận chuyển phát sinh.
                                <br /><br />
                                – Trong một số thời điểm, việc vận chuyển sẽ bị quá tải, dẫn đến đơn hàng của bạn sẽ chậm trễ hơn so với thời gian dự kiến. Mong bạn thông cảm và chờ đợi thêm một vài ngày nữa.
                                <br /><br />
                                <strong>3. NẾU TÔI ĐẶT MUA TẠI WEBSITE ShoeShoe.VN NHƯNG MUỐN NHẬN SẢN PHẨM TẠI CỬA HÀNG THÌ CÓ ĐƯỢC KHÔNG?</strong>
                                <br /><br />
                                Do bộ phận cửa hàng và kho online là 2 bộ phận làm việc và chịu trách nhiệm riêng biệt nên sản phẩm bạn đặt tại website shoeshoe.vn sẽ không thể nhận tại bất kì cửa hàng ShoeShoe nào trong hệ thống.
                                <br /><br />
                                <strong>4. ShoeShoe CÓ GIAO HÀNG QUỐC TẾ?</strong>
                                <br /><br />
                                Hiện tại, chúng tôi chỉ hỗ trợ cho các đơn hàng tại lãnh thổ Việt Nam. Các đơn hàng có yêu cầu vận chuyển ra nước ngoài, vui lòng liên hệ bộ phận Customer Service để được hướng dẫn chi tiết.
                            </p>
                        </div>
                    </div>

                    <div className={style.item}>
                        <div className={style.title} onClick={handleExchangeWarranty}>
                            ĐỔI - BẢO HÀNH SẢN PHẨM
                            <span ref={exchangeWarrantyDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                            <span ref={exchangeWarrantyUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                        </div>
                        <div ref={exchangeWarrantyRef} className={style.child}>
                            <p className={style.description}>
                                <strong>1. QUY ĐỊNH ĐỔI HÀNG CỦA ShoeShoe NHƯ THẾ NÀO ?</strong>
                                <br /><br />
                                ShoeShoe luôn mong mỗi sản phẩm khi đến với bạn đều là những sản phẩm thực sự phù hợp và khiến bạn hài lòng. Tuy vậy, chúng tôi vẫn có một số quy định về việc đổi hàng để bạn tham khảo trong trường hợp bạn chưa ưng ý với sản phẩm sau khi đã mua về. Cụ thể như sau:
                                <br /><br />
                                <span>Quy định chung cho việc đổi hàng:</span>
                                <br /><br />
                                – Sản phẩm đổi phải kèm theo hóa đơn mua hàng (hoặc có ghi nhận thông tin mua hàng trên hệ thống), còn nguyên tem, hộp và nhãn mác.
                                <br /><br />
                                – Chỉ áp dụng đổi hàng 01 lần duy nhất cho sản phẩm Giày và Thời trang. Không hỗ trợ đổi sản phẩm thuộc nhóm Phụ kiện.
                                <br /><br />
                                – ShoeShoe <span>ưu tiên hỗ trợ đổi size</span>. Trong trường hợp mong muốn đổi sang 01 sản phẩm khác, chúng tôi vẫn hỗ trợ bạn:
                                <br /><br />
                                <ul>
                                    <li>Nếu sản phẩm muốn đổi ngang giá trị hoặc có giá trị cao hơn, bạn sẽ cần bù khoảng chênh lệch tại thời điểm đổi (nếu có).</li>
                                    <li>Nếu bạn mong muốn đổi sản phẩm có giá trị thấp hơn, chúng tôi sẽ không hoàn lại tiền.</li>
                                </ul>
                                <br />
                                – ShoeShoe sẽ không áp dụng việc đổi hàng với các sản phẩm phụ kiện, các sản phẩm đang áp dụng chương trình Sale Off từ 50% trở lên, các sản phẩm thuộc phiên bản giới hạn (limited edition) hoặc các sản phẩm có dấu hiệu đã qua sử dụng, đã giặt tẩy, bám bẩn hay biến dạng.
                                <br /><br />
                                – ShoeShoe sẽ không áp dụng việc hoàn trả tiền mặt dù bất cứ trường hợp nào. Mong bạn thông cảm.
                                <br /><br />
                                <span>Đối với các sản phẩm mua trực tiếp tại cửa hàng:</span>
                                <br /><br />
                                – Việc đổi sản phẩm chỉ áp dụng tại cửa hàng mà bạn đã mua hàng. Không áp dụng đổi tại cửa hàng khác.
                                <br /><br />
                                – Thời hạn đổi sản phẩm với sản phẩm là giày và thời trang là 07 ngày, tính từ ngày bạn mua hàng. Các sản phẩm nón và phụ kiện sẽ không áp dụng việc đổi sản phẩm.
                                <br /><br />
                                <span>Đối với các sản phẩm mua tại trang shoeshoe.vn cùng các trang thương mại điện tử đối tác khác:</span>
                                <br /><br />
                                – Đối với các đơn hàng mua online tại shoeshoe.vn và các trang thương mại điện tử đối tác. Để đổi hàng, bạn vui lòng điền đầy đủ thông tin và làm theo hướng dẫn được in trên thân Shipping Box đi kèm khi giao hàng.
                                <br /><br />
                                – Khi đổi hàng, bạn vui lòng chịu 1 đầu phí chuyển đến kho online ShoeShoe. Chúng tôi sẽ chịu đầu phí khi chuyển hàng lại cho bạn sau khi đã hoàn tất việc đổi/bảo hành sản phẩm.
                                <br /><br />
                                – Thời hạn đổi sản phẩm với sản phẩm là giày và các sản phẩm thời trang khác là 14 ngày, tính từ ngày nhận được hàng. Nón và phụ kiện không áp dụng chính sách đổi sản phẩm.
                                <br /><br />
                                <strong>2. QUY ĐỊNH VỀ VIỆC BẢO HÀNH SẢN PHẨM CỦA ShoeShoe NHƯ THẾ NÀO?</strong>
                                <br /><br />
                                – Chúng tôi hiểu rằng đôi khi sản phẩm có thể xảy ra những vấn đề không mong muốn trong quá trình bạn sử dụng. Vì thế, ShoeShoe sẽ hỗ trợ bảo hành sản phẩm theo quy định bên dưới:
                                <br /><br />
                                <ul>
                                    <li>Đối với các sản phẩm giày, ShoeShoe hỗ trợ bảo hành trong vòng 06 tháng kể từ ngày mua với các trường hợp bung keo, sứt chỉ, gãy đế hoặc có lỗi từ nhà sản xuất.</li>
                                    <li>Đối với các sản phẩm thuộc nhóm thời trang và phụ kiện, chính sách bảo hành không được áp dụng. Mong bạn thông cảm.</li>
                                    <li>Để việc bảo hành thuận tiện và nhanh chóng hơn, bạn vui lòng vệ sinh giày sạch sẽ trước khi gửi về ShoeShoe. Chúng tôi xin từ chối thực hiện việc bảo hành nếu như sản phẩm chưa được vệ sinh khi nhận được giày.</li>
                                </ul>
                                <br />
                                – Đối với các sản phẩm mua tại cửa hàng, bạn vui lòng đến đúng cửa hàng đã mua để được hỗ trợ bảo hành.
                                <br /><br />
                                – Đối với các sản phẩm mua qua website ShoeShoe và các trang thương mại điện tử đối tác, bạn vui lòng làm theo các bước sau:
                                <br /><br />
                                <ul>
                                    <li>Ghi rõ tên, số điện thoại của bạn cùng tình trạng cần được bảo hành và để vào hộp giày.</li>
                                    <li>Gửi về trung tâm chăm sóc khánh hàng tại địa chỉ: 5C Tân Cảng, P.25, Q.Bình Thạnh , TP. Hồ Chí Minh.</li>
                                    <li>Khi gửi bảo hành sản phẩm, bạn vui lòng chịu một đầu phí chuyển đến kho ShoeShoe, chúng tôi sẽ chịu phí chuyển đến bạn khi việc bảo hành đã hoàn tất.</li>
                                </ul>
                                <br />
                                <strong>3. MẤT BAO LÂU ĐỂ TÔI CÓ THỂ NHẬN LẠI SẢN PHẨM ĐƯỢC ĐỔI VÀ BẢO HÀNH KHI TÔI GỬI VỀ ShoeShoe?</strong>
                                <br /><br />
                                Khi nhận được sản phẩm bạn gửi về, tùy vào hình thức là “Đổi” hay “Bảo Hành”, bộ phận Customer Service sẽ thông báo lại khoảng thời gian dự kiến mà bạn có thể nhận lại sản phẩm của mình. Hãy tin rằng chúng tôi luôn cố gắng làm việc để sản phẩm trở về tay bạn sớm nhất có thể.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Faq