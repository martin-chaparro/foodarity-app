// import React from 'react';
// import { Link } from 'react-router-dom';
// import { styles } from './OngSeccion.style';

// function OngSeccion({ong}) {
//   return <div>
//     <Link to={`/company/${ong.id}`}>
//    <img src={ong.logo.url} alt='' className={styles.imgOngs}/> 
//     </Link>
//   </div>;
// }

// export default OngSeccion
























import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import styles from './OngSeccion.module.css';

export default function OngSeccion({ong}) {

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  margin: 8,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', 
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));
 


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', minWidth: 200, width: '100%', }}>
     <Link to={`/company/${ong.id}`}>
        <ImageButton
          focusRipple
          key={ong.id}
          sx={{width:'100%'}}
        >
           <img src={ong.logo ? ong.logo.url : ''} alt='' className={styles.imgOngs}/>
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {ong.name}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
        </Link>
    </Box>

  );
}

