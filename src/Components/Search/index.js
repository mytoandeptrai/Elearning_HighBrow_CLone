import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  khoaHocSearchAction,
  layDanhSachKhoaHocAction,
  layKhoaHocTheoSearchAction,
} from "../../redux/Course/course.actions";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
const Search = ({ danhMucKhoaHoc }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const layKhoaHocTheoSearch = (maDanhMuc) => {
    dispatch(layKhoaHocTheoSearchAction(maDanhMuc));
  };
  const layDanhSachKhoaHoc = () => {
    dispatch(layDanhSachKhoaHocAction());
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);
  //useDebounce search
  const typingTimeOutRef = useRef(null);
  const [searchTerm, setsearchTerm] = useState("");
  function handleSubmit(searchTerm) {
    dispatch(khoaHocSearchAction(searchTerm.searchTerm));
  }
  const handleChange = (e) => {
    const value = e.target.value;
    setsearchTerm(value);

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      handleSubmit(formValues);
    }, 400);
  };
  useEffect(() => {}, []);
  return (
    <>
      <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
        <IconButton
          className={classes.iconButton}
          aria-label="menu"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MenuIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="T??m ki???m kh??a h???c"
          inputProps={{ "aria-label": "T??m ki???m kh??a h???c" }}
          value={searchTerm}
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          className="popup_Search"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={() => {
                        layDanhSachKhoaHoc();
                      }}
                    >
                      T???t c???
                    </MenuItem>
                    {danhMucKhoaHoc.map((danhMuc, index) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            layKhoaHocTheoSearch(danhMuc.maDanhMuc);
                          }}
                          key={index}
                        >
                          {danhMuc.tenDanhMuc}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Paper>
    </>
  );
};

export default Search;
