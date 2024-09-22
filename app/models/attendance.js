import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    UserID: { 
        type: String, 
        required: true 
    },
    classID: { 
        type: String, 
        required: true 
    },
    attendance: {
        type: [Date], 
        required: true 
    },
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
