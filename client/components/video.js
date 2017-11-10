import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import socket from '../socket'

import '../css/_video.scss'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
let myPeerId;
let theirPeerId;
// const peer = new Peer({ key: 'lwjd5qra8257b9' });

const peer = new Peer({host: 'pitch-perfect-peerjs.herokuapp.com', secure: true, port: 443, path: '/'});

peer.on('open', (id) => {
  myPeerId = id;
  console.log('My peer ID is: ' + id);
});

const Video = (props) => {
  const { peerId } = props;
  theirPeerId = peerId;
  console.log('component')

  const conn = peerId.length && peer.connect(peerId);
  console.log('video component connection~~ ', conn)

  let myStream;

  const mediaStream = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 640,
      height: 480,
      frameRate: { ideal: 60, max: 60 }
    }
  });
  console.log('my media stream', mediaStream)

  mediaStream.then((data) => {
      myStream = data;
      document.getElementById("my-video").srcObject = data;

    peer.on('connection', (conn) => {
      console.log('what is this', conn)

      conn.on('open', () => {
        // Receive messages
        console.log('conn connection opened')
        conn.on('data', (data) => {
          console.log('Received', data);
        });

        // Send messages
        conn.send('Hello!'); // ?? doesn't work...
        console.log('this is the peer id thats failing ', theirPeerId, ' <<?', data)
        const call = peer.call(theirPeerId, data);
        peer.on('call', (callee) => {
          // Answer the call, providing our mediaStream
          console.log('call listener')
          callee.answer(data);
        });

        call.on('stream', (stream) => {
          console.log('call received')
          // `stream` is the MediaStream of the remote peer.
          // Here you'd add it to an HTML video/canvas element.
          console.log('peers stream', stream)
            document.getElementById("peer-video").srcObject = stream;
        });
      });
    });
  })
    .catch(console.error)


  return (
    <div className="video">
      <button id="connect-video-btn" onClick={props.connectVideo}>Connect</button>
      <button id="stop-video-btn" onClick={() => props.stopVideo(myStream)}>Disconnect</button>
      <div className="video-feed">
        <video id="my-video" autoPlay></video>
        <video className="small-video" id="peer-video" autoPlay></video>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    peerId: state.peer,
  }
}

const mapDispatch = (dispatch) => {
  return {
    connectVideo(peer) {
      socket.emit('connection', { id: myPeerId });
      document.getElementById('connect-video-btn').setAttribute('disabled', true)
    },
    stopVideo(myStream) {
      myStream.getTracks().forEach(track => track.stop())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Video)

/**
 * PROP TYPES
 */
Video.propTypes = {

}
