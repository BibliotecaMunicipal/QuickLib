// models/donations.model.js
import mongoose from 'mongoose';
import autoIncrementId from '../utils/autoIncrementId.js';

const donationSchema = new mongoose.Schema({
  idDonation: { type: Number, unique: true, trim: true, default: 0 },
  typeDonation: { type: String, required: true },
  ISBN: { type: Number, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  yearPublication: { type: Number, required: true },
  copies: { type: Number, required: true },
  category: { type: Number, required: true },
  status: { type: Boolean, required: true, default: false }
});

autoIncrementId(donationSchema, 'donation');
export default mongoose.model('Donations', donationSchema);
