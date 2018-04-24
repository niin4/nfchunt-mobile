import {
  SET_GAME
} from '../actions'
const DeviceInfo = require('react-native-deviceinfo');

const initialState = {
  activeGame: {},
  user: DeviceInfo.getInstanceID()
}

export default function gameState(state = initialState, action) {
  switch (action.type) {
    case SET_GAME:
      return Object.assign({}, state, {
        activeGame: action.payload
      })
    default:
      return state
  }
}
