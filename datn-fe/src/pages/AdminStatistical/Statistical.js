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
} from "react-icons/ri";
import axios from "axios";
import style from "./AdminStatistical.module.scss";
import moment from "moment";
import { addDays, format } from "date-fns";

const { Option } = Select;
const { RangePicker } = DatePicker;

const AdminStatistical = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const role = JSON.parse(localStorage.getItem("role"));
  const dateFormat = "DD-MM-YYYY";

  const [toDate, setToDate] = useState(moment().format(dateFormat));
  const [fromDate, setFromDate] = useState(
    moment().subtract(7, "days").format(dateFormat)
  );
  const [doanhThuTuan, setDoanhThuTuan] = useState(0);
  const [donDaBan, setDonDaBan] = useState(0);
  const [dataDoanhThuChart, setDataDoanhThuChart] = useState([]);

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
          // from_date: fromDate,
          // to_date: toDate,
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

  console.log("fromDate", fromDate);
  console.log("toDate", toDate);

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

  const LoiNhuan = () => {
    const loiNhuan = 2000000;
    const formattedLoiNhuan = loiNhuan.toLocaleString();

    return <h3 className={style.cardData}>{formattedLoiNhuan} VND</h3>;
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
        width={850}
        height={500}
        data={dataDoanhThuChart}
        // style={{ with: "!00%", height: "600px" }}
      >
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={formatYAxisTick}
          //  dataKey="doanhThu"
        />
        <CartesianGrid strokeDasharray="1 1" />
        <Tooltip formatter={formatTooltip} />

        <Line type="monotone" dataKey="doanhThu" stroke="#8884d8" />
      </LineChart>
    );
  };
  //Biểu đồ thống kê hóa đơn
  const HoaDonChar = () => {
    const pieChartData = [
      { name: "Loại 1", value: 5000000 },
      { name: "Loại 2", value: 3000000 },
      { name: "Loại 3", value: 2000000 },
    ];
    const pieChartColors = ["#FF8042", "#FFBB28", "#0088FE"];
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
        <PieChart width={450} height={450}>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={200}
            fill="#8884d8"
            labelLine={false} // Ẩn đường gạch
            label={null} // Ẩn giá trị
          >
            {pieChartData.map((entry, index) => (
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
              <RiWallet3Line />
            </div>
            <h3 className={style.cardTitle}>LỢI NHUẬN</h3>
            {/* <h3 className={style.cardData}>200000000 VND</h3> */}
            <LoiNhuan />
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
              // defaultValue={[fromDate, toDate]}
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

export default AdminStatistical;
