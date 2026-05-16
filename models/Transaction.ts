import mongoose, { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deposit', 'purchase', 'refund'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentMethod: { type: String, required: true },
  referenceId: { type: String }, // Bakong transaction ID or internal order ID
  description: { type: String },
}, { timestamps: true });

export default models.Transaction || model('Transaction', TransactionSchema);
