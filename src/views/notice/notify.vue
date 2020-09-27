<template>
  <div class="app-container">
    <Search1 @seachEvent="seach"  @restEvent="rest"   :queryParams='this.queryParams'></Search1>
    <el-row :gutter="10" style="padding-top:20px;" >
          <el-col :span="1.5"  >
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="addModle">添加</el-button>
          </el-col>
          <el-col :span="1.5"  >
            <el-button size="mini"  type="primary" icon="el-icon-edit" @click="amendModel">修改</el-button>
          </el-col>
          <el-col :span="1.5"  >
            <el-button size="mini"  type="primary" icon="el-icon-unlock" @click="handleStart">启用</el-button>
          </el-col>
          <el-col :span="1.5"  >
            <el-button size="mini"  type="primary" icon="el-icon-lock" @click="handleEnd">停用</el-button>
          </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="24" :xs="24" style="border:1px solid #e6e6e6;padding-bottom:30px;text-align: center;">
          <el-table stripe v-loading="loading" :data="userList" @selection-change="handleSelectionChange" element-loading-text="拼命加载中">
            <el-table-column type="selection" width="60" prop="id" align="center" />
            <el-table-column label="告知函编码"  width="150"  align="left" prop="id"  />
            <el-table-column label="告知函名称"  width="150"  align="left" prop="templateName"  />
            <el-table-column label="法院名称" align="center" prop="courtName" />
            <el-table-column label="公章链接" width="100" align="center" prop="officalSeal" />
            <el-table-column label="模板状态" width="100" align="center" prop="templateStatus" >
              <template slot-scope="scope">
                  {{scope.row.templateStatus==1?'启用':'停用'}}
              </template>
             </el-table-column>
            <el-table-column label="创建人" width="100" align="center" prop="creatorName" />
            <el-table-column label="创建时间" width="100" align="center" prop="createTime" />
            <el-table-column label="最后修改人" width="100" align="center" prop="updatetorName" />
            <el-table-column label="最后修改时间" width="100" align="center" prop="updateTime" />
            <el-table-column label="备注" width="100" align="center" prop="remark" />
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
    <el-dialog title="模板" :visible.sync="modleOpen" width="800px" append-to-body>
      <el-form ref="modleRef"   :model="modleForm" :rules="rules" label-width="100px">
        <div class="el-formDiv">
            <el-form-item label="模板名称" prop="templateName">
                <el-input
                    type="text"
                    placeholder="请输入内容"
                    style="width:600px;"
                    v-model="modleForm.templateName">
                  </el-input>
            </el-form-item>
            <el-form-item label="法院" prop="courtName">
                <el-input
                    type="text"
                    placeholder="请输入内容"
                    style="width:600px;"
                    v-model="modleForm.courtName">
                  </el-input>
            </el-form-item>
            <el-form-item label="公章链接" >
                <el-input
                    type="text"
                    placeholder="请输入内容"
                    style="width:600px;"
                    v-model="modleForm.officalSeal">
                  </el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                 <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    style="width:600px;"
                    v-model="modleForm.remark">
                  </el-input>
            </el-form-item>
            <div style="padding-bottom:20px;color:#ff0000;font-size:14px;">注意：模板中需要使用变量时，格式：{#变量名}，目前支持的变量有，债务人姓名：customerName,债务人身份证：identityNo,债务人银行卡，bankNo,渠道：caseSource，应还总额：payTotalAmount,应还本金：payPrincipalAmount</div>
             <mavon-editor 
                  v-model="modleForm.templateContent"  
                  @change="changeData"
                  style="height:400px;"/>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modleSubmit('modleRef')">确 定</el-button>
        <el-button @click="modleCancel('modleRef')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import  Search1  from "@/views/notice/search1.vue";
import {getNotifyList,addNotification,notification,notiiyInfo,updateNotification} from "@/api/case/index";
export default {
  name: "Case",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  data() {
    return {
      userList: null,// 用户表格数据
      loading:false,
      total:0,
      id:[],//选择的数据

      queryParams:{
          pageNum:1,
          pageSize:10,
          templateName:'',
      },
      modleOpen:false,//是否显示添加弹出层
      modleForm:{
          officalSeal:'',
          id:null,
          templateContent:"",
          remark:"",
          courtName:"",
          templateName:""
      },
      rules:{
        remark: [
            { required: true, message: '请填写', trigger: 'blur' },
        ],
        templateName: [
            { required: true, message: '请填写', trigger: 'blur' },
        ],
        courtName: [
            { required: true, message: '请填写', trigger: 'blur' },
        ],
        templateContent:[
            { required: true, message: '请填写', trigger: 'blur' },
            { min: 10, max: 1000000, message: '长度大于10', trigger: 'blur' }
        ],
      },
      btnType:1
    }
  },
  components: {Search1},  
  watch: {
   
  },
  created() {
    this.getList()
  },
  methods: {
    // 一排按钮是否亮起
    handleSelectionChange(selection) {
      this.id = selection.map(item => item.id);
    },
     /** 查列表 */
    getList() {
      this.loading = true;
      getNotifyList(this.queryParams).then(response => {
            this.loading = false;
            this.userList = response.rows;
            this.total=response.total;
            this.clearQueryParams()
      });
    },
    seach() {
      this.getList();
    },
    clearQueryParams(){
      this.queryParams = {
        templateName:'',
      };
      this.resetForm("queryParams");
    },
    rest(){
       this.clearQueryParams()
    },
    addModle(){
         this.btnType=1;
         this.modleOpen=true;
    },
    changeData(value, render){
        this.modleForm.templateContent = render;
    },
    modleSubmit(formName){
      this.$refs[formName].validate( async(valid) => {
          if (valid) {
            if(this.btnType==1){
                let reault=await addNotification(this.modleForm);
                if(reault.code==200){
                    this.$message({
                      message: '添加成功',
                      type: 'success'
                    });
                  }
            }else{
              let reault=await updateNotification(this.modleForm);
                if(reault.code==200){
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                  }
            }
            this.$refs[formName].resetFields();
            this.modleOpen=false;
            this.getList();
            
          }else{
            return false;
          }
      });   
    },
    modleCancel(formName){
      this.$refs[formName].resetFields();
      this.modleOpen=false;
    },
    async amendModel(){
      this.btnType=2;
      const id=this.id.toString();
      const data={id:id}
      let reault=await notiiyInfo(data);//获取模板详情
      this.modleForm={
          id:reault.data.id,
          officalSeal:reault.data.officalSeal || '',
          templateContent:reault.data.templateContent,
          remark:reault.data.remark,
          courtName:reault.data.courtName,
          templateName:reault.data.templateName
      },
      this.modleOpen=true;
    },
    async handleStart(){
      const id=this.id.toString();
      const data={ids:id,templateStatus:1}
      let reault=await notification(data);
          if(reault.code==200){
            this.$message({
              message: '启动',
              type: 'success'
            });
          }
    },
    async handleEnd(){
      const id=this.id.toString();
      const data={ids:id, templateStatus:2}
      let reault=await notification(data);
          if(reault.code==200){
            this.$message({
              message: '停用',
              type: 'success'
            });
          }
    }
  }
};
</script>
<style lang="scss" scoped>

</style>