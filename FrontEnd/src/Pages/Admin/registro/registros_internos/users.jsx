/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
// src/components/UserForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { userService, clientService } from '../../../../services/services';
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Button, Input } from "@nextui-org/react";
import { useMutation } from 'react-query';
import toast, {Toaster} from 'react-hot-toast';
import { LoadingPage } from '../../../loadingPage';

const UserForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [age, setAge] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const [password, setPassword] = useState('')
  const [passwordC, setPasswordC] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);


const {
  register,
  handleSubmit,
  formState: {errors, isValid},
} = useForm({mode: "onTouched"})


  const registerUserMutation = useMutation(userService.registerUser, {
    onError: (error) => {
      setShowLoading(false);
      toast.error("Hubo un error en el registro");
      console.log(error);
    },
    onMutate: () => {
      setShowLoading(true);
    },
  });

  const registerClientMutation = useMutation(clientService.registerClient, {
    onSuccess: () => {
      setShowLoading(false);
      toast.success("Registro exitoso y redireccionando al login")
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Hubo un error en el registro");
      console.log(error);
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("IMprmir dataaaa");
      console.log(data);
      registerUserMutation.mutateAsync(data).then(() => {
        registerClientMutation.mutate(data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRoleChange = (event) => {
    // eslint-disable-next-line no-undef
    setSelectedRole(event.target.value);
  };

  return (
    <>
    {showLoading && <LoadingPage label="Registrando..." />}
    {!showLoading && (

  
    <div>
      <h2 className="text-xl font-bold mb-4">Registro de Usuarios</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1">Username:</label>
          <input 
          type="text" 
          name='username'
          {...register("username", {required:"El campo es obligatorio"})}
          variant="bordered"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded" 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input           
          type="text" 
          name='email'
          {...register("email", {required:"El campo es obligatorio"})}
          variant="bordered"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded" 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input 
          type="text" 
          name='firstName'
          {...register("firstName", {required:"El campo es obligatorio"})}
          variant="bordered"
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded"  
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">LastName:</label>
          <input           
          type="text" 
          name='lastName'
          {...register("lastName", {required:"El campo es obligatorio"})}
          variant="bordered"
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded" 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Address:</label>
          <input           
          type="text" 
          name='address'
          {...register("address", {required:"El campo es obligatorio"})}
          variant="bordered"
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded" 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">PhoneNumber:</label>
          <input           
          type="number" 
          name='phoneNumber'
          {...register("phoneNumber", {required:"El campo es obligatorio"})}
          variant="bordered"
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border rounded" 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Age:</label>
          <input           
          type="number" 
          name='age'
          {...register("age", {required:"El campo es obligatorio"})}
          variant="bordered"
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input 
          type={showPassword ? "text" : "password"}
          name='password'
          {...register("passwords.password", {required: "El campo es obligatorio"})}
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-2 border rounded" 
          endContent={
            showPassword ? (
                <GoEyeClosed
                className='mt-1 text-gray-400'
                onClick={() => setShowPassword(false)}
                />
            ) : (
            <GoEye
            className='mt-1 text-gray-400'
            onClick={() => setShowPassword(true)}
            />
            )
          }
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Confirm Password:</label>
          <input 
          isRequired
          type={showPasswordC ? "text" : "password"}
          name='passwordC'
          {...register("passwords.confirmPassword", {
          required: "El campo es obligatorio"
          })} 
          onChange={(e) => setShowPasswordC(e.target.value)}
          endContent={
            showPasswordC ? (
              <GoEyeClosed
                className="mt-1 text-gray-400"
                onClick={() => setShowPasswordC(false)}
                />
              ) : (
                <GoEye
                  className="mt-1 text-gray-400"
                  onClick={() => setShowPasswordC(true)}
                />
              )
            }
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          {loading ? 'Registrando....' : 'Registrar'}
        </button>
      </form>
    </div>
    )}
    <Toaster/>
    </>
  );

};

export default UserForm;
