import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer
      className={`${styles.footer} d-flex flex-row align-items-center justify-content-center p-20`}
    >
      <span className="p-3">Copyright © 2023 PLC, Inc.</span>
    </footer>
  );
}

export default Footer;