<template>
<div>
  <el-dialog
 >
   <el-card class="box-card" style="width:800px;text-algin:center;position: fixed;left:50%;margin-left:-400px;top:200px;z-index:1000" v-show="dialogVisible">
    <div slot="header" class="clearfix">
        
         <el-button   @click="callPhone">拨打</el-button>
         <el-button   @click="callEnd">发送短信</el-button>
         <el-button style="float: right;margin-left:20px;" type="text" @click="closeCallPop">关闭</el-button>
    </div>
    <div id="sdkId" ref="sdkRef" style=""></div>
   
  </el-card>
    <div class="cardMask" v-show="dialogVisible">
    </div>
  </el-dialog>
    </div>
</template>

<script>
import {getStore} from '@/utils/mUtils.js'
export default {
  data() {
    return {
      dialogVisible:true,
    }
  },
  computed: {
  },
  watch: {
    
  },
  mounted(){
      this.appendSYSDKDOM()
  },
  methods: {
        openOppen(){
            this.dialogVisible=true;
        },
        appendSYSDKDOM(){
              
                var oScript=document.createElement("script");
                oScript.type="text/javascript";
                oScript.id = "dySdkScript";
                oScript.src="https://cti.duyansoft.com/syui/dysdk/dysdk2.min.js";
                oScript.setAttribute("width","700");
                oScript.setAttribute("height","500");
                var sdkId=document.getElementById("sdkId")
                    sdkId.innerHTML=""
                sdkId.appendChild(oScript);
                oScript.onload=function() {
                        DYSDK.init();//调用然后嵌入的页面同时相应
                        DYSDK.ctiLogined(function(data){
                            setStore("accountId",data.accountId)
                        })
                        // 接通电话的回调函数，返回电话号码等信息
                        DYSDK.callConfirm(function(data){
                           
                        });

                        // 拨打电话失败的回调函数，返回电话号码等信息
                        DYSDK.callFail(function(data){
                          
                        });
                        DYSDK.callBridge(function(data){
                             
                        })
                }  
        },
        callPhone(){
            if(!getStore('accountId')){
                this.$message('先登录账号');
                return
            }
              DYSDK.call(this.userDataRow.phoneNo,function(){
              },this.userDataRow.phoneNo);  
            // DYSDK.copy2cti(this.userData.phoneNo,function(){

            // })
                    
        },
        callEnd(){
            DYSDK.copy2CtiSms(this.userDataRow.phoneNo, function(data){
                    
            })
            
        },
        closeCallPop(){
            this.dialogVisible=false
        }
  }
}
</script>

<style>
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
