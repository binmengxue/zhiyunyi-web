<template>
  <div class="app-container">
    <Search1 @seachEvent="seach"  @restEvent="rest"   :queryParams='this.queryParams' :distributionName="this.distributionName"></Search1>
    <el-row :gutter="10" style="padding-top:20px;" >
         <el-col :span="1.5"  >
            <el-button type="primary" icon="el-icon-download" size="mini" @click="handlecaseFile" v-hasPermi="['case.reduce.export']">导出</el-button>
          </el-col>
     </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="24" :xs="24" style="border:1px solid #e6e6e6;padding-bottom:30px;text-align: center;">
          <el-table stripe v-loading="loading" element-loading-text="拼命加载中" :data="userList" >
            <el-table-column align="center" label="操作" width="100" style="position:relative;" fixed="left">
              <template slot-scope="scope" v-if="scope.row.applyStatus == 0">
                <el-button type="text" icon="el-icon-tickets"  size="small" @click="handleAudit(scope.row)" v-hasPermi="['case.reduce.examine']">审核</el-button>
              </template>
            </el-table-column>
            <el-table-column label="客户编号"  width="100"  align="left" prop="caseId"  />
            <el-table-column label="借款编号"  width="100"  align="left" prop="loadId"  />
            <el-table-column label="债权方客户编号"  width="120"  align="left" prop="customerId"  />
            <el-table-column label="案件来源" width="150" align="center" prop="caseSource" >
              <template slot-scope="scope">
                {{getFileItem(scope.row.caseSource,caseSource)}}
              </template>
            </el-table-column>
            <el-table-column label="债务人"  width="100"  align="left" prop="customerName"  />
            <el-table-column label="客户身份证"  width="180"  align="left" prop="identityNo"  >
              <template slot-scope="scope">
                {{scope.row.identityNo?plusXing(scope.row.identityNo,3,4):''}}
              </template>
            </el-table-column>
            <el-table-column label="客户手机号"  width="150"  align="left" prop="phone"  >
              <template slot-scope="scope">
                {{scope.row.phone?plusXing(scope.row.phone,3,4):''}}
              </template>
            </el-table-column>
            <el-table-column label="减免本金" width="150" align="center" prop="reductionPrincipal" />
            <el-table-column label="减免利息" width="150" align="center" prop="reductionInterest" />
            <el-table-column label="减免违约金" width="150" align="center" prop="reductionContract" />
            <el-table-column label="申请人编号" width="100" align="center" prop="applyUserId" />
            <el-table-column label="申请人昵称" width="100" align="center" prop="applyUserName" />
            <el-table-column label="申请时间" width="170" align="center" prop="applyTime" >
               <template slot-scope="scope">
                   {{scope.row.applyTime?scope.row.applyTime:''}}
               </template>
             </el-table-column>
            <el-table-column label="申请部门" width="100" align="center" prop="applyDeptName" />
            <el-table-column label="申请凭证" width="200" align="center" prop="reductionPic" >
             <template slot-scope="scope">
                <el-link :href="scope.row.reductionPic" target="_blank">
                  <pdf  v-if="scope.row.reductionPic && scope.row.reductionPic.indexOf('.pdf')!=-1" style="width:50px;height:auto;"  :src="scope.row.reductionPic" ></pdf>
                  <el-image v-else-if="scope.row.reductionPic && scope.row.reductionPic.indexOf('.pdf')==-1" style="width:50px;height:auto;"  :src="scope.row.reductionPic" ></el-image>
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="申请备注" width="100" align="center" prop="applyRemark" />
            <el-table-column label="审核时间" width="170" align="center" prop="examineTime" >
              <template slot-scope="scope">
                {{scope.row.examineTime?scope.row.examineTime:''}}
              </template>
            </el-table-column>
            <el-table-column label="审核人昵称" width="100" align="center" prop="examineUserName" />
            <el-table-column label="审核备注" width="100" align="center" prop="examineRemark" />
            <el-table-column label="审核状态" width="100" align="center" prop="applyStatus" >
              <template slot-scope="scope">
                {{getFileItem(scope.row.applyStatus,applyStatus)}}
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
            <el-form-item label="贷款编号" >
                <div>{{auditText.loadId}}</div>
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
                        v-for="dict in applyStatusResult"
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
import {doCaseReduction,getCaseReductionList,doCaseReductionExport} from "@/api/case/index";
import {getcaseReductionApplyStatus,getcaseSource} from '@/utils/statusInfo'
import  Search1  from "@/views/audit/search1.vue";
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
        applyUserName:'',//申请人昵称
        applyDeptId:'',//申请人部门
        applyStartTime:'',//申请开始时间
        applyEndTime:'',//申请结束时间
        customerId:'',//客户编号
        examineUserName:'',//审核人昵称
        applyStatus:'',//审核状态
        examineStartTime:'',//审核开始时间
        examineEndTime:'',//审核结束时间
        customerName:'',//债务人
        loadId:'',//借款编号
        caseSource:'',//案件来源
        applyUserId:''//申请人编号
      },
      distributionName:'请选择',
      applyStatus:[],//审核状态
      applyStatusResult:[],
      caseSource:[],//案件来源
      auditOpen:false,//是否显示审核弹出层
      auditForm:{
        caseId:'',
        borrowId:'',
        loadId:'',
        id:'',
        applyStatus:'',
        examineRemark:''
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
        loadId:'',

      }
    };
  },
  components: {Search1,pdf},
  watch: {

  },
  async created() {
      this.applyStatus=await getcaseReductionApplyStatus()
      let ary=await getcaseReductionApplyStatus();
            ary.shift();
      this.applyStatusResult=ary;
      this.caseSource= await getcaseSource()
      this.getList()
  },
  methods: {
   shijiantime(times){
       var timestr = times.match(/(\S*).000+/)[1]
       return timestr
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
     console.log(typeof this.queryParams.identityNo)
     getCaseReductionList(this.queryParams).then(response => {
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
    rest(obj){
      this.clearQueryParams();
      obj.setCheckedNodes([]);
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
        loadId:obj.loadId,
        applyStatus:'',
        examineRemark: ''
      }
      this.auditOpen=true
    },
    async auditsubmit(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          doCaseReduction(this.auditForm).then(response => {
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
        doCaseReductionExport(this.queryParams).then(response => {
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
