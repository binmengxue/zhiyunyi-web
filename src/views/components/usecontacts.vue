<template>
<div>
  <el-button type="success"  size="mini" v-show="isString('ajxq_cylxr_tjlxr')"  @click="handleAdd">添加联系人</el-button>
  <div class="borrowInfo">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column align="center" label="操作" width="350">
          <template slot-scope="scope">
              <el-button  icon="el-icon-phone-outline" @click="openCallPhone(scope.row)" v-show="isString('ajxq_cylxr_dh')" type="text" size="small">电话</el-button>
              <el-button  icon="el-icon-message" @click="handleClick(scope.row)" v-show="isString('ajxq_cylxr_dh')" type="text" size="small">短信</el-button>
              <el-button  icon="el-icon-bell" @click="handleNotifyClick(scope.row)" v-show="isString('ajxq_cylxr_gz')"  type="text" size="small">告知</el-button>
              <el-button  icon="el-icon-edit" v-if="scope.row.createId!=0 && isString('ajxq_cylxr_bj')"   @click="handleRedact(scope.row)" type="text" size="small">编辑</el-button>
              <el-button  icon="el-icon-delete" v-if="scope.row.createId!=0 && isString('ajxq_cylxr_sc')"  @click="handleRemove(scope.row)" type="text" size="small">删除</el-button>
          </template>
      </el-table-column>
      <el-table-column
        prop="relationName"
        label="姓名"
        width="160">
      </el-table-column>
      <el-table-column
        prop="relation"
        label="关系"
        width="120">
        <template slot-scope="scope">
          {{getDictLabelByValue(scope.row.relation,dialRelationList)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="relationPhone"
        width="160"
        label="电话">
            <template slot-scope="scope">
                {{scope.row.relationPhone?plusXing(scope.row.relationPhone,3,4):''}}
            </template>
      </el-table-column>
      <el-table-column
        prop="relationAddress"
        label="联系地址"
        width="260">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.relationAddress" placement="bottom">
                <el-button  type="text" >{{scope.row.relationAddress && scope.row.relationAddress.length>10?scope.row.relationAddress.substring(0, 10) + "...":scope.row.relationAddress}}</el-button>
              </el-tooltip>
          </template>
      </el-table-column>
      <el-table-column
        prop="relationAddressType"
        label="地址类型"
        width="120">
        <template slot-scope="scope">
          {{getDictLabelByValue(scope.row.relationAddressType,addressTypeList)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="录入时间"
        width="160">
        <template slot-scope="scope">
          {{scope.row.createTime?scope.row.createTime:''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="120">
      </el-table-column>
      <el-table-column
        prop="createId"
        label="创建用户编号">
        <template slot-scope="scope">
          {{scope.row.createId==0? '系统导入' : scope.row.createId}}
        </template>
      </el-table-column>
    </el-table>
    <el-card class="box-card" style="width:800px;text-algin:center;position: fixed;left:50%;margin-left:-400px;top:100px;z-index:4000;height:600px;background:#fff" v-show="dialogVisible">
      <div slot="header" class="clearfix">
          <el-button   @click="callPhone">拨打</el-button>
          <el-button style="float: right;margin-left:20px;" type="text" @click="closeCallPop">关闭</el-button>
      </div>
      <div id="sdkId" ref="sdkRef" style=""></div>
    </el-card>
    <el-dialog title="选择发送短信" :visible.sync="noteOpen" width="600px" append-to-body>
          <el-form ref="noteRef" :model="noteFrom"  label-width="80px">
              <el-form-item label="债务人">
                  <div>{{custrName}}</div>
              </el-form-item>
              <el-form-item label="模板名称">
                  <el-select
                      v-model="noteFrom.noteModle"
                      placeholder="请选择"
                      clearable
                      size="small"
                      @change="changeEvent"
                      style="width:150px"
                  >
                      <el-option
                          v-for="dict in noteModle"
                          :key="dict.title"
                          :label="dict.title"
                          :value="dict.dec"
                      />
                  </el-select>
              </el-form-item>
              <el-form-item label="模板内容">
                <div>{{noteValue}}</div>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="notesubmit">确 定</el-button>
              <el-button @click="notecancel">取 消</el-button>
          </div>
    </el-dialog>
    <el-dialog title="选择告知函模板" :visible.sync="notifyOpen" width="600px" append-to-body>
          <el-form ref="notifyRef" :model="notifyFrom"  label-width="80px">
              <el-form-item label="债务人">
                  <div>{{custrName}}</div>
              </el-form-item>
              <el-form-item label="模板名称">
                  <el-select
                      v-model="notifyFrom.notifyModle"
                      placeholder="请选择"
                      clearable
                      size="small"
                      @change="changeNotifyEvent"
                      style="width:150px"
                  >
                      <el-option
                          v-for="dict in notifyModle"
                          :key="dict.id"
                          :label="dict.templateName"
                          :value="dict.id"
                      />
                  </el-select>
              </el-form-item>
              <el-form-item label="模板内容">
                  <div id="pdfCentent" v-html="notifyFrom.contentHtml" ></div>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="notifysubmit">导出PDF</el-button>
              <el-button @click="notifycancel">取 消</el-button>
          </div>
    </el-dialog>
    <!-- 编辑弹出层 -->
    <el-dialog title="联系人" :visible.sync="redactOpen" width="600px" append-to-body>
      <el-form ref="redactRef" :model="redactForm" :rules="rules" label-width="100px">
        <div class="el-formDiv">
          <el-form-item label="姓名" prop="relationName">
            <el-input
              v-model="redactForm.relationName"
              clearable
              size="small"
              style="width:250px"
            />
          </el-form-item>
          <el-form-item label="关系" >
            <el-select
              v-model="redactForm.relation"
              placeholder="请选择"
              clearable
              size="small"
              style="width:250px"
            >
              <el-option
                v-for="dict in dialRelationList"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop="relationPhone">
            <el-input
              v-model="redactForm.relationPhone"
              clearable
              size="small"
              style="width:250px"
            />
          </el-form-item>
          <el-form-item label="电话类型">
            <el-select
              v-model="redactForm.relationPhoneType"
              placeholder="请选择"
              clearable
              size="small"
              style="width:250px"
            >
              <el-option
                v-for="dict in phoneTypeList"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="地址类型">
            <el-select
              v-model="redactForm.relationAddressType"
              placeholder="请选择"
              clearable
              size="small"
              style="width:250px"
            >
              <el-option
                v-for="dict in addressTypeList"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="单位名称">
            <el-input
              v-model="redactForm.relationCompany"
              clearable
              size="small"
              style="width:250px"
            />
          </el-form-item>
          <el-form-item label="联系地址">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入"
              style="width:250px;"
              v-model="redactForm.relationAddress">
            </el-input>
          </el-form-item>
          <el-form-item label="添加备注">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="redactForm.remark">
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="redactSubmit('redactRef')">确 定</el-button>
        <el-button @click="redactCancel('redactRef')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import {getCaseUserContactsList,getNotificationArr,getResolveCaseInfo,addUseContact,editUseContact,deleteUseContact} from "@/api/case/index";
import {getdialRelation, getPhoneType, getAddressType} from "@/utils/statusInfo";
import {getStore,setStore} from '@/utils/mUtils.js'
export default {
  name: "usecontacts",
  data() {
       return {
          tableData: [],
          queryParam: {caseId: null},
          dialogVisible: false,
          iphone:null,
          noteOpen:false,
          custrName:'',
          noteFrom:{
             noteModle:''
          },
          noteModle:[
            {title:'催收1',dec:'各位借款人，“XXX”网贷平台涉嫌非法吸收公众存款已于2020年1月1日由杭州市公安局西湖区分局立案侦查，你通过“达飞云贷”办理的借款资金来自“玛瑙湾”平台，现还款通道已变更，请及时添加XX市公安局西湖区分局的微信小程序“智云易投信通”还款。如果对“智云易投信通”有任何疑问，可在工作时间拨打XX公安电话XXXXX咨询。公安机关将依法打击恶意逃废债行为，必要时将采取冻结查封借款人银行账户、支付宝账户及名下其它资产等措施。请各位借款人慎重考虑逃废债成本，依法依约进行还款'},
            {title:'催收2',dec:'智云易投信通”还款流程如下：1、登录微信搜索“智云易投信通”；2、进入小程序首页，点击画面中间的“还款通道”；3、进入登录页面，输入身份证+手机号码+短信验证码登录；4、进入“我的借款页面”，选择要还款的案件，点击立即还款；5、在“收银台”界面选择还款期数，点击“前往转账”6、自行复制还款专户信息，打开网银或支付宝完成转账操作；7、转账完成后点击“我已完成打款”，上传还款凭证，等待审核通过后入账。咨询还款问题可关注公众号“XXXX”或致电XXXX'},
            {title:'催收3',dec:'严正提醒各位借款人，你在达飞云贷借款已严重逾期将被列入上报征信名单，请立即添加XXX公安局西湖区分局的微信小程序“智云易投信通”首页“还款通道”还款。公安机关将依法打击恶意逃废债行为，必要时将采取冻结查封借款人银行账户、支付宝账户及名下其它资产等措施。请各位借款人慎重考虑逃废债成本，依法依约进行还款。具体还款问题咨询可关注公众号“XXXX”或致电XXXX'},
            {title:'催收4',dec:'严正提醒各位借款人，你在达飞云贷的借款已严重逾期将被列入上报征信和冻结名单，请立即添加杭州市公安局西湖区分局的微信小程序“智云易投信通”首页“还款通道”还款。任何妄图逃避债务的侥幸心理都是不可取的，公安机关将依法打击恶意逃废债行为。具体还款问题咨询可关注公众号“XXXX”或致电XXXX'},
            {title:'逃废债短信1',dec:'借款人你好，“玛瑙湾”网贷平台涉嫌非法吸收公众存款已于2020年1月1日由XX市公安局西湖区分局立案侦查，你通过“达飞云贷”APP办理的借款资金均来自“XXX”平台，现还款通道已变更，请及时添加XX市公安局西湖区分局的微信小程序“智云易投信通”还款。公、检、法机关将依法严厉打击恶意逃废债行为'},
            {title:'逃废债短信2',dec:'借款人，你在达飞云贷平台申请的贷款严重逾期，现已纳入西湖公安数据库，请登录西湖公安微信小程序“西湖投信通”查询逾期信息并还款。具有还款能力而拒不还款的恶意逃废债行为将被列入失信联合惩戒对象名单，信用管理部门将失信信息纳入人行征信系统，同时不排除采取冻结支付宝以及银行账户等措施。具体还款问题咨询可关注公众号“XXXX”或致电XXXX'},
            {title:'逃废债金额短信',dec:'借款人，你在达飞云贷平台的待还款金额为，目前已严重逾期，现已纳入西湖公安数据库，请登录西湖公安微信小程序“智云易投信通”-“还款通道”查询逾期信息并还款。具有还款能力而拒不还款的恶意逃废债行为将被列入失信联合惩戒对象名单，信用管理部门将失信信息纳入人行征信系统，同时不排除采取冻结支付宝以及银行账户等措施。具体还款问题咨询可关注公众号“XXXX”或致电XXXX'}
          ],
          noteValue:'',//选中的模板
          notifyOpen:false,
          notifyFrom:{
              notifyModle:'',
              contentHtml:''
          },
          notifyModle:[],
          htmlTitle: "PDF名称",
          nowTime: "",
          redactOpen:false,
          redactForm:{
            id:'',
            caseId:'',
            relationName:'',
            relation:'',
            relationPhone:'',
            relationCompany:'',
            relationPhoneType:'',
            relationAddressType:'',
            relationAddress:'',
            remark:''
          },
         rules:{
            relationName: [
              { required: true, message: '请输入联系人姓名', trigger: 'blur' }
            ],
            relationPhone: [
              { required: true, message: '请输入联系人电话', trigger: 'blur' }
            ]
          },
          repayTypeList:[],
         dialRelationList:[],
         phoneTypeList:[],
         addressTypeList:[]
      }
  },
  mounted(){

  },
  props:['userDataRow'],
  async created() {
    this.dialRelationList= await getdialRelation();
    this.phoneTypeList= await getPhoneType();
    this.addressTypeList= await getAddressType();
    this.getList();
    let result=await getNotificationArr();
    this.notifyModle=result.data;
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
      this.queryParam.caseId = this.userDataRow.caseId
      getCaseUserContactsList(this.queryParam).then(response => {
          if(response.code == 200) {
            this.tableData = response.data
          }
      });
    },
    getDictLabelByValue(value,arys){
      if(value === "" || value ==null){
        return "";
      }
      if(isNaN(value)){
        return value;
      }
      let fileAry=arys;
      for(var i=0,n=fileAry.length;i<n;i++){
        if(Number(fileAry[i].dictValue) === Number(value)){
          return fileAry[i].dictLabel;
        }
      }
    },
    openCallPhone(data){
      var text=document.getElementById('dyCti');
          text.style.marginLeft="-300px";
      var sdkmask=document.getElementById('sdkmask');
          sdkmask.style.left="0";
          this.dialogVisible=true;
         this.iphone=data.relationPhone
         this.callPhone()

    },
    callPhone(){
       DYSDK.call(this.iphone,function(){
      },this.iphone);

    },
    phoneCopy(){
      DYSDK.copy2cti(this.iphone, function(data){
         console.log(data)
      })
    },
    closeCallPop(){
        var text=document.getElementById('dyCti');
        text.style.marginLeft="-2000px";
        var sdkmask=document.getElementById('sdkmask');
        sdkmask.style.left="-4000px";
        this.dialogVisible=false;
    },
    handleClick(obj){
      this.custrName=obj.relationName;
      this.noteOpen=true
    },
    changeEvent(val){
      this.noteValue=val;
    },
    notesubmit(){
        this.noteOpen=false
    },
    notecancel(){
      this.noteOpen=false
    },
    handleNotifyClick(obj){
      this.custrName=obj.relationName;
      this.notifyOpen=true
    },
    async changeNotifyEvent(val){
      //this.notifyFrom.contentHtml=val;
      const data={
        templateId:val,
        caseId:this.$route.params.caseId
      }
      let result=await getResolveCaseInfo(data);
      if(result.code==200){
          this.notifyFrom.contentHtml=result.msg
      }
    },
    notifysubmit(){
        this.ExportSavePdf(this.htmlTitle,this.nowTime);
        this.notifyOpen=false
    },
    notifycancel(){
      this.notifyOpen=false
    },
    handleRedact(data){
      this.resetForm("redactRef");
      this.redactForm.id = data.id;
      this.redactForm.caseId = data.caseId;
      this.redactForm.relationName = data.relationName;
      this.redactForm.relation = data.relation;
      this.redactForm.relationPhone = data.relationPhone;
      this.redactForm.relationPhoneType = data.relationPhoneType;
      this.redactForm.relationAddressType = data.relationAddressType;
      this.redactForm.relationCompany = data.relationCompany;
      this.redactForm.relationAddress = data.relationAddress;
      this.redactForm.remark = data.remark;
      this.redactOpen=true
    },
    redactSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.redactForm.caseId=this.userDataRow.caseId;

          if(this.redactForm.id === '') {
            addUseContact(this.redactForm).then(response => {
                if (response.code == 200) {
                  this.$message({
                    message: '添加联系人成功',
                    type: 'success'
                  });
                  this.getList()
                } else {
                  this.$message({message: response.message});
                }
                this.$refs[formName].resetFields();
                this.redactOpen = false
              }
            );
          } else {
            editUseContact(this.redactForm).then(response => {
                if (response.code == 200) {
                  this.$message({
                    message: '修改联系人成功',
                    type: 'success'
                  });
                  this.getList()
                } else {
                  this.$message({message: response.message});
                }
                this.$refs[formName].resetFields();
                this.redactOpen = false
              }
            );
          }

        } else {

          return false;
        }
      });

    },
    redactCancel(formName){
      this.$refs[formName].resetFields();
      this.redactOpen=false
    },
    handleAdd(){
      this.resetForm("redactRef");
      this.redactForm.id = '';
      this.redactForm.caseId = '';
      this.redactForm.relationName = '';
      this.redactForm.relation = '';
      this.redactForm.relationPhone = '';
      this.redactForm.relationPhoneType = '';
      this.redactForm.relationAddressType = '';
      this.redactForm.relationCompany = '';
      this.redactForm.relationAddress = '';
      this.redactForm.remark = '';
      this.redactOpen=true
    },
    handleRemove(data){
      this.$confirm("此操作会删除该联系人，是否确定？", "联系人操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteUseContact(data.id).then(response => {
            if (response.code == 200) {
              this.$message({
                message: '删除联系人成功',
                type: 'success'
              });
              this.getList()
            } else {
              this.$message({message: response.message});
            }
          }
        );
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

  }

}
</script>

<style lang="scss" scoped>
.borrowInfo{
   margin:10px 0px;
  border:1px solid #dfe6ec;
  border-bottom:0;
  padding:0 0 0 0;
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
