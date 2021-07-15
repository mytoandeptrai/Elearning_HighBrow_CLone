import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dangXuatTaiKhoanAction } from "../../../redux/User/user.actions";
import { TOKEN, USER_LOGIN } from "../../../Ultity/ConfigWeb";
import "./style.css";
const NavbarNguoiDung = ({ currentUser }) => {
  const dispatch = useDispatch();
  const dangXuatTaiKhoan = () => {
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(TOKEN);
    dispatch(dangXuatTaiKhoanAction());
  };
  return (
    <>
      <li className="nav-item d-none d-lg-block d-md-block">
        <NavLink
          className="nav-link"
          to={localStorage.getItem(USER_LOGIN) ? "/ThongTinTaiKhoan" : "/"}
        >
          <div className="nguoidung-info">
            <div className="nguoidung-info_hinhAnh">
              {currentUser.hoTen?.slice(0, 1).toUpperCase()}
            </div>
            <div className="nguoidung-info_ten">{currentUser.taiKhoan}</div>
            <div className="option-nguoidung">
              <ul>
                <li>
                  <NavLink to="/ThongTinTaiKhoan">Thông tin tài khoản</NavLink>
                </li>
                <li>
                  <NavLink to="/ThongTinTaiKhoan">Khóa học của tôi</NavLink>
                </li>
                {currentUser.maLoaiNguoiDung === "GV" ? (
                  <li>
                    <NavLink to="/admin/nguoidungManager">
                      Quản lý người dùng
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <NavLink to="/" onClick={() => dangXuatTaiKhoan()}>
                    Đăng xuất
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </NavLink>
      </li>
    </>
  );
};

export default NavbarNguoiDung;
