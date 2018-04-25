import {
  SET_GAME,
  SET_TAG
} from '../actions'
const DeviceInfo = require('react-native-deviceinfo');

const initialState = {
  activeGame: {},
  activeTag: {},
  user: DeviceInfo.getInstanceID()
}

export default function gameState(state = initialState, action) {
  switch (action.type) {
    case SET_GAME:
      return Object.assign({}, state, {
        activeGame: action.payload
      })
    case SET_TAG:
    return Object.assign({}, state, {
      activeTag: action.payload
    })
    default:
      return state
  }
}
