<template>
<div >
  <div style="padding-bottom:10px;">
    <el-button type="primary"  size="mini"  v-show="isString('ajxq_tjjl_bh')" @click="openOppen">拨号</el-button>
    <el-button type="success" size="mini"  v-show="isString('ajxq_tjjl_jjjl')"  @click="AddRemark">添加调解记录</el-button>
    <el-button type="success" size="mini"  v-show="isString('ajxq_tjjl_jjjl')"  @click="importCaseAdjust">导入</el-button>
  </div>
  <div  class="borrowInfo">
       <el-table
            :data="tableData"
            stripe
            style="width: 100%;margin-top:20px;">
            <el-table-column prop="createTime" label="调解时间" width="150">
                <template slot-scope="scope">
                      {{scope.row.createTime?scope.row.createTime:''}}
                </template>
            </el-table-column>
           <el-table-column prop="promiseTime" label="承诺还款时间" width="150">
             <template slot-scope="scope">
               {{scope.row.promiseTime?scope.row.promiseTime:''}}
             </template>
           </el-table-column>
            <el-table-column prop="operatorName" label="调解人" width="150"/>
            <el-table-column prop="adjustType"   label="调解方式" width="150">
              <template slot-scope="scope">
                  {{getDictLabelByValue(scope.row.adjustType,adjustTypeList)}}
              </template>
            </el-table-column>
            <el-table-column  prop="dialName" label="被联系人">
            </el-table-column>
            <el-table-column prop="dialPhone" label="被联系人电话" width="150">
                <template slot-scope="scope">
                    {{scope.row.dialPhone?plusXing(scope.row.dialPhone,3,4):''}}
                </template>
            </el-table-column>
            <el-table-column prop="dialRelation" label="关系">
                <template slot-scope="scope">
                  {{getDictLabelByValue(scope.row.dialRelation,dialRelationList)}}
              </template>
            </el-table-column>
            <el-table-column prop="dialResult" label="拨号结果" width="200">
                <template slot-scope="scope">
                  {{getDictLabelByValue(scope.row.dialResult,dialResultList)}}
              </template>
            </el-table-column>
            <el-table-column prop="adjustResult"  label="调解结果" width="150">
                 <template slot-scope="scope">
                  {{getDictLabelByValue(scope.row.adjustResult,adjustResultList)}}
              </template>
            </el-table-column>
            <el-table-column prop="adjustCertificate"  label="上传凭证" width="150">
                <template slot-scope="scope">
                <el-link :href="scope.row.adjustCertificate" target="_blank">
                  <pdf  v-if="scope.row.adjustCertificate && scope.row.adjustCertificate.indexOf('.pdf')!=-1" style="width:50px;height:auto;"  :src="scope.row.adjustCertificate" ></pdf>
                  <el-image v-else-if="scope.row.adjustCertificate && scope.row.adjustCertificate.indexOf('.pdf')==-1" style="width:50px;height:auto;"  :src="scope.row.adjustCertificate" ></el-image>
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="adjustTime" label="沟通时长"></el-table-column>
            <el-table-column prop="remark"  label="备注" width="200"></el-table-column>
            <el-table-column align="center" label="播放" width="150" prop="adjustRecordUrl" style="position:relative;">
                <template slot-scope="scope">
                    <AudioPlayer v-show="scope.row.adjustRecordUrl" :audio-list="stringToAry(scope.row.adjustRecordUrl)"  />
                </template>
            </el-table-column>
            <el-table-column align="center" label="下载" width="150" prop="adjustRecordUrl">
                <template slot-scope="scope">
                   <el-button type="primary" v-show="scope.row.adjustRecordUrl"  @click="downFile(scope.row.adjustRecordUrl)">点击下载</el-button>
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

  </div>
  <el-dialog title="添加调解记录" :visible.sync="appointOpen" width="600px" append-to-body>
        <el-form ref="appointRef" :model="appoint"   :rules="rules" label-width="120px">
            <div style="font-size:16px;padding:0px 0 20px 20px;">
                <i class="el-icon-warning" style="color:#FFBA00;margin-right:5x;"></i> 注：此按键只适用于电话无法接通的欠款人，若家人告知此人失联等可接通的情况请勿点击
            </div>
            <el-form-item label="调解方式" prop="adjustType">
                <el-select
                    v-model="appoint.adjustType"
                    placeholder="请选择"
                    clearable
                    size="small"
                    @change="changeAdjustType"
                    style="width:150px"
                >
                    <el-option
                        v-for="dict in adjustTypeList"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="联系人" prop="dialName">
              <el-select
                    v-model="appoint.dialName"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:150px"
                     @change="changeEvent"
                >
                    <el-option
                        v-for="(dict, index) in dialNameList"
                        :key="index"
                        :label="dict.dictLabel"
                        :value="dict"
                    />
              </el-select>
            </el-form-item>
            <el-form-item label="被联电话" prop="dialPhone">
                <el-input v-model="dialPhone1" clearable   :disabled="true" size="small" style="width:160px" />
             </el-form-item>
            <el-form-item label="关系" prop="dialRelation">
              <el-select
                    v-model="appoint.dialRelation"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:150px"
                >
                    <el-option
                        v-for="dict in dialRelationList"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
              </el-select>
            </el-form-item>
            <el-form-item label="债务人跟进状态" prop="currentCustomerState">
              <el-select
                v-model="appoint.currentCustomerState"
                placeholder="请选择"
                clearable
                size="small"
                style="width:150px"
              >
                <el-option
                  v-for="dict in currentCustomerStateList"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="承诺还款时间"  label-width="120px">
                <el-date-picker
                :picker-options="pickerOptions"
                    v-model="appoint.promiseTime"
                    type="datetime"
                    style="width:200px"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="下次预约时间"  label-width="120px">
              <el-date-picker
                :picker-options="pickerOptions"
                v-model="appoint.nextAdjustTime"
                type="datetime"
                style="width:200px"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="调解结果" prop="adjustResult">
                <el-select
                    v-model="appoint.adjustResult"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:150px"
                >
                    <el-option
                        v-for="dict in adjustResultList"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="拨号结果">
                <el-select
                    v-model="appoint.dialResult"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:150px"
                >
                    <el-option
                        v-for="dict in dialResultList"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="沟通时长" v-show="isAdjustTime"  prop="adjustTime">
                <el-input v-model="appoint.adjustTime" clearable  size="small" style="width:160px" />
            </el-form-item>
            <el-form-item label="添加备注"  prop="remark">
               <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="appoint.remark">
                </el-input>
            </el-form-item>
            <el-form-item label="上传凭证" >
              <el-input type="hidden" v-model="appoint.adjustCertificate"/>
              <el-upload
                class="upload-demo"
                accept=".jpg, .jpeg, .png, .bmp"
                :headers="upload.headers"
                :action="upload.url"
                :limit="1"
                :on-remove="handleRemove"
                :on-success="handleFileSuccess"
                :file-list="fileList2"
                list-type="picture-card">
                <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png/bmp文件，且最多一张</div>
              </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('appointRef')">确 定</el-button>
            <el-button @click="cancel('appointRef')">取 消</el-button>
        </div>
        <el-button  size="mini"   v-show="isString('ajxq_tjjl_yjsl')" @click="keyFill" style="position: absolute;top: 130px;right: 30px;" >一键填充（失联）</el-button>
  </el-dialog>
   <!-- 导入调解记录-->
    <el-dialog title="案件附件上传" :visible.sync="caseAdjustOpen" width="600px" append-to-body >
      <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle">
          <el-col :span="4">
            模板下载：
          </el-col>
          <el-col :span="18" >
            <el-button size="medium" type="primary" icon="el-icon-upload" @click="downloadCaseAdjustTemplate" >调解记录模板下载</el-button>
          </el-col>
      </el-row>
      <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle" >
         <el-col :span="4">
           案件来源：
          </el-col>
          <el-col :span="18">
            <el-select
                    v-model="filecaseSource"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:150px"
                  >
                    <el-option
                      v-for="dict in caseSourceList"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    />
            </el-select>
          </el-col>
      </el-row>
     <el-row :gutter="20" style="padding-top:20px;" type="flex" align="middle">
        <el-col :span="4">
           附件上传：
        </el-col>
        <el-col :span="18" >
            <el-upload
                ref="upload"
                action=""
                :with-credentials="true"
                :http-request="httpRequestCaseAdjust"
                :before-upload="beforeCaseAdjustUpload"
                :file-list="caseAdjustFileList"
                :on-change="handlecaseAdjustChange"
                :auto-upload="false"
             >
                  <el-button size="medium" type="primary" icon="el-icon-upload">调解记录附件上传</el-button>
            </el-upload>
          </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="caseFilesubmitForm">确 定</el-button>
        <el-button @click="clearCaseAdjustFile">取 消</el-button>
      </div>
    </el-dialog>
  <el-card class="box-card" style="width:800px;text-algin:center;position: fixed;left:50%;margin-left:-400px;top:100px;z-index:4000;height:600px;background:#fff" v-show="dialogVisible">
    <div slot="header" class="clearfix">
         <el-button   @click="callPhone">拨打</el-button>
         <el-button   @click="callEnd">发送短信</el-button>
         <el-button style="float: right;margin-left:20px;" type="text" @click="closeCallPop">关闭</el-button>
    </div>
    <div id="sdkId" ref="sdkRef" style=""></div>
  </el-card>
