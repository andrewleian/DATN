import clsx from "clsx";
import style from "./OfflineSales.module.scss";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Row,
  Col,
  Input,
  Table,
  InputNumber,
  Button,
  Empty,
  DatePicker,
  Select,
  message,
  Spin,
} from "antd";
import {
  SearchOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { FcDown } from "react-icons/fc";
import {
  BsPerson,
  BsGenderAmbiguous,
  BsPhone,
  BsPlusCircle,
} from "react-icons/bs";
import { MdOutlineEmail, MdOutlinePayments, MdDelete } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import axios from "axios";
import { ConstructionOutlined } from "@mui/icons-material";
import { set } from "date-fns";

const { TabPane } = Tabs;
const { Option } = Select;

const OfflineSales1 = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const role = JSON.parse(localStorage.getItem("role"));
  const [listTempBill, setListTempBill] = useState([]);
  const [idCurrentBill, setIdCurrentBill] = useState(null);
  const [moneyCustomer, setMoneyCustomer] = useState(0);

  const [dataMoney, setDataMoney] = useState({
    total: null,
    discount: null,
    mustPay: null,
    cash: null,
  });

  const [customerData, setCustomerData] = useState({
    id: null,
    customerName: null,
    username: null,
    phone: null,
    email: null,
    dob: null,
    gender: null,
  });
  const [keySearchCus, setKeySearchCus] = useState(null);
  const [searchCustomer, setSearchCustomer] = useState([]);

  const [productData, setProductData] = useState(null);
  const [keySearchPd, setKeySearchPd] = useState(null);
  const [searchProduct, setSearchProduct] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [dataBill, setDataBill] = useState([]);
  const [quantityPd, setQuantityPd] = useState(0);
  const [amountPd, setAmountPd] = useState(null);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      align: "center",
    },
    {
      title: "Size",
      dataIndex: "nameSize",
      align: "center",
    },
    {
      title: "Giá (VND)",
      dataIndex: "unitPrice",
      align: "center",
    },
    {
      title: "SL",
      dataIndex: "amount",
      align: "center",
      render: (text, record) => {
        const sl = record?.amount;
        return (
          <InputNumber
            min={1}
            defaultValue={sl}
            onChange={handleSetQuantity(record.idBillDetail)}
          />
        );
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      align: "center",
      render: (text, record) => {
        const totalPrice = record.unitPrice * record.amount; // Tính toán giá trị thành tiền dựa trên "unitPrice" và "amount"
        return <span>{totalPrice}</span>;
      },
    },
    {
      title: (
        <span style={{ color: "red" }}>
          <FcDown />
        </span>
      ),
      dataIndex: "discount",
      align: "center",
      render: (text, record) => {
        const discount = record.discount;
        return <span>{discount}%</span>;
      },
    },
    {
      title: "Tổng",
      dataIndex: "total",
      align: "center",
      render: (text, record) => {
        const totalPrice = record.unitPrice * record.amount; // Tính toán giá trị thành tiền dựa trên "unitPrice" và "amount"
        const discount = record.discount;
        const total = discount > 0 ? (totalPrice * discount) / 100 : totalPrice; // Tính giá trị cột "Tổng" dựa trên "totalPrice" và "discount"
        return <span>{total}</span>;
      },
    },
    {
      title: "*",
      align: "center",
      render: (text, record) => {
        return (
          <MdDelete
            title="Xóa sản phẩm"
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => handleDeleteBillDetail(record.idBillDetail)}
          />
        );
      },
    },
  ];

  const handleSetQuantity = (id) => (value) => {
    setAmountPd({
      idProductDetail: id,
      amount: value,
    });
  };
  console.log("amountpd", amountPd);
  const renderSpinner = (isLoading) => {
    if (isLoading) {
      return <Spin indicator={antIcon} />;
    } else {
      return <></>;
    }
  };

  const handleChangeQuantity = async () => {
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:8080/api/v1/staff/offline/update-quantity/${amountPd?.idProductDetail}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          amount: amountPd?.amount,
        },
      });
      getBillDetailByBillId();
    } catch (error) {
      console.error("Error deleting bill detail:", error);
    }
  };
  useEffect(() => {
    handleChangeQuantity();
  }, [amountPd]);
  const handleDeleteBillDetail = async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `http://localhost:8080/api/v1/staff/offline/deleteProduct/${id}/${idCurrentBill}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      getBillDetailByBillId();
      message.success("Đã xóa thành công!");
    } catch (error) {
      console.error("Error deleting bill detail:", error);
      message.error("Xóa thất bại!");
    }
  };
  const getAllTempBill = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/staff/offline/getAllPaysOffLine",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setListTempBill(response.data.data);
    } catch (error) {
      console.error("Error get all bill:", error);
      message.error("Đã có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    getAllTempBill();
  }, []);

  const searchCustomerByKey = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/staff/offline/search-cusomter-by-key",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          key_word: keySearchCus,
        },
      });
      setSearchCustomer(response.data.data);
    } catch (error) {
      console.error("Error get all bill:", error);
    }
  };

  useEffect(() => {
    if (keySearchCus !== null) {
      searchCustomerByKey();
    }
  }, [keySearchCus]);

  const handleCreateNewBill = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/staff/offline/create/bill",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      getAllTempBill();
      message.success("Đã tạo hóa đơn mới!");
    } catch (error) {
      console.error("Error create new bill:", error);
      message.error("Tạo hóa đơn mới thất bại!");
    }
  };

  const renderBillTabs = () => {
    return listTempBill.map((bill, index) => (
      <TabPane
        tab={
          <span>
            Hóa đơn {index + 1}
            <CloseOutlined
              className={style.closeTab}
              onClick={() => handleTabClose(bill?.id)}
              title="Đóng tab"
            />
          </span>
        }
        key={bill?.id}
      ></TabPane>
    ));
  };

  useEffect(() => {
    renderBillTabs();
  }, [listTempBill]);

  const handleTabClose = async (bill_id) => {
    try {
      const response = await axios({
        method: "delete",
        url: "http://localhost:8080/api/v1/staff/offline/cancelPayment",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          bill_id: bill_id,
        },
      });
      getAllTempBill();
      setDataBill([]);
      message.success("Đã xóa hóa đơn!");
    } catch (error) {
      console.error("Error create new bill:", error);
      message.error("Xóa hóa đơn thất bại!");
    }
  };

  const handleTabClick = (key) => {
    setIdCurrentBill(key === 0 || key === "bill" ? idCurrentBill : key);
    // setCustomerData(null);
  };
  const handleSearchCusChange = (value) => {
    setKeySearchCus(value);
  };

  const handleSelectCustomer = (value, option) => {
    const userSelected = searchCustomer.find((cus) => cus.id === value);
    if (userSelected) {
      setCustomerData({
        id: userSelected.id,
        customerName: userSelected.customerName,
        username: userSelected.username,
        phone: userSelected.phone,
        email: userSelected.email,
        dob: userSelected.dob,
        gender: userSelected.gender,
      });
    }
  };

  const renderOption = (cus) => {
    return (
      <div>
        <span style={{ marginRight: 8 }}>{cus.customerName}</span>
        <span style={{ fontSize: 12, color: "#999", marginLeft: "3px" }}>
          SDT: {cus?.phone}
        </span>
        <span style={{ fontSize: 12, color: "#999", marginLeft: "3px" }}>
          Email: {cus?.email}
        </span>
      </div>
    );
  };
  const handleInputCusChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleClearCusSearch = () => {
    setKeySearchCus(null);
    setSearchCustomer([]);
  };
  const handleCreateCustomer = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/staff/offline/create/customer",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          customerName: customerData.customerName,
          username: customerData.username,
          phone: customerData.phone,
          email: customerData.email,
          dob: customerData.dob,
          gender: customerData.gender,
        },
      });
      setCustomerData(response.data.data);
      message.success("Tạo khách hàng thành công!");
    } catch (error) {
      console.error("Error create new customer:", error);
      message.error("Tạo khách hàng thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  const renderOptionPd = (pd) => {
    return (
      <div>
        <span style={{ marginRight: 8 }}>{pd.name}</span>
        <span style={{ marginRight: 2, fontSize: 12, color: "#999" }}>
          Mã sp: {pd.productCode}
        </span>
        <span style={{ marginRight: 2, fontSize: 12, color: "#999" }}>
          Màu: {pd?.colorDTO?.name}
        </span>
        <span style={{ marginRight: 2, fontSize: 12, color: "#999" }}>
          Size: {pd?.sizeDTO?.name}
        </span>
      </div>
    );
  };

  const handleSearchPdChange = (value) => {
    setKeySearchPd(value);
  };

  const handleSelectProduct = (value, option) => {
    const productSelected = searchProduct.find(
      (pd) => pd?.sizeDTO?.idProductDetail === value
    );
    if (productSelected) {
      setProductData(productSelected);
    }
    setTimeout(() => {
      // Giả định API đã hoàn thành sau 3 giây

      addProductToBill(productSelected);
      // getBillDetailByBillId;
    }, 1000);
  };

  const handleClearPdSearch = () => {
    setKeySearchPd(null);
    setSearchProduct([]);
  };

  const searchProductByKey = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/list-products/sale-offline",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          tu_khoa: keySearchPd,
        },
      });
      setSearchProduct([]);
      setSearchProduct(response.data);
    } catch (error) {
      console.error("Error get product by key:", error);
    }
  };

  useEffect(() => {
    searchProductByKey();
  }, [keySearchPd]);

  const addProductToBill = async (productSelected) => {
    const request = {
      idBill: idCurrentBill,
      productRequest: {
        amount: quantityPd === 0 ? 1 : quantityPd,
        price: productSelected?.price,
        productDetailId: productSelected?.sizeDTO?.idProductDetail,
        promotionalPrice:
          productSelected?.promotionValue === 0
            ? productSelected?.promotionValue * productSelected?.price
            : "",
        discount: productSelected?.promotionValue,
      },
    };
    if (request.amount > productSelected?.sizeDTO?.amount) {
      message.error("Số lượng vượt quá số lượng tồn");
      return;
    }
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/staff/offline/addProduct",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: request,
      });
      setProductData(null);
      getBillDetailByBillId();
      message.success("Thêm thành công!");
    } catch (error) {
      console.error("Error get product by key:", error);
      message.error("Có lỗi xảy ra khi thêm sản phẩm");
    }
  };

  const getBillDetailByBillId = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:8080/api/v1/staff/offline/get-bill-detail/${idCurrentBill}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setDataBill(response?.data?.data?.productInfos);
    } catch (error) {
      console.error("Error get product by key:", error);
    }
  };

  useEffect(() => {
    getBillDetailByBillId();
  }, [idCurrentBill]);

  const tinhTien = () => {
    if (dataBill) {
      let total = 0;
      let discount = 0;
      dataBill.forEach((item) => {
        const { amount, unitPrice, discount: itemDiscount } = item;
        total += amount * unitPrice;
        discount += itemDiscount;
      });

      const mustPay = total - discount;

      setDataMoney({
        total: total,
        discount: discount,
        mustPay: mustPay,
        cash: null,
      });
    }
  };
  useEffect(() => {
    tinhTien();
  }, [dataBill]);
  const handleMoneyChange = (value) => {
    setMoneyCustomer(value);
  };

  const thanhToan = async () => {
    console.log("customerData", customerData);
    const request = {
      idBill: idCurrentBill,
      totalPayment: dataMoney?.mustPay,
      note: "",
      noteCancel: "",
      idCustomer: customerData?.id === null ? "0" : customerData?.id,
    };
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/staff/offline/thanh-toan",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: request,
      });
      message.success("Thanh toán thành công!");
    } catch (error) {
      console.error("Thanh toán thát bại:", error);
      message.error("Thanh toán thát bại!");
    }
  };
  return (
    <div className={style.container}>
      <Col md={18}>
        <div className={style.info}>
          <div className={style.bill}>
            <Tabs
              defaultActiveKey="0"
              tabBarStyle={{ marginBottom: "20px" }}
              onTabClick={handleTabClick}
            >
              <TabPane
                tab={
                  <div className={style.tabHeader}>
                    <span className={style.tabTitle}>GIỎ HÀNG</span>
                    <Select
                      className={style.tabSearch}
                      showSearch
                      placeholder="Tìm kiếm sản phẩm theo tên, nhà sản xuất,..."
                      optionFilterProp="children"
                      value={keySearchPd}
                      onSearch={handleSearchPdChange}
                      filterOption={false}
                      suffixIcon={<SearchOutlined />}
                      onSelect={handleSelectProduct}
                      onBlur={handleClearPdSearch}
                    >
                      {searchProduct.map((pd) => (
                        <Option
                          key={pd?.sizeDTO?.idProductDetail}
                          value={pd?.sizeDTO?.idProductDetail}
                        >
                          {renderOptionPd(pd)}
                        </Option>
                      ))}
                    </Select>
                    <Button
                      ghost
                      type="primary"
                      className={style.newBill}
                      onClick={handleCreateNewBill}
                    >
                      <BsPlusCircle />
                    </Button>
                  </div>
                }
                key="bill"
              ></TabPane>
              {renderBillTabs()}
            </Tabs>
            <Row>
              <Col md={24}>
                <Table
                  columns={columns}
                  dataSource={dataBill}
                  pagination={false}
                  scroll={{ x: 200, y: 250 }} // Thêm thuộc tính scroll với giá trị x và y
                  locale={{
                    emptyText: <Empty description="Không có dữ liệu" />,
                  }}
                />
              </Col>
            </Row>
          </div>
          <div className={style.customer}>
            <Tabs defaultActiveKey="customer">
              <TabPane
                tab={
                  <div className={style.tabHeader}>
                    <span className={style.tabTitle}>KHÁCH HÀNG</span>
                    <Select
                      className={style.tabSearch}
                      showSearch
                      placeholder="Tìm kiếm khách hàng theo số điện thoại, email, họ tên"
                      optionFilterProp="children"
                      value={keySearchCus}
                      onSearch={handleSearchCusChange}
                      filterOption={false}
                      suffixIcon={<SearchOutlined />}
                      onSelect={handleSelectCustomer}
                      onBlur={handleClearCusSearch}
                    >
                      {searchCustomer.map((cus) => (
                        <Option key={cus.customerName} value={cus.id}>
                          {renderOption(cus)}
                        </Option>
                      ))}
                    </Select>
                  </div>
                }
                key="customer"
              >
                <Row className={style.rowCus}>
                  <Col md={8} className={style.colCus}>
                    <Input
                      className={style.cusInfo}
                      addonBefore={<BsPerson />}
                      placeholder="Tên khách hàng"
                      name="customerName"
                      value={customerData.customerName}
                      onChange={handleInputCusChange}
                    />
                  </Col>
                  <Col md={8} className={style.colCus}>
                    <Input
                      className={style.cusInfo}
                      addonBefore={<BsPhone />}
                      placeholder="Số điện thoại"
                      name="phone"
                      value={customerData.phone}
                      onChange={handleInputCusChange}
                    />
                  </Col>
                  <Col md={8} className={style.colCus}>
                    <Input
                      className={style.cusInfo}
                      addonBefore={<MdOutlineEmail />}
                      placeholder="Email"
                      name="email"
                      value={customerData.email}
                      onChange={handleInputCusChange}
                    />
                  </Col>
                </Row>
                <Row className={style.rowCus}>
                  <Col md={8} className={style.colCus}>
                    <Input
                      className={style.cusInfo}
                      addonBefore={<GrUserAdmin />}
                      placeholder="Username"
                      name="username"
                      value={customerData.username}
                      onChange={handleInputCusChange}
                    />
                  </Col>
                  <Col md={8} className={style.colCus}>
                    <Select
                      className={style.cusInfo}
                      placeholder="Giới tính"
                      name="gender"
                      value={customerData.gender}
                      onChange={(value) =>
                        setCustomerData((prevData) => ({
                          ...prevData,
                          gender: value,
                        }))
                      }
                    >
                      {["Nam", "Nữ"].map((gender) => {
                        return (
                          <Option key={gender} value={gender} name={gender}>
                            {gender}
                          </Option>
                        );
                      })}
                    </Select>
                  </Col>
                  {/* <Col md={8} className={style.colCus}>
                    <DatePicker
                      className={style.cusInfo}
                      placeholder="Ngày sinh nhật"
                      format={"DD/MM/YYYY"}
                      name="dob"
                      value={customerData.dob}
                      onChange={(date, dateString) =>
                        setCustomerData((prevData) => ({
                          ...prevData,
                          dob: dateString,
                        }))
                      }
                    />
                  </Col> */}
                </Row>
                <Row className={style.rowCus}>
                  <div>
                    <Button
                      ghost
                      type="primary"
                      onClick={handleCreateCustomer}
                      style={{ marginRight: "5px" }}
                    >
                      Lưu khách hàng
                    </Button>
                    {isLoading === true
                      ? renderSpinner(true)
                      : renderSpinner(false)}
                  </div>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Col>
      <Col md={6}>
        <div className={style.detailBill} style={{ flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              marginBottom: "10px",
              marginTop: "10px",
              fontWeight: "400",
            }}
          >
            <h3 style={{ marginRight: "auto", fontWeight: "bold" }}>
              Tổng tiền hàng:
            </h3>
            <h3 style={{ fontWeight: "bold" }}>
              {dataMoney?.total ? dataMoney?.total : 0} VND
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3 style={{ marginRight: "auto" }}>Chiết khấu:</h3>
            <h3>{dataMoney?.discount ? dataMoney?.discount * 100 : 0} %</h3>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <h3 style={{ marginRight: "auto" }}>Giá trị km:</h3>
            <h3>
              {dataMoney?.discount && dataMoney?.total
                ? dataMoney?.discount * 100
                : 0}{" "}
              VND
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "15px",
            }}
          >
            <h3 style={{ marginRight: "auto", fontWeight: "bold" }}>
              Khách cần trả:
            </h3>
            <h3 style={{ fontWeight: "bold" }}>
              {dataMoney?.mustPay ? dataMoney?.mustPay : 0} VND
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "15px",
            }}
          >
            <h3 style={{ marginRight: "auto", fontWeight: "bold" }}>
              Khách đưa:
            </h3>
            <InputNumber
              onChange={handleMoneyChange}
              style={{
                height: "50%",
                width: "50%",
                textAlign: "right",
                fontWeight: "bold",
              }}
            ></InputNumber>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "10px",
            }}
          >
            <h3 style={{ marginRight: "auto", fontWeight: "bold" }}>
              Trả lại:
            </h3>
            <h3 style={{ fontWeight: "bold" }}>
              {moneyCustomer ? moneyCustomer - dataMoney?.mustPay : 0} VND
            </h3>
          </div>
          <div style={{ marginTop: "auto" }}>
            <Button
              type="primary"
              style={{ width: "100%", gap: "10px" }}
              onClick={thanhToan}
            >
              <MdOutlinePayments />
              <span style={{ marginLeft: "10px" }}>Thanh toán</span>
            </Button>
          </div>
        </div>
      </Col>
    </div>
  );
};

export default OfflineSales1;
