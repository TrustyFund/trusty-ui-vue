import * as types from '../mutations'

export const incrementAsync = ({ commit }) => {
	setTimeout(() => {
	  commit(types.INCREMENT_COUNTER)
	}, 200);
}