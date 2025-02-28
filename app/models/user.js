import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: false, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['employee', 'manager', 'admin'], 
        default: 'employee' 
    },
    locationIDs: { 
        type: [String], 
        default: [] 
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
