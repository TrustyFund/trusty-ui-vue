import * as types from '../mutations';
import * as actions from '../actions/user';
import * as getters from '../getters/user';

let state = {
	account: null,
	balances: []
}

let mutations = {
	[types.GET_USER] (state,result){
		state.account = result.account;
		state.balances = result.balances;
		console.log("USER GET",state)
	}
}

export default {
  state,
  actions,
  getters,
  mutations
}