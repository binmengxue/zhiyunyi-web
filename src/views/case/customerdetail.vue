<template>
  <div style="padding:0 10px;">
      <el-card class="box-card" style="margin-top:20px;" shadow="never">
        <div slot="header" class="clearfix">
          <el-button style=" float:left" type="text"  @click="addTag"><span style="float:left;margin-right:15px;color:black">客户标签</span>添加标签</el-button>
          <!--<el-button style=" float:right" type="text"  @click="nextCase">下一个</el-button>-->
          <!--<el-button style=" float:right" type="text"  @click="preCase">上一个</el-button>-->
        </div>
        <div  class="text item">
         <span style="margin-right:20px;color:black" v-for="(caseUserLabel,index) in caseUserLabelsList" :key="index"><el-tag>{{getDictLabelByValue(caseUserLabel.label, caseUserSelectLables)}}</el-tag></span>
        </div>
      </el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="userInfo">
          <CustomerInfo  :userData="userObj" />
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="activeName2" @tab-click="handleClick2">
        <el-tab-pane label="附件信息" name="attachment">
           <el-container style="flex-direction: column;">
             <el-header v-if="customerPhotoList.length>0" height="10px">客户照片</el-header>
             <el-main v-if="customerPhotoList.length>0">
               <div class="block">
                  <span class="demonstration" v-for="(item,index) in customerPhotoList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="item.downloadUrl"></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9" :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="identityAttachmentList.length>0" height="10px">身份证</el-header>
             <el-main v-if="identityAttachmentList.length>0">
               <div class="block">
                  <span class="demonstration" v-for="(identity,index) in identityAttachmentList" :key="index" >
                       <pdf  v-if="identity.downloadUrl && identity.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="identity.downloadUrl" ></pdf>
                       <el-image v-else-if="identity.downloadUrl && identity.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9" :src="identity.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="bankAttachmentList.length>0" height="10px">银行卡</el-header>
             <el-main v-if="bankAttachmentList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(bank,index) in bankAttachmentList" :key="index" >
                       <pdf  v-if="bank.downloadUrl && bank.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="bank.downloadUrl" ></pdf>
                       <el-image v-else-if="bank.downloadUrl && bank.downloadUrl.indexOf('pdf')==-1" s style="width: 400px; height:auto;border:10px solid #eae9e9" :src="bank.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="businessLincensList.length>0" height="10px">营业执照——债务人</el-header>
             <el-main v-if="businessLincensList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in businessLincensList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" s style="width: 400px; height:auto;border:10px solid #eae9e9" :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="workList.length>0" height="10px">工作证明</el-header>
             <el-main v-if="workList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in workList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" s style="width: 400px; height:auto;border:10px solid #eae9e9" :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="creditReportList.length>0" height="10px">征信报告</el-header>
             <el-main v-if="creditReportList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in creditReportList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" s style="width: 400px; height:auto;border:10px solid #eae9e9" :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="borrowApplyList.length>0" height="10px">出借申请表</el-header>
             <el-main v-if="borrowApplyList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in borrowApplyList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="item.downloadUrl"></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" s style="width: 400px; height:auto;border:10px solid #eae9e9" :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header  v-if="loadApplyAttachmentList.length>0" height="10px">出借申请表</el-header>
             <el-main  v-if="loadApplyAttachmentList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(loadApply,index) in loadApplyAttachmentList" :key="index" >
                       <pdf  v-if="loadApply.downloadUrl && loadApply.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="loadApply.downloadUrl" ></pdf>
                       <el-image  v-else-if="loadApply.downloadUrl && loadApply.downloadUrl.indexOf('pdf')==-1"   style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="loadApply.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header  v-if="otherAttachmentList.length>0" height="10px">其它</el-header>
             <el-main  v-if="otherAttachmentList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(other,index) in otherAttachmentList" :key="index" >
                       <pdf  v-if="other.downloadUrl && other.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"   :src="other.downloadUrl" ></pdf>
                       <el-image  v-else-if="other.downloadUrl && other.downloadUrl.indexOf('pdf')==-1"   style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="other.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="borrowContractAttachmentList.length>0" height="10px">借款协议</el-header>
             <el-main v-if="borrowContractAttachmentList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(borrowContract,index) in borrowContractAttachmentList" :key="index" >
                       <pdf  v-if="borrowContract.downloadUrl && borrowContract.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="borrowContract.downloadUrl" @click="scaleD"></pdf>
                       <el-image v-else-if="borrowContract.downloadUrl && borrowContract.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="borrowContract.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="borrowContractApplyList.length>0" height="10px">借款咨询服务协议</el-header>
             <el-main v-if="borrowContractApplyList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in borrowContractApplyList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="loadCreditList.length>0" height="10px">放款凭证</el-header>
             <el-main v-if="loadCreditList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in loadCreditList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="withHoldList.length>0" height="10px">代扣协议</el-header>
             <el-main v-if="withHoldList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in withHoldList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl"></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="creditChangeList.length>0" height="10px">债权转让协议</el-header>
             <el-main v-if="creditChangeList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in creditChangeList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl"></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="creditChangeNoticeList.length>0" height="10px">债权转让通知书</el-header>
             <el-main v-if="creditChangeNoticeList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in creditChangeNoticeList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="receiveBorrowList.length>0" height="10px">收款确认函</el-header>
             <el-main v-if="receiveBorrowList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in receiveBorrowList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="compensatoryList.length>0" height="10px">代偿确认函</el-header>
             <el-main v-if="compensatoryList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in compensatoryList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="lenderFlowList.length>0" height="10px">出借人上存流水</el-header>
             <el-main v-if="lenderFlowList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in lenderFlowList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="creditorLincesList.length>0" height="10px">债权方营业执照</el-header>
             <el-main v-if="creditorLincesList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in creditorLincesList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>

             <el-header v-if="businessLincesList.length>0" height="10px">债权方营业执照</el-header>
             <el-main v-if="businessLincesList.length>0">
               <div class="block">
                   <span class="demonstration" v-for="(item,index) in businessLincesList" :key="index" >
                       <pdf  v-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')!=-1" style="width: 40%; height:auto;border:10px solid #eae9e9"    :src="item.downloadUrl" ></pdf>
                       <el-image v-else-if="item.downloadUrl && item.downloadUrl.indexOf('pdf')==-1" style="width: 400px; height:auto;border:10px solid #eae9e9"  :src="item.downloadUrl" fit="contain"></el-image>
                  </span>
               </div>
             </el-main>
          </el-container>

        </el-tab-pane>
      </el-tabs>
      <!-- 添加标签弹出层 -->
    <el-dialog title="添加标签" :visible.sync="tagOpen" width="600px" append-to-body>
      <el-form ref="tagRef"   :model="tagForm" :rules="rules" label-width="100px">
        <div class="el-formDiv">
            <el-form-item label="标签" prop='label'>
                  <el-select
                    v-model="tagForm.label"
                    placeholder="请选择"
                    clearable
                    size="small"
                    style="width:250px"
                  >
                    <el-option
                      v-for="dict in caseUserSelectLables"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    />
                  </el-select>
            </el-form-item>
            <el-form-item label="添加标签原因" prop="labelRemark">
                 <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    style="width:250px;"
                    v-model="tagForm.labelRemark">
                  </el-input>
            </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addTagsubmit('tagRef')">确 定</el-button>
        <el-button @click="addTagcancel('tagRef')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CustomerInfo from "@/views/components/customerInfo" //客户信息
