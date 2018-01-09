import * as types from '../mutations'
import * as apis from "../services/api";

export const getUser = ({commit},username) => {
	apis.getInstance().db_api().exec("get_full_accounts", [[username], false])
    .then( (results) => {
    	commit(types.GET_USER,results[0][1]);
    });
}