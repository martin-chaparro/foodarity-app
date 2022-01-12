import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'right' || anchor === 'bottom' ? 'auto' : 300,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <CategoryIcon color="secondary" />
          <p color="secondary" fontStyle="bold">
            TODAS LAS CATEGORIAS
          </p>

          <ArrowBackIosTwoToneIcon
            color="secondary"
            cursor="pointer"
            sx={{ width: '10em', hover: 'true' }}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Button
            variant="contained"
            color="secondary"
            fontStyle="bold"
            backgroundColor="primary"
            src="#"
          >
            TODAS LAS CATEGORIAS
          </Button>
          <ListItemText />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{ backgroundColor: 'transparent' }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon color="secondary" sx={{ fontSize: '2.5em' }} />
          </Button>
          <SwipeableDrawer
            sx={{ backgroundColor: 'primary' }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
