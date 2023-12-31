import clsx from "clsx";
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
// import style from './Details.module.scss'
import style from './ProductCS.module.scss'
// import Color from "../AdminColor/Color";
function Details() {

    // file
    const [fileList, setFileList] = useState([]);

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        const newFiles = [];
        for (let i = 0; i < files.length; i++) {
            newFiles.push(files[i]);
        }
        setFileList(prevFiles => [...prevFiles, ...newFiles]);
        e.target.value = '';
    };

    const handleRemoveFile = (fileToRemove) => {
        setFileList(prevFiles => prevFiles.filter(file => file !== fileToRemove));
    };
    console.log(fileList)

    const handleFormSubmit = () => {
        const formData = new FormData();
        formData.append('field1', 'value1'); 
        formData.append('field2', 'value2');
        fileList.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });

        axios.post('/upload', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    // api
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    const getAllColor = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/color?pageNumber=0&pageSize=1111`);
            setColors(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getAllManufacturer = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/color?pageNumber=0&pageSize=1111`);
            setColors(response.data.content)
        } catch (error) {
            console.log(error);
        }
    }

    const getAllSize = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/size?pageNumber=0&pageSize=1111`);
            console.log(response.data)
            setSizes(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllColor();
        getAllSize();                                                        ///////////////////////////check
        // getAllManufacturer();
    }, [])

    console.log(colors)

    //product
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem("role"))

    const [sort, setSort] = useState({ tuKhoa: "", pageNumber: 0, pageSize: 10 })
    const [products, setProducts] = useState({
        "data": [],
        "totalPages": 1,
        "totalElements": 10,
        "currentPage": 0,
        "pageSize": 10
    });
    const getProducts = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://localhost:8080/api/v1/staff/product?tuKhoa=${sort.tuKhoa}&pageNumber=${sort.pageNumber}&pageSize=${sort.pageSize}`)
            setProducts(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts();
    }, [sort])

    // //product details
    const [productDetails, setProductDetails] = useState({
        productId: -1,
        price: 0,
        colorId: -1,
        sizeDTOSs: {
            id: '',
            name: "",
            amount: 0,
            createAt: "",
            updateAt: "",
            status: ""
        },
        status: ""
    });

    console.log(fileList)

    const submit = () => {
        const addProductDetails = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const formData = new FormData();
                formData.append('files', fileList);
                // formData.append('request', JSON.stringify(productDetails));
                formData.append('request', productDetails);
                const response = await axios.post(
                    'http://localhost:8080/api/v1/staff/product-detail',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

            } catch (error) {
                console.log(error);

            }
        };


        const addProductDetails1 = async () => {
            try {
                const formData = new FormData();
                formData.append('file', fileList[0]);
                formData.append('idPcs', 3);

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.post(
                    'http://localhost:8080/api/v1/staff/product-detail/image/add-one',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        addProductDetails();
    }

    console.log(productDetails)

    return (
        <div className={style.container1}>
            <div className={style.title}>
                <p>PRODUCT DETAILS</p>
            </div>

            <div>
                <div className={style.form1}>
                    <div className={style.row2SB}>
                        <div className={style.item}>
                            <label>Product</label>
                            <select value={productDetails.productId} onChange={(e) => setProductDetails((prevState) => ({ ...prevState, productId: e.target.value }))}>
                                <option hidden>Chọn product</option>
                                {
                                    products?.data?.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.name}</option>
                                    })
                                }
                            </select>
                            {/* <button onClick={() => setIsColorActive(true)}>Edit</button> */}
                            {/* <label className={style.errorMessage}>Không được để trống</label> */}
                        </div>

                        <div className={style.item}>
                            <label>Color</label>
                            <select value={productDetails.colorId} onChange={(e) => setProductDetails((prevState) => ({ ...prevState, colorId: e.target.value }))}>
                                <option hidden>Chọn Color</option>
                                {
                                    colors?.data?.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.name}</option>
                                    })
                                }
                            </select>
                            {/* <label className={style.errorMessage}>Không được để trống</label> */}
                        </div>

                        <div className={style.item}>
                            <label>Price</label>
                            <input value={productDetails.price} onChange={(e) => setProductDetails((prevState) => ({ ...prevState, price: e.target.value }))}></input>
                            {/* <label className={style.errorMessage}>Không được để trống</label> */}
                        </div>


                        <div className={style.item}>
                            <label>Status</label>
                            <select value={productDetails.status} onChange={(e) => setProductDetails((prevState) => ({ ...prevState, status: e.target.value }))}>
                                <option hidden>Chọn status</option>
                                <option value='active'>active</option>
                                <option value='inactive'>inactive</option>
                            </select>
                            {/* <label className={style.errorMessage}>Không được để trống</label> */}
                        </div>


                    </div>


                </div>


                <div className={style.title}>
                    <br></br>
                </div>

                <div className={style.form2}>
                    <div className={style.row2SB}>
                        <div className={style.item}>
                            <label>Size</label>
                            <select value={productDetails.sizeDTOSs.name} onChange={(e) => setProductDetails((prevState) => ({ ...prevState, sizeDTOSs: { ...prevState.sizeDTOSs, name: e.target.value } }))}>
                                <option hidden>Chọn size</option>
                                {
                                    sizes?.data?.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.name}</option>
                                    })
                                }
                            </select>
                            {/* <button onClick={() => setIsColorActive(true)}>Edit</button> */}
                            {/* <label className={style.errorMessage}>Không được để trống</label> */}
                        </div>

                        <div className={style.item}>
                            <label>Amount</label>
                            <input value={productDetails.sizeDTOSs.amount} onChange={(e) => setProductDetails((prevState) => ({ ...prevState, sizeDTOSs: { ...prevState.sizeDTOSs, amount: e.target.value } }))}></input>
                            {/* <label className={style.errorMessage}>Không được để trống</label> */}
                        </div>


                        <div className={style.item}>
                            <label>Status</label>
                            <select value={productDetails.sizeDTOSs.status} onChange={(e) => setProductDetails((prevState) => ({ ...prevState, sizeDTOSs: { ...prevState.sizeDTOSs, status: e.target.value } }))}>
                                <option hidden>Chọn status</option>
                                <option value='active'>active</option>
                                <option value='inactive'>inactive</option>
                            </select>
                            {/* <label className={style.errorMessage}>Không được để trống</label> */}
                        </div>
                    </div>


                </div>

                <div className={style.title}>
                  <br/>
                </div>

                <div className={style.form3}>
                    <div className={style.row2SB}>
                        <input type="file" id="fileInput" multiple onChange={handleFileInputChange} />
                        <br />
                        <ul>
                            {fileList.map((file, index) => (
                                <li key={index}>
                                    {file.name}
                                    <button onClick={() => handleRemoveFile(file)}>x</button>
                                </li>
                            ))}
                        </ul>
                        <br />
                    </div>

                    <div className={style.formAction}>
                        <button onClick={submit}>Lưu lại</button>
                        {/* <button>Cancel</button>
                        <button>Back</button> */}
                    </div>
                </div>


            </div>
        </div >
    )
}

export default Details