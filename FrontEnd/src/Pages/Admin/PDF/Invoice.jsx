/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {  Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
//import logoImage from '../assets/logoPDF.jpg'; 
import logoImage from '../../../assets/logoPDF.jpg'
//import People from '../assets/icons8-pa.png';
import Peopler from '../../../assets/icons8-pr.png';
import {useGetStatistics} from './../../../hooks/consult.hook';
const MyPDFDocument = () => {
  const { stats, loading, error} = useGetStatistics();
  const [data, setData] = useState(null);


// Datos simulados (reemplazar con datos reales si es necesario)
  useEffect(() => {
    if (stats) {
      const formattedData = {
  entidad: "ZACATECAS",
  localidad: "JUAN ALDAMA",
  municipio: "JUAN ALDAMA",
  biblioteca: "RAMON LOPEZ VELARDE",
  encargado: "IRMA MARTINEZ B",
  coleccion:"2320",
  mes: "MAYO",
  fecha: "28-MAYO-24",
  usuariosAtendidos: {
    mayores60: { hombres: stats.menOverSixty || 0, mujeres: stats.womenOverSixty || 0, discapacidad: 0 },
    entre30y59: { hombres: stats.menBetween30And59 || 0, mujeres: stats.womenBetween30And59 || 0, discapacidad: 0 },
    entre18y29: { hombres: stats.menBetween18AndT29 || 0, mujeres: stats.womenBetween18AndT29 || 0, discapacidad: 0 },
    entre13y17: { hombres: stats.menBetween13AndT17 || 0, mujeres: stats.womenBetween13AndT17 || 0, discapacidad: 0 },
    entre0y12: { hombres: stats.menBetween0AndT12 || 0, mujeres: stats.womenBetween0AndT12 || 0, discapacidad: 0 },
    total: stats.totalMen + stats.totalWomen || 0,
},
  UserAtendidos:{
    mayores60: { Actividades: 0 },
    entre30y59: { Actividades: 0 },
    entre18y29: { Actividades: 0 },
    entre13y17: { Actividades: 0 },
    entre0y12: { Actividades: 0 },
    total: 0,
    asistentes:{
      mayores60: { hombres: 0, mujeres: 0},
      entre30y59: { hombres: 8, mujeres: 14},
      entre18y29: { hombres: 0, mujeres: 4},
      entre13y17: { hombres: 5, mujeres: 5},
      entre0y12: { hombres: 10, mujeres: 34},
    }
  },
  nivelAcademico: {
    prescolar: stats.totalPreescolar || 0,
    primaria: stats.totalPrimaria || 0,
    secundaria: stats.totalSecundaria || 0,
    bachillerato: stats.totalPreparatoria || 0,
    licenciatura: stats.totalLicenciatura || 0,
    posgrado: stats.totalPosgrado || 0,
  },
  ocupacion: {
    hogar: stats.occupationHogar || 0,
    empleado: stats.occupationEmpleado || 0,
    estudiante: stats.occupationEstudiante || 0,
    desocupado: stats.occupationDesocupado || 0,
  },
  materiales: {
    general: "",
    consulta: "",
    infantil: "",
    publicaciones: "",
    audiovisual: "",
    ludoteca: "",
    braille: "",
    estatal: "",
    especial: "",
    otra: "",
  },
  prestamos: {
    credenciales: "",
    libros: "",
  },
};

console.log('Formatted Data:', formattedData); // Verifica que data esté correcta
setData(formattedData);
}
}, [stats]);
if (loading) {
  return (
    <Document>
      <Page>
        <Text>Cargando...</Text>
      </Page>
    </Document>
  );
}

if (error) {
  return (
    <Document>
      <Page>
        <Text>Error: {error.message}</Text>
      </Page>
    </Document>
  );
}

if (!data) {
  return (
    <Document>
      <Page>
        <Text>No hay datos disponibles</Text>
      </Page>
    </Document>
  );
}
return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <Header />
        <DatosIdentificados  data={data} />
        <UsuariosAtendidos  data={data.usuariosAtendidos}/>
        <NivelAcademico data={data.nivelAcademico} />
        <Ocupacion  data={data.ocupacion} />
        <Materiales  data={data.materiales} />
       <MaterialesServicios  data={data.materiales}/>
       <Prestamos data={data.prestamos} />
       <Footer />
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <Header />
        <UserAtendidos data={data.UserAtendidos}/>
        <VisiGuiadas  data={data.UserAtendidos}/>
        <ModuloServicios data={data.UserAtendidos} />
        <Observaciones />
       
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <Header />
        <ActArt data={data.UserAtendidos} />
        <Observaciones1 />
        <Footer3 />
      </View>
    </Page>
   
  </Document>
);
};
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF', // Color de fondo blanco para la página
    padding: 15,
    boxSizing: 'border-box', // Hace que el borde esté dentro de las dimensiones totales
    width: '100%',
    height: '100%',
  },
  container: {
    borderWidth: 4, // Grosor del borde
    borderColor: 'black', // Color del borde
    borderStyle: 'solid', // Estilo del borde
    height: '100%', // Ajusta la altura para que el borde esté contenido
    boxSizing: 'border-box', // Asegura que el borde esté dentro de las dimensiones totales
    padding: 10, // Añade espacio de relleno dentro del borde
  },
  section: {
   
    margin: 2,
    padding: 2,
  },
  table1: {
    display: 'table',
    width:'auto',
    flexDirection: 'column',
   // border: '1px solid black',
    marginBottom: 5,
    boxSizing: 'border-box',
    fontSize: 7,
    backgroundColor: 'transparent', // Fondo transparente
  },
  table: {
    display: 'table',
    width:'auto',
    flexDirection: 'column',
   // border: '1px solid black',
    marginBottom: 5,
    boxSizing: 'border-box',
    fontSize: 10,
    backgroundColor: 'transparent', // Fondo transparente
  },
  column: {
    flexDirection: 'column',
    flexGrow:1,
  },
  row: {
    flexDirection: 'row',

  },
  cell: {
    height:40,
    display:'flex',
    justifyContent:'center',
    padding: 1,
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'transparent', // Fondo transparente
    margin: 4, // Margen entre las cajas de los iconos
  },
  cell3: {
    height:40,
    display:'flex',
    justifyContent:'center',
    padding: 10,
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'transparent', // Fondo transparente
    margin: 1, // Margen entre las cajas de los iconos
  },
  cell5: {
    // height:40,
     //display:'flex',
    // justifyContent:'center',
     padding: 10,
    // flex: 1,
     textAlign: 'center',
     backgroundColor: 'transparent', // Fondo transparente
    // margin: 1, // Margen entre las cajas de los iconos
   },
  cell1: {
     border: '1px solid black',
     padding: 1,
     flex: 1,
     textAlign: 'center',
     justifyContent:'center',
     backgroundColor: 'transparent', // Fondo transparente
     margin:2,
     height:15,
   },
   cell2: {
    borderWidth: 1,
    borderColor: '#000',
    //padding: 1, // Ajusta el padding para que quepa el texto
    margin: 2,
    textAlign: 'center',
    height: 20,
    width:80,
    display: 'flex',
    justifyContent: 'center',
    fontSize:12, // Ajusta el tamaño de la fuente para que quepa en los cuadros
  },

  cell4: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 1, // Ajusta el padding para que quepa el texto
    margin: 2,
    textAlign: 'center',
    height: 25,
    width:40,
    display: 'flex',
    justifyContent: 'center',
    fontSize:15, // Ajusta el tamaño de la fuente para que quepa en los cuadros
  },
  cell7: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 1, // Ajusta el padding para que quepa el texto
    margin: 2,
    textAlign: 'center',
    height: 100,
    width:525,
    display: 'flex',
    justifyContent: 'center',
    fontSize:15, // Ajusta el tamaño de la fuente para que quepa en los cuadros
  },
  cell8: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 1, // Ajusta el padding para que quepa el texto
    margin: 2,
    textAlign: 'center',
    height: 500,
    width:525,
    display: 'flex',
    justifyContent: 'center',
    fontSize:15, // Ajusta el tamaño de la fuente para que quepa en los cuadros
  },
  headerCell: {
   // backgroundColor: '#DEDEDE',
    fontWeight: 'bold',
  },
  doubleCell: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain', // Ajusta la imagen al tamaño del contenedor
    marginRight: 10, // Margen derecho para separar el logo del texto
  },
  footer1: {
    fontSize:10,
    marginRight: 10, // Margen derecho para separar el logo del texto
  },
  title: {
    fontSize: 12, // Ajusta el tamaño de los títulos según sea necesario
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#DEDEDE',
    padding: 2,
  },
  title9: {
    fontSize: 7, // Ajusta el tamaño de los títulos según sea necesario
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#DEDEDE',
   // padding: 2,
  },
  title1: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
   // backgroundColor: '#DEDEDE', // Fondo gris para los títulos
    padding: 2, // Relleno dentro del fondo gris
    //borderRadius: 10, // Bordes redondeados para el fondo gris
  },
  title5: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
   // backgroundColor: '#DEDEDE', // Fondo gris para los títulos
    padding: 5, // Relleno dentro del fondo gris
    //borderRadius: 10, // Bordes redondeados para el fondo gris
  },
  title6: {
    fontSize: 7,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
   // backgroundColor: '#DEDEDE', // Fondo gris para los títulos
    padding: 2, // Relleno dentro del fondo gris
    //borderRadius: 10, // Bordes redondeados para el fondo gris
  },

  title2: {
    fontSize: 12, // Ajusta el tamaño de los títulos según sea necesario
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 1,
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 10,
  },

  headerText: {
    marginLeft: 'auto', // Mueve este contenedor al final de la línea
    textAlign: 'right',
    fontSize: 10,
  },
  icon: {
    //paddingTop:20,
    width: 25,
    height: 25,
    margin: 1,
    borderRadius:100,
  },
});

