// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logoImage from '../../../assets/logo_credencial.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FAE178',
    padding: 10,
    width: '85.6mm',
    height: '53.98mm',
  },
  container: {
    borderColor: '#897005',
    borderStyle: 'solid',
    height: '100%',
    boxSizing: 'border-box',
    padding: 1,
  },
  container1: {
    borderTop: 1,
    borderColor: '#897005',
    borderStyle: 'solid',
    padding: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  container2: {
    boxSizing: 'border-box',
    borderWidth: 1,
    borderColor: '#897005',
    padding: 1,
    margin: 4,
    textAlign: 'center',
    height: 100,
    width: 80,
    fontSize: 15,
  },
  header: {
    fontSize: 8,
    textAlign: 'center',
    marginBottom: 10,
    color: '#5D4C03',
  },
  header1: {
    fontSize: 9,
    textAlign: 'left',
    marginBottom: 5,
    color: '#5D4C03',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 8,
    marginRight: 5,
    color: '#5D4C03',
  },
  label1: {
    fontSize: 8,
    marginRight: 1,
    color: '#5D4C03',
  },
  value: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 1,
    color: '#5D4C03',
  },
  footer: {
    marginTop: 10,
    fontSize: 6,
    textAlign: 'center',
    color: '#5D4C03',
  },
  column: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
  },
  logo: {
    width: 30,
    height: 30,
    margin: 1,
  },
});

const Credentials = ({ data }) => {
  return (
    <Document>
      <Page size={[242.65, 153]} style={styles.page}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image style={styles.logo} source={logoImage} />
            <View style={styles.column}>
              <Text style={styles.header}></Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.header}>RED NACIONAL DE BIBLIOTECAS PÚBLICAS</Text>
              <Text style={styles.header}>SERVICIO DE PRÉSTAMO A DOMICILIO</Text>
            </View>
          </View>
          <View style={styles.container1}>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.container2}></View>
              </View>
              <View style={styles.column}>
                <View style={{ ...styles.section, justifyContent: 'flex-end' }}>
                  <Text style={styles.label}>Biblioteca No.</Text>
                  <View style={{ width: 20, height: 10, borderBottom: 1, borderColor: '#897005' }}>
                    <Text style={styles.label}>2320</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={{ ...styles.label, marginRight: -5 }}>Nombre de usuario:</Text>
                  <View style={{ width: 50, height: 12, borderBottom: 1, borderColor: '#897005' }}>
                    <Text style={{ ...styles.value, marginRight: 40 }}>{data.username}</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={{ ...styles.label, marginRight: -5 }}>Lector:</Text>
                  <View style={{ width: 100, height: 12, borderBottom: 1, borderColor: '#897005' }}>
                    <Text style={{ ...styles.value, marginRight: 30 }}>{data.lastName} {data.firstName}</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={{ ...styles.label, marginRight: -2 }}>Domicilio:</Text>
                  <View style={{ width: 100, height: 12, borderBottom: 1, paddingLeft: 5, borderColor: '#897005' }}>
                    <Text style={{ ...styles.value, marginRight: -1 }}>{data.address}</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={{ ...styles.label, marginRight: -15, borderColor: '#897005' }}>Fecha de vencimiento: </Text>
                  <Text style={styles.value}>__________</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
      <Page size={[242.65, 153]} style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.header1}>Se acredita al lector para:</Text>
          <Text style={styles.label}>• Obtener en préstamo a domicilio hasta tres libros simultáneamente durante una semana.</Text>
          <Text style={styles.label}>• Renovar el préstamo siempre que otra persona no lo haya solicitado.</Text>
          <Text style={styles.label}>• Apartar libros que se encuentren prestados.</Text>
          <Text style={styles.header1}>El lector se obliga a:</Text>
          <Text style={styles.label}>• Conservar en buen estado los materiales de la biblioteca.</Text>
          <Text style={styles.label}>• Devolver los libros prestados a domicilio en la fecha indicada.</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.footer}>____________________</Text>
              <Text style={styles.footer}> Firma del lector</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.footer}>_______________________________________</Text>
              <Text style={styles.footer}> Firma del encargado de la biblioteca</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

Credentials.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default Credentials;