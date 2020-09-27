import request from '@/utils/request'

// 查询数据导出列列表
export function listLog(query) {
  return request({
    url: '/caseinfo/log/list',
    method: 'get',
    params: query
  })
}

// 查询数据导出列详细
export function getLog(id) {
  return request({
    url: '/caseinfo/log/' + id,
    method: 'get'
  })
}

// 新增数据导出列
export function addLog(data) {
  return request({
    url: '/caseinfo/log',
    method: 'post',
    data: data
  })
}

// 修改数据导出列
export function updateLog(data) {
  return request({
    url: '/caseinfo/log',
    method: 'put',
    data: data
  })
}

// 删除数据导出列
export function delLog(id) {
  return request({
    url: '/caseinfo/log/' + id,
    method: 'delete'
  })
}

// 导出数据导出列
export function exportLog(query) {
  return request({
    url: '/caseinfo/log/export',
    method: 'get',
    params: query
  })
}