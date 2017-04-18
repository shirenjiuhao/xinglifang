<template>
	<section>
		<myHeader :isLogins='isLogin'></myHeader>
		<div class='container'>
			<div class="container_content">
				<p v-text='requestName'></p>
				<div class="start_btn">
					<el-button type='success' size='large' @click.native='resetClass'>重新分班</el-button>
					<span>对下列分班结果不满意</span>
				</div>
				<div class='falselistFlag' v-if='!listFlag'>暂时没有结果，您可以刷新页面，也可以重新分班</div>
				<div class="container_main" v-if='listFlag'>
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
									<span @click='getInfo(content.resultID)'>详情</span><span @click='downInfo(content.resultID)'>下载<img v-if='content.ifDownload>0' src="../assets/Group7.png" alt=""></span><span @click='houseInfo(content.resultID)'>收藏<img v-if='content.ifCollect>0' src="../assets/Group7.png" alt=""></span>
								</td>
							</tr>
						</tbody>
					</table>
					<footer>上表中的数据为班级间最大差值。</footer>
				</div>
				<div class="classRules" v-if='listFlag'>
					<h4>本次分班的规则：</h4>
					<div class="rules">
						<div class="title">人数均衡</div>
						<span v-for='rule in listsRules.data' v-if='rule.divideRule == 12020' v-text='rule.colName'></span>
					</div>
					<div class="rules">
						<div class="title">成绩均衡</div>
						<span v-for='rule in listsRules.data' v-if='rule.divideRule == 12030' v-text='rule.colName'></span>
					</div>
					<div class="rules">
						<div class="title">优先满足</div>
						<span v-for='rule in listsRules.data' v-if='rule.ruleWeight == 13010' v-text='rule.colName'></span>
					</div>
					<div class="rules">
						<div class="title">分班参数</div>
						<span>班级数：{{listsRules.classCnt}}</span>
						<span>人数均衡：班级间最大差值{{listsRules.personEquilibrium}}</span>
						<span>成绩均衡：班级间最大差值{{listsRules.scoreEquilibrium}}</span>
					</div>
				</div>
			</div>
		</div>
		<myFooter></myFooter>
		<!--弹出详情表格-->
		<el-dialog v-model="tableVisible" size=''>
		  <table class='dialog_table' border='1' cellspacing="0">
		  	<thead>
		  		<tr>
		  			<th colspan="4" rowspan="3">分班结果</th>
		  			<th rowspan="3">人数</th>
		  			<th v-for='firstTitle in tableInfoList.firstTitle' :rowspan="firstTitle.rowspan" :colspan="firstTitle.colspan" v-text='firstTitle.name'></th>
		  		</tr>
		  		<tr>
		  			<th v-for='secondTitle in tableInfoList.secondTitle' v-text='secondTitle.name'></th>
		  		</tr>
		  	</thead>
		  	<tbody>
		  		<tr v-for='cons in tableInfoList.content'>
		  			<td colspan="4" v-text='cons.resultName'></td>
		  			<td v-text='cons.totleDifference'></td>
		  			<td v-for='con in cons.resultDifference' :class="con.ifSatisfy == 0 ? xb_s : ''" v-text='con.num'></td>
		  		</tr>
		  	</tbody>
		  </table>
		</el-dialog>

	</section>
