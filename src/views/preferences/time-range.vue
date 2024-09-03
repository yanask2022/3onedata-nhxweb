<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">

      <el-tab-pane label="Time range" name="time_range">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">
                Time Range List
              </h1>
              <!-- 操作按钮-->
              <div class="div_3i8f76">
                <div class="div_3g07at">
                  <i class="el-icon-circle-plus i_2nnon"></i>
                  <span class="span_7fqbdu">Add</span>
                </div>

                <div class="div_8ckajy">
                  <i class="el-icon-remove i_2e6j75"></i>
                  <span class="span_dtpye0">Delete</span>
                </div>
              </div>
              <!-- table -->
              <div class="div_hfd81p">
                <div class="div_4i8usz">
                  <el-table ref="ip_group_table" header-cell-class-name="header-class" cell-class-name="cell-class" :data="ip_group_table_data" border>
                    <el-table-column width="1" type="expand" class-name="expand-column-class">
                      <template slot-scope="props">
                        <div class="div_9b3yuz">

                          <div class="div_zbpl0k">
                            <span class="span_kneea7">Time Range Name:</span>
                            <div class="div_5b62an">
                              <el-input v-model="props.row.time_range_name" size="mini" placeholder disabled class="el-input_rifi8d"></el-input>
                            </div>
                          </div>

                          <div class="div_9x3qwy">
                            <span class="span_1fqrch">Time Settings:</span>
                            <div class="div_3t7yg5">
                              <el-radio-group v-model="props.row.working_type" size="mini" class="el-radio-group_pjqx5e">
                                <el-radio label="calendar">Calendar</el-radio>
                                <el-radio label="manual">Manual</el-radio>
                              </el-radio-group>
                            </div>

                          </div>

                          <div   v-if="props.row.working_type == 'calendar'" class="div_w7zuuw">
                            <span class="span_mwxalt">Working Calendar:</span>
                            <div class="div_67xe7f">
                              <img class="calendar-icon img_xhw3rg" src="@/assets/table_active.png" @click="props.row.show_time_slice = true">
                            </div>
                            <week-time-slice-selector :editable="props.row.can_edit" :visible.sync="props.row.show_time_slice" :slices="props.row.calendarData" @onslicesselected="onHoursSelected($event, props.row)"></week-time-slice-selector>
                          </div>

                          <div v-if="props.row.working_type == 'manual'" class="div_qdd17d">
                            <span class="span_qkfkfd">Week:</span>
                            <div class="div_6fnr22">
                              <el-checkbox-group v-model="checkList">
                                <el-checkbox label="Mon"></el-checkbox>
                                <el-checkbox label="Tue"></el-checkbox>
                                <el-checkbox label="Web"></el-checkbox>
                                <el-checkbox label="Thu"></el-checkbox>
                                <el-checkbox label="Fri"></el-checkbox>
                                <el-checkbox label="Sat"></el-checkbox>
                                <el-checkbox label="Sun"></el-checkbox>
                              </el-checkbox-group>
                            </div>
                          </div>

                          <div class="div_c72vrs">
                            <span class="span_my3aag">Description:</span>
                            <div class="div_jjspuz">
                              <el-input v-model="props.row.description" size="mini" placeholder class="el-input_4qfzjt"></el-input>
                              <span class="span_y49ov5">(Optional)</span>
                            </div>
                          </div>

                          <div class="div_6og6gw">
                            <div class="div_unid8h">
                              <el-button size="mini" @click="onIPGroupTableEditDone(props.row)">OK</el-button>
                              <el-button size="mini" @click="onIPGroupTableEditCancel(props.row)">Cancel
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </template>

                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="50" type="selection"></el-table-column>
                    <el-table-column header-align="center" align="center" width="70" label="ID" prop="id"></el-table-column>
                    <el-table-column prop="time_range_name" width="180px" label="Time Range Name" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="working_time" label="Working Time" header-align="center" align="center">
                      <template slot-scope="props">
                        <div>
                          <img v-if="props.row.working_type == 'calendar'" class="calendar-icon img_px00gd" src="@/assets/table_active.png" @click="showTimeSliceSelector(props.row)">
                          <span v-else>{{ props.row.working_time }}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="description" label="Description" header-align="center" width="150" align="center"></el-table-column>

                    <el-table-column header-align="center" align="center" label="Operation" width="150">
                      <template slot-scope="scope">
                        <div class="div_aeup5">
                          <div v-if="scope.row.can_edit" class="div_wnk3et">
                            <span @click="handleIPGroupTableEdit(scope.row)" class="span_cxn36h">
                              <i class="el-icon-edit-outline"></i>
                            </span>

                            <span @click="handleIPGroupTableDelete(scope.row, scope.$index)" class="span_ipmybg">
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

              <div class="div_jyfpf9">
                <week-time-slice-selector :editable="false" :visible.sync="show_time_slice" :slices="time_slice_arr"></week-time-slice-selector>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import WeekTimeSliceSelector from '@/views/preferences/componets/WeekTimeSliceSelector'

