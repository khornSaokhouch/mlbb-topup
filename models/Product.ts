import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  diamonds: { type: Number, required: true },
  bonusDiamonds: { type: Number, default: 0 },
  price: { type: Number, required: true }, // Price in USD or local currency
  category: { type: String, default: 'MLBB' },
  image: { type: String },
  isActive: { type: Boolean, default: true },
  providerCode: { type: String }, // Code used for reseller API integration
}, { timestamps: true });

export default models.Product || model('Product', ProductSchema);
