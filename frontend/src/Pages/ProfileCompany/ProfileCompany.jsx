import React from 'react';

import styles from './ProfileCompany.module.css';
import ResponsiveDrawer from './ResponsiveDrawer';

export default function ProfileCompany() {
  return (
    <div className={styles.profilecompany}>
      {/* <div className={styles.nav}>
        <h1>aca va un NAV</h1>
          </div>
           */}
      <ResponsiveDrawer />
    </div>
  );
}
