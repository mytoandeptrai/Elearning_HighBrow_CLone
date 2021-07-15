import React from "react";
import { Button, Form, Input } from "antd";
const ThongTinAccount = ({ handleSubmit, handleChange, userChange }) => {
  return (
    <>
      <div
        className="tab-pane fade show active"
        id="thongtintaikhoan_tab"
        role="tabpanel"
        aria-labelledby="v-pills-home-tab"
      >
        <h2 className="thongtintaikhoan-title text-center">
          Thông tin tài khoản
        </h2>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          size={"large"}
          onFinish={handleSubmit}
        >
          <Form.Item label="Tên tài khoản">
            <Input
              name="taiKhoan"
              value={userChange.taiKhoan}
              onChange={handleChange}
              disabled
            />
          </Form.Item>
          <Form.Item label="Họ và tên">
            <Input
              name="hoTen"
              value={userChange.hoTen}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input
              type="text"
              name="soDT"
              value={userChange.soDT}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              name="email"
              value={userChange.email}
              onChange={handleChange}
            />
          </Form.Item>
          <div className="col-12 btn-thongtintaikhoan">
            <Button htmlType="submit" type="primary" size={"large"}>
              Xác nhận
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ThongTinAccount;
