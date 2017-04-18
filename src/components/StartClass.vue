<template>
	<section>
		<myHeader :isLogins='isLogin'></myHeader>
        <div class='container'>
            <p class="header_title"><span>{{resultName}}</span></p>
            <div class="body_content">
                <div class='body_title'><span>1.上传分班数据</span></div>
                <div class='body_fileLoad'>
                    <input type="file" id='file_input' @change='filesUpload()'>
                    <el-button type="success" @click='onfile'>上传</el-button>
                    <div class="body_fileLoad_text"><span>如需指定某些学生到某班，请将包含班级信息的数据列名称修改为“班级”。</span>
                    <p>上传文件为Excel 97-2003格式</p>
                    </div>
                </div>
                <div class='body_main'>
                    <div class='body_main_title'>
                        <span>上传文件内容示例：</span>
                        <span @click='missingExam'><img src="../assets/onload_2x.png" alt="">分班数据示例-有缺考</span>
                        <span @click='readyClass'><img src="../assets/onload_2x.png" alt="">分班数据示例-预置班级</span>
                    </div>
                    <div class="body_main_content">
                        <img src="../assets/Group11_1x.png" alt="">
                    </div>
                    <div v-if='uploadListVisible'>
                        <div class='filed_content' >
                            <div class='reslove'>上传文件中数据项统计：</div>
                            <table border='1' cellspacing='0'>
                                <thead>
                                    <tr>
                                        <th rowspan='3' class='x_fb'>统计</th>
                                        <th v-for='firstTitle in uploadList.firstTitle' :colspan='firstTitle.colspan' :rowspan='firstTitle.rowspan' v-text='firstTitle.name'></th>
                                    </tr>
                                    <tr>
                                        <th v-for='secondTitle in uploadList.secondTitle' v-text='secondTitle.name'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>人数</th>
                                        <td v-for='con in uploadList.content' v-text='con.value'></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class='reslove_footer'>请检查上表中各数据项统计值是否与上传文件内容相符，如不符请修改上传文件后重新导入。</div>
                        </div>
                        <div class='filed_select'>
                            <div class='body_title'>
                                <span>2.设置各项数据用途</span>
                            </div>
                            <div class='class_rules'>
                                <p>分班规则</p>
                                <div class='class_rules_select'>
                                    <div class='rules_title'><span>人数均衡</span><span>成绩均衡</span></div>
                                    <div class='rules_box'>
                                        <div class='rules_left' id='rules_left'></div>
                                        <div class='rules_right' id='rules_right'></div>
                                    </div>
                                    <div class='rules_box_item' @change='startDarg'>
                                        <span @drag='startDarg' class='rules_item' draggable='true' v-for='firstTitle in uploadList.firstTitle' v-text='firstTitle.name'></span>
                                    </div>
                                </div>
                                <span class='rules_footer'>若存在学生缺考某些科目，请勿将“总分”作为分班规则。</span>
                            </div>
                            <div class='first_classRules'>
                                <p class='first_classRules_info'>选择优先满足规则的数据项：<span>单击数据项来选中，选中的数据项将比其它数据项优先满足;</span></p>
                                <div class='first_classRules_btn'><span v-for='firstTitle in uploadList.firstTitle' v-text='firstTitle.name'></span></div>
                            </div>
                        </div>
                        <div class='set_class_rules'>
                            <div class='body_title'>
                                <span>3.设置分班参数</span>
                            </div>
                            <div class='set_class_rules_info'>
                                <div><span>班级数：</span><input type="number" placeholder='8' min='2' max='28' step='2'> 2~28</div>
                                <div><span>人数均衡，要求班级间最大差值：</span><input type="number" placeholder='1' min='1' max='5' step='1'> 1~5</div>
                                <div><span>成绩均衡，要求班级间最大差值：</span><input type="number" placeholder='0.2' min='0.1' max='2' step='0.1'> 0.1~2</div>
                            </div>
                        </div>
                        <div class='body_content_footer'>
                            <el-button type='success' size='large' @click.native='startClass'>开始分班</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<myFooter></myFooter>
	</section>
