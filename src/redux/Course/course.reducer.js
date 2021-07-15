import courseTypes from "./course.types";

const initialState = {
  isLoadingDsKH: false,
  dsKhoaHoc: [],

  isLoadingChiTietKH: false,
  chiTietKhoaHoc: {},

  nguoiTao: {},

  khoaHocChoXetDuyet: [],

  khoaHocFilter: null,
};
const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case courseTypes.LAY_DANH_SACH:
      return {
        ...state,
        dsKhoaHoc: action.payload,
        khoaHocFilter: action.payload,
      };
    case courseTypes.LAY_CHI_TIET_KHOA_HOC:
      return {
        ...state,
        chiTietKhoaHoc: action.payload,
        nguoiTao: action.payload.nguoiTao,
      };
    case courseTypes.LAY_KHOA_HOC_THEO_SEARCH:
      return {
        ...state,
        khoaHocFilter: action.payload,
      };
    case "LAY_KHOA_HOC_SEARCH": {
      if (action.keyWord === "") {
        state.khoaHocFilter = state.dsKhoaHoc;
      } else {
        state.khoaHocFilter = action.khoaHoc;
      }
      return { ...state };
    }

    default:
      return state;
  }
};
export default courseReducer;
