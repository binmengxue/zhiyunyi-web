<template>
  <div class="app-container">
    <SearchRepay @seachEvent="seach"  @restEvent="rest"   :queryParams='this.queryParams'></SearchRepay>
    <el-row>
      <el-row :gutter="10" style="padding-top:20px;padding-bottom:20px;" >
        <el-col :span="1.5" >
          <el-button type="primary" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
        </el-col>
      </el-row>
      <el-col :span="24" :xs="24" style="border:1px solid #e6e6e6;padding-bottom:30px;text-align: center;">
          <el-table  stripe v-loading="loading" :data="userList" element-loading-text="拼命加载中">
            <el-table-column label="案件来源"  width="100"  align="left" prop="caseSource"  >
              <template slot-scope="scope">
                {{getFileItem(scope.row.caseSource,infoStatus.caseSource)}}
              </template>
            </el-table-column>
            <el-table-column label="客户编号"  width="120"  align="left" prop="customerId"  />
            <el-table-column label="姓名"  width="100"  align="left" prop="customerName"  />
            <el-table-column label="身份证" width="150" align="center" prop="identityNo" >
              <template slot-scope="scope">
                {{scope.row.identityNo?plusXing(scope.row.identityNo,3,4):''}}
              </template>
            </el-table-column>
            <el-table-column label="手机号" width="150" align="center" prop="phone" >
              <template slot-scope="scope">
                {{scope.row.phone?plusXing(scope.row.phone,3,4):''}}
              </template>
            </el-table-column>
            <el-table-column label="委托开始时间" width="150" align="center" prop="entrustStartTime" >
               <template slot-scope="scope">
                 {{scope.row.entrustStartTime?scope.row.entrustStartTime.substr(0,10):''}}
               </template>
            </el-table-column>
            <el-table-column label="委托时逾期天数" width="150" align="center" prop="overdueDays" />
            <el-table-column label="债务编号" width="120" align="center" prop="loadId" />
            <el-table-column label="账单编号" width="120" align="center" prop="billId" />
            <el-table-column label="交易流水号" width="150" align="center" prop="serialNumber" />
            <el-table-column label="还款时间" width="150" align="center" prop="repayTime" />
            <el-table-column label="还款推送时间" width="150" align="center" prop="createTime" />
            <el-table-column label="数据来源" width="120" align="center" prop="dataSource" >
              <template slot-scope="scope">
                {{getFileItem(scope.row.dataSource,infoStatus.dataSource)}}
              </template>
            </el-table-column>
            <el-table-column label="还款方式" width="120" align="center" prop="repayType" >
              <template slot-scope="scope">
                {{getFileItem(scope.row.repayType,infoStatus.repayType)}}
              </template>
            </el-table-column>
            <el-table-column label="还款本金" width="150" align="center" prop="repayPrincipal" />
            <el-table-column label="还款利息" width="150" align="center" prop="repayInterest" />
            <el-table-column label="还款违约金" width="150" align="center" prop="repayOutContract" />
            <el-table-column label="还款总额" width="150" align="center" prop="repayAmount" />
            <el-table-column label="调解员编号" width="150" align="center" prop="applyUserId" />
            <el-table-column label="调解员姓名" width="150" align="center" prop="applyUserName" />
            <el-table-column label="调解员部门" width="150" align="center" prop="applyDeptName" />
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
import {getRepayList,repayListExport} from "@/api/case/index";
import {getcaseSource,getRepayType} from '@/utils/statusInfo'
import  SearchRepay  from "@/views/case/searchRepay.vue";
export default {
  name: "CaseRepay",
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
        identityNo:'',//身份证
        customerName:'',//债务人
        phone:'',//手机号
        customerId:'',//客户编号
        loadId:'',//借款编号
        billId:'',//账单编号
        serialNumber:'',//交易流水号
        applyUserName:'',//调解员姓名
        applyUserPhone:'',//调解员手机号
        dataSource:'',//数据来源
        repayType:'',//还款方式
        applyDeptId:'',//调解员部门
        caseSource:'',//案件来源
        repayTimeStart:'',//还款时间开始
        repayTimeEnd:'',//还款时间结束
        createTimeStart:'',//创建时间开始
        createTimeEnd:'',//创建时间结束
        repayPrincipalMin:'',//还款本金最小
        repayPrincipalMax:'',//还款本金最大
        repayAmountMin:'',//还款总额最小
        repayAmountMax:'',//还款总额最大
      },
      infoStatus:{
        caseSource:[],//案件来源
        dataSource:[
          {'dictValue':'0','dictLabel':'系统导入'},
          {'dictValue':'1','dictLabel':'平台录入'}
        ],//数据来源
        repayType:[],//还款方式
      },
    };
  },
  components: {SearchRepay},
  watch: {

  },
  async created() {
      this.infoStatus.caseSource= await getcaseSource()
      this.infoStatus.repayType= await getRepayType()
      this.getList()
  },
  methods: {
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
   shijiantime(times){
       var timestr = times.match(/(\S*).000+/)[1]
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
      getRepayList(this.queryParams).then(response => {
            this.loading = false;
            this.userList = response.rows;
            this.total=response.total;
          }
      );
    },
    clearQueryParams() {
      this.queryParams = {
        pageNum: "1",
        pageSize: "10",
        isAsc:'desc',
        orderByColumn:'create_time',
        identityNo:'',//身份证
        customerName:'',//债务人
        phone:'',//手机号
        customerId:'',//客户编号
        loadId:'',//借款编号
        billId:'',//账单编号
        serialNumber:'',//交易流水号
        applyUserName:'',//调解员姓名
        applyUserPhone:'',//调解员手机号
        dataSource:'',//数据来源
        repayType:'',//还款方式
        applyDeptId:'',//调解员部门
        caseSource:'',//案件来源
        repayTimeStart:'',//还款时间开始
        repayTimeEnd:'',//还款时间结束
        createTimeStart:'',//创建时间开始
        createTimeEnd:'',//创建时间结束
        repayPrincipalMin:'',//还款本金最小
        repayPrincipalMax:'',//还款本金最大
        repayAmountMin:'',//还款总额最小
        repayAmountMax:'',//还款总额最大
      };
      this.resetForm("queryParams");
    },
    seach() {
      this.getList();
    },
    rest(){
      this.clearQueryParams()
    },
    handleExport(){
      repayListExport(this.queryParams).then(response => {
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
