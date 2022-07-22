import React from "react";
import { useNavigate } from "react-router-dom";

export const Client = ({ client }) => {
  const { name, empresa, email, telefono, notas, id } = client;

  const navigate = useNavigate();

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="p-3 ">{name}</td>
      <td className="p-3 ">
        <p>
          <span className="text-gray-800 uppercase font-bold">Email:</span>
          {email}
        </p>
        <span>
          <span className="text-gray-800 uppercase font-bold">{telefono}</span>
        </span>
      </td>
      <td className="p-3 ">{empresa}</td>
      <td className="p-3 ">
        <button
          type="button"
          className="bg-green-500 hover:bg-green-700 w-full text-white p-2 uppercase font-bold text-xs mb-2
        "
          onClick={() => navigate(`/clientes/${id}`)}
        >
          Ver
        </button>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 w-full text-white p-2 uppercase font-bold text-xs
        "
          onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          Edit
        </button>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 w-full text-white p-2 uppercase font-bold text-xs mt-2 borde
        "
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
