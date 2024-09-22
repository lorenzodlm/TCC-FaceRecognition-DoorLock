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
    // teacher: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User', 
    //     required: true 
    // },
    // students: [{ 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User' 
    // }],
    teacherID: {
        type: String,
        required: true
    },
    studentIDs: {
        type: [String],
        default: []
    }
});

export default mongoose.models.Class || mongoose.model('Class', ClassSchema);
