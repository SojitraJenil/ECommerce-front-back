import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import moment from 'moment';
import { Container, Row, Col, Card, Form, Button, Badge, Alert } from 'react-bootstrap';
import {
    IoChatboxEllipses,
    IoSend,
    IoAttach,
    IoCheckmarkDoneSharp,
    IoTimeOutline,
    IoCall,
    IoVideocam,
    IoEllipsisVertical,
    IoImageOutline,
    IoHappyOutline
} from "react-icons/io5";

const SOCKET_SERVER_URL = "https://ecommerce-3-ul25.onrender.com";
// const SOCKET_SERVER_URL = 'http://localhost:8000' || "https://ecommerce-3-ul25.onrender.com";
const TYPING_TIMER_LENGTH = 3000;

const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userDetails, setUserDetails] = useState({
        fname: '',
        lname: '',
        email: '',
        mobileno: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAgentTyping, setIsAgentTyping] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('connecting');
    const [fileUpload, setFileUpload] = useState(null);

    const userId = localStorage.getItem('userId');
    const inputRef = useRef(null);
    const chatBoxRef = useRef(null);
    const chatEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const fileInputRef = useRef(null);

    // Scroll handling
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!userId) {
            setError('User ID not found. Please login again.');
            return;
        }

        const socketConnection = io(SOCKET_SERVER_URL, {
            query: { userId },
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketConnection.on('connect', () => {
            setConnectionStatus('connected');
            setError('');
        });

        socketConnection.on('disconnect', () => {
            setConnectionStatus('disconnected');
        });

        socketConnection.on('chat_message', handleIncomingMessage);
        socketConnection.on('agent_typing', handleAgentTyping);
        socketConnection.on('error', handleSocketError);

        setSocket(socketConnection);
        fetchChats();

        return () => {
            socketConnection.disconnect();
        };
    }, [userId]);

    const handleIncomingMessage = (message) => {
        setMessages(prev => [...prev, {
            ...message,
            id: prev.length + 1,
            timestamp: new Date().toISOString()
        }]);
        setIsAgentTyping(false);
    };

    const handleAgentTyping = (isTyping) => {
        setIsAgentTyping(isTyping);
    };

    const handleSocketError = (error) => {
        console.error('Socket error:', error);
        setError('Connection error. Please try again later.');
    };

    const fetchChats = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${SOCKET_SERVER_URL}/getChat/${userId}`);
            setMessages(response.data.chat.messages);
            setUserDetails(response.data.user);
        } catch (error) {
            console.error('Error fetching chats:', error);
            setError('Failed to fetch chat history. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const emitTyping = () => {
        if (socket && socket.connected) {
            socket.emit('user_typing', { userId, isTyping: true });

            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }

            typingTimeoutRef.current = setTimeout(() => {
                socket.emit('user_typing', { userId, isTyping: false });
            }, TYPING_TIMER_LENGTH);
        }
    };

    // Message sending
    const sendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim() && !fileUpload) return;

        if (!socket?.connected) {
            setError('Connection lost. Trying to reconnect...');
            return;
        }

        try {
            const messageData = {
                userId,
                message: newMessage,
                sender: 'user',
                receiverId: 'support',
                timestamp: new Date().toISOString(),
            };

            if (fileUpload) {
                const formData = new FormData();
                formData.append('file', fileUpload);
                const uploadResponse = await axios.post(`${SOCKET_SERVER_URL}/upload`, formData);
                messageData.attachments = [uploadResponse.data.url];
            }

            socket.emit('user_message', messageData);

            // setMessages(prev => [...prev, messageData]);
            setNewMessage('');
            setFileUpload(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            inputRef.current?.focus();

        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message. Please try again.');
        }
    };

    // File handling
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('File size must be less than 5MB');
                return;
            }
            setFileUpload(file);
        }
    };

    // Message input handling
    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
        emitTyping();
    };

    return (
       <Container fluid className="vh-100" style={{ backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
            <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div className="position-relative me-2">
                                <IoChatboxEllipses size={24} />
                                <Badge
                                    bg={connectionStatus === 'connected' ? 'success' : 'danger'}
                                    className="position-absolute"
                                    style={{ bottom: -2, right: -2, width: '10px', height: '10px', borderRadius: '50%' }}
                                />
                            </div>
                            <div>
                                <h5 className="mb-0">
                                    Customer Support
                                    {connectionStatus !== 'connected' && <small className="ms-2">({connectionStatus})</small>}
                                </h5>
                                <small>{userDetails.email || 'user@example.com'}</small>
                            </div>
                        </div>
                        <div className="d-flex gap-3">
                            <IoCall size={20} className="cursor-pointer" />
                            <IoVideocam size={20} className="cursor-pointer" />
                            <IoEllipsisVertical size={20} className="cursor-pointer" />
                        </div>
                    </div>
                </Card.Header>

                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}

                {/* Chat Messages */}
                <div
                    ref={chatBoxRef}
                    className="p-3"
                    style={{
                        height: '400px',
                        overflowY: 'auto',
                        backgroundColor: '#f8f9fa',
                        borderTop: '1px solid #ddd',
                        borderBottom: '1px solid #ddd',
                    }}
                >
                    {loading ? (
                        <div className="text-center p-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.length ? (
                                messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`d-flex mb-3 ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                                    >
                                        <div
                                            className={`p-3 rounded-3 ${
                                                message.sender === 'user' ? 'bg-primary text-white' : 'bg-white border'
                                            }`}
                                            style={{
                                                maxWidth: '70%',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                            }}
                                        >
                                            <p className="mb-1">{message.message}</p>
                                            {message.attachments?.map((url, i) => (
                                                <div key={i} className="mb-2">
                                                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary">
                                                        View Attachment
                                                    </a>
                                                </div>
                                            ))}
                                            <div className="d-flex justify-content-end align-items-center gap-1">
                                                <small className="opacity-75">
                                                    {moment(message.timestamp).format('h:mm A')}
                                                </small>
                                                {message.sender === 'user' && (
                                                    <IoCheckmarkDoneSharp size={16} className="opacity-75" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-muted">No messages yet</div>
                            )}
                            {isAgentTyping && (
                                <div className="d-flex align-items-center gap-2 text-muted">
                                    <IoTimeOutline size={16} />
                                    <small>Agent is typing...</small>
                                </div>
                            )}
                        </>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Message Input */}
                <Card.Footer className="bg-white">
                    <Form onSubmit={sendMessage}>
                        <div className="d-flex align-items-center gap-2">
                            <div className="d-flex gap-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    variant="light"
                                    className="border d-flex align-items-center"
                                    title="Attach file"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <IoAttach size={20} />
                                </Button>
                            </div>
                            <Form.Control
                                type="text"
                                value={newMessage}
                                onChange={handleInputChange}
                                ref={inputRef}
                                placeholder="Type your message..."
                                className="me-2"
                                disabled={!socket?.connected}
                            />
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={(!newMessage.trim() && !fileUpload) || !socket?.connected}
                                className="d-flex align-items-center"
                            >
                                <IoSend size={20} />
                            </Button>
                        </div>
                        {fileUpload && (
                            <div className="mt-2 d-flex align-items-center">
                                <small className="text-muted">
                                    Selected file: {fileUpload.name}
                                </small>
                                <Button
                                    variant="link"
                                    className="text-danger p-0 ms-2"
                                    onClick={() => {
                                        setFileUpload(null);
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = '';
                                        }
                                    }}
                                >
                                    Remove
                                </Button>
                            </div>
                        )}
                    </Form>
                </Card.Footer>
            </Card>
        </Col>
    </Row>
</Container>
    );
};

export default Chat;