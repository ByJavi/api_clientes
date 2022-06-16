import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';

import Alerta from './Alerta';
import Spinner from '../components/Spinner';

const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string().min(3, "El Nombre es muy corto").required('El Nombre del Cliente es Obligatorio'),
    empresa: Yup.string().required('El Nombre de la Empresa es obligatorio'),
    email: Yup.string().email('Email no valido').required('El E-mail es obligatorio'),
    telefono: Yup.number().integer('Numero no valido').positive('Numero no valido').typeError('El Numero no es valido'),
    notas: Yup.string(),
  });

  const handleSubmit = async(valores)=>{
    try{
      let respuesta
      if(cliente.id){
        // Editando cliente
        const url = `http://localhost:4000/clientes/${cliente.id}`;

         respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json"
          }
        });
      } else {
        // Nuevo Registro
        const url = 'http://localhost:4000/clientes';

         respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
        // console.log(respuesta)
        await respuesta.json()
        // console.log(resultado)
        navigate('/clientes')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    cargando ? <Spinner /> : (
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
          <h1 className="text-gray-700 font-bold text-xl text-center uppercase">{cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}</h1>

          
          <Formik
            initialValues={{
              nombre: cliente?.nombre ?? '',
              empresa: cliente?.empresa ?? '',
              email: cliente?.email ?? '',
              telefono: cliente?.telefono ?? '',
              notas: cliente?.notas ?? ''
            }}
            enableReinitialize={true}
            onSubmit={async(values, {resetForm})=> {
              await handleSubmit(values);
              resetForm();
            }}
            validationSchema={nuevoClienteSchema}
          >
            {(errors)=> {
              // console.log(errors.errors.nombre);
              // console.log(errors.touched);
              return(
            <Form className="mt-10 font-bold">

              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="text-gray-800">Nombre:</label>
                <Field 
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-5 bg-gray-50"
                  placeholder="Nombre del Cliente"
                  name="nombre"/>
                  {errors.errors.nombre && errors.touched.nombre ? (
                    <Alerta>{errors.errors.nombre}</Alerta>
                  ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="empresa"
                  className="text-gray-800">Empresa:</label>
                <Field 
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-5 bg-gray-50"
                  placeholder="Empresa del Cliente"
                  name="empresa"/>
                  {errors.errors.empresa && errors.touched.empresa ? (
                    <Alerta>{errors.errors.empresa}</Alerta>
                  ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="text-gray-800">E-mail:</label>
                <Field 
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-5 bg-gray-50"
                  placeholder="email@email.com"
                  name="email"/>
                  {errors.errors.email && errors.touched.email ? (
                    <Alerta>{errors.errors.email}</Alerta>
                  ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="telefono"
                  className="text-gray-800">Telefono:</label>
                <Field 
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-5 bg-gray-50"
                  placeholder="Telefono del Cliente"
                  name="telefono"/>
                  {errors.errors.telefono && errors.touched.telefono ? (
                    <Alerta>{errors.errors.telefono}</Alerta>
                  ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="notas"
                  className="text-gray-800">Notas:</label>
                <Field
                  as="textarea" 
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-5 bg-gray-50 h-40"
                  placeholder="Notas..."
                  name="notas"/>
              </div>

              <input type="submit" value={cliente?.nombre ? "Guardar Cambios" : "Agregar Cliente"} className='mt-5 w-full bg-blue-500 p-3 text-white uppercase text-lg hover:bg-blue-600'/>
            </Form>
            )}
            }
          </Formik>
      </div>)
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario