import * as types from '../mutations'
import * as apis from "../services/api";

export const getAssets = ({commit},assets) => {
	apis.getAssets(assets).then( (result) => {
		commit(types.GET_ASSETS,result);
	});
};