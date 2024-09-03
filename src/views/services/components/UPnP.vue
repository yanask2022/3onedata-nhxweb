<template>
  <div class="root">
    <span class="title">UPnp</span>
    <el-card>
      <div slot="header">
        <span>General</span>
      </div>
      <div class="content-wrapper">
        <div class="field-row">
          <div class="field-key">Enable UPnP</div>
          <div class="field-value">
            <el-checkbox v-model="form.enable_auto_refresh" />
          </div>
        </div>
        <div class="field-row">
          <div class="field-key">Interface</div>
          <div class="field-value">
            <el-select
              v-model="form.severity_level"
              :multiple="true"
              size="mini"
              :disabled="!form.enable_auto_refresh"
              class="el-select_tieqss"
            >
              <el-option
                v-for="(level) in severity_level_options"
                :key="level"
                :label="level"
                :value="level"
              />
            </el-select>
          </div>
        </div>
        <div style="margin-top: 20px">
          <el-button size="mini" @click="onSaveLogSettingsClick">Save</el-button>
        </div>
      </div>
    </el-card>
    <br>
    <span class="title">UPnP PortMap List</span>
    <el-card>
      <div slot="header">
        <span>Device Info</span>
      </div>
      <div class="content-wrapper">
        <NXHTableExtends
          :selection="true"
          :table-data="tableData"
          :columns="columns"
          default-slot-width="180"
          default-slot-label="Actions"
        >
          <template v-slot:default="{ scope }">
            <div class="item-actions">
              <el-button type="primary" @click="onEdit(scope.row)">EDIT</el-button>
              <el-button type="danger" @click="onDelete(scope.row)">DELETE</el-button>
            </div>
          </template>
        </NXHTableExtends>
      </div>
    </el-card>
  </div>
</template>

<script>
import NXHTableExtends from '@/components/NXHTableExtends/index'

export default {
  name: 'UpnP',
  components: {
    NXHTableExtends
  },
  data() {
    return {
      activeName: 'UpnP',
      form: {
        enable_auto_refresh: false,
        severity_level: ''
      },
      enable_severity: false,
      enable_send_log: false,
      log_server_address: '',
      severity_level_options: [
        'WAN1', 'WAN2'
      ],
      columns: [
        { label: 'ID', prop: 'id', fixed: true },
        { label: 'Description', prop: 'Description', custom: false },
        { label: 'Protocol', prop: 'Protocol', custom: false },
        { label: 'Interface', prop: 'Interface', custom: false },
        { label: 'IP Address', prop: 'IP_Address', custom: false },
        { label: 'External Port', prop: 'External_Port', custom: false },
        { label: 'Internal Port', prop: 'Internal_Port', custom: false },
        { label: 'Status', prop: 'Status', custom: false }
        // { label: 'Status', prop: 'status', custom: true, fixedWidth: '400' }
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
    },
    onEdit(row) {
      console.log(row)
    },
    onDelete(row) {
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>
.two-column-row-container {
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

.item-actions {
  justify-content: center;
  display: flex;

  .el-button--mini {
    color: #fff;
  }
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
  margin: 0px 0 10px 0;
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
