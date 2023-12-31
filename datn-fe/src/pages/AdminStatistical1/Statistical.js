import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Tabs,
  Image,
  Input,
  Divider,
  Select,
  Col,
  Row,
  Empty,
  Button,
  Modal,
  InputNumber,
  Popconfirm,
  message,
  DatePicker,
  Space,
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
import {
  RiBillLine,
  RiMoneyDollarCircleLine,
  RiWallet3Line,
  RiPriceTag3Line,
} from "react-icons/ri";
import axios from "axios";
import style from "./AdminStatistical.module.scss";
import moment from "moment";
import { addDays, format } from "date-fns";

const { Option } = Select;
const { RangePicker } = DatePicker;

const AdminStatistical1 = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const role = JSON.parse(localStorage.getItem("role"));
  const dateFormat = "DD-MM-YYYY";

  const [toDate, setToDate] = useState(moment().format(dateFormat));
  const [fromDate, setFromDate] = useState(
    moment().subtract(7, "days").format(dateFormat)
  );
  const [doanhThuTuan, setDoanhThuTuan] = useState(0);
  const [donDaBan, setDonDaBan] = useState(0);
  const [sanPhamDaBan, setSanPhamDaBan] = useState(0);
  const [dataDoanhThuChart, setDataDoanhThuChart] = useState([]);
  const [dataHoaDonChart, setDataHoaDonChart] = useState([]);

  const getDoanhThuTuan = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/admin/thong-ke/doanh-thu-tuan",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setDoanhThuTuan(response.data);
    } catch (error) {
      console.error("Error delete size:", error);
      message.error("Đã xảy ra lỗi!");
    }
  };
  useEffect(() => {
    getDoanhThuTuan();
  }, []);

  const getSanPhamDaBan = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/admin/thong-ke/san-pham-tuan",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setSanPhamDaBan(response.data);
    } catch (error) {
      console.error("Error delete size:", error);
      message.error("Đã xảy ra lỗi!");
    }
  };
  useEffect(() => {
    getSanPhamDaBan();
  }, []);

  const getDonDaBan = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/admin/thong-ke/don-da-ban",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setDonDaBan(response.data);
    } catch (error) {
      console.error("Error delete size:", error);
      message.error("Đã xảy ra lỗi!");
    }
  };
  useEffect(() => {
    getDonDaBan();
  }, []);

  const getDoanhThuTheoKhoang = async (fromDate, toDate) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/admin/thong-ke/doanh-thu-theo-khoang",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          from_date: fromDate,
          to_date: toDate,
        },
      });
      console.log("doanhThu", response.data);
      setDataDoanhThuChart(response.data);
    } catch (error) {
      console.error("Error delete size:", error);
      message.error("Đã xảy ra lỗi!");
    }
  };
  useEffect(() => {
    getDoanhThuTheoKhoang(fromDate, toDate);
  }, [fromDate, toDate]);

  const getHoaDonTheoKhoang = async (fromDate, toDate) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/admin/thong-ke/hoa-don-theo-khoang",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          from_date: fromDate,
          to_date: toDate,
        },
      });
      console.log("hoaDon", response.data);
      setDataHoaDonChart(response.data);
    } catch (error) {
      console.error("Error delete size:", error);
      message.error("Đã xảy ra lỗi!");
    }
  };
  useEffect(() => {
    getHoaDonTheoKhoang(fromDate, toDate);
  }, [fromDate, toDate]);

  const handleDateChange = (dates, dateStrings) => {
    let fromDateFormatted = null;
    let toDateFormatted = null;
    console.log("dates", dates);
    if (dates && dates.length === 2) {
      fromDateFormatted = dates[0].format(dateFormat);
      toDateFormatted = dates[1].format(dateFormat);
      setFromDate(fromDateFormatted);
      setToDate(toDateFormatted);
    } else {
      const currentDate = moment(); // Lấy ngày hiện tại
      const pastDate = moment().subtract(7, "days"); // Lấy 7 ngày trước
      setToDate(currentDate.format(dateFormat));
      setFromDate(pastDate.format(dateFormat));
    }
  };

  const DoanhThuTuan = () => {
    const formattedDoanhThu = doanhThuTuan.toLocaleString();

    return <h3 className={style.cardData}>{formattedDoanhThu} VND</h3>;
  };

  const DonDaBan = () => {
    // const formattedBillSold = donDaBan.toLocaleString();

    return <h3 className={style.cardData}>{donDaBan} ĐƠN</h3>;
  };

  const SanPhamDaBan = () => {
    return <h3 className={style.cardData}>{sanPhamDaBan} sản phẩm</h3>;
  };
  //Biểu đồ thống kê doanh thu
  const ChartDoanhThu = () => {
    const legendPayload = [
      { value: "Doanh thu theo ngày", type: "bar", id: "ID01" },
    ];
    const formatLegend = (value, entry, index) => {
      return "Doanh thu trong ngày";
    };
    const formatTooltip = (value, name, props) => {
      return [`Doanh thu trong ngày: ${value.toLocaleString()}`];
    };

    const formatYAxisTick = (value) => {
      if (value >= 1000000) {
        return `${value / 1000000} triệu`;
      }
      if (value >= 1000) {
        return `${value / 1000} nghìn`;
      } else {
        return value;
      }
    };
    const chartTitle = "Biểu đồ doanh thu";
    return (
      <LineChart
        width={700}
        height={420}
        data={dataDoanhThuChart ? dataDoanhThuChart : noData}
      >
        <XAxis dataKey="name" />
        <YAxis
          tickFormatter={formatYAxisTick}
          //  dataKey="doanhThu"
        />
        <CartesianGrid strokeDasharray="1 1" />
        <Tooltip formatter={formatTooltip} />

        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    );
  };
  function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const generateRandomColorList = () => {
    const colorList = [];

    dataHoaDonChart.forEach((product) => {
      let color = generateRandomColor();
      while (colorList.includes(color)) {
        color = generateRandomColor();
      }
      colorList.push(color);
    });

    return colorList;
  };
  const randomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  //Biểu đồ thống kê hóa đơn
  const HoaDonChar = () => {
    const pieChartColors = generateRandomColorList();

    const formatTooltip = (value, name, props) => {
      return [`${name}: ${value.toLocaleString()}`];
    };
    const renderLegend = (props) => {
      const { payload } = props;
      return (
        <ul>
          {payload.map((entry, index) => (
            <li key={`item-${index}`}>
              <span style={{ backgroundColor: entry.color }}></span>
              {entry.value}
            </li>
          ))}
        </ul>
      );
    };

    const formatValue = (value) => {
      return value;
    };
    return (
      <div>
        <PieChart width={400} height={400}>
          <Pie
            data={dataHoaDonChart ? dataHoaDonChart : noData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            labelLine={false} // Ẩn đường gạch
            label={null} // Ẩn giá trị
          >
            {dataHoaDonChart.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={pieChartColors[index % pieChartColors.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={formatTooltip} />
          <Legend
            // content={renderLegend}
            style={{ marginTop: "50px" }}
          />
        </PieChart>
      </div>
    );
  };
  function disabledDate(current) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current && current.valueOf() > today.valueOf();
  }

  const noData = [{ name: "No Data", value: 1 }];

  return (
    <div className={style.container}>
      <h2 className={style.titleReport}>BÁO CÁO NHANH TRONG TUẦN</h2>
      <Row>
        <Col xs={4} md={8} style={{ padding: "10px" }}>
          <div className={style.card}>
            <div className={style.cardIcon}>
              <RiMoneyDollarCircleLine />
            </div>
            <h3 className={style.cardTitle}>DOANH THU</h3>
            {/* <h3 className={style.cardData}>6000000000 VND</h3> */}
            <DoanhThuTuan />
          </div>
        </Col>
        <Col xs={4} md={8} style={{ padding: "10px" }}>
          <div className={style.card}>
            <div className={style.cardIcon}>
              <RiBillLine />
            </div>
            <h3 className={style.cardTitle}>ĐƠN ĐÃ BÁN</h3>
            <DonDaBan />
          </div>
        </Col>
        <Col xs={4} md={8} style={{ padding: "10px" }}>
          <div className={style.card}>
            <div className={style.cardIcon}>
              <RiPriceTag3Line />
            </div>
            <h3 className={style.cardTitle}>Sản phẩm đã bán</h3>
            {/* <h3 className={style.cardData}>200000000 VND</h3> */}
            <SanPhamDaBan />
          </div>
        </Col>
      </Row>
      {/* <Divider /> */}
      <h1 className={style.titleReport}>BÁO CÁO CHI TIẾT</h1>
      <Row style={{ padding: "10px" }}>
        <Col xs={4} md={24} className={style.datePicker}>
          <div>
            <RangePicker
              format={"DD/MM/YYYY"}
              placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
              style={{ width: "30%", height: "35px" }}
              onChange={handleDateChange}
              disabledDate={disabledDate}
              // defaultPickerValue={[moment().subtract(7, "days"), moment()]}
            />
          </div>
        </Col>
      </Row>
      <div className={style.body}>
        <Row className={style.titleChart}>
          <Col xs={1} md={16}>
            <h2>Biểu đồ thống kê doanh thu</h2>
          </Col>
          <Col xs={1} md={8}>
            <h2>Biểu đồ thống kê hóa đơn</h2>
          </Col>
        </Row>
        <Row className={style.doanhThuChart}>
          <Col xs={4} md={16}>
            {/* <h3 className={style.titlelineChart}>
              Biểu đồ doanh thu theo ngày
            </h3> */}
            <div className={style.lineChart} style={{ width: "100%" }}>
              <ChartDoanhThu />
            </div>
          </Col>
          <Col xs={4} md={8}>
            <div className={style.pieChart} style={{ width: "100%" }}>
              <HoaDonChar />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Divider />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminStatistical1;
