import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import '../css/_home.scss'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Home = (props) => {

  return (
    <div className="home-wrapper">

      <div className="home-hero">
        <h1>A perfect pitch takes practice...</h1>
        <a href="#start-section">Get Started</a>
      </div>

      <div id="start-section"></div>

      <div id="start">
        <h2>What's a Pitch?</h2>
        <p>
          A pitch (a.k.a: elevator pitch) is a short, persuasive speech that you use to tell someone about yourself, your product, idea or your organization.
          <br />
          <br />

          A good pitch sparks interest in the person you're pitching to and should last no longer than a short elevator ride around 60 seconds. You can have a longer pitch, but keep it under 2-3 minutes. They should be interesting and memorable. They also need to explain what makes you, or what you're pitching – unique.
        </p>
        <h3>When do you use it?</h3>
        <p>
          Anytime you're meeting new people. Usually at conferences, networking events, seminars, and elevators. You get the idea. Tailor your pitch to the occassion for the best results.
        </p>
        <a href="#craft-section">How do I create a pitch?</a>
      </div>

      <div id="craft-section"></div>

      <div id="craft">
        <h2>Let's craft your pitch.</h2>
        <h3>What were you doing in the past?</h3>
        <p>
          This should be brief and sum up your most relevant past. It should also lead you into the next question.
        </p>
        <h3>How did you get to where you are today?</h3>
        <p>
          This is where you would put your "wow" factor or "ah-ha" moment to how you got to where you are today. If you don't have one that's fine.
        </p>
        <h3>What are you looking for now in this career path?</h3>
        <p>
          This is where you can show your passion for your new career.
        </p>
        <Link to="/connect">Let's Practice</Link>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Home)

/**
 * PROP TYPES
 */
Home.propTypes = {

}
