import * as types from '../mutations'
import * as apis from "../services/api";

export const getAssets = ({commit},assets) => {
	commit(types.GET_ASSETS_REQUEST);
	apis.getAssets(assets).then( (result) => {
		commit(types.GET_ASSETS_COMPLETE,result);
	}, (error) => {
		commit(types.GET_ASSETS_ERROR);		
	});
};

export const getDefaultAssets = ({commit}) => {
	//TODO MOVE TO CONFIG DEFAULT ASSETS
	let default_assets = ["BTS","OPEN.EOS","USD","OPEN.OMG","CNY","OPEN.LTC","OPEN.EOS","TRFND","OPEN.BTC","ARISTO","ARCOIN"];
	commit(types.GET_DEFAULT_ASSETS_REQUEST);
	apis.getAssets(default_assets).then( (result) => {
		commit(types.GET_DEFAULT_ASSETS_COMPLETE,result);
	}, (error) => {
		commit(types.GET_DEFAULT_ASSETS_ERROR);
	});
}