import React, { useEffect, useState } from "react";
import { Client } from "../components/Client";

export const Inicio = () => {
  const [listClients, setListClients] = useState([]);
  useEffect(() => {
    const getClientsAPI = async () => {
      try {
        const url = "http://localhost:4000/clientes";
        const response = await fetch(url);
        const data = await response.json();
        setListClients(data);
      } catch (error) {
        console.log(error);
      }
    };
    getClientsAPI();
  }, []);

  const handleDelete = async (id) => {
    console.log("Eliminando", id);
    try {
      const url = `http://localhost:4000/clientes/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      await response.json();
      const arrayClient = listClients.filter((client) => client.id !== id);
      setListClients(arrayClient)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Accciones</th>
          </tr>
        </thead>
        <tbody>
          {listClients.map((client) => (
            <Client
              key={client.id}
              client={client}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
