import * as types from '../mutations'
import * as apis from "../services/api";

export const getUser = ({commit},username) => {
	apis.getUser(username).then( (result) => {
		commit(types.GET_USER,result[0][1]);
	});
}