import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import clsx from "clsx"
import style from './AdminPromotion.module.scss'
import AddNew from './AddNew'
import ImportExcel from './ImportExcel'
import axios from 'axios'
import { format } from 'date-fns';
import Modal from 'react-modal';
function AdminPromotion1() {
    Modal.setAppElement('#root');
    //api
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    const [sort, setSort] = useState({ page: 1, pageSize: 10, input: '', status: 'active' })


    // page
    const [selectedPage, setSelectedPage] = useState(1);
    const setPage = (item) => {
        setSelectedPage(item);
        setSort(prevState => ({ ...prevState, page: item }));
    }

    const setNextPage = (maxPage) => {
        if (selectedPage <= maxPage - 1) {
            setSelectedPage(prevState => (prevState + 1));
            setSort(prevState => ({ ...prevState, page: prevState.page + 1 }));
        }
    }
    const setPrevPage = () => {
        if (selectedPage >= 2) {
            setSelectedPage(prevState => prevState - 1);
            setSort(prevState => ({ ...prevState, page: prevState.page - 1 }));
        }
    }
    //

    const setPageSize = (item) => {
        setSort(prevState => ({ ...prevState, pageSize: item }));
    }


    const [promotions, setPromotions] = useState({
        "data": [],
        "current_page": 1,
        "total_page": 0,
        "total_item": 0,
        "size": 10
    });

    const getPromotions = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://localhost:8080/api/v1/director/promotions/getAll?input=${sort.input}&status=${sort.status}&page=${sort.page}&pageSize=${sort.pageSize}`)
            setPromotions(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPromotions();
    }, [sort])

    // get product color size
    const [searchProduct, setSearchProduct] = useState("");
    const [productDetails, setProductDetails] = useState([]);
    const getProductColorSizes = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://localhost:8080/api/v1/list-products/?pageNumber=0&pageSize=9999999&color=&min_price=0&max_price=9999999999999&tu_khoa=${searchProduct}`)
            setProductDetails(response.data)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProductColorSizes();
    }, [searchProduct])


    // get promotion details
    const [promotionDetails, setPromotionDetails] = useState({
        idProductDetails: []
    });

    const getPromotionDetails = async (idPromotion) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://localhost:8080/api/v1/director/promotions/promotion/${idPromotion}`)
            setPromotionDetails(response.data.data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPromotions();
    }, [sort])


    // edit
    const [selectedPromotions, setSelectedPromotions] = useState({
        id: null,
        title: '',
        content: '',
        discount: '0',
        start_at: '',
        end_at: '',
        status: '',
        id_product_color_size: []
    });

    const handleEdit = (item) => {
        getPromotionDetails(item.id)

        setSelectedPromotions({
            id: item.id,
            title: item.title,
            content: item.content,
            discount: item.discountValue,
            start_at: format(new Date(item.startAt), 'yyyy-MM-dd'),
            end_at: format(new Date(item.endAt), 'yyyy-MM-dd'),
            status: item.status,
            id_product_color_size: []
        });
        setIsModalUpdateOpen(true)
    }

    useEffect(() => {
        const newProducts = promotionDetails.idProductDetails.map(item => ({
            id: item.id,
            name: item.name,
            color: item.color
        }));

        const updatedPromotion = {
            ...selectedPromotions,
            id_product_color_size: [
                ...newProducts
            ]
        };

        setSelectedPromotions(updatedPromotion);


    }, [promotionDetails])


    console.log(selectedPromotions)

    //delete
    const [promotionDelete, setPromotionDelete] = useState(null);

    const confirmDelete = (item) => {
        setPromotionDelete(item)
        setMessage("Bạn chắc chứ?")
        setIsModalMsgOpen(true)
    }

    const acceptedToDelete = () => {
        handleDelete(promotionDelete)
    }


    const handleDelete = (item) => {
        const deletePromotion = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.delete(`http://localhost:8080/api/v1/director/promotions/${item.id}`);
                setMessage("Thành công")
                setIsModalMsgOpen(true)
                getPromotions();
            } catch (error) {
                console.log(error);
            }
        };
        deletePromotion();
    }


    //add new
    const [promotion, setPromotion] = useState({ ...selectedPromotions });
    const [messages, setMessages] = useState({
        title: -1,
        content: -1,
        discount: -1,
        start_at: -1,
        end_at: -1,
        status: -1,
    });

    useEffect(() => {
        setPromotion({ ...selectedPromotions })
    }, [selectedPromotions])

    const handleInput = (key, value) => {
        setPromotion((prev) => ({
            ...prev,
            [key]: value
        }));

        validateInput(key, value)
    };


    const validateInput = (key, value) => {
        console.log(value)
        if (key !== "id" && key !== "discount" && key !== "id_product_color_size") {
            value = value.trim();
        }

        const validators = {
            title: /^[\s\S]*$/,
            content: /^[\s\S]*$/,
            discount: /^(?:100(?:\.0{1,2})?|\d{1,2}(?:\.\d{1,2})?)$/,
            // start_at: /^(?=.*[0-9-])[0-9-]+$/,
            // end_at: /^(?=.*[0-9-])[0-9-]+$/,
            status: /^(active|inactive)$/,
        };

        const validator = validators[key];
        if (validator) {
            if (!value || value === '') {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    [key]: 2
                }));
                return false;
            }

            const isValid = validator.test(value);
            setMessages((prevMessages) => ({
                ...prevMessages,
                [key]: isValid ? 1 : 0,
            }));
            return isValid;
        }

        if (key === "end_at") {
            const startDate = new Date(promotion.start_at).getTime();
            const endDate = new Date(value).getTime();

            if (endDate <= startDate) {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    end_at: 0, start_at: 0
                }));
                return false;
            } else {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    end_at: 1,
                }));
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    start_at: 1,
                }));
            }
        }

        if (key === "start_at") {
            const startDate = new Date(value).getTime();
            const endDate = new Date(promotion.end_at).getTime();

            if (endDate <= startDate) {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    start_at: 0,
                }));
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    end_at: 0,
                }));
                return false;
            } else {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    start_at: 1,
                }));
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    end_at: 1,
                }));
            }
        }

        return true;
    };


    const handleDefaultValue = () => {
        setPromotion({
            id: null,
            title: '',
            content: '',
            discount: 0,
            start_at: '',
            end_at: '',
            // createAt: '',
            // updateAt: '',
            status: '',
            id_product_color_size: []
        })

        setMessages({
            title: -1,
            content: -1,
            discount: -1,
            start_at: -1,
            end_at: -1,
            status: -1,
        })
    }


    const handleSubmit = () => {
        let isValid = true;

        for (const key in promotion) {
            if (promotion.hasOwnProperty(key)) {
                if (!validateInput(key, promotion[key])) {
                    isValid = false;
                }
            }
        }


        if (isValid) {
            if (promotion.id) {
                const updatePromotion = async () => {
                    try {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        const response = await axios.put(`http://localhost:8080/api/v1/director/promotions/${promotion.id}`, promotion);
                        setMessage("Cập nhật thành công")
                        setIsModalMsgOpen(true)
                        loadAndResetData();
                    } catch (error) {
                        console.log(error);
                        setMessage(error.data.mesage)
                        setIsModalMsgOpen(true)
                    }
                };
                updatePromotion();
            } else {
                const addPromotion = async () => {
                    try {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        const response = await axios.post(`http://localhost:8080/api/v1/director/promotions/createPromotion`, promotion);
                        setMessage("Thêm thành công")
                        setIsModalMsgOpen(true)
                        loadAndResetData();

                    } catch (error) {
                        console.log(error);
                        setMessage(error.response.data)
                        setIsModalMsgOpen(true)
                    }
                };
                addPromotion();
            }
        }
        // }
    };



    //
    const loadAndResetData = () => {
        getPromotions();
        setIsModalUpdateOpen(false)
        setIsModalAddNewMsgOpen(false);
        handleDefaultValue();
    }


    // modal message
    const [message, setMessage] = useState("")
    const [isModalMsgOpen, setIsModalMsgOpen] = useState(false);

    const handleCloseModalMsg = (item) => {
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
        loadAndResetData();
    };

    // delete product hava promotion


    //

    const handleSelectChange = (value) => {
        const item = JSON.parse(value);
        const selectedId = parseInt(item.idPcs);
        const productCls = { id: item.idPcs, name: item.name, color: item.colorDTO.name };

        if (!promotion.id_product_color_size.some(item => item.id === selectedId)) {
            const updatedPromotion = {
                ...promotion,
                id_product_color_size: [...promotion.id_product_color_size, productCls]
            };
            setPromotion(updatedPromotion);
        }
    };

    const addAllProductDetailsToList = () => {
        const newProducts = productDetails.data.map(item => ({
            id: item.idPcs,
            name: item.name,
            color: item.colorDTO.name
        }));

        const updatedPromotion = {
            ...promotion,
            id_product_color_size: [
                ...promotion.id_product_color_size,
                ...newProducts.filter(newProduct => (
                    !promotion.id_product_color_size.some(
                        existingProduct => existingProduct.id === newProduct.id
                    )
                ))
            ]
        };

        setPromotion(updatedPromotion);
    };

    const handleRemoveItem = (itemId) => {
        const updatedItems = promotion.id_product_color_size.filter((item) => item.id !== itemId);
        const updatedPromotion = {
            ...promotion,
            id_product_color_size: [...updatedItems]
        };
        setPromotion(updatedPromotion);
    };

    console.log(promotion)



    return (
        <div className={style.container}>

            <div className={style.header}>
                <ul>
                    <li><button onClick={() => setIsModalAddNewMsgOpen(true)}>Tạo mới khuyến mãi</button></li>
                </ul>
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
                                <th>Stt</th>
                                <th>Tiêu đề</th>
                                <th>Nội dung</th>
                                <th>% khuyến mãi</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {promotions.data.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.content}</td>
                                    <td>{item.discountValue}%</td>
                                    <td>{format(new Date(item.startAt), 'dd/MM/yyyy')}</td>
                                    <td>{format(new Date(item.endAt), 'dd/MM/yyyy')}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button onClick={() => { handleEdit(item) }}><i className="fa-regular fa-pen-to-square"></i></button>
                                        <button onClick={() => { confirmDelete(item) }}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <div className={style.page}>
                    <ul>
                        <li><button onClick={setPrevPage}>Previous</button></li>

                        {Array.from({ length: promotions.total_page }, (_, index) => (
                            <li key={index}>
                                <button className={clsx({ [style.pageSelected]: index + 1 === sort.page })} onClick={() => setPage(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                        <li><button onClick={() => setNextPage(promotions.total_page)}>Next</button></li>
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
                        <h6 className={style.title}>Tạo mới khuyến mãi</h6>
                        <div className={style.form}>
                            <form>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Tiêu đề</label>
                                        <input onChange={(e) => handleInput("title", e.target.value)} value={promotion.title}></input>
                                        {messages.title === 2 && <label className={style.errorMessage}>Không được bỏ trống</label>}
                                        {messages.title === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Nội dung</label>
                                        <input onChange={(e) => handleInput("content", e.target.value)} value={promotion.content}></input>
                                        {messages.content === 2 && <label className={style.errorMessage}>Không được bỏ trống</label>}
                                        {messages.content === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                </div>
                                <div className={style.formGroup}>
                                    <label>% giảm giá <span style={{ color: 'black' }}> % </span></label>
                                    <input onChange={(e) => handleInput("discount", e.target.value)} value={promotion.discount}></input>
                                    {messages.discount === 2 && <label className={style.errorMessage}>Không được bỏ trống</label>}
                                    {messages.discount === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>

                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Ngày bắt đầu</label>
                                        <input onChange={(e) => handleInput("start_at", e.target.value)} type="date" value={promotion.start_at}></input>
                                        {messages.start_at === 2 && <label className={style.errorMessage}>Không được bỏ trống</label>}
                                        {messages.start_at === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Ngày kết thúc</label>
                                        <input onChange={(e) => handleInput("end_at", e.target.value)} type="date" value={promotion.end_at}></input>
                                        {messages.end_at === 2 && <label className={style.errorMessage}>Không được bỏ trống</label>}
                                        {messages.end_at === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                </div>

                                <div className={style.formGroup}>
                                    <label>Trạng thái</label>
                                    <select onChange={(e) => handleInput("status", e.target.value)}>
                                        <option value="" hidden></option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {messages.status === 2 && <label className={style.errorMessage}>Không được bỏ trống</label>}
                                    {messages.status === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>

                                <div className={style.row}>

                                    <div className={style.formGroup}>
                                        <label>Tìm kiếm sản phẩm</label>
                                        <input
                                            onChange={(e) => setSearchProduct(e.target.value)}
                                            value={searchProduct}
                                        ></input>
                                    </div>

                                    <div className={style.formGroup}>
                                        <label>Chọn sản phẩm khuyến mãi</label>
                                        <select
                                            onChange={(e) => handleSelectChange(e.target.value)}
                                            value=""
                                        >
                                            <option value="" disabled>Chọn sản phẩm khuyến mãi</option>
                                            {productDetails?.data?.map((item, index) => (
                                                <option key={index} value={JSON.stringify(item)}>
                                                    {item.name}   ({item.colorDTO.name})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className={style.formGroupBtn}>
                                        <button type="button" onClick={addAllProductDetailsToList}>Thêm tất cả</button>
                                    </div>

                                </div>

                                <div className={style.selectedItems}>
                                    <label>Sản phẩm đã chọn:</label>
                                    {promotion.id_product_color_size.length > 0 && <table className={style.stripedTable}>
                                        <thead>
                                            <tr>
                                                <th>Stt</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Màu sắc</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {promotion.id_product_color_size.map((item, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <th>{index + 1}</th>
                                                        <th>{item.name}</th>
                                                        <th>{item.color}</th>
                                                        <th><button type="button" onClick={() => handleRemoveItem(item.id)}>x</button></th>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>}

                                    {promotion.id_product_color_size.length == 0 && <h3>Chưa có sản phẩm nào</h3>}

                                </div>


                                <button className={style.buttonSubmit} type="button" onClick={handleSubmit}>Lưu lại</button>
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
                        <h6 className={style.title}>Cập nhật khuyến mãi</h6>
                        <div className={style.form}>
                            <form>
                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Tiêu đề</label>
                                        <input onChange={(e) => handleInput("title", e.target.value)} value={promotion.title}></input>
                                        {messages.title === 2 && <label className={style.errorMessage}>Không được bỏ trống</label>}
                                        {messages.title === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Nội dung</label>
                                        <input onChange={(e) => handleInput("content", e.target.value)} value={promotion.content}></input>
                                        {messages.content === 2 && <label className={style.errorMessage}>Không được bỏ trống</label>}
                                        {messages.content === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                </div>
                                <div className={style.formGroup}>
                                    <label>% giảm giá <span style={{ color: 'black' }}> % </span></label>
                                    <input onChange={(e) => handleInput("discount", e.target.value)} value={promotion.discount}></input>
                                    {messages.discount === 2 && <label className={style.errorMessage}>Không được bỏ trống</label>}
                                    {messages.discount === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>

                                <div className={style.row}>
                                    <div className={style.formGroup}>
                                        <label>Ngày bắt đầu</label>
                                        <input onChange={(e) => handleInput("start_at", e.target.value)} type="date" value={promotion.start_at}></input>
                                        {messages.start_at === 2 && <label className={style.errorMessage}>Không được bỏ trống</label>}
                                        {messages.start_at === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Ngày kết thúc</label>
                                        <input onChange={(e) => handleInput("end_at", e.target.value)} type="date" value={promotion.end_at}></input>
                                        {messages.end_at === 2 && <label className={style.errorMessage}>Không được bỏ trống</label>}
                                        {messages.end_at === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                    </div>
                                </div>

                                <div className={style.formGroup}>
                                    <label>Trạng thái</label>
                                    <select value={promotion.status} onChange={(e) => handleInput("status", e.target.value)}>
                                        <option value="" hidden></option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {messages.status === 2 && <label className={style.errorMessage}>Không được bỏ trống</label>}
                                    {messages.status === 0 && <label className={style.errorMessage}>Dữ liệu không hợp lệ</label>}
                                </div>

                                <div className={style.row}>

                                    <div className={style.formGroup}>
                                        <label>Tìm kiếm sản phẩm</label>
                                        <input
                                            onChange={(e) => setSearchProduct(e.target.value)}
                                            value={searchProduct}
                                        ></input>
                                    </div>

                                    <div className={style.formGroup}>
                                        <label>Chọn sản phẩm khuyến mãi</label>
                                        <select
                                            onChange={(e) => handleSelectChange(e.target.value)}
                                            value=""
                                        >
                                            <option value="" disabled>Chọn sản phẩm khuyến mãi</option>
                                            {productDetails?.data?.map((item, index) => (
                                                <option key={index} value={JSON.stringify(item)}>
                                                    {item.name}   ({item.colorDTO.name})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className={style.formGroupBtn}>
                                        <button type="button" onClick={addAllProductDetailsToList}>Thêm tất cả</button>
                                    </div>

                                </div>

                                {/* <div className={style.selectedItems}>
                                    <label>Sản phẩm đã chọn:</label>
                                    <ul>
                                        {promotion.id_product_color_size.map((item, index) => (
                                            <li key={index}>
                                                {item.name} ({item.color})
                                                <button type="button" onClick={() => handleRemoveItem(item.id)}>x</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div> */}
                                <div className={style.selectedItems}>
                                    <label>Sản phẩm đã chọn:</label>
                                    {promotion.id_product_color_size.length > 0 && <table className={style.stripedTable}>
                                        <thead>
                                            <tr>
                                                <th>Stt</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Màu sắc</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {promotion.id_product_color_size.map((item, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <th>{index + 1}</th>
                                                        <th>{item.name}</th>
                                                        <th>{item.color}</th>
                                                        <th><button type="button" onClick={() => handleRemoveItem(item.id)}>x</button></th>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>}

                                    {promotion.id_product_color_size.length == 0 && <h3>Chưa có sản phẩm nào</h3>}

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

export default AdminPromotion1