import { USER_LOGIN } from "../../Ultity/ConfigWeb";
import userTypes from "./user.types";

let userLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const INITIAL_STATE = {
  //User login
  isLoadingCurrentUser: false,
  currentUser: userLogin,
  errorCurrentUser: null,
  //User signUp
  infoUserSignUp: null,
  errorSignUp: null,
  //Course
  thongTinTaiKhoan: {},
  thongTinKhoaHoc: {},
  mangKhoaHocGhiDanh: [],
  trangThaiKhoaHoc: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        infoUserSignUp: action.payload,
      };
    case userTypes.USER_SIGNUP_FAILED:
      return {
        ...state,
        infoUserSignUp: null,
        errorSignUp: action.payload,
      };
    case userTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.USER_LOGOUT:
      return {
        ...state,
        currentUser: {},
      };
    case userTypes.USER_INFO_SUCCESS: {
      state.thongTinTaiKhoan = action.userInfo;
      state.mangKhoaHocGhiDanh = action.userInfo.chiTietKhoaHocGhiDanh;
      let index = state.mangKhoaHocGhiDanh.findIndex(
        (kh) => kh.maKhoaHoc === action.maKhoaHoc
      );
      if (index !== -1) {
        state.trangThaiKhoaHoc = true;
      } else {
        state.trangThaiKhoaHoc = false;
      }
      return { ...state };
    }
    case userTypes.GHI_DANH_KHOA_HOC:
      let mangKhoaHocMoi = [...state.mangKhoaHocGhiDanh];
      console.log(mangKhoaHocMoi);
      mangKhoaHocMoi.push(state.thongTinKhoaHoc);
      console.log(mangKhoaHocMoi);
      return {
        ...state,
        trangThaiKhoaHoc: !state.trangThaiKhoaHoc,
        thongTinKhoaHoc: action.payload,
        mangKhoaHocGhiDanh: mangKhoaHocMoi,
      };
    case userTypes.HUY_GHI_DANH_KHOA_HOC:
      let mangKHMoi = [...state.mangKhoaHocGhiDanh];
      if (mangKHMoi !== null) {
        let index = mangKHMoi.findIndex(
          (kh) => kh?.maKhoaHoc === action.maKhoaHoc
        );
        if (index !== -1) {
          mangKHMoi.splice(index, 1);
        }
      }
      return {
        ...state,
        trangThaiKhoaHoc: !state.trangThaiKhoaHoc,
        mangKhoaHocGhiDanh: mangKHMoi,
      };
    case userTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