import {getStore,setStore} from '@/utils/mUtils.js'
import {getUser,getUserInfoByCaseId,addCaseUserLabel,getcaseUserLablesList,getCaseAttachmentList,getCaseAttachmentListByCaseId} from "@/api/case/index";
import {getcaseUserLabels,getcaseSource,getCaseAttachmentFrontConfig} from '@/utils/statusInfo'
import {getDictLabelByValue} from '@/utils/ruoyi'
import CallPhone from "@/components/CallPhone"
import { getToken } from "@/utils/auth";
import pdf from 'vue-pdf';
export default {
  name: "Customerdetail",
  data() {
    return {
      activeName:'userInfo',
      activeName2:'attachment',
      iponeNuber:-1,
      caseIdObj:{
        caseId:null
      },
      userObj: {},
      baseUrl: 'http://record.zhiyunyi.net/',
      tagOpen:false,
      tagForm:{



      },
      customerPhotoList: [],
      identityAttachmentList: [],
      bankAttachmentList: [],
      businessLincensList: [],
      workList: [],
      creditReportList: [],
      borrowApplyList: [],
      loadApplyAttachmentList: [],
      otherAttachmentList: [],
      borrowContractAttachmentList: [],
      borrowContractApplyList: [],
      loadCreditList: [],
      withHoldList: [],
      creditChangeList: [],
      creditChangeNoticeList: [],
      receiveBorrowList: [],
      compensatoryList: [],
      lenderFlowList: [],
      creditorLincesList: [],
      businessLincesList:[],
      caseAttachmentFrontConfigList:[],
      caseUserLabelsList:[],
      caseSourceList:[],
      caseUserSelectLables: [],
      rules:{
        label: [
                { required: true, message: "标签不能为空", trigger: "blur" }
              ]
        }

    }
  },
  components: {CustomerInfo,pdf},

  watch: {



  },

  async created() {
    this.caseIdObj.caseId=this.$route.params.caseId;
    //字典数据
    this.caseUserSelectLables = await getcaseUserLabels()
    this.caseSourceList = await getcaseSource()
    this.caseAttachmentFrontConfigList = await getCaseAttachmentFrontConfig()
    this.getUserInfo()
    this.getCaseAttachmentList()
    this.getCaseUserLabels()
    this.$route.meta.title = this.$route.params.customerName
  },
  methods: {
    handleClick(){

    },
    handleClick2(){

    },
    addTag(){
      this.tagOpen=true
    },
    nextCase() {
        const pageData = getStore(this.$store.getters.name);
        const caseExist = false;
        for(var i =0; i< pageData.length; i++) {
           if(pageData[i].caseId == this.caseIdObj.caseId) {
             if(i + 1 == pageData.length) {
                this.$message({
                  duration: 5000,
                  message: '案件列表当前页已到底，请翻页',
                  type: 'error'
                });
               return
             }
             this.$router.replace({
              path: '/casedetail/' + pageData[i + 1].caseId + pageData[i + 1].customerName
            })
            this.$route.meta.title =pageData[i + 1].customerName + "案件详情"
            caseExist = true;
           }
        }
        if(!caseExist) {
           this.$router.replace({
              path: '/casedetail/' + pageData[0].caseId + pageData[0].customerName
            })
            this.$route.meta.title = pageData[0].customerName + "案件详情"
        }
    },
    preCase() {
        const pageData = getStore(this.$store.getters.name);
        const caseExist = false;
        for(var i =0; i< pageData.length; i++) {
           if(pageData[i].caseId == this.caseIdObj.caseId) {
             if(i -1  < 0) {
                this.$message({
                  duration: 5000,
                  message: '案件列表当前页已到第一个，请翻页',
                  type: 'error'
                });
               return
             }
             this.$router.replace({
              path: '/casedetail/' + pageData[i - 1].caseId + pageData[i - 1].customerName
            })
            caseExist = true;
           }
        }
        if(!caseExist) {
           this.$router.replace({
              path: '/casedetail/' + pageData[0].caseId + pageData[0].customerName,
            })
        }
    },
    getImgUrl(url){
      const newUrl='http://record.zhiyunyi.net/'+url;
      return newUrl;
    },
    addTagsubmit(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tagForm.caseId = this.caseIdObj.caseId
          addCaseUserLabel(this.tagForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess("添加成功")
                 this.$refs[formName].resetFields();
                this.tagOpen = false
                this.getCaseUserLabels()
              } else {
                this.msgError(response.msg);
              }
          });
        } else {
          return false;
        }
      });
    },
    addTagcancel(formName){
       this.$refs[formName].resetFields();
      this.tagOpen = false
    },
    getUserInfo() {
      getUserInfoByCaseId(this.caseIdObj).then(response => {
        this.userObj = response.data;
        this.userObj.caseSource = getDictLabelByValue(this.userObj.caseSource, this.caseSourceList);
      });
    },
    showBigImg(obj) {
        location.href = obj.innerHtml;
    },
    getDictLabelByValue(vaule,arys){
        let fileAry=arys;
        for(var i=0,n=fileAry.length;i<n;i++){
            if(Number(fileAry[i].dictValue) === Number(vaule)){
                return fileAry[i].dictLabel;
            }
        }
    },
    getCaseUserLabels() {
      getcaseUserLablesList(this.caseIdObj).then(response => {
        if(response.code == 200) {
          this.caseUserLabelsList = response.data
        }
      })
    },
    getCaseAttachmentList() {
      getCaseAttachmentListByCaseId(this.caseIdObj).then(response => {
        if(response.code == 200) {
          for(var v in response.data) {
            if(v == "1")  {
              this.customerPhotoList = response.data[v]
            } else if(v === "2") {
              this.identityAttachmentList = response.data[v]
            } else if(v == "3") {
              this.bankAttachmentList = response.data[v]
            } else if(v == "4") {
              this.businessLincensList = response.data[v]
            } else if(v == "5") {
              this.workList = response.data[v]
            } else if(v == "6") {
              this.creditReportList = response.data[v]
            } else if(v == "7") {
              this.borrowApplyList = response.data[v]
            } else if(v == "8") {
              this.loadApplyAttachmentList = response.data[v]
            } else if(v == "9") {
              this.otherAttachmentList = response.data[v]
            }else if(v == "10") {
              this.borrowContractAttachmentList = response.data[v]
            }else if(v == "11") {
              this.borrowContractApplyList = response.data[v]
            }else if(v == "12") {
              this.loadCreditList = response.data[v]
            }else if(v == "13") {
              this.withHoldList = response.data[v]
            }else if(v == "14") {
              this.creditChangeList = response.data[v]
            }else if(v == "15") {
              this.creditChangeNoticeList = response.data[v]
            }else if(v == "16") {
              this.receiveBorrowList = response.data[v]
            }else if(v == "17") {
              this.lenderFlowList = response.data[v]
            }else if(v == "18") {
              this.creditorLincesList = response.data[v]
            }else if(v == "19") {
              this.businessLincesList = response.data[v]
            }
          }
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.el-tabs{
  margin-top:15px;
}
 el-header {
    height: 10px;
  }
</style>
