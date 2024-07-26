// models/opinions.model.js
import mongoose from 'mongoose';
import autoIncrementId from '../utils/autoIncrementId.js';

const opinionsSchema = new mongoose.Schema({
  idOpinion: { type: Number, unique: true, trim: true, default: 0 },
  email: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  showOnMainPage: { type: Boolean, default: false }
});

autoIncrementId(opinionsSchema, 'opinion');
export default mongoose.model('Opinions', opinionsSchema);
