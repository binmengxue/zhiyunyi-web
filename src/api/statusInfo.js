import request from '@/utils/request'
//案件管理-案件-开始
// 案件状态
export const casestatus= () => {
  return request({
    url: '/system/dict/data/dictType/case_info_status',
    method: 'get'
  })
}
//获取客户标签
export const caseUserLabels= () => {
  return request({
    url: '/system/dict/data/dictType/case_user_labels',
    method: 'get'
  })
}
//获取案件来源

export const caseSource= () => {
  return request({
    url: '/caseInfo/channel/getCaseChannel',
    method: 'get'
  })
}
//获取还款结果
export const repayResult= () => {
  return request({
    url: '/system/dict/data/dictType/case_info_repay_result',
    method: 'get'
  })
}
//获取拨号结果
export const dialResult= () => {
  return request({
    url: '/system/dict/data/dictType/case_adjust_record_dial_result',
    method: 'get'
  })
}
//获取拨号结果
export const adjustType= () => {
  return request({
    url: '/system/dict/data/dictType/case_adjust_record_adjust_type',
    method: 'get'
  })
}
//获取调解结果
export const adjustResult= () => {
  return request({
    url: '/system/dict/data/dictType/case_adjust_record_adjust_result',
    method: 'get'
  })
}


//获取系统参数--下载模板
export function getconfigKey(configKey) {
  return request({
    url: '/system/config/configKey/'+ configKey,
    method: 'get',
  })
}
// 调解记录-案件状态
export const collectioncasestatus= () => {
  return request({
    url: '/system/dict/data/dictType/case_collection_record_dial_status',
    method: 'get'
  })
}
// 调解记录-拨打关系
export const dialRelation= () => {
  return request({
    url: '/system/dict/data/dictType/case_adjust_record_dial_relation',
    method: 'get'
  })
}
// 调解记录-债务人跟进状态
export const currentCustomerState= () => {
  return request({
    url: '/system/dict/data/dictType/case_follow_up_status',
    method: 'get'
  })
}
// 电话类型
export const phoneType= () => {
  return request({
    url: '/system/dict/data/dictType/cas_dianhualeixing',
    method: 'get'
  })
}
// 地址类型
export const addressType= () => {
  return request({
    url: '/system/dict/data/dictType/cas_dizhileixing',
    method: 'get'
  })
}

// 分案记录-类型
export const distributionLogType= () => {
  return request({
    url: '/system/dict/data/dictType/case_distribution_log_type',
    method: 'get'
  })
}

// 分案记录-类型
export const repayType= () => {
  return request({
    url: '/system/dict/data/dictType/case_repay_type',
    method: 'get'
  })
}

// 案件附件-显示附件类型使用
export const caseAttachmentFrontConfig= () => {
  return request({
    url: '/system/dict/data/dictType/case_attachment_front_config',
    method: 'get'
  })
}
//留案审核状态
export const caseStayApplyStatus= () => {
  return request({
    url: '/system/dict/data/dictType/case_stay_apply_status',
    method: 'get'
  })
}
//还款审核状态
export const caseRepayApplystatuss= () => {
  return request({
    url: '/system/dict/data/dictType/case_repay_apply_status',
    method: 'get'
  })
}
//减免审核状态
export const caseReductionApplyStatus= () => {
  return request({
    url: '/system/dict/data/dictType/case_reduction_apply_status',
    method: 'get'
  })
}
//借款状态
export const caseBorrowStatus= () => {
  return request({
    url: '/system/dict/data/dictType/cas_task_code_status',
    method: 'get'
  })
}
//是否支持划扣
export const supportDeduction= () => {
  return request({
    url: '/system/dict/data/dictType/case_info_support_deduction',
    method: 'get'
  })
}
//债权方-状态
export const channelStatus= () => {
  return request({
    url: '/system/dict/data/dictType/case_channel_status',
    method: 'get'
  })
}

//债权方-状态
export const exportLogStatus= () => {
  return request({
    url: '/system/dict/data/dictType/export_log_status',
    method: 'get'
  })
}

//呼叫结果
export const callLogRecordOutcome= () => {
  return request({
    url: '/system/dict/data/dictType/call_log_record_outcome',
    method: 'get'
  })
}

//呼叫结果
export const callLogRecordType= () => {
  return request({
    url: '/system/dict/data/dictType/call_log_record_type',
    method: 'get'
  })
}









