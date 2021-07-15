import React from "react";
import "./style.css";

const CardComment = ({ key, comment }) => {
  return (
    <>
      <div className="col-lg-4" key={key}>
        <div className="cardComment">
          <div className="row">
            <div className="col-lg-4 col-md-2 col-sm-3 col-4">
              <img
                src={comment.hinhAnh}
                alt={comment.hinhAnh}
                className="cardComment_img"
              />
            </div>
            <div className="col-lg-8 col-md-10 col-sm-9 col-8 cardComment_info">
              <p className="cardComment_name">{comment.ten}</p>
              <span className="cardComment_work">{comment.ngheNghiep}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <p className="cardComment_comment">{comment.binhLuan}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComment;
