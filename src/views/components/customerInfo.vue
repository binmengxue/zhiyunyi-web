<template>
<div  class="userInfo">
    <el-row :gutter="10" class="userInfo_row">
        <el-col :span="6">
           <UserElRow  label="姓名："  :info="userData.customerName" spanCol="10" />
        </el-col>
        <el-col :span="6">
          <UserElRow  label="身份证号：" v-if="userData.identityNo"  :info="identityNo" spanCol="10" />
        </el-col>
        <el-col :span="6">
          <UserElRow  label="债权方客户编号："  :info="userData.customerId" spanCol="10" />
        </el-col>
        <el-col :span="6">
          <UserElRow  label="手机号：" v-if="userData.phone"  :info="phone" spanCol="10" />
          <!--<el-row type="flex" style="align-items: center;padding-bottom:0;">-->
            <!--<el-col class="span1" :span='6'>手机号：</el-col>-->
            <!--<el-col class="span2" :span='6'  v-if="userData.phone" >{{plusXing(userData.phone,3,4)}}</el-col>-->
            <!--<el-button type="text" @click="openCallPhone(userData.phone)" ><i class="el-icon-phone" style="font-size:20px"></i></el-button>-->
            <!--<el-button type="text"  @click="handleClick(userData.customerName,userData.phone)" ><i class="el-icon-message" style="font-size:20px"></i></el-button>-->
            <!--<el-button type="text" @click="handleNotifyClick(userData.customerName,userData.phon)" ><i class="el-icon-postcard" style="font-size:20px"></i></el-button>-->
          <!--</el-row>-->
        </el-col>
    </el-row>
    <el-row :gutter="10" class="userInfo_row">
        <el-col :span="6">
          <UserElRow  label="逾期天数："  :info="userData.overdueDays" spanCol="10" />
        </el-col>
        <el-col :span="6">
          <UserElRow  label="案件来源："  :info="userData.caseSource" spanCol="10" />
        </el-col>
        <el-col :span="6">
          <UserElRow  label="当前持有人员："  :info="userData.distributionUserName" spanCol="10" />
        </el-col>
        <el-col :span="6">
          <UserElRow  label="当前持有部门："  :info="userData.distributionDeptName" spanCol="10" />
        </el-col>
    </el-row>
    <el-card class="box-card" style="width:800px;text-algin:center;position: fixed;left:50%;margin-left:-400px;top:100px;z-index:4000;height:600px;background:#fff" v-show="dialogVisible">
    <div slot="header" class="clearfix">
         <el-button   @click="callPhone">拨打</el-button>
         <el-button   @click="callEnd">发送短信</el-button>
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
                    style="width:150px"
                    @change="changeEvent"
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
                    @change="changeNotifyEvent"
                    clearable
                    size="small"
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
</div>
</template>
<script>
import UserElRow from "@/components/UserElRow"
import {getNotificationArr,getResolveCaseInfo} from "@/api/case/index";
import {getStore,setStore} from '@/utils/mUtils.js'
import {getcaseSource} from '@/utils/statusInfo'
export default {
  name: "userInfo",
  data() {
    return {
      userObj:'',
      caseSourceList:'',
      dialogVisible: false,
      iphone:"",
      noteOpen:false,
      custrName:'',
      isMore:false,
      isMoreIcon:'el-icon-arrow-down',
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
      nowTime: ""
    }
  },

  props:['userData'],
  computed: {
    // 计算属性的 getter
    identityNo: function () {
      // `this` 指向 vm 实例
      return this.plusXing(this.userData.identityNo,3,4)
    },
    phone: function () {
      // `this` 指向 vm 实例
      return this.plusXing(this.userData.phone,3,4)
    },
    payDate: function () {
      return this.userData.payDate ? this.userData.payDate.substr(0,10) : '';
    },
    entrustStartTime: function () {
      return this.userData.entrustStartTime ? this.userData.entrustStartTime.substr(0,10) : '';
    },
    entrustEndTime: function () {
      return this.userData.entrustEndTime ? this.userData.entrustEndTime.substr(0,10) : '';
    }
  },
  async created() {
    this.caseSourceList = await getcaseSource();
    let result=await getNotificationArr();
    this.notifyModle=result.data;
  },
 mounted(){

  },
  components: {UserElRow},
  methods: {
    plusXing(str,frontLen,endLen) {
      let strNew='';
      if((typeof str)==Number){
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
    openCallPhone(val){
      var text=document.getElementById('dyCti');
          text.style.marginLeft="-300px";
      var sdkmask=document.getElementById('sdkmask');
          sdkmask.style.left="0";
          this.dialogVisible=true;
          this.iphone=val;
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
    callEnd(){
        DYSDK.copy2CtiSms(this.iphone, function(data){
       })
    },
    closeCallPop(){
        var text=document.getElementById('dyCti');
        text.style.marginLeft="-2000px";
        var sdkmask=document.getElementById('sdkmask');
        sdkmask.style.left="-4000px";
        this.dialogVisible=false;
    },
    handleClick(name,iphone){
      this.custrName=name;
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
    handleNotifyClick(name,iphone){
      this.custrName=name;
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
    handleMore(){
        this.isMore=!this.isMore;
        if(this.isMore){
            this.isMoreIcon="el-icon-arrow-up"
        }else{
          this.isMoreIcon="el-icon-arrow-down"
        }

    }
  }
}
</script>

<style lang="scss" scoped>
.userInfo{
  font-size: 14px;
  background: #f7f7f7;

  .userInfo_row{
    border-bottom:1px solid #e6e6e6;
    padding:0px 20px;
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

}

</style>
