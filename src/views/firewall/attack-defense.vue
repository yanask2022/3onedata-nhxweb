<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="AttackDefense" name="attackDefense">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">Flood Defense</h1>
              <div class="two-column-row-container">
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="enable_multi_connections_tcp_flood">Multi-connections TCP SYN Flood</el-checkbox>
                  </div>
                  <div class="col-2">
                    <el-input v-model="multi_tcp" size="mini" :disabled="!enable_multi_connections_tcp_flood"></el-input>
                    <span class="unit">Pkt/s</span>
                  </div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="enable_multi_connections_udp_flood">Multi-connections UDP Flood</el-checkbox>
                  </div>
                  <div class="col-2">
                    <el-input v-model="multi_udp" size="mini" :disabled="!enable_multi_connections_udp_flood"></el-input>
                    <span class="unit">Pkt/s</span>
                  </div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="enable_multi_connections_icmp_flood">Multi-connections ICMP Flood</el-checkbox>
                  </div>
                  <div class="col-2">
                    <el-input v-model="multi_icmp" size="mini" :disabled="!enable_multi_connections_icmp_flood"></el-input>
                    <span class="unit">Pkt/s</span>
                  </div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="enable_stationary_source_tcp_syn_flood">Stationary source TCP SYN Flood
                    </el-checkbox>
                  </div>
                  <div class="col-2">
                    <el-input v-model="source_tcp" size="mini" :disabled="!enable_stationary_source_tcp_syn_flood"></el-input>
                    <span class="unit">Pkt/s</span>
                  </div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="stationary_source_udp_flood">Stationary source TCP SYN Flood
                    </el-checkbox>
                  </div>
                  <div class="col-2">
                    <el-input v-model="source_upd" size="mini" :disabled="!stationary_source_udp_flood"></el-input>
                    <span class="unit">Pkt/s</span>
                  </div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="stationary_source_icmp_flood">Stationary source UDP Flood</el-checkbox>
                  </div>
                  <div class="col-2">
                    <el-input v-model="source_icmp" size="mini" :disabled="!stationary_source_icmp_flood"></el-input>
                    <span class="unit">Pkt/s</span>
                  </div>
                </div>
              </div>
            </el-col>

            <el-col :span="24">
              <h1 class="panel-title">Packet Anomaly Defense</h1>
              <div class="two-column-row-container">
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox :value="true" disabled>Block Fragment Traffic</el-checkbox>
                  </div>
                  <div class="col-2"></div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox :value="true" disabled>Block TCP Scan (Stealth FIN/Xmas/Null)</el-checkbox>
                  </div>
                  <div class="col-2"></div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox :value="true" disabled>Block Ping of Death</el-checkbox>
                  </div>
                  <div class="col-2"></div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="B_WAN">Block Ping from WAN
                    </el-checkbox>
                  </div>
                  <div class="col-2"></div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="B_WinNuke">Block WinNuke attack
                    </el-checkbox>
                  </div>
                  <div class="col-2"></div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="B_T_P_WITH_SYN_FIN">Block TCP packets with SYN and FIN Bits set
                    </el-checkbox>
                  </div>
                  <div class="col-2"></div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="B_T_P_WITH_FIN_NO_ACK">Block TCP packets with FIN Bit set but no ACK Bit set
                    </el-checkbox>
                  </div>
                  <div class="col-2"></div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">
                    <el-checkbox v-model="block_packets_with_specified_ip_options">Block packets with specified IP options
                    </el-checkbox>
                  </div>
                  <div class="col-2"></div>
                </div>
                <div class="two-column-row div_lab9e">
                  <div class="div_dpw0v8">
                    <el-checkbox v-model="block_options.security_option" :disabled="!block_packets_with_specified_ip_options">Security
                      Option
                    </el-checkbox>
                    <el-checkbox v-model="block_options.loose_source_route_option" :disabled="!block_packets_with_specified_ip_options">Loose Source
                      Route Option
                    </el-checkbox>
                    <el-checkbox v-model="block_options.strict_source_route_option" :disabled="!block_packets_with_specified_ip_options">Strict Source
                      Route Option
                    </el-checkbox>
                    <el-checkbox v-model="block_options.record_route_option" :disabled="!block_packets_with_specified_ip_options">Record Route
                      Option
                    </el-checkbox>
                    <el-checkbox v-model="block_options.stream_option" :disabled="!block_packets_with_specified_ip_options">Stream
                      Option
                    </el-checkbox>
                    <el-checkbox v-model="block_options.timestamp_option" :disabled="!block_packets_with_specified_ip_options">Timestamp
                      Option
                    </el-checkbox>
                    <el-checkbox v-model="block_options.no_operation_option" :disabled="!block_packets_with_specified_ip_options">No Operation
                      Option
                    </el-checkbox>
                  </div>
                </div>

                <div class="two-column-row div_bc2kj4">
                  <el-button size="mini">Save</el-button>
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
  name: 'AttackDefense',
  data() {
    return {
      activeName: 'attackDefense',
      enable_multi_connections_tcp_flood: false,
      enable_multi_connections_udp_flood: false,
      enable_multi_connections_icmp_flood: false,
      enable_stationary_source_tcp_syn_flood: false,
      stationary_source_udp_flood: false,
      stationary_source_icmp_flood: false,
      multi_tcp: '1000',
      multi_udp: '12000',
      multi_icmp: '1500',
      source_tcp: '4000',
      source_upd: '6000',
      source_icmp: '600',
      block_large_ping: false,
      block_large_ping_value: '2121',
      block_packets_with_specified_ip_options: false,
      B_T_P_WITH_FIN_NO_ACK: false,
      B_T_P_WITH_SYN_FIN: false,
      B_WinNuke: false,
      B_WAN: false,
      block_options: {
        security_option: false,
        loose_source_route_option: false,
        strict_source_route_option: false,
        record_route_option: false,
        stream_option: false,
        timestamp_option: false,
        no_operation_option: false
      }
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
      width: 294px;
    }

    .col-2 {
      display: flex;
      align-items: center;
      width: 220px;

      .unit {
        margin-left: 5px;
      }
    }
  }
}

.div_lab9e {
  margin-left: 20px
}

.div_dpw0v8 {
  display: flex;
  width: 450px;
  height: 100px;
  align-content: space-between;
  flex-wrap: wrap
}

.div_bc2kj4 {
  margin-top: 50px
}

</style>
