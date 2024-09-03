<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">

      <el-tab-pane label="Service Type" name="service_type">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Service Type List
              </h1>
              <!-- 操作按钮-->
              <div class="div_47zfl0">
                <div class="div_u7l6k8">
                  <i class="el-icon-circle-plus i_oau1uk"></i>
                  <span class="span_l68ts3">Add</span>
                </div>

                <div class="div_6pg2cg">
                  <i class="el-icon-remove i_sisiky"></i>
                  <span class="span_gxdc99">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_a70bnw">
                <div class="div_486mos">
                  <el-table ref="ip_group_table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="ip_group_table_data" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_3pu4w5">

                          <div class="div_n1246u">
                            <span class="span_yird1d">Service Type Name:</span>
                            <div class="div_pm8nfv">
                              <el-input v-model="props.row.service_type_name" size="mini" placeholder disabled class="el-input_xtkwpo"></el-input>
                            </div>
                          </div>

                          <div class="div_2ruh7r">
                            <span class="span_qs2vwa">Protocol:</span>
                            <div class="div_nh5g6v">
                              <el-radio-group v-model="props.row.protocol">
                                <el-radio label="TCP">TCP</el-radio>
                                <el-radio label="UDP">UDP</el-radio>
                                <el-radio label="TCP/UDP">TCP/UDP</el-radio>
                                <el-radio label="ICMP">ICMP</el-radio>
                                <el-radio label="Other">Other</el-radio>
                              </el-radio-group>
                            </div>
                          </div>

                          <div v-if="props.row.protocol == 'TCP' || props.row.protocol == 'UDP' || props.row.protocol == 'TCP/UDP'" class="div_ms127e">
                            <span class="span_d2ck70">Source Port Range:</span>
                            <div class="div_518lp2">
                              <el-input v-model="props.row.tcp_udp.source_port_start" size="mini" class="el-input_lacyzq"></el-input>
                              <span class="span_2sso2g"> - </span>
                              <el-input v-model="props.row.tcp_udp.source_port_end" size="mini" class="el-input_t4g9t7"></el-input>
                            </div>
                          </div>
                          <div v-if="props.row.protocol == 'TCP' || props.row.protocol == 'UDP' || props.row.protocol == 'TCP/UDP'" class="div_o6mwxe">
                            <span class="span_qyc451">Destination Port Range::</span>
                            <div class="div_51dzl1">
                              <el-input v-model="props.row.tcp_udp.destination_port_start" size="mini" class="el-input_xqjk0t"></el-input>
                              <span class="span_d29lpr"> - </span>
                              <el-input v-model="props.row.tcp_udp.destination_port_end" size="mini" class="el-input_bfywkc"></el-input>
                            </div>
                          </div>

                          <div v-if="props.row.protocol == 'ICMP'" class="div_i66lqy">
                            <span class="span_4wwc60">Type:</span>
                            <div class="div_tjsrvi">
                              <el-input v-model="props.row.icmp.type" size="mini" class="el-input_retbp0"></el-input>
                              <span class="span_adbj5v"></span>
                            </div>
                          </div>

                          <div v-if="props.row.protocol == 'ICMP'" class="div_ban5df">
                            <span class="span_4shi6b">Code:</span>
                            <div class="div_v4ziwy">
                              <el-input v-model="props.row.icmp.code" size="mini" class="el-input_nwuy7k"></el-input>
                              <span class="span_tlkxx4"></span>
                            </div>
                          </div>

                          <div v-if="props.row.protocol == 'Other'" class="div_cga3w2">
                            <span class="span_o07po7">Protocol Number:</span>
                            <div class="div_9mlvzm">
                              <el-input v-model="props.row.other.protocol_number" size="mini" class="el-input_n5c8kp"></el-input>
                              <span class="span_vujp55"></span>
                            </div>
                          </div>

                          <div class="div_mc7o3z">
                            <span class="span_xno0n6">Description:</span>
                            <div class="div_7xyugr">
                              <el-input v-model="props.row.description" size="mini" class="el-input_yz1804"></el-input>
                              <span class="span_7ggglq">(Optional)</span>
                            </div>
                          </div>

                          <div class="div_i961v0">
                            <div class="div_b8j3b5">
                              <el-button size="mini" @click="onIPGroupTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="onIPGroupTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID" header-align="center" align="center" width="50"></el-table-column>
                    <el-table-column width="150" prop="service_type_name" label="Service Type Name" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="protocol" label="Protocol" width="100" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="detail" label="Detail" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="description" label="Description" width="120" header-align="center" align="center"></el-table-column>

                    <el-table-column header-align="center" align="center" label="Operation" width="100">
                      <template slot-scope="scope">
                        <div class="div_b3707q">
                          <div v-if="scope.row.can_edit" class="div_qg1oky">
                            <span @click="handleIPGroupTableEdit(scope.row)" class="span_k5cay8">
                              <i class="el-icon-edit-outline"></i>
                            </span>

                            <span @click="handleIPGroupTableDelete(scope.row, scope.$index)" class="span_okwq7x">
                              <i class="el-icon-remove"></i>
                            </span>
                          </div>
                          <div v-else>
                            <span> -- </span>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
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
  name: 'ServiceType',
  data() {
    return {
      activeName: 'service_type',
      ip_group_table_data: [
        {
          id: '1',
          service_type_name: 'ALL',
          protocol: '0-255',
          detail: '--',
          description: 'ALL',
          can_edit: false
        },
        {
          id: '2',
          service_type_name: 'FTP',
          protocol: 'TCP',
          detail: 'Source Port = 0-65535; Destination Port = 21-21',
          description: 'FTP',
          can_edit: false
        },
        {
          id: '3',
          service_type_name: 'SSH',
          protocol: 'TCP',
          detail: 'Source Port = 0-65535; Destination Port = 22-22',
          description: 'SSH',
          can_edit: false
        },
        {
          id: '4',
          service_type_name: 'TELNET',
          protocol: 'TCP',
          detail: 'Source Port = 0-65535; Destination Port = 23-23',
          description: 'TELNET',
          can_edit: false
        },
        {
          id: '5',
          service_type_name: 'SMTP',
          protocol: 'TCP',
          detail: 'Source Port = 0-65535; Destination Port = 25-25',
          description: 'SMTP',
          can_edit: false
        },
        {
          id: '6',
          service_type_name: 'DNS',
          protocol: 'UDP',
          detail: 'Source Port = 0-65535; Destination Port = 53-53',
          description: 'DNS',
          can_edit: false
        },
        {
          id: '7',
          service_type_name: 'HTTP',
          protocol: 'TCP',
          detail: 'Source Port = 0-65535; Destination Port = 80-80',
          description: 'HTTP',
          can_edit: false
        },
        {
          id: '8',
          service_type_name: 'POP3',
          protocol: 'TCP',
          detail: 'Source Port = 0-65535; Destination Port = 110-110',
          description: 'POP3',
          can_edit: false
        },
        {
          id: '9',
          service_type_name: 'SNTP',
          protocol: 'UDP',
          detail: 'Source Port = 0-65535; Destination Port = 123-123',
          description: 'SNTP',
          can_edit: false
        },
        {
          id: '10',
          service_type_name: 'H.322',
          protocol: 'TCP',
          detail: 'Source Port = 0-65535; Destination Port = 1720-1720',
          description: 'H.322',
          can_edit: false
        },
        {
          id: '11',
          service_type_name: 'ICMP_ALL',
          protocol: 'ICMP',
          detail: 'Type = 255; Code = 255',
          description: 'icmp',
          can_edit: false,
          other: {
            protocol_number: ''
          }
        },
        {
          id: '12',
          service_type_name: 'name1',
          protocol: 'TCP/UDP',
          detail: 'Source Port = 100-6000; Destination Port = 500-500',
          description: '---',
          can_edit: true,
          other: {
            protocol_number: ''
          },
          icmp: {
            type: '',
            code: ''
          },
          tcp_udp: {
            source_port_start: '',
            source_port_end: '',
            destination_port_start: '',
            destination_port_end: ''
          }
        }
      ],
      ip_group_table_is_editing: false

    }
  },
  methods: {

    onIPGroupTableEditDone(row) {
      this.$refs.ip_group_table.toggleRowExpansion(row, false)
      this.ip_group_table_is_editing = false
    },

    onIPGroupTableEditCancel(row) {
      this.$refs.ip_group_table.toggleRowExpansion(row, false)
      this.ip_group_table_is_editing = false
    },

    handleIPGroupTableDelete(row) {
      // TODO 表格项删除
    },
    handleIPGroupTableEdit(row) {
      if (!this.ip_group_table_is_editing) {
        this.$refs.ip_group_table.toggleRowExpansion(row, true)
        this.ip_group_table_is_editing = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";

.three-column-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;

  .three-column-row-cell-1 {
    display: flex;
    align-items: center;
    width: 174px;
  }

  .three-column-row-cell-2 {
    display: flex;
    align-items: center;
    width: 180px;
  }

  .three-column-row-cell-3 {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}

.div_47zfl0 {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_u7l6k8 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_oau1uk {
  font-size: 18px
}

.span_l68ts3 {
  font-size: 12px;
  margin-left: 5px
}

.div_6pg2cg {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_sisiky {
  font-size: 18px
}

.span_gxdc99 {
  font-size: 12px;
  margin-left: 5px
}

.div_a70bnw {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_486mos {
  flex: 1;
}

.div_3pu4w5 {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_n1246u {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_yird1d {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_pm8nfv {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_xtkwpo {
  max-width: 232px;
}

.div_2ruh7r {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_qs2vwa {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_nh5g6v {
  flex: 1;
  display: flex;
  align-items: center
}

.div_ms127e {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_d2ck70 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_518lp2 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_lacyzq {
  width: 115px;
}

.span_2sso2g {
  color: #000000;
  font-size: 12px;
  margin: 0 5px
}

.el-input_t4g9t7 {
  width: 115px;
}

.div_o6mwxe {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_qyc451 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_51dzl1 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_xqjk0t {
  width: 115px;
}

.span_d29lpr {
  color: #000000;
  font-size: 12px;
  margin: 0 5px
}

.el-input_bfywkc {
  width: 115px;
}

.div_i66lqy {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_4wwc60 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_tjsrvi {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_retbp0 {
  max-width: 232px;
}

.span_adbj5v {
  color: #000000;
  font-size: 12px
}

.div_ban5df {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_4shi6b {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_v4ziwy {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_nwuy7k {
  max-width: 232px;
}

.span_tlkxx4 {
  color: #000000;
  font-size: 12px
}

.div_cga3w2 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_o07po7 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_9mlvzm {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_n5c8kp {
  max-width: 232px;
}

.span_vujp55 {
  color: #000000;
  font-size: 12px
}

.div_mc7o3z {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_xno0n6 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_7xyugr {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_yz1804 {
  max-width: 232px;
}

.span_7ggglq {
  color: #000000;
  font-size: 12px
}

.div_i961v0 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_b8j3b5 {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_b3707q {
  width: 100%
}

.div_qg1oky {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_k5cay8 {
  font-size: 16px
}

.span_okwq7x {
  font-size: 16px;
  margin-left: 8px
}
</style>

