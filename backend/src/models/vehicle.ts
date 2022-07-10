import mongoose from 'mongoose';
import generateRandomGeoPoint from '../utils/generateRandomLocation';

const vehicleSchema = new mongoose.Schema({
  vehicleName: String,
  createdAt: Date,
  carType: {
    type: String,
    required: true,
    enum: ['SUV', 'Truck', 'Hybrid'],
  },
  lastSuccessfulConn: Date,
  lastGeolocationPoint: {
    type: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  },
});

vehicleSchema.pre(['save'], function beforeSave(next) {
  const now = new Date();

  this.set({ lastSuccessfulConn: now });
  this.set({ createdAt: now });
  this.set({ lastGeolocationPoint: generateRandomGeoPoint() });

  next();
});

vehicleSchema.pre('updateOne', function beforeUpdate(next) {
  const now = new Date();

  this.set({ lastSuccessfulConn: now });
  this.set({ lastGeolocationPoint: generateRandomGeoPoint() });

  next();
});

const vehicleModel = mongoose.model('Vehicle', vehicleSchema);

export default vehicleModel;
