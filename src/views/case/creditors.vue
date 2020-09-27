<template>
  <div class="app-container">
     <el-row>
      <!--用户数据-->
      <el-col style="padding:20px 0px 0px 0px;border:1px solid #d2d2d2;background: #fbfbfb;">
        <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="130px">
              <el-form-item label="公司名称" prop="companyName" >
                <el-input
                  v-model="queryParams.companyName"
                  clearable
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
              <el-form-item label="联系人姓名" prop="contactName">
                <el-input
                  v-model="queryParams.contactName"
                  clearable
                  size="small"
                  style="width:280px"
                />
              </el-form-item>
              <el-form-item label="状态" prop="status">
                    <el-select
                      v-model="queryParams.status"
                      placeholder="请选择"
                      clearable
                      size="small"
                      style="width:280px"
                    >
                      <el-option
                        v-for="dict in frozenStatus"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      />
                    </el-select>
              </el-form-item>
          <span v-show="isMore">
              <el-form-item label="当前案件数量">
                  <el-form-item prop="curCasenumStart" style="margin-right:0px;">
                      <el-input v-model="queryParams.curCasenumStart" clearable size="small" style="width:125px" />
                  </el-form-item>
                  <span style="padding:0 5px;">一</span>
                  <el-form-item prop="overdueDaysEnd" style="margin-right:0px;">
                      <el-input v-model="queryParams.overdueDaysEnd" clearable size="small" style="width:125px" />
                  </el-form-item>  
              </el-form-item>
              <el-form-item label="联系人手机号"  prop="contactPhone">
                  <el-input v-model="queryParams.contactPhone" clearable size="small" style="width:280px" />
              </el-form-item>
              <el-form-item label="注册时间">
                  <el-form-item prop="createTimeStart" style="margin-right:0px;">
                      <el-date-picker
                          v-model="queryParams.createTimeStart"
                          type="date"
                          size="small"
                          style="width:140px"
                          placeholder="开始日期"
                          format="yyyy-MM-dd" >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="createTimeEnd" style="margin-right:0px;">
                        <el-date-picker
                              v-model="queryParams.createTimeEnd"
                              type="date"
                              size="small"
                              style="width:140px"
                              placeholder="结束日期"
                              format="yyyy-MM-dd" >
                          </el-date-picker> 
                    </el-form-item>
                    
              </el-form-item>
              <el-form-item label="当前案件金额" >
                  <el-form-item prop="curMoneyStart" style="margin-right:0px;">
                    <el-input v-model="queryParams.curMoneyStart" clearable size="small" style="width:125px" />
                  </el-form-item>
                  <span style="padding:0 5px;"> 一</span>
                  <el-form-item prop="curMoneyEnd" style="margin-right:0px;">
                    <el-input v-model="queryParams.curMoneyEnd" clearable size="small" style="width:125px" />
                  </el-form-item>
              </el-form-item>
              <el-form-item label="联系人邮箱" prop="contactEmail" >
                  <el-input v-model="queryParams.contactEmail" clearable size="small" style="width:280px" />
              </el-form-item>
          </span>
          <div class="el-formDiv"  style="display:flex;justify-content: center;">
                <el-button type="primary" icon="el-icon-search" size="mini"  @click="handleSearch('queryRef')" >查询</el-button>
                <el-button type="warning" icon="el-icon-setting" size="mini" @click="handleReset('queryRef')">重置</el-button>
          </div>
          <div style="text-align: center;background:#efefef;border-top:1px solid #d2d2d2;margin-top:20px;">
              <el-button type="text" @click="handleMore"  style="width:100%" :icon="isMoreIcon">更多筛选条件</el-button>
          </div>
        </el-form>
     </el-col>
    </el-row>
    <el-row :gutter="10" style="padding-top:20px;" >
        <el-col :span="1.5" v-show="isString('ajlb_fa')" >
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd(1)">新增</el-button>
            <el-button type="primary" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
        </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="24" :xs="24" style="border:1px solid #e6e6e6;padding-bottom:30px;text-align: center;">
          <el-table  stripe v-loading="loading" element-loading-text="拼命加载中" :data="userList" >
            <el-table-column align="center" label="操作" width="200" style="position:relative;" fixed="left">
              <template slot-scope="scope" >
                <el-button type="text"  icon="el-icon-edit" size="small" @click="handleEditor(scope.row,2)">编辑</el-button>
                <el-button type="text"  icon="el-icon-lock" size="small" @click="handleFreeze(scope.row)">冻结</el-button>
                <el-button type="text"  icon="el-icon-view" size="small" @click="handleView(scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="公司名称"  width="100"  align="left" prop="companyName"  />
            <el-table-column label="联系人姓名"  width="100"  align="left" prop="contactName"  />
            <el-table-column label="联系人手机号"  width="120"  align="left" prop="contactPhone"  />
            <el-table-column label="联系人邮箱" width="150" align="center" prop="contactEmail" />
            <el-table-column label="注册时间" width="150" align="center" prop="createTime" >
            </el-table-column>
            <el-table-column label="公司地址" width="150" align="center" prop="companyAddress" >
            </el-table-column>
            <el-table-column label="当前案件数量" width="150" align="center" prop="curCasenum" >
            </el-table-column>
            <el-table-column label="当前案件金额" width="100" align="center" prop="curMoney" />
            <el-table-column label="当前案件本金" width="150" align="center" prop="curPrincipal" />
            <el-table-column label="历史委托案件量" width="120" align="center" prop="historyCasenum" />
            <el-table-column label="历史委托总额" width="150" align="center" prop="historyMoney" />
            <el-table-column label="历史委托本金" width="100" align="center" prop="historyPrincipal" >
            </el-table-column>
            <el-table-column label="状态" align="center" prop="status" >
              <template slot-scope="scope">
                  {{getFileItem(scope.row.status,frozenStatus)}}
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
     <!-- 新增弹出层 -->
    <el-dialog title="新增/修改信息" :visible.sync="addOpen" width="600px" append-to-body>
      <el-form ref="addRef"   :model="addForm" :rules="addRules" label-width="120px">
        <div class="el-formDiv">
            <el-form-item label="公司姓名" prop="companyName">
                 <el-input type="text"  placeholder="请输入内容" style="width:250px;"  v-model="addForm.companyName"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contactName">
                 <el-input type="text"  placeholder="请输入内容" style="width:250px;"  v-model="addForm.contactName"></el-input>
            </el-form-item>
            <el-form-item label="联系人手机号" prop="contactPhone">
                 <el-input type="text"  placeholder="请输入内容" style="width:250px;"  v-model="addForm.contactPhone"></el-input>
            </el-form-item>
            <el-form-item label="联系人邮箱" prop="contactEmail">
                 <el-input type="text"  placeholder="请输入内容" style="width:250px;"  v-model="addForm.contactEmail"></el-input>
            </el-form-item>
            <el-form-item label="公司地址" prop="companyAddress">
                 <el-input type="textarea" :rows="2" placeholder="请输入内容"  style="width:250px;" v-model="addForm.companyAddress"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="channelRemark">
                 <el-input type="textarea" :rows="2" placeholder="请输入内容"  style="width:250px;" v-model="addForm.channelRemark"></el-input>
            </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmit('addRef')">确 定</el-button>
        <el-button @click="addCancel('addRef')">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 冻结弹出层 -->
    <el-dialog title="债权方冻结" :visible.sync="congelationOpen" width="600px" append-to-body>
      <el-form ref="congelationRef"   :model="congelationForm" :rules="congelationRules" label-width="100px">
        <div style="padding-left:15px;font-size:16px;padding-bottom:20px;"><i class="el-icon-warning" style="color:#f5ac09;margin-right:5px;"></i>此操作将导致债权方案件不可操作且不可恢复，是否确定？</div>
        <div class="el-formDiv">
            <el-form-item label="冻结原因" prop="frozenReason">
                 <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    style="width:350px;"
                    v-model="congelationForm.frozenReason">
                  </el-input>
            </el-form-item>

        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="congelationsubmit('congelationRef')">确 定</el-button>
        <el-button @click="congelationcancel('congelationRef')">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 查看弹出层 -->
    <el-dialog :visible.sync="viewOpen" width="600px" append-to-body title="详细信息">
        <el-table :data="gridData">
            <el-table-column property="createTime" label="导入时间" width="150"></el-table-column>
            <el-table-column property="operatorName" label="导入人昵称" width="100"></el-table-column>
            <el-table-column property="importNum" label="导入数量"></el-table-column>
            <el-table-column property="importPrincipal" label="导入本金"></el-table-column>
            <el-table-column property="importTotal" label="导入总额"></el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>
