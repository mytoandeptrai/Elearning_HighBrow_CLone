import { makeStyles } from "@material-ui/core";
import { Modal, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import ModalAddCourse from "@material-ui/core/Modal";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Loading from "../../Components/Loading/Loading";
import ModalSuaNguoiDung from "../../Components/ModalSuaNguoiDung";
import ModalThemNguoiDung from "../../Components/ModalThemNguoiDung";
import SearchNguoiDung from "../../Components/SeachNguoiDung";
import TabNguoiDungModal from "../../Components/TabNguoiDungModal";
import {
  deleteUserAction,
  layDanhSachNguoiDungAction,
} from "../../redux/Admin/admin.actions";
import "./style.css";
import ModalNguoiDung from "../../Components/ModalNguoiDung";
const QuanLyHocVien = () => {
  //dispatch và useEffect
  const dispatch = useDispatch();
  // Get user List
  const danhSachNguoiDung = useSelector(
    (state) => state.adminsData.danhSachNguoiDung
  );
  // get user search
  const danhSachNguoiDungSearch = useSelector(
    (state) => state.adminsData.danhSachNguoiDungSearch
  );
  //creat Loading table
  const [done, setDone] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      dispatch(layDanhSachNguoiDungAction());
      setDone(true);
    }, 1800);
  }, [done]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  // action--------------------------------------------------
  //delete
  const deleteUser = (taiKhoan) => {
    dispatch(deleteUserAction(taiKhoan, setDone));
  };
  //Edit User
  const [userEdit, setUserEdit] = useState(null);
  const editUser = (taiKhoan) => {
    setOpen(true);
    settitle(false);
    setUserEdit(taiKhoan);
    setIsModalVisible(true);
  };

  // Add user
  const addUser = () => {
    setOpen(true);
    settitle(true);
    setIsModalVisible(true);
  };
  //cancel modal
  const handleCancelModal = () => {
    setIsModalVisible(false);
    handleClose();
  };
  //column and data table
  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: 200,
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["lg"],
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
      responsive: ["lg"],
    },
    {
      title: "Loại người dùng",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      render: (maLoaiNguoiDung) => (
        <>
          <Tag
            color={maLoaiNguoiDung === "HV" ? "red" : "green"}
            className="d-flex justify-content-center w-50"
          >
            {maLoaiNguoiDung}
          </Tag>
        </>
      ),
      filters: [
        {
          text: "Học viên",
          value: "HV",
        },
        {
          text: "Giáo vụ",
          value: "GV",
        },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.indexOf(value) === 0,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            className="text-warning"
            onClick={() => {
              editUser(text);
            }}
          >
            Sửa
          </a>
          <a className="text-danger" onClick={() => deleteUser(text.taiKhoan)}>
            Xóa
          </a>
          <a
            className="text-primary"
            onClick={() => {
              showModal(text.taiKhoan);
            }}
          >
            Khóa học
          </a>
        </Space>
      ),
    },
  ];
  var data = danhSachNguoiDung;
  if (danhSachNguoiDungSearch === null) {
    data = danhSachNguoiDung;
  } else {
    data = danhSachNguoiDungSearch;
  }

  const [more, setMore] = React.useState(false);
  const [dataModal, setDataModal] = useState(null);
  const showModal = (taiKhoan) => {
    setMore(true);
    setDataModal(taiKhoan);
  };

  const handleCancel = (e) => {
    setMore(false);
  };

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  const [title, settitle] = useState(true);
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
            <div className="bg-card bg-card1">
              <div className="bg-text">
                <h3>45</h3>
                <span>Bài giảng trực tuyến</span>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
            <div className="bg-card bg-card2">
              <div className="bg-text">
                <h3>100</h3>
                <span>Giảng viên</span>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
            <div className="bg-card bg-card3">
              <div className="bg-text">
                <h3>5000+</h3>
                <span>Học viên</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10">
            <SearchNguoiDung loading={setDone} />
          </div>
          <div className="col-lg-2 justify-content-center d-flex">
            <button
              className="btnAddUser"
              onClick={() => {
                addUser();
              }}
            >
              Thêm người dùng
            </button>

            <ModalNguoiDung
              title={title}
              handleClose={handleClose}
              setDone={setDone}
              userEdit={userEdit}
              handleCancelModal={handleCancelModal}
              isModalVisible={isModalVisible}
            />
          </div>
        </div>

        <div>
          {!done ? (
            <Loading />
          ) : (
            <Table
              columns={columns}
              dataSource={data}
              pagination={{
                total: data?.length,
                pageSize: 7,
                hideOnSinglePage: true,
              }}
            />
          )}
        </div>

        <Modal
          title="Thông tin khóa học"
          visible={more}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={handleCancel}
          cancelText="Hủy bỏ"
          className="modal_course"
        >
          <TabNguoiDungModal data={dataModal} />
        </Modal>
      </div>
    </>
  );
};

export default QuanLyHocVien;
