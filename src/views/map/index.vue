<template>
  <div class="amap-wrapper">
    <el-amap :center="center" :zoom="11" >
      <el-amap-marker v-for="marker in markers" :position="marker.position" :key="marker._id"
      :icon="getIcon(marker)" />
    </el-amap>
  </div>
</template>

<script>

export default {
  data () {
    return {
      center: [],
      map: {},
      markers: []
    }
  },
  created () {
    this.$store.dispatch('data/setItems').then(() => {
      this.initMap()
    })
  },
  methods: {
    initMap () {
      this.center = [this.$store.state.data.items[0].lng, this.$store.state.data.items[0].lat]
      this.$store.state.data.items.forEach(item => {
        const marker = {}
        marker._id = item._id
        marker.position = [item.lng, item.lat]
        marker.alert = item.alert
        this.markers.push(marker)
      })
    },
    getIcon (marker) {
      if (marker.alert) {
        return '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png'
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
.amap-wrapper {
  height: 100vh
}
</style>
