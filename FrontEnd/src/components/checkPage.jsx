import { Button } from "@nextui-org/react";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { IoCheckmark } from "react-icons/io5";

export const CheckScreen = () => {
  return (
    <div className="flex h-screen overflow-auto bg-sky-50">
      <div className="flex flex-col items-center p-20 px-40 mx-auto my-auto bg-white rounded-3xl">
        <span className="text-white bg-teal-600 rounded-full text-7xl">
          <IoCheckmark />
        </span>
        <h1 className="mt-10 text-3xl font-semibold text-neutral-800">
          ¡Verificación completa!
        </h1>
        <h2 className="mt-10 text-xl font-light">
          Su cuenta ha sido verificada correctamente.
        </h2>
        <h2 className="mt-3 mb-10 text-xl font-light">
          Ahora puede cerrar esta ventana y volver a Mint.
        </h2>
        <Button className="px-10 text-white bg-sky-700">Confirmar</Button>
      </div>
    </div>
  );
};