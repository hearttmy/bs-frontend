<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="Index" width="70">
        <template slot-scope="{row}">
          <span>{{ row.index }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ClientId">
        <template slot-scope="{row}">
          <span>{{ row.clientId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Info">
        <template slot-scope="{row}">
          <span>{{ row.info }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="lat">
        <template slot-scope="{row}">
          <span>{{ row.lat }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="lng">
        <template slot-scope="{row}">
          <span>{{ row.lng }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.alert | statusFilter">
            {{ row.alert ? '警告' : '正常' }}
          </el-tag>
        </template>
      </el-table-column>

    </el-table>
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="itemNum">
    </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InlineEditTable',
  filters: {
    statusFilter (status) {
      const statusMap = ['success', 'danger']
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
      },
      pageSize: 10,
      currentPage: 1,
      itemNum: 0
    }
  },
  created () {
    this.$store.dispatch('data/setItems').then(() => {
      this.itemNum = this.$store.state.data.items.length
      this.setList()
    })
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.setList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.setList()
    },
    setList () {
      this.list = this.$store.state.data.items.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      this.listLoading = false
    },
    cancelEdit (row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit (row) {
      row.edit = false
      row.originalTitle = row.title
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
.block {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
