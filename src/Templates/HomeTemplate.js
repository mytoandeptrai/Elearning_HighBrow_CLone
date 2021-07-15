import Footer from "../Components/Footer";
import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./../Components/Navbar/index";
import { USER_LOGIN } from "../Ultity/ConfigWeb";
import ThongTinTaiKhoan from "./../Pages/ThongTinTaiKhoan";
const HomeTemplate = ({ Component, ...restProps }) => {
  const isLogin = localStorage.getItem(USER_LOGIN);
  return (
    <>
      <Route
        {...restProps}
        render={(propsRoute) => {
          if (Component == ThongTinTaiKhoan) {
            if (isLogin === null) {
              return <Redirect to="/DangNhap" />;
            } else {
              return (
                <Fragment>
                  <Navbar />
                  <Component {...propsRoute} />
                  <Footer />
                </Fragment>
              );
            }
          } else {
            return (
              <Fragment>
                <Navbar />
                <Component {...propsRoute} />
                <Footer />
              </Fragment>
            );
          }
        }}
      />
    </>
  );
};

export default HomeTemplate;
