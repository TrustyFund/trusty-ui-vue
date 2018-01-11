import * as types from '../mutations'
import {User} from "../services/api";

export const getUser = ({commit},username) => {
	User.Get(username).then( (result) => {
		commit(types.GET_USER,result[0][1]);
	});
}