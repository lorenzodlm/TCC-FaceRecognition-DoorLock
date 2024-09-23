import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
    className: {
        type: String, 
        required: true 
    },
    classCode: {
        type: String, 
        required: true 
    },
    teacherID: {
        type: String,
        required: true
    },
    studentIDs: {
        type: [String],
        default: []
    },
    dates: {
        type: [Date], 
        required: true 
    },
});

export default mongoose.models.Class || mongoose.model('Class', ClassSchema);
