import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import EditarCliente from './pages/EditarCliente';
import Inicio from './pages/Inicio';
import Layout from './Layout/Layout';
import NuevoCliente from './pages/NuevoCliente';
import VerCliente from './pages/VerCliente';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/clientes" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="nuevo" element={<NuevoCliente />}/>
            <Route path="editar/:id" element={<EditarCliente />}/>
            <Route path=":id" element={<VerCliente />}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
