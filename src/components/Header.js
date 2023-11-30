import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { useCart } from "../context/cart";
import { Link } from "react-router-dom";

const pages = ["Recomendados", "Registrate", "Iniciar sesión"];

const Header = () => {
  const { cart } = useCart();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [total, setTotal] = useState(0);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    const cartTotal = cart.reduce(
      (acc, item) => acc + item.totalPrice + item.iva,
      0
    );

    setTotal(cartTotal);
  }, [cart]);

  const renderLogo = () => (
    <Typography
      variant={'h5'}
      noWrap
      component="a"
      href="/"
      sx={{
        mr: 2,
        fontFamily: "Poppins",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      LOGO
    </Typography>
  );

  const renderMobileMenu = () => (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
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
            <Link
              textAlign="center"
              style={{
                color: "#042940",
                textTransform: "capitalize",
                textDecoration: "none",
              }}
            >
              {page}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  const renderDesktopMenu = () => (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "flex-end",
      }}
    >
      {pages.map((page) => (
        <Link
          key={page}
          onClick={handleCloseNavMenu}
          style={{
            my: 2,
            color: "#FFFFFF",
            display: "block",
            textTransform: "capitalize",
            textDecoration: "none",
            padding: "0 10px",
          }}
        >
          {page}
        </Link>
      ))}
    </Box>
  );

  return (
    <Box sx={{ width: "100%", position: "fixed", top: 0, zIndex: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#072942" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {renderMobileMenu()}
            {renderLogo()}
            {renderDesktopMenu()}
            <Box>
              <Typography>Total ${total.toFixed(2)}</Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ backgroundColor: "#dcf22b", padding: "10px 0" }}>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", md: "flex-end" },
            gap: "20px",
            alignItems: "center",
          }}
        >
          <Typography variant="body2">Medellín, Colombia</Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ display: "flex", alignItems: "center" }}
          >
            Ingresa tu dirección <RoomOutlinedIcon />
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
