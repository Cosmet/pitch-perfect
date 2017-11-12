const peerSessions = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      delete peerSessions[socket.id];
    })

    socket.on('connection', (data) => {
      const peerData = { peerId: data.id, connected: false, socketId: socket.id };
      peerSessions[socket.id] = peerData;

      const availableSessions = Object.keys(peerSessions).filter(sessionSocketId => {
        return !peerSessions[sessionSocketId].connected && sessionSocketId !== socket.id
      });
      // const randomSession = Math.floor(Math.random() * availableSessions.length) + 1;


      if (availableSessions[0]) {
        const peerSocketId = availableSessions[0];
        const availablePeer = peerSessions[peerSocketId];

        // connects current user to an available peer
        socket.emit('connect-to-peer', availablePeer);

        // tells available peer to connect to current user
        io.to(peerSocketId).emit('connect-to-peer', peerSessions[socket.id])

        // removes both connections from available sessions
        availablePeer.connected = true;
        peerSessions[socket.id].connected = true;
      }
    })

    socket.on('feedback-to-user', ({ feedback, rating, socketId }) => {
      io.to(socketId).emit('feedback', { feedback, rating });
    })
  })
}
