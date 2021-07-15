import axios from "axios";
import { DOMAIN } from "../../Ultity/ConfigWeb";
import categorieTypes from "./categories.types";

export const layDanhMucKhoaHocAction = () => {
  return async (dispatch) => {
    try {
      let { status, data } = await axios({
        url: DOMAIN + "api/QuanLyKhoaHoc/LayDanhMucKhoaHoc",
        method: "get",
      });
      if (status === 200) {
        dispatch({
          type: categorieTypes.LAY_DANH_MUC_KHOA_HOC,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
