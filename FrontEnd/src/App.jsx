/* eslint-disable no-unused-vars */

import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Routes, Route,  BrowserRouter, HashRouter } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Consultas from './Pages/Admin/Consultas/Consultas.jsx';
import Bandeja from "./Pages/Admin/Bandeja.jsx";
import Dashboard from "./Pages/Admin/HomeAdmin.jsx";
import Registros from "./Pages/Admin/registro/estilo_registro.jsx";
import Usuarios from './Pages/Client/ejemplo.jsx';
import Carrito from './Pages/Client/carrito_prestamo.jsx';
import PrincipalPage from "./Pages/PrincipalPage.jsx";
import { CheckScreen } from './components/checkPage.jsx';
import { AuthProvider } from './context/AuthContext1.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProtectedRoute from './utils/protected.jsx';
import {} from "@nextui-org/react";
import './index.css';

// eslint-disable-next-line no-unused-vars
import SesionRoute from './components/SesionRoute.jsx';
import CategoryBook from './components/user/categoryBook.jsx';

const queryClient = new QueryClient();

function App() {
    return (
        <>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<PrincipalPage />} />
                        <Route path="/PrincipalPage" element={<PrincipalPage />} />
                        
                        <Route path="/login" element={
                        <SesionRoute>
                             <Login />
                        </SesionRoute>
                       } />
                        <Route path="/verificate" element={<CheckScreen />} />
                        
                        <Route element={<ProtectedRoute roles={['admin']} />}>
                            <Route path="/Dashboard" element={<Dashboard />} />
                            <Route path='/Bandeja' element={<Bandeja />} />
                            <Route path='/Registros' element={<Registros />} />
                            <Route path='/Consulta' element={<Consultas />} />
                        </Route>
                        
                        <Route element={<ProtectedRoute roles={['client']} />}>
                            <Route path='/Usuarios' element={<Usuarios />} />
                            <Route path='/Carrito' element={<Carrito/>} />
                            <Route path="/categoria/:categoryId" element={<CategoryBook />} />
                           
                        </Route>
                        
                        <Route path="/verifyed" element={<CheckScreen />} />
                    </Routes>
                </HashRouter>
            </AuthProvider>
        </QueryClientProvider>
        </>
        
    );
}

export default App;
