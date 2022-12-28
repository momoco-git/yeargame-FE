import io from 'socket.io-client';

export default function IO() {
  const socket = io('https://wirehaired-lapis-forest.glitch.me');
  return socket;
}
