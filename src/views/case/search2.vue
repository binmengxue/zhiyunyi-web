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
            <el-form-item label="被联系人姓名" >
              <el-input
                v-model="queryParams.dialName"
                clearable
                size="small"
                style="width:280px"
              />
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
                  v-for="dict in infoStatus.caseSource"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          <span v-show="isMore">
              <el-form-item label="调解人部门" >
                <el-popover
                  placement="bottom"
                  width="280"
                  v-model="visible">
                  <div style="text-align: right; margin: 0">
                    <el-tree
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
              <el-form-item label="承诺还款时间">
                <el-date-picker
                  v-model="queryParams.promiseStartTime"
                  type="datetime"
                  style="width:140px"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="开始时间">
                </el-date-picker>
                <el-date-picker
                  v-model="queryParams.promiseEndTime"
                  type="datetime"
                  style="width:140px"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="结束时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="债权方客户编号">
                <el-input
                  v-model="queryParams.customerId"
                  clearable
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
              <el-form-item label="被联系人电话" >
                <el-input
                  v-model="queryParams.dialPhone"
                  clearable
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
              <el-form-item label="拨打关系">
                <el-select
                  v-model="queryParams.dialRelation"
                  placeholder="请选择"
                  clearable
                  size="small"
                  style="width:280px"
                >
                  <el-option
                    v-for="dict in dialRelationList"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="调解结果">
                <el-select
                  v-model="queryParams.adjustResult"
                  placeholder="请选择"
                  clearable
                  size="small"
                  style="width:280px"
                >
                  <el-option
                    v-for="dict in adjustResultList"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="沟通时长">
                <el-input
                  v-model="queryParams.adjustMinTime"
                  clearable
                  size="small"
                  style="width:125px"
                />
                <span style="padding:0 5px;"> 一</span>
                <el-input
                  v-model="queryParams.adjustMaxTime"
                  clearable
                  size="small"
                  style="width:125px"
                />
              </el-form-item>
              <el-form-item label="债权方客户姓名">
                <el-input
                  v-model="queryParams.customerName"
                  clearable
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
              <el-form-item label="调解人昵称">
                <el-input
                  v-model="queryParams.operatorName"
                  clearable
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
              <el-form-item label="调解方式">
                <el-select
                  v-model="queryParams.adjustType"
                  placeholder="请选择"
                  clearable
                  size="small"
                  style="width:280px"
                >
                  <el-option
                    v-for="dict in adjustTypeList"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="拨号结果">
                <el-select
                  v-model="queryParams.dialResult"
                  placeholder="请选择"
                  clearable
                  size="small"
                  style="width:280px"
                >
                  <el-option
                    v-for="dict in dialResultList"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="调解时间">
                <el-date-picker
                  v-model="queryParams.createStartTime"
                  type="datetime"
                  style="width:140px"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="开始时间">
                </el-date-picker>
                <el-date-picker
                  v-model="queryParams.createEndTime"
                  type="datetime"
                  style="width:140px"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="结束时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="债务人跟进状态">
                <el-select
                  v-model="queryParams.currentCustomerState"
                  placeholder="请选择"
                  clearable
                  size="small"
                  style="width:280px"
                >
                  <el-option
                    v-for="dict in currentCustomerStateList"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
          </span>
        </el-form>
     </el-col>
    </el-row>
    <el-row :gutter="10" style="display:flex;justify-content: center;"  >
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
import {userTreeselect} from "@/api/case/index";
import {getcaseSource,getdialResult,getdialRelation,getadjustResult,getadjustType,getCurrentCustomerState} from '@/utils/statusInfo'
export default {
    data() {
       return {
         isMore:false,
         isMoreIcon:'el-icon-arrow-down',
         defaultProps2: { //默认选中
           children: "children",
           label: "label",
           id:'id'
         },
         distributionName:'请选择',
         distributionDept:[],//当前持有部门
         visible:false,
         dialResultList:[],
         dialRelationList:[],
         adjustResultList:[],
         adjustTypeList: [],
         currentCustomerStateList: [],
         infoStatus:{
           caseSource:[],//案件来源
         },
       }
    },
    props:['queryParams'],
    async created() {
      this.infoStatus.caseSource= await getcaseSource()
      this.dialResultList= await getdialResult()
      this.dialRelationList= await getdialRelation()
      this.adjustResultList= await getadjustResult()
      this.adjustTypeList = await getadjustType();
      this.currentCustomerStateList= await getCurrentCustomerState()
      this.getTreeselect();
    },
    methods: {
         //搜索
        handleSearch(){
           this.$emit('seachEvent', this.queryParams);
        },
        //重置
        handleReset(){
          this.distributionName = '请选择';
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
      addDisabledLable2(data){
        data.forEach((node)=>{
          if(node.children){
            node.disabled=true;
            return this.addDisabledLable2(node.children)
          }
        })
      },
      handleCheckChange2(data, checked, node){
        if(checked){
          this.$refs.tree2.setCheckedNodes([data]);
        }
      },
      //点击确定
      distributionSubmitForm2(){
        this.visible=false;
        let checkedNodes=this.$refs.tree2.getCheckedNodes();
        let  halfCheckedNodes=this.$refs.tree2.getHalfCheckedNodes();
        this.queryParams.operatorDeptId=checkedNodes[checkedNodes.length-1].id
        this.distributionName=checkedNodes[checkedNodes.length-1].label
      },
      cancel2(){
        this.visible=false;
        this.$refs.tree2.setCheckedNodes([]);
        this.distributionName="请选择";
        this.queryParams.distributionDeptId=null;
        this.distributionName=null;
      }
    }
}
</script>
