import {Apis} from "bitsharesjs-ws";

export const initApis = (statusCallback) => {
	let wsString = "wss://bitshares.openledger.info/ws";
	Apis.setRpcConnectionStatusCallback(statusCallback);
	return Apis.instance(wsString, true).init_promise;
}

export const getInstance = () => {
	return Apis.instance();
}

export const getAssets =  (assets) => {
	return new Promise((resolve,reject) => {
		Apis.instance().db_api().exec( "lookup_asset_symbols", [ assets ] )
	    .then( asset_objects => {
	    	resolve(asset_objects);
	    }).catch( error => {
	        reject(error);
	    });
	});
}

export const getUser = (username) => {
	return new Promise((resolve,reject) => {
		Apis.instance().db_api().exec("get_full_accounts", [[username], false])
	    .then( users => {
	    	resolve(users);
	    }).catch( error => {
	        reject(error);
	    });
	});
}