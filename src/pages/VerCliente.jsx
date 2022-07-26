import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";

export const VerCliente = () => {
  const [infoClient, setInfoClient] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const getClientAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const response = await fetch(url);
        const dataClient = await response.json();
        setInfoClient(dataClient);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getClientAPI();
  }, []);

  const { name, email, empresa, telefono, notas } = infoClient;

  return isLoading ? (
    <Spinner />
  ) : Object.keys(infoClient).length === 0 ? (
    <p>No hay resultados</p>
  ) : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Ver cliente: {name}</h1>
      <p className="mt-3">Informacion del cliente</p>
      <p className="text-2xl text-gray-600 mt-10">
        <span className="text-gray-800 uppercase font-bold">Cliente:</span>
        {name}
      </p>
      <p className="text-2xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">Email:</span>
        {email}
      </p>
      {telefono && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Telefono:</span>
          {telefono}
        </p>
      )}

      <p className="text-2xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">Empresa:</span>
        {empresa}
      </p>
      {notas && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Notas:</span>
          {notas}
        </p>
      )}
    </div>
  );
};
