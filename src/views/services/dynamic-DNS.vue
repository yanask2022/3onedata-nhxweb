<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">

      <el-tab-pane label="Peanuthull" name="Peanuthull">
        <div class="content-container">
          <el-col>
            <el-col :span="24">
              <h1 class="panel-title">
                Peanuthull
              </h1>
              <!-- 操作按钮-->
              <div class="div_o6vi1e">
                <div class="div_rzq5em">
                  <i class="el-icon-circle-plus i_j51idb"></i>
                  <span class="span_1er9nb">Add</span>
                </div>

                <div class="div_k8gots">
                  <i class="el-icon-remove i_gd6lex"></i>
                  <span class="span_w0wyva">Delete</span>
                </div>
              </div>

              <!-- table -->
              <div class="div_fjy3aa">
                <div class="div_yjyotx">
                  <el-table ref="peanuthullTable" header-cell-class-name="header-class" cell-class-name="cell-class" :data="peanuthullTableData" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_sdcsm">

                          <div class="div_3ubad0">
                            <span class="span_nygz8o">Interface::</span>
                            <div class="div_i0k724">
                              <el-input size="mini" :disabled="true" placeholder value="WAN1" class="el-input_y1yy07"></el-input>
                            </div>
                          </div>
                          <div class="div_g7i8q9">
                            <span class="span_kx3710">Account Name:</span>
                            <div class="div_lzh60r">
                              <el-input v-model="props.row.Account_Name" size="mini" class="el-input_bq62d8"></el-input>
                            </div>
                          </div>
                          <div class="div_vdzb4y">
                            <span class="span_2f3xgb">Password:</span>
                            <div class="div_wr8cy4">
                              <el-input v-model="props.row.Password" size="mini" class="el-input_u39dq"></el-input>
                            </div>
                          </div>
                          <div class="div_v8a6fp">
                            <span class="span_zkist1">Update Interval::</span>
                            <div class="div_odk72g">
                              <el-select v-model="props.row.Update_Interval" size="mini" class="el-select_tffd3f">
                                <el-option value="one_hour" label="1 hour"></el-option>
                                <el-option value="six_hour" label="6 hours"></el-option>
                                <el-option value="twelve_hour" label="12 hours"></el-option>
                                <el-option value="one_day" label="1 day"></el-option>
                                <el-option value="three_day" label="3 days"></el-option>
                                <el-option value="six_day" label="6 days"></el-option>
                                <el-option value="never" label="never"></el-option>
                              </el-select>
                            </div>
                          </div>

                          <div class="div_900ta3">
                            <span class="span_6pnis4">Status:</span>
                            <div class="div_fji78v">
                              <el-checkbox v-model="props.row.Status" label="Enable"></el-checkbox>
                            </div>
                          </div>

                          <div class="div_izt6at">
                            <div class="div_7opafs">
                              <el-button size="mini" @click="onpeanuthullTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="onpeanuthullTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>

                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="Interface" label="Interface" header-align="center" width="90" align="center"></el-table-column>
                    <el-table-column prop="Account_Name" label="Account Name" width="120" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="Update_Interval" label="Update Interval" width="140" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="Status" label="Status" width="100" header-align="center" align="center">
                      <template slot-scope="props">
                        <div class="div_xrzyb7">
                          <span class="span_76jy4m">{{ props.row.Status === true ? 'Enabled':'Disabled' }}</span>
                          <i v-if="props.row.Status === true" class="el-icon-success i_cqawu2"></i>
                          <i v-else class="el-icon-error i_1f0s9a"></i>
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column prop="Server_Status" label="Server Status" width="120" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="Domain_Name" label="Domain Name" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="Service_Type" label="Service_Type" width="140" header-align="center" align="center"></el-table-column>
                    <el-table-column header-align="center" align="center" width="100" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_xdcezl">
                          <span @click="handlepeanuthullTableEdit(scope.row)" class="span_aiiz8m">
                            <i class="el-icon-edit-outline"></i>
                          </span>
                          <span @click="handlepeanuthullTableDelete(scope.row, scope.$index)" class="span_g1g41e">
                            <i class="el-icon-remove"></i>
                          </span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Comexe" name="Comexe">
        <div class="content-container">
          <el-col>
            <el-col :span="24">
              <h1 class="panel-title">
                Comexe
              </h1>
              <!-- 操作按钮-->
              <div class="div_u4r1lj">
                <div class="div_9x5wgc">
                  <i class="el-icon-circle-plus i_1fr262"></i>
                  <span class="span_yty49z">Add</span>
                </div>

                <div class="div_n2ljs2">
                  <i class="el-icon-remove i_5z0568"></i>
                  <span class="span_9m9636">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_qo0bfr">
                <div class="div_t63i77">
                  <el-table ref="comexeTable" header-cell-class-name="header-class" cell-class-name="cell-class" :data="comexeTableData" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_wvhanc">

                          <div class="div_s1u2hc">
                            <span class="span_b2lpbo">Interface::</span>
                            <div class="div_bxg842">
                              <el-input size="mini" :disabled="true" placeholder value="WAN1" class="el-input_eu6gwz"></el-input>
                            </div>
                          </div>
                          <div class="div_t5zxln">
                            <span class="span_6fysdp">Account Name:</span>
                            <div class="div_s3z62c">
                              <el-input v-model="props.row.Account_Name" size="mini" class="el-input_km1a5d"></el-input>
                            </div>
                          </div>
                          <div class="div_m7w7dy">
                            <span class="span_y30ryz">Password:</span>
                            <div class="div_ibgkxs">
                              <el-input v-model="props.row.Password" size="mini" class="el-input_mn6nxy"></el-input>
                            </div>
                          </div>
                          <div class="div_gej1nu">
                            <span class="span_eltp5i">Update Interval::</span>
                            <div class="div_tu64wg">
                              <el-select v-model="props.row.Update_Interval" size="mini" class="el-select_vn7g2q">
                                <el-option value="one_hour" label="1 hour"></el-option>
                                <el-option value="six_hour" label="6 hours"></el-option>
                                <el-option value="twelve_hour" label="12 hours"></el-option>
                                <el-option value="one_day" label="1 day"></el-option>
                                <el-option value="three_day" label="3 days"></el-option>
                                <el-option value="six_day" label="6 days"></el-option>
                                <el-option value="never" label="never"></el-option>
                              </el-select>
                            </div>
                          </div>

                          <div class="div_2tyhtr">
                            <span class="span_zbxmev">Status:</span>
                            <div class="div_1jqx2e">
                              <el-checkbox v-model="props.row.Status" label="Enable"></el-checkbox>
                            </div>
                          </div>

                          <div class="div_cdov0d">
                            <div class="div_1gsouf">
                              <el-button size="mini" @click="onComexelTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="onComexeTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>

                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="Interface" label="Interface" header-align="center" width="90" align="center"></el-table-column>
                    <el-table-column prop="Account_Name" label="Account Name" width="120" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="Update_Interval" label="Update Interval" width="140" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="Status" label="Status" width="100" header-align="center" align="center">
                      <template slot-scope="props">
                        <div class="div_cfa4et">
                          <span class="span_g8e18u">{{ props.row.Status === true ? 'Enabled':'Disabled' }}</span>
                          <i v-if="props.row.Status === true" class="el-icon-success i_nlspom"></i>
                          <i v-else class="el-icon-error i_x1uvk"></i>
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column prop="Server_Status" label="Server Status" width="120" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="Domain_Name" label="Domain Name" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="Service_Type" label="Service_Type" width="140" header-align="center" align="center"></el-table-column>
                    <el-table-column header-align="center" align="center" width="100" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_54uwpu">
                          <span @click="handleComexeTableEdit(scope.row)" class="span_8x0u2l">
                            <i class="el-icon-edit-outline"></i>
                          </span>
                          <span @click="handleComexeTableDelete(scope.row, scope.$index)" class="span_r1vn49">
                            <i class="el-icon-remove"></i>
                          </span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="DynDNS" name="DynDNS">
        <div class="content-container">
          <el-col>
            <el-col :span="24">
              <h1 class="panel-title">
                DynDNS
              </h1>
              <!-- 操作按钮-->
              <div class="div_g54lrg">
                <div class="div_jcs2qz">
                  <i class="el-icon-circle-plus i_jsh3xt"></i>
                  <span class="span_fe9l9o">Add</span>
                </div>

                <div class="div_2bdrgz">
                  <i class="el-icon-remove i_j6itqy"></i>
                  <span class="span_3p8r9m">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_vm7jud">
                <div class="div_uu0prv">
                  <el-table ref="dynDNSTable" header-cell-class-name="header-class" cell-class-name="cell-class" :data="dynDNSTableData" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_4hcuad">

                          <div class="div_v9i97g">
                            <span class="span_8iz0ib">Interface::</span>
                            <div class="div_hgvcd1">
                              <el-input size="mini" :disabled="true" placeholder value="WAN1" class="el-input_hz8sy1"></el-input>
                            </div>
                          </div>
                          <div class="div_ona2p3">
                            <span class="span_ss2bo0">Account Name:</span>
                            <div class="div_otb553">
                              <el-input v-model="props.row.Account_Name" size="mini" class="el-input_f0ag6b"></el-input>
                            </div>
                          </div>
                          <div class="div_oqe0ed">
                            <span class="span_y3kftb">Password:</span>
                            <div class="div_n0se29">
                              <el-input v-model="props.row.Password" size="mini" class="el-input_7mv0ur"></el-input>
                            </div>
                          </div>
                          <div class="div_lustp8">
                            <span class="span_ziba0e">Update Interval::</span>
                            <div class="div_53nk3t">
                              <el-select v-model="props.row.Update_Interval" size="mini" class="el-select_w0i0w1">
                                <el-option value="one_hour" label="1 hour"></el-option>
                                <el-option value="six_hour" label="6 hours"></el-option>
                                <el-option value="twelve_hour" label="12 hours"></el-option>
                                <el-option value="one_day" label="1 day"></el-option>
                                <el-option value="three_day" label="3 days"></el-option>
                                <el-option value="six_day" label="6 days"></el-option>
                                <el-option value="never" label="never"></el-option>
                              </el-select>
                            </div>
                          </div>

                          <div class="div_81fnh2">
                            <span class="span_ehdmnt">Status:</span>
                            <div class="div_ivqmrj">
                              <el-checkbox v-model="props.row.Status" label="Enable"></el-checkbox>
                            </div>
                          </div>

                          <div class="div_y5vukl">
                            <div class="div_m2oie0">
                              <el-button size="mini" @click="onDynDNSTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="onDynDNSTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>

                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="Interface" label="Interface" header-align="center" width="90" align="center"></el-table-column>
                    <el-table-column prop="Account_Name" label="Account Name" width="120" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="Update_Interval" label="Update Interval" width="140" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="Status" label="Status" width="100" header-align="center" align="center">
                      <template slot-scope="props">
                        <div class="div_usn7og">
                          <span class="span_jeok1k">{{ props.row.Status === true ? 'Enabled':'Disabled' }}</span>
                          <i v-if="props.row.Status === true" class="el-icon-success i_gtd8ii"></i>
                          <i v-else class="el-icon-error i_t157cw"></i>
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column prop="Server_Status" label="Server Status" width="120" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="Domain_Name" label="Domain Name" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="Service_Type" label="Service_Type" width="140" header-align="center" align="center"></el-table-column>
                    <el-table-column header-align="center" align="center" width="100" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_g4q4f7">
                          <span @click="handleDynDNSTableEdit(scope.row)" class="span_qqdmxt">
                            <i class="el-icon-edit-outline"></i>
                          </span>
                          <span @click="handleDynDNSTableDelete(scope.row, scope.$index)" class="span_i3n7l5">
                            <i class="el-icon-remove"></i>
                          </span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="NO-IP" name="NO-IP">
        <div class="content-container">
          <el-col>
            <el-col :span="24">
              <h1 class="panel-title">
                NO-IP
              </h1>
              <!-- 操作按钮-->
              <div class="div_z009cd">
                <div class="div_4q5l6v">
                  <i class="el-icon-circle-plus i_omkufi"></i>
                  <span class="span_5iy0jb">Add</span>
                </div>

                <div class="div_9efe8x">
                  <i class="el-icon-remove i_za4pie"></i>
                  <span class="span_y4mqdt">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_ihtaqy">
                <div class="div_ca17d2">
                  <el-table ref="noIPTable" header-cell-class-name="header-class" cell-class-name="cell-class" :data="noIPTableData" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_hfma58">

                          <div class="div_vjugux">
                            <span class="span_8281ye">Interface::</span>
                            <div class="div_exe49f">
                              <el-input size="mini" :disabled="true" placeholder value="WAN1" class="el-input_i8gnj9"></el-input>
                            </div>
                          </div>
                          <div class="div_eryxo0">
                            <span class="span_g8w45k">Account Name:</span>
                            <div class="div_hls4ap">
                              <el-input v-model="props.row.Account_Name" size="mini" class="el-input_vto98z"></el-input>
                            </div>
                          </div>
                          <div class="div_d373bb">
                            <span class="span_f7ks6a">Password:</span>
                            <div class="div_4a9v56">
                              <el-input v-model="props.row.Password" size="mini" class="el-input_pknspn"></el-input>
                            </div>
                          </div>
                          <div class="div_ivq07e">
                            <span class="span_s7rbyl">Update Interval::</span>
                            <div class="div_wb7b0r">
                              <el-select v-model="props.row.Update_Interval" size="mini" class="el-select_lmqdfq">
                                <el-option value="one_hour" label="1 hour"></el-option>
                                <el-option value="six_hour" label="6 hours"></el-option>
                                <el-option value="twelve_hour" label="12 hours"></el-option>
                                <el-option value="one_day" label="1 day"></el-option>
                                <el-option value="three_day" label="3 days"></el-option>
                                <el-option value="six_day" label="6 days"></el-option>
                                <el-option value="never" label="never"></el-option>
                              </el-select>
                            </div>
                          </div>

                          <div class="div_p0qn75">
                            <span class="span_jtpddd">Status:</span>
                            <div class="div_m6jnds">
                              <el-checkbox v-model="props.row.Status" label="Enable"></el-checkbox>
                            </div>
                          </div>

                          <div class="div_152enc">
                            <div class="div_3qqw9x">
                              <el-button size="mini" @click="onNoIPTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="onNoIPTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>

                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column prop="id" width="50" label="ID" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="Interface" label="Interface" header-align="center" width="90" align="center"></el-table-column>
                    <el-table-column prop="Account_Name" label="Account Name" width="120" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="Update_Interval" label="Update Interval" width="140" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="Status" label="Status" width="100" header-align="center" align="center">
                      <template slot-scope="props">
                        <div class="div_fq528p">
                          <span class="span_2fzda9">{{ props.row.Status === true ? 'Enabled':'Disabled' }}</span>
                          <i v-if="props.row.Status === true" class="el-icon-success i_o4frl5"></i>
                          <i v-else class="el-icon-error i_wo5mop"></i>
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column prop="Server_Status" label="Server Status" width="120" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="Domain_Name" label="Domain Name" header-align="center" align="center"></el-table-column>

                    <el-table-column prop="Service_Type" label="Service_Type" width="140" header-align="center" align="center"></el-table-column>
                    <el-table-column header-align="center" align="center" width="100" label="Operation">
                      <template slot-scope="scope">
                        <div class="div_vszjm">
                          <span @click="handleNoIPTableEdit(scope.row)" class="span_gek5cx">
                            <i class="el-icon-edit-outline"></i>
                          </span>
                          <span @click="handleNoIPTableDelete(scope.row, scope.$index)" class="span_gbqrq6">
                            <i class="el-icon-remove"></i>
                          </span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-col>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'DynamicDNS',
  data() {
    return {
      passwordLevel: 0,
      activeName: 'Peanuthull',
      peanuthullTableData: [
        {
          id: 1,
          Interface: 'WAN1',
          Account_Name: 'usename',
          Update_Interval: 3600,
          Status: false,
          Server_Status: 'connecting',
          Domain_Name: 'xxxx.noip.com',
          Password: '',
          Service_Type: '--'
        },
        {
          id: 1,
          Interface: 'WAN2',
          Account_Name: 'usename',
          Password: '',
          Update_Interval: 3600,
          Status: true,
          Server_Status: 'connecting',
          Domain_Name: 'xxxx.noip.com',
          Service_Type: '--'
        }
      ],
      peanuthullTableEditing: false,
      comexeTableEditing: false,
      comexeTableData: [
        {
          id: 1,
          Interface: 'WAN1',
          Account_Name: 'usename',
          Update_Interval: 3600,
          Status: false,
          Server_Status: 'connecting',
          Domain_Name: 'xxxx.noip.com',
          Password: '',
          Service_Type: '--'
        },
        {
          id: 1,
          Interface: 'WAN2',
          Account_Name: 'usename',
          Password: '',
          Update_Interval: 3600,
          Status: true,
          Server_Status: 'connecting',
          Domain_Name: 'xxxx.noip.com',
          Service_Type: '--'
        }
      ],
      dynDNSTableEditing: false,
      dynDNSTableData: [
        {
          id: 1,
          Interface: 'WAN1',
          Account_Name: 'usename',
          Update_Interval: 3600,
          Status: false,
          Server_Status: 'connecting',
          Domain_Name: 'xxxx.noip.com',
          Password: '',
          Service_Type: '--'
        },
        {
          id: 1,
          Interface: 'WAN2',
          Account_Name: 'usename',
          Password: '',
          Update_Interval: 3600,
          Status: true,
          Server_Status: 'connecting',
          Domain_Name: 'xxxx.noip.com',
          Service_Type: '--'
        }
      ],
      noIPTableData: [
        {
          id: 1,
          Interface: 'WAN1',
          Account_Name: 'usename',
          Update_Interval: 3600,
          Status: false,
          Server_Status: 'connecting',
          Domain_Name: 'xxxx.noip.com',
          Password: '',
          Service_Type: '--'
        },
        {
          id: 1,
          Interface: 'WAN2',
          Account_Name: 'usename',
          Password: '',
          Update_Interval: 3600,
          Status: true,
          Server_Status: 'connecting',
          Domain_Name: 'xxxx.noip.com',
          Service_Type: '--'
        }
      ],
      noIPTableEditing: false
    }
  },
  methods: {
    onComexelTableEditDone(row) {
      this.$refs.comexeTable.toggleRowExpansion(row, false)
      this.comexeTableEditing = false
    },
    onComexeTableEditCancel(row) {
      this.$refs.comexeTable.toggleRowExpansion(row, false)
      this.comexeTableEditing = false
    },
    handleComexeTableEdit(row) {
      if (!this.comexeTableEditing) {
        this.$refs.comexeTable.toggleRowExpansion(row, true)
        this.comexeTableEditing = true
      }
    },
    handleComexeTableDelete() {

    },

    onNoIPTableEditDone(row) {
      this.$refs.noIPTable.toggleRowExpansion(row, false)
      this.noIPTableEditing = false
    },
    onNoIPTableEditCancel(row) {
      this.$refs.noIPTable.toggleRowExpansion(row, false)
      this.noIPTableEditing = false
    },
    handleNoIPTableEdit(row) {
      if (!this.noIPTableEditing) {
        this.$refs.noIPTable.toggleRowExpansion(row, true)
        this.noIPTableEditing = true
      }
    },
    handleNoIPTableDelete() {

    },

    onDynDNSTableEditDone(row) {
      this.$refs.noIPTable.toggleRowExpansion(row, false)
      this.dynDNSTableEditing = false
    },
    onDynDNSTableEditCancel(row) {
      this.$refs.dynDNSTable.toggleRowExpansion(row, false)
      this.dynDNSTableEditing = false
    },

    handleDynDNSTableEdit(row) {
      if (!this.dynDNSTableEditing) {
        this.$refs.dynDNSTable.toggleRowExpansion(row, true)
        this.dynDNSTableEditing = true
      }
    },
    handleDynDNSTableDelete() {

    },

    onpeanuthullTableEditDone(row) {
      this.$refs.peanuthullTable.toggleRowExpansion(row, false)
      this.peanuthullTableEditing = false
    },
    onpeanuthullTableEditCancel(row) {
      this.$refs.peanuthullTable.toggleRowExpansion(row, false)
      this.peanuthullTableEditing = false
    },
    handlepeanuthullTableEdit(row) {
      if (!this.peanuthullTableEditing) {
        this.$refs.peanuthullTable.toggleRowExpansion(row, true)
        this.peanuthullTableEditing = true
      }
    },
    handlepeanuthullTableDelete() {

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


.div_o6vi1e {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_rzq5em {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_j51idb {
  font-size: 18px
}

.span_1er9nb {
  font-size: 12px;
  margin-left: 5px
}

.div_k8gots {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_gd6lex {
  font-size: 18px
}

.span_w0wyva {
  font-size: 12px;
  margin-left: 5px
}

.div_fjy3aa {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_yjyotx {
  flex: 1;
}

.div_sdcsm {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_3ubad0 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_nygz8o {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_i0k724 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_y1yy07 {
  max-width: 232px;
}

.div_g7i8q9 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_kx3710 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_lzh60r {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_bq62d8 {
  max-width: 232px;
}

.div_vdzb4y {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_2f3xgb {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_wr8cy4 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_u39dq {
  max-width: 232px;
}

.div_v8a6fp {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_zkist1 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_odk72g {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_tffd3f {
  width: 232px
}

.div_900ta3 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_6pnis4 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_fji78v {
  flex: 1;
  display: flex;
  align-items: center
}

.div_izt6at {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_7opafs {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_xrzyb7 {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.span_76jy4m {
  font-size: 12px;
  margin-right: 5px
}

.i_cqawu2 {
  font-size: 14px
}

.i_1f0s9a {
  font-size: 14px
}

.div_xdcezl {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_aiiz8m {
  font-size: 16px
}

.span_g1g41e {
  font-size: 16px;
  margin-left: 8px
}

.div_u4r1lj {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_9x5wgc {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_1fr262 {
  font-size: 18px
}

.span_yty49z {
  font-size: 12px;
  margin-left: 5px
}

.div_n2ljs2 {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_5z0568 {
  font-size: 18px
}

.span_9m9636 {
  font-size: 12px;
  margin-left: 5px
}

.div_qo0bfr {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_t63i77 {
  flex: 1;
}

.div_wvhanc {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_s1u2hc {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_b2lpbo {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_bxg842 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_eu6gwz {
  max-width: 232px;
}

.div_t5zxln {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_6fysdp {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_s3z62c {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_km1a5d {
  max-width: 232px;
}

.div_m7w7dy {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_y30ryz {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_ibgkxs {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_mn6nxy {
  max-width: 232px;
}

.div_gej1nu {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_eltp5i {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_tu64wg {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_vn7g2q {
  width: 232px
}

.div_2tyhtr {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_zbxmev {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_1jqx2e {
  flex: 1;
  display: flex;
  align-items: center
}

.div_cdov0d {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_1gsouf {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_cfa4et {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.span_g8e18u {
  font-size: 12px;
  margin-right: 5px
}

.i_nlspom {
  font-size: 14px
}

.i_x1uvk {
  font-size: 14px
}

.div_54uwpu {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_8x0u2l {
  font-size: 16px
}

.span_r1vn49 {
  font-size: 16px;
  margin-left: 8px
}

.div_g54lrg {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_jcs2qz {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_jsh3xt {
  font-size: 18px
}

.span_fe9l9o {
  font-size: 12px;
  margin-left: 5px
}

.div_2bdrgz {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_j6itqy {
  font-size: 18px
}

.span_3p8r9m {
  font-size: 12px;
  margin-left: 5px
}

.div_vm7jud {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_uu0prv {
  flex: 1;
}

.div_4hcuad {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_v9i97g {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_8iz0ib {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_hgvcd1 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_hz8sy1 {
  max-width: 232px;
}

.div_ona2p3 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_ss2bo0 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_otb553 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_f0ag6b {
  max-width: 232px;
}

.div_oqe0ed {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_y3kftb {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_n0se29 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_7mv0ur {
  max-width: 232px;
}

.div_lustp8 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_ziba0e {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_53nk3t {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_w0i0w1 {
  width: 232px
}

.div_81fnh2 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_ehdmnt {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_ivqmrj {
  flex: 1;
  display: flex;
  align-items: center
}

.div_y5vukl {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_m2oie0 {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_usn7og {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.span_jeok1k {
  font-size: 12px;
  margin-right: 5px
}

.i_gtd8ii {
  font-size: 14px
}

.i_t157cw {
  font-size: 14px
}

.div_g4q4f7 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_qqdmxt {
  font-size: 16px
}

.span_i3n7l5 {
  font-size: 16px;
  margin-left: 8px
}

.div_z009cd {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_4q5l6v {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_omkufi {
  font-size: 18px
}

.span_5iy0jb {
  font-size: 12px;
  margin-left: 5px
}

.div_9efe8x {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_za4pie {
  font-size: 18px
}

.span_y4mqdt {
  font-size: 12px;
  margin-left: 5px
}

.div_ihtaqy {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_ca17d2 {
  flex: 1;
}

.div_hfma58 {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_vjugux {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_8281ye {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_exe49f {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_i8gnj9 {
  max-width: 232px;
}

.div_eryxo0 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_g8w45k {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_hls4ap {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_vto98z {
  max-width: 232px;
}

.div_d373bb {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_f7ks6a {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_4a9v56 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_pknspn {
  max-width: 232px;
}

.div_ivq07e {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_s7rbyl {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_wb7b0r {
  flex: 1;
  display: flex;
  align-items: center
}

.el-select_lmqdfq {
  width: 232px
}

.div_p0qn75 {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_jtpddd {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_m6jnds {
  flex: 1;
  display: flex;
  align-items: center
}

.div_152enc {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_3qqw9x {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_fq528p {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.span_2fzda9 {
  font-size: 12px;
  margin-right: 5px
}

.i_o4frl5 {
  font-size: 14px
}

.i_wo5mop {
  font-size: 14px
}

.div_vszjm {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_gek5cx {
  font-size: 16px
}

.span_gbqrq6 {
  font-size: 16px;
  margin-left: 8px
}
</style>

