import {
    casestatus,
    caseSource,
    getconfigKey,
    collectioncasestatus,
    dialRelation,
    currentCustomerState,
    phoneType,
    addressType,
    repayResult,
    adjustType,
    adjustResult,
    caseUserLabels,
    distributionLogType,
    caseAttachmentFrontConfig,
    repayType,
    dialResult,
    caseStayApplyStatus,
    caseReductionApplyStatus,
    caseRepayApplystatuss,
    caseBorrowStatus,
    supportDeduction,
    exportLogStatus,
    callLogRecordOutcome,
    callLogRecordType,
    channelStatus

} from '@/api/statusInfo.js';
import { Message} from 'element-ui';

//获取前端附件类型使用
export   function getCaseAttachmentFrontConfig(){
    return  new Promise(function(resolve, reject) {
                caseAttachmentFrontConfig()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}

//获取还款类型
export   function getRepayType(){
    return  new Promise(function(resolve, reject) {
                repayType()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}
//获取客户标签
export   function getdDistributionLogType(){
    return  new Promise(function(resolve, reject) {
                distributionLogType()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}
//获取客户标签
export   function getDialRelation(){
    return  new Promise(function(resolve, reject) {
                dialRelation()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}

//获取客户标签
export   function getcaseUserLabels(){
    return  new Promise(function(resolve, reject) {
                caseUserLabels()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}
//获取调解结果
export   function getadjustResult(){
    return  new Promise(function(resolve, reject) {
                adjustResult()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}
//获取拨号结果
export   function getdialResult(){
    return  new Promise(function(resolve, reject) {
                dialResult()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}
//获取拨号结果
export   function getadjustType(){
    return  new Promise(function(resolve, reject) {
                adjustType()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}
//获取案件状态
export   function getcasestatus(){
    return  new Promise(function(resolve, reject) {
                casestatus()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}
//获取还款结果
export   function getRepayResult(){
    return  new Promise(function(resolve, reject) {
                repayResult()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}
//获取案件来源
export   function getcaseSource(){
    return  new Promise(function(resolve, reject) {
                caseSource()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}
//调解记录-案件状态
export   function getcollectioncasestatus(){
    return  new Promise(function(resolve, reject) {
                collectioncasestatus()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}
// 调解记录-拨打关系
export   function getdialRelation(){
    return  new Promise(function(resolve, reject) {
                dialRelation()
                .then(res=>{
                    if(res.code==200){
                        resolve(res.data);
                    }
                })
                .catch(error=>{
                    Message.error("请求失败："+error.msg)
                })
            });
}
// 调解记录-债务人跟进状态
export   function getCurrentCustomerState() {
  return  new Promise(function(resolve, reject) {
    currentCustomerState()
      .then(res=>{
        if(res.code==200){
          resolve(res.data);
        }
      })
      .catch(error=>{
        Message.error("请求失败："+error.msg)
      })
  });
}
// 电话类型
export   function getPhoneType() {
  return new Promise(function (resolve, reject) {
    phoneType()
      .then(res=>{
        if(res.code==200){
          resolve(res.data);
        }
      })
      .catch(error=>{
        Message.error("请求失败："+error.msg)
      })
  });
}
// 地址类型
export   function getAddressType() {
  return new Promise(function (resolve, reject) {
    addressType()
      .then(res=>{
        if(res.code==200){
          resolve(res.data);
        }
      })
      .catch(error=>{
        Message.error("请求失败："+error.msg)
      })
  });
}

//获取系统参数
 export   function getconfig(configKey){
     return  new Promise(function(resolve, reject) {
                    getconfigKey(configKey)
                    .then(res=>{
                        if(res.code==200){
                            resolve(res.data);
                        }
                    })
                    .catch(error=>{
                        Message.error("请求失败："+error.msg)
                    })
            });
}
//留案申请状态
export   function getcaseStayApplyStatus(){
    return  new Promise(function(resolve, reject) {
                    caseStayApplyStatus()
                   .then(res=>{
                       if(res.code==200){
                           resolve(res.data);
                       }
                   })
                   .catch(error=>{
                       Message.error("请求失败："+error.msg)
                   })
           });
}
//还款审核状态
export   function getcaseRepayApplystatuss(){
    return  new Promise(function(resolve, reject) {
                   caseRepayApplystatuss()
                   .then(res=>{
                       if(res.code==200){
                           resolve(res.data);
                       }
                   })
                   .catch(error=>{
                       Message.error("请求失败："+error.msg)
                   })
           });
}
//减免审核状态
export   function getcaseReductionApplyStatus(){
    return  new Promise(function(resolve, reject) {
                   caseReductionApplyStatus()
                   .then(res=>{
                       if(res.code==200){
                           resolve(res.data);
                       }
                   })
                   .catch(error=>{
                       Message.error("请求失败："+error.msg)
                   })
           });
}
//借款状态
export  function  getCaseBorrowStatus() {
  return  new Promise(function(resolve, reject) {
    caseBorrowStatus()
      .then(res=>{
        if(res.code==200){
          resolve(res.data);
        }
      })
      .catch(error=>{
        Message.error("请求失败："+error.msg)
      })
  });
}
//是否支持划扣
export   function getsupportDeduction(){
    return  new Promise(function(resolve, reject) {
                    supportDeduction()
                   .then(res=>{
                       if(res.code==200){
                           resolve(res.data);
                       }
                   })
                   .catch(error=>{
                       Message.error("请求失败："+error.msg)
                   })
           });
}
//是否支持划扣
export   function getchannelStatus(){
    return  new Promise(function(resolve, reject) {
                    channelStatus()
                   .then(res=>{
                       if(res.code==200){
                           resolve(res.data);
                       }
                   })
                   .catch(error=>{
                       Message.error("请求失败："+error.msg)
                   })
           });
}

//数据导出状态
export   function getExportLogStatus(){
    return  new Promise(function(resolve, reject) {
                exportLogStatus()
                   .then(res=>{
                       if(res.code==200){
                           resolve(res.data);
                       }
                   })
                   .catch(error=>{
                       Message.error("请求失败："+error.msg)
                   })
           });
}

//呼叫结果
export   function getCallLogRecordOutcome(){
    return  new Promise(function(resolve, reject) {
        callLogRecordOutcome()
                   .then(res=>{
                       if(res.code==200){
                           resolve(res.data);
                       }
                   })
                   .catch(error=>{
                       Message.error("请求失败："+error.msg)
                   })
           });
}
//外呼类型
export   function getCallLogRecordType(){
    return  new Promise(function(resolve, reject) {
        callLogRecordType()
                   .then(res=>{
                       if(res.code==200){
                           resolve(res.data);
                       }
                   })
                   .catch(error=>{
                       Message.error("请求失败："+error.msg)
                   })
           });
}
