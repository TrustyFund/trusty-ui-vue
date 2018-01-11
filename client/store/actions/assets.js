import * as types from '../mutations'
import * as apis from "../services/api";

export const getAssets = ({commit},assets) => {
	apis.getAssets(assets).then( (result) => {
		commit(types.GET_ASSETS,result);
	});
};

export const getDefaultAssets = ({commit}) => {
	//TODO MOVE TO CONFIG DEFAULT ASSETS
	let default_assets = ["BTS","OPEN.EOS","USD","OPEN.OMG","CNY"];
	apis.getAssets(default_assets).then( (result) => {
		commit(types.GET_DEFAULT_ASSETS,result);
	});
}