const Header = () => (
  <View style={styles.section}>
    <View style={styles.header}>
      <Image style={styles.logo} source={logoImage} />
      <View>
        <Text style={styles.title5}>RED NACIONAL DE BIBLIOTECAS PÚBLICAS</Text>
        <Text style={styles.title1}>                       ESTADÍSTICA MENSUAL</Text>
      </View>
      <View style={styles.headerText}>
        <Text>Dirección General</Text>
        <Text>Biblioteca Juan Aldama</Text>
        <Text>Dirección General</Text>
      </View>
    </View>
  </View>
);

const DatosIdentificados = ({data}) => (
  <View style={styles.section}>
    <Text style={styles.title2}>DATOS DE IDENTIFICACIÓN</Text>
    
  <View style={styles.table1}>
    <View style={styles.row}>
      <Text style={[styles.cell, styles.headerCell, styles.doubleCell]}>ENTIDAD</Text>
      <Text style={[styles.cell1, styles.doubleCell]}>{data.entidad}</Text>
      <Text style={[styles.cell, styles.headerCell, styles.doubleCell]}>LOCALIDAD</Text>
      <Text style={[styles.cell1, styles.doubleCell]}>{data.localidad}</Text>
      <Text style={[styles.cell, styles.headerCell]}>MUNICIPIO</Text>
      <Text style={styles.cell1}>{data.municipio}</Text>
    </View>

    <View style={styles.row}>
      <Text style={[styles.cell, styles.headerCell]}>NOMBRE DE LA BIBLIOTECA</Text>
      <Text style={styles.cell1}>{data.biblioteca}</Text>
      <Text style={[styles.cell, styles.headerCell]}>NO. COLECCIÓN</Text>
      <Text style={styles.cell1}>{data.coleccion}</Text>
      
    </View>

    <View style={styles.row}>
    <Text style={[styles.cell, styles.headerCell]}>NOMBRE DEL ENCARGADO</Text>
    <Text style={styles.cell1}>{data.encargado}</Text>
      <Text style={[styles.cell, styles.headerCell]}>MES QUE REPORTA</Text>
      <Text style={styles.cell1}>{data.mes}</Text>
      <Text style={[styles.cell, styles.headerCell]}>FECHA</Text>
      <Text style={styles.cell1}>{data.fecha}</Text>
    </View>
  </View>
  </View>
);
 

