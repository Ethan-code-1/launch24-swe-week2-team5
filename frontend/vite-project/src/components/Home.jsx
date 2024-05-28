import React, { useState } from 'react';

const Home = () => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5001/test');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    return (
        <div>
            <h1>Home</h1>
            <button onClick={fetchMessages}>Fetch Messages</button>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>{message.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
