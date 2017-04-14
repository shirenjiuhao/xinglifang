<template>
	<section>
		 <el-form :model="loginForm2" :rules="loginForm2rules2" ref="loginForm2" class="demo-ruleForm">
		  <el-form-item prop="username">
		    <el-input placeholder="请输入手机号" v-model.number="loginForm2.username" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item prop="pass">
		    <el-input type="password" placeholder="请输入密码" icon='' v-model="loginForm2.pass" auto-complete="off"></el-input>
		  </el-form-item>
		      <el-radio label="记住密码" v-model="resource" @change='resourceChange'></el-radio>
		      <span class="forget"><a href="/">忘记密码</a></span>
		  <el-form-item>
		    <el-button class='loginBtn' type="primary" @click="submitLogin('loginForm2')" :loading="loading">登录</el-button>
		  </el-form-item>
		  <div class="regist">还没有账号，请<a href="/">注册</a></div>
		</el-form>
	</section>
</template>
<script>
	import axios from 'axios'
	import qs from 'qs'
	export default {
		name:'login',
		data(){
			return {
				loading:false,//是否正在请求
				resource:false,//是否记住密码
				//登录表单
			   	loginForm2:{
			   		username:'',
			   		pass:''
			   	},
			   	loginForm2rules2:{//表单验证规则
			   		username:[{ required: true, message: '请输入正确的手机号', trigger: 'blur', type: 'number'}],
			   		pass:[{ required: true, message: '请输入密码', trigger: 'blur' }]
			   	},
			}
		},
		methods:{
			 submitLogin(formName){//提交登录
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	this.loading = true;
		            console.log(this.loginForm2);
		            //let params = Object.assign({},this.loginForm2);
		            let params = {
		            	mobile: this.loginForm2.username,
		            	password: this.loginForm2.pass
		            }
		            //params = qs.stringify(params)
		            axios({url:'/divideclass/user/UserMainAction.a?login',
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
		            	console.log(res)
		            	this.loading = false;
		            	this.isUser = true;
		            	this.username = 'Hello world!'
		            }).catch(err => {console.log(err);this.loading = false})
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
			},
			resourceChange(){
				if(this.resource && this.loginForm2.username && this.loginForm2.pass){
					let param = {
						username: this.loginForm2.username,
						password: this.loginForm2.pass
					}
					localStorage.setItem(param.username,param)
				}
			}
		},
		mounted(){
			var a = localStorage.length
			if(a){
				for(let i=0;i<a;i++){
					console.log(i)
					var user = localStorage.getItem(i)
					console.log(user)
				}
			}
		}
	}
</script>	
<style scoped lang='less'>
	.loginWin{
		padding:40px;
		.loginBtn{
			width:100%;background:#29C874;border-color:#29C874;
		}
		.forget{
			float: right;
			a{
				color:#29C874;
			}
		}
		.regist{
			a{
				color:#003400;
			}
		}
	}
</style>	