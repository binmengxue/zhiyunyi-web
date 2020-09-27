<template>
  <div class="app-container" >
    <h1 class="title">智云易数科调解小程序</h1>
    <p class="p1">智云易是中国首家“一站式”数科纠纷解决服务平台。智云易响应《最高人民法院关于进一步完善委派调解机制的指导意见》和《关于全面推进金融纠纷多元化解机制建设的意见》的号召，整合多方优势资源，建立的涵盖区块链存证、电子法函、智慧调解、智慧法诉和智慧执行的全流程智慧解纷云服务平台，帮助企业和其他金个人量身定做纠纷解决方案，保护当事人合法权益，促进信用体系建设，化解社会矛盾。</p>
    <p class="p2">小程序主要流程：</p>
    <el-row :gutter="20" v-for="url in urls" :key="url" >
       <el-col :span="24" style="text-align:left">
           <el-image :key="url" :src="url" lazy  ></el-image>
       </el-col>
    </el-row>
     
  </div>
</template>

<script>
import weixin1 from '@/assets/weixin/1.jpg'
export default {
  name: "Case",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  data() {
    return {
      urls: [weixin1]
    };
  },
  components: {},  
  watch: {
   
  },
  created() {
    
  },
  methods: {
    
    
  }
};
</script>
<style lang="scss" scoped>
.title{
  text-align: center;
  font-size: 26px;
}
.p1{
  font-size: 18px;
  line-height: 30px;
}
.p2{
  font-size: 20px;
  line-height: 20px;
  margin:30px 0;
  color:#d30303;
  padding-left:10px;
  border-left:5px solid #d30303;
}
</style>