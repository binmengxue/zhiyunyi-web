<template>
  <el-row type="flex" class="userInfoTemplete">
    <el-col class="span1" :span='Number(spanCol)' style="min-width:120px;">{{label}}</el-col>
    <el-col class="span2" >{{info}}</el-col>
  </el-row>
</template>

<script>
export default {
   name: "UserElRow",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  data() {
    return {
     
    }
  },
  props:['label','info','spanCol'],
  created() {
     this.info
  },
}
</script>

<style lang="scss" scoped>
.el-row{
  padding:15px 0;
  border-bottom:1px solid #f5f2f2;
  .el-col{
    .span2{
      color: #222;
    }
    .span1{
      color: #222;
    }
  }
}

</style>