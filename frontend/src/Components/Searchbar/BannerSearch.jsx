import React from 'react';
import estilo from './BannerSearch.module.css';
import SearchBar from './Searchbar';
import Drawer from '../Drawer/Drawer';
// import hero1 from '../../assets/hero1.jpg';

export default function BannerSearch({ search, lote, filtrado }) {
  return (
    <body className={estilo.body}>
      <div className={estilo.heroimage}>
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
    </body>
  );
}
