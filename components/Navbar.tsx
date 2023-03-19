import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import Image from "next/image";
import { loginWithGoogle, logout } from "./AuthOps";
import { setIsLoginPopupOpen } from "@/redux/reducers/acctData";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Login from "./Login";

const pages = ["Decode", "About"];

const Navbar = () => {
  // side bar management functions
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // user account management functions
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // login and logout functions
  const { username, userEmail, usageCount, isLoginPopupOpen } = useAppSelector(
    (state: any) => state.acctData
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogin = async () => {
    // dispatch(loginWithGoogle());
    dispatch(setIsLoginPopupOpen(true)); // The login component is now handled by the Navbar so that it can popup on every page
  };
  const handleLogout = async () => {
    router.push("/");
    dispatch(logout());
  };

  const handleLoginDialogClose = () => {
    dispatch(setIsLoginPopupOpen(false));
  };

  // route protection
  if (!username && router.asPath === "/decode") {
    dispatch(setIsLoginPopupOpen(true));
  }
  console.log("isLoginPopupOpen", isLoginPopupOpen);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* brand on the desktop screen */}
            <AirplaneTicketIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Box
              sx={{ display: { xs: "none", md: "flex" }, flexGrow: 0, mr: 2 }}
            >
              <Link href={"/"}>
                <h3
                  style={{
                    fontFamily:
                      "-apple-system, Arial, Roboto, Helvetica,  Poppins ",
                    fontSize: 26,
                  }}
                >
                  chatAero
                </h3>
              </Link>
            </Box>

            {/* menu icon on the desktop screen */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link href={page.toLowerCase()}>{page}</Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* brand on the small screen */}
            <AirplaneTicketIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
              <Link href={"/"}>
                <h3
                  style={{
                    fontFamily:
                      "-apple-system, Arial, Roboto, Helvetica,  Poppins ",
                    fontSize: 26,
                  }}
                >
                  chatAero
                </h3>
              </Link>
            </Box>

            {/* menu on the desktop screen */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link href={page.toLowerCase()}>{page}</Link>
                </Button>
              ))}
            </Box>

            {/* user account management */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={username} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {username ? (
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Log out</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleLogin}>
                    <Typography textAlign="center">Log in</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Login open={isLoginPopupOpen} onClose={handleLoginDialogClose} />
    </>
  );
};

export default Navbar;
