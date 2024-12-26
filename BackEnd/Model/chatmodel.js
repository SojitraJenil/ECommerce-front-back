// models/Chat.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
    {
        userId: {
            type: String,  // Using String for simplicity
            ref: 'registers',
            required: true
        },
        adminId: {
            type: Schema.Types.ObjectId,
            ref: 'Admin'
        },
        messages: [
            {
                sender: {
                    type: String,
                    enum: ['user', 'admin'],
                    required: true
                },
                message: {
                    type: String,
                    required: true
                },
                timestamp: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        chatStatus: {
            type: String,
            enum: ['active', 'closed', 'pending'],
            default: 'active'
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Chat', ChatSchema);
