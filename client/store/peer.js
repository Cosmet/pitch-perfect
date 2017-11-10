import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_PEER_CONNECTION = 'SET_PEER_CONNECTION'

/**
 * INITIAL STATE
 */
const defaultState = ''

/**
 * ACTION CREATORS
 */
export const setPeer = peerId => ({type: SET_PEER_CONNECTION, peerId})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_PEER_CONNECTION:
      return action.peerId
    default:
      return state
  }
}
