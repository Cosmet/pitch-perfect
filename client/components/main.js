import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

import '../css/_main.scss'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props

  return (
    <div className="main">
      <nav>
        <div className="logo">
          <div className="logo-css">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Link to="/"><h1>Pitch Perfect</h1></Link>
        </div>
        {
          isLoggedIn
            ? <div className="nav-links">
              {/* The navbar will show these links after you log in */}
              <Link to="/connect">Connect</Link>
              <a href="#" onClick={handleClick}>Logout</a>
            </div>
            : <div className="nav-links">
              {/* The navbar will show these links before you log in */}
              <Link to="/connect">Connect</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
        }
      </nav>
      <div className="hero">
        {children}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
