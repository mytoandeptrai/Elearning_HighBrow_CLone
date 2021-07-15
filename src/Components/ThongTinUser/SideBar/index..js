import React from "react";
import { Link } from "react-router-dom";
const SideBar = ({ currentUser }) => {
  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="thongtin_ava">
            {currentUser.taiKhoan?.slice(0, 2).toUpperCase()}
          </div>
        </div>
        <div className="col-12">
          <div
            className="nav flex-column nav-pills mt-3"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <Link to="/thongtintaikhoan_tab">Thông tin tài khoản</Link>
            <Link to="/v-pills-profile">Các khóa học của tôi</Link>
            <Link to="/doimatkhau_tab">Đổi mật khẩu</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