const UsuariosAtendidos = ({data}) => (
  <View style={styles.section}>
    <Text style={styles.title2}>DATOS ESTADISTICOS</Text>
    <hr></hr>
    <Text style={styles.title}>USUARIOS ATENDIDOS</Text>
    <View style={styles.table}>
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={[styles.cell, styles.headerCell]}> </Text>
        <Text style={[styles.cell, styles.headerCell]}>Mayores de 60</Text>
        <Text style={[styles.cell, styles.headerCell]}>De 30 a 59</Text>
        <Text style={[styles.cell, styles.headerCell]}>De 18 a 29</Text>
        <Text style={[styles.cell, styles.headerCell]}>De 13 a 17</Text>
        <Text style={[styles.cell, styles.headerCell]}>De 0 a 12</Text>
      </View>
      <View style={styles.column}>
         <Text style={[styles.cell3, styles.headerCell]}>HOMBRES</Text>
         <Text style={styles.cell2}>{data.mayores60.hombres}</Text>
         <Text style={styles.cell2}>{data.entre30y59.hombres}</Text>
         <Text style={styles.cell2}>{data.entre18y29.hombres}</Text>
         <Text style={styles.cell2}>{data.entre13y17.hombres}</Text>
         <Text style={styles.cell2}>{data.entre0y12.hombres}</Text>
      </View>
      <View style={[styles.column, { alignItems: 'center' }]}>
         <Text><Image style={[styles.icon ]} source={Peopler} /></Text>
         <Text style={styles.cell2}>{data.mayores60.discapacidad}</Text>
         <Text style={styles.cell2}>{data.mayores60.discapacidad}</Text>
         <Text style={styles.cell2}>{data.mayores60.discapacidad}</Text>
         <Text style={styles.cell2}>{data.mayores60.discapacidad}</Text>
         <Text style={styles.cell2}>{data.mayores60.discapacidad}</Text>
      </View>
      <View style={styles.column}>
         <Text style={[styles.cell3, styles.headerCell]}>MUJERES</Text>
         <Text style={styles.cell2}>{data.mayores60.mujeres}</Text>
         <Text style={styles.cell2}>{data.entre30y59.mujeres}</Text>
         <Text style={styles.cell2}>{data.entre18y29.mujeres}</Text>
         <Text style={styles.cell2}>{data.entre13y17.mujeres}</Text>
         <Text style={styles.cell2}>{data.entre0y12.mujeres}</Text>
      </View>
      <View style={[styles.column, { alignItems: 'center' }]}>
          <Image style={[styles.icon]} source={Peopler} />
          <Text style={styles.cell2}>{data.mayores60.discapacidad}</Text>
         <Text style={styles.cell2}>{data.mayores60.discapacidad}</Text>
         <Text style={styles.cell2}>{data.mayores60.discapacidad}</Text>
         <Text style={styles.cell2}>{data.mayores60.discapacidad}</Text>
         <Text style={styles.cell2}>{data.mayores60.discapacidad}</Text>
      </View>
      <View style={styles.column}>
      <Text style={[styles.cell, styles.headerCell]}> </Text>
      <Text style={[styles.cell, styles.headerCell]}></Text>
      <Text style={[styles.cell, styles.headerCell]}></Text>
      <Text style={[styles.cell, styles.headerCell]}>TOTAL</Text>
      <Text style={styles.cell2}>{data.total}</Text>
      <Text style={[styles.cell, styles.headerCell]}></Text>
      </View>
      </View>
  </View>
  
      </View>
   
);


