<template>
  <div class="root">
    <span class="title">Kernel Log</span>
    <el-card>
      <div slot="header">
        <span>Logs</span>
      </div>
      <div class="content-wrapper">
        <div v-for="(log, index) in logs" :key="index" style="margin-top: 5px" v-html="log" />
      </div>
    </el-card>
    <br>

  </div>
</template>

<script>
// 将命令行输出的ansi颜色代码转换成html对应的颜色
import AnsiUp from 'ansi_up'
import { get_dmesg } from '@/api/system'

export default {
  name: 'KernelLog',
  data() {
    return {
      logs: []
    }
  },
  mounted() {
    get_dmesg({}).then(res => {
      this.logs[0] = res.result
    })
  }
}
</script>

<style scoped>

</style>