<script>
import {channelSaveChannel,channelList,channelUpdateChannel,channelFronzenChannel,caseInfoChannel,channelExport} from "@/api/case/index";
import {getcaseStayApplyStatus,getcaseSource,getchannelStatus} from '@/utils/statusInfo'
import  Search1  from "@/views/case/search1.vue";
import pdf from 'vue-pdf';
export default {
  name: "Creditors",
  data() {
    return {
      loading:true,
      userList: null,
      total:0,
      queryParams: {
        pageNum:1,
        pageSize:10,
      },
      frozenStatus:[],//冻结状态
      addOpen:false,//是否显示编辑或者新增弹出层
      addForm:{
        companyName:null,
        contactName:null,
        contactPhone:null,
        contactEmail:null,
        companyAddress:null,
        channelRemark:null,
        id:null,
      },
      addRules:{
          companyName:[
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          contactName:[
             { required: true, message: '请输入', trigger: 'blur' },
          ],
          contactPhone:[
             { required: true, message: '请输入', trigger: 'blur' },
          ],
          contactEmail:[
             { required: true, message: '请输入', trigger: 'blur' },
          ],
          companyAddress:[
               { required: true, message: '请输入', trigger: 'blur' },
          ],
          channelRemark:[
             { required: true, message: '请输入', trigger: 'blur' },
          ],

      },
      isAddOrUpdate:1,//1为新增2为修改
      congelationOpen:false,//冻结申请是否展示
      congelationForm:{
          frozenReason: '',
          caseChannelId:null
      },
      congelationRules: {
        frozenReason: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
      },
      viewOpen:false,
      gridData: [],
      isMore:false,
      isMoreIcon:'el-icon-arrow-down',
    };
  },
  components: {},
  watch: {

  },
  async created() {
      this.frozenStatus= await getchannelStatus()
      this.getList()
  },
  methods: {
    isString(str){
      var ary=this.$store.getters.permissions;
      for(var i=0,n=ary.length;i<n;i++){
          if(ary[i]==str || ary[i]=="*:*:*"){
                return  true
          }
      }
      return  false
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
      channelList(this.queryParams).then(response => {
            this.loading = false;
            this.userList = response.rows;
            this.total=response.total;
          }
      );
    },
    handleSearch(formName) {
      this.getList();
    },
    handleReset(formName){
        this.$refs[formName].resetFields();
    },
    handleAdd(num){
      this.addForm={
        companyName:null,
        contactName:null,
        contactPhone:null,
        contactEmail:null,
        companyAddress:null,
        channelRemark:null,
      }
      this.addOpen=true;
      this.isAddOrUpdate=num;
    },
    async addSubmit(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isAddOrUpdate
          if(this.isAddOrUpdate==1){
            channelSaveChannel(this.addForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.$refs[formName].resetFields();
                this.getList();
                this.addOpen=false
              } else {
                this.msgError(response.msg);
                return false;
              }
            });
          }else{
            channelUpdateChannel(this.addForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.$refs[formName].resetFields();
                this.getList();
                this.addOpen=false
              } else {
                this.msgError(response.msg);
                return false;
              }
            });
          }
          
        } else {
          return false;
        }
      });

    },
    addCancel(formName){
       this.$refs[formName].resetFields();
       this.addOpen=false
    },
    async handleEditor(obj,num){
      this.addForm={
        companyName:obj.companyName,
        contactName:obj.contactName,
        contactPhone:obj.contactPhone,
        contactEmail:obj.contactEmail,
        companyAddress:obj.companyAddress,
        channelRemark:obj.channelRemark,
        id:obj.id,
      }
      this.isAddOrUpdate=num
      this.addOpen=true

    },
    handleFreeze(obj){
      console.log(obj)
       this.congelationOpen=true
       this.congelationForm.caseChannelId=obj.id;
    },
    congelationsubmit(formName){
      this.$refs[formName].validate(async (valid) => {
          if (valid) {
            channelFronzenChannel(this.congelationForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess("冻结成功");
                this.$refs[formName].resetFields();
                this.getList();
                this.congelationOpen=false
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
    congelationcancel(formName){
      this.$refs[formName].resetFields();
      this.congelationOpen=false
    },
    async handleView(obj){
        this.viewOpen=true;
        const data={
          caseSource:obj.id
        }
        const reslut= await caseInfoChannel(data)
        this.gridData=reslut.data;
        console.log(reslut)
        

    },
    handleMore(){
      this.isMore=!this.isMore;
      if(this.isMore){
          this.isMoreIcon="el-icon-arrow-up"
      }else{
        this.isMoreIcon="el-icon-arrow-down"
      }
      
    },
    async handleExport(){
       const reslut=await channelExport();
        if(reslut.code==200){
                this.download(reslut.msg);
        }
    }

  }
};
</script>
<style lang="scss" scoped>

</style>
