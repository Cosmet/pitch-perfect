import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import store, { clearFeedback } from '../store'

import '../css/_feedback-received-form.scss'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const FeedbackReceived = (props) => {
  const { feedback } = props
  console.log(clearFeedback)
  return (
    <div className="feedback-received-wrapper">
     <h2>You have new feedback!</h2>
      <div className="feedback-received">
      <button onClick={() => store.dispatch(clearFeedback())}><i className="fa fa-times" aria-hidden="true"></i></button>

      <img src={`assets/${feedback.rating}.svg`} />
      <p>{feedback.feedback}</p>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    feedback: state.feedback,
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(FeedbackReceived)

/**
 * PROP TYPES
 */
FeedbackReceived.propTypes = {

}
