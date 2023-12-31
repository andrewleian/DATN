
import { useRef , useState , useEffect } from "react";
import clsx from "clsx";
import style from "./Career.module.scss"

function Career() {
    // dropDown
    const productRef = useRef();
    const productUpRef = useRef();
    const productDownRef = useRef();

    const sneakerRef = useRef();
    const sneakerUpRef = useRef();
    const sneakerDownRef = useRef();

    const internRef = useRef();
    const internUpRef = useRef();
    const internDownRef = useRef();

    const saleRef = useRef();
    const saleUpRef = useRef();
    const saleDownRef = useRef();

    const onlineRef = useRef();
    const onlineUpRef = useRef();
    const onlineDownRef = useRef();

    const customerRef = useRef();
    const customerUpRef = useRef();
    const customerDownRef = useRef();

    const [productDD, setProductDD] = useState(true)
    const [sneakerDD, setSneakerDD] = useState(true)
    const [internDD, setInternDD] = useState(true)
    const [saleDD, setSaleDD] = useState(true)
    const [onlineDD, setOnlineDD] = useState(true)
    const [customerDD, setCustomerDD] = useState(true)

    const handleProduct = () => {
        setProductDD((prevStaste) => prevStaste === true ? false : true)
    }

    const handleSneaker = () => {
        setSneakerDD((prevStaste) => prevStaste === true ? false : true)
    }

    const handleIntern = () => {
        setInternDD((prevStaste) => prevStaste === true ? false : true)
    }

    const handleSale = () => {
        setSaleDD((prevStaste) => prevStaste === true ? false : true)
    }

    const handleOnline = () => {
        setOnlineDD((prevStaste) => prevStaste === true ? false : true)
    }

    const handleCustomer = () => {
        setCustomerDD((prevStaste) => prevStaste === true ? false : true)
    }

    useEffect(() => {
        setTimeout(() => {
            {
                if (productDD) {
                    productRef.current.style.display = 'block';
                    productDownRef.current.style.display = 'none'
                    productUpRef.current.style.display = "inline"
                } else {
                    productRef.current.style.display = 'none';
                    productDownRef.current.style.display = 'inline'
                    productUpRef.current.style.display = "none"
                }
            }
        }, 100)
    }, [productDD])

    useEffect(() => {
        setTimeout(() => {
            if (sneakerDD) {
                sneakerRef.current.style.display = 'block';
                sneakerDownRef.current.style.display = 'none'
                sneakerUpRef.current.style.display = "inline"
            } else {
                sneakerRef.current.style.display = 'none';
                sneakerDownRef.current.style.display = 'inline'
                sneakerUpRef.current.style.display = "none"
            }
        }, 100)
    }, [sneakerDD])

    useEffect(() => {
        setTimeout(() => {
            if (internDD) {
                internRef.current.style.display = 'block';
                internDownRef.current.style.display = 'none'
                internUpRef.current.style.display = "inline"
            } else {
                internRef.current.style.display = 'none';
                internDownRef.current.style.display = 'inline'
                internUpRef.current.style.display = "none"
            }
        }, 100)
    }, [internDD])

    useEffect(() => {
        setTimeout(() => {
            if (saleDD) {
                saleRef.current.style.display = 'block';
                saleDownRef.current.style.display = 'none'
                saleUpRef.current.style.display = "inline"
            } else {
                saleRef.current.style.display = 'none';
                saleDownRef.current.style.display = 'inline'
                saleUpRef.current.style.display = "none"
            }
        }, 100)
    }, [saleDD])

    useEffect(() => {
        setTimeout(() => {
            if (onlineDD) {
                onlineRef.current.style.display = 'block';
                onlineDownRef.current.style.display = 'none'
                onlineUpRef.current.style.display = "inline"
            } else {
                onlineRef.current.style.display = 'none';
                onlineDownRef.current.style.display = 'inline'
                onlineUpRef.current.style.display = "none"
            }
        }, 100)
    }, [onlineDD])

    useEffect(() => {
        setTimeout(() => {
            if (customerDD) {
                customerRef.current.style.display = 'block';
                customerDownRef.current.style.display = 'none'
                customerUpRef.current.style.display = "inline"
            } else {
                customerRef.current.style.display = 'none';
                customerDownRef.current.style.display = 'inline'
                customerUpRef.current.style.display = "none"
            }
        }, 100)
    }, [customerDD])

    // end dropDown

    return (
        <div className={style.container}>

            <div className={style.mainTitle}>
                <p>SHOE SHOE TUYỂN DỤNG</p>
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
                        <div className={style.title}>ShoeShoe HOUSE</div>
                        <div className={style.description}>248 Quốc Lộ 13, P.26, Q.Bình Thạnh, TP.HCM</div>
                    </div>

                    <div className={style.item}>
                        <div className={style.icon}><i className="fa-regular fa-envelope"></i></div>
                        <div className={style.title}>SALES TEAM</div>
                        <div className={style.description}>Gửi CV cho bộ phận Sales và ghi rõ vị trí ứng tuyển về hr-sales@shoeshoe.vn</div>
                    </div>

                    <div className={style.item}>
                        <div className={style.icon}><i className="fa-solid fa-people-group"></i></div>
                        <div className={style.title}>BRAND TEAM</div>
                        <div className={style.description}>Gửi CV và ghi rõ vị trí ứng tuyển về hr@shoeshoe.vn</div>
                    </div>
                </div>

                <div className={style.col2}>
                    <div className={style.item}>
                        <div className={style.title} onClick={handleProduct}>
                            |BRAND| - PRODUCT / GRAPHIC DESIGNER
                            <span ref={productDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                            <span ref={productUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                        </div>
                        <div ref={productRef} className={style.child}>
                            <p className={style.description}>
                                Full-time<br /><br />

                                <strong>Thời gian làm việc:</strong><br />
                                – 9h00 – 18h00, từ thứ 2 đến thứ 7<br /><br />

                                <strong>Địa điểm làm việc:</strong><br />
                                – ShoeShoe House – 248 Quốc Lộ 13, P.26, Q. Bình Thạnh
                                <br /><br />
                                <strong>Yêu cầu công việc:</strong><br />
                                – Sử dụng thành thạo các công cụ thiết kế.<br />
                                – Taste thiết kế hiện đại, có thẩm mỹ tốt.<br />
                                – Yêu thích nhiếp ảnh và thời trang là một lợi thế (đặc biệt là về Sneakers và Streetwear).<br />
                                – Có tính tự giác, kỷ luật và trách nhiệm cao trong công việc.<br />
                                – Không ngại khó khăn, chịu thay đổi, thích nghi để hoàn thiện.
                                <br /><br />
                                <strong>Mô tả công việc:</strong> Trao đổi khi phỏng vấn tuỳ theo điểm mạnh của bạn.
                                <br /><br />
                                <strong>Quyền lợi:</strong>
                                <br />
                                – Được làm việc trong môi trường trẻ và khuyến khích sáng tạo.<br />
                                – Trải nghiệm nhiều khía cạnh khác nhau của công việc thiết kế.<br />
                                – Lương thỏa thuận khi phỏng vấn trực tiếp (có thể nêu đề xuất trong email).<br />
                                – Thưởng KPI theo cá nhân và team.<br />
                                – Nghỉ phép các ngày lễ – Tết theo quy định của Luật lao động.
                                <br /><br />
                                <strong>Địa điểm phỏng vấn:</strong>
                                <br />
                                – ShoeShoe House – 248 Quốc Lộ 13, P.26, Q. Bình Thạnh
                            </p>
                        </div>
                    </div>

                    <div className={style.item}>
                        <div className={style.title} onClick={handleSneaker}>
                            |BRAND| - SNEAKER / FASHION COPYWRITER
                            <span ref={sneakerDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                            <span ref={sneakerUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                        </div>
                        <div ref={sneakerRef} className={style.child}>
                            <p className={style.description}>
                                Fulltime
                                <br /><br />
                                <strong>Thời gian làm việc:</strong><br />
                                – 9h00 – 18h00, từ thứ 2 đến thứ 7.
                                <br /><br />
                                <strong>Địa điểm làm việc:</strong><br />
                                – ShoeShoe House – 248 Quốc Lộ 13, P.26, Q. Bình Thạnh
                                <br /><br />
                                <strong>Yêu cầu công việc:</strong><br />
                                – Có tư duy hệ thống tốt; đam mê và có kiến thức trong lĩnh vực thời trang, đặc biệt là sneakers, streetwear.<br />
                                – Kỹ năng viết tốt. Có khả năng trình bày thông tin mạch lạc, logic.<br />
                                – Có tính tự giác, kỷ luật và trách nhiệm cao trong công việc.<br />
                                – Không ngại khó khăn, chịu nghe, chịu chỉnh sửa để hoàn thiện mình mỗi ngày.<br />
                                <br /><br />
                                <strong>Mô tả công việc:</strong> Trao đổi khi phỏng vấn tuỳ theo điểm mạnh của bạn.
                                <br /><br />
                                <strong>Quyền lợi:</strong><br />
                                – Làm việc trong môi trường trẻ, khuyến khích sáng tạo, được tạo điều kiện để thể hiện bản thân và học hỏi.<br />
                                – Lương thỏa thuận khi phỏng vấn trực tiếp.<br />
                                – Thưởng KPI theo cá nhân và team.<br />
                                – Nghỉ phép các ngày lễ – Tết theo quy định của Luật lao động.<br />
                                <br /><br />
                                <strong>Địa điểm phỏng vấn:</strong>
                                <br /><br />
                                – ShoeShoe House – 248 Quốc Lộ 13, P.26, Q. Bình Thạnh
                            </p>
                        </div>
                    </div>

                    <div className={style.item}>
                        <div className={style.title} onClick={handleIntern}>
                            |BRAND| - INTERN MARKETING EXECUTIVE
                            <span ref={internDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                            <span ref={internUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                        </div>
                        <div ref={internRef} className={style.child}>
                            <p className={style.description}>
                                Full time
                                <br /><br />
                                <strong>Thời gian làm việc:</strong><br />
                                – 9h00 – 18h00, từ thứ 2 đến thứ 7.
                                <br /><br />
                                <strong>Địa điểm làm việc:</strong><br />
                                – ShoeShoe House – 248 Quốc Lộ 13, P.26, Q. Bình Thạnh
                                <br /><br />
                                <strong>Yêu cầu công việc:</strong><br />
                                – Không đòi hỏi kinh nghiệm.<br />
                                – Yêu thích ngành bán lẻ, quảng cáo và muốn tiến sâu trong ngành. Có đam mê với ngành thời trang.<br />
                                – Thông minh, nhanh nhẹn, có tinh thần trách nhiệm và đảm bảo giờ giấc cao.<br />
                                – Không ngại áp lực.
                                <br /><br />
                                <strong>Mô tả công việc:</strong><br />
                                – Hỗ trợ follow công việc, kết nối cả team với các network liên quan bên ngoài.<br />
                                – Tham gia hỗ trợ trong việc triển khai các hoạt động sản xuất production, các hoạt động digital marketing, event.
                                <br /><br />
                                <strong>Quyền lợi:</strong><br />
                                – Trải nghiệm, học hỏi trong môi trường trẻ, được tạo điều kiện để sáng tạo và thể hiện mình.<br />
                                – Lương thỏa thuận khi phỏng vấn trực tiếp.<br />
                                – Thưởng KPI theo cá nhân và team.<br />
                                – Nghỉ phép các ngày lễ – Tết theo quy định của lao động.
                                <br /><br />
                                <strong>Địa điểm phỏng vấn:</strong><br />

                                – ShoeShoe House – 248 Quốc Lộ 13, P.26, Q. Bình Thạnh
                            </p>
                        </div>
                    </div>

                    <div className={style.item}>
                        <div className={style.title} onClick={handleSale}>
                            |SALES| - SALE STAFF
                            <span ref={saleDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                            <span ref={saleUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                        </div>
                        <div ref={saleRef} className={style.child}>
                            <p className={style.description}>
                                Part-time
                                <br /><br />
                                <strong>Thời gian làm việc:</strong><br />

                                Part-time:<br />
                                – Ca sáng: 9h00 – 14h00<br />
                                – Ca giữa: 13h00 – 17h00<br />
                                – Ca tối: 17h00 – 22h00
                                <br /><br />
                                <strong>Địa điểm làm việc:</strong><br />
                                – Các cửa hàng trong hệ thống tuỳ vào thời điểm tuyển dụng.
                                <br /><br />
                                <strong>Yêu cầu công việc</strong><br />
                                – Độ tuổi từ 18-22 tuổi.<br />
                                – Nhanh nhẹn, hoạt bát, giao tiếp tốt, có kinh nghiệm bán hàng (về lĩnh vực thời trang) là một lợi thế.<br />
                                – Tinh thần trách nhiệm cao, đúng giờ, biết lắng nghe và ham học hỏi là điều kiện bắt buộc.<br />
                                – Thời gian thuận tiện có thể linh động làm việc ca tối, ngày cuối tuần, ngày lễ; Tết.
                                <br /><br />
                                <strong>Mô tả công việc:</strong><br />
                                – Tư vấn, bán hàng cho khách hàng.<br />
                                – Trưng bày, sắp xếp hàng hóa theo quy định và yêu cầu tùy từng thời điểm.<br />
                                – Vệ sinh cửa hàng sạch sẽ, gọn gàng.<br />
                                – Thực hiện việc kiểm kho hằng ngày theo quy định.<br />
                                – Kiểm tiền – giao ca hằng ngày.<br />
                                – Báo cáo các vấn đề ngoài khả năng của nhân viên cho CHT (VD: khách hàng, hư hỏng trong CH, …).<br />
                                – Thực hiện yêu cầu cấp trên đưa xuống.
                                <br /><br />
                                <strong>Quyền lợi:</strong><br />
                                – Lương cơ bản 24k/h.<br />
                                – Thưởng KPI đánh giá theo kết quả kinh doanh áp dụng với nơi công tác.<br />
                                – Được off 4 ngày/tháng.
                                <br /><br />
                                <strong>Địa điểm phỏng vấn:</strong><br />
                                – ShoeShoe House – 248 Quốc Lộ 13, P.26, Q. Bình Thạnh
                            </p>
                        </div>
                    </div>

                    <div className={style.item}>
                        <div className={style.title} onClick={handleOnline}>
                            |SALES| - ONLINE SALE STAFF
                            <span ref={onlineDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                            <span ref={onlineUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                        </div>
                        <div ref={onlineRef} className={style.child}>
                            <p className={style.description}>
                                Full-time
                                <br /><br />
                                <strong>Thời gian làm việc:</strong><br />
                                – 9h00 – 17h00, từ thứ 2 đến thứ 7
                                <br /><br />
                                <strong>Địa điểm làm việc:</strong><br />
                                – ShoeShoe Customer Service Center – 248 Quốc lộ 13, P.26, Q.Bình Thạnh
                                <br /><br />
                                <strong>Yêu cầu công việc:</strong><br />
                                – Nam/Nữ từ 18-25 tuổi.<br />
                                – Hoạt bát, cẩn thận, sử dụng tốt các phần mềm văn bản (Word, Excel).<br />
                                – Trung thực và tinh thần trách nhiệm cao.<br />
                                – Giao tiếp qua điện thoại tốt.
                                <br /><br />
                                <strong>Mô tả công việc:</strong><br />
                                – Xử lí những vấn đề liên quan đến đơn hàng và giao tiếp với khách hàng qua điện thoại.<br />
                                – Thực hiện các nghiệp vụ kiểm tra định kì hàng hoá tại kho online theo hướng dẫn của người quản lí.<br />
                                – Phối hợp với nhân viên tại kho để thực hiện các quy trình xuất-nhập hàng hoá.
                                <br /><br />
                                <strong>Quyền lợi:</strong><br />
                                – Lương cơ bản 5 triệu trở lên tuỳ năng lực.<br />
                                – Thưởng KPI theo doanh số.<br />
                                – Thưởng các dịp Lễ, Tết.
                                <br /><br />
                                <strong>Địa điểm phỏng vấn:</strong><br />
                                – ShoeShoe House – 248 Quốc Lộ 13, P.26, Q. Bình Thạnh
                            </p>
                        </div>
                    </div>

                    <div className={style.item}>
                        <div className={style.title} onClick={handleCustomer}>
                            |SALES| - CUSTOMER SERVICE
                            <span ref={customerDownRef}> <i className="fa-solid fa-angle-down"></i></span>
                            <span ref={customerUpRef}> <i className="fa-solid fa-angle-up"></i></span>
                        </div>
                        <div ref={customerRef} className={style.child}>
                            <p className={style.description}>
                                Full-time
                                <br /><br />
                                <strong>Thời gian làm việc:</strong><br />
                                – Thỏa thuận khi phỏng vấn.
                                <br /><br />
                                <strong>Địa điểm làm việc:</strong><br />
                                – ShoeShoe Customer Service Center – 248 Quốc lộ 13, P.26, Q.Bình Thạnh
                                <br /><br />
                                <strong>Yêu cầu công việc:</strong><br />
                                – Tuổi từ 18-24.<br />
                                – Tin học văn phòng; tiếng Anh giao tiếp cơ bản.<br />
                                – Có khả năng làm việc dưới áp lực cao.<br />
                                – Kiên nhẫn, không nóng tính.<br />
                                – Có kiến thức và am hiểu về giày, thời trang là một lợi thế lớn.
                                <br /><br />
                                <strong>Mô tả công việc:</strong>
                                – Trả lời inbox, comment trên các kênh truyền thông chính thức của ShoeShoe (FB, IG, Youtube,…) và các kênh thương mại điện tử đối tác.<br />
                                – Tư vấn giúp khách hàng chọn size giày, hướng dẫn bảo hành, đổi hàng.<br />
                                – Hỗ trợ kho online; trực hotline & phản hồi cho khách những thông tin cần thiết.<br />
                                <br /><br />
                                <strong>Quyền lợi:</strong><br />
                                – Lương cơ bản 5 triệu trở lên tuỳ năng lực.<br />
                                – Thưởng KPI theo doanh số.<br />
                                – Thưởng các dịp Lễ, Tết.
                                <br /><br />
                                <strong>Địa điểm phỏng vấn:</strong><br />
                                – ShoeShoe House – 248 Quốc Lộ 13, P.26, Q. Bình Thạnh
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Career