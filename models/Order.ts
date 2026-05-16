import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  orderId: { type: String, required: true, unique: true }, // Frontend display ID
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  gameUserId: { type: String, required: true },
  gameZoneId: { type: String, required: true },
  gameNickname: { type: String },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'cancelled'], default: 'pending' },
  orderStatus: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  providerOrderId: { type: String }, // ID from the reseller API
  providerStatus: { type: String },
  notes: { type: String },
}, { timestamps: true });

export default models.Order || model('Order', OrderSchema);
