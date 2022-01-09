import * as React from 'react';

import styles from './Pagination.module.css';

export default function Pagination({ paginado, products, productsPerPage }) {
  const pageNumbers = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(products / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.botoneraContent}>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              // eslint-disable-next-line react/button-has-type
              <button
                className={styles.btn}
                key={number}
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            );
          })}
      </ul>
    </nav>
  );
}
