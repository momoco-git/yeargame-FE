import io from 'socket.io-client';

export default function IO() {
  const socket = io('https://port-0-yeargame-nodejs-20z52flc7g810w.gksl2.cloudtype.app');
  return socket;
}
