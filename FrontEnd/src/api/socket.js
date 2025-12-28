import { io } from 'socket.io-client';

const socket = io({
    //path: '/socket.io',
    autoConnect: false, // Connect manually when user logs in
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export default socket;