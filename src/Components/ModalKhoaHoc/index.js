import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//import CSS
import "./style.css";
//import form MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";

// dropzone
import { useDropzone } from "react-dropzone";
import {
  suaKhoaHocAction,
  themKhoaHocAction,
} from "../../redux/Admin/admin.actions";
//Styled component
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80ch",
    },
  },
  grid: {
    flexGrow: 1,
    width: "100",
  },
  gridItem: {
    margin: "15px 0",
    display: "flex",
    justifyContent: "center",
  },
  dropzone: {
    margin: "15px 0",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    margin: "5px 0",
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const ModalKhoaHoc = ({ title, handleClose, taiKhoan, setDone, khoaHoc }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [thongTinKhoaHoc, setthongTinKhoaHoc] = useState({
    maKhoaHoc: "",
    biDanh: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 200,
    danhGia: 0,
    hinhAnh: "",
    maNhom: "GP12",
    ngayTao: "2014-08-18T21:11:54",
    maDanhMucKhoahoc: "",
    taiKhoanNguoiTao: taiKhoan.taiKhoan,
  });
  useEffect(() => {
    if (khoaHoc) {
      setthongTinKhoaHoc({
        maKhoaHoc: khoaHoc.maKhoaHoc,
        biDanh: khoaHoc.biDanh,
        tenKhoaHoc: khoaHoc.tenKhoaHoc,
        moTa: khoaHoc.moTa,
        luotXem: 200,
        danhGia: 0,
        hinhAnh: "",
        maNhom: "GP12",
        ngayTao: khoaHoc.ngayTao,
        maDanhMucKhoahoc: khoaHoc.maDanhMucKhoahoc,
        taiKhoanNguoiTao: taiKhoan.taiKhoan,
      });
    }

    if (title) {
      setthongTinKhoaHoc({
        maKhoaHoc: "",
        biDanh: "",
        tenKhoaHoc: "",
        moTa: "",
        luotXem: 200,
        danhGia: 0,
        hinhAnh: "",
        maNhom: "GP12",
        ngayTao: "2014-08-18T21:11:54",
        maDanhMucKhoahoc: "",
        taiKhoanNguoiTao: taiKhoan.taiKhoan,
      });
    }
  }, [khoaHoc]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "hinhAnh") {
      setthongTinKhoaHoc({
        ...thongTinKhoaHoc,
        hinhAnh: event.target.files[0],
      });
    } else if (name === "danhMucKhoaHoc") {
      setthongTinKhoaHoc({
        ...thongTinKhoaHoc,
        danhMucKhoaHoc: {
          maDanhMucKhoahoc: value[1],
          tenDanhMucKhoaHoc: value[0],
        },
      });
    } else {
      setthongTinKhoaHoc({
        ...thongTinKhoaHoc,
        [name]: value,
      });
    }
  };
  const handleClear = () => {
    setthongTinKhoaHoc({
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 200,
      danhGia: 0,
      hinhAnh: "",
      maNhom: "GP12",
      ngayTao: "2014-08-18T21:11:54",
      maDanhMucKhoahoc: "",
      taiKhoanNguoiTao: taiKhoan.taiKhoan,
    });
    handleClose();
  };

  const handleSubmit = () => {
    if (title === true) {
      dispatch(themKhoaHocAction(thongTinKhoaHoc, setDone));
      handleClear();
    } else {
      dispatch(suaKhoaHocAction(thongTinKhoaHoc, setDone));
      handleClear();
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const imageUpload = acceptedFiles[0];
    setthongTinKhoaHoc({ hinhAnh: imageUpload });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //get danh mục khóa học về
  const danhMucKhoaHoc = useSelector(
    (state) => state.categoriesData.danhMucKhoaHoc
  );
  return <>ModalKhoaHoc</>;
};

export default ModalKhoaHoc;
