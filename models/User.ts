import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  walletBalance: { type: Number, default: 0 },
  gameIds: [{
    game: { type: String, default: 'MLBB' },
    userId: { type: String },
    zoneId: { type: String },
    nickname: { type: String }
  }],
}, { timestamps: true });

export default models.User || model('User', UserSchema);
