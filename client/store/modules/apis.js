import * as types from '../mutations';
import * as actions from '../actions/apis';

let state = {
	connected: false,
	instance: null
}

let mutations = {
	[types.WS_CONNECTED] (state,instance) {
		state.connected = true;
		state.instance = instance;
		console.log("CONNECTED",instance);
	},
	[types.WS_DISCONNECTED] (state) {
		state.connected = false;
		state.instance = null;
	},
	[types.WS_ERROR] (state){
		state.connected = false;
		state.instance = null;
	},
	[types.GET_USER] (state,user){
		console.log("USER",user)
	}
}

export default {
  state,
  actions,
  mutations
}