/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import Credentials from './Credentials.jsx';
import { HiOutlinePrinter } from 'react-icons/hi';

const PdfCredentialsCard = ({ user }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const styles = {
    container: {
      width: '220px',
      borderRadius: '5px',
      padding: '15px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    },
    flex: { width: '100%', display: 'flex', gap: '5px', alignItems: 'center' },
    bold: { fontSize: '13px', fontWeight: 600 },
    thin: { fontSize: '11px', color: '#6f6f6f', fontWeight: 500 },
    btn: {
      borderRadius: '3px',
      border: '1px solid gray',
      backgroundColor: '#4CAF50',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2px',
      padding: '10px 20px',
      fontSize: '13px',
      color: 'white',
      fontWeight: 600,
      cursor: 'pointer',
      userSelect: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.flex}>
        <span style={styles.bold}>Credenciales</span>
      </div>
      {userData && (
        <BlobProvider document={<Credentials data={userData} />}>
          {({ url, blob }) => (
            <a href={url} target="_blank" style={styles.btn}>
              <HiOutlinePrinter size={14} />
              <span>Imprimir</span>
            </a>
          )}
        </BlobProvider>
      )}
    </div>
  );
};

export default PdfCredentialsCard;