<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="Diagnostics" name="Diagnostics">
        <el-row>
          <el-col :span="24">
            <div class="content-container">
              <h1 class="panel-title">
                Diagnostics
              </h1>
              <div class="div_yh5cn4">
                <span class="span_nvs4i0">Diagnostic Tool:</span>
                <el-radio-group v-model="diagnosticsConfig.tools">
                  <el-radio :label="1">Ping</el-radio>
                  <el-radio :label="2">Traceroute</el-radio>
                </el-radio-group>
              </div>

              <div class="div_241mmg">
                <div class="div_rdmoeh">
                  Destination IP/Domain Name:
                </div>
                <div class="div_2agm3y">
                  <el-input v-model="diagnosticsConfig.ping_target" size="mini"></el-input>
                </div>
              </div>

              <div class="div_mgbad4">
                <el-button size="mini" @click="diag_start">Start</el-button>
              </div>

              <!-- 展开/折叠 高级 -->
              <div class="div_v77bzv">
                <div class="expand-container" @click="diagnosticsConfig.expandAdvanced = !diagnosticsConfig.expandAdvanced">
                  <el-icon v-show="diagnosticsConfig.expandAdvanced" class="el-icon-caret-top el-icon_ht4hlj"></el-icon>
                  <el-icon v-show="!diagnosticsConfig.expandAdvanced" class="el-icon-caret-bottom el-icon_loh1hg"></el-icon>
                  <span>Advanced</span>
                </div>
              </div>

              <div v-if="diagnosticsConfig.expandAdvanced">
                <!-- ping count-->
                <div class="div_mlclr0">
                  <div class="div_d2mx81">
                    Ping Count:
                  </div>
                  <div class="div_9ijn9b">
                    <el-input v-model="diagnosticsConfig.ping_count" size="mini"></el-input>
                  </div>
                  <span>(1-50)</span>
                </div>
              </div>

              <div class="div_blgll2">
                <div class="div_kd6u2p">
                  <span v-for="(message, index) in diagnosticsConfig.console_log" :key="index">{{ message }}</span>
                </div>
                <!--<el-input type="textarea" v-model="diagnosticsConfig.console_log" rows="10" disabled style="width: 680px"></el-input>-->
              </div>

            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ping, traceroute } from '@/api/diag'

export default {
  name: 'Diagnostics',
  data() {
    return {
      activeName: 'Diagnostics',
      diagnosticsConfig: {
        tools: 1,
        ping_target: '',
        interface: '--',
        expandAdvanced: false,
        ping_count: 4,
        ping_packet_size: 64,
        console_log: [
          'The Router is ready'
        ]
      },
      remote_assistance_config: {
        enable_remote_assistance: false
      }
    }
  },
  mounted() {

  },
  methods: {
    diag_start() {
      const params = {}
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      if (this.diagnosticsConfig.tools === '1') {
        params.addr = this.diagnosticsConfig.ping_target
        params.count = this.diagnosticsConfig.ping_count
        ping(params).then(res => {
          loading.close()
          this.diagnosticsConfig.console_log = res.result
          this.$message.success('success')
        }).catch(() => {
          loading.close()
        })
      } else {
        params.addr = this.diagnosticsConfig.ping_target
        traceroute(params).then(res => {
          loading.close()
          this.diagnosticsConfig.console_log = res.result
          this.$message.success('success')
        }).catch(() => {
          loading.close()
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";

.expand-container {
  cursor: pointer;
  width: 200px;
  display: flex;
  align-items: center;

  &:hover {
    color: #867e7e;
  }
}

.expanded-item-wrapper {
  display: flex;
  flex-direction: column;

}

.operator-btn {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
}

.div_yh5cn4 {
  width: 100%;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  font-size: 12px
}

.span_nvs4i0 {
  width: 200px
}

.div_241mmg {
  width: 100%;
  padding: 20px 10px 20px 10px;
  display: flex;
  align-items: center;
  font-size: 12px
}

.div_rdmoeh {
  width: 200px;
  display: flex;
  align-items: center;
}

.div_2agm3y {
  display: flex;
  font-size: 12px;
  width: 192px
}

.div_gjlgj3 {
  width: 100%;
  padding: 20px 10px 20px 10px;
  display: flex;
  align-items: center;
  font-size: 12px
}

.div_3tqsfz {
  width: 200px;
  display: flex;
  align-items: center;
}

.div_mnt5gd {
  display: flex;
  flex: 1;
  font-size: 12px
}

.div_mgbad4 {
  margin-top: 20px
}

.div_v77bzv {
  width: 100%;
  padding: 0 10px 20px 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 20px
}

.el-icon_ht4hlj {
  font-size: 24px;
  margin-right: 10px
}

.el-icon_loh1hg {
  font-size: 24px;
  margin-right: 10px
}

.div_mlclr0 {
  width: 100%;
  padding: 20px 10px 20px 10px;
  display: flex;
  align-items: center;
  font-size: 12px
}

.div_d2mx81 {
  width: 200px;
  display: flex;
  align-items: center;
}

.div_9ijn9b {
  display: flex;
  font-size: 12px;
  width: 192px;
  margin-right: 5px
}

.div_owir7f {
  width: 100%;
  padding: 20px 10px 20px 10px;
  display: flex;
  align-items: center;
  font-size: 12px
}

.div_jdamjw {
  width: 200px;
  display: flex;
  align-items: center;
}

.div_bliec {
  display: flex;
  font-size: 12px;
  width: 192px;
  margin-right: 5px
}

.div_blgll2 {
  width: 100%;
  padding: 20px 10px 20px 10px;
  display: flex;
  align-items: center;
  font-size: 12px
}

.div_kd6u2p {
  overflow-y: scroll;
  height: 208px;
  width: 680px;
  padding: 8px 0 4px 12px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e6e6e6
}

.div_demtei {
  width: 100%;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  font-size: 12px
}

.div_s8hdfe {
  width: 100%;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  font-size: 12px
}

.span_3tth5w {
  width: 200px
}

.div_jz5dvi {
  margin-top: 20px
}

.div_m6va4x {
  width: 100%;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  font-size: 12px
}

.div_o55qti {
  margin-top: 20px
}
</style>
