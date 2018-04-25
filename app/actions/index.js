//Actions should take the same form as the sample below.

export const SET_GAME = 'SET_GAME';
export const SET_TAG = 'SET_TAG';

export function setGame(game) {
 return { type: SET_GAME, payload: game }
}

export function setTag(tag) {
  return { type: SET_TAG, payload: tag }
 }