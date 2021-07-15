import adminTypes from "./admin.types";

const initialState = {
  danhSachNguoiDung: [],
  danhSachNguoiDungRender: [],
  danhSachNguoiDungSearch: null,

  danhSachKhoaHocChoXetDuyet: null,
  danhSachKhoaHocDaXetDuyet: null,
  danhSachKhoaHocChuaXetDuyet: null,

  danhSachHocVienKhoaHoc: null,
  danhSachHocVienChoXetDuyet: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.LAY_DANH_SACH_NGUOI_DUNG:
      return {
        ...state,
        danhSachNguoiDung: action.payload,
        danhSachNguoiDungSearch: null,
      };
    case adminTypes.SEARCH_USER:
      return {
        ...state,
        danhSachNguoiDungSearch: action.payload,
      };
    case adminTypes.LAY_DS_KH_CHO_XET_DUYET:
      return {
        ...state,
        danhSachKhoaHocChoXetDuyet: action.payload,
      };
    case adminTypes.LAY_DS_KH_DA_XET_DUYET:
      return {
        ...state,
        danhSachKhoaHocDaXetDuyet: action.payload,
      };
    case adminTypes.LAY_DS_KH_CHUA_XET_DUYET:
      return {
        ...state,
        danhSachKhoaHocChuaXetDuyet: action.payload,
      };
    case adminTypes.LAY_DS_HV_CHO_XET_DUYET:
      return {
        ...state,
        danhSachHocVienChoXetDuyet: action.payload,
      };
    case adminTypes.LAY_DS_HV_KHOA_HOC:
      return {
        ...state,
        danhSachHocVienKhoaHoc: action.payload,
      };
    default:
      return state;
  }
};
export default adminReducer;