export default {
  name: 'TimeRange',
  components: { WeekTimeSliceSelector },
  data() {
    return {
      checkList: [],
      activeName: 'time_range',
      ip_group_table_data: [
        {
          id: '1',
          time_range_name: 'Any',
          working_time: 'Mon Tue Web Thu Fri',
          working_type: 'manual',
          can_edit: false,
          description: 'Any time'
        },
        {
          id: '2',
          time_range_name: 'time1',
          working_time: 'Mon Tue Web Thu Fri',
          can_edit: true,
          description: '--',
          working_type: 'calendar',
          calendarData: this.genData(),
          show_time_slice: false
        },
        {
          id: '3',
          time_range_name: 'time',
          working_time: 'Mon Tue Web Thu Fri',
          can_edit: true,
          working_type: 'calendar',
          description: '--',
          show_time_slice: false,
          calendarData: this.genData()
        }
      ],
      ip_group_table_is_editing: false,
      show_time_slice: false,
      time_slice_arr: []
    }
  },
  methods: {
    genData() {
      const result = []
      for (let i = 0; i < 7; i++) {
        const arr = []
        for (let j = 0; j < 24; j++) {
          if (j === 0) {
            arr.push({ value: j, checked: true })
          } else {
            arr.push({ value: j, checked: false })
          }
        }
        result.push(arr)
      }
      return result
    },
    onHoursSelected(e, row) {
      console.log(JSON.stringify(e))
      row.calendarData = JSON.parse(JSON.stringify(e))
    },
    showTimeSliceSelector(row) {
      if (!this.ip_group_table_is_editing) {
        this.time_slice_arr = row.calendarData
        this.show_time_slice = true
      }
    },
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

.div_3i8f76 {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_3g07at {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_2nnon {
  font-size: 18px
}

.span_7fqbdu {
  font-size: 12px;
  margin-left: 5px
}

.div_8ckajy {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_2e6j75 {
  font-size: 18px
}

.span_dtpye0 {
  font-size: 12px;
  margin-left: 5px
}

.div_hfd81p {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_4i8usz {
  flex: 1;
}

.div_9b3yuz {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_zbpl0k {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_kneea7 {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_5b62an {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_rifi8d {
  max-width: 232px;
}

.div_9x3qwy {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_1fqrch {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_3t7yg5 {
  flex: 1;
  display: flex;
  align-items: center
}

.el-radio-group_pjqx5e {
  width: 232px;
}

.div_w7zuuw {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_mwxalt {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_67xe7f {
  flex: 1;
  display: flex;
  align-items: center
}

.img_xhw3rg {
  width: 16px;
  height: 16px
}

.div_qdd17d {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_qkfkfd {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_6fnr22 {
  flex: 1;
  display: flex;
  align-items: center
}

.div_c72vrs {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_my3aag {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_jjspuz {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_4qfzjt {
  max-width: 232px;
}

.span_y49ov5 {
  font-size: 12px;
  color: #000000;
  margin-left: 5px
}

.div_6og6gw {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 15px
}

.div_unid8h {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.img_px00gd {
  width: 16px;
  height: 16px
}

.div_aeup5 {
  width: 100%
}

.div_wnk3et {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_cxn36h {
  font-size: 16px
}

.span_ipmybg {
  font-size: 16px;
  margin-left: 8px
}

.div_jyfpf9 {
  width: 100%
}
</style>

