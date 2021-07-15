import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layDanhMucKhoaHocAction } from "../../redux/Categories/categories.action";
import { layDanhSachKhoaHocAction } from "../../redux/Course/course.actions";
import Search from "./../../Components/Search";
import CardKhoaHoc from "./../../Components/KhoaHocRender/CardKhoaHoc";
import "./style.css";
const TatCaKhoaHoc = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachKhoaHocAction());
    dispatch(layDanhMucKhoaHocAction());
  }, []);
  let danhMucKhoaHoc = useSelector(
    (state) => state.categoriesData.danhMucKhoaHoc
  );

  let khoaHocFilter = useSelector((state) => state.coursesData.khoaHocFilter);
  console.log(khoaHocFilter);
  return (
    <>
      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-8 mb-5">
            <Search danhMucKhoaHoc={danhMucKhoaHoc} />
          </div>
        </div>

        <div>
          <div className="row d-flex justify-content-center">
            {khoaHocFilter === null || khoaHocFilter.length === 0 ? (
              <h2>Không có kết quả</h2>
            ) : (
              <>
                {khoaHocFilter?.map((khoaHoc, index) => {
                  return <CardKhoaHoc khoaHoc={khoaHoc} key={index} />;
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TatCaKhoaHoc;
