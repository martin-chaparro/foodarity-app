import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import FaceIcon from '@mui/icons-material/Face';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
// import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
// import PrimarySearchAppBar from '../Navbar/NavbarCommerce';
import MoreIcon from '@mui/icons-material/MoreVert';
import UserDetail from './UserDetail';
import Compras from './Compras';
import AvatarCommerce from '../Navbar/AvatarCommerce';
import Logo from '../../assets/Mobil-Full-Header-Logo.png';

const drawerWidth = 240;

function ProfileUserTemplate(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // eslint-disable-next-line no-unused-vars
  const [display, setDisplay] = React.useState(-1);

  function handleDisplay(index) {
    setDisplay(index);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          {
            text: 'Mis Datos',
          },
          {
            text: 'Mis Compras',
          },
        ].map(({ text }, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              handleDisplay(index);
            }}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <FaceIcon /> : <ShoppingBasketIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Centro de Ayuda', 'Eliminar Cuenta'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <HelpIcon /> : <DeleteSweepIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <PrimarySearchAppBar /> */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        {/* <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            LILIANA
          </Typography>
        </Toolbar> */}
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <p>Mi Portal</p>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AvatarCommerce />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              // aria-controls={mobileMenuId}
              aria-haspopup="true"
              // onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar display="none" />
        {display === 0 && <UserDetail />}

        {display === 1 && <Compras />}
        {display === 2 && <h1>COMENTARIOS</h1>}

        {display === 3 && <h1>MIS PEDIDOS</h1>}
      </Box>
    </Box>
  );
}

ProfileUserTemplate.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  // eslint-disable-next-line react/require-default-props
  window: PropTypes.func,
};

export default ProfileUserTemplate;
