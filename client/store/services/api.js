import {Apis} from "bitsharesjs-ws";

export const initApis = (statusCallback) => {
	let wsString = "wss://bitshares.openledger.info/ws";
	Apis.setRpcConnectionStatusCallback(statusCallback);
	return Apis.instance(wsString, true).init_promise;
}

export const getInstance = () => {
	return Apis.instance();
}

