<template>
  <div class="app-container">
    <Search2 @seachEvent="seach"  @restEvent="rest"   :queryParams='this.queryParams'></Search2>
    <el-row style="margin-top:20px;">
      <el-col :span="24" :xs="24" style="border:1px solid #e6e6e6;padding-bottom:30px;text-align: center;">
          <el-table stripe v-loading="loading" :data="userList" element-loading-text="拼命加载中" >
            <el-table-column align="center" label="操作" width="100" style="position:relative;">
              <template slot-scope="scope" v-if="scope.row.applyStatus == 0">
                <el-button type="text" icon="el-icon-tickets" size="small" @click="handleAudit(scope.row)">审核</el-button>
              </template>
            </el-table-column>
            <el-table-column label="案件编号"  width="100"  align="left" prop="serialNumber"  />
            <el-table-column label="债务人"  width="100"  align="left" prop="customerName"  />
            <el-table-column label="手机号"  width="150"  align="left" prop="phone"  />
            <el-table-column label="身份证"  width="150"  align="left" prop="phone"  />
            <el-table-column label="被划扣银行卡"  width="150"  align="left" prop="phone"  />
            <el-table-column label="划扣时间" width="170" align="center" prop="repayTime" >
               <template slot-scope="scope">
                   {{shijiantime(scope.row.repayTime)}}
               </template>
             </el-table-column>
              <el-table-column label="划扣金额" align="center" prop="applyUserName" />
            <el-table-column label="划扣流水号" align="center" prop="applyRemark" />
            <el-table-column label="案件来源" align="center" prop="examineRemark" />
            <el-table-column label="是否成功" align="center" prop="caseSource" />


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
import {doCaseRepay,getCaseRepayList,repayExport} from "@/api/case/index";
import {getcaseRepayApplystatuss,getcaseSource,getRepayType} from '@/utils/statusInfo'
import  Search2  from "@/views/deduct/search2.vue";
import {getDictLabelByValue} from '@/utils/ruoyi';
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
        orderByColumn:'apply_time',
        caseId:'',//案件ID
        identityNo:'',//身份证
        phone:'',//手机号
        customerName:'',//债务人
        applyStatus:'',//审核状态
        caseSource:'',//案件来源
        applyUserName:''//申请人
      },
      applyStatus:[],//审核状态
      applyStatusResult:[],
      caseSource:[],//案件来源
      repayTypeList: [],//还款方式
      
    };
  },
  components: {Search2,pdf},
  watch: {

  },
  async created() {
      this.applyStatus=await getcaseRepayApplystatuss()
      let ary=await getcaseRepayApplystatuss();
          ary.shift();
      this.applyStatusResult=ary;
      this.caseSource= await getcaseSource()
      this.repayTypeList=await getRepayType()
      this.getList()
  },
  methods: {
   shijiantime(times){
       var timestr = times.match(/(\S*).000+/)[1]
       return timestr
    },
    getDictName(value) {
      return getDictLabelByValue(value, this.repayTypeList);
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
     getCaseRepayList(this.queryParams).then(response => {
            this.loading = false;
            this.userList = response.rows;
            this.total=response.total;
          }
      );
    },
    clearQueryParams() {
      this.queryParams = {
        pageNum:1,
        pageSize:10,
        isAsc:'desc',
        orderByColumn:'apply_time',
        caseId:'',//案件ID
        identityNo:'',//身份证
        phone:'',//手机号
        customerName:'',//债务人
        applyStatus:'',//审核状态
        caseSource:'',//案件来源
        applyUserName:''//申请人
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
        loadId:obj.loadId
      }
      this.auditForm={
        id:obj.id,
        caseId:obj.caseId,
        borrowId:obj.borrowId,
        applyStatus:obj.applyStatus,
        examineRemark: obj.examineRemark
      }
      this.auditOpen=true
    },
    async auditsubmit(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          doCaseRepay(this.auditForm).then(response => {
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
    clearauditForm(){
      this.auditForm={
        caseId:'',
        id:'',
        applyStatus:'',
        remark:''
      }
      this.resetForm("auditRef");
    },
    auditcancel(formName){
     this.clearauditForm()
      this.auditOpen=false;
    },
    handlecaseFile(){
        repayExport(this.queryParams).then(response => {
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
