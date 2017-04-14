<template>
	<section>
		<!--头部-->
		<header class="header">
	      <nav class="nav">
	        <a href="#" class="logo"><img src="../assets/logo.png" alt="品牌" /></a>
	        <div class="user-info">
	          <a href="/">首页</a>
	          <span v-if='isUser'>用户:{{username}}</span>
	          <a href="#" @click='logout' v-if='isUser'>退出</a>
	          <div class="login-b login" @click='login' v-if='!isUser'>登录</div>
	          <div class="login-b" @click='regist' v-if='!isUser'>注册</div>
	        </div>
	      </nav>
	    </header>
	    <!--登录窗口-->
	    <el-dialog v-model="loginPage" size="tiny" top='20%' class='loginWin'>
		  <Login></Login>
		</el-dialog>

		<!--注册窗口-->
		<el-dialog title="注册" v-model="registPage" size="tiny">
			<Register></Register>
		</el-dialog>
	</section>
	

</template>
<script>
	import { loginUser } from '../api/api'
	import Login from './Login'
	import Register from './Register'
	export default {
	  components:{ Login, Register },
	  data(){ 
		  return {
		    username: 'hello',
		   	imgUrl:'../assets/logo.png',
		   	isUser:false,//用户是否登录
		   	loginPage:false,//是否显示登录界面
		   	registPage:false,//是否显示注册页面
		  }
		},
		methods: {
		  logout(){
		    this.$route.path('/');
		  },
		  login(){//显示登录界面
		  	this.loginPage = true;
		  },
		  regist(){//显示注册界面
		  	this.registPage = true
		  },
		  resetForm(formName) {//重置表单
	        this.$refs[formName].resetFields();
	      }
		}
		// props:['imgUrl']
	}
</script>
<style scoped lang='less'>
.header{
    color:#fff;
    .nav{
		display: flex;height:70px;justify-content: space-between;align-items: center;
		background: #1F2D3D;color:#fff;padding: 0 20px;box-shadow: 0 1px 2px #646464;
		.logo{
			display: block;height: 36px;
			img{height: 100%;}
		}
		.user-info{
			display: flex;justify-content: center;align-items: center;
			span{ margin:0 20px; }
			a{color:#fff;}
			a:hover{color:#29F28A;}
			.login-b{width:80px;text-align: center;line-height:36px;
				border: 1px solid #29F28A;color:#29F28A;cursor:pointer;
			}
			.login-b:hover{background:#28B66C;color:#fff;}
			.login{margin:0 20px;

			}
		}
    }
}

</style>