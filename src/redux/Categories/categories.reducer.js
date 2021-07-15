import categorieTypes from "./categories.types";

const initialState = {
  danhMucKhoaHoc: [],
  khoaHocTheoDanhMuc: [],
};
const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case categorieTypes.LAY_DANH_MUC_KHOA_HOC:
      return {
        ...state,
        danhMucKhoaHoc: action.payload,
      };

    case categorieTypes.LAY_KHOA_HOC_THEO_MUC:
      return {
        ...state,
        khoaHocTheoDanhMuc: action.payload,
      };
    default:
      return state;
  }
};
export default categoriesReducer;
