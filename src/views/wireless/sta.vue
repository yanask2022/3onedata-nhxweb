<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="2.4GHz" name="TwoDotFour">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title"> Basic</h1>
              <div class="two-column-row-container">
                <div class="padding-bottom-15">
                  <span class="margin-right-10">2.4GHz STA Radio:</span>
                  <el-checkbox
                    v-model="two_disabled"
                    label="Enable"
                    true-label="0"
                    false-label="1"
                  />
                </div>
                <div class="margin-20-0">
                  <el-button size="mini" @click="onSaveTowSettings">Save</el-button>
                </div>
              </div>
              <h1 class="panel-title">Config</h1>
              <div class="two-column-row-container">
                <!--                <div class="btn-wrapper">-->
                <!--                  <div @click="onAdd" style="display: flex;align-items: center;justify-content: center">-->
                <!--                    <i class="el-icon-circle-plus font-size-18" />-->
                <!--                    <span class="font-size-primary margin-left-5">Add</span>-->
                <!--                  </div>-->
                <!--                </div>-->
                <el-table
                  ref="two_dot_four_table"
                  class="margin-top-20"
                  :default-sort="{prop: 'priority', order: 'ascending'}"
                  header-cell-class-name="header-class"
                  cell-class-name="cell-class"
                  :data="tow_dot_four_table_data"
                  border
                >
                  <el-table-column
                    width="1"
                    type="expand"
                    class-name="expand-column-class"
                  >
                    <template slot-scope="props">

                      <div class="template-wrapper">
                        <!-- SSID -->
                        <div class="template-wrapper-item">
                          <span class="template-wrapper-item-name">SSID:</span>
                          <div class="template-wrapper-item-name-select">
                            <el-input v-model="two_dot_edit_obj.ssid" class="width-232" size="mini" />
                          </div>
                        </div>

                        <!-- WDS -->
                        <div class="template-wrapper-item">
                          <span class="template-wrapper-item-name">WDS:</span>
                          <div class="template-wrapper-item-name-select">

                            <el-select v-model="two_dot_edit_obj.wds" size="mini" class="width-232">
                              <el-option value="1" label="Enable" />
                              <el-option value="0" label="Disabled" />
                            </el-select>
                          </div>
                        </div>

                        <div v-if="two_dot_edit_obj.wds == '1'" class="template-wrapper-item">
                          <span class="template-wrapper-item-name">Mac of Remote AP:</span>
                          <div class="template-wrapper-item-name-select">
                            <el-select
                              v-model="two_dot_edit_obj.mac_of_remote_ap"
                              class="width-232"
                              size="mini"
                              default-first-option
                              filterable
                              allow-create
                              placeholder="input directly or select"
                            >
                              <el-option
                                v-for="(item2) in ap_list"
                                :key="item2.bssid"
                                :label="item2.bssid"
                                :value="item2.bssid"
                              />
                            </el-select>

                            <el-checkbox
                              v-model="two_dot_edit_obj.lock_to_ap"
                              :disabled="!two_dot_edit_obj.mac_of_remote_ap"
                              class="margin-left-10"
                              @change="locktwoDotFourLockToAP"
                            >
                              Lock to AP
                            </el-checkbox>
                          </div>

                        </div>

                        <div class="template-wrapper-item">
                          <span class="template-wrapper-item-name">11K:</span>
                          <div class="template-wrapper-item-name-select">

                            <el-select v-model="two_dot_edit_obj.wnm" size="mini" class="width-232">
                              <el-option value="1" label="Enable" />
                              <el-option value="0" label="Disabled" />
                            </el-select>
                          </div>
                        </div>

                        <div class="template-wrapper-item">
                          <span class="template-wrapper-item-name">11V:</span>
                          <div class="template-wrapper-item-name-select">

                            <el-select v-model="two_dot_edit_obj.wnm" size="mini" class="width-232">
                              <el-option value="1" label="Enable" />
                              <el-option value="0" label="Disabled" />
                            </el-select>
                          </div>
                        </div>

                        <div class="template-wrapper-item">
                          <span
                            class="template-wrapper-item-name"
                          >Security Mode:</span>
                          <div class="template-wrapper-item-name-select">
                            <el-select v-model="two_dot_edit_obj.encryption" size="mini" class="width-232">
                              <el-option value="none" lable="None" />
                              <el-option value="mixed-psk" label="WPA-PSK" />
                              <el-option value="wpa3" label="WPA3" />
                            </el-select>
                          </div>
                        </div>

                        <div v-if="two_dot_edit_obj.encryption != 'none' " class="template-wrapper-item">
                          <span class="template-wrapper-item-name">Wireless Password:</span>
                          <div class="template-wrapper-item-name-select">
                            <el-input
                              v-model="two_dot_edit_obj.key"
                              size="mini"
                              class="max-width-232"
                            />
                          </div>
                        </div>

                        <div class="template-wrapper-item">
                          <span class="template-wrapper-item-name">Network:</span>
                          <div class="template-wrapper-item-name-select">
                            <el-select v-model="two_dot_edit_obj.network" size="mini" class="width-232">
                              <el-option value="lan" lable="LAN" />
                              <el-option value="wwan0" label="WWAN0" />
                            </el-select>
                          </div>
                        </div>

                        <div class="btns">
                          <div class="btns-wrapper">
                            <el-button size="mini" @click="onTwoTableRowEditDone(props.row)">OK</el-button>
                            <el-button size="mini" @click="onTwoTableRowEditCancel(props.row)">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>

                    </template>
                  </el-table-column>

                  <!--<el-table-column
                    prop="wifi-face"
                    label="wifi-face"
                    header-align="center"
                    align="center"
                  />-->
                  <el-table-column
                    prop="device"
                    label="device"
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    prop="bssid"
                    label="bssid"
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    prop="encryption"
                    label="Security"
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    prop="wnm"
                    label="11K"
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    prop="rrm"
                    label="11V"
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    prop="wds"
                    label="wds"
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    prop="disabled"
                    label="disabled"
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    prop="staDFSEn"
                    label="staDFSEn"
                    header-align="center"
                    align="center"
                  />

                  <el-table-column
                    label="Modify"
                    header-align="center"
                    align="center"
                  >
                    <template slot-scope="props">

                      <div class="edit-table-container">
                        <span class="font-size-16" @click="onTwoDotFourTableRowEdit(props.row)">
                          <i class=" el-icon-edit-outline" />
                        </span>
                        <!--<span class="font-size-16 margin-left-8" @click="onXXTableDelete(props.row, props.$index)">
                                        <i class="el-icon-remove" />
                                      </span>-->
                        <!--                        <span v-if="props.$index != (twoDotFourTableData.length -1)" class="font-size-16 margin-left-8" @click="moveDown(props.$index, props.row)">-->
                        <!--                          <i class="el-icon-bottom" />-->
                        <!--                        </span>-->
                        <!--                        <span v-if="props.$index != 0" class="font-size-16 margin-left-8" @click="moveUp( props.$index, props.row)">-->
                        <!--                          <i class="el-icon-top" />-->
                        <!--                        </span>-->
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <h1 class="panel-title margin-top-20 margin-bottom-15">AP List</h1>
              <div class="two-column-row-container">
                <div class="btn-wrapper">
                  <el-button size="mini" :class="{'scan-clicked':scanBtnClicked}" @click="onScan">Scan</el-button>
                </div>
                <el-table
                  v-if="showSTAList"
                  ref="ap_list"
                  :default-sort="{prop: 'signal', order: 'descending'}"
                  header-cell-class-name="header-class"
                  cell-class-name="cell-class"
                  :data="ap_list"
                  border
                  @selection-change="handleSelectionChange"
                >

                  <el-table-column
                    type="selection"
                    header-align="center"
                    align="center"
                    width="50"
                  />
                  <el-table-column
                    prop="ssid"
                    label="Network Name"
                    width="230"
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    prop="bssid"
                    label="BSSID"
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    prop="signal"
                    label="Signal"
                    sortable
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    prop="channel"
                    label="Channel"
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    prop="quality"
                    label="quality"
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    width="300"
                    prop="encryption.description"
                    label="Encryption"
                    header-align="center"
                    align="center"
                  />
                  <el-table-column
                    label="Operation"
                    header-align="center"
                    width="130"
                    align="center"
                  >
                    <template slot-scope="props">
                      <el-button size="mini" @click="onJoinNetwork(props.row)">Join Network</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="5GHz" name="Five">
        <div class="content-container">
          <div class="font-size-primary ">
            <h1 class="panel-title"> Basic</h1>
            <div class="two-column-row-container">
              <div class="padding-bottom-15">
                <span class="margin-right-10">5GHz STA Radio:</span>
                <el-checkbox
                  v-model="five_disabled"
                  label="Enable"
                  true-label="0"
                  false-label="1"
                />
              </div>
              <div class="margin-top-10 margin-bottom-10">
                <el-button size="mini" @click="onSaveFiveSettings">Save</el-button>
              </div>
            </div>
            <h1 class="panel-title">Config</h1>
            <div class="two-column-row-container">
              <!--              <div class="btn-wrapper">-->
              <!--                <div style="display: flex;align-items: center;justify-content: center" @click="onAdd">-->
              <!--                  <i class="el-icon-circle-plus font-size-18" />-->
              <!--                  <span class="font-size-primary margin-left-5">Add</span>-->
              <!--                </div>-->
              <!--              </div>-->
              <el-table
                ref="five_table"
                class="margin-top-20"
                :default-sort="{prop: 'priority', order: 'ascending'}"
                header-cell-class-name="header-class"
                cell-class-name="cell-class"
                :data="five_table_data"
                border
              >
                <el-table-column
                  width="1"
                  type="expand"
                  class-name="expand-column-class"
                >
                  <template slot-scope="props">

                    <div class="template-wrapper">
                      <!-- SSID -->
                      <div class="template-wrapper-item">
                        <span class="template-wrapper-item-name">SSID:</span>
                        <div class="template-wrapper-item-name-select">
                          <el-input v-model="five_edit_obj.ssid" class="width-232" size="mini" />
                        </div>
                      </div>

                      <!-- WDS -->
                      <div class="template-wrapper-item">
                        <span class="template-wrapper-item-name">WDS:</span>
                        <div class="template-wrapper-item-name-select">

                          <el-select v-model="five_edit_obj.wds" size="mini" class="width-232">
                            <el-option value="1" label="Enable" />
                            <el-option value="0" label="Disabled" />
                          </el-select>
                        </div>
                      </div>
                      <div v-if="five_edit_obj.wds == '1'" class="template-wrapper-item">
                        <span class="template-wrapper-item-name">Mac of Remote AP:</span>
                        <div class="template-wrapper-item-name-select">
                          <el-select
                            v-model="five_edit_obj.mac_of_remote_ap"
                            class="width-232"
                            size="mini"
                            default-first-option
                            filterable
                            allow-create
                            placeholder="input directly or select"
                          >
                            <el-option
                              v-for="(item2) in ap_list2"
                              :key="item2.bssid"
                              :label="item2.bssid"
                              :value="item2.bssid"
                            />
                          </el-select>

                          <el-checkbox
                            v-model="five_edit_obj.lock_to_ap"
                            :disabled="!five_edit_obj.mac_of_remote_ap"
                            class="margin-left-10"
                            @change="lockFiveLockToAP"
                          >
                            Lock to AP
                          </el-checkbox>
                        </div>

                      </div>

                      <div class="template-wrapper-item">
                        <span class="template-wrapper-item-name">11K:</span>
                        <div class="template-wrapper-item-name-select">

                          <el-select v-model="five_edit_obj.wnm" size="mini" class="width-232">
                            <el-option value="1" label="Enable" />
                            <el-option value="0" label="Disabled" />
                          </el-select>
                        </div>
                      </div>

                      <div class="template-wrapper-item">
                        <span class="template-wrapper-item-name">11V:</span>
                        <div class="template-wrapper-item-name-select">

                          <el-select v-model="five_edit_obj.rrm" size="mini" class="width-232">
                            <el-option value="1" label="Enable" />
                            <el-option value="0" label="Disabled" />
                          </el-select>
                        </div>
                      </div>
                      <div class="template-wrapper-item">
                        <span class="template-wrapper-item-name">Channel:</span>
                        <div class="template-wrapper-item-name-select">
                          <el-select
                            v-model="five_edit_obj.current_channel"
                            :disabled="five_edit_obj.lock_to_ap"
                            size="mini"
                            class="width-232"
                          >
                            <el-option
                              v-for="(chanOption, chanIndex) in five_edit_obj.chanlist"
                              :key="chanIndex"
                              :value="chanOption"
                              :lable="getChanLable(chanOption)"
                            />
                          </el-select>
                        </div>
                      </div>

                      <div class="template-wrapper-item">
                        <span
                          class="template-wrapper-item-name"
                        >Security Mode:</span>
                        <div class="template-wrapper-item-name-select">
                          <el-select v-model="five_edit_obj.encryption" size="mini" class="width-232">
                            <el-option value="none" lable="None" />
                            <el-option value="mixed-psk" label="mixed-psk" />
                            <el-option value="wpa3" label="WPA3" />
                          </el-select>
                        </div>
                      </div>

                      <div v-if="five_edit_obj.encryption != 'none' " class="template-wrapper-item">
                        <span class="template-wrapper-item-name">Wireless Password:</span>
                        <div class="template-wrapper-item-name-select">
                          <el-input
                            v-model="five_edit_obj.key"
                            size="mini"
                            class="max-width-232"
                          />
                        </div>
                      </div>

                      <div class="template-wrapper-item">
                        <span class="template-wrapper-item-name">Network:</span>
                        <div class="template-wrapper-item-name-select">
                          <el-select v-model="five_edit_obj.network" size="mini" class="width-232">
                            <el-option value="lan" lable="LAN" />
                            <el-option value="wwan1" label="WWAN1" />
                          </el-select>
                        </div>
                      </div>

                      <div class="btns">
                        <div class="btns-wrapper">
                          <el-button size="mini" @click="onFiveTableRowEditDone(props.row)">OK</el-button>
                          <el-button size="mini" @click="onFiveTableRowEditCancel(props.row)">Cancel
                          </el-button>
                        </div>
                      </div>
                    </div>

                  </template>
                </el-table-column>
                <el-table-column
                  sortable
                  prop="priority"
                  label="priority"
                  header-align="center"
                  align="center"
                />
                <!--<el-table-column
                  prop="wifi-face"
                  label="wifi-face"
                  header-align="center"
                  align="center"
                />-->
                <el-table-column
                  prop="device"
                  label="device"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="bssid"
                  label="bssid"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="encryption"
                  label="Security"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="ifname"
                  label="ifname"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="wnm"
                  label="11K"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="rrm"
                  label="11V"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="wds"
                  label="wds"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="disabled"
                  label="disabled"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="staDFSEn"
                  label="staDFSEn"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  label="Modify"
                  header-align="center"
                  align="center"
                >
                  <template slot-scope="props">

                    <div class="edit-table-container">
                      <span class="font-size-16" @click="onFiveTableRowEdit(props.row)">
                        <i class=" el-icon-edit-outline" />
                      </span>
                      <!--<span class="font-size-16 margin-left-8" @click="onXXTableDelete2(props.row, props.$index)">
                                    <i class="el-icon-remove" />
                                  </span>-->
                      <!--                      <span-->
                      <!--                        v-if="props.$index != (twoDotFourTableData.length -1)"-->
                      <!--                        class="font-size-16 margin-left-8"-->
                      <!--                        @click="moveDown2(props.$index, props.row)"-->
                      <!--                      >-->
                      <!--                        <i class="el-icon-bottom" />-->
                      <!--                      </span>-->
                      <!--                      <span-->
                      <!--                        v-if="props.$index != 0"-->
                      <!--                        class="font-size-16 margin-left-8"-->
                      <!--                        @click="moveUp2( props.$index, props.row)"-->
                      <!--                      >-->
                      <!--                        <i class="el-icon-top" />-->
                      <!--                      </span>-->
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <h1 class="panel-title margin-top-20 margin-bottom-15">AP List</h1>
            <div class="two-column-row-container">
              <div class="btn-wrapper">
                <el-button size="mini" :class="{'scan-clicked':scanBtnClicked}" @click="onScan2">Scan</el-button>
              </div>
              <el-table
                v-if="showSTAList2"
                ref="ap_list2"
                :default-sort="{prop: 'signal', order: 'descending'}"
                header-cell-class-name="header-class"
                cell-class-name="cell-class"
                :data="ap_list2"
                border
                @selection-change="handleSelectionChange"
              >

                <el-table-column
                  type="selection"
                  header-align="center"
                  align="center"
                  width="50"
                />
                <el-table-column
                  prop="ssid"
                  label="Network Name"
                  width="230"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="bssid"
                  label="BSSID"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="signal"
                  label="Signal"
                  sortable
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="channel"
                  label="Channel"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  prop="quality"
                  label="quality"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  width="300"
                  prop="encryption.description"
                  label="Encryption"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  label="Operation"
                  header-align="center"
                  width="130"
                  align="center"
                >

                  <template slot-scope="props">
                    <el-button size="mini" @click="onJoinNetwork(props.row)">Join Network</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { wifi, setWifi, scan } from '@/api/wifi'

