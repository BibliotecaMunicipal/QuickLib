import { Reservations } from "../models/models.js";

export const addReservation = async (req, res) => {
    const { username, firstName, lastName, address, phoneNumber, ISBN, title, author, category } = req.body;

    if (!username || !firstName || !lastName || !address || !phoneNumber || !ISBN || !title || !author) {
        console.log('Campos faltantes en la solicitud:', req.body);
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verifica el número de reservaciones existentes para el usuario
        const existingReservations = await Reservations.countDocuments({ username });
        console.log('Número de reservaciones existentes para el usuario:', existingReservations);
        if (existingReservations >= 3) {
            return res.status(400).json({ message: 'No puedes hacer más de tres reservaciones' });
        }

        const newReservation = new Reservations({
            username,
            firstName,
            lastName,
            address,
            phoneNumber,
            ISBN,
            title,
            author,
            category
        });

        await newReservation.save();
        console.log('Reserva creada exitosamente:', newReservation);
        res.status(200).json({ message: 'Reserva creada exitosamente', reservation: newReservation });
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ message: 'Error al crear la reserva', error });
    }
};


// Controller para eliminar una reserva

export const deleteReservation = async (req, res) => {
    const { ISBN, username } = req.params;
  
    try {
      // Encuentra la primera reservación que coincida con el ISBN y el username
      const reservation = await Reservations.findOne({ ISBN, username });
  
      if (!reservation) {
        return res.status(404).json({ message: 'Reservación no encontrada' });
      }
  
      // Elimina la reservación encontrada
      await Reservations.deleteOne({ _id: reservation._id });
  
      return res.status(200).json({ message: 'Reservación eliminada' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar la reservación', error });
    }
  };

  export const deleteFReservation = async (req, res) => {
    const {id} = req.params;
    try {
      const deleted = await Reservations.findByIdAndDelete(id);
      if(!deleted) {
        return res.status(404).json({message:"Reserva no encontrada"});
      };
      res.status(200).json({message: "Reserva eliminada Exitosamente"});
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la reserva', error });
    }
  }
  
  export const getAllReservations = async (req, res) => {
    try {
      const reservations = await Reservations.find();
      res.status(200).json(reservations);
    } catch (error) {
      console.error('Error al obtener las Reservas:', error);
      res.status(500).json({ error: 'Error al obtener las reservas'});
    }
  }

  export const countUserReservations = async(req, res) => {
    const { username } = req.params;

    try {
      const count = await Reservations.countDocuments({ username })
      res.status(200).json({ count })
    } catch (error) {
      console.error(`Error al contar las reservas del ${username}:`, error);
      res.status(500).json({ error: `Error al contar las reservas de ${username}`});
    }
  }