const NivelAcademico = ({data}) => (
  <View style={styles.section}>
   
  <Text style={styles.title1}>NIVEL ACADÉMICO</Text>
  <View style={styles.table}>
 
 <View style={styles.row}>
   <View style={styles.column}>
     <Text style={[styles.cell, styles.headerCell]}>Prescolar</Text>
     <Text style={[styles.cell, styles.headerCell]}>Bachillerato</Text>
   </View>
   <View style={styles.column}>
     <Text style={styles.cell2}>{data.prescolar}</Text>
   <Text style={styles.cell2}>{data.bachillerato}</Text>
   </View>

   <View style={styles.column}>
   <Text style={[styles.cell, styles.headerCell]}>Primaria</Text>
   <Text style={[styles.cell, styles.headerCell]}>Licenciatura</Text>
   </View>
   <View style={styles.column}>
   <Text style={styles.cell2}>{data.primaria}</Text>
   <Text style={styles.cell2}>{data.licenciatura}</Text>
   </View>
   <View style={styles.column}>
   <Text style={[styles.cell, styles.headerCell]}>Secundaria</Text>
   <Text style={[styles.cell, styles.headerCell]}>Posgrado</Text>
   </View>
   <View style={styles.column}>
   <Text style={styles.cell2}>{data.secundaria}</Text>
   <Text style={styles.cell2}>{data.posgrado}</Text>
   </View>
 </View>
  </View>
  </View>
);

