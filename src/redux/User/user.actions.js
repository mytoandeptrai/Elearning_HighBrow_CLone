import axios from "axios";
import swal from "sweetalert";
import { DOMAIN, USER_LOGIN, TOKEN } from "../../Ultity/ConfigWeb";
import courseTypes from "../Course/course.types";
import userTypes from "./user.types";
export const nguoiDungDangKyAction = (userRegister, history) => {
  return async (dispatch) => {
    try {
      let { status } = await axios({
        url: DOMAIN + "api/QuanLyNguoiDung/DangKy",
        method: "post",
        data: {
          taiKhoan: userRegister.taiKhoan,
          matKhau: userRegister.matKhau,
          email: userRegister.email,
          soDt: userRegister.soDT,
          maNhom: userRegister.maNhom,
          hoTen: userRegister.hoTen,
        },
      });

      if (status === 200) {
        swal("Thành công", "bạn đăng ký thành công", "success");
        history.push("/dangNhap");
      }
    } catch (error) {
      dispatch({
        type: userTypes.USER_SIGNUP_FAILED,
        payload: error.message,
      });
      swal("Thất bại", "Đăng ký thất bại", "warning");
    }
  };
};
export const nguoiDungDangNhapAction = (userSignIn, history) => {
  return async (dispatch) => {
    try {
      let { status, data } = await axios({
        url: DOMAIN + "api/QuanLyNguoiDung/DangNhap",
        method: "post",
        data: {
          taiKhoan: userSignIn.taiKhoan,
          matKhau: userSignIn.matKhau,
        },
      });

      if (status === 200) {
        dispatch({
          type: userTypes.USER_LOGIN_SUCCESS,
          payload: data,
        });
        //Lưu vào localstorage
        localStorage.setItem(USER_LOGIN, JSON.stringify(data));
        localStorage.setItem(TOKEN, data.accessToken);
        swal("Thành công", "bạn đăng ký thành công", "success");
        history.push("/");
      }
    } catch (error) {
      dispatch({
        type: userTypes.USER_LOGIN_FAILED,
        payload: error.message,
      });
      swal("Thất bại", "Đăng nhập thất bại", "warning");
    }
  };
};
export const dangXuatTaiKhoanAction = () => {
  return (dispatch) => {
    dispatch({
      type: userTypes.USER_LOGOUT,
    });
    swal("Thành công", "Bạn đăng xuất thành công", "success");
  };
};

export const layThongTinNguoiDungAction = (taiKhoan, maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      axios({
        url: DOMAIN + "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
        data: {
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        let { data, status } = res;
        if (status === 200) {
          dispatch({
            type: userTypes.USER_INFO_SUCCESS,
            userInfo: data,
            maKhoaHoc: maKhoaHoc,
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const dangKyKhoaHocAction = (taiKhoan, maKhoaHoc, chiTietKhoaHoc) => {
  console.log(chiTietKhoaHoc);
  return async (dispatch) => {
    const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
    axios({
      url: DOMAIN + "api/QuanLyKhoaHoc/DangKyKhoaHoc",
      method: "POST",
      data: {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      let { status } = res;
      if (status === 200) {
        console.log(res.data);
        swal("Thành công", "Đăng kí thành công", "success");
        dispatch({
          type: userTypes.GHI_DANH_KHOA_HOC,
          payload: chiTietKhoaHoc,
        });
      }
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };
};

export const huyDangKyKhoaHocAction = (taiKhoan, maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      axios({
        url: DOMAIN + "api/QuanLyKhoaHoc/HuyGhiDanh",
        method: "POST",
        data: {
          maKhoaHoc: maKhoaHoc,
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        let { status } = res;
        if (status === 200) {
          swal("Thành công", "Hủy đăng ký thành công", "success");
          dispatch({
            type: userTypes.HUY_GHI_DANH_KHOA_HOC,
            payload: maKhoaHoc,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const ghiDanhKhoaHocAction = (taiKhoan, maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      axios({
        url: DOMAIN + "api/QuanLyKhoaHoc/GhiDanhKhoaHoc",
        method: "POST",
        data: {
          maKhoaHoc: maKhoaHoc,
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        let { status } = res;
        if (status === 200) {
          swal("Thành công", "Ghi danh thành công", "success");
          // dispatch({
          //   type: "GHI_DANH_KHOA_HOC",
          //   maKhoaHoc: maKhoaHoc,
          // });
        }
      });
    } catch (error) {
      console.log("đăng ký thất bại");
    }
  };
};

export const nguoiDungChinhSuaAction = (userChange, history, matKhau) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url: DOMAIN + "api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "put",
        data: {
          taiKhoan: userChange.taiKhoan,
          matKhau: matKhau,
          email: userChange.email,
          soDT: userChange.soDT,
          maLoaiNguoiDung: userChange.maLoaiNguoiDung,
          maNhom: userChange.maNhom,
          hoTen: userChange.hoTen,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        //Sau khi gọi api => dispatch lên redux
        dispatch({
          type: userTypes.UPDATE_USER_INFO_SUCCESS,
          payload: data,
        });
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(TOKEN);
        history.push("/");
        swal(
          "Thành công",
          "Bạn đã sửa thành công vui lòng đăng nhập lại",
          "success"
        );
      }
    } catch (error) {
      swal(
        "Thất bại",
        "Không thể sửa vui lòng thử lại khi đăng xuất",
        "warning"
      );
    }
  };
};
