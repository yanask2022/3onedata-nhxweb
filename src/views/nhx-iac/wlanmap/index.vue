<template>
  <div class="root">
    <span class="title">WLAN Map</span>
    <el-card>
      <div slot="header">
        <div class="header-wrapper">
          <el-button class="reset-btn" size="small" @click="changeTreeDepth(1)">
            Expand-AP
          </el-button>
          <el-button class="reset-btn" size="small" @click="changeTreeDepth(2)">
            Expand-VAP
          </el-button>
        </div>
      </div>
      <div class="content-wrapper" style="height: 700px">
        <TopologyChart :depth="depth" />
      </div>
    </el-card>
    <br>
  </div>
</template>
<script>

import TopologyChart from '@/components/Charts/TopologyChart.vue'

export default {
  name: 'Wlanmap',
  components: { TopologyChart },
  data() {
    return {
      depth: 2,
      apList: [],
      vapInfo: {}
    }
  },
  created() {

  },
  methods: {
    changeTreeDepth(dep) {
      this.depth = dep
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-card__body {
  padding: 0
}

</style>
