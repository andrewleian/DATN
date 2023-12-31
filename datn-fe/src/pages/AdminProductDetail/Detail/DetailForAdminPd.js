import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Tabs,
  Image,
  Input,
  Divider,
  Select,
  Form,
  Col,
  Row,
  Empty,
  Button,
  Modal,
  InputNumber,
  Popconfirm,
  Upload,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InboxOutlined,
  FileImageOutlined,
  ArrowRightOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import style from "./detail.module.scss";
import imageLink from "../../../image-product/Pro_AV00182_1.jpeg";
import { set } from "date-fns";

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const DetailAdminProductDetail = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const role = JSON.parse(localStorage.getItem("role"));

  const { idPcs } = useParams();
  const [form] = Form.useForm();
  const [product, setProduct] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const [isModalSizeVisible, setIsModalSizeVisible] = useState(false);
  const [isModalImgVisible, setIsModalImgVisible] = useState(false);
  const [imageList, setImageList] = useState([]);

  const navigate = useNavigate();
  const [sizePdDTOS, setSizePdDTOS] = useState([]);
  const [selectedSizeName, setSelectedSizeName] = useState(null);
  const [quantityNewSize, setQuantityNewSize] = useState(1);
  const [colorNameSelected, setColorNameSelected] = useState(null);
  const [priceChange, setPriceChange] = useState(0);
  const [statusSelected, setStatusSelected] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [secondaryImage, setSecondaryImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const getProductCsById = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:8080/api/v1/staff/product-details/${idPcs}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page_number: 1,
          page_size: 1,
          idPcs: idPcs,
        },
      });

      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProductCsById();
  }, [idPcs]);

  useEffect(() => {
    setPriceChange(product?.price);
  }, [product?.price]);

  useEffect(() => {
    setColorNameSelected(product?.colorDTO?.name);
  }, [product?.colorDTO]);

  useEffect(() => {
    setStatusSelected(product?.status);
  }, [product?.status]);

  useEffect(() => {
    setSizePdDTOS(product?.sizeProductDetailDTOS);
    console.log("sizePdDTOS", sizePdDTOS);
  }, [product?.sizeProductDetailDTOS]);

  const getColorsActive = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/staff/colors/active",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setColors(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getColorsActive();
  }, []);

  const getSizeActive = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/staff/size/active",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSizes(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getSizeActive();
  }, []);

  useEffect(() => {
    if (product) {
      const {
        name,
        productCode,
        colorDTO,
        manufacturer,
        document_type,
        sizeProductDetailDTOS,
        status,
      } = product;

      const sizes = sizeProductDetailDTOS
        ? sizeProductDetailDTOS.map((sizeProduct) => sizeProduct.name)
        : null;

      const totalQuantity = sizeProductDetailDTOS
        ? sizeProductDetailDTOS.reduce((total, size) => total + size.amount, 0)
        : 0;

      const colorName = colorDTO ? colorDTO?.name : "";
      const statusPd =
        product?.status === "active" ? "Hoạt động" : "Không hoạt động";

      setInitialValues({
        name,
        productCode,
        color: colorName,
        manufacturer,
        document_type,
        size: sizes,
        totalAmount: totalQuantity,
        price: priceChange,
        statusPd: statusPd,
      });
    }
  }, [product, priceChange]);

  useEffect(() => {
    form.setFieldsValue({
      name: initialValues?.name || "Không có dữ liệu",
      productCode: initialValues?.productCode,
      price: Number(initialValues?.price).toLocaleString(),
      sizes: initialValues?.size,
      manufacturer: initialValues?.manufacturer,
      color: initialValues?.color,
      totalAmount: initialValues?.totalAmount,
      statusPd: initialValues?.statusPd,
    });
  }, [initialValues]);

  const handleOpenModalSize = () => {
    setIsModalSizeVisible(true);
  };

  const handleExitModelSize = () => {
    setIsModalSizeVisible(false);
  };

  const handleOpenModalImg = () => {
    setIsModalImgVisible(true);
  };

  const handleExitModelImg = () => {
    setIsModalImgVisible(false);
  };

  const handleReturn = () => {
    navigate("/adminProductDetail"); // Thay đổi đường dẫn tới trang cần chuyển hướng
  };

  const handleDeleteSize = async (idProductDetail) => {
    try {
      const response = await axios({
        method: "delete",
        url: `http://localhost:8080/api/v1/staff/product-detail/delete-size/${idProductDetail}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      getProductCsById();
      setSizePdDTOS(product?.sizeProductDetailDTOS);
      setIsModalSizeVisible(false);
      message.success("Xóa size thành công!");
    } catch (error) {
      console.error("Error delete size:", error);
      message.error("Xóa size thất bại, đã xảy ra lỗi!");
    }
  };

  const handleAddNewSize = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/staff/product-detail/add-size",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          id_pcs: idPcs,
          amount: quantityNewSize,
          size_name: selectedSizeName,
        },
      });
      if (response.data === "Create success") {
        getProductCsById();
        message.success("Thêm size thành công!");
      } else {
        message.error("Size đã tồn tại");
      }

      // setSizePdDTOS(product?.sizeProductDetailDTOS);
      // setIsModalSizeVisible(false);
      // isModalSizeVisible
    } catch (error) {
      console.error("Error delete size:", error);
      message.error("Thêm size thất bại, đã xảy ra lỗi!");
    }
  };
  const handleChangePrice = (value) => {
    setPriceChange(value);
  };
  const handleSelectColor = (value) => {
    setColorNameSelected(value);
  };
  const handleSelectStatus = (value) => {
    setStatusSelected(value);
  };
  const handleUpdateProductDetail = async (value) => {
    try {
      const response = await axios({
        method: "put",
        url: "http://localhost:8080/api/v1/staff/product-detail/update",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          id_pd: product?.id,
          id_pcs: idPcs,
          color_name: colorNameSelected,
          price: priceChange,
          status: statusSelected,
        },
      });
      getProductCsById();
      console.log("responseUp", response);
      if (response.data === "Cập nhật thành công") {
        getProductCsById();
        message.success(response.data);
      } else {
        message.error(response.data);
      }
    } catch (error) {
      console.error("Error delete size:", error);
      message.error("Đã xảy ra lỗi!");
    }
  };

  //Xử lý ảnh

  const handleMainImageChange = (infoMain) => {
    const imageFile = infoMain.file.originFileObj;
    setMainImage(imageFile);
  };

  const handleSecondaryImageChange = (info2) => {
    const imageFile = info2.file.originFileObj;
    setSecondaryImage(imageFile);
  };
  const handleSaveImages = async () => {
    // Tạo payload dữ liệu để gửi đến API
    const formData = new FormData();
    formData.append("main_image", mainImage);
    formData.append("secondary_image", secondaryImage);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/staff/product-detail/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          params: {
            id_pcs: idPcs,
          },
        }
      );

      if (response.data === "Lưu ảnh thành công!") {
        getProductCsById();
        message.success(response.data);
      } else {
        message.err(response.data);
      }
    } catch (error) {
      console.error("Error add image:", error);
      message.error("Đã xảy ra lỗi!");
    }
  };
  useEffect(() => {
    const imageLink =
      product?.images === null
        ? window.location.origin + "/image/Image_not_available.png"
        : window.location.origin + "/image/" + product?.images[0]?.name;
    console.log("imageLink", imageLink);
    setImageUrl(imageLink);
  }, [product?.images]);
  console.log("product", product);
  return (
    <div>
      <Divider />
      <div className={style.container} style={{ display: "flex" }}>
        <div className={style.image} style={{ marginRight: 16, width: "40%" }}>
          <Image src={imageUrl} alt="Product Image" style={{ width: "100%" }} />

          {/* <div>
            {imageList.map((image, index) => {
              if (image.url.includes("main")) {
                return <Image key={index} src={image.url} />;
              }
              return null;
            })}
          </div> */}
          {/* <div>
            <Image
              src={imageUrl}
              alt="Product Image"
              style={{ width: "40%" }}
            />
          </div> */}
        </div>
        <div className={style.info}>
          <Form
            form={form}
            scrollToFirstError={true}
            name={"detail_product"}
            layout={"vertical"}
            style={{ paddingTop: "2rem", fontSize: "16px" }}
            // initialValues={{ name: product?.name, productCode: "aaaaa" }}
          >
            <Row type={"flex"} gutter={40}>
              <Col xs={24} md={12}>
                <Form.Item label={"Tên sản phẩm:"} name={"name"}>
                  <Input
                    maxLength={255}
                    placeholder={"Nhập tên sản phẩm"}
                    disabled={true}
                    style={{
                      backgroundColor: "White",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label={"Mã sản phẩm:"} name={"productCode"}>
                  <Input
                    maxLength={255}
                    placeholder={"Nhập mã sản phẩm"}
                    disabled={true}
                    style={{
                      backgroundColor: "White",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row type={"flex"} gutter={30}>
              <Col xs={24} md={12}>
                <Form.Item label={"Giá sản phẩm (VND):"} name={"price"}>
                  <InputNumber
                    min={0}
                    //max={999999999} // Giới hạn giá trị tối đa
                    placeholder={"Chưa có thông tin"}
                    onChange={(value) => handleChangePrice(value)}
                    style={{
                      backgroundColor: "White",
                      color: "black",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label={"Nhà sản xuất:"} name={"manufacturer"}>
                  <Input
                    maxLength={255}
                    placeholder={"Chưa có thông tin"}
                    disabled={true}
                    style={{
                      backgroundColor: "White",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row type={"flex"} gutter={30}>
              <Col xs={24} md={12}>
                <Form.Item label={"Màu sắc:"} name={"color"}>
                  <Select
                    placeholder={"-- Chọn màu sắc --"}
                    onSelect={(value) => handleSelectColor(value)}
                    style={{
                      backgroundColor: "White",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {colors ? (
                      colors.map((item) => (
                        <Option
                          key={item}
                          value={item?.name}
                          name={item?.name}
                          defaultValue={product?.colorDTO?.name}
                        >
                          {item.name}
                        </Option>
                      ))
                    ) : (
                      <Empty />
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label={"Trạng thái:"} name={"statusPd"}>
                  <Select
                    placeholder={"-- Chọn trạng thái --"}
                    onSelect={(value) => handleSelectStatus(value)}
                    style={{
                      backgroundColor: "White",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {["active", "inactive"].map((item) => (
                      <Option value={item} key={item}>
                        {item === "active" ? "Hoạt động" : "Không hoạt động"}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row type={"flex"} gutter={30}>
              <Col xs={24} md={12}>
                <Form.Item label={"Size hiện có:"} name={"sizes"}>
                  <Input
                    maxLength={50}
                    placeholder={"Chưa có thông tin"}
                    disabled={true}
                    style={{
                      backgroundColor: "White",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label={"Tổng số lượng:"} name={"totalAmount"}>
                  <Input
                    maxLength={50}
                    placeholder={"Chưa có thông tin"}
                    disabled={true}
                    style={{
                      backgroundColor: "White",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className={style.bottomButton}>
              <Button type="default" onClick={handleOpenModalImg}>
                <FileImageOutlined />
                Sửa ảnh
              </Button>
              <Button type="default" onClick={handleOpenModalSize}>
                <EditOutlined />
                Sửa size
              </Button>
              <Button type="primary" onClick={handleUpdateProductDetail}>
                <PlusOutlined />
                Lưu
              </Button>

              <Button
                danger
                ghost
                type="default"
                onClick={handleReturn}
                style={{ backgroundColor: "white" }}
              >
                <ArrowRightOutlined />
                Quay lại
              </Button>
            </Row>
          </Form>

          {isModalSizeVisible && (
            <Modal
              title="Size chi tiết"
              open={isModalSizeVisible}
              okText="Thêm size"
              cancelText="Thoát"
              onCancel={handleExitModelSize}
              // onOk={handleExit}
              footer={[
                <Button danger key="cancel" onClick={handleExitModelSize}>
                  <ArrowRightOutlined />
                  Hủy
                </Button>,
              ]}
            >
              {sizePdDTOS ? (
                sizePdDTOS.map((pDSize) => (
                  <div
                  // style={{
                  //   maxHeight: "20px",
                  //   overflowY: "auto",
                  // }}
                  >
                    <Row
                      key={pDSize?.id}
                      style={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Col span={12} style={{ width: "100%" }}>
                        <Select
                          placeholder="-- Chọn size --"
                          value={pDSize?.name}
                          // defaultValue={pDSize?.name}
                          // onChange={(value) =>
                          //   handleSizeChange(pDSize?.id, value)
                          // }
                          style={{
                            width: "60%",
                          }}
                        >
                          {sizes ? (
                            sizes.map((sizeItem) => (
                              <Option
                                key={sizeItem?.name}
                                value={sizeItem?.name}
                                // defaultValue={sizeItem?.name}
                              >
                                {sizeItem.name}
                              </Option>
                            ))
                          ) : (
                            <Empty />
                          )}
                        </Select>
                      </Col>
                      <Col span={7}>
                        <Input
                          defaultValue={pDSize?.amount}
                          disabled={true}
                          // onChange={(value) =>
                          //   handleAmountChange(pDSize?.id, value)
                          // }
                          style={{ fontWeight: "bold", width: "80%" }}
                        />
                      </Col>
                      <Col
                        span={5}
                        style={{ display: "flex", alignItems: "flex-end" }}
                      >
                        <Popconfirm
                          title="Bạn có muốn xóa ?"
                          onConfirm={() =>
                            handleDeleteSize(pDSize?.idProductDetail)
                          }
                          okText={<span className={style.deleteText}>Xóa</span>}
                          cancelText="Hủy"
                        >
                          <Button danger key="deleteSize" type="primary">
                            <DeleteOutlined />
                            Xóa
                          </Button>
                        </Popconfirm>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <Empty description="Không có dữ liệu" />
              )}

              <Divider />
              <h3 style={{ fontWeight: "bold" }}>Thêm size</h3>
              <Row style={{ padding: "10px" }}>
                <Col span={12}>
                  <p>Chọn size:</p>
                  <Select
                    placeholder="-- Chọn size --"
                    style={{ width: "60%" }}
                    onSelect={(value) => setSelectedSizeName(value)}
                  >
                    {sizes ? (
                      sizes.map((sizeItem) => (
                        <Option
                          key={sizeItem?.name}
                          value={sizeItem?.name}
                          name={sizeItem?.name}
                        >
                          {sizeItem.name}
                        </Option>
                      ))
                    ) : (
                      <Empty />
                    )}
                  </Select>
                </Col>
                <Col span={7}>
                  <p>Nhập số lượng:</p>
                  <InputNumber
                    min={1}
                    value={quantityNewSize}
                    onChange={(value) => setQuantityNewSize(value)}
                  />
                </Col>
                <Col
                  span={5}
                  style={{ display: "flex", alignItems: "flex-end" }}
                >
                  {/* <p>Nhập số lượng:</p> */}
                  <Button
                    ghost
                    key="addNewSize"
                    type="primary"
                    onClick={handleAddNewSize}
                  >
                    <PlusOutlined />
                    Thêm size
                  </Button>
                </Col>
              </Row>
            </Modal>
          )}
          {isModalImgVisible && (
            <Modal
              title="Chỉnh sửa ảnh"
              open={isModalImgVisible}
              onCancel={handleExitModelImg}
              // onOk={handleExit}
              width={"50%"}
              footer={[
                <Button key="add" type="primary" onClick={handleSaveImages}>
                  <PlusOutlined />
                  Lưu ảnh
                </Button>,
                <Button danger key="cancel" onClick={handleExitModelImg}>
                  <ArrowRightOutlined />
                  Hủy
                </Button>,
              ]}
            >
              <Row style={{ padding: "10px" }}>
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ fontWeight: "bold" }}>Ảnh chính</h3>
                </Col>
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ fontWeight: "bold" }}>Ảnh phụ</h3>
                </Col>
              </Row>
              <Row style={{ padding: "10px" }}>
                <Col span={12} style={{ padding: "10px" }}>
                  <Upload
                    maxCount={1}
                    name="main_image"
                    onChange={(infoMain) => handleMainImageChange(infoMain)}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Col>
                <Col span={12} style={{ padding: "10px" }}>
                  <Upload
                    maxCount={1}
                    name="secondary_image"
                    onChange={(info2) => handleSecondaryImageChange(info2)}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Col>
              </Row>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailAdminProductDetail;
