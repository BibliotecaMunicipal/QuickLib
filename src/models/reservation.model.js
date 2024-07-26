// models/reservations.model.js
import mongoose from 'mongoose';
import autoIncrementId from '../utils/autoIncrementId.js';

const reservationSchema = new mongoose.Schema({
  idReservation: { type: Number, unique: true, trim: true, default: 0 },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  ISBN: { type: Number, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: Number, required: true }
});

autoIncrementId(reservationSchema, 'reservation');
export default mongoose.model('Reservations', reservationSchema);
