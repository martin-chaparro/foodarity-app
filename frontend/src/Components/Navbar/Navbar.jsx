import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import StoreIcon from '@mui/icons-material/Store';
import Logo from '../../assets/Mobil-Full-Header-Logo.png';
import Avatar from './Avatar';
import { apiWithToken } from '../../services/api';
import { startLogout } from '../../redux/actions/authActions';
// import Drawer from '../Drawer/Drawer';

import avatarDefault from '../../assets/avatar_default.png';

export default function Navbar() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const location = useLocation();

  const [currentPath, setCurrentPath] = React.useState('');
  const [user, setUser] = React.useState({});

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  React.useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  React.useEffect(() => {
    if (id)
      apiWithToken.get(`/users/${id}`).then((res) => {
        setUser(res.data);
      });
  }, [id]);

  const handleProfileMenuOpen = (event) => {
    if (isMenuOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogOut = () => {
    dispatch(startLogout());
    handleMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    if (isMenuOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const menuItems = (
    <span>
      {id && currentPath !== '/profileuser' && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="vista-mobile"
            aria-haspopup="true"
            color="secondary"
          >
            <Avatar />
          </IconButton>
          <Link
            to="/profileuser"
            textDecoration="none"
            onClick={handleMenuClose}
          >
            {user.name ? user.name : 'Mi Cuenta'}
          </Link>
        </MenuItem>
      )}
      {id && user.company && currentPath !== '/profilecompany' && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="vista-mobile"
            aria-haspopup="true"
            color="secondary"
          >
            <StoreIcon />
          </IconButton>
          <Link
            to="/profilecompany"
            textDecoration="none"
            onClick={handleMenuClose}
          >
            {/* {user.company && (user.company.company_type_id === 1 ? 'Mi comercio' : 'Mi ONG')} */}
            {user.company.name}
          </Link>
        </MenuItem>
      )}
      {id &&
        !user.company &&
        currentPath !== '/rollselector/registerformcommerce' && (
          <MenuItem>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="vista-mobile"
              aria-haspopup="true"
              color="secondary"
            >
              <StoreIcon />
            </IconButton>
            <Link
              to="/rollSelector/registerformcommerce"
              textDecoration="none"
              onClick={handleMenuClose}
            >
              Añadir comercio
            </Link>
          </MenuItem>
        )}
      {id &&
        !user.company &&
        currentPath !== '/rollselector/register_form_ong' && (
          <MenuItem>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="vista-mobile"
              aria-haspopup="true"
              color="secondary"
            >
              <StoreIcon />
            </IconButton>
            <Link
              to="/rollSelector/register_form_ong"
              textDecoration="none"
              onClick={handleMenuClose}
            >
              Añadir ONG
            </Link>
          </MenuItem>
        )}
      {id && currentPath === '/home' && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge>
              <FavoriteIcon fontSize="small" color="secondary" />
            </Badge>
          </IconButton>
          <p>Favoritos</p>
        </MenuItem>
      )}
      {id && currentPath === '/home' && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge>
              <ShoppingCartIcon color="secondary" />
            </Badge>
          </IconButton>
          <p>Mi Carrito</p>
        </MenuItem>
      )}
      {!id && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <AppRegistrationIcon color="secondary" />
          </IconButton>
          <Link to="/register" textDecoration="none" onClick={handleMenuClose}>
            Registrarse
          </Link>
        </MenuItem>
      )}
      {!id && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <LoginIcon color="secondary" />
          </IconButton>
          <Link to="/login" textDecoration="none" onClick={handleMenuClose}>
            Iniciar Sesión
          </Link>
        </MenuItem>
      )}
      {id && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            href="/"
          >
            <LogoutIcon color="secondary" />
          </IconButton>
          <Link to="/" onClick={handleLogOut} textDecoration="none">
            Cerrar Sesión
          </Link>
        </MenuItem>
      )}
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="web-vista-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <HelpIcon color="secondary" />
        </IconButton>
        <p>Ayuda</p>
      </MenuItem>
    </span>
  );

  const menuId = 'web-vista-account-menu';
  const renderMenu = (
    <Menu
      sx={{ zIndex: 10010, marginTop: 5.3 }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {menuItems}
    </Menu>
  );

  const mobileMenuId = 'vista-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {menuItems}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, zIndex: 10000, position: 'absolute', top: 0 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1, marginTop: 1 }}
          >
            {/* <Drawer filtrado={filtrado} /> */}
          </IconButton>
          <Link to="/home">
            <img src={Logo} alt="Logo" />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={3} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                photo={
                  // eslint-disable-next-line no-nested-ternary
                  user.photo
                    ? user.photo.url
                    : user.socialPhoto
                    ? user.socialPhoto
                    : avatarDefault
                }
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
