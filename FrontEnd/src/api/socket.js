import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_API_URL || "http://localhost:1000";

const socket = io(URL, {
    //path: '/socket.io',
    autoConnect: false, // Connect manually when user logs in
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export default socket;