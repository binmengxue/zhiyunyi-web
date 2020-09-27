import request from '@/utils/request'

//案件详情-添加用户标签
export function addCaseUserLabel(data) {
  return request({
    url: '/caseInfo/labels/add',
    method: 'post',
    data: data
  })
}

// 案件详情-查询用户借款信息
export function getBorrowInfoByCaseId(query) {
  return request({
    url: '/caseInfo/borrow/getBorrowInfoByCaseId',
    get: 'get',
    params: query
  })
}
// 查询部门下拉树结构
export function treeselect() {
    return request({
      url: '/system/dept/getDeptTreeByDeptType',
      get: 'get',
    })
}
// 查询当前用户持有部门
export function userTreeselect() {
  return request({
    url: '/system/dept/treeselect',
    get: 'get',
  })
}
// 案件详情-查询用户信息
export function getUserInfoByCaseId(query) {
  return request({
    url: '/caseInfo/user/getCaseUserInfo',
    get: 'get',
    params: query
  })
}
// 案件详情-查询用户已有标签
export function getcaseUserLablesList(query) {
  return request({
    url: '/caseInfo/labels/getUserLabels',
    get: 'get',
    params: query
  })
}

// 案件详情-分案记录
export function getCaseDistributionLogList(query) {
  return request({
    url: '/caseInfo/distributionLog/getCaseDistributionLogList',
    get: 'get',
    params: query
  })
}

//导出分案记录
export function doDistributionExport(data) {
  return request({
    url: '/caseInfo/distributionLog/export',
    method: 'get',
    params: data
  })
}

// 案件详情-查询用户联系人信息
export function getCaseUserContactsList(query) {
  return request({
    url: '/caseInfo/contacts/getCaseUserContactsList',
    get: 'get',
    params: query
  })
}

// 案件详情-查询还款记录
export function getCaseRepayByCaseId(query) {
  return request({
    url: '/caseInfo/repay/getCaseRepayByCaseId',
    get: 'get',
    params: query
  })
}

// 查询用户列表
export function listUser(query) {
    return request({
      url: '/system/user/list',
      get: 'get',
      params: query
    })
}

// 查询案件附件
export function getCaseAttachmentList(query) {
  return request({
    url: '/caseInfo/attachment/getCaseAttachmentList',
    get: 'get',
    params: query
  })
}
//案件管理-案件-案件列表-管理员
export function caseManagerList(data) {


  return request({
    url: '/caseInfo/managerList',
    method: 'get',
    params: data
  })
}
//案件管理-案件-案件列表-员工
export function caseEmployeeList(data) {
  return request({
    url: '/caseInfo/employeeList',
    get: 'get',
    params: data
  })
}
//案件管理-案件-导出
export function caseManagerExport(data) {
  return request({
    url: '/caseInfo/export',
    get: 'get',
    params: data
  })
}
//债务人管理-导出
export function caseCustomerAttachmentExport(data) {
  return request({
    url: '/caseInfo/exportCustomerAttachment',
    get: 'get',
    params: data
  })
}

//案件管理-导出债务-导出
export function caseBorrowExport(data) {
  return request({
    url: '/caseInfo/exportCaseBorrow',
    get: 'get',
    params: data
  })
}

//案件管理-案件-更新案件状态
export function updateCaseStatus(data) {
  return request({
    url: '/caseInfo/updateCaseStatus',
    method: 'get',
    params: data
  })
}
// 导入附件
export function uploadAttachmentFile(data) {
  return request({
    url: '/caseInfo/import/importCase',
    method: 'post',
    data: data
  })
}
export function uploadCaseAttachmentFile(data) {
  return request({
    url: '/caseInfo/import/importAttachment',
    method: 'post',
    data: data
  })
}

