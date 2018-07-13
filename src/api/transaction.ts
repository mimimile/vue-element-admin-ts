import request from '@/utils/request'

export function fetchList(query?: object) {
  return request({
    url: '/transaction/list',
    method: 'get',
    params: query,
  })
}
