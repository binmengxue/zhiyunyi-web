import request from '@/utils/request'

// 查询通话记录通话录音列表
export function listRecord(query) {
  return request({
    url: '/caseInfo/record/list',
    method: 'get',
    params: query
  })
}

// 查询通话记录通话录音详细
export function getRecord(id) {
  return request({
    url: '/caseInfo/record/' + id,
    method: 'get'
  })
}


// 导出通话记录通话录音
export function exportRecord(query) {
  return request({
    url: '/caseInfo/record/export',
    method: 'post',
    data: query
  })
}