// src/components/UserForm.js
// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import { useRegisterConsult } from '../../../../hooks/consult.hook';
import { toast } from 'react-toastify';

const Cons = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [age, setAge] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const consult = {
      name,
      lastName,
      age,
      education: selectedEducation,
      occupation: selectedOccupation,
      gender: selectedGender,
      title,
      author
    };
    try {
      await useRegisterConsult(consult);
      toast.success('Conuslta registrada con exito');
      setName('');
      setLastName('');
      setSelectedEducation('');
      setSelectedOccupation('');
      setSelectedGender('');
      setAge('');
      setTitle('');
      setAuthor('');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value)
  };
  const handleEducationChange = (event) => {
    setSelectedEducation(event.target.value)
  };
  const handleOccupationChange = (event) => {
    setSelectedOccupation(event.target.value)
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Registro de Prestamo Interno</h2>
      <form onSubmit={handleSumbit}>
        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded" 
            required
            />
        </div>
        <div className="mb-4">
          <label className="block mb-1">LastName:</label>
          <input 
            type="text" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded" 
            required
            />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Gender:</label>
          <select value={selectedGender} onChange={handleGenderChange} className="w-full p-2 border rounded">
            <option value='' >Seleccione un Genero</option>
            <option value='Hombre' >Masculino</option>
            <option value='Mujer' >Femenino</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Education:</label>
          <select value={selectedEducation} onChange={handleEducationChange} className="w-full p-2 border rounded">
            <option value='' >Nivel Academico</option>
            <option value='Preescolar' >Preescolar</option>
            <option value='Primaria' >Primaria</option>
            <option value='Secundaria' >Secundaria</option>
            <option value='Preparatoria' >Preparatoria</option>
            <option value='Licenciatura' >Licenciatura</option>
            <option value='Posgrado' >Posgrado</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Occupation:</label>
          <select value={selectedOccupation} onChange={handleOccupationChange} className="w-full p-2 border rounded">
            <option value='' >Seleccione una Ocupacion</option>
            <option value='Hogar' >Hogar</option>
            <option value='Empleado' >Empleado</option>
            <option value='Estudiante' >Estudiante</option>
            <option value='Desocupado' >Desocupado</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Age:</label>
          <input 
            type="number" 
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded" 
            required
            />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded" 
            required
            />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Author:</label>
          <input 
            type="text" 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded" 
            required
            />
        </div>
       
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? 'Registrando....' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Cons;
