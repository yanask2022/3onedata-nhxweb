<template>
  <div class="root">
    <span class="title">IAC Status</span>
    <el-card>
      <div slot="header">
        <span>General</span>
      </div>
      <div class="content-wrapper">
        <div class="field-row">
          <div class="field-key">IAC Status</div>
          <div class="field-value">{{ info.status }}</div>
        </div>
        <div class="field-row">
          <div class="field-key">IAC Version</div>
          <div class="field-value">{{ info.version }}</div>
        </div>
      </div>
    </el-card>
    <br>
  </div>
</template>
<script>
import { get } from '@/api/ac'
export default {
  name: 'IACStatus',
  data() {
    return {
      intervalIds: [],
      // IAC status info
      info: {
        status: '',
        version: ''
      }
    }
  },
  mounted() {
    get({}).then(res => {
      this.info = res
    })
  }
}
</script>
