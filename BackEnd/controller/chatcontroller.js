const User = require('../Model/usermodel');
const Chat = require('../Model/chatmodel');

exports.getChat = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find or create a chat
        let chat = await Chat.findOne({ userId });
        if (!chat) {
            chat = new Chat({ userId });
            await chat.save();
        }

        // Fetch user details
        const user = await User.findOne({ userId }, 'fname lname email mobileno');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const response = {
            chat,
            user: {
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                mobileno: user.mobileno,
            },
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllChat = async (req, res) => {
    try {
        let chats = await Chat.find();
        if (!chats || chats.length === 0) {
            return res.status(404).json({ status: "chat show", chat: [] });
        }

        const chatWithUserDetails = await Promise.all(chats.map(async (chat) => {
            const user = await User.findOne({ userId: chat.userId }, 'userId fname lname email mobileno');
            if (user) {
                return {
                    ...chat.toObject(),
                    user: {
                        userId: user.userId,
                        fname: user.fname,
                        lname: user.lname,
                        email: user.email,
                        mobileno: user.mobileno,
                    },
                };
            }
            return {
                ...chat.toObject(),
                user: {}
            };
        }));
        res.status(200).json({ status: "chat show", chat: chatWithUserDetails });
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ error: error.message });
    }
};



exports.addMessage = async (req, res) => {
    const { userId } = req.params;
    const { message, sender } = req.body;

    try {
        let chat = await Chat.findOne({ userId });
        if (!chat) {
            chat = new Chat({ userId });
        }

        chat.messages.push({ sender, message, timestamp: new Date() });
        await chat.save();

        res.status(200).json({ chat, status: "OK" });
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update chat status (active/closed)
exports.updateChatStatus = async (req, res) => {
    const { userId } = req.params;
    const { chatStatus } = req.body;

    try {
        const chat = await Chat.findOneAndUpdate({ userId }, { chatStatus }, { new: true });

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
