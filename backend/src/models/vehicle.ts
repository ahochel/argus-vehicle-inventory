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

const vehicleModel = mongoose.model('Vehicle', vehicleSchema);

export default vehicleModel;
