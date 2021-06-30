import request from '@/utils/request'

export function getPanelData () {
  return request({
    url: '/data/panelData',
    method: 'get'
  })
}
