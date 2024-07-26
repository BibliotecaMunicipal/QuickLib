/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { IoPencilOutline } from 'react-icons/io5';
import MySwal from 'sweetalert2';
import Perfil from "../../assets/fonfoperfil.png";
import { useUpdateClient } from '../../hooks/client.hook'; // Asegúrate de que la ruta sea correcta

const ProfileModal = ({ user, theme, setUser }) => {
  const [editableFields, setEditableFields] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    address: false,
  });

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    address: user.address,
  });

  const handleEditClick = (field) => {
    setEditableFields({
      ...editableFields,
      [field]: true,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedClient = await useUpdateClient(user.username, formData);
      setUser(updatedClient);
      MySwal.fire({
        icon: 'success',
        title: 'Actualización exitosa',
        text: 'Los datos han sido actualizados correctamente.',
      });
      // Reset editable fields to false after update
      setEditableFields({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        address: false,
      });
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error en la actualización',
        text: 'Hubo un problema al actualizar los datos. Por favor, intenta nuevamente.',
      });
    }
  };

  const isAnyFieldEditable = Object.values(editableFields).some(field => field);

  return (
    <div className="relative flex flex-col items-center p-4 rounded-md shadow-md bg-gradient-to-br from-green-600 via-white to-red-600 dark:from-green-800 dark:via-gray-900 dark:to-red-800 overflow-hidden">
      <div className="relative flex flex-col items-center p-4 rounded-md border-4 animate-border-spin bg-transparent backdrop-blur-md">
        <div className="rounded-full h-30 w-24 border-4 border-blue-400 mb-4">
          <img src={Perfil} alt="User Avatar" className="rounded-full h-24 w-24" />
        </div>
        <div className="flex items-center">
          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>Nombre: </p>
          {editableFields.firstName ? (
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="ml-2 p-1 rounded"
            />
          ) : (
            <p className="ml-2">{formData.firstName}</p>
          )}
          <IoPencilOutline onClick={() => handleEditClick('firstName')} />
        </div>
        <div className="flex items-center">
          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>Apellido: </p>
          {editableFields.lastName ? (
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="ml-2 p-1 rounded"
            />
          ) : (
            <p className="ml-2">{formData.lastName}</p>
          )}
          <IoPencilOutline onClick={() => handleEditClick('lastName')} />
        </div>
        <div className="flex items-center">
          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>Cel: </p>
          {editableFields.phoneNumber ? (
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="ml-2 p-1 rounded"
            />
          ) : (
            <p className="ml-2">{formData.phoneNumber}</p>
          )}
          <IoPencilOutline onClick={() => handleEditClick('phoneNumber')} />
        </div>
        <div className="flex items-center">
          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>Dirección: </p>
          {editableFields.address ? (
            <input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="ml-2 p-1 rounded"
            />
          ) : (
            <p className="ml-2">{formData.address}</p>
          )}
          <IoPencilOutline onClick={() => handleEditClick('address')} />
        </div>
      </div>
      {isAnyFieldEditable && (
        <div className="flex mt-4 space-x-4">
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
            Actualizar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
