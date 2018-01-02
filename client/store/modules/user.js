import * as types from '../mutations';
import * as actions from '../actions/user';

let state = {
	user: null,
}

let mutations = {
	[types.GET_USER] (state,user){
		state.user = user;
		console.log("USER",user)
	}
}

export default {
  state,
  actions,
  mutations
}