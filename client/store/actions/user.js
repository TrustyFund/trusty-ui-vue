import * as types from '../mutations'

export const getUser = ({commit,rootState},username) => {
	rootState.apis.instance.db_api().exec("get_full_accounts", [[username], false])
    .then( (results) => {
    	commit(types.GET_USER,results[0][1]);
    });
}