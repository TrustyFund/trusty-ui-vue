import * as types from '../mutations';
import * as actions from '../actions/counter';

let state = {
	count: 0
}

let mutations = {
	[types.INCREMENT_COUNTER] (state) {
		state.count++;
	},
	[types.DECREMENT_COUNTER] (state) {
		state.count--;
	}
}

export default {
  state,
  actions,
  mutations
}