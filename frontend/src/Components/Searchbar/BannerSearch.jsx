import React from 'react';
import { IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import estilo from './BannerSearch.module.css';
import SearchBar from './Searchbar';
import Drawer from '../Drawer/Drawer';
// import hero1 from '../../assets/hero1.jpg';

function goDown () {
  window.scrollTo({top: (window.innerHeight + 200), behavior: 'smooth'})
}

export default function BannerSearch({ search, lote, filtrado }) {
  return (
    <div className={estilo.body}>
      <div className={estilo.heroimage}>
        <div className={estilo.arrowDiv}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ color: 'white', marginTop: 1, textStyle: 'bold', userSelect: 'none', }}
          >
            PRODUCTOS
          </Typography>
          <IconButton onClick={goDown}>
            <KeyboardArrowDownIcon
              className={estilo.goDown}
              sx={{
                fontSize: 50,
                position: 'relative',
                bottom: 5,
                backgroundColor: '#7ED957',
                borderRadius: '100%',
                '&:hover': { backgroundColor: '#7ED95790 !important' },
              }}
            />
          </IconButton>
        </div>
        <div className={estilo.container}>
          <h1>
            <span>Ahorre, Ayude y contribuya al planeta</span>
          </h1>
          <div className={estilo.search}>
            <SearchBar sx={{ marginTop: '10em' }} search={search} lote={lote} />
            <div className={estilo.btn}>
              <Drawer filtrado={filtrado} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
