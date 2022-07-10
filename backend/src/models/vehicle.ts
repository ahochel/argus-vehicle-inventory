import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleName: String,
  createdAt: Date,
  carType: {
    type: String,
    required: true,
    enum: ['SUV', 'Truck', 'Hybrid'],
  },
  lastSuccessfulConn: Date,
  lastGeolocationPoint: Date,
});

vehicleSchema.pre(['save'], function beforeSave(next) {
  const now = new Date();

  this.set({ lastSuccessfulConn: now });
  this.set({ createdAt: now });

  next();
});

vehicleSchema.pre('updateOne', function beforeUpdate(next) {
  const now = new Date();

  this.set({ lastSuccessfulConn: now });

  next();
});

const vehicleModel = mongoose.model('Vehicle', vehicleSchema);

export default vehicleModel;
