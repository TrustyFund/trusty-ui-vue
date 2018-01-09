import * as types from '../mutations';
import * as actions from '../actions/apis';

let state = {
	connected: false,
	instance: null
}

let mutations = {
	[types.WS_CONNECTED] (state) {
		state.connected = true;
	},
	[types.WS_DISCONNECTED] (state) {
		state.connected = false;
		state.instance = null;
	},
	[types.WS_ERROR] (state){
		state.connected = false;
		state.instance = null;
	}
}

export default {
  state,
  actions,
  mutations
}