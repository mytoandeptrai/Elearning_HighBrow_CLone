import axios from "axios";
import { DOMAIN, USER_LOGIN } from "../../Ultity/ConfigWeb";

import swal from "sweetalert";
import adminTypes from "./admin.types";

export const layDanhSachNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      let { status, data } = await axios({
        url: DOMAIN + "api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP12",
        method: "get",
      });
      if (status === 200) {
        dispatch({
          type: adminTypes.LAY_DANH_SACH_NGUOI_DUNG,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUserAction = (TaiKhoan, setDone) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      swal({
        title: "Bạn chắc chứ?",
        text: "Người dùng đã xóa không thể khôi phục lại!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios({
            url:
              DOMAIN + `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${TaiKhoan}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((res) => {
              let { data, status } = res;
              if (status === 200) {
                swal("Thành công", "Xóa thành công", "success");
                setDone(undefined);
              }
            })
            .catch((err) => {
              swal("Thất bại", "Không thể xóa người dùng này", "warning");
            });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const addUserAction = (userAdding, setDone, resetForm) => {
  console.log(userAdding);
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { status, data } = await axios({
        url: DOMAIN + "api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: {
          taiKhoan: userAdding.taiKhoan,
          matKhau: userAdding.matKhau,
          email: userAdding.email,
          soDT: userAdding.soDT,
          maNhom: userAdding.maNhom,
          hoTen: userAdding.hoTen,
          maLoaiNguoiDung: userAdding.maLoaiNguoiDung,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        swal("Thành công", "Thêm thành công", "success");
        setDone(undefined);
        resetForm();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const searchUserAction = (keyWord, setDone) => {
  return async (dispatch) => {
    try {
      if (keyWord === null || keyWord.trim() === "") {
        let { status, data } = await axios({
          url: DOMAIN + "api/QuanLyNguoiDung/LayDanhSachNguoiDung",
          method: "get",
        });
        if (status === 200) {
          dispatch({
            type: adminTypes.LAY_DANH_SACH_NGUOI_DUNG,
            payload: data,
          });
          setDone(undefined);
        }
      } else {
        let { status, data } = await axios({
          url:
            DOMAIN +
            `api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP12&tuKhoa=${keyWord}`,
          method: "get",
        });
        if (status === 200) {
          dispatch({
            type: adminTypes.SEARCH_USER,
            payload: data,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const editUserAction = (userEdited, setDone, resetForm) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url: DOMAIN + "api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "put",
        data: {
          taiKhoan: userEdited.taiKhoan,
          matKhau: userEdited.matKhau,
          email: userEdited.email,
          soDT: userEdited.soDT,
          maLoaiNguoiDung: userEdited.maLoaiNguoiDung,
          maNhom: userEdited.maNhom,
          hoTen: userEdited.hoTen,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        swal(
          "Thành công",
          "Bạn đã sửa thành công vui lòng đăng nhập lại",
          "success"
        );
        setDone(undefined);
        resetForm();
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

export const layKhoaHocChuaGhiDanhAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url:
          DOMAIN +
          `api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${taiKhoan}`,
        method: "post",
        data: {
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        dispatch({
          type: adminTypes.LAY_DS_KH_CHUA_XET_DUYET,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const layKhoaHocChoXetDuyetAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url:
          DOMAIN +
          `api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet?TaiKhoan=${taiKhoan}`,
        method: "post",
        data: {
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        dispatch({
          type: adminTypes.LAY_DS_KH_CHO_XET_DUYET,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const layKhoaHocDaXetDuyetAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url:
          DOMAIN +
          `api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet?TaiKhoan=${taiKhoan}`,
        method: "post",
        data: {
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        dispatch({
          type: adminTypes.LAY_DS_KH_DA_XET_DUYET,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const layDanhSachHocVienChoXetDuyetAction = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url:
          DOMAIN +
          `api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet?MaKhoaHoc=${maKhoaHoc}`,
        method: "post",
        data: {
          maKhoaHoc: maKhoaHoc,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        dispatch({
          type: adminTypes.LAY_DS_HV_CHO_XET_DUYET,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const layDanhSachHocVienKhoaHocAction = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url:
          DOMAIN +
          `api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc?MaKhoaHoc=${maKhoaHoc}`,
        method: "post",
        data: {
          maKhoaHoc: maKhoaHoc,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        dispatch({
          type: adminTypes.LAY_DS_HV_KHOA_HOC,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const themKhoaHocAction = (thongTinKhoaHoc, setDone) => {
  return async () => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      axios({
        url: DOMAIN + "api/QuanLyKhoaHoc/ThemKhoaHoc",
        method: "POST",
        data: {
          maKhoaHoc: thongTinKhoaHoc.maKhoaHoc,
          biDanh: thongTinKhoaHoc.biDanh,
          tenKhoaHoc: thongTinKhoaHoc.tenKhoaHoc,
          moTa: thongTinKhoaHoc.moTa,
          luotXem: thongTinKhoaHoc.luotXem,
          danhGia: thongTinKhoaHoc.danhGia,
          hinhAnh: thongTinKhoaHoc.hinhAnh.name,
          maNhom: thongTinKhoaHoc.maNhom,
          ngayTao: thongTinKhoaHoc.ngayTao,
          maDanhMucKhoahoc: thongTinKhoaHoc.maDanhMucKhoahoc,
          taiKhoanNguoiTao: thongTinKhoaHoc.taiKhoanNguoiTao,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          let { data, status } = res;
          var form_data = new FormData();
          for (var key in thongTinKhoaHoc) {
            form_data.append(key, thongTinKhoaHoc[key]);
          }
          console.log(form_data);
          axios({
            url: DOMAIN + "api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc",
            method: "POST",
            data: form_data,
          }).then((res) => {
            swal("Thành công", "Thêm thành công", "success");
            console.log(res.data);
            setDone(undefined);
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(error.response.data);
      console.log("Thêm thất bại");
    }
  };
};

export const suaKhoaHocAction = (thongTinKhoaHoc, setDone) => {
  return async () => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      axios({
        url: DOMAIN + "api/QuanLyKhoaHoc/CapNhatKhoaHoc",
        method: "PUT",
        data: {
          maKhoaHoc: thongTinKhoaHoc.maKhoaHoc,
          biDanh: thongTinKhoaHoc.biDanh,
          tenKhoaHoc: thongTinKhoaHoc.tenKhoaHoc,
          moTa: thongTinKhoaHoc.moTa,
          luotXem: thongTinKhoaHoc.luotXem,
          danhGia: thongTinKhoaHoc.danhGia,
          hinhAnh: thongTinKhoaHoc.hinhAnh.name,
          maNhom: thongTinKhoaHoc.maNhom,
          ngayTao: thongTinKhoaHoc.ngayTao,
          maDanhMucKhoahoc: thongTinKhoaHoc.maDanhMucKhoahoc,
          taiKhoanNguoiTao: thongTinKhoaHoc.taiKhoanNguoiTao,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          let { data, status } = res;
          var form_data = new FormData();
          for (var key in thongTinKhoaHoc) {
            form_data.append(key, thongTinKhoaHoc[key]);
          }
          axios({
            url: DOMAIN + "api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc",
            method: "POST",
            data: form_data,
          })
            .then((res) => {
              swal("Thành công", "Sửa thành công", "success");
              console.log(res.data);
              setDone(undefined);
            })
            .catch((err) => {
              swal("Thất bại", "Sửa khóa học thất bại", "warning");
            });
        })
        .catch((err) => {
          swal("Thất bại", "Sửa khóa học thất bại", "warning");
        });
    } catch (error) {
      console.log(error.response.data);
      console.log("Sửa thất bại");
    }
  };
};
