import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChiTietKhoaHocDetail from "../../Components/ChiTietKhoaHocDetail";
import ChiTietKhoaHocIntro from "../../Components/ChiTietKhoaHocIntro";
import ChiTietKhoaHocLabel from "../../Components/ChiTietKhoaHocLabel";
import { layChiTietKhoaHocAction } from "../../redux/Course/course.actions";
import "./style.css";
const ChiTietKhoaHoc = () => {
  const { maKhoaHoc } = useParams();
  const dispatch = useDispatch();
  const chiTietKhoaHoc = useSelector(
    (state) => state.coursesData.chiTietKhoaHoc
  );
  const nguoiTao = useSelector((state) => state.coursesData.nguoiTao);
  useEffect(() => {
    dispatch(layChiTietKhoaHocAction(maKhoaHoc));
  }, []);
  return (
    <>
      <div className="container-fluid p-0">
        <div className="background-img_chiTietKhoaHoc">
          <div className="container chitietkhoahoc">
            <div className="row chitietkhoahoc_index">
              <div className="col-xl-7 col-lg-7 col-md-12">
                <ChiTietKhoaHocIntro
                  chiTietKhoaHoc={chiTietKhoaHoc}
                  nguoiTao={nguoiTao}
                />
              </div>
              <div className="col-xl-5 col-lg-5 col-md-8 col-sm-12">
                <ChiTietKhoaHocLabel
                  chiTietKhoaHoc={chiTietKhoaHoc}
                  maKhoaHoc={maKhoaHoc}
                />
              </div>
            </div>
          </div>
        </div>
        <ChiTietKhoaHocDetail />
      </div>
    </>
  );
};

export default ChiTietKhoaHoc;
