<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="UpnP" name="UpnP">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">General</h1>

              <div class="two-column-row-container">
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="enable_auto_refresh" label="Enable UPnP"></el-checkbox>
                  </div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">
                    <!--<el-checkbox v-model="enable_severity" label="Interface:" ></!--<el-checkbox>-->
                    <span>Interface:</span>
                  </div>
                  <div class="col-2">
                    <el-select v-model="severity_level" :multiple="true" size="mini" :disabled="!enable_auto_refresh" class="el-select_tieqss">
                      <el-option v-for="(level) in severity_level_options" :key="level" :label="level" :value="level"></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="two-column-row div_6phqq3">
                  <div class="col-1">
                    <el-button size="mini" @click="onSaveLogSettingsClick">Save</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="el-row_b3607m">
            <el-col :span="24">
              <h1 class="panel-title">UPnP Portmap List</h1>

              <div class="two-column-row-container">
                <!-- 按钮-->
                <div class="div_lxlxsg">
                  <div class="div_qbfwl7">
                    <i class="el-icon-refresh i_1x7c6y"></i>
                    <span class="span_7ifbsj">Refresh</span>
                  </div>

                  <div class="div_mfkc66">
                    <i class="el-icon-remove i_ma0jda"></i>
                    <span class="span_l3icps">Delete</span>
                  </div>
                </div>

                <div class="div_mnc0bu">
                  <div class="div_ywko4r">
                    <el-table ref="table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="tableData" border>
                      <el-table-column width="40" type="selection" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="id" width="40" label="ID" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="Description" label="Description" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="Protocol" label="Protocol" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="Interface" label="Interface" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="IP_Address" label="IP Address" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="External_Port" label="External Port" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="Internal_Port" label="InternalPort" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="Status" label="Status" header-align="center" align="center"></el-table-column>
                      <el-table-column label="Operation" header-align="center" align="center">
                        <template>
                          <i class="el-icon-remove i_q50vp4"></i>
                        </template>
                      </el-table-column>

                    </el-table>
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
  name: 'UpnP',
  data() {
    return {
      activeName: 'UpnP',
      enable_auto_refresh: false,
      enable_severity: false,
      severity_level: '',
      enable_send_log: false,
      log_server_address: '',
      severity_level_options: [
        'WAN1', 'WAN2'
      ],
      tableData: [
        {
          id: '1',
          Description: 'upnp63',
          Protocol: 'TCP',
          Interface: 'WAN1,WAN2',
          IP_Address: '192.168.1.116',
          External_Port: '10082',
          Internal_Port: '20082',
          Status: 'Enabled'
        },
        {
          id: '2',
          Description: 'upnp63',
          Protocol: 'TCP',
          Interface: 'WAN1,WAN2',
          IP_Address: '192.168.1.116',
          External_Port: '10082',
          Internal_Port: '20082',
          Status: 'Enabled'
        },
        {
          id: '3',
          Description: 'upnp63',
          Protocol: 'TCP',
          Interface: 'WAN1,WAN2',
          IP_Address: '192.168.1.116',
          External_Port: '10082',
          Internal_Port: '20082',
          Status: 'Enabled'
        },
        {
          id: '4',
          Description: 'upnp63',
          Protocol: 'TCP',
          Interface: 'WAN1,WAN2',
          IP_Address: '192.168.1.116',
          External_Port: '10082',
          Internal_Port: '20082',
          Status: 'Enabled'
        },
        {
          id: '5',
          Description: 'upnp63',
          Protocol: 'TCP',
          Interface: 'WAN1,WAN2',
          IP_Address: '192.168.1.116',
          External_Port: '10082',
          Internal_Port: '20082',
          Status: 'Enabled'
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


.el-select_tieqss {
  width: 200px
}

.div_6phqq3 {
  margin-top: 30px
}

.el-row_b3607m {
  margin-top: 30px
}

.div_lxlxsg {
  margin: 20px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_qbfwl7 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_1x7c6y {
  font-size: 18px
}

.span_7ifbsj {
  font-size: 12px;
  margin-left: 5px
}

.div_mfkc66 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_ma0jda {
  font-size: 18px
}

.span_l3icps {
  font-size: 12px;
  margin-left: 5px
}

.div_mnc0bu {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_ywko4r {
  flex: 1;
}

.i_q50vp4 {
  font-size: 18px
}
</style>
