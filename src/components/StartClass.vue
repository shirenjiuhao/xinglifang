<template>
	<section>
		<myHeader :isLogins='isLogin'></myHeader>
        <div class='container'>
            <p class="header_title"><span>分班活动44</span></p>
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
                    <div class='filed_content'></div>
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
                token:''
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
                console.log(file)
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
                //console.log(document.getElementById('file_input').value)
                uploadFile(form).then(res => {
                    console.log(res)
                    document.getElementById('file_input').reset();
                }).catch((error) => {
                    this.$notify({
                        title: '错误',
                        message: "导入失败，请重试",
                        type: 'error'
                    });
                });
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
<style scoped lang='less'>
.container{
    min-height:70%;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0px 2px 7px 0px rgba(223,223,223,0.50);
    margin: 17px 50px 100px 50px;
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
        .body_main{padding:40px 0 25px;
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

            }
        }
    }
}    
</style>