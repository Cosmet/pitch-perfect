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

const peer = new Peer({
  host: 'pitch-perfect-peerjs.herokuapp.com',
  path: '/',
  secure: true,
  port: 443,
});

peer.on('open', (id) => {
  myPeerId = id;
  console.log('My peer ID is: ' + id);
});

const Video = (props) => {
  const { peerId, connectVideo, stopVideo, swapVideo } = props;
  theirPeerId = peerId;

  const conn = peerId.length && peer.connect(peerId);
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

      conn.on('open', () => {
        // Receive messages
        conn.on('data', (data) => {
        });

        // Send messages
        conn.send('Hello!');

        const call = peer.call(theirPeerId, data);
        peer.on('call', (callee) => {
          // Answer the call, providing our mediaStream
          callee.answer(data);
        });

        call.on('stream', (stream) => {
          // `stream` is the MediaStream of the remote peer.
          // Here you'd add it to an HTML video/canvas element.
          document.getElementById("peer-video").srcObject = stream;
          document.getElementById('connect-video-btn').innerHTML = "Connected";
        });
      });
    });
  })
    .catch(console.error)


  return (
    <div className="video">
      <div>
        <button id="connect-video-btn" onClick={connectVideo}>I'm Ready!</button>
      </div>
      <button id="stop-video-btn" onClick={() => stopVideo(myStream)}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </button>
      <div id="video-container" className="video-feed">
        <video onClick={swapVideo} className="small-video" id="my-video" autoPlay></video>
        <video onClick={swapVideo} id="peer-video" autoPlay></video>
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
      const connectBtn = document.getElementById('connect-video-btn');
      const connecting = document.createElement('i');
      connecting.className = 'fa fa-spinner';
      connecting.setAttribute('aria-hidden', true);
      connectBtn.innerHTML = 'Connecting '
      connectBtn.appendChild(connecting);
      connectBtn.setAttribute('disabled', true);
    },
    stopVideo(myStream) {
      myStream.getTracks().forEach(track => track.stop())
    },
    swapVideo(e) {
      const targetVidId = e.target.id;
      const classList = e.target.classList;
      const myVid = document.getElementById('my-video');
      const theirVid = document.getElementById('peer-video');
      console.log(myVid, theirVid)
      if (targetVidId === 'my-video' && classList.length === 0) {
        myVid.classList.add('small-video');
        theirVid.classList.remove('small-video');
      }
      else if (targetVidId === 'peer-video' && classList.length === 0) {
        myVid.classList.remove('small-video');
        theirVid.classList.add('small-video');
      }
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
