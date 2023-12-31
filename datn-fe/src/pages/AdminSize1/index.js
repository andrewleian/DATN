import clsx from "clsx";
import style from './Size.module.scss'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
import { format } from 'date-fns';
function Size1() {

    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))
    const [form, setForm] = useState({
        id: "",
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
            id: "",
            name: '',
        })
    }

    //api

    const [sizes, setSizes] = useState([]);
    const getAllSize = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/size?pageNumber=${sort.page}&pageSize=${sort.pageSize}`);
            setSizes(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const addSize = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.post(`http://localhost:8080/api/v1/staff/size`, form);
            getAllSize();
            setMessage("Thêm thành công")
            setIsModalAddNewMsgOpen(false)
            setIsModalMsgOpen(true)
            setForm({
                id: "",
                name: '',
            })
        } catch (error) {
            console.log(error);

        }
    };

    const updateSize = async (item) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.put(`http://localhost:8080/api/v1/staff/size/${item}`, form);
            getAllSize();
            setMessage("Cập nhật thành công")
            setIsModalUpdateOpen(false)
            setIsModalMsgOpen(true)
            setForm({
                id: "",
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
        deleteSize(itemDelete)
    }

    const deleteSize = async (item) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.delete(`http://localhost:8080/api/v1/staff/size/${item}`);
            getAllSize();
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getAllSize();
    }, [sort])


    // edit or update
    const [isEdit, setIsEdit] = useState(false);

    // add
    const handleSubmit = (item) => {

        if (item == "create") {
            addSize();
        } else {
            updateSize(form.id);
            setIsEdit(false)
        }

        // getAllColor();
        handleDefaultValue();
    };

    //

    // get infor to edit
    const getInforToEdit = (item) => {
        setForm({ id: item.id, name: item.name })
        setIsModalUpdateOpen(true);
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
                    <li><button onClick={() => setIsModalAddNewMsgOpen(true)}>Tạo mới size</button></li>
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
                                <th>Tên</th>
                                <th>Tạo lúc</th>
                                <th>Cập nhật lúc</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sizes?.data?.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
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
                        {Array.from({ length: sizes.totalPages + 1 }, (_, index) => (
                            <li key={index}>
                                <button className={clsx({ [style.pageSelected]: index === selectedPage })} onClick={() => setPage(index)}>{index + 1}</button>
                            </li>
                        ))}
                        <li><button onClick={() => setNextPage(sizes.totalPages)}>Next</button></li>
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
                        <h6 className={style.title}>Tạo mới size</h6>
                        <div className={style.form}>
                            <form>

                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Name</label>
                                        <input value={form.name} onChange={(e) => setForm(prevState => ({ ...prevState, name: e.target.value }))}></input>
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
                        <h6 className={style.title}>Cập nhật size</h6>
                        <div className={style.form}>
                            <form>

                                <div className={style.row}>
                                    {/* <div className={style.formGroup}>
                                        <label>Mã màu</label>
                                        <input readOnly value={form.hexCode} onChange={(e) => setForm(prev => ({ ...prev, hexCode: e.target.value }))} placeholder='Nhập mã hex'></input>
                                    </div> */}
                                    <div className={style.formGroup}>
                                        <label>Name</label>
                                        <input value={form.name} onChange={(e) => setForm(prevState => ({ ...prevState, name: e.target.value }))}></input>
                                    </div>

                                </div>

                                <button className={style.buttonSubmit} type="button" onClick={() => handleSubmit("edit")}>Lưu lại</button>
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

export default Size1