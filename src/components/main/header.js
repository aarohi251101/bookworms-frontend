import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import HomeIcon from '@mui/icons-material/Home';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import Avatar from "@mui/material/Avatar";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Button from "@mui/material/Button";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from '@mui/icons-material/Logout';
import {
  AccountCircle,
  AppRegistration,
  Home,
  Login,
  MoreVert,
  Subscriptions,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ListItemIcon, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

const pages = [
  {
    name: "Books",
    link: "/main/browsenovel",
  },
  {
    name: "Queries",
    link: "/main/browseQuery",
  }
];

const guestUser = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon style={{color:"#d5cecc"}} />,
  },
  {
    name: "Login",
    link: "/main/login",
    icon: <Login  style={{color:"#d5cecc"}}/>,
  },
  {
    name: "Signup",
    link: "/main/signup",
    icon: <AppRegistration  style={{color:"#d5cecc"}}/>,
  },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElGuest, setAnchorElGuest] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const user = sessionStorage.getItem("user");

  useEffect(() => {
    setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
  }, [user]);

  const navigate = useNavigate();

  const logout = () => {
    setAnchorElUser(null);
    sessionStorage.removeItem("user");
    navigate("/main/login");
  };

  const userMenu = [
    {
      name: "Profile",
      icon: <AccountCircle />,
      link: "/user/profile",
    },
    {
      name: "Add your book",
      icon: <LibraryBooksIcon />,
      link: "/user/addNovel",
    },
    {
      name: "Manage Books",
      icon: <EditIcon />,
      link: "/user/manageNovel",
    },
    {
      name: "Add your Query",
      icon: <QueryStatsIcon />,
      link: "/user/addQuery",
    },
    {
      name: "Manage Queries",
      icon: <EditAttributesIcon />,
      link: "/user/manageQuery",
    },
    {
      name: "Logout",
      icon: <LogoutIcon />,
      click: logout,
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor:"#695650fc"}}>
      <Container maxWidth="xl" style={{paddingLeft:50,paddingRight:50}}>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            color="d5cecc"
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            BOOKWORMS
          </Typography>

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
              {pages.map(({ name, link }) => (
                <MenuItem key={name} onClick={(e) => navigate(link)}>
                  <Typography textAlign="center" style={{color:"d5cecc"}}>{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            color="black"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            BOOKWORMS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ name, link }) => (
              <Button
                key={name}
                onClick={(e) => navigate(link)}
                sx={{ my: 2, color: "#d5cecc", display: "block" }}
              >
                {name}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {guestUser.map(({ name, link, icon }) => (
              <Tooltip title={name}>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={(e) => navigate(link)}
                  sx={{ mr: 2 }}
                >
                  {icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
          {currentUser !== null && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src="http://localhost:5000/images/user.png" />
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
                {userMenu.map(({ name, icon, link, click }) => (
                  <MenuItem
                    key={name}
                    onClick={link ? (e) => navigate(link) : click}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{name}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <Box sx={{ flexGrow: 0, ml: 3, display: { xs: "flex", md: "none" } }}>
            <Tooltip title="User Options">
              <IconButton
                onClick={(e) => setAnchorElGuest(e.currentTarget)}
                sx={{ p: 0 }}
                color="inherit"
              >
                <MoreVert />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElGuest}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElGuest)}
              onClose={(e) => setAnchorElGuest(null)}
            >
              {guestUser.map(({ name, icon, link }) => (
                <MenuItem key={name} onClick={(e) => navigate(link)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{name}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
