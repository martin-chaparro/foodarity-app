import React from 'react';
import styles from './PostNewBatch.module.css';
// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-duplicates
import TextFieldSizes from './TextFieldSizes';
import MultilineTextFields from './MultiLineTextFields';
// eslint-disable-next-line import/no-duplicates
// import MultilineTextFields from './InputPostNewBatch';

export default function PostNewBatch() {
  return (
    <div className={styles.formcont}>
      <form className={styles.formcont}>
        <div>
          <TextFieldSizes />
        </div>
        <div>
          <MultilineTextFields />
        </div>
      </form>
    </div>
  );
}
