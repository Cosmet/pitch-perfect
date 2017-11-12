import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import socket from '../socket'

import '../css/_feedback-form.scss'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const FeedbackForm = (props) => {
  const { peerId, peerSocketId, sendFeedback } = props

  return (
    <div className="feedback-wrapper">
      <label>Leave some constructive feedback!</label>
      <textarea rows="10" id="feedback-text"></textarea>
      <div className="rating">
        <label>
          <input id="rating-score" type="radio" name="rating" value="happy" />
          <img src="assets/happy.svg" />
        </label>
        <label>
          <input type="radio" name="rating" value="confused" />
          <img src="assets/confused.svg" />
        </label>
        <label>
          <input type="radio" name="rating" value="sad" />
          <img src="assets/sad.svg" />
        </label>
      </div>
      <button onClick={() => sendFeedback(peerSocketId)}>Send</button>
      <h2>How to leave constructive feedback.</h2>
      <ul>
        <li>Feedback Sandwich! The good, the bad, the good.</li>
        <li>Focus on the situation, not the person.</li>
        <li>Be specific!</li>
        <li>Comment on things that are in the persons control.</li>
        <li>Give recommendations on how to improve.</li>
        <li>Don't make assumptions.</li>
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    peerId: state.peer.peerId,
    peerSocketId: state.peer.socketId,
  }
}

const mapDispatch = (dispatch) => {
  return {
    sendFeedback(socketId) {
      const feedback = document.getElementById('feedback-text').value;
      const rating = document.querySelector('input[name="rating"]:checked').value;
      socketId.length && socket.emit('feedback-to-user', { feedback, rating, socketId });
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(FeedbackForm))

/**
 * PROP TYPES
 */
FeedbackForm.propTypes = {

}
