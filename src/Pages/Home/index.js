import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Comments from "../../Components/Comments";
import KhoaHocRender from "../../Components/KhoaHocRender";
import { layDanhMucKhoaHocAction } from "../../redux/Categories/categories.action";
import { layDanhSachKhoaHocAction } from "../../redux/Course/course.actions";
import Benefit from "./../../Components/Benefit";
import GioiThieu from "./../../Components/GioiThieu";
import SocialInvestor from "./../../Components/SocialInvestor";
import "./style.css";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhMucKhoaHocAction());
    dispatch(layDanhSachKhoaHocAction());
  }, []);
  return (
    <>
      <div className="homeComponent">
        <GioiThieu />
        <Benefit />
        <KhoaHocRender />
        <Comments />
        <SocialInvestor />
      </div>
    </>
  );
};

export default Home;
