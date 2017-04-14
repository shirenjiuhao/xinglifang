<template>
	<section>
		<footer class="footer">
			<span v-text='msg'></span><span v-text='version'></span>
		</footer>
	</section>
</template>
<script>
	export default {
	  name: 'footer',
	  data () {
	    return {
	      msg: '北京星立方科技发展股份有限公司版权所有',
	      version:'v1.0.0.030-170324'
	    }
	  }
	}
</script>
<style scoped lang='less'>
	.footer{
		display: flex;justify-content: center;align-items: center;height:55px;position: fixed;bottom: 0;width:100%;background:#F3F4F5;font-size:12px;
		span:not(:first-child){margin-left:20px;}
	}
</style>