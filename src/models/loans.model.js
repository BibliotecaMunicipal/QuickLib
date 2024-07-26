// models/loans.model.js
import mongoose from 'mongoose';
import autoIncrementId from '../utils/autoIncrementId.js';

const loansSchema = new mongoose.Schema({
  idLoan: { type: Number, unique: true, trim: true, default: 0 },
  ISBN: { type: Number, required: true },
  email: {type: String, required: true},
  username: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  finalDate: { type: Date, required: true }
});

autoIncrementId(loansSchema, 'loan');
export default mongoose.model('Loans', loansSchema);
