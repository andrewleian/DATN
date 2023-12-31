
import clsx from "clsx";
import style from "./Privacy.module.scss"

function Privacy() {

    return (
        <div className={style.container}>
            <div className={style.mainTitle}>
                <p>CHÍNH SÁCH BẢO MẬT THÔNG TIN</p>
            </div>
            <div className={style.mainDescription}>
                <p >ShoeShoe (đơn vị chủ quản hệ thống website www.shoeshoe.vn) cam kết tôn trọng,
                    bảo mật những thông tin mang tính riêng tư của bạn.
                    Chúng tôi hiểu rằng bạn cần biết chúng tôi quản lý những thông tin cá nhân được tập hợp từ website như thế nào.
                    Hãy đọc và tìm hiểu về “Chính Sách Bảo Mật Thông Tin” dưới đây trước khi truy cập những nội dung khác để hiểu hơn những cam kết mà chúng tôi thực hiện,
                    nhằm tôn trọng và bảo vệ quyền lợi của người dùng. Việc bạn truy cập,
                    đăng ký, sử dụng website ShoeShoe.vn có nghĩa rằng bạn đồng ý và chấp nhận
                    ràng buộc bởi các điều khoản của bản quy định bảo mật của chúng tôi.</p>
            </div>

            <div className={style.rules}>
                <div className={style.item}>
                    <p className={style.title}>1. THÔNG TIN CÁ NHÂN</p>
                    <p className={style.description}><strong>ShoeShoe</strong> chỉ yêu cầu các thông tin cá nhân của bạn như:</p>
                    <ul>
                        <li>Họ và Tên</li>
                        <li>Ngày, tháng, năm sinh</li>
                        <li>Địa chỉ Email</li>
                        <li>Địa chỉ (dùng cho mục đích quản lý đơn hàng, giao nhận)</li>
                    </ul>
                    <p className={style.description}>
                        Cùng các thông tin không bắt buộc khác khi bạn muốn tương tác với một số nội dung trên ShoeShoe.
                        Các thông tin cá nhân của bạn sẽ được ShoeShoe sử dụng để nhận diện và liên hệ với bạn khi cần.
                    </p>
                </div>

                <div className={style.item}>
                    <p className={style.title}>2. CÁCH THỨC SỬ DỤNG THÔNG TIN</p>
                    <p className={style.description}>
                        Thông thường, chúng tôi sử dụng các thông tin bạn cung cấp chỉ để liên hệ,
                        hồi đáp những câu hỏi hay xác nhận thông tin đơn hàng theo tên,
                        địa chỉ và số điện thoại mà bạn đã cung cấp.
                        Chúng tôi cam kết thông tin cá nhân của bạn sẽ không bị chia sẻ với bất kỳ một bên thứ ba nào khi chưa có sự đồng ý.
                        Chúng tôi chỉ có thể được phép chia sẻ thông tin với các đối tác giao nhận hoặc
                        với các đối tác trong các chương trình, dự án liên kết khác.
                        Dữ liệu khách hàng của ShoeShoe có thể được chuyển nhượng cho người kế thừa hay
                        người được chỉ định theo thỏa thuận để quản lý khi công ty có sự mua bán, sát nhập hay tuyên bố phá sản.
                    </p>
                </div>

                <div className={style.item}>
                    <p className={style.title}>3. ĐẢM BẢO AN TOÀN VỚI CÁC THÔNG TIN ĐƯỢC THU THẬP</p>
                    <p className={style.description}>
                        ShoeShoe chỉ tập hợp lại các thông tin cá nhân của bạn trong phạm vi phù hợp và
                        cần thiết cho mục đích cải thiện chất lượng phục vụ cũng như nâng cao trải nghiệm
                        các dịch vụ được ShoeShoe cung cấp. Chúng tôi cam kết tôn trọng và luôn duy trì các
                        biện pháp thích hợp nhằm đảm bảo tính an toàn, vẹn nguyên, độ chính xác cùng tính
                        bảo mật về các thông tin mà bạn đã tin tưởng để cung cấp cho chúng tôi. Ngoài ra,
                        ShoeShoe cũng cam kết có những biện pháp thích hợp nhằm đảm bảo tính an toàn,
                        tính bảo mật về mọi thông tin mà bạn đã cung cấp cho chúng tôi trong các chương
                        trình hay sự liên kết với các đối tác, các bên thứ ba.
                    </p>
                </div>

                <div className={style.item}>
                    <p className={style.title}>4. COOKIES</p>
                    <p className={style.description}>
                        Cookies là những tệp nhỏ phát sinh trong quá trình bạn truy cập,
                        hoạt động trên Website được ShoeShoe ghi chép lại nhằm mục đích đáp ứng các nhu cầu của
                        người sử dụng và nhiều mục đích khác.
                    </p>
                </div>

                <div className={style.item}>
                    <p className={style.title}>5. LIÊN KẾT VỚI CÁC WEBSITE KHÁC</p>
                    <p className={style.description}>
                        Nếu bạn nhấn đường liên kết sang Website của bên thứ ba,
                        bạn sẽ tạm rời khỏi ShoeShoe để đến trang Web mà bạn đã chọn.
                        ShoeShoe không thể kiểm soát các hoạt động của bên thứ ba và không chịu trách nhiệm về sự
                        an toàn hay bất kể những nội dung gì có trên website đó.
                    </p>
                </div>

                <div className={style.item}>
                    <p className={style.title}>6. ĐIỀU KHOẢN THAY ĐỔI</p>
                    <p className={style.description}>
                        Chúng tôi có toàn quyền thay đổi, bổ sung nội dung của các điều khoản này.
                        Bạn có thể thường xuyên kiểm tra nhằm nắm được các điều khoản thay đổi trong
                        “Chính Sách Bảo Mật Thông Tin” của chúng tôi. Thêm vào đó, đối với những thay đổi
                        quan trọng về cách sử dụng liên quan đến các thông tin cá nhân mà bạn cung cấp cho ShoeShoe,
                        chúng tôi sẽ gửi thông báo cho bạn bằng Email hoặc thông báo trên các kênh truyền thông
                        chính thức khác của ShoeShoe. Trong trường hợp bạn có thắc mắc về các điều khoản hay cách
                        sử dụng liên quan đến các thông tin cá nhân của bạn tại website ShoeShoe.vn,
                        xin liên hệ với chúng tôi theo địa chỉ Email: cs@shoeshoe.vn.
                    </p>
                </div>

            </div>

        </div >
    )
}

export default Privacy