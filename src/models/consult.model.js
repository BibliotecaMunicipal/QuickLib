// models/consults.model.js
import mongoose from 'mongoose';
import autoIncrementId from '../utils/autoIncrementId.js';

const consultSchema = new mongoose.Schema({
  idConsult: { type: Number, unique: true, trim: true, default: 0 },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  education: { type: String, required: true },
  occupation: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true }
});

autoIncrementId(consultSchema, 'consult');
export default mongoose.model('Consults', consultSchema);
