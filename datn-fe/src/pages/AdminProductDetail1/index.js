import clsx from "clsx";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Pagination,
  Divider,
  Popconfirm,
  Upload,
  Spin,
} from "antd";
import { EditOutlined, RedoOutlined, InboxOutlined } from "@ant-design/icons";
import style from "./AdminPD.module.scss";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { CgImport, CgExport, CgAdd } from "react-icons/cg";

const { Dragger } = Upload;

// size, amount , product name , price , color , status , img
function AdminProductDetail1() {
  const token = JSON.parse(localStorage.getItem("token"));
  const role = JSON.parse(localStorage.getItem("role"));

  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();
  //chuyển trang
  const navigate = useNavigate();
  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElement, setTotalElements] = useState(0);
  //tìm kiếm
  const [searchText, setSearchText] = useState("");
  //import excel
  const [importVisible, setImportVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("products", products);
  useEffect(() => {
    getProductList(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const columns = [
    {
      title: "STT",
      align: "center",
      render: (_, __, index) =>
        currentPage - 1 === 0
          ? index + 1
          : pageSize * (currentPage - 1) + (index + 1),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Màu",
      dataIndex: "colorDTO",
      align: "center",
      render: (colorDTO) => colorDTO?.name,
    },
    {
      title: "Size hiện có",
      dataIndex: "sizeProductDetailDTOS",
      align: "center",
      render: (sizeProductDetailDTOS) => {
        if (!sizeProductDetailDTOS || sizeProductDetailDTOS.length === 0) {
          return "Chưa có size";
        }

        const sizes = sizeProductDetailDTOS.map((size) => size.name);
        return sizes.reduce((acc, size, index) => {
          if (index === sizes.length - 1) {
            return acc + size;
          } else {
            return acc + size + ", ";
          }
        }, "");
      },
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      align: "center",
      render: (text) => {
        const formattedPrice = Number(text).toLocaleString();
        return <span>{formattedPrice}</span>;
      },
    },
    {
      title: "Tổng số lượng",
      dataIndex: "sizeProductDetailDTOS",
      align: "center",
      render: (sizeProductDetailDTOS) => {
        if (!sizeProductDetailDTOS || sizeProductDetailDTOS.length === 0) {
          return "Chưa có size";
        }

        const totalQuantity = sizeProductDetailDTOS.reduce(
          (total, size) => total + size.amount,
          0
        );

        return totalQuantity.toString();
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      render: (status) => (
        <>
          {capital(status) === "Active" ? (
            <span>
              <GoDotFill style={{ color: "green" }} /> {capital(status)}
            </span>
          ) : (
            <span>
              <GoDotFill style={{ color: "red" }} /> {capital(status)}
            </span>
          )}
        </>
      ),
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <div className={style.action}>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined title="Chỉnh sửa" />}
            onClick={() => handleEdit(record.idPcs)}
          />
          <Popconfirm
            title="Bạn có muốn thay đổi trạng thái sản phẩm?"
            onConfirm={() => handleDelete(record.idPcs)}
            okText={<span className={style.deleteText}>Thay đổi</span>}
            cancelText="Hủy"
          >
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<RedoOutlined title="Thay đổi trạng thái" />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const getProductList = async (pageNumber, pageSize) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/staff/product-details",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page_number: pageNumber - 1, // Cần trừ 1
          page_size: pageSize,
          tu_khoa: searchText,
        },
      });
      setProducts(response.data.data);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getProductList(currentPage, pageSize);
  }, [currentPage, pageSize, searchText]);

  function capital(str) {
    if (typeof str !== "string") {
      return "";
    }
    // Tách chuỗi thành các từ riêng lẻ
    const words = str.split(" ");
    // Chuyển đổi chữ hoa chữ cái đầu tiên của mỗi từ
    const capitalizedWords = words.map((word) => {
      const firstChar = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();
      return `${firstChar}${restOfWord}`;
    });
    // Kết hợp các từ đã được chuyển đổi thành một chuỗi mới
    const capitalizedString = capitalizedWords.join(" ");

    return capitalizedString;
  }

  const handleEdit = (idPcs) => {
    navigate(`/adminProductDetail1/detail/${idPcs}`);
  };

  const handleAdd = (idPcs) => {
    navigate("/adminProductDetail/create");
  };

  const handleDelete = async (idPcs) => {
    try {
      const response = await axios({
        method: "delete",
        url: `http://localhost:8080/api/v1/staff/product-details/${idPcs}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      getProductList(currentPage, pageSize);
      message.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Cập nhật trạng thái thất bại!");
    }
  };

  const handleSearch = (value) => {
    if (value === searchText) return;
    setSearchText(value);
    setCurrentPage(1);
    setProducts([]);
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/staff/product-detail/download-template",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "template-product.xlsx");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };

  const handleImportExcel = async () => {
    if (!file) {
      message.error("Bạn chưa chọn file Excel.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/staff/product-detail/import-excel-pd",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      console.log("response", response);
      if (response.data === "Import success") {
        message.success("Nhập file Excel thành công.");
        setImportVisible(false);
        setFile(null);
        setProducts([]);
        getProductList(currentPage, pageSize);
      } else {
        message.error(response.data);
      }
    } catch (error) {
      console.error("Error importing Excel:", error);
      message.error("Đã xảy ra lỗi khi import file Excel.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelImport = () => {
    setImportVisible(false);
    setFile(null);
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <div className={style.search}>
          {/* <label> Tìm kiếm: </label> */}
          <Input.Search
            placeholder="Tìm kiếm theo tên sản phảm, màu"
            onSearch={handleSearch}
          />
        </div>
        <div className={style.buttonTop}>
          {/* <div className={style.addButton}>
            <Button
              type="primary"
              style={{
                textAlign: "center",
                color: "white",
                backgroundColor: "#17ae42",
              }}
              onClick={handleAdd}
            >
              <CgAdd style={{ width: "20px" }} />
              Thêm sản phẩm
            </Button>
          </div> */}
          <div className={style.importButton}>
            <Button type="primary" onClick={() => setImportVisible(true)}>
              <CgExport style={{ width: "20px" }} />
              Nhập file excel
            </Button>
          </div>
          <Modal
            title="Nhập file excel"
            visible={importVisible}
            okText="Nhập file"
            cancelText={<span className={style.deleteText}>Hủy</span>}
            onOk={handleImportExcel}
            onCancel={handleCancelImport}
          >
            <Dragger
              fileList={file ? [file] : []}
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}
              multiple={false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Kéo thả hoặc nhấn chọn file excel
              </p>
            </Dragger>
            {loading && (
              <div className="loading-overlay">
                <Spin size="large" />
              </div>
            )}
          </Modal>

          <div className={style.templateButton}>
            <Button type="default" onClick={handleDownloadTemplate}>
              <CgImport style={{ width: "20px" }} />
              Tải mẫu excel
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <div className={style.danhSach}>
        <div className={style.table}>
          <Table
            dataSource={products}
            columns={columns}
            pagination={false}
            rowKey="id"
          />
        </div>
        <div className={style.pagination}>
          <Pagination
            total={totalElement === 0 ? 0 : totalElement - 1}
            pageSize={pageSize}
            current={currentPage}
            showSizeChanger // thay đổi page size
            // showQuickJumper
            onChange={(page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
              setProducts([]);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminProductDetail1;
