<template>
<div>
   <el-row>
      <!--用户数据-->
      <el-col>
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
          <div class="el-formDiv">
              <el-form-item label="客户编号" >
                <el-input
                  v-model="queryParams.custId"
                  clearable
                  size="small"
                  style="width:150px"
                />
              </el-form-item>

              <el-form-item label="债务人" >
                <el-input
                  v-model="queryParams.custName"
                  clearable
                  size="small"
                  style="width:150px"
                />
              </el-form-item>

              <el-form-item label="身份证号码" >
                <el-input
                  v-model="queryParams.idNo"
                  clearable
                  size="small"
                  style="width:200px"
                />
              </el-form-item>

              <el-form-item label="电话号码" >
                <el-input
                  v-model="queryParams.phoneNo"
                  clearable
                  size="small"
                  style="width:150px"
                />
              </el-form-item>
              <el-form-item label="案件状态">
                  <el-select
                    v-model="queryParams.caseStatus"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:150px"
                  >
                    <el-option
                      v-for="dict in lawsuitStatus"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    />
                  </el-select>
              </el-form-item>
          </div>
    
        </el-form>
     </el-col>
    </el-row>
    <el-row :gutter="10" >
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
import {getcasemerge,getcasestatus,getlitigationFlag,getgroupStatus,getlitigationStatus,getcaseSource,getdataSource,getdept} from '@/utils/statusInfo'
export default {
    data() {
       return {
         lawsuitStatus:[],//案件状态
       }
    },
    props:['queryParams'],
    async created() {
           this.lawsuitStatus= await getcasestatus()
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