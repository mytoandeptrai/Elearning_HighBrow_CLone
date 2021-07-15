import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// Modal
import { Modal } from "antd";
//Form
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
//Thư viện formik
import { withFormik, Form, Field, Formik } from "formik";
//Thư viện yub (validate form)
import * as Yup from "yup";
import swal from "sweetalert";
import { editUserAction } from "../../redux/Admin/admin.actions";

const ModalSuaNguoiDung = ({ visible, dataEdit, handleCancel, setDone }) => {
  console.log(dataEdit);
  const dispatch = useDispatch();
  const initialValues = {
    taiKhoan: dataEdit?.taiKhoan,
    matKhau: "",
    hoTen: dataEdit?.hoTen,
    soDT: dataEdit?.soDt,
    maNhom: "GP12",
    email: dataEdit?.email,
    maLoaiNguoiDung: dataEdit?.maLoaiNguoiDung,
  };
  const validationSchema = Yup.object().shape({
    // Validate form field
    taiKhoan: Yup.string()
      .required("Không được bỏ trống")
      .min(5, "Có ít nhất 5 ký tự"),
    email: Yup.string().required("Không được bỏ trống").email("Không hợp lệ"),
    hoTen: Yup.string()
      .required("Không được bỏ trống")
      .min(8, "Có ít nhất 8 ký tự"),
    soDT: Yup.string().required("Không được bỏ trống"),
    matKhau: Yup.string()
      .required("Không được bỏ trống")
      .min(8, "Có ít nhất 8 ký tự"),
    maLoaiNguoiDung: Yup.string().required("Không được bỏ trống"),
  });

  const resetForm = (formValues) => {
    formValues.taiKhoan = "";
    formValues.hoTen = "";
    formValues.soDT = "";
    formValues.matKhau = "";
    formValues.email = "";
    formValues.maLoaiNguoiDung = "";
  };

  const handleSubmit = (values) => {
    const resetForm = () => {
      values.taiKhoan = "";
      values.hoTen = "";
      values.soDT = "";
      values.matKhau = "";
      values.email = "";
      values.maLoaiNguoiDung = "";
    };
    if (
      values.email === "" ||
      values.hoTen === "" ||
      values.maLoaiNguoiDung === "" ||
      values.matKhau === "" ||
      values.soDT === "" ||
      values.taiKhoan === ""
    ) {
      swal("Oops!", "Bạn cần phải nhập đầy đủ thông tin vào form!", "error");
      handleCancel();
    } else {
      dispatch(editUserAction(values, setDone, resetForm));
      handleCancel();
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {(formilkProps) => {
          const { values, errors, touched } = formilkProps;
          return (
            <>
              <Modal
                title="Thêm người dùng"
                visible={visible}
                onOk={() => handleSubmit(formilkProps.values)}
                onCancel={handleCancel}
                okText="Thêm"
                cancelText="Hủy bỏ"
              >
                <Form>
                  <Grid container justify="center" alignContent="center">
                    <Grid className="mr-3" item xs={5} md={5}>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={
                          formilkProps.touched.taiKhoan &&
                          !!formilkProps.errors.taiKhoan
                        }
                      >
                        <InputLabel>Tài khoản</InputLabel>
                        <Field
                          name="taiKhoan"
                          render={({ field }) => (
                            <Input
                              fullWidth
                              {...field}
                              value={formilkProps.values.taiKhoan}
                              onChange={formilkProps.handleChange}
                            />
                          )}
                        />
                        {formilkProps.touched.taiKhoan && (
                          <FormHelperText>
                            {formilkProps.errors.taiKhoan}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={
                          formilkProps.touched.hoTen &&
                          !!formilkProps.errors.hoTen
                        }
                      >
                        <InputLabel>Họ tên</InputLabel>
                        <Field
                          name="hoTen"
                          render={({ field }) => (
                            <Input
                              fullWidth
                              {...field}
                              name="hoTen"
                              value={formilkProps.values.hoTen}
                              onChange={formilkProps.handleChange}
                            />
                          )}
                        />
                        {formilkProps.touched.hoTen && (
                          <FormHelperText>
                            {formilkProps.errors.hoTen}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={5} md={5}>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={
                          formilkProps.touched.matKhau &&
                          !!formilkProps.errors.matKhau
                        }
                      >
                        <InputLabel>Mật khẩu</InputLabel>
                        <Field
                          name="matKhau"
                          render={({ field }) => (
                            <Input
                              fullWidth
                              type="password"
                              {...field}
                              name="matKhau"
                              value={formilkProps.values.matKhau}
                              onChange={formilkProps.handleChange}
                            />
                          )}
                        />
                        {formilkProps.touched.matKhau && (
                          <FormHelperText>
                            {formilkProps.errors.matKhau}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={
                          formilkProps.touched.soDT &&
                          !!formilkProps.errors.soDT
                        }
                      >
                        <InputLabel>Số điện thoại</InputLabel>
                        <Field
                          name="soDT"
                          render={({ field }) => (
                            <Input
                              fullWidth
                              type="phoneNumber"
                              {...field}
                              name="soDT"
                              value={formilkProps.values.soDT}
                              onChange={formilkProps.handleChange}
                            />
                          )}
                        />
                        {formilkProps.touched.soDT && (
                          <FormHelperText>
                            {formilkProps.errors.soDT}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={10} md={10}>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={
                          formilkProps.touched.email &&
                          !!formilkProps.errors.email
                        }
                      >
                        <InputLabel>Email</InputLabel>
                        <Field
                          name="email"
                          render={({ field }) => (
                            <Input
                              fullWidth
                              {...field}
                              name="email"
                              value={formilkProps.values.email}
                              onChange={formilkProps.handleChange}
                            />
                          )}
                        />
                        {formilkProps.touched.email && (
                          <FormHelperText>
                            {formilkProps.errors.email}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={10} md={10}>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={
                          formilkProps.touched.maLoaiNguoiDung &&
                          !!formilkProps.errors.maLoaiNguoiDung
                        }
                      >
                        <InputLabel>Chức danh</InputLabel>
                        <Field
                          render={({ field }) => (
                            <Select
                              displayEmpty
                              {...field}
                              name="maLoaiNguoiDung"
                              value={formilkProps.values.maLoaiNguoiDung}
                              onChange={formilkProps.handleChange}
                            >
                              <MenuItem value="HV">Học Viên</MenuItem>
                              <MenuItem value="GV">Giáo Vụ</MenuItem>
                            </Select>
                          )}
                        />
                        {formilkProps.touched.maLoaiNguoiDung && (
                          <FormHelperText>
                            {formilkProps.errors.maLoaiNguoiDung}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Form>
              </Modal>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default ModalSuaNguoiDung;
