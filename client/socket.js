import io from 'socket.io-client'
import store, { setPeer, setFeedback } from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('connect-to-peer', (data) => {
  console.log(`Connected to peer ID: ${data.peerId}`);
  store.dispatch(setPeer(data));
})

socket.on('feedback', (data) => {
  store.dispatch(setFeedback(data))
})

export default socket
