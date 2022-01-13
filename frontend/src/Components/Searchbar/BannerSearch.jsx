import React from 'react';
import estilo from './BannerSearch.module.css';
import SearchBar from './Searchbar';
// import hero1 from '../../assets/hero1.jpg';

export default function BannerSearch({ search, lote }) {
  return (
    <body>
      <div className={estilo.heroimage}>
        <div className={estilo.container}>
          <h1>
            <span>¿Qué prepararás hoy?</span>
          </h1>
          <div className={estilo.search}>
            <SearchBar sx={{ marginTop: '10em' }} search={search} lote={lote} />
          </div>
        </div>
      </div>
    </body>
  );
}
