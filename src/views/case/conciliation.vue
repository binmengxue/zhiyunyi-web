<template>
  <div class="app-container">
    <Search2 @seachEvent="seach"  @restEvent="rest"   :queryParams='this.queryParams'></Search2>
     <el-row :gutter="10" style="padding-top:20px;" >
         <el-col :span="1.5"  >
            <el-button type="primary"  icon="el-icon-stopwatch" size="mini" @click="handlecaseFile">导出</el-button>
          </el-col>
     </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="24" :xs="24" style="border:1px solid #e6e6e6;padding-bottom:30px;text-align: center;">
          <el-table  stripe v-loading="loading" element-loading-text="拼命加载中" :data="userList" >
            <el-table-column prop="caseId" label="案件编号" />
            <el-table-column prop="customerId" width="120" label="债权方客户编号" />
            <el-table-column label="案件来源"  width="80"  align="left" prop="caseSource"  >
              <template slot-scope="scope">
                {{getFileItem(scope.row.caseSource,infoStatus.caseSource)}}
              </template>
            </el-table-column>
            <el-table-column label="债权方客户姓名" width="150" align="center" prop="customerName" />
            <el-table-column prop="dialRelation" label="拨打关系">
              <template slot-scope="scope">
                {{getDictLabelByValue(scope.row.dialRelation,dialRelationList)}}
              </template>
            </el-table-column>
            <el-table-column  prop="dialName" label="被联系人姓名" width="120">
            </el-table-column>
            <el-table-column prop="dialPhone" label="被联系人电话" width="150">
              <template slot-scope="scope">
                {{scope.row.dialPhone?plusXing(scope.row.dialPhone,3,4):''}}
              </template>
            </el-table-column>
            <el-table-column prop="adjustType"   label="调解方式">
              <template slot-scope="scope">
                {{getDictLabelByValue(scope.row.adjustType,adjustTypeList)}}
              </template>
            </el-table-column>
            <el-table-column prop="createStartTime" label="调解时间" width="150">
                <template slot-scope="scope">
                  {{scope.row.createTime?scope.row.createTime:''}}
                </template>
            </el-table-column>
            <el-table-column prop="currentCustomerState" align="center" label="债务人跟进状态" width="150">
              <template slot-scope="scope">
                {{getDictLabelByValue(scope.row.currentCustomerState,currentCustomerStateList)}}
              </template>
            </el-table-column>
            <el-table-column prop="adjustResult"  label="调解结果" width="150">
              <template slot-scope="scope">
                {{getDictLabelByValue(scope.row.adjustResult,adjustResultList)}}
              </template>
            </el-table-column>
            <el-table-column prop="dialResult" label="拨号结果" width="200" >
              <template slot-scope="scope">
                {{getDictLabelByValue(scope.row.dialResult,dialResultList)}}
              </template>
            </el-table-column>
            <el-table-column prop="remark"  label="调解备注" width="200"></el-table-column>
            <el-table-column prop="promiseTime" label="承诺还款时间" width="150">
              <template slot-scope="scope">
                {{scope.row.promiseTime?scope.row.promiseTime:''}}
              </template>
            </el-table-column>
            <el-table-column prop="operatorId" label="调解人序号" width="100" />
            <el-table-column prop="operatorName" label="调解人昵称" width="100" />
            <el-table-column prop="operatorDeptName" label="调解人部门" width="100" />
            <el-table-column prop="adjustTime"  label="调解时长（分钟）" width="150"></el-table-column>
            <el-table-column align="center" label="播放录音" width="150" prop="adjustRecordUrl" style="position:relative;">
              <template slot-scope="scope">
                <AudioPlayer v-show="scope.row.adjustRecordUrl" :audio-list="stringToAry(scope.row.adjustRecordUrl)"  />
              </template>
            </el-table-column>
            <el-table-column align="center" label="下载" width="150" prop="adjustRecordUrl">
              <template slot-scope="scope">
                <el-button type="primary" v-show="scope.row.adjustRecordUrl"  @click="downFile(scope.row.adjustRecordUrl)">点击下载</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="adjustCertificate"  label="调解凭证">
                <template slot-scope="scope">
                <el-link :href="scope.row.adjustCertificate" target="_blank">
                  <pdf  v-if="scope.row.adjustCertificate && scope.row.adjustCertificate.indexOf('.pdf')!=-1" style="width:60px;height:auto;"  :src="scope.row.adjustCertificate" ></pdf>
                  <el-image v-else-if="scope.row.adjustCertificate && scope.row.adjustCertificate.indexOf('.pdf')==-1" style="width:60px;height:auto;"  :src="scope.row.adjustCertificate" ></el-image>
                </el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
       </el-col>
    </el-row>
  </div>
