<template>
  <div class="row-expand-template">
    <div class="row-expand-template-head">
      <div :class="{'head-item-active' : headItemActive == 0}" class="row-expand-template-head-item" @click="headItemActive = 0">Device Information
      </div>
      <span class="row-expand-template-head-separator">|</span>
      <div class="row-expand-template-head-item" :class="{'head-item-active' : headItemActive == 1}" @click="headItemActive = 1">
        Wireless Settings
      </div>
      <span class="row-expand-template-head-separator">|</span>
      <div class="row-expand-template-head-item" :class="{'head-item-active' : headItemActive == 2}" @click="headItemActive = 2">LAN Information
      </div>
      <span class="row-expand-template-head-separator">|</span>

      <div class="row-expand-template-head-item" :class="{'head-item-active' : headItemActive == 4}" @click="headItemActive = 4">LAN Traffic
      </div>
      <span class="row-expand-template-head-separator">|</span>
      <div class="row-expand-template-head-item" :class="{'head-item-active' : headItemActive == 5}" @click="headItemActive = 5">Radio Traffic
      </div>

      <div class="div_ypv94y">
        <span class="span_3g7ene"><i class="el-icon-refresh" /></span>
      </div>
    </div>
    <div class="row-expand-template-content">
      <!--Device Information-->
      <div v-show="headItemActive == 0">
        <el-row class="el-row_pgj5zr">
          <el-col :span="3"><span class="key">Device Name:</span></el-col>
          <el-col :span="21">
            <el-col :span="21"><span class="value">EAP330-00-00-ff-ff-0c-50</span></el-col>
          </el-col>
        </el-row>
        <el-row class="el-row_uqyqz4">
          <el-col :span="3"><span class="key">Device Model:</span></el-col>
          <el-col :span="21"><span class="value">EAP330</span></el-col>
        </el-row>
        <el-row class="el-row_ipdsab">
          <el-col :span="3"><span class="key">Firmware Version:</span></el-col>
          <el-col :span="21"><span class="value">1.2.0 Build 20170930 Rel. 31933(4555)</span></el-col>
        </el-row>
        <el-row class="el-row_6d8u6n">
          <el-col :span="3"><span class="key">System Time</span></el-col>
          <el-col :span="21"><span class="value">2022-01-01 08:07:16</span></el-col>
        </el-row>
        <el-row class="el-row_nrsujt">
          <el-col :span="3"><span class="key">Uptime:</span></el-col>
          <el-col :span="21"><span class="value">0 days 00:07:28</span></el-col>
        </el-row>
        <el-row class="el-row_sohh2q">
          <el-col :span="3"><span class="key">CPU0:</span></el-col>
          <el-col :span="21"><span class="value">
            <el-progress percentage="0" :color="variables.$primaryColor" class="value-progress" />
          </span></el-col>
        </el-row>
        <el-row class="el-row_v40kpj">
          <el-col :span="3"><span class="key">CPU1:</span></el-col>
          <el-col :span="21"><span class="value">
            <el-progress percentage="5" :color="variables.$primaryColor" class="value-progress" />
          </span>
          </el-col>
        </el-row>
        <el-row class="el-row_ixbi7t">
          <el-col :span="3"><span class="key">Memory:</span></el-col>
          <el-col :span="21"><span class="value">
            <el-progress percentage="25" :color="variables.$primaryColor" class="value-progress" />
          </span></el-col>
        </el-row>
      </div>

      <!--Wireless Settings-->
      <div v-show="headItemActive == 1">
        <div class="expand-template-sub-tab">
          <div class="expand-template-sub-tab-head">
            <div class="expand-template-sub-tab-item" :class="{'sub-item-active' : wirelessSettingsActive == 0}" @click="wirelessSettingsActive = 0">2.4Ghz
            </div>
            <span class="tab_separator">|</span>
            <div class="expand-template-sub-tab-item" :class="{'sub-item-active' : wirelessSettingsActive == 1}" @click="wirelessSettingsActive = 1">5Ghz
            </div>
          </div>
          <!-- 2.4G 配置-->
          <div v-show="wirelessSettingsActive == 0" class="expand-template-sub-tab-content">
            <el-row class="el-row_6u2h64">
              <el-col :span="3"><span class="key">Channel/Frequency</span></el-col>
              <el-col :span="21"><span class="value">1/2412MHz</span></el-col>
            </el-row>
            <el-row class="el-row_ybbr5w">
              <el-col :span="3"><span class="key">Channel Width</span></el-col>
              <el-col :span="21"><span class="value">20/40MHz</span></el-col>
            </el-row>
            <el-row class="el-row_uk3h2d">
              <el-col :span="3"><span class="key">IEEE802.11 Mode</span></el-col>
              <el-col :span="21"><span class="value">b/g/n Mixed</span></el-col>
            </el-row>
            <el-row class="el-row_xv6ivv">
              <el-col :span="3"><span class="key">Max TX Rate</span></el-col>
              <el-col :span="21"><span class="value">400.0Mbps</span></el-col>
            </el-row>
            <el-row class="el-row_uaoohh">
              <el-col :span="3"><span class="key">Transmit Power</span></el-col>
              <el-col :span="21"><span class="value">20dBm</span></el-col>
            </el-row>
          </div>
          <!-- 5GHz 配置-->
          <div v-show="wirelessSettingsActive == 1" class="expand-template-sub-tab-content">
            <el-row class="el-row_xk1ksf">
              <el-col :span="3"><span class="key">Channel/Frequency</span></el-col>
              <el-col :span="21"><span class="value">1/2412MHz 5G</span></el-col>
            </el-row>
            <el-row class="el-row_gr7ddt">
              <el-col :span="3"><span class="key">Channel Width</span></el-col>
              <el-col :span="21"><span class="value">20/40MHz 5G</span></el-col>
            </el-row>
            <el-row class="el-row_mhe3ik">
              <el-col :span="3"><span class="key">IEEE802.11 Mode</span></el-col>
              <el-col :span="21"><span class="value">b/g/n Mixed 5G</span></el-col>
            </el-row>
            <el-row class="el-row_4fl7o3">
              <el-col :span="3"><span class="key">Max TX Rate</span></el-col>
              <el-col :span="21"><span class="value">400.0Mbps</span></el-col>
            </el-row>
            <el-row class="el-row_nah0nd">
              <el-col :span="3"><span class="key">Transmit Power</span></el-col>
              <el-col :span="21"><span class="value">20dBm 5G</span></el-col>
            </el-row>
          </div>
        </div>

      </div>
      <!--Lan Information-->
      <div v-show="headItemActive == 2">
        <el-row class="el-row_c8q0lo">
          <el-col :span="3"><span class="key">MAC Address</span></el-col>
          <el-col :span="21"><span class="value">00-00-ff-ff-0c-50</span></el-col>
        </el-row>
        <el-row class="el-row_twpp3d">
          <el-col :span="3"><span class="key">IP Address</span></el-col>
          <el-col :span="21"><span class="value">192.168.0.254</span></el-col>
        </el-row>
        <el-row class="el-row_oaeyzu">
          <el-col :span="3"><span class="key">Subnet Mask</span></el-col>
          <el-col :span="21"><span class="value">255.255.255.0</span></el-col>
        </el-row>
        <el-row class="el-row_h2a6wz">
          <el-col :span="3"><span class="key">LAN Port1</span></el-col>
          <el-col :span="21"><span class="value">Down</span></el-col>
        </el-row>
        <el-row class="el-row_46ruy3">
          <el-col :span="3"><span class="key">LAN Port2</span></el-col>
          <el-col :span="21"><span class="value">1000Mbps-FULL</span></el-col>
        </el-row>
      </div>
      <!--LAN Traffic-->
      <div v-show="headItemActive == 4">
        <el-row>
          <el-col :span="10">
            <el-row class="el-row_cw8i1b">
              <el-col :span="8"><span class="key">Rx Packets:</span></el-col>
              <el-col :span="16"><span class="value">3212</span></el-col>
            </el-row>
            <el-row class="el-row_xb298k">
              <el-col :span="8"><span class="key">Rx Bytes:</span></el-col>
              <el-col :span="16"><span class="value">3529565</span></el-col>
            </el-row>
            <el-row class="el-row_8fwx5d">
              <el-col :span="8"><span class="key">Rx Dropped Packets:</span></el-col>
              <el-col :span="16"><span class="value">0</span></el-col>
            </el-row>
            <el-row class="el-row_fv3sbq">
              <el-col :span="8"><span class="key">Rx Errors:</span></el-col>
              <el-col :span="16"><span class="value">0</span></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row class="el-row_dn05js">
              <el-col :span="8"><span class="key">Tx Packets:</span></el-col>
              <el-col :span="16"><span class="value">1683</span></el-col>
            </el-row>
            <el-row class="el-row_tvkxd0">
              <el-col :span="8"><span class="key">Tx Bytes:</span></el-col>
              <el-col :span="16"><span class="value">1668894</span></el-col>
            </el-row>
            <el-row class="el-row_3t0o7z">
              <el-col :span="8"><span class="key">Tx Dropped Packets:</span></el-col>
              <el-col :span="16"><span class="value">0</span></el-col>
            </el-row>
            <el-row class="el-row_r0fiuc">
              <el-col :span="8"><span class="key">Tx Errors:</span></el-col>
              <el-col :span="16"><span class="value">0</span></el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <!--Radio Traffic-->
      <div v-show="headItemActive == 5">
        <div class="expand-template-sub-tab">
          <div class="expand-template-sub-tab-head">
            <div class="expand-template-sub-tab-item" :class="{'sub-item-active' : radioTrafficSettingsActive == 0}" @click="radioTrafficSettingsActive = 0">2.4Ghz
            </div>
            <span class="tab_separator">|</span>
            <div class="expand-template-sub-tab-item" :class="{'sub-item-active' : radioTrafficSettingsActive == 1}" @click="radioTrafficSettingsActive = 1">5Ghz
            </div>
          </div>
          <!-- 2.4G 配置-->
          <div v-show="radioTrafficSettingsActive == 0" class="expand-template-sub-tab-content">
            <el-row>
              <el-col :span="10">
                <el-row class="el-row_wvy7ur">
                  <el-col :span="8"><span class="key">Rx Packets:</span></el-col>
                  <el-col :span="16"><span class="value">3212</span></el-col>
                </el-row>
                <el-row class="el-row_fqzxga">
                  <el-col :span="8"><span class="key">Rx Bytes:</span></el-col>
                  <el-col :span="16"><span class="value">3529565</span></el-col>
                </el-row>
                <el-row class="el-row_4kwxla">
                  <el-col :span="8"><span class="key">Rx Dropped Packets:</span></el-col>
                  <el-col :span="16"><span class="value">0</span></el-col>
                </el-row>
                <el-row class="el-row_j9jax1">
                  <el-col :span="8"><span class="key">Rx Errors:</span></el-col>
                  <el-col :span="16"><span class="value">0</span></el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row class="el-row_bkp1w">
                  <el-col :span="8"><span class="key">Tx Packets:</span></el-col>
                  <el-col :span="16"><span class="value">1683</span></el-col>
                </el-row>
                <el-row class="el-row_dvn049">
                  <el-col :span="8"><span class="key">Tx Bytes:</span></el-col>
                  <el-col :span="16"><span class="value">1668894</span></el-col>
                </el-row>
                <el-row class="el-row_yfqbnz">
                  <el-col :span="8"><span class="key">Tx Dropped Packets:</span></el-col>
                  <el-col :span="16"><span class="value">0</span></el-col>
                </el-row>
                <el-row class="el-row_j8x5aa">
                  <el-col :span="8"><span class="key">Tx Errors:</span></el-col>
                  <el-col :span="16"><span class="value">0</span></el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <!-- 5GHz 配置-->
          <div v-show="radioTrafficSettingsActive == 1" class="expand-template-sub-tab-content">
            <el-row>
              <el-col :span="10">
                <el-row class="el-row_35by56">
                  <el-col :span="8"><span class="key">Rx Packets:</span></el-col>
                  <el-col :span="16"><span class="value">3213212</span></el-col>
                </el-row>
                <el-row class="el-row_a5xrgx">
                  <el-col :span="8"><span class="key">Rx Bytes:</span></el-col>
                  <el-col :span="16"><span class="value">5234324</span></el-col>
                </el-row>
                <el-row class="el-row_o6alw">
                  <el-col :span="8"><span class="key">Rx Dropped Packets:</span></el-col>
                  <el-col :span="16"><span class="value">21</span></el-col>
                </el-row>
                <el-row class="el-row_sr4jdh">
                  <el-col :span="8"><span class="key">Rx Errors:</span></el-col>
                  <el-col :span="16"><span class="value">4324</span></el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row class="el-row_3fk9s1">
                  <el-col :span="8"><span class="key">Tx Packets:</span></el-col>
                  <el-col :span="16"><span class="value">321</span></el-col>
                </el-row>
                <el-row class="el-row_dl71t9">
                  <el-col :span="8"><span class="key">Tx Bytes:</span></el-col>
                  <el-col :span="16"><span class="value">321</span></el-col>
                </el-row>
                <el-row class="el-row_s875ce">
                  <el-col :span="8"><span class="key">Tx Dropped Packets:</span></el-col>
                  <el-col :span="16"><span class="value">0</span></el-col>
                </el-row>
                <el-row class="el-row_2ypd4d">
                  <el-col :span="8"><span class="key">Tx Errors:</span></el-col>
                  <el-col :span="16"><span class="value">2</span></el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import variables from '@/styles/variables.scss'
