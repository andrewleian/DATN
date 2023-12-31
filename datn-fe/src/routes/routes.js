import routes from "../config/routes";
import SanPham from "../pages/SanPham";
import Nam from "../pages/Nam";
import Nu from "../pages/Nu";
import SaleOff from "../pages/SaleOff";
import DiscoverYou from "../pages/DiscoverYou";
import Home from "../pages/Home";
import TraCuuDonHang from "../pages/TraCuuDonHang";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login/login";
import NullLayout from "../layouts/NullLayout/NullLayout";
import Cart from "../pages/Cart";
import OfflineSales from "../pages/OfflineSales";
import ShippingInfor from "../pages/ShippingInfor";
import FranchisePolicy from "../pages/FranchisePolicy";
import Privacy from "../pages/Privacy";
import Policy from "../pages/Policy";
import Career from "../pages/Career";
import Faq from "../pages/Faqs";
import UserInfor from "../pages/UserInfor";

import AdminLayout from "../layouts/AdminLayout";
import AdminStaff from "../pages/AdminStaff";
import AdminProduct from "../pages/AdminProduct";
import AdminPromotion from "../pages/AdminPromotion";
import Size from "../pages/AdminSize";
import Color from "../pages/AdminColor/Color";
// import ProductColorSize from "../pages/AdminProductCS"
import Image from "../pages/AdminImage";
import AdminProductDetail from "../pages/AdminProductDetail/index";
import DetailAdminProductDetail from "../pages/AdminProductDetail/Detail/DetailForAdminPd";
import CreateForAdminPd from "../pages/AdminProductDetail/Create/CreateForAdminPd";
import AdminSerialCode from "../pages/AdminSerialCode";
import AdminCustomer from "../pages/AdminCustomer";
import CreatePaymentError from "../pages/PaymentError/CreatePaymentError";
import UpdatePaymentError from "../pages/PaymentError/UpdatePaymentError";
import CreatePaymentSuccess from "../pages/PaymentSuccess/CreatePaymentSuccess";
import UpdatePaymentSuccess from "../pages/PaymentSuccess/UpdatePaymentSuccess";
import Details from "../pages/AdminProductCS/Details";
import AdminBill from "../pages/AdminBill";
// import AdminCategory from "../pages/AdminCategory"
import Test from "../pages/test";

// new admin
import AdminLayout1 from "../layouts/AdminLayout1";
import AdminWelcome from "../pages/AdminWelcome";
import AdminCustomer1 from "../pages/AdminCustomer1";
import AdminStaff1 from "../pages/AdminStaff1";
import AdminBill1 from "../pages/AdminBill1";
import AdminProduct1 from "../pages/AdminProduct1";
import AdminPromotion1 from "../pages/AdminPromotion1";
import Color1 from "../pages/AdminColor1/Color";
import Size1 from "../pages/AdminSize1";
import AdminExchange1 from "../pages/Exchange1";

import AdminStatistical from "../pages/AdminStatistical/Statistical";

// minh
import AdminProductDetail1 from "../pages/AdminProductDetail1";
import AdminStatistical1 from "../pages/AdminStatistical1/Statistical";
import DetailAdminProductDetail1 from "../pages/AdminProductDetail1/Detail/DetailForAdminPd";
import OfflineSales1 from "../pages/OfflineSales1";
export const publicRoutes = [
  { path: routes.home, component: Home },
  { path: routes.traCuuDonHang, component: TraCuuDonHang },
  { path: routes.cart, component: Cart },
  { path: routes.sanPham, component: SanPham },
  { path: routes.nam, component: Nam },
  { path: routes.nu, component: Nu },
  { path: routes.productDetails, component: ProductDetails },
  { path: routes.saleOff, component: SaleOff },
  { path: routes.discoverYou, component: DiscoverYou },
  { path: routes.shippingInfor, component: ShippingInfor },
  { path: routes.offlineSales, component: OfflineSales, layout: AdminLayout },
  { path: routes.franchisePolicy, component: FranchisePolicy },
  { path: routes.privacy, component: Privacy },
  { path: routes.policy, component: Policy },
  { path: routes.career, component: Career },
  { path: routes.faqs, component: Faq },
  { path: routes.adminStaff, component: AdminStaff, layout: AdminLayout },
  { path: routes.adminProduct, component: AdminProduct, layout: AdminLayout },
  {
    path: routes.adminPromotion,
    component: AdminPromotion,
    layout: AdminLayout,
  },
  { path: routes.adminSize, component: Size, layout: AdminLayout },
  { path: routes.adminColor, component: Color, layout: AdminLayout },
  { path: routes.adminImage, component: Image, layout: AdminLayout },
  {
    path: routes.adminProductDetail,
    component: AdminProductDetail,
    layout: AdminLayout,
  },
  {
    path: routes.detailAdminProductDetail,
    component: DetailAdminProductDetail,
    layout: AdminLayout,
  },
  {
    path: routes.createProductDetail,
    component: CreateForAdminPd,
    layout: AdminLayout,
  },
  {
    path: routes.adminStatistical,
    component: AdminStatistical,
    layout: AdminLayout,
  },

  {
    path: routes.adminSerialCode,
    component: AdminSerialCode,
    layout: AdminLayout,
  },
  { path: routes.adminCustomer, component: AdminCustomer, layout: AdminLayout },
  { path: routes.userInfor, component: UserInfor },
  {
    path: routes.createPaymentSuccess,
    component: CreatePaymentSuccess,
    layout: NullLayout,
  },
  {
    path: routes.updatePaymentSuccess,
    component: UpdatePaymentSuccess,
    layout: NullLayout,
  },
  {
    path: routes.createPaymentError,
    component: CreatePaymentError,
    layout: NullLayout,
  },
  {
    path: routes.updatePaymentError,
    component: UpdatePaymentError,
    layout: NullLayout,
  },
  { path: routes.adminBill, component: AdminBill, layout: AdminLayout },
  { path: routes.test, component: Test },
  // new admin
  { path: routes.adminWelcome, component: AdminWelcome, layout: AdminLayout1 },
  {
    path: routes.adminCustomer1,
    component: AdminCustomer1,
    layout: AdminLayout1,
  },
  { path: routes.adminStaff1, component: AdminStaff1, layout: AdminLayout1 },
  { path: routes.adminBill1, component: AdminBill1, layout: AdminLayout1 },
  {
    path: routes.adminProduct1,
    component: AdminProduct1,
    layout: AdminLayout1,
  },
  { path: routes.adminPromotion1, component: AdminPromotion1, layout: AdminLayout1 },
  { path: routes.adminColor1, component: Color1, layout: AdminLayout1 },
  { path: routes.adminSize1, component: Size1, layout: AdminLayout1 },
  { path: routes.adminExchange1, component: AdminExchange1, layout: AdminLayout1 },

  // minh
  { path: routes.adminProductDetail1, component: AdminProductDetail1, layout: AdminLayout1 },
  { path: routes.adminStatistical1, component: AdminStatistical1, layout: AdminLayout1 },
  { path: routes.detailAdminProductDetail1, component: DetailAdminProductDetail1, layout: AdminLayout1 },
  { path: routes.createProductDetail, component: CreateForAdminPd, layout: AdminLayout },
  { path: routes.offlineSales1, component: OfflineSales1, layout: AdminLayout1 },
];

export const privateRoutes = [];