export function uploadCaseAdjustFile(data) {
  return request({
    url: '/caseInfo/adjustRecord/importCaseAdjustRecord',
    method: 'post',
    data: data
  })
}
//债务债务人出库
export function uploadOutFile(data) {
  return request({
    url: '/caseInfo/out/outCase',
    method: 'post',
    data: data
  })
}
//案件分派接口
export function caseInfoCaseDistribution(data) {
  return request({
    url: '/caseInfo/caseDistribution',
    method: 'post',
    data: data
  })
}
//案件规则分配接口
export function caseInfoSmartDistribution(data) {
  return request({
    url: '/caseInfo/smartDistribution',
    method: 'post',
    data: data
  })
}
//调解记录接口
export function getCaseAdjustRecordByCaseId(query) {
  return request({
    url: '/caseInfo/adjustRecord/getCaseAdjustRecordListByCaseId',
    get: 'get',
    params: query
  })
}
//添加调解记录接口
export function addCaseAdjustRecord(data) {
  return request({
    url: '/caseInfo/adjustRecord/add',
    method: 'post',
    data: data
  })
}
//添加联系人接口
export function addUseContact(data) {
  return request({
    url: '/caseInfo/contacts/add',
    method: 'post',
    data: data
  })
}
//修改联系人接口
export function editUseContact(data) {
  return request({
    url: '/caseInfo/contacts/edit',
    method: 'post',
    data: data
  })
}
//删除联系人接口
export function deleteUseContact(data) {
  return request({
    url: '/caseInfo/contacts/' + data,
    method: 'delete'
  })
}

//获取案件附件接口
export function getCaseAttachmentListByCaseId(data) {
  return request({
    url: '/caseInfo/attachment/getCaseAttachmentList',
    method: 'get',
    params: data
  })
}
//留案申请列表
export function getCaseLeaveList(data) {
  return request({
    url: '/caseInfo/getCaseLeaveList',
    method: 'get',
    params: data
  })
}
//留案审核处理
export function getDoCaseLeave(data) {
  return request({
    url: '/caseInfo/doCaseLeave',
    method: 'post',
    data: data
  })
}
//减免申请列表
export function getCaseReductionList(data) {
  return request({
    url: '/caseInfo/getCaseReductionList',
    method: 'get',
    params: data
  })
}
//减免审核处理
export function doCaseReduction(data) {
  return request({
    url: '/caseInfo/doCaseReduction',
    method: 'post',
    data: data
  })
}
//提交留案申请
export function addCaseLeave(data) {
  return request({
    url: '/caseInfo/addCaseLeave',
    method: 'post',
    data: data
  })
}

//提交减免申请
export function addCaseReduction(data) {
  return request({
    url: '/caseInfo/addCaseReduction',
    method: 'post',
    data: data
  })
}

//提交还款申请
export function addCaseRepay(data) {
  return request({
    url: '/caseInfo/repay/addCaseRepay',
    method: 'post',
    data: data
  })
}

//提交冻结解冻
export function addCaseFrozen(data) {
  return request({
    url: '/caseInfo/borrow/frozen',
    method: 'post',
    params: data
  })
}

//提交结清
export function addCaseEnd(data) {
  return request({
    url: '/caseInfo/borrow/end',
    method: 'post',
    params: data
  })
}

//提交诉讼
export function addLawsuit(data) {
  return request({
    url: '/caseInfo/borrow/addLawsuit/'+data,
    method: 'PUT'
  })
}

//提交撤诉
export function delLawsuit(data) {
  return request({
    url: '/caseInfo/borrow/delLawsuit/'+data,
    method: 'PUT'
  })
}

//查询告知函模板列表
export function getNotifyList(data) {
  return request({
    url: '/caseInfo/notificationTemplate/getNotificationTemplateList',
    method: 'get',
    params: data
  })
}

