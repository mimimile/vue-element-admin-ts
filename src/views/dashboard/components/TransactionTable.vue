<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Order_No" min-width="200">
      <template slot-scope="scope">
        {{scope.row.order_no}}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope">
        ¥{{scope.row.price}}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter"> {{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { fetchList } from '@/api/transaction'
import { ListData, ListDataStatus } from '@/types/transaction-types'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  filters: {
    statusFilter(status: ListDataStatus) {
      const statusMap: any = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
})
export default class TransactionTable extends Vue {
  private list: ListData[] = []

  private created(): void {
    this.fetchData()
  }

  private fetchData(): void {
    fetchList().then((response) => {
      this.list = response.data.items.slice(0, 8)
    })
  }
}
</script>

