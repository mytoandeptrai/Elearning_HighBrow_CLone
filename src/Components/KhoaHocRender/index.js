import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { Carousel } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layKhoaHocTheoMucAction } from "../../redux/Course/course.actions";
import Loading from "./../Loading/Loading";
import CardKhoaHoc from "./CardKhoaHoc";
import "./style.css";
const KhoaHocRender = () => {
  const dispatch = useDispatch();
  const [maDanhMuc, setmaDanhMuc] = useState("BackEnd");
  const [done, setdone] = useState(undefined);
  useEffect(() => {
    setTimeout(() => {
      dispatch(layKhoaHocTheoMucAction(maDanhMuc));
      setdone(true);
    }, 1000);
  }, [maDanhMuc]);
  //Lấy danh mục
  const danhMucKhoaHoc = useSelector(
    (state) => state.categoriesData.danhMucKhoaHoc
  );
  //Lấy khóa học theo danh mục
  const danhSachKhoaHocTheoMuc = useSelector(
    (state) => state.categoriesData.khoaHocTheoDanhMuc
  );
  const props = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
    nextArrow: <ArrowForwardIosOutlinedIcon />,
    prevArrow: <ArrowBackIosOutlinedIcon />,
    draggable: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 414,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [active, setActive] = useState(0);
  return (
    <div className="container">
      <h2 className="khoahocrender-title">Tùy chọn các khóa học</h2>
      <nav>
        <div
          className="nav nav-tabs khoaHocrender-navtab"
          id="nav-tab"
          role="tablist"
        >
          {danhMucKhoaHoc?.map((danhMuc, index) => {
            // let active = index === 0 ? "active" : "";
            return (
              <p
                className={
                  active === index
                    ? "nav-item nav-link active khoaHocrender-select"
                    : "nav-item nav-link khoaHocrender-select"
                }
                id="nav-home-tab"
                data-toggle="tab"
                href={`#${danhMuc.maDanhMuc}`}
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
                key={index}
                onClick={() => {
                  setdone(undefined);
                  setmaDanhMuc(danhMuc.maDanhMuc);
                  setActive(index);
                }}
              >
                {danhMuc.tenDanhMuc}
              </p>
            );
          })}
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        {danhMucKhoaHoc?.map((danhMuc, index) => {
          let active = index === 0 ? "active" : "";
          return (
            <div
              className={`tab-pane ${active}`}
              id={`${danhMuc.maDanhMuc}`}
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              key={index}
            >
              {!done ? (
                <Loading />
              ) : (
                <>
                  {danhSachKhoaHocTheoMuc === null ? (
                    <div className="noCourse">Không có khóa học</div>
                  ) : (
                    <div>
                      <Carousel {...props}>
                        {danhSachKhoaHocTheoMuc.map((khoaHoc, index) => {
                          return (
                            <div className="cacKhoaHoc">
                              <CardKhoaHoc key={index} khoaHoc={khoaHoc} />
                            </div>
                          );
                        })}
                      </Carousel>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KhoaHocRender;
