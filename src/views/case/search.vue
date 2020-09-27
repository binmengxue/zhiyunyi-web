<template>
<div style="padding:20px 0px 0px 0px;border:1px solid #d2d2d2;background: #fbfbfb;">
   <el-row>
      <!--用户数据-->
      <el-col>
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="130px">
              <el-form-item label="身份证号" >
                <el-input
                  v-model="queryParams.identityNo"
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
              <el-form-item label="客户姓名" >
                <el-input
                  v-model="queryParams.customerName"
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
              <el-form-item label="手机号" >
                <el-input
                  v-model="queryParams.phone"
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
          <span v-show="isMore">
              <el-form-item label="逾期天数" >
                  <el-input v-model="queryParams.overdueDaysStart" clearable size="small" style="width:125px" />
                  <span style="padding:0 5px;"> 一</span>
                  <el-input v-model="queryParams.overdueDaysEnd" clearable size="small" style="width:125px" />
              </el-form-item>
              <el-form-item label="案件来源">
                    <el-select
                      multiple
                      v-model="queryParams.caseSourceArr"
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
              <el-form-item label="最近调解方式">
                    <el-select
                      v-model="queryParams.adjustType"
                      placeholder="请选择"
                      clearable
                      size="small"
                      style="width:280px"
                    >
                      <el-option
                        v-for="dict in adjustType"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
              </el-form-item>
              <el-form-item label="债务人状态">
                  <el-select
                    multiple
                    v-model="queryParams.caseStatusArr"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:280px"
                  >
                    <el-option
                      v-for="dict in caseStatus"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    />
                  </el-select>
              </el-form-item>
              <el-form-item label="当前持有部门">
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
              <el-form-item label="最近调解结果">
                    <el-select
                      multiple
                      v-model="queryParams.adjustResultArr"
                      placeholder="请选择"
                      clearable
                      size="small"
                      style="width:280px"
                    >
                      <el-option
                        v-for="dict in adjustResult"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
                </el-form-item>
                <el-form-item label="当前调解员">
                          <el-input
                            v-model="queryParams.distributionUserName"
                            clearable
                            size="small"
                            style="width:280px"
                          />
                </el-form-item>
                <el-form-item label="最近调解时间" >
                  <el-date-picker
                    v-model="queryParams.adjustLastStartTime"
                    type="datetime"
                    size="small"
                    style="width:140px"
                    placeholder="开始日期"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm" >
                  </el-date-picker>
                  <el-date-picker
                    v-model="queryParams.adjustLastEndTime"
                    type="datetime"
                    size="small"
                    style="width:140px"
                    placeholder="结束日期"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm" >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="甲方委托日期" >
                  <el-date-picker
                    v-model="queryParams.entrustStartTime"
                    type="datetime"
                    size="small"
                    style="width:140px"
                    placeholder="开始日期"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm" >
                  </el-date-picker>
                  <el-date-picker
                    v-model="queryParams.entrustEndTime"
                    type="datetime"
                    size="small"
                    style="width:140px"
                    placeholder="结束日期"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="调解分案开始日期">
                  <el-date-picker
                    v-model="queryParams.distributionStartTime"
                    type="datetime"
                    size="small"
                    style="width:140px"
                    placeholder="开始日期"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm" >
                  </el-date-picker>
                  <el-date-picker
                    v-model="queryParams.distributionStartEndTime"
                    type="datetime"
                    size="small"
                    style="width:140px"
                    placeholder="结束日期"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm" >
                  </el-date-picker>
                 </el-form-item>
                 <el-form-item label="调解分案收回日期" >
                  <el-date-picker
                    v-model="queryParams.distributionEndStartTime"
                    type="datetime"
                    size="small"
                    style="width:140px"
                    placeholder="开始日期"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm" >
                  </el-date-picker>
                  <el-date-picker
                    v-model="queryParams.distributionEndTime"
                    type="datetime"
                    size="small"
                    style="width:140px"
                    placeholder="结束日期"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm" >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="还款结果">
                  <el-select
                    v-model="queryParams.repayResult"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:280px"
                  >
                    <el-option
                      v-for="dict in repayResult"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="拨号结果">
                    <el-select
                      multiple
                      v-model="queryParams.dialResultArr"
                      placeholder="请选择"
                      size="small"
                      style="width:280px"
                    >
                      <el-option
                        v-for="dict in dialResult"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
                </el-form-item>
                <el-form-item label="客户编号">
                        <el-input
                          v-model="queryParams.customerId"
                          size="small"
                          style="width:290px"
                        />
                </el-form-item>
                <el-form-item label="是否支持划扣">
                    <el-select
                      v-model="queryParams.supportDeduction"
                      placeholder="请选择"
                      clearable
                      size="small"
                      style="width:280px"
                    >
                      <el-option
                        v-for="dict in supportDeduction"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
                </el-form-item>
                <el-form-item label="划扣结果">
                    <el-select
                      v-model="queryParams.supportReslut"
                      placeholder="请选择"
                      clearable
                      size="small"
                      style="width:280px"
                    >
                      <el-option
                        v-for="dict in supportReslut"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
                </el-form-item>
                <el-form-item label="平台减免金额" >
                  <el-input v-model="queryParams.platReduceStartAmount" clearable size="small" style="width:125px" />
                  <span style="padding:0 5px;"> 一</span>
                  <el-input v-model="queryParams.platReduceEndAmount" clearable size="small" style="width:125px" />
                </el-form-item>
                <el-form-item label="已还款金额" >
                    <el-input v-model="queryParams.platPayTotalStartAmount" clearable size="small" style="width:125px" />
                    <span style="padding:0 5px;"> 一</span>
                    <el-input v-model="queryParams.platPayTotalEndAmount" clearable size="small" style="width:125px" />
                </el-form-item>
              <el-form-item label="当前待还总额" >
                  <el-input v-model="queryParams.noPayTotalStartAmount" clearable size="small" style="width:125px" />
                  <span style="padding:0 5px;"> 一</span>
                  <el-input v-model="queryParams.noPayTotalEndAmount" clearable size="small" style="width:125px" />
              </el-form-item>
              <el-form-item label="当前待还本金" >
                  <el-input v-model="queryParams.noPayPrincipalStart" clearable size="small" style="width:125px" />
                  <span style="padding:0 5px;"> 一</span>
                  <el-input v-model="queryParams.noPayPrincipalEnd" clearable size="small" style="width:125px" />
              </el-form-item>
              <el-form-item label="当前待还利息" >
                  <el-input v-model="queryParams.noPayInterestStart" clearable size="small" style="width:125px" />
                  <span style="padding:0 5px;"> 一</span>
                  <el-input v-model="queryParams.noPayInterestEnd" clearable size="small" style="width:125px" />
              </el-form-item>
    
                <el-form-item label="承诺还款时间" >
                    <el-date-picker
                    v-model="queryParams.promiseStartTime"
                    type="datetime"
                    size="small"
                    style="width:140px"
                    placeholder="开始日期"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm" >
                  </el-date-picker>
                  <el-date-picker
                    v-model="queryParams.promiseEndTime"
                    type="datetime"
                    size="small"
                    style="width:140px"
                    placeholder="结束日期"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"  >
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
                <el-form-item label="借款编号" >
                  <el-input v-model="queryParams.loadId" clearable size="small" style="width:280px" />
                </el-form-item>
         
              <el-form-item label="预约跟进时间" >
                <el-date-picker
                  v-model="queryParams.nextAdjustStartTime"
                  type="datetime"
                  size="small"
                  style="width:140px"
                  placeholder="开始日期"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm" >
                </el-date-picker>
                <el-date-picker
                  v-model="queryParams.nextAdjustEndTime"
                  type="datetime"
                  size="small"
                  style="width:140px"
                  placeholder="结束日期"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"  >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="联系人手机号" >
                <el-input v-model="queryParams.relationPhone" clearable size="small" style="width:280px" />
              </el-form-item>
          </span>
        </el-form>
     </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-left:10px;display: flex;justify-content: center;">
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
import store from '@/store'
import {userTreeselect} from "@/api/case/index";
import {getcasemerge,getcasestatus,getcaseSource,getdataSource,getdept,getRepayResult,getdialResult,getadjustType,getadjustResult,getcaseUserLabels,getsupportDeduction,getCurrentCustomerState} from '@/utils/statusInfo'
export default {
    data() {
       return {
         caseStatus:[],//案件状态
         repayResult:[],//还款结果
         caseSource:[],//案件来源
         dialResult:[],//拨号结果
         adjustType:[],//调解方式
         adjustResult:[],//调解结果
         distributionDept:[],//当前持有部门
         supportDeduction:[],//是否支持划扣
         supportReslut:[],//划扣结果
         labelAry:[],//客户标签
         currentCustomerStateList:[],//债务人跟进状态
         isMore:false,
         isMoreIcon:'el-icon-arrow-down',
         defaultProps2: { //默认选中
            children: "children",
            label: "label",
            id:'id'
          },
          visible:false,
         distributionName:'请选择',
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
           this.labelAry = await getcaseUserLabels()
           this.currentCustomerStateList= await getCurrentCustomerState()
           this.supportDeduction= await getsupportDeduction()
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
              this.queryParams.distributionDeptId=checkedNodes[checkedNodes.length-1].id
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
