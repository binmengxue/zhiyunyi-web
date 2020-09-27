<template>
<div style="padding:20px 0px 20px 0px;border:1px solid #d2d2d2;background: #fbfbfb;">
   <el-row>
      <!--用户数据-->
      <el-col>
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
          <div class="el-formDiv">
              <el-form-item label="身份证号" >
                <el-input
                  v-model="queryParams.identityNo"
                  clearable
                  size="small"
                  style="width:200px"
                />
              </el-form-item>
              <el-form-item label="债务人" >
                <el-input
                  v-model="queryParams.customerName"
                  clearable
                  size="small"
                  style="width:150px"
                />
              </el-form-item>
              <el-form-item label="客户手机号" >
                <el-input
                  v-model="queryParams.phone"
                  clearable
                  size="small"
                  style="width:150px"
                />
              </el-form-item>
              <el-form-item label="审核状态">
                    <el-select
                      v-model="queryParams.applyStatus"
                      placeholder="请选择"
                      clearable
                      size="small"
                      style="width:150px"
                    >
                      <el-option
                        v-for="dict in applyStatus"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
              </el-form-item>
          </div>
          <div class="el-formDiv">
            <el-form-item label="案件编号" >
                <el-input v-model="queryParams.caseId" clearable size="small" style="width:200px" />
            </el-form-item>
            <el-form-item label="申请人" >
                <el-input v-model="queryParams.applyUserName" clearable size="small" style="width:150px" />
            </el-form-item>
            <el-form-item label="案件来源">
                    <el-select
                      v-model="queryParams.caseSource"
                      placeholder="请选择"
                      clearable
                      size="small"
                      style="width:150px"
                    >
                      <el-option
                        v-for="dict in caseSource"
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
    <el-row :gutter="10"   style="display:flex;justify-content: center;">
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
import {getcaseSource,getcaseStayApplyStatus} from '@/utils/statusInfo'
export default {
    data() {
       return {
         caseSource:[],//案件来源
         applyStatus:[],//审核状态
       }
    },
    props:['queryParams'],
    async created() {
           this.caseSource = await getcaseSource()
           this.applyStatus=await getcaseStayApplyStatus()
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