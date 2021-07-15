import React from "react";
import CardComment from "./CardComment";
import Anh1 from "./../../Assets/img/jessica-stroup-86x86.jpg";
import Anh2 from "./../../Assets/img/joe-86x86.jpg";
import Anh3 from "./../../Assets/img/stephanie-86x86.jpg";
import A from "./../../Assets/img/admin.png";
import "./style.css";
const Pic1 = Anh1;
const Pic2 = Anh2;
const Pic3 = Anh3;
const mangComment = [
  {
    hinhAnh: Pic1,
    ten: "Jessica Stroup",
    ngheNghiep: "FrontEnd Developer",
    binhLuan:
      "Tôi rất thích học tại HighBrow, trang rất nhiều khóa học và đa dạng chủ đề. Mong trang web ngày càng phát triển.",
  },
  {
    hinhAnh: Pic2,
    ten: "Stephanie Busari",
    ngheNghiep: "Editor",
    binhLuan:
      "Kể từ ngày biết đến HighBrow, tôi điều học được những điều mới mẻ mỗi ngày. Cảm ơn HighBrow đã mang đến cho cộng đồng Developer những kiến thức bổ ích.",
  },
  {
    hinhAnh: Pic3,
    ten: "Joe Burridge",
    ngheNghiep: "Senior BackEnd Developer",
    binhLuan:
      "Tôi vừa hoàn thành khóa backend tại đây. Khóa học rất chi tiết và dễ hiểu. Cảm ơn HighBrow rất nhiều!",
  },
];
const Comments = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <h2 className="mb-5 comment_header">Nhận xét của học sinh</h2>
        </div>
        <div className="row">
          {mangComment.map((comment, index) => {
            return <CardComment key={index} comment={comment} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Comments;