</template>
<script>
	import myHeader from './subComponents/Header'
    import myFooter from './subComponents/Footer'
    import { getResultClass, getResultClassRules, getResultClassInfo, collectResultClassInfo } from '../api/api'
    import qs from 'qs'
    export default {
    	components: { myHeader, myFooter },
    	data(){
    		return {
    			isLogin:true,
    			token:'',
    			lists:'',//表格数据
    			requestName:'',
    			xb_s:"xb_s",//异常的css样式
    			listFlag:false,//表格默认隐藏，加载完数据后显示
    			listsRules:'',//分班规则
    			tableVisible:false,//详情表格是否显示
    			tableInfoList:''
    		}
    	},
    	methods:{
    		resetClass(){
    			this.$router.push('/startClass')
    		},
    		getList(token,id){
    			let params = {
    				token: token,
    				requestID: id
    			}
    			getResultClass(params).then(res => {
    				//console.log(res);
    				this.lists = res.data;
    				if(this.lists.content.length != 0){
    					this.listFlag = true;
    				}
    			})
    			getResultClassRules(params).then(res => {
    				//console.log(res);
    				this.listsRules = res;
    			})
    		},
    		getInfo(id){
    			let params = {
    				token: this.token,
    				resultID: id,
    				requestID: this.$route.params.id
    			}
    			getResultClassInfo(params).then(res => {
    				this.tableVisible = true;
    				//console.log(res)
    				this.tableInfoList = res.data;
    			})
    		},
    		downInfo(id){
    			//alert(id)
				let params = {
    				token: this.token,
    				resultID: id,
    				requestID: this.$route.params.id
    			}
    			params = qs.stringify(params)
    			// console.log(params)
    			window.location.href = `/divideclass/result/ClassResultAction.a?downloadResult&${params}`;
    			this.$notify({
                  title: '成功',
                  message: '您成功已下载',
                  type: 'success'
                });
                this.getList(this.token,this.$route.params.id)
    		},
    		houseInfo(id){
    			console.log(id)
				let params = {
    				token: this.token,
    				resultID: id,
    				requestID: this.$route.params.id
    			}
    			collectResultClassInfo(params).then(res => {
    				if(res.result != 0){
    					this.$notify({
		                  title: '错误',
		                  message: res.failedReason,
		                  type: 'error'
		                });
    				}else{
    					this.$notify({
		                  title: '成功',
		                  message: '收藏成功',
		                  type: 'success'
		                });
		                this.getList(this.token,this.$route.params.id)
    				}
    			})
    		}
    	},
    	mounted(){
    		let user = localStorage.getItem('user');
    		if(user){
    			user = JSON.parse(user);
    			this.token = user.token;
				this.getList(this.token,this.$route.params.id)
				this.requestName = '分班活动' + this.$route.params.id;
				//console.log(this.$route.params.id)
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
			.falselistFlag{text-align: center;color:#2c3e50;margin-top: 15%;}
			.container_main{
				padding:20px 0px;text-align: center;
				.table{
					background-color: #fff;font-size: 12px;border-color:#e8e8e8;
					.fb{vertical-align: middle;
						.fb_t{padding:10px 65px;}
						.fb_f{padding:10px 50px;}
						th{width:10px;padding:10px 15px;}
					}
					.xb{
						height:50px;
						.xb_s{background:#FFD083;}
						td{padding:5px;background:rgb(245, 255, 250);}
						.handle{
							span{background: #fff;padding:5px 10px;cursor:pointer;position: relative;
								border-radius:5px;color:#2FD37D;border: 1px solid #2FD37D;
								img{position: absolute;top:-5px;right:-5px;}
							}
							span:nth-child(2){margin: 0 5px;}
						}
					}
				}
				footer{font-size: 12px;margin-top: 8px;text-align: left;padding-left: 178px;}
			}
			.classRules{
				margin-bottom: 70px;font-size: 14px;
				h4{color:rgb(51,51,51);}
				.rules{display:flex;align-items: center;margin-top:20px;
					.title{
						height: 60px;line-height: 60px;width:140px;text-indent: 50px;
						border-right:1px solid #ccc;margin-right: 30px;
					}
				}
				.rules:not(:last-child) span{
					border:1px solid #2FD37D;padding:3px 20px;color:#2FD37D;font-size: 12px;margin:0 5px;
				}
				.rules:last-child span{margin-left: 50px;}
			}
		}
	}
	.dialog_table{
		border-color:#ccc;text-align: center;
		thead{
			tr th{width:20px;padding:10px 20px;}
		}
		tbody{
			tr{height: 50px;
				td{background:#F5FFFA;}
				.xb_s{background:#FFD083;}
			}
		}
	}
</style>