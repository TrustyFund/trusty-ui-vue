import * as types from '../mutations'
import {User} from "../services/api";

export const getUser = ({commit},username) => {
	commit(types.GET_USER_REQUEST);
	User.Get(username).then((result) => {
		commit(types.GET_USER_COMPLETE,result[0][1]);
	}, (error) => {
		commit(types.GET_USER_ERROR);
	});
}