const Ocupacion = ({data}) => (
  <View style={styles.section}>
   
  <Text style={styles.title1}>OCUPACIÓN</Text>
  <View style={styles.table}>
 
 <View style={styles.row}>
   <View style={styles.column}>
     <Text style={[styles.cell, styles.headerCell]}>HOGAR</Text>
     <Text style={[styles.cell, styles.headerCell]}>ESTUDIANTE</Text>
   </View>
   <View style={styles.column}>
     <Text style={styles.cell2}>{data.hogar}</Text>
   <Text style={styles.cell2}>{data.estudiante}</Text>
   </View>

   <View style={styles.column}>
   <Text style={[styles.cell, styles.headerCell]}>EMPLEADO O TRABAJADOR</Text>
   <Text style={[styles.cell, styles.headerCell]}>DESOCUPADO</Text>
   </View>
   <View style={styles.column}>
   <Text style={styles.cell2}>{data.empleado}</Text>
   <Text style={styles.cell2}>{data.desocupado}</Text>
   </View>
  
 </View>
  </View>
  </View>
);

const Materiales = ({data}) => (
  <View style={styles.section}>
  <Text style={styles.title2}>MATERIALES UTILIZADOS</Text>
  <View style={styles.table}>
 <View style={styles.row}>
   <View style={styles.column}>
     <Text style={[styles.cell, styles.headerCell]}>COLECCIÓN GENERAL</Text>
     <Text style={[styles.cell, styles.headerCell]}> (000-900)</Text>
   </View>
   <View style={styles.column}>
     <Text style={styles.cell4}>{data.general}</Text>
   </View>
   <View style={styles.column}>
   <Text style={[styles.cell, styles.headerCell]}>COLECCIÓN DE CONSULTA </Text>
   <Text style={[styles.cell, styles.headerCell]}> (C 000- C900)</Text>
   </View>
   <View style={styles.column}>
   <Text style={styles.cell4}>{data.consulta}</Text>
   </View>
   <View style={styles.column}>
   <Text style={[styles.cell, styles.headerCell]}>COLECCIÓN INFANTIL</Text>
   <Text style={[styles.cell, styles.headerCell]}> (IC 000 - IC 900)(I 000-I 900)</Text>
   </View>
   <View style={styles.column}>
   <Text style={styles.cell4}>{data.infantil}</Text>
   </View>
 </View>
  </View>
  </View>
);
const MaterialesServicios = ({data}) => (
  <View style={styles.section}>
  <Text style={styles.title1}>MATERIALES DE SERVICIOS COMPLEMENTARIOS (SOLO EN ALGUNAS BIBLIOTECAS)</Text>
  <View style={styles.table}>
 <View style={styles.row}>
   <View style={styles.column}>
     <Text style={[styles.cell, styles.headerCell]}>PUBLICACIONESL</Text>
     <Text style={[styles.cell, styles.headerCell]}> PERIODICAS</Text>
   </View>
   <View style={styles.column}>
     <Text style={styles.cell4}>{data.publicaciones}</Text>
   </View>
   <View style={styles.column}>
   <Text style={[styles.cell, styles.headerCell]}>AUDIOVISUAL</Text>
   </View>
   <View style={styles.column}>
   <Text style={styles.cell4}>{data.audiovisual}</Text>
   </View>
   <View style={styles.column}>
   <Text style={[styles.cell, styles.headerCell]}>LUDOTECA</Text>
   </View>
   <View style={styles.column}>
   <Text style={styles.cell4}>{data.ludoteca}</Text>
   </View>
   <View style={styles.column}>
   <Text style={[styles.cell, styles.headerCell]}>BRAILLE</Text>
   </View>
   <View style={styles.column}>
   <Text style={styles.cell4}>{data.braille}</Text>
   </View>
 </View>
  </View>
  </View>
);