export default {
  name: 'STA',
  data() {
    return {
      selected_ap_list: [],
      showSTAList: false,
      showSTAList2: false,
      scanning: false,
      scanning2: false,
      listEditing: false,
      activeName: 'TwoDotFour',
      fullscreenLoading: false,
      twoTableIsEditing: false,
      fiveTableIsEditing: false,
      twoTableIsEditing2: false,
      two_disabled: '0',
      five_disabled: '0',

      ap_list: [],
      ap_list2: [],
      radio0: {
        freq: '2G'
      },
      radio1: {
        freq: '5G'
      },
      twoDotFourTableData: [
        {
          id: '1',
          lock_to_ap: false,
          ssid_of_remote_ap: 'network_name',
          mac_of_remote_ap: 'bssid2',
          security: 'none',
          security_mode: {
            wep: {
              type: 1,
              key_selected: 'Key1',
              wep_key_format: 'ASCII',
              key_type: '_64-bit',
              key_value: ''
            },
            wpa_enterprise: {
              version: 'WPA2-PSK',
              encryption: 'AES',
              radius_server_ip: '0.0.0.0',
              radius_port: '80',
              radius_password: '',
              group_key_update_period: 0,
              portal: true,
              ssid_isolation: false
            },
            wpa_psk: {
              version: 'WAP2-PSK',
              encryption: 'AES',
              wireless_password: '',
              group_key_update_period: ''
            }
          },
          network: 'lan',
          wds: '0'
        }
      ],
      twoDotFourTableData2: [
        {
          id: '1',
          lock_to_ap: false,
          ssid_of_remote_ap: 'network_name',
          mac_of_remote_ap: 'bssid2',
          security: 'none',
          security_mode: {
            wep: {
              type: 1,
              key_selected: 'Key1',
              wep_key_format: 'ASCII',
              key_type: '_64-bit',
              key_value: ''
            },
            wpa_enterprise: {
              version: 'WPA2-PSK',
              encryption: 'AES',
              radius_server_ip: '0.0.0.0',
              radius_port: '80',
              radius_password: '',
              group_key_update_period: 0,
              portal: true,
              ssid_isolation: false
            },
            wpa_psk: {
              version: 'WAP2-PSK',
              encryption: 'AES',
              wireless_password: '',
              group_key_update_period: ''
            }
          },
          network: 'lan',
          wds: '0'
        }
      ],
      selectedAp: null,
      scanBtnClicked: '',
      scanBtnClicked2: '',
      multipleSelection: [],
      five_settings: {},
      two_dot_four_settings: {},
      five_table_data: [],
      tow_dot_four_table_data: [],
      two_dot_edit_obj: {
        ssid: '',
        wds: '1',
        mac_of_remote_ap: '',
        lock_to_ap: false,
        encryption: 'none',
        network: '',
        key: '',
        disabled: '',
        hidden: '',
        bw: '',
        channel: '',
        current_channel: '',
        chanlist: []
      },
      five_edit_obj: {
        ssid: '',
        wds: '1',
        mac_of_remote_ap: '',
        lock_to_ap: false,
        encryption: 'none',
        network: '',
        key: '',
        disabled: '',
        hidden: '',
        bw: '',
        channel: '',
        current_channel: '',
        chanlist: []
      }
    }
  },

  mounted() {
    wifi({}).then(res => {
      this.radio0 = res.radio0
      this.radio1 = res.radio1
      const { radio0, radio1, sta0, sta1, wlan0, wlan1, wlan2, wlan3, wlan10, wlan11, wlan12, wlan13 } = res
      this.five_settings = { ...sta1, paramsKey: 'sta1' }
      // this.five_table_data = [
      //   { ...wlan0, paramsKey: 'wlan0' },
      //   { ...wlan1, paramsKey: 'wlan1' },
      //   { ...wlan2, paramsKey: 'wlan2' },
      //   { ...wlan3, paramsKey: 'wlan3' }
      // ]
      this.two_disabled = res.sta0.disabled
      this.five_table_data = [
        this.five_settings
      ]
      this.two_dot_four_settings = { ...sta0, paramsKey: 'sta0' }
      // this.tow_dot_four_table_data = [
      //   { ...wlan0, paramsKey: 'wlan0' },
      //   { ...wlan1, paramsKey: 'wlan1' },
      //   { ...wlan2, paramsKey: 'wlan2' },
      //   { ...wlan3, paramsKey: 'wlan3' }
      // ]
      this.tow_dot_four_table_data = [
        this.two_dot_four_settings
      ]

      this.five_disabled = res.sta1.disabled
      // this.silentScanTwoDotFourAP()
      // this.silentScanFiveAP()
    })
  },
  methods: {
    locktwoDotFourLockToAP(e) {
      if (e && this.two_dot_edit_obj.mac_of_remote_ap) {
        const selectedAPIndex = this.ap_list.findIndex(item => item.bssid == this.two_dot_edit_obj.mac_of_remote_ap)
        const selectedAP = this.ap_list[selectedAPIndex]
        this.two_dot_edit_obj.current_channel = selectedAP.channel
      }
    },
    lockFiveLockToAP(e) {
      if (e && this.five_edit_obj.mac_of_remote_ap) {
        const selectedAPIndex = this.ap_list2.findIndex(item => item.bssid == this.five_edit_obj.mac_of_remote_ap)
        const selectedAP = this.ap_list2[selectedAPIndex]
        this.five_edit_obj.current_channel = selectedAP.channel
      }
    },

    onSaveTowSettings() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var params = {}
      params[`${this.two_dot_four_settings.paramsKey}`] = { ...this.two_dot_four_settings }
      params[`${this.two_dot_four_settings.paramsKey}`].disabled = this.two_disabled
      setWifi(params).then(res => {
        loading.close()
        this.$message({
          type: 'success',
          message: 'Save success' // TODO i18n
        })
      }).catch(() => {
        loading.close()
      })
    },
    onSaveFiveSettings() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var params = {}
      params[`${this.five_settings.paramsKey}`] = { ...this.five_settings }
      params[`${this.five_settings.paramsKey}`].disabled = this.five_disabled
      setWifi(params).then(res => {
        loading.close()
        this.$message({
          type: 'success',
          message: 'Save success' // TODO i18n
        })
      }).catch(() => {
        loading.close()
      })
    },
    onSSIDOfRemoteAPChange(row, currentValue) {
      const tempIndex = this.multipleSelection.findIndex(item => item.network_name === currentValue)
      if (tempIndex !== -1) {
        row.mac_of_remote_ap = this.multipleSelection[tempIndex].bssid
      } else {
        // 自行输入的情况下， bssid为空
        row.mac_of_remote_ap = ''
      }
    },
    moveUp(index, row) {
      if (index > 0) {
        const upDate = this.twoDotFourTableData[index]

        this.twoDotFourTableData.splice(index, 1)

        this.twoDotFourTableData.splice((index - 1), 0, upDate)
      } else {
        //  不可上移
      }
    },
    moveUp2(index, row) {
      if (index > 0) {
        const upDate = this.twoDotFourTableData2[index]

        this.twoDotFourTableData2.splice(index, 1)

        this.twoDotFourTableData2.splice((index - 1), 0, upDate)
      } else {
        //  不可上移
      }
    },
    moveDown(index, row) {
      if ((index) === this.twoDotFourTableData.length) {
        // 最后一条

      } else {
        const downDate = this.twoDotFourTableData[index]

        this.twoDotFourTableData.splice(index, 1)

        this.twoDotFourTableData.splice(index + 1, 0, downDate)
      }
    },
    moveDown2(index, row) {
      if ((index) === this.twoDotFourTableData2.length) {
        // 最后一条

      } else {
        const downDate = this.twoDotFourTableData2[index]

        this.twoDotFourTableData2.splice(index, 1)

        this.twoDotFourTableData2.splice(index + 1, 0, downDate)
      }
    },
    onAdd() {
      // TODO
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    onRowSelect(selection, row) {
      // const selected = selection.length > 0
      // this.$refs.ap_list.clearSelection()
      // this.$refs.ap_list.toggleRowSelection(row, selected)
      // if (selected) {
      //   this.selectedAp = row
      // } else {
      //   this.selectedAp = null
      // }
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
    onJoinNetwork(row) {
      // this.listEditing = true
      // this.selected_ap_list = []
      // this.selected_ap_list.push(row)
      console.log(row)
    },
    silentScanFiveAP() {
      var params = {}

      this.scanning2 = true

      if (this.radio0.freq === '5G') { params.radio1 = 'wifi0' } else { params.radio1 = 'wifi1' }

      scan(params).then(res => {
        this.ap_list2 = res.radio1_scan
        this.scanning2 = false
        this.showSTAList2 = true
      }).catch(() => {
      })
    },
    silentScanTwoDotFourAP() {
      var params = {}

      this.scanning = true

      if (this.radio0.freq === '5G') { params.radio0 = 'wifi1' } else { params.radio0 = 'wifi0' }

      scan(params).then(res => {
        this.ap_list = res.radio0_scan
        this.showSTAList = true
        this.scanning = false
      }).catch(() => {
      })
    },

    onScan() {
      var params = {}

      this.scanBtnClicked = true
      this.scanning = true
      const loading = this.$loading({
        lock: true,
        text: 'Scanning...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      if (this.radio0.freq === '5G') { params.radio0 = 'wifi1' } else { params.radio0 = 'wifi0' }

      scan(params).then(res => {
        this.ap_list = res.radio0_scan
        loading.close()
        this.showSTAList = true
        this.scanning = false
        this.$message({
          type: 'success',
          message: 'Save success' // TODO i18n
        })
      }).catch(() => {
        loading.close()
      })
    },
    onScan2() {
      var params = {}

      this.scanBtnClicked2 = true
      this.scanning2 = true
      const loading = this.$loading({
        lock: true,
        text: 'Scanning...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      if (this.radio0.freq === '5G') { params.radio1 = 'wifi0' } else { params.radio1 = 'wifi1' }

      scan(params).then(res => {
        this.ap_list2 = res.radio1_scan
        loading.close()
        this.scanning2 = false
        this.showSTAList2 = true
        this.$message({
          type: 'success',
          message: 'Save success' // TODO i18n
        })
      }).catch(() => {
        loading.close()
      })
    },
    getChanLable(option) {
      if (option == '0') {
        return 'Auto'
      } else {
        return option
      }
    },

    onFiveTableRowEdit(row) {
      if (!this.fiveTableIsEditing) {
        this.$refs.five_table.toggleRowExpansion(row, true)
        this.fiveTableIsEditing = true
        const mergedObj = Object.assign({
          ssid: '',
          wds: '1',
          mac_of_remote_ap: '',
          lock_to_ap: false,
          encryption: 'none',
          key: '',
          disabled: '',
          hidden: '',
          bw: '',
          channel: '',
          current_channel: '',
          chanlist: [],
          network: ''
        }, row)
        this.$set(this, 'five_edit_obj', mergedObj)
      }
    },

    onTwoDotFourTableRowEdit(row) {
      if (!this.twoTableIsEditing) {
        this.$refs.two_dot_four_table.toggleRowExpansion(row, true)
        this.twoTableIsEditing = true
        const mergedObj = Object.assign({
          ssid: '',
          wds: '1',
          mac_of_remote_ap: '',
          lock_to_ap: false,
          encryption: 'none',
          key: '',
          disabled: '',
          hidden: '',
          bw: '',
          channel: '',
          current_channel: '',
          chanlist: [],
          network: ''
        }, row)
        this.$set(this, 'two_dot_edit_obj', mergedObj)
      }
    },
    onFiveTableRowEditDone(row) {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var params = {}
      params[`${this.five_edit_obj.paramsKey}`] = { ...this.five_edit_obj }
      setWifi(params).then(res => {
        loading.close()
        this.fiveTableIsEditing = false
        this.$refs.five_table.toggleRowExpansion(row, false)
        this.$message({
          type: 'success',
          message: 'Save success' // TODO i18n
        })
      }).catch(() => {
        loading.close()
      })
    },

    onFiveTableRowEditCancel(row) {
      this.fiveTableIsEditing = false
      this.$refs.five_table.toggleRowExpansion(row, false)
    },
    onTwoTableRowEditDone(row) {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var params = {}
      params[`${this.two_dot_edit_obj.paramsKey}`] = { ...this.two_dot_edit_obj }
      setWifi(params).then(res => {
        loading.close()
        this.twoTableIsEditing = false
        this.$refs.two_dot_four_table.toggleRowExpansion(row, false)
        this.$message({
          type: 'success',
          message: 'Save success' // TODO i18n
        })
      }).catch(() => {
        loading.close()
      })
    },
    onTwoTableRowEditCancel(row) {
      this.twoTableIsEditing = false
      this.$refs.two_dot_four_table.toggleRowExpansion(row, false)
    },
    openFullScreen1(row) {
      if (!this.twoTableIsEditing) {
        this.fullscreenLoading = true
        setTimeout(() => {
          this.fullscreenLoading = false
          this.$refs.two_dot_four_table.toggleRowExpansion(row, true)
          this.twoTableIsEditing = true
        }, 300)
      }
    },
    onTwoDotFourTableEditDone(row) {
      this.$refs.two_dot_four_table.toggleRowExpansion(row, false)
      this.twoTableIsEditing = false
    },
    onTwoDotFourTableEditCancel(row) {
      this.$refs.two_dot_four_table.toggleRowExpansion(row, false)
      this.twoTableIsEditing = false
    },
    handleTwoDotFourEdit(row) {

    },
    handleTwoDotFourDelete(row) {
    },
    hndleTwoDotFourDelete2(row) {
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";

.scan-clicked {
  background-color: $primary-color;
  color: #ffffff;
}

.content-head {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.btn-group {
  margin-bottom: 20px;
}

.mode {
  font-size: 12px;
  display: inline-block;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  width: 80px;
  border: 1px solid $primary-color;
  background-color: $primary-color;
  color: #ffffff;
  text-align: center;
  margin-left: -4px
}

.mode-select {
  background-color: #ffffff;
  color: $primary-color;
}

.two-column-row-container {
  padding-top: 15px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 12px;

  .two-column-row {
    margin: 5px 0;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;

    .col-1 {
      font-size: 12px;
      width: 184px;
    }

    .col-2 {
      font-size: 12px;
      width: auto;
    }
  }
}

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

.btn-wrapper {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 0 0 20px 0
}

.template-wrapper {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column;

  .template-wrapper-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px 0;
  }

  .template-wrapper-item-name {
    width: 174px;
    color: #000000;
    font-size: 12px
  }

  .template-wrapper-item-name-select {
    flex: 1;
    display: flex;
    align-items: center;
  }
}

.btns {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px;

  .btns-wrapper {
    width: 174px;
    flex: 1;
    display: flex;
    align-items: center
  }
}

.edit-table-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.template-containr {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  flex-direction: column;
}
</style>

