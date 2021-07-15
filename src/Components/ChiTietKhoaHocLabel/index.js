import {
  FireOutlined,
  FolderOpenOutlined,
  MobileOutlined,
  ReloadOutlined,
  SnippetsOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  dangKyKhoaHocAction,
  huyDangKyKhoaHocAction,
  layThongTinNguoiDungAction,
} from "../../redux/User/user.actions";
import { USER_LOGIN } from "../../Ultity/ConfigWeb";
import "./style.css";

const ChiTietKhoaHocLabel = ({ chiTietKhoaHoc, maKhoaHoc }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction(currentUser.taiKhoan, maKhoaHoc));
  }, []);
  const currentUser = useSelector((state) => state.usersData?.currentUser);
  const thongTinTaiKhoan = useSelector(
    (state) => state.usersData.thongTinTaiKhoan
  );
  const trangThaiKhoaHoc = useSelector(
    (state) => state.usersData.trangThaiKhoaHoc
  );
  const dangKyKhoaHoc = (taiKhoan, maKhoaHoc, chiTietKhoaHoc) => {
    console.log({ taiKhoan, maKhoaHoc, chiTietKhoaHoc });
    dispatch(dangKyKhoaHocAction(taiKhoan, maKhoaHoc, chiTietKhoaHoc));
  };
  const huyDangKyKhoaHoc = (taiKhoan, maKhoaHoc, chiTietKhoaHoc) => {
    dispatch(huyDangKyKhoaHocAction(taiKhoan, maKhoaHoc, chiTietKhoaHoc));
  };
  return (
    <>
      <Card
        hoverable
        style={{ width: "90%" }}
        cover={<img src={chiTietKhoaHoc.hinhAnh} alt="example" />}
        className="label-img"
      >
        {localStorage.getItem(USER_LOGIN) ? (
          trangThaiKhoaHoc === false ? (
            <Button
              className="label-button_add"
              type="primary"
              onClick={() =>
                dangKyKhoaHoc(
                  thongTinTaiKhoan.taiKhoan,
                  chiTietKhoaHoc.maKhoaHoc
                )
              }
            >
              GHI DANH
            </Button>
          ) : (
            <Button
              className="label-button_add"
              type="danger"
              onClick={() =>
                huyDangKyKhoaHoc(
                  thongTinTaiKhoan.taiKhoan,
                  chiTietKhoaHoc.maKhoaHoc
                )
              }
            >
              HỦY
            </Button>
          )
        ) : (
          <NavLink to="/dangnhap">
            <Button className="label-button_buy" type="default">
              Đăng nhập
            </Button>
          </NavLink>
        )}

        <div className="label-detail">
          <p>Khóa học này bao gồm: </p>
          <ul>
            <li>
              <span>
                <VideoCameraOutlined />
              </span>
              8.5 giờ học Video
            </li>
            <li>
              <span>
                <SnippetsOutlined />
              </span>
              26 Phần
            </li>
            <li>
              <span>
                <FolderOpenOutlined />
              </span>
              4 Nguồn download tài liệu
            </li>
            <li>
              <span>
                <ReloadOutlined />
              </span>
              Quyền truy cập cả đời
            </li>
            <li>
              <span>
                <MobileOutlined />
              </span>
              Phù hợp trên PC và mobile
            </li>
            <li>
              <span>
                <FireOutlined />
              </span>
              Cấp chứng chỉ khi hoàn thành khóa học
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};

export default ChiTietKhoaHocLabel;
