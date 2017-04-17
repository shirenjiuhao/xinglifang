<template>
	<section>
		<myHeader :isLogins='isLogin'></myHeader>
		<div class='container'>
			<div class="container_content">
				<p v-text='requestName'></p>
				<div class="start_btn">
					<el-button type='success' size='large'>重新分班</el-button>
					<span>对下列分班结果不满意</span>
				</div>
				<div class="container_main">
					<table class='table' border='1' cellspacing='0'>
						<thead class='thead'>
							<tr class='fb'>
								<th rowspan='3' colspan="4" class='fb_t'><span>分班结果</span></th>
								<th rowspan='3'><span>人数</span></th>
								<th v-for='title in lists.firstTitle' :rowspan='title.rowspan' :colspan="title.colspan" v-text='title.name'></th>
								<th rowspan='3'><span>结果评分</span></th>
								<th rowspan='3' colspan="5" class='fb_f'><span>对分班结果的操作</span></th>
							</tr>
							<tr class='fb'>
								<th v-for='title in lists.secondTitle' v-text='title.name'></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for='content in lists.content' class='xb'>
								<td v-text='content.resultName' colspan="4"></td>
								<td v-text='content.totleDifference'></td>
								<td v-for='title in content.resultDifference' v-text='title.num' :class="title.ifSatisfy == 0 ? xb_s : '' "></td>
								<td v-text='content.resultGrade'></td>
								<td colspan="5" class='handle'>
									<span>详情</span><span>下载</span><span>收藏</span>
								</td>
							</tr>
						</tbody>
					</table>
					<footer>上表中的数据为班级间最大差值。</footer>
				</div>
			</div>
		</div>
		<myFooter></myFooter>
	</section>
</template>
<script>
	import myHeader from './subComponents/Header'
    import myFooter from './subComponents/Footer'
    import { getResultClass } from '../api/api'
    export default {
    	components:{ myHeader, myFooter },
    	data(){
    		return {
    			isLogin:true,
    			lists:'',
    			requestName:'',
    			xb_s:"xb_s"
    		}
    	},
    	methods:{
    		getList(token,id){
    			let params = {
    				token: token,
    				requestID: id
    			}
    			getResultClass(params).then(res => {
    				console.log(res);
    				this.lists = res.data;
    			})
    		}
    	},
    	mounted(){
    		if(this.$router.params != null){
    			this.requestName = this.$router.params.requestName
    			console.log(this.$router.params)
    			this.getList(this.$router.params.token,this.$router.params.requestID)
    		}
    	}
    }
</script>
<style scoped lang='less'>
	.container{
		margin: 10px 50px 50px 50px;
		.container_content{
			padding-left:20px;box-sizing: border-box;padding-top:10px;
			p{font-size: 12px;}
			.start_btn{
				margin-top:43px;
				span{
					vertical-align: bottom;margin-left: 20px;font-size: 14px;color:#333;
				}
			}
			.container_main{
				padding:20px 0px;text-align: center;
				.table{
					background-color: #fff;font-size: 12px;border-color:#d4d4d4;
					.fb{vertical-align: middle;
						.fb_t{padding:10px 65px;}
						.fb_f{padding:10px 50px;}
						th{width:10px;padding:10px 15px;}
					}
					.xb{
						height:50px;
						.xb_s{background:#FFD083;}
						td{padding:5px;}
						.handle{
							span{background: #fff;padding:5px 10px;cursor:pointer;
								border-radius:5px;color:#2FD37D;border: 1px solid #2FD37D;
							}
							span:nth-child(2){margin: 0 5px;}
						}
					}
				}
				footer{font-size: 12px;margin-top: 8px;text-align: left;padding-left: 178px;}
			}
		}
	}
</style>