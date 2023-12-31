import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import clsx from "clsx";
import style from './Color.module.scss'

function Color() {
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
        setSort(prevState => ({ ...prevState, pageSize: item }));
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
            // if (response.status == 200) {
            // }
        } catch (error) {
            console.log(error);

        }
    };

    const updateColor = async (item) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.put(`http://localhost:8080/api/v1/staff/color`, form);
            // if (response.data.message === 'Delete successfully') {
            getAllColor();
            // }
        } catch (error) {
            console.log(error);
        }
    };

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
            setIsEdit(false)
        }

        // getAllColor();
        handleDefaultValue();
    };

    //

    // get infor to edit
    const getInforToEdit = (item) => {
        setForm({ hexCode: item.id, name: item.name })
        setIsEdit(true)
    }

    // cancel
    const handleCancel = () => {
        setIsEdit(false);
        handleDefaultValue();
    }




    return (
        <div className={style.container}>
            <div className={style.title}>
                <p>COLOR</p>
            </div>
            <hr />
            <div className={style.form}>
                <div className={style.row3SB}>
                    <div className={style.item}>
                        <label>Mã màu</label>
                        <input value={form.hexCode} onChange={(e) => setForm(prev => ({ ...prev, hexCode: e.target.value }))} placeholder='Nhập mã hex'></input>
                        {/* <label className={style.errorMessage}>Không được để trống</label> */}
                    </div>

                    <div className={style.item}>
                        <label>Name</label>
                        <input value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} placeholder='Tên màu'></input>
                        {/* <label className={style.errorMessage}>Không được để trống</label> */}
                    </div>

                    {/* <div className={style.item}>
                        <label>Status</label>
                        <input ></input>
                        <label className={style.errorMessage}>Không được để trống</label>
                    </div> */}
                </div>

                <div className={style.formAction}>
                    {isEdit == false && <button onClick={() => handleSubmit("create")}>Lưu lại</button>}
                    {isEdit && <button onClick={() => handleSubmit("edit")}>Lưu lại</button>}
                    <button onClick={handleCancel}>Cancel</button>
                    <button>Back</button>
                </div>

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
                                {/* <th><input type='checkbox'></input></th> */}
                                <th>Stt</th>
                                <th>Mã màu</th>
                                <th>Name</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                                <th>Trạng thái</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {colors?.data?.map((item, index) => {
                                return <tr key={index}>
                                    {/* <td><input type="checkbox" /></td> */}
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.createAt}</td>
                                    <td>{item.updateAt}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button onClick={() => getInforToEdit(item)}><i className="fa-regular fa-pen-to-square"></i></button>
                                        <button onClick={() => deleteColor(item.id)}><i className="fa-solid fa-trash"></i></button>
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
        </div >
    )
}

export default Color