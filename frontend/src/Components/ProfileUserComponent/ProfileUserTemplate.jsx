import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import UserDetail from './UserDetail';
import Compras from './Compras';
import Bienvenida from './Bienvenida';
import { apiWithToken } from '../../services/api';

const drawerWidth = 240;

const generalHeight = 58;

function ProfileUserTemplate(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const id = localStorage.getItem('id');

  const [userData, setUserData] = React.useState({});

  // eslint-disable-next-line no-unused-vars
  const [display, setDisplay] = React.useState(0);

  function handleDisplay(index) {
    setDisplay(index);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    apiWithToken
      .get(`/users/${id}`)
      .then((response) => setUserData(response.data));
  }, []);
  console.log(userData);

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <Divider sx={{ height: generalHeight, border: 0, margin: 0 }} />
      <List>
        {[
          {
            text: 'Bienvenid@',
          },
          {
            text: 'Mis Compras',
          },
          {
            text: 'Mis Datos',
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
              {index % 2 === 0 ? (
                <FaceIcon />
              ) : (
                <FaceIcon /> && <ShoppingBasketIcon />
              )}
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
    <div sx={{ position: 'inherital' }}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `100%`, zIndex: 9999 },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar sx={{ height: generalHeight * 2 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ paddingTop: generalHeight / 7.5 }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              {/* <div>{userData.name}</div> */}
            </Typography>
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
            marginTop: 15,
          }}
        >
          {display === 0 && <Bienvenida detail={userData} />}

          {display === 1 && <UserDetail detail={userData} />}
          {display === 2 && <Compras />}

          {display === 3 && <h1>MIS PEDIDOS</h1>}
          {display === 4 && <h1>MIS PEDIDOS</h1>}
        </Box>
      </Box>
    </div>
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
