import * as types from '../mutations';
import * as actions from '../actions/assets';
import * as getters from '../getters/assets';

let state = {
	assets: null,
}

let composeAssets = (assets) => {
	let composedAssets = {};
	assets.forEach((asset)=>{
		composedAssets[asset.id] = asset;
	});	
	return composedAssets;
}

let mutations = {
	[types.GET_ASSETS] (state,assets){
		state.assets = composeAssets(assets);
	},
	[types.GET_DEFAULT_ASSETS] (state,assets){
		state.assets = composeAssets(assets);
	}
}

export default {
  state,
  actions,
  mutations,
  getters
}