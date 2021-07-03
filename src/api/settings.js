import request from '@/utils/request'

export function getDeviceList () {
  return request({
    url: '/data/deviceList',
    method: 'get'
  })
}

export function setDeviceName (data) {
  return request({
    url: '/data/setDeviceName',
    method: 'post',
    data
  })
}
