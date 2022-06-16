import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Formulario from '../components/Formulario'
import Alerta from '../components/Alerta'

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando ] = useState(false);

  const {id} = useParams();

  useEffect(()=> {
    setCargando(!cargando)
    const obtenerClienteAPI = async()=> {
      try {
        const url = `{import.meta.env.VITE_API_URL}/${id}`;
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


  return (
    <>
      <h1 className="font-black text-4xl text-blue-600">Editar Cliente</h1>
      <p className="mt-3 text-1xl">Utiliza este formulario para editar datos de un cliente</p>
      {cliente?.nombre ? (
        <Formulario 
        cliente={cliente}
        cargando={cargando}
        />
      ): <Alerta>{"Cliente ID No valido"}</Alerta>}

    </>
  )
}

export default EditarCliente