const Prestamos = ({data}) => (
  <View style={styles.section}>
  <Text style={styles.title2}>SERVICIOS DE PRESTAMO A DOMICILIO</Text>
  <View style={styles.table}>
 <View style={styles.row}>
   <View style={styles.column}>
     <Text style={[styles.cell, styles.headerCell]}>CREDENCIALES EXPEDIDAS</Text>
   </View>
   <View style={styles.column}>
     <Text style={styles.cell4}>{data.credenciales}</Text>
   </View>
   <View style={styles.column}>
   <Text style={[styles.cell, styles.headerCell]}>LIBROS PRESTADOS A DOMICILIO</Text>
   </View>
   <View style={styles.column}>
   <Text style={styles.cell4}>{data.libros}</Text>
   </View>
 </View>
  </View>
  </View>
);

// segunda pagina
const UserAtendidos =({data})=>(
  <View style={styles.section}>
  <Text style={styles.title2}>DATOS ESTADISTICOS</Text>
  <hr></hr>
  <Text style={styles.title}>USUARIOS ATENDIDOS</Text>
  <View style={styles.table}>
  <View style={styles.row}>
    <View style={styles.column}>
      <Text style={[styles.cell, styles.headerCell]}> </Text>

      <Text style={[styles.cell, styles.headerCell]}> </Text>
      <Text style={[styles.cell, styles.headerCell]}>Mayores de 60</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 30 a 59</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 18 a 29</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 13 a 17</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 0 a 12</Text>
      <Text style={[styles.cell, styles.headerCell]}>TOTALES</Text>
    </View>
    <View style={styles.column}>
       <Text style={[styles.cell3, styles.headerCell]}>Actividades</Text>
       <Text style={[styles.cell, styles.headerCell]}> </Text>
       <Text style={[styles.cell, styles.headerCell]}> </Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
    </View>
   
    <View style={styles.column}>
       <Text style={[styles.cell3, styles.headerCell]}>                                            ASISTENTES</Text>
       <View style={styles.row}>
          <View style={styles.column}>
                <Text style={[styles.cell3, styles.headerCell]}>HOMBRES</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
          </View>
          <View style={styles.column}>
                <Text style={[styles.cell3, styles.headerCell]}>MUJERES</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
          </View>
          </View>
    </View>
    </View>
</View>

    </View>
);
const VisiGuiadas =({data})=>(
  <View style={styles.section}>

  <Text style={styles.title}>VISITAS GUIADAS</Text>
  <View style={styles.table}>
  <View style={styles.row}>
    <View style={styles.column}>
      <Text style={[styles.cell, styles.headerCell]}> </Text>
      <Text style={[styles.cell, styles.headerCell]}> </Text>
      <Text style={[styles.cell, styles.headerCell]}>Mayores de 60</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 30 a 59</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 18 a 29</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 13 a 17</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 0 a 12</Text>
      <Text style={[styles.cell, styles.headerCell]}>TOTALES</Text>
    </View>
    <View style={styles.column}>
       <Text style={[styles.cell3, styles.headerCell]}>                                            ASISTENTES</Text>
       <View style={styles.row}>
          <View style={styles.column}>
                <Text style={[styles.cell3, styles.headerCell]}>HOMBRES</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
          </View>
          <View style={styles.column}>
                <Text style={[styles.cell3, styles.headerCell]}>MUJERES</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
          </View>
          </View>
    </View>
    <View style={styles.column}>
    <Text style={[styles.cell, styles.headerCell]}> </Text>
    <Text style={[styles.cell, styles.headerCell]}></Text>
    <Text style={[styles.title5, styles.headerCell]}>TOTAL DE VISITAS REALIZADAS PARA TODOS LOS </Text>
    <Text style={[styles.title5, styles.headerCell]}>                                           RANGOS DE EDAD</Text>
    <View style={styles.row}>
    <Text style={[styles.cell, styles.headerCell]}> </Text>
    <Text style={styles.cell2}> {data.total}</Text>
    <Text style={[styles.cell, styles.headerCell]}> </Text>
    </View>
    
    <Text style={[styles.cell, styles.headerCell]}></Text>
    </View>
    </View>
</View>

    </View>
);
const ModuloServicios=({data})=>(
  <View style={styles.section}>

  <Text style={styles.title}>MODULO DE SERVICIOS DIGITALES</Text>
  <View style={styles.table}>
  <View style={styles.row}>
    <View style={styles.column}>
      <Text style={[styles.cell, styles.headerCell]}> </Text>
      <Text style={[styles.cell, styles.headerCell]}> </Text>
      <Text style={[styles.cell, styles.headerCell]}> </Text>
      <Text style={[styles.cell, styles.headerCell]}> </Text>
      <Text style={[styles.cell, styles.headerCell]}>Mayores de 60</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 30 a 59</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 18 a 29</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 13 a 17</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 0 a 12</Text>
      <Text style={[styles.cell, styles.headerCell]}>TOTALES</Text>
    </View>
    <View style={styles.column}>
       <Text style={[styles.cell3, styles.headerCell]}>                                            ASISTENTES</Text>
       <Text style={[styles.cell3, styles.headerCell]}> </Text>
       <View style={styles.row}>
          <View style={styles.column}>
                <Text style={[styles.cell3, styles.headerCell]}>HOMBRES</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
          </View>
          <View style={styles.column}>
                <Text style={[styles.cell3, styles.headerCell]}>MUJERES</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
          </View>
          </View>
    </View>
    <View style={styles.column}>
       <Text style={[styles.cell3, styles.headerCell]}> </Text>
       <Text style={[styles.cell3, styles.headerCell]}>CURSOS</Text>
       <Text style={[styles.cell3, styles.headerCell]}>REALIZADOS </Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
    </View>
    <View style={styles.column}>
    <Text style={[styles.cell3, styles.headerCell]}> </Text>
    
       <Text style={[styles.cell3, styles.headerCell]}>ASISTENTES </Text>
       <Text style={[styles.cell3, styles.headerCell]}>A CURSOS </Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
    </View>
    </View>
</View>

    </View>
);
const Observaciones =()=>(
  <View style={styles.section}>
  <Text style={styles.title2}>OBSERVACIONES</Text>
  <View style={styles.table}>
 <View style={styles.column}>
     <Text style={styles.cell7}></Text>
  </View>
  </View>
  </View>
); 
const ActArt =({data})=>(
  <View style={styles.section}>
  <Text style={styles.title2}>DATOS ESTADISTICOS</Text>
  <hr></hr>
  <Text style={styles.title}>ACTIVIDADES ARTISTICAS Y CULTURALES</Text>
  <Text style={styles.title9}>CONCIERTOS   TEATRO   DANZA   PROYECCIONES DE CINE   FOTOGRAFIA   PINTURA  EXPOSICIONES</Text>
  <View style={styles.table}>
  <View style={styles.row}>
    <View style={styles.column}>
      <Text style={[styles.cell, styles.headerCell]}> </Text>

      <Text style={[styles.cell, styles.headerCell]}> </Text>
      <Text style={[styles.cell, styles.headerCell]}>Mayores de 60</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 30 a 59</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 18 a 29</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 13 a 17</Text>
      <Text style={[styles.cell, styles.headerCell]}>De 0 a 12</Text>
      <Text style={[styles.cell, styles.headerCell]}>TOTALES</Text>
    </View>
    <View style={styles.column}>
       <Text style={[styles.cell3, styles.headerCell]}>Actividades</Text>
       <Text style={[styles.cell, styles.headerCell]}> </Text>
       <Text style={[styles.cell, styles.headerCell]}> </Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
       <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
    </View>
   
    <View style={styles.column}>
       <Text style={[styles.cell3, styles.headerCell]}>                                            ASISTENTES</Text>
       <View style={styles.row}>
          <View style={styles.column}>
                <Text style={[styles.cell3, styles.headerCell]}>HOMBRES</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
          </View>
          <View style={styles.column}>
                <Text style={[styles.cell3, styles.headerCell]}>MUJERES</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
                <Text style={styles.cell2}>{data.mayores60.Actividades}</Text>
          </View>
          </View>
    </View>
    </View>
</View>

    </View>
);
const Observaciones1 =()=>(
  <View style={styles.section}>
  <Text style={styles.title2}>OBSERVACIONES</Text>
  <View style={styles.table}>
 <View style={styles.column}>
     <Text style={styles.cell8}></Text>
  </View>
  </View>
  </View>
); 
const Footer =()=>(
  <View style={styles.section}>
  <View style={styles.header}>
  <Text style={styles.footer1}>Página 1 de 3</Text>
    <View>
      <Text style={styles.title6}>             * Recuerde que para el total de ususarios atendidos solo se suman los totales de las columnas HOMBRES Y MUJERES.</Text>
      <Text style={styles.title6}>                                                                                         Los usuarios con alguna discapacidad ya fueron considerados en estos rangos.</Text>
    </View>
    <View style={styles.title5}>
      <Text>DGB/DOB 2019</Text>
    
    </View>
  </View>
</View>
);
// const Footer2 =()=>(
//   <View style={styles.section}>
//   <View style={styles.header}>
//   <Text style={styles.footer1}>Página 1 de 3</Text>
    
//     <View style={styles.title5}>
//       <Text>DGB/DOB 2019</Text>
    
//     </View>
//   </View>
// </View>
// );
const Footer3 =()=>(
  <View style={styles.section}>
  <View style={styles.header}>
  <Text style={styles.footer1}>Página 3 de 3</Text>
    <View>
      <Text style={styles.title6}>             IMPORTANTE. Esta hoja solo se llenará en caso de que la biblioteca realice alguna actividad de ésta indole.</Text>
      <Text style={styles.title6}>                                                                         Si tiene alguna duda, favor de consultarla con su Coordinador estatal.</Text>
    </View>
    <View style={styles.title5}>
      <Text>DGB/DOB 2019</Text>
    
    </View>
  </View>
</View>
);



export default MyPDFDocument;