</template>
<script>
	import myHeader from './subComponents/Header'
    import myFooter from './subComponents/Footer'
    import { uploadFile } from '../api/api'
    export default {
    	components:{ myHeader, myFooter },
    	data(){
    		return {
    			isLogin:true,
    			lists:'',
                token:'',//用户的token
                uploadList:'',//上传文件的数据
                uploadListVisible:false,//是否显上传后的文件内容
                resultName:''//本次活动的名字
    		}
    	},
        methods:{
            missingExam(){
                 //window.location.href ="datademo/分班数据（示例1：有缺考）.xls"
                 alert(1)
            },
            readyClass(){
                alert(1)
                //window.location.href ="datademo/分班数据（示例2：预设班级）.xls"
            },
            onfile(){
                document.getElementById('file_input').click();
            },
            filesUpload(){
                let file = document.getElementById('file_input').files[0];
                // console.log(file)
                if (!file) {
                    this.$notify.error({
                        title: '错误',
                        message: '请选择文件'
                    });
                    return;
                }
                let form = new FormData();
                if(file){
                    form.append("file", file)
                }
                form.append('token',this.token);
                form.append('requestID','');
                form.append('fileNameEncode',encodeURI(document.getElementById('file_input').value))
                uploadFile(form).then(res => {
                    console.log(res);
                    this.uploadList = res;
                    this.uploadListVisible = true;
                    document.getElementById('file_input').value = '';
                })
            },
            startClass(){
                alert(1)
            },
            startDarg(){
                let rules_item = document.getElementsByClassName('rules_item');
                let rules_left = document.getElementById('rules_left')
                let rules_right = document.getElementById('rules_right')
                document.ondragover = function(e){e.preventDefault()}
                document.ondrop = function(e){e.preventDefault()}
                for (var i = rules_item.length - 1; i >= 0; i--) {
                    rules_item[i].addEventListener('dragstart',function(ev){
                        let dt = ev.dataTransfer
                        dt.effectAllowed = 'move';
                        dt.setData('text/html',this)
                        console.log(dt)
                    },false)
                };
                rules_left.addEventListener('dragend',function(ev){
                    ev.preventDefault();
                },false)
                rules_right.addEventListener('dragend',function(ev){
                    ev.preventDefault();
                },false)
                rules_right.addEventListener('drop',function(ev){
                    let dt = ev.dataTransfer;
                    let text = dt.getData('text/html')
                    console.log(text)
                    rules_right.innerHTML += text;
                    ev.preventDefault();
                    ev.stopPropagation();
                },false)
                rules_left.addEventListener('drop',function(ev){
                    let dt = ev.dataTransfer;
                    let text = dt.getData('text/html')
                    console.log(text)
                    rules_left.innerHTML += text;
                    ev.preventDefault();
                    ev.stopPropagation();
                },false)
            }
        },
    	mounted(){
    		let user = localStorage.getItem('user');
            if(user){
                user = JSON.parse(user);
                this.token = user.token
            }
    	},
        watch:{
            uploadList(){
                if(this.uploadList.length!=0){
                    return this.resultName = this.uploadList.requestName
                }
                else return this.resultName
            }
        }
    }
</script>
<style scoped lang='less'>
.container{
    min-height:70%;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0px 2px 7px 0px rgba(223,223,223,0.50);
    margin: 17px 50px 70px 50px;
    .header_title{
        height: 40px;box-shadow: 0px 1px 4px 0px #F2F2F2;font-size: 12px;line-height: 40px;text-indent: 20px;
    }
    .body_content{
        padding: 35px 20px 0 20px;font-size: 14px;
        .body_title{
            border-bottom:1px solid #2FD37D;position: relative;text-indent: 10px;color: #333;
        }
        .body_title:before{
            content:'';position: absolute;width:4px;height:24px;background-color: #2FD37D;left:4px;top:-2px;
        }
        .body_fileLoad{padding-top:30px;position: relative;left:4px;font-size: 18px;
            input{display: none;}
            .body_fileLoad_text{font-size: 12px;position: absolute;top:30px;left:75px;  
                span{
                    color:#D4D4D4;
                }
                p{color:#666666;}
            }
        }
        .body_main{padding:40px 0 25px;color:#333;
            .body_main_title{
                span{
                    img{width:14px;}
                }
                span:not(:first-child){
                    margin-left: 100px;cursor:pointer;
                }
                span:not(:first-child):hover{
                    color:#2FD37D;
                }
            }
            .body_main_content{
                padding-top:12px;
            }
            .filed_content{
                font-size: 12px;margin-top: 20px;
                .reslove{margin-bottom: 8px;}
                .reslove_footer{margin-top: 8px;}
                table{
                    text-align: center;border-color:#e8e8e8;
                    thead{
                        tr{
                            .x_fb{padding:0 65px;}
                            th{width:15px;padding:10px;}
                        }
                    }
                    tbody{
                        tr{height:108px;
                            td{
                               background: #F5FFFA;
                            }
                        }
                    }
                }
            }
            .filed_select{margin-top:50px;
                .class_rules{
                    margin-top: 27px;
                    .class_rules_select{margin-top: 15px;border:1px solid #e8e8e8;
                        width:600px;
                        .rules_title{display: flex;
                            span{flex:1;text-align: center;border-bottom: 1px solid #e8e8e8;background: #ECFFF5;}
                            span:first-child{border-right:1px solid #e8e8e8;}
                        }
                        .rules_box{display: flex;min-height:160px;
                            div{flex:1;padding: 12px 20px 0 30px;border-bottom:1px solid #e8e8e8;}
                            div:first-child{border-right:1px solid #e8e8e8;}
                        }
                        .rules_box_item{padding:12px 25px;min-height:160px;text-align: center;font-size: 12px;
                            span{border:1px solid #2FD37D;padding:6px 12px;margin:0 10px 10px 0;float: left;color:#2FD37D;}
                        }
                    }
                    .rules_footer{
                        color: #D4D4D4;font-size: 12px;
                    }
                }
                .first_classRules{margin-top:20px;font-size: 12px;padding-bottom:20px;
                    .first_classRules_info{height:30px;
                        span{color: #D4D4D4;}
                    }
                    .first_classRules_btn{
                        padding-top:12px;
                        span{border:1px solid #d8d8d8;padding:6px 12px;margin-right: 5px;color:#d8d8d8;}
                        .selected{border-color:#2FD37D;color:#2FD37D;}
                    }
                }
            }
            .set_class_rules{
                padding:35px 19px 19px 0;
                .set_class_rules_info{
                    div{line-height: 30px;margin-top: 20px;
                        span{text-align: right;display: inline-block;width: 220px;
                        }
                        input{width:60px;height:30px;text-align: center;}
                    }
                }
            }
            .body_content_footer{
                text-align: center;
            }
        }
    }
}    
</style>