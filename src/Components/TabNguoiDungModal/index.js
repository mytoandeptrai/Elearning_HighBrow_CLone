import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import CardModalKhoaHoc from "./CardModalKhoaHoc/index";
import "./style.css";
import {
  layKhoaHocChoXetDuyetAction,
  layKhoaHocChuaGhiDanhAction,
  layKhoaHocDaXetDuyetAction,
} from "../../redux/Admin/admin.actions";
import Loading from "../Loading/Loading";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 400,
    overflowY: "scroll",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "20%",
  },
  TabPanel: {
    width: "80%",
  },
}));
const TabNguoiDungModal = ({ data }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const khoaHocChuaXetDuyet = useSelector(
    (state) => state.adminsData.danhSachKhoaHocChuaXetDuyet
  );
  const khoaHocChoXetDuyet = useSelector(
    (state) => state.adminsData.danhSachKhoaHocChoXetDuyet
  );
  const khoaHocDaXetDuyet = useSelector(
    (state) => state.adminsData.danhSachKhoaHocDaXetDuyet
  );
  const [done, setDone] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(layKhoaHocChuaGhiDanhAction(data));
      setDone(true);
    }, 1800);
  }, [data, done]);
  useEffect(() => {
    setTimeout(() => {
      dispatch(layKhoaHocChoXetDuyetAction(data));
      setDone(true);
    }, 1800);
  }, [data, done]);
  useEffect(() => {
    setTimeout(() => {
      dispatch(layKhoaHocDaXetDuyetAction(data));
      setDone(true);
    }, 1800);
  }, [data, done]);
  return (
    <>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Khóa học chưa ghi danh" {...a11yProps(0)} />
          <Tab label="Khóa học chờ xét duyệt" {...a11yProps(1)} />
          <Tab label="Khóa học đã xét duyệt" {...a11yProps(2)} />
        </Tabs>

        <TabPanel value={value} index={0} className={classes.TabPanel}>
          {!done ? (
            <Loading />
          ) : (
            <Grid container>
              {khoaHocChuaXetDuyet?.map((kh, index) => {
                return (
                  <CardModalKhoaHoc
                    tenKhoaHoc={kh.tenKhoaHoc}
                    maKhoaHoc={kh.maKhoaHoc}
                    taiKhoan={data}
                    type="chuaXetDuyet"
                    setDone={setDone}
                  />
                );
              })}
            </Grid>
          )}
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.TabPanel}>
          {!done ? (
            <Loading />
          ) : (
            <Grid container>
              {khoaHocChoXetDuyet?.map((kh, index) => {
                return (
                  <CardModalKhoaHoc
                    tenKhoaHoc={kh.tenKhoaHoc}
                    maKhoaHoc={kh.maKhoaHoc}
                    taiKhoan={data}
                    type="choXetDuyet"
                    setDone={setDone}
                  />
                );
              })}
            </Grid>
          )}
        </TabPanel>
        <TabPanel value={value} index={2} className={classes.TabPanel}>
          {!done ? (
            <Loading />
          ) : (
            <Grid container>
              {khoaHocDaXetDuyet?.map((kh, index) => {
                return (
                  <CardModalKhoaHoc
                    tenKhoaHoc={kh.tenKhoaHoc}
                    maKhoaHoc={kh.maKhoaHoc}
                    taiKhoan={data}
                    type="daXetDuyet"
                    setDone={setDone}
                  />
                );
              })}
            </Grid>
          )}
        </TabPanel>
      </div>
    </>
  );
};

export default TabNguoiDungModal;
