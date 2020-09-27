<template>
<div style="padding:20px 0px 20px 0px;border:1px solid #d2d2d2;background: #fbfbfb;">
   <el-row>
      <!--用户数据-->
      <el-col>
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
          <div class="el-formDiv">
              <el-form-item label="告知函名称" >
                <el-input
                  v-model="queryParams.templateName"
                  clearable
                  size="small"
                  style="width:150px"
                />
              </el-form-item>

          </div>
        </el-form>
     </el-col>
    </el-row>
    <el-row :gutter="10"  style="display:flex;justify-content: center;" >
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleSearch"
            >查询</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="handleReset"
            >重置</el-button>
          </el-col>
    </el-row>
</div>
</template>
<script>
import {provinceAndCityDataPlus } from 'element-china-area-data'
import store from '@/store'
import {getcasemerge,getcasestatus,getcaseSource,getdataSource,getdept,getRepayResult,getdialResult,getadjustType,getadjustResult} from '@/utils/statusInfo'
export default {
    data() {
       return {
         caseStatus:[],//案件状态
         repayResult:[],//还款结果
         caseSource:[],//案件来源
         dialResult:[],//拨号结果
         adjustType:[],//调解方式
         adjustResult:[]
       }
    },
    props:['queryParams'],
    async created() {
           this.caseStatus= await getcasestatus()
           this.caseSource = await getcaseSource()
           this.repayResult = await getRepayResult()
           this.dialResult = await getdialResult()
           this.adjustType = await getadjustType()
           this.adjustResult = await getadjustResult()
    },
    methods: {
         //搜索
        handleSearch(){
           this.$emit('seachEvent', this.queryParams);
        },
        //重置
        handleReset(){
          this.$emit('restEvent');
        },
    }
}
</script>