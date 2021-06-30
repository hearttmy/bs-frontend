<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group  :panelData="panelData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <bar-chart />
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import BarChart from './components/BarChart'
import { getPanelData } from '@/api/homePageData'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    BarChart
  },
  data () {
    return {
      barChartData: {},
      panelData: {
        totalDeviceNum: 0,
        onlineDeviceNum: 0,
        totalMessageNum: 0,
        todayMessageNum: 0
      }
    }
  },
  created () {
    this.setPanelData()
  },
  methods: {
    setPanelData () {
      getPanelData().then(res => {
        const { data } = res
        this.panelData = data
        console.log(this.panelData)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
