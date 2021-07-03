import { getData } from '../../api/data'
import { getDeviceList } from '../../api/settings'

const getDefaultState = () => {
  return {
    deviceList: [],
    items: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_DEVICELIST: (state, deviceList) => {
    state.deviceList = deviceList
  },
  SET_ITEMS: (state, items) => {
    state.items = items
  }
}

const actions = {
  setDeviceList ({ commit }) {
    return new Promise((resolve, reject) => {
      getDeviceList().then(res => {
        const { data } = res
        data.deviceList.sort((a, b) => {
          if (a.deviceId > b.deviceId) {
            return 1
          } else if (a.deviceId < b.deviceId) {
            return -1
          }
          return 0
        })
        commit('SET_DEVICELIST', data.deviceList)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  setItems ({ commit }) {
    return new Promise((resolve, reject) => {
      getData().then(res => {
        const { data } = res
        data.items.forEach((item, i) => {
          item.index = i + 1
        })
        commit('SET_ITEMS', data.items)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
