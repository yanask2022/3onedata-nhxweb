<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="SystemLog" name="SystemLog">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">Log Settings</h1>

              <div class="two-column-row-container">
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="enable_auto_refresh" label="Enable Auto-refresh"></el-checkbox>
                  </div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="enable_severity" label="Severity"></el-checkbox>
                  </div>
                  <div class="col-2">
                    <el-select v-model="severity_level" size="mini" :disabled="!enable_severity" class="el-select_1un29g">
                      <el-option v-for="(level) in severity_level_options" :key="level" :label="level" :value="level"></el-option>
                    </el-select>
                  </div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="enable_send_log" label="Send Log"></el-checkbox>
                  </div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">
                    <span>Server IP:</span>
                  </div>
                  <div class="col-2">
                    <el-input v-model="log_server_address" size="mini" :disabled="!enable_send_log"></el-input>
                  </div>
                </div>
                <div class="two-column-row div_rcqyx5">
                  <div class="col-1">
                    <el-button size="mini" @click="onSaveLogSettingsClick">Save</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="el-row_w7mhw1">
            <el-col :span="24">
              <h1 class="panel-title">Log List</h1>

              <div class="two-column-row-container">
                <!-- 按钮-->
                <div class="div_p5al0e">
                  <div class="div_h96b0w">
                    <i class="el-icon-refresh i_lb7hiw"></i>
                    <span class="span_5mpxvk">Refresh</span>
                  </div>

                  <div class="div_4zgj1k">
                    <i class="el-icon-remove i_j1f6ly"></i>
                    <span class="span_bh30lw">Delete</span>
                  </div>
                </div>

                <div class="div_qj8yzx">
                  <div class="div_ru3af1">
                    <el-table ref="table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="tableData" border>
                      <el-table-column prop="id" width="40" label="ID" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="Time" label="Time" width="160" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="Module" width="130" label="Module" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="Level" width="80" label="Level" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="Content" label="Content" header-align="center" align="center"></el-table-column>
                    </el-table>
                  </div>
                </div>
                <div class="two-column-row div_5h76br">
                  <div class="col-1">
                    <el-button size="mini" @click="onSaveLogClick">Save</el-button>
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
export default {
  name: 'SystemLog',
  data() {
    return {
      activeName: 'SystemLog',
      enable_auto_refresh: false,
      enable_severity: false,
      severity_level: '',
      enable_send_log: false,
      log_server_address: '',
      severity_level_options: [
        'All', 'Level', 'EMERGENCY', 'ALERT', 'CRITICAL', 'ERROR', 'WARNING', 'NOTICE'
      ],
      tableData: [
        {
          id: '1',
          Time: '2016-01-01 03:07:54',
          Module: 'SYSTEM_MNGT',
          Level: 'NOTICE',
          Content: 'User 1 (IP address:192.168.0.101)login Web server successfully.User 1 (IP address:192.168.0.101)login Web server successfully.User 1 (IP address:192.168.0.101)login Web server successfully.User 1 (IP address:192.168.0.101)login Web server successfully.'
        },
        {
          id: '2',
          Time: '2016-01-01 03:07:54',
          Module: 'SYSTEM_MNGT',
          Level: 'NOTICE',
          Content: 'User 1 (IP address:192.168.0.101)login Web server successfully.'
        },
        {
          id: '3',
          Time: '2016-01-01 03:07:54',
          Module: 'SYSTEM_MNGT',
          Level: 'NOTICE',
          Content: 'User 1 (IP address:192.168.0.101)login Web server successfully.'
        },
        {
          id: '4',
          Time: '2016-01-01 03:07:54',
          Module: 'SYSTEM_MNGT',
          Level: 'NOTICE',
          Content: 'User 1 (IP address:192.168.0.101)login Web server successfully.'
        }
      ]
    }
  },
  methods: {
    onSaveLogSettingsClick() {
      console.log('onSaveLogSettingsClick')
    },
    onSaveLogClick() {
      console.log('onSaveLogClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";
.two-column-row-container {
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
      width: 184px;
    }

    .col-2 {
      width: auto;
    }
  }
}

.chart-wrapper {
  background: #fff;
  height: 305px;
  width: 400px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e5e5;
}

.table-wrapper {
  background: #fff;
  height: 305px;
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e5e5e5;
}

.title-bar {
  padding-left: 10px;
  width: 100%;
  background: #eee;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 40px;
  color: #212121;
  font-weight: bold;
  justify-content: space-between;
}

.tab-btn {
  padding: 0 6px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 30px;
  background: #ffffff;
  color: #7d7e80;
  font-size: 14px;
  cursor: pointer
}

.tab-btn-selected {
  border-color: #4acbd6;
  background: #4acbd6;
  color: #ffffff;
}

.el-select_1un29g {
  width: 200px
}

.div_rcqyx5 {
  margin-top: 30px
}

.el-row_w7mhw1 {
  margin-top: 30px
}

.div_p5al0e {
  margin: 20px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_h96b0w {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_lb7hiw {
  font-size: 18px
}

.span_5mpxvk {
  font-size: 12px;
  margin-left: 5px
}

.div_4zgj1k {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_j1f6ly {
  font-size: 18px
}

.span_bh30lw {
  font-size: 12px;
  margin-left: 5px
}

.div_qj8yzx {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_ru3af1 {
  flex: 1;
}

.div_5h76br {
  margin-top: 30px !important;
}
</style>
