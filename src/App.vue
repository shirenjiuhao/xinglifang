<template>
  <div id="app">
    <myHeader></myHeader>
    <router-view></router-view>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from './components/Header'
import myFooter from './components/Footer'

export default {
  name: 'app',
  data(){
    return {
      msg:''
    }
  },
  methods:{
    
  },
  components:{
    myHeader,
    myFooter
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
*{margin:0;padding:0;}
a{text-decoration: none;}
</style>