//新增告知函模板
export function addNotification(data) {
  return request({
    url: '/caseInfo/notificationTemplate/addNotification',
    method: 'post',
    data: data
  })
}
//启动停用
export function notification(data) {
  return request({
    url: '/caseInfo/notificationTemplate/able',
    method: 'get',
    params: data
  })
}
//获取告知函模板详细信息
export function notiiyInfo(data) {
  return request({
    url: '/caseInfo/notificationTemplate/getInfo',
    method: 'get',
    params: data
  })
}
//修改告知函模板
export function updateNotification(data) {
  return request({
    url: '/caseInfo/notificationTemplate/updateNotification',
    method: 'post',
    data: data
  })
}
//案件管理-调解记录列表
export function getCaseAdjustRecordList(data) {
  return request({
    url: '/caseInfo/adjustRecord/getCaseAdjustRecordList',
    method: 'get',
    params: data
  })
}
//案件管理-调解记录-导出
export function adjustRecordExport(data) {
  return request({
    url: '/caseInfo/adjustRecord/export',
    method: 'get',
    params: data
  })
}
//用户基本信息-点击告知函图标-展示数据
export function getNotificationArr() {
  return request({
    url: '/caseInfo/notificationTemplate/getNotificationArr',
    method: 'get'
  })
}
//用户基本信息-点击告知函图标-展示数据-模板内容
export function getResolveCaseInfo(data) {
  return request({
    url: '/caseInfo/notificationTemplate/getResolveCaseInfo',
    method: 'get',
    params: data
  })
}
//案件管理-冻结
export function frozenOrUnfrozenCase(data) {
  return request({
    url: '/caseInfo/frozenOrUnfrozenCase',
    method: 'get',
    params: data
  })
}
//案件管理-还款列表
export function getRepayList(data) {
  return request({
    url: '/caseInfo/repay/list',
    method: 'get',
    params: data
  })
}
//案件管理-还款列表导出
export function repayListExport(data) {
  return request({
    url: '/caseInfo/repay/export',
    method: 'get',
    params: data
  })
}
//财务审核-还款列表
export function getCaseRepayList(data) {
  return request({
    url: '/caseInfo/repay/getCaseRepayList',
    method: 'get',
    params: data
  })
}
//财务审核-还款列表-审核
export function doCaseRepay(data) {
  return request({
    url: '/caseInfo/repay/doCaseRepay',
    method: 'post',
    data: data
  })
}
//财务审核-还款列表-导出
export function repayExport(data) {
  return request({
    url: '/caseInfo/repay/exportRepayApply',
    method: 'get',
    params: data
  })
}
//财务审核-减免列表-导出
export function doCaseReductionExport(data) {
  return request({
    url: '/caseInfo/exportReduction',
    method: 'get',
    params: data
  })
}
//案件-案件详情-查询历史委托记录列表
export function entrustHistoryList(data) {
  return request({
    url: '/caseInfo/entrustHistory/list',
    method: 'get',
    params: data
  })
}
//案件-分案导入
export function batchCaseDistribution(data) {
  return request({
    url: '/caseInfo/batchCaseDistribution',
    method: 'post',
    data: data
  })
}
//案件-案件详情-银行卡信息
export function getCaseBankInfoList(data) {
  return request({
    url: '/caseInfo/bankInfo/getCaseBankInfoList',
    method: 'get',
    params: data
  })
}
//案件-新增调解记录-下拉框显示联系人
export function getCaseUserContactsByCaseId(data) {
  return request({
    url: '/caseInfo/contacts/getCaseUserContactsByCaseId',
    method: 'get',
    params: data
  })
}

//案件管理-债权方
export function channelList(data) {
  return request({
    url: '/caseInfo/channel/list',
    method: 'get',
    params: data
  })
}
//案件管理-债权方-新增
export function channelSaveChannel(data) {
  return request({
    url: '/caseInfo/channel/saveChannel',
    method: 'post',
    data: data
  })
}
//案件管理-债权方-修改
export function channelUpdateChannel(data) {
  return request({
    url: '/caseInfo/channel/updateChannel',
    method: 'post',
    data: data
  })
}
//案件管理-债权方-冻结渠道
export function channelFronzenChannel(data) {
  return request({
    url: '/caseInfo/channel/fronzenChannel',
    method: 'get',
    params: data
  })
}
//案件管理-债权方-查看
export function caseInfoChannel(data) {
  return request({
    url: '/caseInfo/channel/getImportHistory',
    method: 'get',
    params: data
  })
}
//案件管理-债权方-导出
export function channelExport() {
  return request({
    url: '/caseInfo/channel/export',
    method: 'get'
  })
}
//留案审核-导出
export function caseLeaveExport(data) {
  return request({
    url: '/caseInfo/leaveExport',
    method: 'get',
    params: data
  })
}


