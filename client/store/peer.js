import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_PEER_CONNECTION = 'SET_PEER_CONNECTION'

/**
 * INITIAL STATE
 */
const defaultState = {
  peerId: '',
  socketId: ''
};

/**
 * ACTION CREATORS
 */
export const setPeer = peer => ({type: SET_PEER_CONNECTION, peer})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_PEER_CONNECTION:
      return Object.assign({}, action.peer);
    default:
      return state
  }
}
