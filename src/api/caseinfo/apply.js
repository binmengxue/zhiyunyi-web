import request from '@/utils/request'

// 查询还款申请列表
export function listApply(query) {
  return request({
    url: '/caseinfo/apply/list',
    method: 'get',
    params: query
  })
}

// 查询还款申请详细
export function getApply(id) {
  return request({
    url: '/caseinfo/apply/' + id,
    method: 'get'
  })
}

// 新增还款申请
export function addApply(data) {
  return request({
    url: '/caseinfo/apply',
    method: 'post',
    data: data
  })
}

// 修改还款申请
export function updateApply(data) {
  return request({
    url: '/caseinfo/apply',
    method: 'put',
    data: data
  })
}

// 删除还款申请
export function delApply(id) {
  return request({
    url: '/caseinfo/apply/' + id,
    method: 'delete'
  })
}

// 导出还款申请
export function exportApply(query) {
  return request({
    url: '/caseinfo/apply/export',
    method: 'get',
    params: query
  })
}