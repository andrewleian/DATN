import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import clsx from "clsx";
import style from './Color.module.scss'
import { format } from 'date-fns';
import Modal from 'react-modal';
function Color1() {
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))
    const [form, setForm] = useState({
        hexCode: "",
        name: '',
    });
    // sort 
    const [sort, setSort] = useState({ page: 0, pageSize: 10 })


    // // page
    const [selectedPage, setSelectedPage] = useState(0);
    const setPage = (item) => {
        setSelectedPage(item);
        setSort(prevState => ({ ...prevState, page: item }));
    }

    const setNextPage = (maxPage) => {
        if (selectedPage <= maxPage) {
            setSelectedPage(prevState => (prevState + 1));
            setSort(prevState => ({ ...prevState, page: prevState.page + 1 }));
        }
    }
    const setPrevPage = () => {
        if (selectedPage >= 1) {
            setSelectedPage(prevState => prevState - 1);
            setSort(prevState => ({ ...prevState, page: prevState.page - 1 }));
        }
    }
    //

    const setPageSize = (item) => {
        setSort(prevState => ({ ...prevState, pageSize: item, page: 0 }));
        setSelectedPage(0);
    }

    // defaul value
    const handleDefaultValue = () => {
        setForm({
            hexCode: "",
            name: '',
        })
    }

    //api

    const [colors, setColors] = useState([]);
    const getAllColor = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/color?pageNumber=${sort.page}&pageSize=${sort.pageSize}`);
            setColors(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const addColor = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.post(`http://localhost:8080/api/v1/staff/color`, form);
            getAllColor();
            setMessage("Thêm thành công")
            setIsModalAddNewMsgOpen(false)
            setIsModalMsgOpen(true)
            setForm({
                hexCode: "",
                name: '',
            })

        } catch (error) {
            console.log(error);
        }
    };

    const updateColor = async (item) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.put(`http://localhost:8080/api/v1/staff/color`, form);
            getAllColor();
            setMessage("Cập nhật thành công")
            setIsModalUpdateOpen(false)
            setIsModalMsgOpen(true)
            setForm({
                hexCode: "",
                name: '',
            })
        } catch (error) {
            console.log(error);
        }
    };

    // delete
    const [itemDelete, setItemDelete] = useState(null);

    const confirmDelete = (item) => {
        setItemDelete(item)
        setMessage("Bạn chắc chứ?")
        setIsModalMsgOpen(true)
    }

    const acceptedToDelete = () => {
        deleteColor(itemDelete)
    }

    const deleteColor = async (item) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.post(`http://localhost:8080/api/v1/staff/colorDelete/${item}`);
            getAllColor();
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getAllColor();
    }, [sort])


    // edit or update
    const [isEdit, setIsEdit] = useState(false);

    // add
    const handleSubmit = (item) => {

        if (item == "create") {
            addColor();
        } else {
            updateColor();
        }

        // getAllColor();
        handleDefaultValue();
    };

    //

    // get infor to edit
    const getInforToEdit = (item) => {
        setForm({ hexCode: item.id, name: item.name })
        setIsModalUpdateOpen(true)
    }

    // cancel
    const handleCancel = () => {
        setIsEdit(false);
        handleDefaultValue();
    }

    // modal message
    const [message, setMessage] = useState("")
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);

    const handleCloseModalMsg = () => {
        setIsModalAddNewMsgOpen(false)
        setIsModalMsgOpen(false);
    };

    const [isModalAddNewOpen, setIsModalAddNewMsgOpen] = useState(false);

    const handleCloseModalAddNew = () => {
        setIsModalAddNewMsgOpen(false);
    };

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const handleCloseModalUpdate = () => {
        setIsModalUpdateOpen(false);
        // loadAndResetData();
    };

    return (
        <div className={style.container}>

            <div className={style.header}>
                <ul>
                    <li><button onClick={() => setIsModalAddNewMsgOpen(true)}>Tạo mới color</button></li>
                </ul>
            </div>
            <hr />

            <div className={style.danhSach}>

                <div className={style.rowSpaceBettween}>
                    <div className={style.col1}>
                        <label> Hiện </label>
                        <select value={sort.pageSize} onChange={(e) => setPageSize(e.target.value)}>
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
                                <th>Stt</th>
                                <th>Mã màu</th>
                                <th>Name</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {colors?.data?.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1 + ((colors?.currentPage) * sort.pageSize)}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{format(new Date(item.createAt), 'dd/MM/yyyy')}</td>
                                    <td>{format(new Date(item.updateAt), 'dd/MM/yyyy')}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button onClick={() => getInforToEdit(item)}><i className="fa-regular fa-pen-to-square"></i></button>
                                        <button onClick={() => confirmDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <div className={style.page}>
                    <ul>
                        <li><button onClick={setPrevPage}>Previous</button></li>
                        {Array.from({ length: colors.totalPages + 1 }, (_, index) => (
                            <li key={index}>
                                <button className={clsx({ [style.pageSelected]: index === selectedPage })} onClick={() => setPage(index)}>{index + 1}</button>
                            </li>
                        ))}
                        <li><button onClick={() => setNextPage(colors.totalPages)}>Next</button></li>
                    </ul>
                </div>
            </div>


            {/* add new */}
            <div>
                <Modal
                    isOpen={isModalAddNewOpen}
                    onRequestClose={handleCloseModalAddNew}
                    className={style.modalWrapper}
                    overlayClassName={style.modalOverlay}
                >
                    <div className={style.container}>
                        <h6 className={style.title}>Tạo mới color</h6>
                        <div className={style.form}>
                            <form>

                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Mã màu</label>
                                        <input value={form.hexCode} onChange={(e) => setForm(prev => ({ ...prev, hexCode: e.target.value }))} placeholder='Nhập mã hex'></input>
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Tên màu</label>
                                        <input value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} placeholder='Tên màu'></input>
                                    </div>
                                </div>

                                <button className={style.buttonSubmit} type="button" onClick={() => handleSubmit("create")}>Lưu lại</button>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>

            {/* update */}

            <div>
                <Modal
                    isOpen={isModalUpdateOpen}
                    onRequestClose={handleCloseModalUpdate}
                    className={style.modalWrapperUpdate}
                    overlayClassName={style.modalOverlayUpdate}
                >
                    <div className={style.container}>
                        <h6 className={style.title}>Cập nhật color</h6>
                        <div className={style.form}>
                            <form>

                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Mã màu</label>
                                        <input readOnly value={form.hexCode} onChange={(e) => setForm(prev => ({ ...prev, hexCode: e.target.value }))} placeholder='Nhập mã hex'></input>
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Name</label>
                                        <input value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} placeholder='Tên màu'></input>
                                    </div>
                                </div>

                                <button className={style.buttonSubmit} type="button" onClick={handleSubmit}>Lưu lại</button>
                            </form>
                        </div>
                    </div>

                </Modal>
            </div>

            <div>
                <Modal
                    isOpen={isModalMsgOpen}
                    onRequestClose={handleCloseModalMsg}
                    className={style.modalWrapperMsg}
                    overlayClassName={style.modalOverlayMsg}
                >
                    <h2>{message}</h2>

                    {message != "Bạn chắc chứ?" && <div className={style.btn}>
                        <button onClick={handleCloseModalMsg} className={style.btnSave}>OK</button>
                    </div>}
                    {message == "Bạn chắc chứ?" && <div className={style.btn}>
                        <button onClick={acceptedToDelete} className={style.btnSave}>Chắc chắn</button>
                        <button onClick={handleCloseModalMsg} className={style.btnSave}>Hủy</button>
                    </div>}
                </Modal>
            </div>
        </div>
    )
}

export default Color1