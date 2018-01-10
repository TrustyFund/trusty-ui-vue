import * as types from '../mutations'
import * as apis from "../services/api";

export const getAssets = ({commit},assets) => {
	apis.getAssets(assets).then( (result) => {
		commit(types.GET_ASSETS,result);
	});
};

export const getDefaultAssets = ({commit}) => {
	let default_assets = ["BTS","OPEN.EOS"];
	apis.getAssets(default_assets).then( (result) => {
		commit(types.GET_DEFAULT_ASSETS,result);
	});
}