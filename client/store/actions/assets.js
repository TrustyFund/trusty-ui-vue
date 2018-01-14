import * as types from '../mutations'
import * as apis from "../services/api";

export const fetchAssets = ({commit},assets) => {
	commit(types.FETCH_ASSETS_REQUEST);
	apis.getAssets(assets).then( (result) => {
		commit(types.FETCH_ASSETS_COMPLETE,result);
	}, (error) => {
		commit(types.FETCH_ASSETS_ERROR);		
	});
};

export const fetchDefaultAssets = ({commit}) => {
	//TODO MOVE TO CONFIG DEFAULT ASSETS
	let default_assets = ["BTS","OPEN.EOS","USD","OPEN.OMG","CNY","OPEN.LTC","OPEN.EOS","TRFND","OPEN.BTC","ARISTO","ARCOIN"];
	commit(types.FETCH_DEFAULT_ASSETS_REQUEST);
	apis.getAssets(default_assets).then( (result) => {
		commit(types.FETCH_DEFAULT_ASSETS_COMPLETE,result);
	}, (error) => {
		commit(types.FETCH_DEFAULT_ASSETS_ERROR);
	});
}