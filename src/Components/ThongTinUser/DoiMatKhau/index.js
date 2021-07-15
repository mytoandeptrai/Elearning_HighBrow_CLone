import { Button, Form, Input } from "antd";
import React from "react";
const DoiMatKhau = ({
  handleChange,
  password,
  passwordChange1,
  passwordChange2,
  handlePassword,
}) => {
  return (
    <>
      <div
        className="tab-pane fade show"
        id="doimatkhau_tab"
        role="tabpanel"
        aria-labelledby="v-pills-home-tab"
      >
        <h2 className="thongtintaikhoan-title text-center">Đổi mật khẩu</h2>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          size={"large"}
          onFinish={handlePassword}
        >
          <Form.Item label="Mật khẩu cũ">
            <Input
              type="password"
              name="matKhau"
              value={password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Mật khẩu mới">
            <Input
              type="password"
              name="matKhauMoi1"
              value={passwordChange1}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Nhập lại mật khẩu mới">
            <Input
              type="password"
              name="matKhauMoi2"
              value={passwordChange2}
              onChange={handleChange}
            />
          </Form.Item>
          <div className="col-12 btn-thongtintaikhoan">
            <Button htmlType="submit" type="primary" size={"large"}>
              Đổi mật khẩu
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default DoiMatKhau;
