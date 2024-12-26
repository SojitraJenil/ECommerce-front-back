// sockets/chatSocket.js
const Chat = require('../Model/chatmodel'); // Import your Chat model

module.exports = function (io) {
    io.on('connection', (socket) => {

        // Listen for user messages
        socket.on('user_message', async ({ userId, message }) => {
            try {
                let chat = await Chat.findOne({ userId });
                if (!chat) {
                    chat = new Chat({ userId }); // Create a new chat if it doesn't exist
                }

                chat.messages.push({ sender: 'user', message });
                await chat.save();

                // Emit the message to all connected clients
                io.emit('chat_message', { sender: 'user', message });
            } catch (error) {
                console.error('Error while processing user message:', error);
            }
        });


        // Listen for admin messages
        socket.on('admin_message', async (userId, message) => {
            try {
                let chat = await Chat.findOne({ userId });

                if (!chat) {
                    chat = new Chat({ userId });
                }

                chat.messages.push({ sender: 'admin', message });
                await chat.save();
                io.emit('chat_message', { sender: 'admin', message });
            } catch (error) {
                console.error('Error while processing admin message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};
