<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="LAN" name="LAN">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <div>
                <h1 class="panel-title">
                  General
                </h1>
                <!--<el-row>-->
                <!--  <el-col :span="10">IPv6:</el-col>-->
                <!--  <el-col :span="14"><el-checkbox :value="false">Enable</el-checkbox></el-col>-->
                <!--</el-row>-->
                <div class="two-column-container">
                  <span class="width-200">IPV6:</span>
                  <el-checkbox v-model="lanConfig.enable_ipv6">Enable</el-checkbox>
                </div>
                <div class="margin-top-20">
                  <el-button size="mini">Save</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="content-container">
                <h1 class="panel-title">
                  LAN
                </h1>

                <!--Assigned Type:-->
                <div class="two-column-container">
                  <div class="width-200">
                    Assigned Type:
                  </div>
                  <div class="display-flex font-size-primary">
                    <el-radio-group v-model="lanConfig.Assigned_Type" :disabled="!lanConfig.enable_ipv6">
                      <el-radio :label="1">DHCPv6</el-radio>
                      <el-radio :label="2">SLAAC+Stateless DHCP</el-radio>
                      <el-radio :label="3">SLAAC+RDNSS</el-radio>
                    </el-radio-group>
                  </div>
                </div>

                <!--Address Prefix: -->
                <div class="two-column-container">
                  <div class="width-200">
                    Address Prefix:
                  </div>
                  <div class="display-flex font-size-primary align-center">
                    <el-input
                      v-model="lanConfig.prefix"
                      :disabled="!lanConfig.enable_ipv6"
                      class="width-400 margin-right-10"
                    />
                    <span>/64</span>
                  </div>
                </div>

                <!--Release Time: -->
                <div
                  v-if="lanConfig.Assigned_Type == 1"
                  class="two-column-container"
                >
                  <div class="width-200">
                    Release Time:
                  </div>
                  <div class="display-flex font-size-primary align-center">
                    <el-input
                      v-model="lanConfig.Release_Time"
                      :disabled="!lanConfig.enable_ipv6"
                      class="width-100 margin-right-10"
                    />
                    <span>seconds. (The default is 86400, do not change unless necessary.)</span>
                  </div>
                </div>

                <!--Address  -->
                <div class="two-column-container">
                  <div class="width-200">
                    Address:
                  </div>
                  <div class="display-flex font-size-primary align-center">
                    <span>FE80::20A:EBFF:FE61:2011/64</span>
                  </div>
                </div>
                <div class="margin-top-20">
                  <el-button size="mini" :disabled="!lanConfig.enable_ipv6">Save</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>

      <el-tab-pane label="WAN1" name="WAN1">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <div>
                <h1 class="panel-title">
                  General
                </h1>
                <div class="two-column-container">
                  <span class="width-200">IPV6:</span>
                  <el-checkbox v-model="WAN1_Config.enable_ipv6">Enable</el-checkbox>
                </div>
                <div class="margin-top-20">
                  <el-button size="mini">Save</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="content-container">
                <h1 class="panel-title">
                  Internet
                </h1>

                <!--Internet Connection Type:-->
                <div class="two-column-container">
                  <div class="width-200">
                    Internet Connection Type:
                  </div>
                  <div class="display-flex font-size-primary">
                    <el-select
                      v-model="WAN1_Config.internet_connection_type"
                      :disabled="!WAN1_Config.enable_ipv6"
                      placeholder="请选择"
                    >
                      <el-option label="Static IP" value="1" />
                      <el-option label="Dynamic IP(SLAAC/DHCPv6)" value="2" />
                      <el-option label="PPPoE" value="3" />
                      <el-option label="6to4Tunnel" value="4" />
                      <el-option label="Pass-Through(Bridge)" value="5" />
                    </el-select>
                  </div>
                </div>

                <div v-if="WAN1_Config.enable_ipv6">
                  <div v-if="WAN1_Config.internet_connection_type == 1 ">
                    <!-- IPV6 手动-->
                    <div class="two-column-container">
                      <div class="width-200">
                        IPv6 Address:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN1_Config.static_ip_config.ipv6_address" class="width-400" />
                      </div>
                    </div>

                    <!--Default Gateway:-->
                    <div class="two-column-container">
                      <div class="width-200">
                        Default Gateway:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN1_Config.static_ip_config.default_gateway" class="width-400" />
                      </div>
                    </div>

                    <!--Primary DNS:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Primary DNS:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN1_Config.static_ip_config.primary_dns" class="width-400" />
                      </div>
                    </div>

                    <!--Secondary DNS::-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Secondary DNS:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN1_Config.static_ip_config.secondary_dns" class="width-400" />
                      </div>
                    </div>

                  </div>
                  <div v-if="WAN1_Config.internet_connection_type == 2 ">
                    <!-- IPV6 动态-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        IPv6 Address:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN1_Config.dynamic_ip_config.ipv6_address" class="width-400" disabled />
                      </div>
                    </div>

                    <!--Primary DNS:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Primary DNS:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN1_Config.dynamic_ip_config.primary_dns" class="width-400" disabled />
                      </div>
                    </div>

                    <!--Secondary DNS::-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Secondary DNS:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN1_Config.dynamic_ip_config.secondary_dns" class="width-400" disabled />
                      </div>
                    </div>

                    <!-- 续租， 释放按钮-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        <el-button size="mini"> Renew</el-button>
                        <el-button size="mini"> Release</el-button>
                      </div>
                      <div class="display-flex font-size-primary align-center" />
                    </div>

                    <!-- 折叠，展开高级功能-->
                    <div
                      class="two-column-container"
                    >
                      <div
                        class="expand-container"
                        @click="WAN1_Config.dynamic_ip_config.expandAdvanced = !WAN1_Config.dynamic_ip_config.expandAdvanced"
                      >
                        <el-icon
                          v-show="WAN1_Config.dynamic_ip_config.expandAdvanced"
                          class="el-icon-caret-top expand-advance-arrow"
                        />
                        <el-icon
                          v-show="!WAN1_Config.dynamic_ip_config.expandAdvanced"
                          class="el-icon-caret-bottom expand-advance-arrow"
                        />
                        <span>Advanced</span>
                      </div>
                      <div class="display-flex font-size-primary align-center" />
                    </div>

                    <div v-if="WAN1_Config.dynamic_ip_config.expandAdvanced">
                      <!--Get IPv6 Address: -->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Get IPv6 Address:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-radio-group v-model="WAN1_Config.dynamic_ip_config.advanced.ipv6_from">
                            <el-radio :label="1">DHCPv6</el-radio>
                            <el-radio :label="2">SLAAC+Stateless DHCP</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <!--Prefix Delegation: -->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Prefix Delegation:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-radio-group v-model="WAN1_Config.dynamic_ip_config.advanced.prefix">
                            <el-radio :label="1">Enable</el-radio>
                            <el-radio :label="2">Disable</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <!--DNS Address: -->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Prefix Delegation:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-radio-group v-model="WAN1_Config.dynamic_ip_config.advanced.dns_from">
                            <el-radio :label="1">Get dynamically from ISP</el-radio>
                            <el-radio :label="2">Use the following DNS Addresses</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <!--  Primary DNS:-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Primary DNS:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input
                            v-model="WAN1_Config.dynamic_ip_config.advanced.primary_dns"
                            class="width-400"
                            :disabled="WAN1_Config.dynamic_ip_config.advanced.dns_from == 1"
                          />
                        </div>
                      </div>

                      <!--  Secondary DNS:-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Secondary DNS:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input
                            v-model="WAN1_Config.dynamic_ip_config.advanced.secondary_dns"
                            class="width-400"
                            :disabled="WAN1_Config.dynamic_ip_config.advanced.dns_from == 1"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  <!--PPPoE-->
                  <div v-if="WAN1_Config.internet_connection_type == 3 ">

                    <!--username-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Username:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN1_Config.pppoe_ip_config.username" class="width-400" />
                      </div>
                    </div>

                    <!--Password:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Password:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN1_Config.pppoe_ip_config.password" class="width-400" />
                      </div>
                    </div>

                    <!--ipv6_address:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Password:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN1_Config.pppoe_ip_config.ipv6_address" class="width-400" disabled />
                      </div>
                    </div>

                    <!-- 折叠，展开高级功能-->
                    <div
                      class="two-column-container"
                    >
                      <div
                        class="expand-container"
                        @click="WAN1_Config.pppoe_ip_config.expandAdvanced = !WAN1_Config.pppoe_ip_config.expandAdvanced"
                      >
                        <el-icon
                          v-show="WAN1_Config.pppoe_ip_config.expandAdvanced"
                          class="el-icon-caret-top expand-advance-arrow"
                        />
                        <el-icon
                          v-show="!WAN1_Config.pppoe_ip_config.expandAdvanced"
                          class="el-icon-caret-bottom expand-advance-arrow"
                        />
                        <span>Advanced</span>
                      </div>
                      <div class="display-flex font-size-primary align-center" />
                    </div>

                    <!--高级功能设计-->
                    <div v-if="WAN1_Config.pppoe_ip_config.expandAdvanced">

                      <!-- Get IPV6 from-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Get IPv6 Address:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-radio-group v-model="WAN1_Config.pppoe_ip_config.advanced.ipv6_from">
                            <el-radio :label="1">DHCPv6</el-radio>
                            <el-radio :label="2">SLAAC+Stateless DHCP</el-radio>
                            <el-radio :label="3">Specified by ISP</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <!--Prefix Delegation-->
                      <div
                        v-if="WAN1_Config.pppoe_ip_config.advanced.ipv6_from == 1 || WAN1_Config.pppoe_ip_config.advanced.ipv6_from == 2"
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Prefix Delegation:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-radio-group v-model="WAN1_Config.pppoe_ip_config.advanced.prefix_delegation">
                            <el-radio :label="1">Enable</el-radio>
                            <el-radio :label="2">Disable</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <!-- IPv6 Address:-->
                      <div
                        v-if="WAN1_Config.pppoe_ip_config.advanced.ipv6_from == 3"
                        class="two-column-container"
                      >
                        <div class="width-200">
                          IPv6 Address:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input v-model="WAN1_Config.pppoe_ip_config.advanced.ipv6_address" class="width-400" />
                        </div>
                      </div>

                      <!--DNS Address: -->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Prefix Delegation:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-radio-group v-model="WAN1_Config.pppoe_ip_config.advanced.dns_from">
                            <el-radio :label="1">Get dynamically from ISP</el-radio>
                            <el-radio :label="2">Use the following DNS Addresses</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <!--  Primary DNS:-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Primary DNS:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input
                            v-model="WAN1_Config.pppoe_ip_config.advanced.primary_dns"
                            class="width-400"
                            :disabled="WAN1_Config.pppoe_ip_config.advanced.dns_from == 1"
                          />
                        </div>
                      </div>

                      <!--  Secondary DNS:-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Secondary DNS:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input
                            v-model="WAN1_Config.pppoe_ip_config.advanced.secondary_dns"
                            class="width-400"
                            :disabled="WAN1_Config.pppoe_ip_config.advanced.dns_from == 1"
                          />
                        </div>
                      </div>

                    </div>

                  </div>
                  <div v-if="WAN1_Config.internet_connection_type == 4 ">
                    <!--IPv4-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        IPv4 Address:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input
                          v-model="WAN1_Config.six_to_four_tunnel_config.ipv4_address"
                          class="width-400"
                          disabled
                        />
                      </div>
                    </div>

                    <!--IPv4 Subnet Mask:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        IPv4 Subnet Mask:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input
                          v-model="WAN1_Config.six_to_four_tunnel_config.ipv4_subnet_mask"
                          class="width-400"
                          disabled
                        />
                      </div>
                    </div>

                    <!--IPv4 Default Gateway:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        IPv4 Default Gateway:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input
                          v-model="WAN1_Config.six_to_four_tunnel_config.ipv4_default_gateway"
                          class="width-400"
                          disabled
                        />
                      </div>
                    </div>

                    <!--Tunnel Address::-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Tunnel Address:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input
                          v-model="WAN1_Config.six_to_four_tunnel_config.tunnel_address"
                          class="width-400"
                          disabled
                        />
                      </div>
                    </div>

                    <!-- 展开/折叠高级设置-->
                    <div
                      class="two-column-container"
                    >
                      <div
                        class="expand-container"
                        @click="WAN1_Config.six_to_four_tunnel_config.expandAdvanced = !WAN1_Config.six_to_four_tunnel_config.expandAdvanced"
                      >
                        <el-icon
                          v-show="WAN1_Config.six_to_four_tunnel_config.expandAdvanced"
                          class="el-icon-caret-top expand-advance-arrow"
                        />
                        <el-icon
                          v-show="!WAN1_Config.six_to_four_tunnel_config.expandAdvanced"
                          class="el-icon-caret-bottom expand-advance-arrow"
                        />
                        <span>Advanced</span>
                      </div>
                      <div class="display-flex font-size-primary align-center" />
                    </div>

                    <div v-if="WAN1_Config.six_to_four_tunnel_config.expandAdvanced">

                      <!-- Use the following DNS Server-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          <!--Primary DNS:-->
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-checkbox v-model="WAN1_Config.six_to_four_tunnel_config.specified_dns_server">
                            Use the following DNS Server
                          </el-checkbox>
                        </div>
                      </div>

                      <!--  Primary DNS:-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Primary DNS:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input
                            v-model="WAN1_Config.six_to_four_tunnel_config.advanced.primary_dns"
                            class="width-400"
                            :disabled="!WAN1_Config.six_to_four_tunnel_config.specified_dns_server"
                          />
                        </div>
                      </div>

                      <!--  Secondary DNS:-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Secondary DNS:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input
                            v-model="WAN1_Config.pppoe_ip_config.advanced.secondary_dns"
                            class="width-400"
                            :disabled="!WAN1_Config.six_to_four_tunnel_config.specified_dns_server"
                          />
                        </div>
                      </div>

                    </div>

                  </div>
                  <div v-if="WAN1_Config.internet_connection_type == 5 ">
                    <!--  nothing-->
                  </div>
                </div>

                <div class="margin-top-20">
                  <el-button size="mini" :disabled="!WAN1_Config.enable_ipv6">Save</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>

      <el-tab-pane label="WAN2" name="WAN2">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <div>
                <h1 class="panel-title">
                  General
                </h1>
                <div class="two-column-container">
                  <span class="width-200">IPV6:</span>
                  <el-checkbox v-model="WAN2_Config.enable_ipv6">Enable</el-checkbox>
                </div>
                <div class="margin-top-20">
                  <el-button size="mini">Save</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="content-container">
                <h1 class="panel-title">
                  Internet
                </h1>

                <!--Internet Connection Type:-->
                <div
                  class="two-column-container"
                >
                  <div class="width-200">
                    Internet Connection Type:
                  </div>
                  <div class="display-flex font-size-primary">
                    <el-select
                      v-model="WAN2_Config.internet_connection_type"
                      :disabled="!WAN2_Config.enable_ipv6"
                      placeholder="请选择"
                    >
                      <el-option label="Static IP" value="1" />
                      <el-option label="Dynamic IP(SLAAC/DHCPv6)" value="2" />
                      <el-option label="PPPoE" value="3" />
                      <el-option label="6to4Tunnel" value="4" />
                      <el-option label="Pass-Through(Bridge)" value="5" />
                    </el-select>
                  </div>
                </div>

                <div v-if="WAN2_Config.enable_ipv6">
                  <div v-if="WAN2_Config.internet_connection_type == 1 ">
                    <!-- IPV6 手动-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        IPv6 Address:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN2_Config.static_ip_config.ipv6_address" class="width-400" />
                      </div>
                    </div>

                    <!--Default Gateway:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Default Gateway:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN2_Config.static_ip_config.default_gateway" class="width-400" />
                      </div>
                    </div>

                    <!--Primary DNS:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Primary DNS:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN2_Config.static_ip_config.primary_dns" class="width-400" />
                      </div>
                    </div>

                    <!--Secondary DNS::-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Secondary DNS:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN2_Config.static_ip_config.secondary_dns" class="width-400" />
                      </div>
                    </div>

                  </div>
                  <div v-if="WAN2_Config.internet_connection_type == 2 ">
                    <!-- IPV6 动态-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        IPv6 Address:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN2_Config.dynamic_ip_config.ipv6_address" class="width-400" disabled />
                      </div>
                    </div>

                    <!--Primary DNS:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Primary DNS:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN2_Config.dynamic_ip_config.primary_dns" class="width-400" disabled />
                      </div>
                    </div>

                    <!--Secondary DNS::-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Secondary DNS:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN2_Config.dynamic_ip_config.secondary_dns" class="width-400" disabled />
                      </div>
                    </div>

                    <!-- 续租， 释放按钮-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        <el-button size="mini"> Renew</el-button>
                        <el-button size="mini"> Release</el-button>
                      </div>
                      <div class="display-flex font-size-primary align-center" />
                    </div>

                    <!-- 折叠，展开高级功能-->
                    <div
                      class="two-column-container"
                    >
                      <div
                        class="expand-container"
                        @click="WAN2_Config.dynamic_ip_config.expandAdvanced = !WAN2_Config.dynamic_ip_config.expandAdvanced"
                      >
                        <el-icon
                          v-show="WAN2_Config.dynamic_ip_config.expandAdvanced"
                          class="el-icon-caret-top expand-advance-arrow"
                        />
                        <el-icon
                          v-show="!WAN2_Config.dynamic_ip_config.expandAdvanced"
                          class="el-icon-caret-bottom expand-advance-arrow"
                        />
                        <span>Advanced</span>
                      </div>
                      <div class="display-flex font-size-primary align-center" />
                    </div>

                    <div v-if="WAN2_Config.dynamic_ip_config.expandAdvanced">
                      <!--Get IPv6 Address: -->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Get IPv6 Address:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-radio-group v-model="WAN2_Config.dynamic_ip_config.advanced.ipv6_from">
                            <el-radio :label="1">DHCPv6</el-radio>
                            <el-radio :label="2">SLAAC+Stateless DHCP</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <!--Prefix Delegation: -->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Prefix Delegation:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-radio-group v-model="WAN2_Config.dynamic_ip_config.advanced.prefix">
                            <el-radio :label="1">Enable</el-radio>
                            <el-radio :label="2">Disable</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <!--DNS Address: -->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Prefix Delegation:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-radio-group v-model="WAN2_Config.dynamic_ip_config.advanced.dns_from">
                            <el-radio :label="1">Get dynamically from ISP</el-radio>
                            <el-radio :label="2">Use the following DNS Addresses</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <!--  Primary DNS:-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Primary DNS:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input
                            v-model="WAN2_Config.dynamic_ip_config.advanced.primary_dns"
                            class="width-400"
                            :disabled="WAN2_Config.dynamic_ip_config.advanced.dns_from == 1"
                          />
                        </div>
                      </div>

                      <!--  Secondary DNS:-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Secondary DNS:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input
                            v-model="WAN2_Config.dynamic_ip_config.advanced.secondary_dns"
                            class="width-400"
                            :disabled="WAN2_Config.dynamic_ip_config.advanced.dns_from == 1"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  <!--PPPoE-->
                  <div v-if="WAN2_Config.internet_connection_type == 3 ">

                    <!--username-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Username:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN2_Config.pppoe_ip_config.username" class="width-400" />
                      </div>
                    </div>

                    <!--Password:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Password:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN2_Config.pppoe_ip_config.password" class="width-400" />
                      </div>
                    </div>

                    <!--ipv6_address:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Password:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input v-model="WAN2_Config.pppoe_ip_config.ipv6_address" class="width-400" disabled />
                      </div>
                    </div>

                    <!-- 折叠，展开高级功能-->
                    <div
                      class="two-column-container"
                    >
                      <div
                        class="expand-container"
                        @click="WAN2_Config.pppoe_ip_config.expandAdvanced = !WAN2_Config.pppoe_ip_config.expandAdvanced"
                      >
                        <el-icon
                          v-show="WAN2_Config.pppoe_ip_config.expandAdvanced"
                          class="el-icon-caret-top expand-advance-arrow"
                        />
                        <el-icon
                          v-show="!WAN2_Config.pppoe_ip_config.expandAdvanced"
                          class="el-icon-caret-bottom expand-advance-arrow"
                        />
                        <span>Advanced</span>
                      </div>
                      <div class="display-flex font-size-primary align-center" />
                    </div>

                    <!--高级功能设计-->
                    <div v-if="WAN2_Config.pppoe_ip_config.expandAdvanced">

                      <!-- Get IPV6 from-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Get IPv6 Address:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-radio-group v-model="WAN2_Config.pppoe_ip_config.advanced.ipv6_from">
                            <el-radio :label="1">DHCPv6</el-radio>
                            <el-radio :label="2">SLAAC+Stateless DHCP</el-radio>
                            <el-radio :label="3">Specified by ISP</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <!--Prefix Delegation-->
                      <div
                        v-if="WAN2_Config.pppoe_ip_config.advanced.ipv6_from == 1 || WAN2_Config.pppoe_ip_config.advanced.ipv6_from == 2"
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Prefix Delegation:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-radio-group v-model="WAN2_Config.pppoe_ip_config.advanced.prefix_delegation">
                            <el-radio :label="1">Enable</el-radio>
                            <el-radio :label="2">Disable</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <!-- IPv6 Address:-->
                      <div
                        v-if="WAN2_Config.pppoe_ip_config.advanced.ipv6_from == 3"
                        class="two-column-container"
                      >
                        <div class="width-200">
                          IPv6 Address:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input v-model="WAN2_Config.pppoe_ip_config.advanced.ipv6_address" class="width-400" />
                        </div>
                      </div>

                      <!--DNS Address: -->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Prefix Delegation:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-radio-group v-model="WAN2_Config.pppoe_ip_config.advanced.dns_from">
                            <el-radio :label="1">Get dynamically from ISP</el-radio>
                            <el-radio :label="2">Use the following DNS Addresses</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <!--  Primary DNS:-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Primary DNS:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input
                            v-model="WAN2_Config.pppoe_ip_config.advanced.primary_dns"
                            class="width-400"
                            :disabled="WAN2_Config.pppoe_ip_config.advanced.dns_from == 1"
                          />
                        </div>
                      </div>

                      <!--  Secondary DNS:-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Secondary DNS:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input
                            v-model="WAN2_Config.pppoe_ip_config.advanced.secondary_dns"
                            class="width-400"
                            :disabled="WAN2_Config.pppoe_ip_config.advanced.dns_from == 1"
                          />
                        </div>
                      </div>

                    </div>

                  </div>
                  <div v-if="WAN2_Config.internet_connection_type == 4 ">
                    <!--IPv4-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        IPv4 Address:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input
                          v-model="WAN2_Config.six_to_four_tunnel_config.ipv4_address"
                          class="width-400"
                          disabled
                        />
                      </div>
                    </div>

                    <!--IPv4 Subnet Mask:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        IPv4 Subnet Mask:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input
                          v-model="WAN2_Config.six_to_four_tunnel_config.ipv4_subnet_mask"
                          class="width-400"
                          disabled
                        />
                      </div>
                    </div>

                    <!--IPv4 Default Gateway:-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        IPv4 Default Gateway:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input
                          v-model="WAN2_Config.six_to_four_tunnel_config.ipv4_default_gateway"
                          class="width-400"
                          disabled
                        />
                      </div>
                    </div>

                    <!--Tunnel Address::-->
                    <div
                      class="two-column-container"
                    >
                      <div class="width-200">
                        Tunnel Address:
                      </div>
                      <div class="display-flex font-size-primary align-center">
                        <el-input
                          v-model="WAN2_Config.six_to_four_tunnel_config.tunnel_address"
                          class="width-400"
                          disabled
                        />
                      </div>
                    </div>

                    <!-- 展开/折叠高级设置-->
                    <div
                      class="two-column-container"
                    >
                      <div
                        class="expand-container"
                        @click="WAN2_Config.six_to_four_tunnel_config.expandAdvanced = !WAN2_Config.six_to_four_tunnel_config.expandAdvanced"
                      >
                        <el-icon
                          v-show="WAN2_Config.six_to_four_tunnel_config.expandAdvanced"
                          class="el-icon-caret-top expand-advance-arrow"
                        />
                        <el-icon
                          v-show="!WAN2_Config.six_to_four_tunnel_config.expandAdvanced"
                          class="el-icon-caret-bottom expand-advance-arrow"
                        />
                        <span>Advanced</span>
                      </div>
                      <div class="display-flex font-size-primary align-center" />
                    </div>

                    <div v-if="WAN2_Config.six_to_four_tunnel_config.expandAdvanced">

                      <!-- Use the following DNS Server-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          <!--Primary DNS:-->
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-checkbox v-model="WAN2_Config.six_to_four_tunnel_config.specified_dns_server">
                            Use the following DNS Server
                          </el-checkbox>
                        </div>
                      </div>

                      <!--  Primary DNS:-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Primary DNS:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input
                            v-model="WAN2_Config.six_to_four_tunnel_config.advanced.primary_dns"
                            class="width-400"
                            :disabled="!WAN2_Config.six_to_four_tunnel_config.specified_dns_server"
                          />
                        </div>
                      </div>

                      <!--  Secondary DNS:-->
                      <div
                        class="two-column-container"
                      >
                        <div class="width-200">
                          Secondary DNS:
                        </div>
                        <div class="display-flex font-size-primary align-center">
                          <el-input
                            v-model="WAN2_Config.pppoe_ip_config.advanced.secondary_dns"
                            class="width-400"
                            :disabled="!WAN2_Config.six_to_four_tunnel_config.specified_dns_server"
                          />
                        </div>
                      </div>

                    </div>

                  </div>
                  <div v-if="WAN2_Config.internet_connection_type == 5 ">
                    <!--  nothing-->
                  </div>
                </div>

                <div class="margin-top-20">
                  <el-button size="mini" :disabled="!WAN2_Config.enable_ipv6">Save</el-button>
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
  name: 'IPV6',
  data() {
    return {
      activeName: 'LAN',
      lanConfig: {
        enable_ipv6: false,
        Assigned_Type: 1,
        prefix: '',
        Release_Time: '86400'
      },
      WAN1_Config: {
        enable_ipv6: false,
        internet_connection_type: '1',
        // 静态配置
        static_ip_config: {
          ipv6_address: '',
          default_gateway: '',
          primary_dns: '',
          secondary_dns: ''
        },
        // 动态v6配置
        dynamic_ip_config: {
          ipv6_address: '',
          primary_dns: '',
          secondary_dns: '',
          // 使用高级配置
          expandAdvanced: false,
          advanced: {
            ipv6_from: 1,
            prefix: 1,
            dns_from: 1,
            primary_dns: '',
            secondary_dns: ''
          }
        },
        // PPPoE 配置
        pppoe_ip_config: {
          username: '',
          password: '',
          ipv6_address: '',
          // 使用高级配置
          expandAdvanced: false,
          advanced: {
            ipv6_from: 1,
            prefix_delegation: 1,
            specified_ipv6_by_isp: '',
            ipv6_address: '',
            dns_from: 1,
            primary_dns: '',
            secondary_dns: ''
          }
        },
        // 6to4tunnel
        six_to_four_tunnel_config: {
          ipv4_address: '',
          ipv4_subnet_mask: '',
          ipv4_default_gateway: '',
          tunnel_address: '',
          expandAdvanced: true,
          specified_dns_server: false,
          advanced: {
            primary_dns: '',
            secondary_dns: ''

          }
        }

      },
      WAN2_Config: {
        enable_ipv6: false,
        internet_connection_type: '1',
        // 静态配置
        static_ip_config: {
          ipv6_address: '',
          default_gateway: '',
          primary_dns: '',
          secondary_dns: ''
        },
        // 动态v6配置
        dynamic_ip_config: {
          ipv6_address: '',
          primary_dns: '',
          secondary_dns: '',
          // 使用高级配置
          expandAdvanced: false,
          advanced: {
            ipv6_from: 1,
            prefix: 1,
            dns_from: 1,
            primary_dns: '',
            secondary_dns: ''
          }
        },
        // PPPoE 配置
        pppoe_ip_config: {
          username: '',
          password: '',
          ipv6_address: '',
          // 使用高级配置
          expandAdvanced: false,
          advanced: {
            ipv6_from: 1,
            prefix_delegation: 1,
            specified_ipv6_by_isp: '',
            ipv6_address: '',
            dns_from: 1,
            primary_dns: '',
            secondary_dns: ''
          }
        },
        // 6to4tunnel
        six_to_four_tunnel_config: {
          ipv4_address: '',
          ipv4_subnet_mask: '',
          ipv4_default_gateway: '',
          tunnel_address: '',
          expandAdvanced: true,
          specified_dns_server: false,
          advanced: {
            primary_dns: '',
            secondary_dns: ''
          }
        }
      }
    }
  },
  mounted() {
    // this.mockData()
  },
  methods: {
    onExpandChange(row, expandedRows) {
      console.log('onExpandChange')
      //
    },
    mockData() {
      setTimeout(() => {
        this.tableData = [
          {
            id: 1,
            date: '2016-05-03',
            ports: '1(UNTAG)',
            name: '6546',
            address: 'vlan6',
            description: 'Default Vlan For WAN2',
            canSelect: false
          }, {
            description: 'Default Vlan For WAN2',
            id: 2,
            ports: '1(UNTAG)',
            date: '2016-05-02',
            name: '4',
            address: 'vlan56',
            canSelect: false
          }, {
            description: 'Default Vlan For WAN2',
            id: 3,
            ports: '1(UNTAG)',
            date: '2016-05-04',
            name: '432',
            address: 'vlan46',
            canSelect: true
          }, {
            id: 4,
            description: 'Default Vlan For WAN2',
            ports: '2(TAG)',
            date: '2016-05-01',
            name: '432432',
            address: 'vlan326',
            canSelect: true
          }, {
            id: 5,
            description: '',
            date: '2016-05-08',
            ports: '1(UNTAG)',
            name: '3434',
            address: 'vlan4326',
            canSelect: true
          }, {
            id: 6,
            description: 'Default Vlan For WAN2',
            date: '2016-05-06',
            ports: '2(TAG)',
            name: '121',
            address: 'vlan632',
            canSelect: true
          }]
        this.tableLoading = false
      }, 500)
    },
    onAddItem() {
      if (!this.isEditing) {
        const tempid = this.tableData.length + 1
        this.tableData.unshift({
          id: tempid,
          date: '',
          name: '',
          address: '',
          ports: '',
          description: '',
          canSelect: true
        })
        this.expands = []
        this.expands.push(tempid)
        this.isEditing = true
      }
    },
    onDeleteSelected() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确认删除所选中记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.map((value, index) => {
            for (let i = 0; i < this.tableData.length; i++) {
              if (value.id === this.tableData[i].id) {
                this.tableData.splice(i, 1)
              }
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    handleDelete(row, index) {
      if (row.canSelect) {
        this.$confirm('确认删除此条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    handleEdit(row) {
      if (row.canSelect && this.isEditing === false) {
        this.$refs.multipleTable.toggleRowExpansion(row, true)
        this.isEditing = true
      }
    },
    onEditCancel(row) {
      this.$refs.multipleTable.toggleRowExpansion(row, false)
      this.isEditing = false
    },
    onEditDone(row) {
      console.log(row)
      this.tableLoading = true
      setTimeout(() => {
        this.isEditing = false
        this.$refs.multipleTable.toggleRowExpansion(row)
        this.tableLoading = false
      }, 500)
    },
    rowCanSelect(row) {
      return row.canSelect
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";
.two-column-container {
  width: 100%;padding: 20px 10px;display: flex; align-items: center;font-size: 12px
}
.expand-container {
  cursor: pointer;
  width: 200px;
  display: flex;
  align-items: center;

  &:hover {
    color: #867e7e;
  }
  .expand-advance-arrow {
    font-size: 24px;margin-right: 10px
  }
}

</style>