</div>
</template>
<script>
import { borrowList,addCaseAdjustRecord,getCaseAdjustRecordByCaseId,getCaseUserContactsByCaseId,uploadCaseAdjustFile} from "@/api/case/index";
import { getToken } from "@/utils/auth";
import {getdialRelation,getdialResult,getadjustResult,getDialRelation,getadjustType,getCurrentCustomerState,getcaseSource, getconfig} from "@/utils/statusInfo";
import {setStore,getStore} from '@/utils/mUtils.js'
export default {
  name:'caseOperation',
  data() {
       return {
           istue:false,
          appointOpen:false,//是否显示弹出层
          pickerOptions: {
            disabledDate(time) {
            　　　　return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
            }
          }, // 限制留案时间不能不让选择今天以前的
          appoint:{
            caseId:'',
            dialResult:'',
            dialRelation:'',
            currentCustomerState:'',
            promiseTime:'',
            nextAdjustTime:'',
            adjustResult:'',
            adjustType: '',
            dialPhone:'',
            dialName:'',
            remark:'',
            adjustTime:'',
            adjustCertificate:'',
          },
          dialPhone1:'',
          isAdjustTime:false,
          caseAdjustOpen:false,
          caseAdjustFileList:[],
          caseSourceList:[],
          filecaseSource: null,
          rules:{
            adjustType: [
                    { required: true, message: '请选择', trigger: 'change' }
            ],
            dialName: [
                    { required: true, message: '请选择', trigger: 'change' },
            ],
            dialPhone: [
                    { required: true, message: '请输入', trigger: 'blur' },
            ],
            currentCustomerState: [
                    { required: true, message: '请选择', trigger: 'change' },
            ],
            adjustResult: [
                    { required: true, message: '请选择', trigger: 'change' }
            ],
            adjustTime: [
                    { required: false, message: '请输入', trigger: 'blur' },
            ],
            remark: [
                    { required: true, message: '请输入', trigger: 'blur' },
            ],

          },
          upload: {
                headers: { Authorization: "Bearer " + getToken() },
                url: process.env.VUE_APP_BASE_API + "/common/uploadToQny"
          },
          fileList2:[],
          total: 0,
          queryParams: {
                pageNum: 1,
                pageSize: 10,
                caseId: null
            },
          dialResultList:[],
          dialRelationList:[],
          currentCustomerStateList:[],
          adjustResultList:[],
          adjustTypeList: [],
          casestatus:[],
          relation:[],
          result:[],
          dialogVisible:false,
          isCallBoole:true,
          tableData: [],
          dialNameList:[]
       }
  },
  props:["userDataRow","userObj"],
  async created() {
      this.dialResultList= await getdialResult()
      this.dialRelationList= await getdialRelation()
      this.currentCustomerStateList= await getCurrentCustomerState()
      this.adjustResultList= await getadjustResult()
      this.adjustTypeList = await getadjustType();
      this.caseSourceList = await getcaseSource()
      this.getList();


  },
  watch: {
      userDataRow: function(newVal,oldVal){
           this.userDataRow = newVal;
      }
  },
  mounted(){
  },
  methods: {
    importCaseAdjust(){
      this.caseAdjustOpen = true;
    },
    httpRequestCaseAdjust(param) {
      let formData = new FormData();
          formData.append("file", param.file);
          formData.append("caseSource", this.filecaseSource);
          uploadCaseAdjustFile(formData).then(res => {
            this.clearCaseAdjustFile()
           if (res.code == 200){
              this.$message({
                message: '正在导入附件，请耐心等待',
                type: 'success'
              });
           }
      });
    },
    beforeCaseAdjustUpload(file){
       const fileExt=file.name.substring(file.name.lastIndexOf('.')+1)
        if (fileExt != "xlsx") {
          this.$message.error('只能上传xlsx格式的文件!');
        }
        return true;
    },
     handlecaseAdjustChange(file, fileList) {
        if(fileList.length > 1) {
          fileList.splice(0,1);
        }
    },
    caseFilesubmitForm(){
      this.$refs.upload.submit()
    },
    clearCaseAdjustFile(){
      this.caseAdjustFileList=[]
      this.filecaseSource=''
      this.caseAdjustOpen=false;
    },
    async downloadCaseAdjustTemplate(){
      let url=await getconfig('sys.caseAdjust.template')
      let a = document.createElement('a')
          a.href =url
          a.click();
    },
    isString(str){
        var ary=this.$store.getters.permissions;
        for(var i=0,n=ary.length;i<n;i++){
            if(ary[i]==str || ary[i]=="*:*:*"){
                  return  true
            }
        }
        return  false
    },
    async getCaseUser(){
      const result=await getCaseUserContactsByCaseId(this.userDataRow);
       this.dialNameList= result.data
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
    getList() {
      this.queryParams.caseId = this.userDataRow.caseId;
      getCaseAdjustRecordByCaseId(this.queryParams).then(response => {

          this.tableData = response.rows;
          this.total = response.total;
        })
    },
    getDictLabelByValue(vaule,arys){
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
    AddRemark(){
        this.appoint.dialResult = '';
        this.appoint.dialRelation = '';
        this.appoint.currentCustomerState = '';
        this.appoint.promiseTime = '';
        this.appoint.nextAdjustTime = '';
        this.appoint.adjustResult = '';
        this.appoint.adjustType = '';
        this.appoint.dialPhone = '';
        this.appoint.dialName = '';
        this.appoint.remark = '';
        this.appoint.adjustTime = '';
        this.appoint.adjustCertificate = '';
        this.resetForm("appointRef");
        this.appointOpen=true;
        this.getCaseUser()
    },
    changeAdjustType(val){
        if(val=="1"){
           this.isAdjustTime=false
        }else{
            this.isAdjustTime=true
        }
    },
    handleRemove(file, fileList) {
      this.fileList2 = fileList;
      if(this.fileList2.length != 0){
        this.appoint.adjustCertificate = this.fileList2[0].url;
      }
    },
    handleFileSuccess(data) {
      this.fileList2.push({name:data.name, url:data.url});
      if(this.fileList2.length != 0){
        this.appoint.adjustCertificate = this.fileList2[0].url;
      }
    },
    submitForm(formName){
      console.log(this.appoint)
       this.$refs[formName].validate((valid) => {
          if (valid) {
             this.appoint.caseId=this.userDataRow.caseId;
             addCaseAdjustRecord(this.appoint).then(response => {
                 if(response.code==200){
                     this.$message({
                         message: '添加调解记录成功',
                         type: 'success'
                     });
                     this.getList(this.queryParams)
                 } else {
                     this.$message({message: response.message});
                 }
                 this.$refs[formName].resetFields();
                 this.appointOpen=false
             });
          } else {
            return false;
          }
        });
    },
    cancel(formName){
       this.$refs[formName].resetFields();
       this.appointOpen=false
    },
    openOppen(){
        var text=document.getElementById('dyCti');
            text.style.marginLeft="-300px";
        var sdkmask=document.getElementById('sdkmask');
            sdkmask.style.left="0";
            this.dialogVisible=true;
            this.callPhone()
    },
    callPhone(){
       DYSDK.call(this.userObj.phone,function(){
         },this.userObj.phone);
    },
    phoneCopy(){
      DYSDK.copy2cti(this.userObj.phone, function(data){

      })
    },
    callEnd(){
        DYSDK.copy2CtiSms(this.userObj.phone, function(data){

        })
    },
    closeCallPop(){
        var text=document.getElementById('dyCti');
        text.style.marginLeft="-2000px";
        var sdkmask=document.getElementById('sdkmask');
        sdkmask.style.left="-4000px";
        this.dialogVisible=false;
    },
    handlePlay(){

    },
    downFile(url){
        let a = document.createElement('a')
          a.href =url
           a.target="_blank"
          a.click();
    },
    changeEvent(obj){
      this.appoint.dialName=obj.relationName;
      this.appoint.dialPhone=obj.relationPhone;
      this.dialPhone1=this.plusXing(this.appoint.dialPhone,3,4)
    },
    keyFill(){
      this.appoint={
        adjustType:'1',
        adjustResult:'7',
        currentCustomerState:'5',
        dialResult:'2',
        remark:'停机，空号，不接，失联'
      }

    }

  }

}
</script>

<style lang="scss" scoped>
.borrowInfo {
    border: 1px solid #dfe6ec;
    border-bottom: 0;
    padding: 0 0 0 0;

  }
.el-col{
  padding:13px 10px;
}
#sdkId{
    text-align: center;
    margin:0 auto;
}
.cardMask{
    width:100%;
    height:100%;
    position: fixed;
     z-index: 900;
     top:0;
     left:0;
    background:rgba(0,0,0,0.7);
}
</style>
