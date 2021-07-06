import { io } from 'socket.io-client';
import { SOCKET_URL } from '../config';

const socket = io(SOCKET_URL, {
  autoConnect: false,
  extraHeaders: {
    Authorization: `Bearer ${window.localStorage.getItem('access-token')}`,
  },
});

export default socket;
