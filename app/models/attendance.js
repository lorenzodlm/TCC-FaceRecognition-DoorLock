import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    userID: { 
        type: String, 
        required: true 
    },
    locationID: { 
        type: String, 
        required: true 
    },
    attendance: {
        type: [Date], 
        required: true 
    },
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