</template>
<script>
import {getCaseAdjustRecordList,adjustRecordExport} from "@/api/case/index";
import {getdialRelation,getdialResult,getadjustResult,getDialRelation,getadjustType,getcaseSource,getCurrentCustomerState} from "@/utils/statusInfo";
import  Search2  from "@/views/case/search2.vue";
import pdf from 'vue-pdf';
export default {
  name: "Case",
  data() {
    return {
      loading:true,
      userList: null,// 用户表格数据
      total:0,//总页数
      // 查询参数
      queryParams: {
        pageNum:1,
        pageSize:10,
        isAsc:'desc',
        orderByColumn:'create_time',
        caseId:'', //案件编号
        dialName:'', //被联系人姓名
        caseSource:'', //案件来源
        operatorDeptId:'',//调解人部门
        promiseStartTime:'',//承诺还款开始时间
        promiseEndTime:'',//承诺还款结束时间
        customerId:'',//债权方客户编号
        dialPhone:'', //被联系人手机号
        dialRelation:'',//拨打关系
        adjustResult:'',//调解结果
        adjustMinTime:'',//沟通时长 左值
        adjustMaxTime:'',//沟通时长 右值
        customerName:'',//债权方客户姓名
        operatorName:'', //调解人昵称
        adjustType:'',//调解方式
        dialResult:'',//拨号结果
        createStartTime:'',//调解开始时间
        createEndTime:'',//调解结束时间\
      },
      infoStatus:{
        caseSource:[],//案件来源
      },
      dialResultList:[],
      dialRelationList:[],
      adjustResultList:[],
      adjustTypeList: [],
      currentCustomerStateList: [],
      casestatus:[],
      relation:[],
      result:[],
    };
  },
  components: {Search2,pdf},
  watch: {

  },
  async created() {
    this.infoStatus.caseSource= await getcaseSource()
      this.dialResultList= await getdialResult()
      this.dialRelationList= await getdialRelation()
      this.adjustResultList= await getadjustResult()
      this.adjustTypeList = await getadjustType();
      this.currentCustomerStateList= await getCurrentCustomerState()
      this.getList();
  },
  methods: {
   shijiantime(times){
       var timestr = times.match(/(\S*)T/)[1]
       return timestr
    },
    getFileItem(vaule,arys){
      let fileAry=arys;
        for(var i=0,n=fileAry.length;i<n;i++){
          if(Number(fileAry[i].dictValue)===vaule){
                return fileAry[i].dictLabel;
            }
        }
    },
    /** 查列表 */
    getList() {
      this.loading = true;
      //let roles=this.$store.state.user.roles;获取角色
      getCaseAdjustRecordList(this.queryParams).then(response => {
            this.loading = false;
            this.userList = response.rows;
            this.total=response.total;
          }
      );
    },
    stringToAry(str){
        var ary= str.split(",");
      return  ary
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
        let fileAry=arys;
        for(var i=0,n=fileAry.length;i<n;i++){
            if(Number(fileAry[i].dictValue) === Number(vaule)){
                return fileAry[i].dictLabel;
            }
        }
    },
    clearQueryParams() {
      this.queryParams = {
        pageNum:1,
        pageSize:10,
        isAsc:'desc',
        orderByColumn:'create_time',
        operatorName:'', //调解人
        dialName:'', //被联系人
        dialPhone:'', //被联系人手机号
        createStartTime:'',//调解开始时间
        createEndTime:'',//调解结束时间
      };
      this.resetForm("queryParams");
    },
    seach() {
      this.getList();
    },
    rest(){
      this.clearQueryParams()
    },
    handleAudit(obj){
      this.auditText={
        id:obj.id,
        caseId:obj.caseId,
        customerName:obj.customerName
      }
      this.auditForm={
        id:obj.id,
        caseId:obj.caseId,
        stayEndTime:obj.stayEndTime,
        applyStatus:'',
        examineRemark:''
      }
      this.auditOpen=true
    },
    async auditsubmit(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          getDoCaseLeave(this.auditForm).then(response => {
            if (response.code === 200) {
              this.msgSuccess("提交成功");
              this.getList();
              this.clearauditForm();
              this.auditOpen=false;
            } else {
              this.msgError(response.msg);
              return false;
            }
          });
        } else {
          return false;
        }
      });

    },
    clearauditForm(formName){
      this.auditForm={
        caseId:'',
        id:'',
        applyStatus:'',
        remark:''
      }
      this.resetForm("auditRef");
    },
    auditcancel(){
     this.clearauditForm();
      this.auditOpen=false;
    },
    downFile(url){
        let a = document.createElement('a')
          a.href =url
           a.target="_blank"
          a.click();
    },
    handlecaseFile(){
        adjustRecordExport(this.queryParams).then(response => {
            if(response.code==200){
                this.download(response.msg);
            }
        });
    }

  }
};
</script>
<style lang="scss" scoped>

</style>
