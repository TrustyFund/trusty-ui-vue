import {Apis} from "bitsharesjs-ws";
import * as types from '../mutations'


export const initApis = ({ commit }) => {

	let connectionStatus = function(status){
		switch(status){
			case "open": 
				commit(types.WS_CONNECTED,Apis.instance());
			break;
			case "closed":
				commit(types.WS_DISCONNECTED);
			break;
			case "error":
				commit(types.WS_ERROR);
			break;
		}
	}

	let wsString = "wss://bitshares.openledger.info/ws";
	Apis.setRpcConnectionStatusCallback(connectionStatus);
	Apis.instance(wsString, true).init_promise;
}