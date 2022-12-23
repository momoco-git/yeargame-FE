import io from 'socket.io-client';

export default function IO() {
  const socket = io('http://localhost:8080');
  return socket;
}
