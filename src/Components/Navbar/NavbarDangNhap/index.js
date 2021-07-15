import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
const NavbarDangNhap = () => {
  return (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/DangKy">
          Đăng kí
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/DangNhap">
          Đăng nhập
        </NavLink>
      </li>
    </>
  );
};

export default NavbarDangNhap;
