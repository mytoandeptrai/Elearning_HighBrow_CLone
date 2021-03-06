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

  //get danh m???c kh??a h???c v???
  const danhMucKhoaHoc = useSelector(
    (state) => state.categoriesData.danhMucKhoaHoc
  );
  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container className={classes.grid} spacing={1}>
          <Grid item xs={12} className={classes.title}>
            <h3 className="text-center">
              {title ? "Th??m kh??a h???c" : "S???a kh??a h???c"}
            </h3>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="T??n kh??a h???c"
              variant="outlined"
              onChange={handleChange}
              name="tenKhoaHoc"
              value={thongTinKhoaHoc.tenKhoaHoc}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="M?? Kh??a h???c"
              variant="outlined"
              onChange={handleChange}
              name="maKhoaHoc"
              value={thongTinKhoaHoc.maKhoaHoc}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Ch???n danh m???c
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="maDanhMucKhoahoc"
                onChange={handleChange}
                label="Ch???n danh m???c"
                value={thongTinKhoaHoc.maDanhMucKhoahoc}
              >
                {danhMucKhoaHoc.map((danhMuc, item) => {
                  return (
                    <MenuItem value={danhMuc.maDanhMuc}>
                      {danhMuc.tenDanhMuc}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="B?? danh"
              variant="outlined"
              name="biDanh"
              onChange={handleChange}
              value={thongTinKhoaHoc.biDanh}
            />
          </Grid>

          <Grid item xs={12} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="M?? t???"
              variant="outlined"
              onChange={handleChange}
              name="moTa"
              value={thongTinKhoaHoc.moTa}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="L?????t xem"
              variant="outlined"
              onChange={handleChange}
              name="luotXem"
              value={thongTinKhoaHoc.luotXem}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="????nh gi??"
              variant="outlined"
              onChange={handleChange}
              name="danhGia"
              value={+thongTinKhoaHoc.danhGia}
            />
          </Grid>
          <Grid item xs={12} className={classes.dropzone}>
            <div className="container">
              <h4 className="text-center">Upload h??nh ???nh</h4>
              <div className="dropzone_css">
                <CloudUploadOutlinedIcon />
                <input
                  type="file"
                  onChange={handleChange}
                  name="hinhAnh"
                  className="btn"
                />
                {isDragActive ? <p>K??o th??? file v??o ????y</p> : ""}
              </div>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmit();
              }}
            >
              {title ? "Th??m kh??a h???c" : "S???a kh??a h???c"}
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleClear();
              }}
            >
              Tho??t
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ModalKhoaHoc;
