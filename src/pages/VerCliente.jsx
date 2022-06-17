import { matchPath, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Spinner from '../components/Spinner';

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando ] = useState(false);

  const {id} = useParams();

  useEffect(()=> {
    setCargando(!cargando)
    const obtenerClienteAPI = async()=> {
      try {
        const url = `{import.meta.env.VITE_API_URL}/${id}`;
        console.log(url)
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCliente(resultado);
      } catch (error) {
        console.log(error)
      }
      setCargando(false)
    }
    obtenerClienteAPI()
  }, [])



  const {nombre, empresa, email, telefono, notas} = cliente

  return (

    cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <p>No hay Resultados</p> : (
    <div>
          <h1 className="font-black text-4xl text-blue-600">Ver Cliente: {nombre}</h1>
          <p className="mt-3 text-1xl">Informacion del cliente</p>


          <p className="text-2xl text-gray-600 mt-10">
            <span className="uppercase font-bold text-gray-700">Cliente: </span>
            {nombre}
          </p>

          <p className="text-2xl text-gray-600 mt-4">
            <span className="uppercase font-bold text-gray-700">Empresa: </span>
            {empresa}
          </p>

          <p className="text-2xl text-gray-600 mt-4">
            <span className="uppercase font-bold text-gray-700">E-mail: </span>
            {email}
          </p>

          {telefono && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="uppercase font-bold text-gray-700">Telefono: </span>
                {telefono}
            </p>
          )}

          {notas && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="uppercase font-bold text-gray-700">Notas: </span>
                {notas}
            </p>
          )}

    </div>
    )
  )
}

export default VerCliente