import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [value, setValue] = useState(0);

  // logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#2196F3" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
          My Blog APP
        </Typography>
        {isLogin && (
          <Tabs
            textColor="inherit"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab label="Blogs" component={Link} to="/blogs" />
            <Tab label="My Blogs" component={Link} to="/my-blogs" />
            <Tab label="Create Blog" component={Link} to="/create-blog" />
          </Tabs>
        )}
        <Box>
          {!isLogin ? (
            <>
              <Button component={Link} to="/login" sx={{ color: "white" }}>
                Login
              </Button>
              <Button component={Link} to="/register" sx={{ color: "white" }}>
                Register
              </Button>
            </>
          ) : (
            <Button onClick={handleLogout} sx={{ color: "white" }}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
