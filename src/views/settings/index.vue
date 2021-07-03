<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="Index" width="80" type="index">
      </el-table-column>

      <el-table-column align="center" label="DeviceId">
        <template slot-scope="{row}">
          <span>{{ row.deviceId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="MessageNum">
        <template slot-scope="{row}">
          <span>{{ row.messageNum }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="DeviceName" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.deviceName" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="success"
              @click="confirmEdit(row)"
            >
              OK
            </el-button>
          </template>
          <span v-else>{{ row.deviceName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="warning"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="cancelEdit(row)"
          >
            cancel
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { setDeviceName } from '@/api/settings'

export default {
  name: 'InlineEditTable',
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created () {
    this.$store.dispatch('data/setDeviceList').then(() => {
      this.setList()
    })
  },
  methods: {
    setList () {
      this.list = this.$store.state.data.deviceList.map(v => {
        this.$set(v, 'edit', false)
        v.originalDeviceName = v.deviceName
        return v
      })
      this.listLoading = false
    },
    cancelEdit (row) {
      row.deviceName = row.originalDeviceName
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit (row) {
      row.edit = false
      row.originalDeviceName = row.deviceName
      setDeviceName({ deviceId: row.deviceId, deviceName: row.deviceName })
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
