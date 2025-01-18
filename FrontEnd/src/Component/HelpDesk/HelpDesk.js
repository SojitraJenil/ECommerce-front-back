import React, { useState } from 'react';
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import TopNavbar from '../TopNavbar/TopNavbar';
import Header from '../Navbar/Header';
import Chat from './Chat';

function HelpDesk() {
    const [faq, setFaq] = useState([
        { question: "How can I track my order?", answer: "You can track your order using the 'My Orders' section in your account dashboard. Simply log in, navigate to 'My Orders', and click on the order you want to track. You'll see real-time updates on your order status and estimated delivery date.", isOpen: false },
        { question: "What is the return policy?", answer: "We offer a 30-day return policy for most items. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging. Some products may have specific return requirements, so please check the product description for any exceptions.", isOpen: false },
        { question: "How do I change or cancel my order?", answer: "If you need to change or cancel your order, please contact our customer support team as soon as possible. We process orders quickly, so we can't guarantee that we can make changes once an order is placed. If the order hasn't shipped yet, we'll do our best to accommodate your request.", isOpen: false },
    ]);

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <TopNavbar />
            <Header />
            <Container className="py-5 flex-grow-1">
                <Row className="justify-content-center">
                    <Col lg={8} className="">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h3 className="mb-4">Need More Help?</h3>
                                <Chat />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HelpDesk;
