<template>
  <div class="app-container">
    <Search1 @seachEvent="seach"  @restEvent="rest"   :queryParams='this.queryParams'></Search1>
    <el-row>
      <el-row :gutter="10" style="padding-top:20px;padding-bottom:20px;" >
        <el-col :span="1.5" >
          <el-button type="primary" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
        </el-col>
      </el-row>
      <el-col :span="24" :xs="24" style="border:1px solid #e6e6e6;padding-bottom:30px;text-align: center;">
          <el-table  stripe v-loading="loading" :data="userList" element-loading-text="拼命加载中">
            <el-table-column align="center" label="操作" width="100"  style="position:relative;" fixed="left">
              <template slot-scope="scope" v-if="scope.row.applyStatus == 0">
                <el-button type="text" size="small" icon="el-icon-tickets" @click="handleAudit(scope.row)">审核</el-button>
              </template>
            </el-table-column>
            <el-table-column label="案件编号"  width="100"  align="left" prop="caseId"  />
            <el-table-column label="客户号"  width="100"  align="left" prop="customerId"  />
            <el-table-column label="债务人"  width="80"  align="left" prop="customerName"  />
            <el-table-column label="手机号" width="150" align="center" prop="phone" />
            <el-table-column label="委托到期日" width="150" align="center" prop="distributionEndTime" >
               <template slot-scope="scope">
                 {{scope.row.distributionEndTime?scope.row.distributionEndTime.substr(0,10):''}}
               </template>
            </el-table-column>
            <el-table-column label="申请时间" width="150" align="center" prop="applyTime" >
               <template slot-scope="scope">
                 {{scope.row.applyTime?scope.row.applyTime:''}}
               </template>
             </el-table-column>
            <el-table-column label="申请到期日" width="150" align="center" prop="stayEndTime" >
               <template slot-scope="scope">
                 {{scope.row.stayEndTime?scope.row.stayEndTime.substr(0,10):''}}
               </template>
            </el-table-column>
            <el-table-column label="申请附件" width="200" align="center" prop="stayPic" >
             <template slot-scope="scope">
                <el-link :href="scope.row.stayPic" target="_blank">
                  <pdf  v-if="scope.row.stayPic && scope.row.stayPic.indexOf('.pdf')!=-1" style="width:50px;height:auto;"  :src="scope.row.stayPic" ></pdf>
                  <el-image v-else-if="scope.row.stayPic && scope.row.stayPic.indexOf('.pdf')==-1" style="width:50px;height:auto;"  :src="scope.row.stayPic" ></el-image>
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="center" prop="applyStatus" >
              <template slot-scope="scope">
                {{getFileItem(scope.row.applyStatus,applyStatus)}}
              </template>
            </el-table-column>
            <el-table-column label="申请人" width="100" align="center" prop="applyUserName" />
            <el-table-column label="申请备注" align="center" prop="stayRemark" />
            <el-table-column label="审批人" width="100" align="center" prop="examineUserName" />
            <el-table-column label="审核备注" align="center" prop="examineRemark" />
            <el-table-column label="渠道" width="100" align="center" prop="caseSource" >
              <template slot-scope="scope">
                {{getFileItem(scope.row.caseSource,infoStatus.caseSource)}}
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
    <!-- 审核弹出层 -->
    <el-dialog title="审核" :visible.sync="auditOpen" width="600px" append-to-body>
      <el-form ref="auditRef"   :model="auditForm" :rules="auditRules" label-width="100px">
        <div class="el-formDiv">
            <el-form-item label="案件编号">
                <div>{{auditText.caseId}}</div>
            </el-form-item>
            <el-form-item label="姓名" >
                <div>{{auditText.customerName}}</div>
            </el-form-item>
            <el-form-item label="审核结果" prop="applyStatus">
                    <el-select
                      v-model="auditForm.applyStatus"
                      placeholder="请选择"
                      clearable
                      size="small"
                      style="width:150px"
                    >
                      <el-option
                        v-for="dict in applyStatusReulut"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
              </el-form-item>
            <el-form-item label="备注"  prop="examineRemark">
                 <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    style="width:250px;"
                    v-model="auditForm.examineRemark">
                  </el-input>
            </el-form-item>

        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="auditsubmit('auditRef')">确 定</el-button>
        <el-button @click="auditcancel('auditRef')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getCaseLeaveList,getDoCaseLeave,caseLeaveExport} from "@/api/case/index";
import {getcaseStayApplyStatus,getcaseSource} from '@/utils/statusInfo'
import  Search1  from "@/views/case/search1.vue";
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
        applyUserName:'',//申请人
        applyStartTime:'',//申请开始时间
        applyEndTime:''//申请结束时间
      },
      applyStatus:[],//审核状态
      applyStatusReulut:[],//审核结果
      infoStatus:{
        caseSource:[],//案件来源
      },
      auditOpen:false,//是否显示审核弹出层
      auditForm:{
        caseId:'',
        id:'',
        applyStatus:'',
        examineRemark:'',
        stayEndTime:''
      },
      auditRules:{
          applyStatus: [
            { required: true, message: '请选择' },
          ],
          examineRemark:[
            { required: false, message: '填写备注' },
          ]
      },
      auditText:{
        caseId:'',
        id:'',
        customerName:'',

      }
    };
  },
  components: {Search1,pdf},
  watch: {

  },
  async created() {
      this.applyStatus=await getcaseStayApplyStatus();
      let ary=await getcaseStayApplyStatus();
            ary.shift();
      this.applyStatusReulut=ary;
      this.infoStatus.caseSource= await getcaseSource()
      this.getList()
  },
  methods: {
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
      getCaseLeaveList(this.queryParams).then(response => {
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
        customerName:obj.customerName
      }
      this.auditForm={
        id:obj.id,
        caseId:obj.caseId,
        stayEndTime:obj.stayEndTime,
        applyStatus:'',
        examineRemark:''
      }
      this.resetForm("auditRef");
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
    handleExport(){
      caseLeaveExport(this.queryParams).then(response => {
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
