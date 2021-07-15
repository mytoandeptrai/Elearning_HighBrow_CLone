import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";
import ChiTietKhoaHoc from "./Pages/ChiTietKhoaHoc";
import Dangky from "./Pages/DangKy";
import Dangnhap from "./Pages/DangNhap";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import QuanLyHocVien from "./Pages/QuanLyHocVien";
import QuanLyNguoiDung from "./Pages/QuanLyNguoiDung";
import TatCaKhoaHoc from "./Pages/TatCaKhoaHoc";
import ThongTinTaiKhoan from "./Pages/ThongTinTaiKhoan";
import AdminTemplate from "./Templates/AdminTemplate";
import HomeTemplate from "./Templates/HomeTemplate";
const App = () => {
  return (
    <>
      <div className="app">
        <Switch>
          <HomeTemplate exact path="/" Component={Home} />
          <HomeTemplate exact path="/TatCaKhoaHoc" Component={TatCaKhoaHoc} />

          <HomeTemplate
            exact
            path="/ChiTietKhoaHoc/:maKhoaHoc"
            Component={ChiTietKhoaHoc}
          />
          <HomeTemplate
            exact
            path="/ThongTinTaiKhoan"
            Component={ThongTinTaiKhoan}
          />
          <HomeTemplate exact path="/DangKy" Component={Dangky} />
          <HomeTemplate exact path="/DangNhap" Component={Dangnhap} />
          <AdminTemplate
            path="/admin/NguoiDungManager"
            exact
            Component={QuanLyNguoiDung}
          />
          <AdminTemplate path="/ad" exact Component={QuanLyHocVien} />
          <HomeTemplate exact="*" Component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
};

export default App;
