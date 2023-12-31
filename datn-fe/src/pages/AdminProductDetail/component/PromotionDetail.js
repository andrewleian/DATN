import clsx from "clsx";
import style from './PromotionDetail.module.scss'

function PromotionDetail() {
    return (
        <div className={style.container}>
            {/* <div className={style.title}>
                <p>PROMOTION DETAILS</p>
            </div>
            <hr />
            <div className={style.form}>
                <div className={style.row2SB}>
                    <div className={style.item}>
                        <label>ID product color</label>
                        <div className={style.rowForm}>
                            <select>
                                <option hidden>ID product color</option>
                            </select>
                            <button >Edit</button>
                        </div>
                        <label className={style.errorMessage}>Không được để trống</label>
                    </div>

                    <div className={style.item}>
                        <label>ID promotion</label>
                        <div className={style.rowForm}>
                            <select>
                                <option hidden>ID promotion</option>
                            </select>
                            <button >Edit</button>
                        </div>
                        <label className={style.errorMessage}>Không được để trống</label>
                    </div>
                </div>

                <div className={style.formAction}>
                    <button>Lưu lại</button>
                    <button>Cancel</button>
                    <button>Back</button>
                </div>

            </div>

            <hr />


            <div className={style.danhSach}>
                <div className={style.rowSpaceBettween}>
                    <div className={style.col1}>
                        <label> Hiện </label>
                        <select>
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            <option>40</option>
                            <option>50</option>
                        </select>
                        <label> danh mục </label>
                    </div>

                    <div className={style.col2}>
                        <label> Tìm kiếm: </label>
                        <input placeholder='Tìm kiếm'></input>
                    </div>
                </div>

                <div className={style.table}>
                    <table>
                        <thead>
                            <tr>
                                <th><input type='checkbox'></input></th>
                                <th>Stt</th>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Create at</th>
                                <th>Update at</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                (() => {
                                    const rows = [];
                                    for (let i = 0; i < 10; i++) {
                                        rows.push(
                                            <tr key={i}>
                                                <td><input type="checkbox" /></td>
                                                <td>1</td>
                                                <td>#f5deb3</td>
                                                <td>Đỏ</td>
                                                <td>Active</td>
                                                <td>andrewle</td>
                                                <td>andrewle</td>
                                                <td>
                                                    <button><i className="fa-regular fa-pen-to-square"></i></button>
                                                    <button><i className="fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return rows;
                                })()
                            }
                        </tbody>
                    </table>
                </div>

                <div className={style.page}>
                    <ul>
                        <li><button>Previous</button></li>
                        <li><button>1</button></li>
                        <li><button>2</button></li>
                        <li><button>3</button></li>
                        <li><button>Next</button></li>
                    </ul>
                </div>
            </div> */}
        </div >
    )
}

export default PromotionDetail