
import clsx from "clsx"
import style from './AdminStaff.module.scss'

function ImportExcel() {
    return (
        <div className={style.importExcel}>
            <div className={style.status}>
                <div className={style.StatusCuccess}>
                    <p>Excel Data Imported successfully</p>
                </div>
                <hr></hr>
            </div>

            <div className={style.item}>
                <label>Select File for Upload</label>
                <input type="file"></input>
                <button>Upload</button>
            </div>

            <div className={style.data}>
                <p>Customer Data</p>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th><input type='checkbox'></input></th>
                            <th>ID</th>
                            <th>Họ và tên</th>
                            <th>Ảnh</th>
                            <th>Địa chỉ</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>SĐT</th>
                            <th>Email</th>
                            <th>Chức vụ</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                       

                        <tr>
                            <td><input type='checkbox'></input></td>
                            <td>#AD01</td>
                            <td>Nguyễn Đình Quyền</td>
                            <td><img src='https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg'></img></td>
                            <td>Gia Lâm - Hà Nội</td>
                            <td>22/01/1990</td>
                            <td>Nam</td>
                            <td>0775499998</td>
                            <td>quyenndph19202@fpt.edu.vn</td>
                            <td>Admin</td>
                            <td><i className="fa-regular fa-pen-to-square"></i> <i className="fa-solid fa-trash"></i></td>
                        </tr>

                        <tr>
                            <td><input type='checkbox'></input></td>
                            <td>#AD01</td>
                            <td>Nguyễn Đình Quyền</td>
                            <td><img src='https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg'></img></td>
                            <td>Gia Lâm - Hà Nội</td>
                            <td>22/01/1990</td>
                            <td>Nam</td>
                            <td>0775499998</td>
                            <td>quyenndph19202@fpt.edu.vn</td>
                            <td>Admin</td>
                            <td><i className="fa-regular fa-pen-to-square"></i> <i className="fa-solid fa-trash"></i></td>
                        </tr>

                        <tr>
                            <td><input type='checkbox'></input></td>
                            <td>#AD01</td>
                            <td>Nguyễn Đình Quyền</td>
                            <td><img src='https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg'></img></td>
                            <td>Gia Lâm - Hà Nội</td>
                            <td>22/01/1990</td>
                            <td>Nam</td>
                            <td>0775499998</td>
                            <td>quyenndph19202@fpt.edu.vn</td>
                            <td>Admin</td>
                            <td><i className="fa-regular fa-pen-to-square"></i> <i className="fa-solid fa-trash"></i></td>
                        </tr>

                        <tr>
                            <td><input type='checkbox'></input></td>
                            <td>#AD01</td>
                            <td>Nguyễn Đình Quyền</td>
                            <td><img src='https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg'></img></td>
                            <td>Gia Lâm - Hà Nội</td>
                            <td>22/01/1990</td>
                            <td>Nam</td>
                            <td>0775499998</td>
                            <td>quyenndph19202@fpt.edu.vn</td>
                            <td>Admin</td>
                            <td><i className="fa-regular fa-pen-to-square"></i> <i className="fa-solid fa-trash"></i></td>
                        </tr>

                        <tr>
                            <td><input type='checkbox'></input></td>
                            <td>#AD01</td>
                            <td>Nguyễn Đình Quyền</td>
                            <td><img src='https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg'></img></td>
                            <td>Gia Lâm - Hà Nội</td>
                            <td>22/01/1990</td>
                            <td>Nam</td>
                            <td>0775499998</td>
                            <td>quyenndph19202@fpt.edu.vn</td>
                            <td>Admin</td>
                            <td><i className="fa-regular fa-pen-to-square"></i> <i className="fa-solid fa-trash"></i></td>
                        </tr>

                        <tr>
                            <td><input type='checkbox'></input></td>
                            <td>#AD01</td>
                            <td>Nguyễn Đình Quyền</td>
                            <td><img src='https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg'></img></td>
                            <td>Gia Lâm - Hà Nội</td>
                            <td>22/01/1990</td>
                            <td>Nam</td>
                            <td>0775499998</td>
                            <td>quyenndph19202@fpt.edu.vn</td>
                            <td>Admin</td>
                            <td><i className="fa-regular fa-pen-to-square"></i> <i className="fa-solid fa-trash"></i></td>
                        </tr>

                        <tr>
                            <td><input type='checkbox'></input></td>
                            <td>#AD01</td>
                            <td>Nguyễn Đình Quyền</td>
                            <td><img src='https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg'></img></td>
                            <td>Gia Lâm - Hà Nội</td>
                            <td>22/01/1990</td>
                            <td>Nam</td>
                            <td>0775499998</td>
                            <td>quyenndph19202@fpt.edu.vn</td>
                            <td>Admin</td>
                            <td><i className="fa-regular fa-pen-to-square"></i> <i className="fa-solid fa-trash"></i></td>
                        </tr>

                        <tr>
                            <td><input type='checkbox'></input></td>
                            <td>#AD01</td>
                            <td>Nguyễn Đình Quyền</td>
                            <td><img src='https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg'></img></td>
                            <td>Gia Lâm - Hà Nội</td>
                            <td>22/01/1990</td>
                            <td>Nam</td>
                            <td>0775499998</td>
                            <td>quyenndph19202@fpt.edu.vn</td>
                            <td>Admin</td>
                            <td><i className="fa-regular fa-pen-to-square"></i> <i className="fa-solid fa-trash"></i></td>
                        </tr>

                    </tbody>
                </table>

                <div className={style.page}>
                    <ul>
                        <li><button>Previous</button></li>
                        <li><button>1</button></li>
                        <li><button>2</button></li>
                        <li><button>3</button></li>
                        <li><button>Next</button></li>
                    </ul>
                </div>



            </div>
        </div >
    )
}

export default ImportExcel