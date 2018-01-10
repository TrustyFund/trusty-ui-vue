import * as types from '../mutations';
import * as actions from '../actions/assets';

let state = {
	assets: {},
}

let mutations = {
	[types.GET_ASSETS] (state,assets){
		assets.forEach((asset)=>{
			state.assets[asset.id] = asset;
		});
	},
	[types.GET_DEFAULT_ASSETS] (state,assets){
		assets.forEach((asset)=>{
			state.assets[asset.id] = asset;
		});
	}
}

export default {
  state,
  actions,
  mutations
}