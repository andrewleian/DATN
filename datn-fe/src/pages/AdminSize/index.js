import clsx from "clsx";
import style from './Size.module.scss'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function Size() {

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
        setSort(prevState => ({ ...prevState, pageSize: item }));
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
            // if (response.status == 200) {
            // }
        } catch (error) {
            console.log(error);

        }
    };

    const updateSize = async (item) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.put(`http://localhost:8080/api/v1/staff/size/${item}`, form);
            // if (response.data.message === 'Delete successfully') {
            getAllSize();
            // }
        } catch (error) {
            console.log(error);
        }
    };

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
                <p>Size</p>
            </div>
            <hr />
            <div className={style.form}>
                <div className={style.row2SB}>

                    <div className={style.item}>
                        <label>Name</label>
                        <input value={form.name} onChange={(e) => setForm(prevState => ({ ...prevState, name: e.target.value }))}></input>
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
                                <th>Stt</th>
                                <th>Name</th>
                                <th>Create at</th>
                                <th>Update at</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr> 
                        </thead>

                        <tbody>
                            {sizes?.content?.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.createAt}</td>
                                    <td>{item.updateAt}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button onClick={() => getInforToEdit(item)}><i className="fa-regular fa-pen-to-square"></i></button>
                                        <button onClick={() => deleteSize(item.id)}><i className="fa-solid fa-trash"></i></button>
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
        </div >
    )
}

export default Size