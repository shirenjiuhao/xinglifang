<template>
	<section>
		<!--头部-->
		<header class="header">
	      <nav class="nav">
	        <a href="#" class="logo"><img src="../../assets/logo.png" alt="品牌" /></a>
	        <div class="user-info">
	          <a href="#/index">首页</a>
	          <span v-if='isLogins'>用户： {{username}}</span>
	          <a @click='logout' v-if='isLogins'>退出</a>
	          <div class="login-b login" @click='login' v-if='!isLogins'>登录</div>
	          <div class="login-b" @click='regist' v-if='!isLogins'>注册</div>
	        </div>
	      </nav>
	    </header>
	</section>
</template>
<script>
    import { logoutUser } from '../../api/api'
	export default {
	  props:['isLogins'],
	  data(){ 
		  return {
		    username: ''
		  }
		},
		methods: {
		  logout(){
		  	this.$confirm('确认退出吗?', '提示', {
				//type: 'warning'
			}).then(() => {
				this.$router.push('/');
				localStorage.clear();
			})
		  },
		  login(){//显示登录界面
		  	this.$emit('login-true',true)
		  },
		  regist(){//显示注册界面
		  	this.$emit('regist-true',true)
		  }
		},
		mounted() {
			let user = localStorage.getItem('user');
			if(user){
				user = JSON.parse(user);
				this.username = user.mobile || '';
			}
		}
	}
</script>
<style scoped lang='less'>
.header{
    color:#fff;
    .nav{
		display: flex;height:70px;justify-content: space-between;align-items: center;
		background: #1F2D3D;color:#fff;padding: 0 50px;box-shadow: 0 1px 2px #646464;
		.logo{
			display: block;height: 36px;
			img{height: 100%;}
		}
		.user-info{
			display: flex;justify-content: center;align-items: center;
			span{ margin:0 20px; }
			a{color:#fff;cursor: pointer;}
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