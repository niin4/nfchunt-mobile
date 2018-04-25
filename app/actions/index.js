//Actions should take the same form as the sample below.

export const SET_GAME = 'SET_GAME';

export function setGame(game) {
 return { type: SET_GAME, payload: game }
}