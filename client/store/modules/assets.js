import * as types from '../mutations';
import * as actions from '../actions/assets';

let state = {
	assets: null,
}

let mutations = {
	[types.GET_ASSETS] (state,assets){
		state.assets = assets;
		console.log("assets",assets)
	}
}

export default {
  state,
  actions,
  mutations
}