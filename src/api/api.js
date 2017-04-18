import axios from 'axios';

let base = '';
//登录
export const loginUser = params => { return axios({
	url:'/divideclass/user/UserMainAction.a?login', method:'post', data:params,
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
		/*'Content-Type':'multipart/form-data'*/
		/* 'Content-Type':'application/Body-raw'*/
	}
}).then(res => res.data)};
//退出
export const logoutUser = params =>{ return axios.post('',params).then(res => res.data)};
//注册
export const registerUser = params => { return axios({
	url:'/divideclass/user/UserMainAction.a?register', method:'post', data:params,
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
		/*'Content-Type':'multipart/form-data'*/
		/* 'Content-Type':'application/Body-raw'*/
	}
}).then(res => res.data)};
//发送验证码
export const registerSendCode = params => { return axios({
	url:'/divideclass/user/UserMainAction.a?sendMsgCode', method:'post', data:params,
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
		/*'Content-Type':'multipart/form-data'*/
		/* 'Content-Type':'application/Body-raw'*/
	}
}).then(res => res.data)};
//登陆后首页获取数据
export const requestGetList = params => { return axios({
	url:'/divideclass/request/RequestAction.a?requestList', method:'post', data:params,
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
		/*'Content-Type':'multipart/form-data'*/
		/* 'Content-Type':'application/Body-raw'*/
	}
}).then(res => res.data)};
//获取分班后的结果
export const getResultClass = params => { return axios({
	url:'/divideclass/result/ClassResultAction.a?findResultDifference', method:'post', data:params,
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
		/*'Content-Type':'multipart/form-data'*/
		/* 'Content-Type':'application/Body-raw'*/
	}
}).then(res => res.data)}
//获取分班后的规则
export const getResultClassRules = params => { return axios({
	url:'/divideclass/request/RequestAction.a?requestRuleList', method:'post', data:params,
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
		/*'Content-Type':'multipart/form-data'*/
		/* 'Content-Type':'application/Body-raw'*/
	}
}).then(res => res.data)}
//获取分班后的详情
export const getResultClassInfo = params => { return axios({
	url:'/divideclass/result/ClassResultAction.a?findResultDetail', method:'post', data:params,
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
		/*'Content-Type':'multipart/form-data'*/
		/* 'Content-Type':'application/Body-raw'*/
	}
}).then(res => res.data)}
//收藏分班后的文件
export const collectResultClassInfo = params => { return axios({
	url:'/divideclass/result/ClassResultAction.a?collectResult', method:'post', data:params,
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
		/*'Content-Type':'multipart/form-data'*/
		/* 'Content-Type':'application/Body-raw'*/
	}
}).then(res => res.data)};
//上传文件
export const uploadFile = params => { return axios({
	url: '/divideclass/request/RequestAction.a?upload',data: params,method: 'post',
	transformResponse: [function (data) {
    // 这里提前处理返回的数据

     return data;
    }],

	headers:{
		'Content-Type': 'application/x-www-form-urlencoded'
		/*'Content-Type': 'multipart/form-data'*/
		/* 'Content-Type':'application/Body-raw'*/
	}
}).then(res => res)}