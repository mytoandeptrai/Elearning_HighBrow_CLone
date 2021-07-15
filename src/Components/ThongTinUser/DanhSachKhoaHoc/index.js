import Button1 from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
const DanhSachKhoaHoc = ({
  mangKhoaHocGhiDanh,
  classes,
  huyGhiDanhKhoaHoc,
  thongTinTaiKhoan,
}) => {
  return (
    <>
      <div
        className="tab-pane fade"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <div className="row">
          <h2 className="thongtintaikhoan-title">Khóa học của bạn</h2>
          <Grid container spacing={3}>
            {mangKhoaHocGhiDanh.length == 0 ? (
              <div className="m-auto">
                <h3 className="text-center lead">Chưa đăng ký khóa học nào</h3>
                <NavLink
                  to="/tatcakhoahoc"
                  className="d-flex justify-content-center mt-5"
                >
                  <Button type="primary" size={"large"}>
                    Chọn khóa học
                  </Button>
                </NavLink>
              </div>
            ) : (
              <>
                {mangKhoaHocGhiDanh.map((khoaHoc, index) => {
                  return (
                    <Grid item sm={12} md={4} lg={4}>
                      <Card className={classes.root}>
                        <CardContent>
                          <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                          >
                            Khóa học
                          </Typography>
                          <Typography variant="body2" component="p">
                            {khoaHoc.tenKhoaHoc}
                          </Typography>
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button1 size="small">
                            <NavLink
                              to={`/ChiTietKhoaHoc/${khoaHoc.maKhoaHoc}`}
                            >
                              Xem thêm
                            </NavLink>
                          </Button1>
                          <Button1
                            size="small"
                            color="warning"
                            onClick={() => {
                              huyGhiDanhKhoaHoc(
                                thongTinTaiKhoan.taiKhoan,
                                khoaHoc.maKhoaHoc
                              );
                            }}
                          >
                            Xóa khóa học
                          </Button1>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default DanhSachKhoaHoc;
