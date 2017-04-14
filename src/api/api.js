import axios from 'axios';

let base = '';

export const loginUser = params => { return axios({
	url:'/divideclass/user/UserMainAction.a?login',method:'post',data: params,
	transformRequest: [function (data) {
	    // Do whatever you want to transform the data
	    let ret = ''
	    for (let it in data) {
	      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
	    }
	    return ret
	}],
	headers:{
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(res => res.data)} 