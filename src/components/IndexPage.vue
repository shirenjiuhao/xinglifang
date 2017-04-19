<template>
	<section>
		<myHeader :isLogins='isLogin'></myHeader>
		<div class='container'>
			<!-- <p class='container_title'></p>
			<div class="container_content">
				<p></p>
			</div> -->
			<div class='button'>
				<el-button type='success' size="large" @click.native='startClass'>我要分班</el-button>
			</div>
			<div class="container_list" v-for='x in lists' v-if='lists.length >=0 ? true : false' @click='checkResult(x.requestID,x.requestName)'>
				<img src="../assets/Group4.png" alt="icon">
				<p v-text='x.requestName'></p>
			</div>

		</div>
		<myFooter></myFooter>
	</section>
</template>
<script>
	import myHeader from './subComponents/Header'
    import myFooter from './subComponents/Footer'
    import { requestGetList } from '../api/api'
    export default {
    	components:{ myHeader, myFooter },
    	data(){
    		return {
    			isLogin:true,
    			lists:'',
    			token:''
    		}
    	},
    	methods:{
    		getList(options){
    			requestGetList(options).then(res => {
    				//console.log(res);
    				this.lists = res.data;
    			})	
    		},
    		startClass(){
    			this.$router.push('/startClass')
    		},
    		checkResult(id,name){
    			let param = {
    				token: this.token,
    				requestID: id,
    				requestName: name
    			}
    			//console.log(this.$router.params)
    			this.$router.push(`/check/${param.requestID}`)
    		},
    	},
    	mounted(){
    		let user = localStorage.getItem('user');
    		if(user){
    			user = JSON.parse(user);
    			this.token = user.token
    			let para = {
    				token: user.token
    			}
    			this.getList(para);
    		}
    	}
    }
</script>
<style scoped lang='less'>
	.container{
		/* border: 1px solid #e8e8e8;
		margin: 10px 50px;
		.container_title{height:40px;box-shadow: 0px 1px 4px 0px #F2F2F2;}
		.container_content{padding: 35px 19px 0 19px} */
		margin: 40px 50px 60px;
		line-height: 25px;
		.button{
			margin-bottom:40px;
		}
		.container_list{
			display: flex;font-size: 14px;cursor: pointer;
			img{width:15px;height:15px;position: relative;top:5px;margin-right: 10px;}
		}
	}
</style>