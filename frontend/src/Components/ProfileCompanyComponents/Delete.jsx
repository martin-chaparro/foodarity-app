// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates

import { apiWithToken } from '../../services/api';
import styles from './CompanyDetail.module.css';

function Delete({ company }) {
  function handleDelete() {
    // eslint-disable-next-line no-alert
    if (window.confirm('Queres eliminar esta compania?')) {

      apiWithToken.delete(`/companies/disabled/${company.id}`);
      window.location.reload();
    }
  }

  return (
    
      <div className={styles.companydetail}>
        <div className={styles.btncont}>
        <button
          type="submit"
          className={styles.btn}
          onClick={() => {
            // eslint-disable-next-line no-undef
            handleDelete();
          }}
        >
          ELIMINAR CUENTA
        </button>
        </div>
      </div>

  );
}

export default Delete;
