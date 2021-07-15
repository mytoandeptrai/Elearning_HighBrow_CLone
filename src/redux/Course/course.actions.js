import courseTypes from "./course.types";
import axios from "axios";

import swal from "sweetalert";
import { DOMAIN, USER_LOGIN } from "../../Ultity/ConfigWeb";
import categorieTypes from "../Categories/categories.types";

export const layDanhSachKhoaHocAction = () => {
  return async (dispatch) => {
    try {
      let { status, data } = await axios({
        url: DOMAIN + "api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP12",
        method: "get",
      });
      if (status === 200) {
        dispatch({
          type: courseTypes.LAY_DANH_SACH,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const layKhoaHocTheoMucAction = (maDanhMuc) => {
  return async (dispatch) => {
    try {
      let { status, data } = await axios({
        url:
          DOMAIN +
          `api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP12`,
        method: "get",
      });
      if (status === 200) {
        dispatch({
          type: categorieTypes.LAY_KHOA_HOC_THEO_MUC,
          payload: data,
        });
      } else {
        dispatch({
          type: categorieTypes.LAY_KHOA_HOC_THEO_MUC,
          payload: null,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const layChiTietKhoaHocAction = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      let { status, data } = await axios({
        url:
          DOMAIN +
          `api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
        method: "get",
      });
      if (status === 200) {
        dispatch({
          type: courseTypes.LAY_CHI_TIET_KHOA_HOC,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const layKhoaHocTheoSearchAction = (maDanhMuc) => {
  return async (dispatch) => {
    try {
      let { status, data } = await axios({
        url:
          DOMAIN +
          `/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP12`,
        method: "get",
      });
      if (status === 200) {
        dispatch({
          type: courseTypes.LAY_KHOA_HOC_THEO_SEARCH,
          payload: data,
        });
      } else {
        dispatch({
          type: courseTypes.LAY_KHOA_HOC_THEO_SEARCH,
          payload: null,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const khoaHocSearchAction = (tuKhoa) => {
  return async (dispatch) => {
    try {
      let { status, data } = await axios({
        url:
          DOMAIN +
          `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tuKhoa}&MaNhom=GP12`,
        method: "get",
      });
      if (status === 200) {
        dispatch({
          type: "LAY_KHOA_HOC_SEARCH",
          khoaHoc: data,
          keyWord: tuKhoa,
        });
      } else {
        dispatch({
          type: courseTypes.LAY_KHOA_HOC_THEO_SEARCH,
          payload: null,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteCourseAction = (maKhoaHoc, setDone) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      swal({
        title: "Bạn chắc chứ?",
        text: "Khóa học này xóa không thể khôi phục lại!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios({
            url: DOMAIN + `api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((res) => {
              let { status } = res;
              if (status === 200) {
                swal("Thành công", "Xóa thành công", "success");
              }
              layDanhSachKhoaHocAction();
              setDone(undefined);
            })
            .catch((err) => {
              swal("Thất bại", "Không thể xóa khóa học này", "warning");
            });
        }
      });
    } catch (error) {
      console.log("error");
    }
  };
};
