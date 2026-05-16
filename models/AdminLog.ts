import mongoose, { Schema, model, models } from 'mongoose';

const AdminLogSchema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  details: { type: Schema.Types.Mixed },
  ipAddress: { type: String },
}, { timestamps: true });

export default models.AdminLog || model('AdminLog', AdminLogSchema);
