<template>
	<section>
		 <el-form :model="loginForm2" :rules="loginForm2rules2" ref="loginForm2" class="demo-ruleForm">
		  <el-form-item prop="username">
		    <el-input placeholder="请输入手机号" v-model.number="loginForm2.username" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item prop="pass">
		    <el-input type="password" placeholder="请输入密码" icon='' v-model="loginForm2.pass" auto-complete="off"></el-input>
		  </el-form-item>
		      <el-checkbox v-model="resource" @change='resourceChange'>记住密码</el-checkbox>
		      <span class="forget"><a href="/">忘记密码</a></span>
		  <el-form-item>
		    <el-button class='loginBtn' type="primary" @click="submitLogin('loginForm2')" :loading="loading">登录</el-button>
		  </el-form-item>
		  <div class="regist">还没有账号，请<a href="/">注册</a></div>
		</el-form>
	</section>
</template>
<script>
    import { loginUser } from '../../api/api'
	import axios from 'axios'
	import qs from 'qs'
	export default {
		data(){
			return {
				loading:false,//是否正在请求
				resource:true,//是否记住密码
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
		            //console.log(this.loginForm2);
		            //let params = Object.assign({},this.loginForm2);
		            let params = {
		            	mobile: this.loginForm2.username,
		            	password: this.loginForm2.pass
		            }
		            loginUser(params).then(res => {
		            	console.log(res)
		            	if(res.result !=0){
		            		this.$notify({
			                  title: '错误',
			                  message: res.failedReason,
			                  type: 'error'
			                });
		            	}else{
		            		params.token = res.data.token;
			            	localStorage.setItem('user',JSON.stringify(params));
			            	this.$router.push('/index');
		            	}
		            }).catch(err => {console.log(err);this.loading = false})
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
			},
			resourceChange(){
				if(!this.resource){
					localStorage.clear();
				}
			}
		},
		mounted(){
			let user = localStorage.getItem('user');
			if(user){
				user = JSON.parse(user);
				this.loginForm2.username = user.mobile;
				this.loginForm2.pass = user.password
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