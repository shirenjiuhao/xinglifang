<template>
	<section>
		<myHeader :isLogins='isLogin'></myHeader>

		<myFooter></myFooter>
	</section>
</template>
<script>
	import myHeader from './subComponents/Header'
    import myFooter from './subComponents/Footer'
    export default {
    	components:{ myHeader, myFooter },
    	data(){
    		return {
    			isLogin:true,
    			lists:'',
                token:''
    		}
    	},
    	mounted(){
    		let user = localStorage.getItem('user');
            if(user){
                user = JSON.parse(user);
                this.token = user.token
            }
    	}
    }
</script>
<style scoped lang='less'></style>