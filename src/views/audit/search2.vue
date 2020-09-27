<template>
<div style="padding:20px 0px 0px 0px;border:1px solid #d2d2d2;background: #fbfbfb;">
   <el-row>
      <!--用户数据-->
      <el-col>
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="130px">
              <el-form-item label="案件编号" >
                <el-input
                  v-model="queryParams.caseId"
                  clearable
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
              <el-form-item label="还款账户名" >
                <el-input
                  v-model="queryParams.repayAccountName"
                  clearable
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
              <el-form-item label="还款类型">
                    <el-select
                      v-model="queryParams.repayType"
                      placeholder="请选择"
                      clearable
                      size="small"
                      style="width:280px"
                    >
                      <el-option
                        v-for="dict in repayTypeList"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
              </el-form-item>
          
          <span v-show="isMore">
            <el-form-item label="还款时间">
                  <el-date-picker
                    v-model="queryParams.repayStartTime"
                    type="date"
                    size="small"
                    style="width:140px"
                    placeholder="开始日期"
                    format="yyyy-MM-dd" >
                  </el-date-picker>
                  <el-date-picker
                    v-model="queryParams.repayEndTime"
                    type="date"
                    size="small"
                    style="width:140px"
                    placeholder="结束日期"
                    format="yyyy-MM-dd" >
                  </el-date-picker>
              </el-form-item>
            <el-form-item label="债权方客户编号" >
                <el-input v-model="queryParams.customerId" clearable size="small" style="width:280px" />
            </el-form-item>
            <el-form-item label="还款账户号" >
                <el-input v-model="queryParams.repayAccount" clearable size="small" style="width:280px" />
            </el-form-item>
            <el-form-item label="还款审批状态">
                    <el-select
                      v-model="queryParams.applyStatus"
                      placeholder="请选择"
                      clearable
                      size="small"
                      style="width:280px"
                    >
                      <el-option
                        v-for="dict in applyStatus"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
            </el-form-item>
            <el-form-item label="还款提交时间">
                  <el-date-picker
                    v-model="queryParams.applyStartTime"
                    type="date"
                    size="small"
                    style="width:140px"
                    placeholder="开始日期"
                    format="yyyy-MM-dd" >
                  </el-date-picker>
                  <el-date-picker
                    v-model="queryParams.applyEndTime"
                    type="date"
                    size="small"
                    style="width:140px"
                    placeholder="结束日期"
                    format="yyyy-MM-dd" >
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="债务人" >
                  <el-input v-model="queryParams.customerName" clearable size="small" style="width:280px" />
              </el-form-item>
          
          
            <el-form-item label="还款申请人员序号" >
                <el-input v-model="queryParams.applyUserId" clearable size="small" style="width:280px" />
            </el-form-item>
            <el-form-item label="还款申请人部门">
              <el-popover
                placement="bottom"
                width="280px"
                v-model="visible">
                <div style="text-align: right; margin: 0">
                  <el-tree
                   style="width:260px"
                    :data="distributionDept"
                    show-checkbox
                    node-key="id"
                    ref="tree2"
                    :props="defaultProps2"
                    default-expand-all
                    @check-change="handleCheckChange2"

                  />
                </div>
                <div style="text-align: right; margin: 0">
                  <el-button type="primary" size="mini"  @click="distributionSubmitForm2">确 定</el-button>
                  <el-button @click="cancel2" size="mini">取 消</el-button>
                </div>
                <el-button slot="reference" style="width:280px">{{distributionName}}</el-button>
              </el-popover>
            </el-form-item>
            <el-form-item label="还款审核时间">
                  <el-date-picker
                    v-model="queryParams.examineStartTime"
                    type="date"
                    size="small"
                    style="width:140px"
                    placeholder="开始日期"
                    format="yyyy-MM-dd" >
                  </el-date-picker>
                  <el-date-picker
                    v-model="queryParams.examineEndTime"
                    type="date"
                    size="small"
                    style="width:140px"
                    placeholder="结束日期"
                    format="yyyy-MM-dd" >
                  </el-date-picker>
            </el-form-item>
            <el-form-item label="借款编号" >
                <el-input v-model="queryParams.loadId" clearable size="small" style="width:280px" />
            </el-form-item>
            <el-form-item label="还款申请人员" >
                <el-input v-model="queryParams.applyUserName" clearable size="small" style="width:280px" />
            </el-form-item>
            <el-form-item label="案件来源">
                    <el-select
                      v-model="queryParams.caseSource"
                      placeholder="请选择"
                      clearable
                      size="small"
                      style="width:280px"
                    >
                      <el-option
                        v-for="dict in caseSource"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
            </el-form-item>
            <el-form-item label="交易流水号" >
                <el-input v-model="queryParams.serialNumber" clearable size="small" style="width:280px" />
            </el-form-item>
          </span>
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
    <el-row>
      <el-col style="text-align: center;background:#efefef;border-top:1px solid #d2d2d2;margin-top:20px;">
         <el-button type="text" @click="handleMore"  style="width:100%" :icon="isMoreIcon">更多筛选条件</el-button>
      </el-col>
    </el-row>
</div>
</template>
<script>
import {provinceAndCityDataPlus } from 'element-china-area-data'
import {getcaseSource,getcaseStayApplyStatus,getRepayType} from '@/utils/statusInfo'
import {userTreeselect} from "@/api/case/index";

export default {
  data() {
    return {
      caseSource: [],//案件来源
      applyStatus: [],//审核状态
      repayTypeList: [],//还款类型
      distributionDept: [],//当前持有部门
      defaultProps2: { //默认选中
        children: "children",
        label: "label",
        id:'id'
      },
      visible:false,
      isMore:false,
      isMoreIcon:'el-icon-arrow-down',
    }
  },
  props: ['queryParams',"distributionName"],
  async created() {
    this.caseSource = await getcaseSource()
    this.applyStatus = await getcaseStayApplyStatus()
    this.repayTypeList = await getRepayType()
    this.getTreeselect();
  },
  methods: {
    //搜索
    handleSearch() {
      this.$emit('seachEvent', this.queryParams);
    },
    //重置
    handleReset() {
      this.$emit('restEvent',this.$refs.tree2);
    },
    handleMore(){
      this.isMore=!this.isMore;
      if(this.isMore){
        this.isMoreIcon="el-icon-arrow-up"
      }else{
        this.isMoreIcon="el-icon-arrow-down"
      }

    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      userTreeselect().then(response => {
        this.distributionDept = response.data;
        this.addDisabledLable2(this.distributionDept)
      });
    },
    //树节点把父亲节点设置不可点击
    addDisabledLable2(data) {
      data.forEach((node) => {
        if (node.children) {
          node.disabled = true;
          return this.addDisabledLable2(node.children)
        }
      })
    },
    handleCheckChange2(data, checked, node) {
      if (checked) {
        this.$refs.tree2.setCheckedNodes([data]);
      }
    },
    //点击确定
    distributionSubmitForm2() {
      this.visible = false;
      let checkedNodes = this.$refs.tree2.getCheckedNodes();
      let halfCheckedNodes = this.$refs.tree2.getHalfCheckedNodes();
      this.queryParams.applyDeptId = checkedNodes[checkedNodes.length - 1].id
      this.distributionName = checkedNodes[checkedNodes.length - 1].label
    },
    cancel2() {
      this.visible = false;
      this.$refs.tree2.setCheckedNodes([]);
      this.distributionName="请选择";
      this.queryParams.distributionDeptId=null;
      this.distributionName=null;
    },
  }
}
</script>

