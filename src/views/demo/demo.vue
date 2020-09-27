<template>
<div>
    用户名
    <div :class="[activeCLass,{error:isactive}]">{{uname}}</div>
    <input type="text" v-model='uname' @keyup.delete="sumit"/>
    <div :style="{'color':isColor?'#ff0000':'#00ff00'}">样式混用</div>
</div>
</template>

<script>
export default {
  name: "Case",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  data() {
    return {
        uname:'212',
        isactive:false,
        activeCLass:'active',
        isColor:false
    }
  },
   methods: {
       sumit(){
           this.uname=''
       }
   }

}
</script>

<style>
.active{
    color:#ff0000;
}
.error{
    background: #00ff00;
}
</style>