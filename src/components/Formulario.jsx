import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Alerts } from "./Alerts";
import { Spinner } from "./Spinner";

export const Formulario = ({ editClient, isLoading }) => {
  const navigate = useNavigate();

  const nuevoCliemteSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(15, "El nombre es muy largo")
      .required("El nombre del cliente es requerido"),
    empresa: Yup.string().required("El nombre de la empresa es requerido"),
    email: Yup.string()
      .email("El correo debe ser valido")
      .required("El email es requrido"),
    telefono: Yup.number()
      .positive("Numero no valido")
      .integer("Numero no valido")
      .typeError("El numero no es valido"),
  });

  const handleSubmit = async (valores) => {
    try {
      const url = "http://localhost:4000/clientes";
      const respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(valores),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(respuesta);
      const resultado = await respuesta.json;
      console.log(resultado);
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center  ">
        {editClient ? <p>Editar Cliente</p> : <p>Agregar Cliente</p>}
      </h1>
      <Formik
        initialValues={{
          name: editClient?.name ?? "",
          empresa: editClient?.empresa ?? "",
          email: editClient?.email ?? "",
          telefono: editClient?.telefono ?? "",
          notas: editClient?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoCliemteSchema}
      >
        {({ errors, touched }) => {
          // console.log(data);
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Nombre:
                </label>
                <Field
                  name="name"
                  id="name"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Cliente"
                />
                {errors.name && touched.name ? (
                  <Alerts>{errors.name}</Alerts>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerts>{errors.empresa}</Alerts>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerts>{errors.email}</Alerts>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Telefono:
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Telefono del Cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerts>{errors.telefono}</Alerts>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
                {errors.notas && touched.notas ? (
                  <Alerts>{errors.notas}</Alerts>
                ) : null}
              </div>
              <input
                type="submit"
                value={editClient ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  editClient: [],
  cargando: false,
};
