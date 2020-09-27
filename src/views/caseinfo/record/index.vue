<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="120px">
     <div class="el-formDiv">
      <el-form-item label="债务人姓名" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="债务人身份证" prop="identityNo">
        <el-input
          v-model="queryParams.identityNo"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
        <el-form-item label="债务人手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="调解员部门" >
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
     </div>
     <div class="el-formDiv">
      <el-form-item label="呼出号码" prop="caller">
        <el-input
          v-model="queryParams.caller"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="被叫号码" prop="callee">
        <el-input
          v-model="queryParams.callee"
          placeholder="请输入被叫号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="呼叫时间" prop="callTime">
                    <el-date-picker
                    v-model="queryParams.callStartTime"
                    type="datetime"
                    size="small"
                    style="width:100px"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss" >
                  </el-date-picker>
                  <el-date-picker
                    v-model="queryParams.callEndTime"
                    type="datetime"
                    size="small"
                    style="width:100px"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"  >
                  </el-date-picker>
      </el-form-item>
      <el-form-item label="通话时长(分)">
         <el-input v-model="queryParams.durationStart" clearable size="small" style="width:125px" />
                    <span style="padding:0 5px;"> 一</span>
         <el-input v-model="queryParams.durationEnd" clearable size="small" style="width:125px" />
      </el-form-item>
     </div>
     <div class="el-formDiv">
      <el-form-item label="客户编号" prop="customerId">
        <el-input
          v-model="queryParams.customerId"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="调解员姓名" prop="distributionUserName">
        <el-input
          v-model="queryParams.distributionUserName"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="调解员手机号" prop="distributionUserPhone">
        <el-input
          v-model="queryParams.distributionUserPhone"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    <el-form-item label="案件来源">
                    <el-select
                      multiple
                      v-model="queryParams.caseSource"
                      placeholder="请选择"
                      clearable
                      size="small"
                      style="width:280px"
                    >
                      <el-option
                        v-for="dict in caseSourceArr"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
              </el-form-item>
     </div>
    <div class="el-formDiv">
      <el-form-item label="外呼结果" prop="outcome">
         <el-select
          v-model="queryParams.outcome"
          placeholder="请选择"
          clearable
          size="small"
          style="width:200px"
        >
          <el-option
            v-for="dict in outcomeArr"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="外呼类型" prop="type">
         <el-select
          v-model="queryParams.type"
          placeholder="请选择"
          clearable
          size="small"
          style="width:200px"
        >
          <el-option
            v-for="dict in typeArr"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
    </div>
     <div class="el-formDiv">
      <el-row :gutter="10" style="margin-left:10px;display: flex;justify-content: center;">
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
      </el-row>
     </div>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="recordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="案件来源" align="center" prop="caseSource" />
      <el-table-column label="债务人姓名" align="center" prop="customerName" />
      <el-table-column label="债权方客户编号" align="center" prop="customerId" />
      <el-table-column label="债务人身份证" align="center" prop="identityNo" />
      <el-table-column label="呼叫时间" align="center" prop="ringTime" />
      <!--<el-table-column label="等待时长（分）" align="center" prop="" />
      <el-table-column label="呼叫类型" align="center" prop="type" >
         <template slot-scope="scope">
            {{getDictLabelByValue(scope.row.type, typeArr)}}
        </template>
      </el-table-column>-->
      <el-table-column label="通话时长（分）" align="center" prop="duration" />
      <el-table-column label="呼出号码" align="center" prop="caller" />
      <el-table-column label="被叫号码" align="center" prop="callee" />
      <el-table-column label="外呼结果" align="center" prop="outcome" >
        <template slot-scope="scope">
            {{scope.row.outcome == "SUCCESS" ? "成功" : "失败"}}
        </template>
      </el-table-column>
      <el-table-column label="调解员姓名" align="center" prop="distributionUserName" />
      <el-table-column label="调解员手机号" align="center" prop="distributionPhone" />
      <el-table-column label="调解员部门" align="center" prop="distributionDeptId" />
      <el-table-column align="center" label="播放" width="150" prop="callRecordUrl" style="position:relative;">
        <template slot-scope="scope">
            <AudioPlayer v-show="scope.row.outcome == 'SUCCESS'" :audio-list="stringToAry(scope.row.callRecordUrl)"  />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleAdjustRecord(scope.row)"
          >调解记录</el-button>
          <span v-down="scope.row.callRecordUrl">下载录音</span>
        </template>
      </el-table-column>
    </el-table>
  <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
       <el-table
            :data="tableData"
            stripe
            style="width: 100%;margin-top:20px;">
            <el-table-column prop="createTime" label="调解时间" width="150">
                <template slot-scope="scope">
                      {{scope.row.createTime?scope.row.createTime:''}}
                </template>
            </el-table-column>
            <el-table-column  prop="dialName" label="被联系人">
            </el-table-column>
            <el-table-column prop="dialPhone" label="被联系人电话" width="150">
                <template slot-scope="scope">
                    {{scope.row.dialPhone?plusXing(scope.row.dialPhone,3,4):''}}
                </template>
            </el-table-column>
            <el-table-column prop="remark"  label="备注" width="200"></el-table-column>
        </el-table>
    <!--<pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />-->
  </el-dialog>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listRecord, getRecord, delRecord, exportRecord } from "@/api/caseinfo/record";
