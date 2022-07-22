import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formulario } from "../components/Formulario";

export const EditarCliente = () => {
  const [editClient, setEditClient] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const getClientAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const response = await fetch(url);
        const dataClient = await response.json();
        setEditClient(dataClient);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getClientAPI();
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para editar datos de un cliente
      </p>
      <Formulario editClient={editClient} isLoading={isLoading} />
    </>
  );
};
