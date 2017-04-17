<template>
	<section>
		<el-form :model="registForm" :rules='registForm2rules' ref="registValidateForm" class="demo-ruleForm">
		  <el-form-item prop='username'>
		    <el-input type="tel" placeholder="请输入手机号" v-model.number="registForm.username" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item prop='yangzhengma'>
		    <el-input class='myInput' placeholder="请输入验证码" @blur='checkCode' v-model="registForm.yangzhengma" auto-complete="off"></el-input>
		    <el-button @click='sendCode'>发送验证码</el-button>
		  </el-form-item>
		  <el-form-item prop='pass'>
		    <el-input type="password" placeholder="请输入密码" v-model="registForm.pass" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item prop='checkPass'>
		    <el-input type="password" placeholder="请再次输入密码" v-model="registForm.checkPass" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="success" class='registBtn' :loading="loading" @click="registerForm('registValidateForm')">注册</el-button>
		  </el-form-item>
		</el-form>
	</section>
</template>
<script>
	import { registerUser, registerSendCode } from '../../api/api'
	import axios from 'axios'
	export default {
		data(){
			return {
				loading:false,//是否正在请求
				registForm:{
			   		username:'',
			   		pass:'',
			   		checkPass:'',
			   		yangzhengma:''
			   	},
			   	registForm2rules:{
			   		username:[{required: true, message: '请输入正确的手机号', trigger: 'blur', type: 'number'}],
			   		pass:[{ required: true, message: '请输入密码', trigger: 'blur' }],
			   		checkPass:[{ required: true, message: '请再次确认密码', trigger: 'blur' }],
			   		yangzhengma:[{required: true, message: '请输入验证码', trigger: 'blur' }]
			   	}
			}
		},
		methods:{
			sendCode(){//发送验证码
		      	let params = {
		      		mobile: this.registForm.username,
		      		type:1
		      	}
		      	registerSendCode(params).then(res => {
		      		console.log(res)
		      		if(res.result !=0){
	            		this.$notify({
		                  title: '错误',
		                  message: res.failedReason,
		                  type: 'error'
		                });
	            	}else{
	            		this.$notify({
		                  title: '成功',
		                  message: '发送成功',
		                  type: 'success'
		                });
	            	}
		      	})
		      },
		      checkCode(){//检查验证码
		      	if(this.registForm.yangzhengma ==''){
		      		return false;
		      	}
		      	let params = {
		      		mobile: this.registForm.username,
		      		msgCode: this.registForm.yangzhengma
		      	}
		      	setTimeout(check,1000)
		      	function check(){
		      		return axios({
		      			url: "/divideclass/user/UserMainAction.a?checkCode",
		      			method: 'post',
		      			data: params,
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
		      		}).then(res => {
		      			console.log(res.data)
		      		})
		      	}
		    },
		    registerForm(formName){
		    	this.$refs[formName].validate((valid) => {
		    		if(valid){
		    			this.loading = true;
		    			let params = {
			            	mobile: this.registForm.username,
			            	password: this.registForm.pass,
			            	msgCode: this.registForm.yangzhengma
			            }
			            registerUser(params).then(res => {
			            	this.loading = false;
			            	console.log(res)
			            	let user = {
			            		mobile:params.mobile,
			            		password:params.password
			            	};
			            	user.token = res.data.token;
			            	localStorage.setItem('user',JSON.stringify(user))
			            	this.$router.push('/index')
			            }).catch(err => {
			            	console.log(err);
			            	this.loading = false;
			            })
		    		}else{

		    		}
		    	})
		    }
		}
	}
</script>
<style scoped>
	.myInput{width:248px;}
	.registBtn{width:100%;}
</style>