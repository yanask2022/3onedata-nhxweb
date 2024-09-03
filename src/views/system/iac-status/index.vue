<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="IAC Status" name="index">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">General</h1>
              <div class="two-column-row-container">
                <div class="two-column-row">
                  <div class="col-1">
                    <span>IAC Status: {{ info.status }}</span>
                  </div>
                  <div class="col-2">
                    <span>IAC Version: {{ info.version }}</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { get } from '@/api/ac'

export default {
  name: 'IACStatus',
  data() {
    return {
      activeName: 'index',
      slider_value: 1,
      info: {
        'status': 'connect',
        'version': '1.0'
      }
    }
  },
  mounted() {
    get({}).then(res => {
      this.info = res
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import "~@/styles/tab.scss";

.two-column-row-container {
  font-size: 12px;
  padding-top: 15px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;

  .two-column-row {
    margin: 5px 0;
    width: 100%;
    display: flex;
    align-items: center;

    .col-1 {
      width: 484px;
    }

    .col-2 {
      width: auto;
    }
  }
}

::v-deep .el-step__title{
  font-size: 12px;
}

</style>
