import axios from 'axios'

/**
 * ACTION TYPES
 */
const RECEIVE_FEEDBACK = 'RECEIVE_FEEDBACK'
const CLEAR_FEEDBACK = 'CLEAR_FEEDBACK'

/**
 * INITIAL STATE
 */
const defaultState = {};

/**
 * ACTION CREATORS
 */
export const setFeedback = feedback => ({type: RECEIVE_FEEDBACK, feedback})
export const clearFeedback = () => ({type: CLEAR_FEEDBACK, feedback: {}})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultState, action) {

  switch (action.type) {
    case RECEIVE_FEEDBACK:
      return Object.assign({}, action.feedback);
    case CLEAR_FEEDBACK:
      return action.feedback;
    default:
      return state
  }
}