export default {
  name: 'ExpandTmplate',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    rowData: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      variables,
      // TODO 使用实际值
      checked: false,
      headItemActive: 0,
      wirelessSettingsActive: 0,
      radioTrafficSettingsActive: 0,
      // TODO 使用rowData中的数据
      tableData: [
        {
          id: 1,
          mac: '00-00-00-00-00',
          band: 'xxx',
          ssid: '2121',
          snr: 'xxx',
          ccq: '50%',
          rate: '500',
          down: '4099',
          up: '2048',
          active_time: '16:05:21'
        },
        {
          id: 1,
          mac: '00-00-00-00-00',
          band: 'xxx',
          ssid: '2121',
          snr: 'xxx',
          ccq: '50%',
          rate: '500',
          down: '4099',
          up: '2048',
          active_time: '16:05:21'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";
@import "~@/styles/variables.scss";
.value {
  color: $primary-font-color;
  font-size: $primary-font-size;
}

.value-progress {
  width: 210px;
  border-radius: 0;
}

.tab_separator {
  margin: 0 5px;
}

.expand-template-sub-tab {
  display: flex;
  flex-direction: column;

  .expand-template-sub-tab-head {
    display: flex;

    &-item {
      color: #4c4c4c;
      font-size: 12px;
      cursor: pointer;
    }
  }

  .sub-item-active {
    color: $primary-color !important;
  }

  .expand-template-sub-tab-content {
    margin-top: 10px;
  }
}

.row-expand-template {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column;

  .head-item-active {
    color: $primary-color !important;
  }

  .row-expand-template-head {
    display: flex;
    align-items: center;
    position: relative;

    &-item {
      color: $primary-font-color;
      font-size: $primary-font-size;
      cursor: pointer;
      padding: 0 4px 0;
    }

    &-separator {
      margin: 0 10px;
      font-size: 12px;
      color: #4c4c4c
    }
  }

  .row-expand-template-content {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;

    .key {
      font-weight: bold;
      font-size: $primary-font-size;
      color: $primary-font-color;
    }

  }
}

.div_ypv94y {
  position: absolute;
  right: 0;
}

.span_3g7ene {
  font-size: 24px
}

.el-row_pgj5zr {
  margin-bottom: 15px
}

.el-row_uqyqz4 {
  margin-bottom: 15px
}

.el-row_ipdsab {
  margin-bottom: 15px
}

.el-row_6d8u6n {
  margin-bottom: 15px
}

.el-row_nrsujt {
  margin-bottom: 15px
}

.el-row_sohh2q {
  margin-bottom: 15px
}

.el-row_v40kpj {
  margin-bottom: 15px
}

.el-row_ixbi7t {
  margin-bottom: 15px
}

.el-row_6u2h64 {
  margin-bottom: 15px
}

.el-row_ybbr5w {
  margin-bottom: 15px
}

.el-row_uk3h2d {
  margin-bottom: 15px
}

.el-row_xv6ivv {
  margin-bottom: 15px
}

.el-row_uaoohh {
  margin-bottom: 15px
}

.el-row_xk1ksf {
  margin-bottom: 15px
}

.el-row_gr7ddt {
  margin-bottom: 15px
}

.el-row_mhe3ik {
  margin-bottom: 15px
}

.el-row_4fl7o3 {
  margin-bottom: 15px
}

.el-row_nah0nd {
  margin-bottom: 15px
}

.el-row_c8q0lo {
  margin-bottom: 15px
}

.el-row_twpp3d {
  margin-bottom: 15px
}

.el-row_oaeyzu {
  margin-bottom: 15px
}

.el-row_h2a6wz {
  margin-bottom: 15px
}

.el-row_46ruy3 {
  margin-bottom: 15px
}

.el-row_cw8i1b {
  margin-bottom: 15px
}

.el-row_xb298k {
  margin-bottom: 15px
}

.el-row_8fwx5d {
  margin-bottom: 15px
}

.el-row_fv3sbq {
  margin-bottom: 15px
}

.el-row_dn05js {
  margin-bottom: 15px
}

.el-row_tvkxd0 {
  margin-bottom: 15px
}

.el-row_3t0o7z {
  margin-bottom: 15px
}

.el-row_r0fiuc {
  margin-bottom: 15px
}

.el-row_wvy7ur {
  margin-bottom: 15px
}

.el-row_fqzxga {
  margin-bottom: 15px
}

.el-row_4kwxla {
  margin-bottom: 15px
}

.el-row_j9jax1 {
  margin-bottom: 15px
}

.el-row_bkp1w {
  margin-bottom: 15px
}

.el-row_dvn049 {
  margin-bottom: 15px
}

.el-row_yfqbnz {
  margin-bottom: 15px
}

.el-row_j8x5aa {
  margin-bottom: 15px
}

.el-row_35by56 {
  margin-bottom: 15px
}

.el-row_a5xrgx {
  margin-bottom: 15px
}

.el-row_o6alw {
  margin-bottom: 15px
}

.el-row_sr4jdh {
  margin-bottom: 15px
}

.el-row_3fk9s1 {
  margin-bottom: 15px
}

.el-row_dl71t9 {
  margin-bottom: 15px
}

.el-row_s875ce {
  margin-bottom: 15px
}

.el-row_2ypd4d {
  margin-bottom: 15px
}

::v-deep .el-progress__text {
  font-size: $primary-font-size !important;
}
</style>