import {getcaseSource, getCallLogRecordOutcome, getCallLogRecordType} from '@/utils/statusInfo'
import {userTreeselect, getCaseAdjustRecordByCaseId} from "@/api/case/index";

export default {
  name: "Record",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      recordUrls: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 通话记录通话录音表格数据
      recordList: [],
      // 弹出层标题
      title: "",
      tableData:[],
      // 是否显示弹出层
      open: false,
      distributionDept:[],
      outcomeArr:[],
      typeArr:[],
      defaultProps2: { //默认选中
            children: "children",
            label: "label",
            id:'id'
          },
      visible:false,
      distributionName:'请选择',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        customerName: undefined,
        identityNo: undefined,
        phone: undefined,
        distributionDeptId: undefined,
        caller: undefined,
        callee: undefined,
        callStartTime: undefined,
        callEndTime: undefined,
        durationStart: undefined,
        durationEnd: undefined,
        customerId: undefined,
        customerName: undefined,
        distributionUserPhone: undefined,
        distributionUserName:undefined,
        caseSource: undefined,
        outcome: undefined,
        type: undefined,
        callRecordUrl: undefined,
        caseId: undefined
      },
      caseSourceArr:[],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  async created() {
    this.getList();
    this.caseSourceArr= await getcaseSource();
    this.outcomeArr = await getCallLogRecordOutcome();
    this.typeArr = await getCallLogRecordType();
    this.getTreeselect();
  },
  methods: {
    /** 查询通话记录通话录音列表 */
    getList() {
      this.loading = true;
      listRecord(this.queryParams).then(response => {
        this.recordList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
     plusXing(str,frontLen,endLen) {
      let strNew='';
      if(typeof str==Number){
         strNew=str.toString()
      }else{
        strNew=str
      }
      var len = strNew.length-frontLen-endLen;
      var xing = '';
      for (var i=0;i<len;i++) {
         xing+='*';
      }
      return strNew.substring(0,frontLen)+xing+strNew.substring(strNew.length-endLen);
    },
    getDictLabelByValue(vaule,arys){
      debugger
        let fileAry=arys;
        if(vaule == null) {
          return "";
        }
        for(var i=0,n=fileAry.length;i<n;i++){
            if(Number(fileAry[i].dictValue) === Number(vaule)){
                return fileAry[i].dictLabel;
            }
        }
    },
    handleAdjustRecord(rowData) {
      this.open = true;
      getCaseAdjustRecordByCaseId({caseId: rowData.caseId}).then(response => {

          this.tableData = response.rows;
          this.total = response.total;
        })
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
   },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
   stringToAry(str){
     if(str == null || str == undefined) {
       return new Array();
     }
      var ary= str.split(",");
      return  ary
    },
    resetQuery() {
      this.queryParams.callStartTime = undefined;
      this.queryParams.callEndTime = undefined;
      this.queryParams.durationStart = undefined;
      this.queryParams.durationEnd = undefined;
      this.queryParams.caseSource = undefined;
      this.visible=false;
      this.$refs.tree2.setCheckedNodes([]);
      this.distributionName="请选择";
      this.queryParams.distributionDeptId=null;
      this.$emit('restEvent',this.$refs.tree2);
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.recordUrls = selection
    },
    /** 导出按钮操作 */
    handleExport() {
     // const queryParams = this.queryParams;
     if(this.recordUrls.length == 0) {
       this.$message({message: '至少选择一行',type:'error'});
       return;
     }
     const param = JSON.stringify(this.recordUrls);
      this.$confirm('是否确认导出所有通话记录通话录音数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportRecord(param);
        }).then(response => {
          if(response.code == 200) {
             this.$message({message: '正在处理，请到数据管理-数据导出中下载',type:'success', duration:'4000'});
          }
        }).catch(function() {});
    },
     downFile(url){
       console.log(111)
        let a = document.createElement('a')
          a.href =url
          a.download="file"
          // this.download(url);
           a.target="_blank"
          a.click();
    },
  }
};
</script>