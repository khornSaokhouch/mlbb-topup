import mongoose, { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deposit', 'withdrawal', 'purchase', 'refund'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  reference: { type: String }, // Payment reference or Order ID
  description: { type: String },
}, { timestamps: true });

export default models.Transaction || model('Transaction', TransactionSchema);
