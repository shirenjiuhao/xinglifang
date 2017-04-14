<template>
  <div class="hello">
    <el-button type="success" id='zhuyao' @click='xianshi'>我要分班</el-button>
    <div v-text='msg'></div>
    <!--登录窗口-->
      <el-dialog v-model="loginPage" size="tiny" top='20%' class='loginWin'>
      <Login></Login>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="loginPage = false">取 消</el-button>
        <el-button type="primary" @click="loginPage = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>

import Login from './Login'
export default {
  components:{ Login },
  name: 'hello',
  data () {
    return {
      msg: '使用本服务分班，能实现各班各类学生人数均等（最多差1）、各科成绩均衡（班级平均分差小于0.2）。',
      loginPage:false
    }
  },
  methods:{
    xianshi(){
      this.loginPage = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .hello {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 18%;
} 
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.loginWin{
  text-align: left;
}
</style>
