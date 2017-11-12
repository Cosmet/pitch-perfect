import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import socket from '../socket'
import { FeedbackForm } from './'

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

  peerId.length && peer.connect(peerId);

  let myStream;
  const mediaStream = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 640,
      height: 480,
      frameRate: { ideal: 60, max: 60 }
    }
  });


  mediaStream.then((data) => {
    myStream = data;
    document.getElementById("my-video").srcObject = data;

    peer.on('connection', (conn) => {

      conn.on('open', () => {
        const call = peer.call(theirPeerId, data);
        peer.on('call', (callee) => {
          // Answer the call, providing our mediaStream
          callee.answer(data);
        });

        call.on('stream', (stream) => {
          document.getElementById("peer-video").srcObject = stream;
          document.getElementById('connect-video-btn').innerHTML = "Connected";
        });
      });

    });
  })
    .catch(console.error)


  return (
    <div className="video">
      <div className="left">
        <div className="controls">
          <div className="close-btn-container">
            <a
              id="stop-video-btn"
              onClick={() => stopVideo(myStream)}
              href="/">
              <i className="fa fa-times" aria-hidden="true"></i>
            </a>
          </div>
          <button id="connect-video-btn" onClick={connectVideo}>
            I'm Ready!
          </button>
        </div>

        <div className="prompt">
        <h2>Your Pitch</h2>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus placerat pharetra. Ut vel justo urna. In iaculis fringilla enim, vel blandit dolor fermentum vitae. In urna magna, suscipit eget tortor vitae, sodales elementum dui. Nullam lobortis turpis id enim sodales aliquam. Donec ac dui tristique, molestie velit non, dignissim ante. Praesent commodo quis nulla a interdum.
          <br />
          <br />
          Praesent interdum mi orci, nec semper purus tincidunt sed. Sed quis fermentum magna. Praesent eu erat eget nisl molestie lacinia. Morbi in sapien metus. Nam ultricies fringilla ligula a tincidunt. Vivamus vel viverra sapien, in vestibulum lacus. Donec aliquam orci id enim malesuada vestibulum.
          <br />
          <br />
          Praesent pulvinar orci vitae velit eleifend, efficitur finibus diam cursus. Quisque in sapien rhoncus, luctus nulla ac, dapibus est. Sed pretium dui purus, sit amet facilisis turpis sagittis a. Etiam feugiat arcu ut libero ultrices condimentum. Quisque ut volutpat ligula, non laoreet arcu. Donec at elit vel massa lobortis pellentesque. Curabitur pretium, nisl quis auctor dictum, elit mauris facilisis lectus, ut mollis nisl ipsum tempus risus. Aenean et iaculis dolor. Donec vel placerat metus. Nunc maximus justo iaculis convallis egestas. Cras imperdiet purus in libero malesuada cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed quis enim pellentesque, ultricies diam sed, interdum eros. Nulla sed est lacus.
          </p>
        </div>
      </div>
      <div className="middle">
        <h2>Tips</h2>
        <ul>
          <li>Remember to make eye contact!</li>
          <li>Keep a steady pace.</li>
          <li>Smile!</li>
        </ul>
      </div>
      <div className="right">
        <FeedbackForm />
      </div>
      <div id="video-container" className="video-feed">
        <video onClick={swapVideo} className="small-video" id="my-video" autoPlay muted="muted"></video>
        <video onClick={swapVideo} id="peer-video" autoPlay></video>
        <span className="speech-bubble">Click Me!</span>

      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    peerId: state.peer.peerId,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    connectVideo(peer) {
      socket.emit('connection', { id: myPeerId });
      const connectBtn = document.getElementById('connect-video-btn');
      const connecting = document.createElement('i');
      connecting.className = 'fa fa-spinner';
      connecting.setAttribute('aria-hidden', true);
      connectBtn.innerHTML = 'Searching '
      connectBtn.appendChild(connecting);
      connectBtn.setAttribute('disabled', true);
    },
    stopVideo(myStream) {
      myStream.getTracks().forEach(track => track.stop());
    },
    swapVideo(e) {
      const targetVidId = e.target.id;
      const classList = e.target.classList;
      const myVid = document.getElementById('my-video');
      const theirVid = document.getElementById('peer-video');
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
