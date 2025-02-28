import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
    locationName: {
        type: String, 
        required: true 
    },
    locationID: {
        type: String, 
        required: true 
    },
    managerID: {
        type: String,
        required: true
    },
    employeeIDs: {
        type: [String],
        default: []
    },
    dates: {
        type: [Date], 
        required: false 
    },
});

export default mongoose.models.Location || mongoose.model('Location', LocationSchema);
