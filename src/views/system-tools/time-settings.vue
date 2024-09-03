<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="TimeSettings" name="TimeSettings">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">Time Settings:</h1>

              <div class="two-column-row-container">
                <div class="two-column-row">
                  <div class="col-1">Current Time:</div>
                  <div class="col-2"><span>{{ currentTime }}</span></div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">Time Config:</div>
                  <div class="col-2">
                    <el-radio-group v-model="time_settings.get_time_from">
                      <el-radio :label="1">Get automatically from the Internet</el-radio>
                      <el-radio :label="2">Manually</el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <div v-if="time_settings.get_time_from == 1">
                  <!-- 时区-->
                  <div class="two-column-row">
                    <div class="col-1">Time Zone:</div>
                    <div class="col-2">
                      <el-select v-model="time_settings.timezone" size="mini" class="el-select_m8lu9h">
                        <el-option v-for="(timeZoneItem, itemZoneIndex) in thatTimezone" :key="itemZoneIndex" :label="timeZoneItem.text" :value="timeZoneItem.value"></el-option>
                      </el-select>
                    </div>
                  </div>
                  <!-- 主时间服务器-->
                  <div class="two-column-row">
                    <div class="col-1">Primary NTP Server:</div>
                    <div class="col-2">
                      <el-input v-model="time_settings.primary_ntp_server" size="mini" class="el-input_4tunhj"></el-input>
                    </div>
                  </div>

                  <!--   第二时间服务器 -->

                  <div class="two-column-row">
                    <div class="col-1">Secondary NTP Server:</div>
                    <div class="col-2">
                      <el-input v-model="time_settings.secondary_ntp_server" size="mini" class="el-input_gj6kjx"></el-input>
                      <span class="span_7x9dv0">(X.X.X.X, optional)</span>
                    </div>
                  </div>
                </div>
                <div v-if="time_settings.get_time_from === 2">
                  <!--date-->
                  <div class="two-column-row">
                    <div class="col-1">Date:</div>
                    <div class="col-2">
                      <el-input v-model="time_settings.manually.date" size="mini" class="el-input_ozi510"></el-input>
                      <span class="span_k6gaoj">(MM/DD/YYYY)</span>
                    </div>
                  </div>

                  <!--time-->
                  <div class="two-column-row">
                    <div class="col-1">Date:</div>
                    <div class="col-2">
                      <div class="div_ds4q2y">
                        <el-select v-model="time_settings.manually.time.hour" size="mini" class="el-select_e7qzjn">
                          <el-option v-for="(hourItem, hourIndex) in 24" :key="hourIndex" :label="hourItem &lt; 10 ? '0'+hourItem: hourItem" :value="hourItem"></el-option>
                        </el-select>
                      </div>
                      <span class="span_aml6p8">:</span>
                      <div class="div_l8wy8r">
                        <el-select v-model="time_settings.manually.time.mm" size="mini" class="el-select_cuj4sv">
                          <el-option v-for="(minuteItem, minuteIndex) in 60" :key="minuteIndex" :label="minuteItem &lt; 10 ? '0'+minuteItem: minuteItem" :value="minuteItem"></el-option>
                        </el-select>
                      </div>
                      <span class="span_kach8n">:</span>
                      <div class="div_l4zz8x">
                        <el-select v-model="time_settings.manually.time.second" size="mini" class="el-select_g5qdfd">
                          <el-option v-for="(secondItem, secondIndex) in 60" :key="secondIndex" :label="secondItem &lt; 10 ? '0'+secondItem: secondItem" :value="secondItem"></el-option>
                        </el-select>
                      </div>
                      <span class="span_w26dwe">(HH/MM/SS)</span>
                    </div>
                  </div>
                </div>

                <!--sync-->
                <div class="two-column-row div_nnqhun">
                  <div class="col-1">
                    <el-button size="mini">Synchronize with PC's Clock</el-button>
                  </div>
                  <div class="col-2"></div>
                </div>

                <div class="two-column-row div_hvr61a">
                  <div class="col-1">
                    <el-button size="mini">Save</el-button>
                  </div>
                  <div class="col-2"></div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="el-row_7vqbq3">
            <el-col :span="24">
              <h1 class="panel-title">Daylight Saving Time</h1>

              <div class="two-column-row-container">
                <div class="two-column-row">
                  <div class="col-1">DST Status:</div>
                  <div class="col-2">
                    <el-checkbox v-model="daylight_saving_time.enable_dst" label="Enable"></el-checkbox>
                  </div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">Mode:</div>
                  <div class="col-2">
                    <el-radio-group v-model="daylight_saving_time.mode" :disabled="!daylight_saving_time.enable_dst">
                      <el-radio :label="1">Predefined Mode</el-radio>
                      <el-radio :label="2">Recurring Mode</el-radio>
                      <el-radio :label="3">Date Mode</el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <div v-if="daylight_saving_time.mode == 1 &amp;&amp; daylight_saving_time.enable_dst">
                  <!-- 时区-->
                  <div class="two-column-row">
                    <div class="col-1">Predefined Country:</div>
                    <div class="col-2">
                      <el-select v-model="daylight_saving_time.predefined_mode_config" size="mini" class="el-select_lhs0mn">
                        <el-option v-for="(modeItem, modeIndex) in daylight_saving_time_predefined_options" :key="modeIndex" :label="modeItem" :value="modeItem"></el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="two-column-row div_x3avti">
                    <div class="col-1">
                      <el-button size="mini">Save</el-button>
                    </div>
                    <div class="col-2"></div>
                  </div>
                </div>
                <div v-if="daylight_saving_time.mode === 2 &amp;&amp; daylight_saving_time.enable_dst">
                  <!--Time Offset-->
                  <div class="two-column-row">
                    <div class="col-1">Time Offset:</div>
                    <div class="col-2">
                      <el-input v-model="daylight_saving_time.recurring_mode_config.time_offset" size="mini" class="el-input_va7wka"></el-input>
                      <span class="span_y0fur4">minutes (1-180)</span>
                    </div>
                  </div>

                  <!-- Starting Time: -->
                  <div class="two-column-row">
                    <div class="col-1">Starting Time:</div>
                    <div class="col-2">
                      <!--前后天-->
                      <div class="div_faxfk7">
                        <el-select v-model="daylight_saving_time.recurring_mode_config.starting_time.start_day" size="mini" class="el-select_g5osnp">
                          <el-option v-for="(dayItem, dayIndex) in daylight_saving_time_recurring_mode_options.start_day" :key="dayIndex" :label="dayItem" :value="dayItem"></el-option>
                        </el-select>
                      </div>
                      <span class="span_dhevzt">:</span>

                      <div class="div_6z6edj">
                        <el-select v-model="daylight_saving_time.recurring_mode_config.starting_time.week" size="mini" class="el-select_m9by48">
                          <el-option v-for="(weekItem, weekIndex) in daylight_saving_time_recurring_mode_options.week" :key="weekIndex" :label="weekItem " :value="weekItem"></el-option>
                        </el-select>
                      </div>
                      <span class="span_ada47r">in</span>

                      <div class="div_yspac4">
                        <el-select v-model="daylight_saving_time.recurring_mode_config.starting_time.month" size="mini" class="el-select_kkqczg">
                          <el-option v-for="(monthItem, monthIndex) in daylight_saving_time_recurring_mode_options.month" :key="monthIndex" :label="monthItem " :value="monthItem"></el-option>
                        </el-select>
                      </div>
                      <span class="span_gzwi9c">at</span>
                      <!-- 小时-->
                      <div class="div_hysyrp">
                        <el-select v-model="daylight_saving_time.recurring_mode_config.starting_time.hour" size="mini" class="el-select_u870ly">
                          <el-option v-for="(hourItem2, hourIndex2) in 24" :key="hourIndex2" :label="hourItem2 &lt; 10 ? '0'+hourItem2: hourItem2" :value="hourItem2"></el-option>
                        </el-select>
                      </div>
                      <span class="span_6ignh">:</span>

                      <!-- 分钟-->
                      <div class="div_ulbqnf">
                        <el-select v-model="daylight_saving_time.recurring_mode_config.starting_time.minute" size="mini" class="el-select_ufyvh">
                          <el-option v-for="(minuteItem2, minuteIndex2) in 60" :key="minuteIndex2" :label="minuteItem2 &lt; 10 ? '0'+minuteItem2: minuteItem2" :value="minuteItem2"></el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>

                  <!-- Ending Time-->
                  <div class="two-column-row">
                    <div class="col-1">Ending Time:</div>
                    <div class="col-2">
                      <!--前后天-->
                      <div class="div_v6y51p">
                        <el-select v-model="daylight_saving_time.recurring_mode_config.ending_time.start_day" size="mini" class="el-select_4iluvu">
                          <el-option v-for="(dayItem, dayIndex) in daylight_saving_time_recurring_mode_options.start_day" :key="dayIndex" :label="dayItem" :value="dayItem"></el-option>
                        </el-select>
                      </div>
                      <span class="span_6qar50">:</span>

                      <div class="div_yv7gd6">
                        <el-select v-model="daylight_saving_time.recurring_mode_config.ending_time.week" size="mini" class="el-select_jlbo23">
                          <el-option v-for="(weekItem, weekIndex) in daylight_saving_time_recurring_mode_options.week" :key="weekIndex" :label="weekItem " :value="weekItem"></el-option>
                        </el-select>
                      </div>
                      <span class="span_80e9lz">in</span>

                      <div class="div_595bln">
                        <el-select v-model="daylight_saving_time.recurring_mode_config.ending_time.month" size="mini" class="el-select_vbn0gd">
                          <el-option v-for="(monthItem, monthIndex) in daylight_saving_time_recurring_mode_options.month" :key="monthIndex" :label="monthItem " :value="monthItem"></el-option>
                        </el-select>
                      </div>
                      <span class="span_e8kfk4">at</span>
                      <!-- 小时-->
                      <div class="div_dsnm59">
                        <el-select v-model="daylight_saving_time.recurring_mode_config.ending_time.hour" size="mini" class="el-select_rpglda">
                          <el-option v-for="(hourItem2, hourIndex2) in 24" :key="hourIndex2" :label="hourItem2 &lt; 10 ? '0'+hourItem2: hourItem2" :value="hourItem2"></el-option>
                        </el-select>
                      </div>
                      <span class="span_9pe0ae">:</span>

                      <!-- 分钟-->
                      <div class="div_bymufr">
                        <el-select v-model="daylight_saving_time.recurring_mode_config.ending_time.minute" size="mini" class="el-select_8aeg7r">
                          <el-option v-for="(minuteItem2, minuteIndex2) in 60" :key="minuteIndex2" :label="minuteItem2 &lt; 10 ? '0'+minuteItem2: minuteItem2" :value="minuteItem2"></el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Date Mode -->
                <div v-if="daylight_saving_time.mode === 3 &amp;&amp; daylight_saving_time.enable_dst">
                  <!--Time Offset-->
                  <div class="two-column-row">
                    <div class="col-1">Time Offset:</div>
                    <div class="col-2">
                      <el-input v-model="daylight_saving_time.date_mode_config.time_offset" size="mini" class="el-input_6s2gmx"></el-input>
                      <span class="span_ctok49">minutes (1-180)</span>
                    </div>
                  </div>

                  <!-- Starting Time: -->
                  <div class="two-column-row">
                    <div class="col-1">Starting Time:</div>
                    <div class="col-2">
                      <!--年-->
                      <div class="div_qy3xlp">
                        <el-select v-model="daylight_saving_time.date_mode_config.starting_time.year" size="mini" class="el-select_eiyfq2">
                          <el-option v-for="(yearItem, yearIndex) in daylight_saving_time_date_mode_options.years" :key="yearIndex" :label="yearItem" :value="yearItem"></el-option>
                        </el-select>
                      </div>
                      <span class="span_n2jfbk">-</span>

                      <!-- 月-->
                      <div class="div_babzv3">
                        <el-select v-model="daylight_saving_time.date_mode_config.starting_time.month" size="mini" class="el-select_n8wueh">
                          <el-option v-for="(monthItem2, monthIndex2) in daylight_saving_time_date_mode_options.month" :key="monthIndex2" :label="monthItem2" :value="monthItem2"></el-option>
                        </el-select>
                      </div>
                      <span class="span_k9sc8a">-</span>

                      <!-- 日 -->
                      <div class="div_1hs4nw">
                        <el-select v-model="daylight_saving_time.date_mode_config.starting_time.day" size="mini" class="el-select_h3nhp0">
                          <el-option v-for="(dayItem, dayIndex) in daylight_saving_time_date_mode_options.day" :key="dayIndex" :label="dayItem" :value="dayItem"></el-option>
                        </el-select>
                      </div>
                      <span class="span_xnoggv">at</span>
                      <!-- 小时-->
                      <div class="div_f6oeoy">
                        <el-select v-model="daylight_saving_time.date_mode_config.starting_time.hour" size="mini" class="el-select_leefqm">
                          <el-option v-for="(hourItem3, hourIndex3) in 24" :key="hourIndex3" :label="hourItem3 &lt; 10 ? '0'+hourItem3: hourItem3" :value="hourItem3"></el-option>
                        </el-select>
                      </div>
                      <span class="span_7tldkf">:</span>

                      <!-- 分钟-->
                      <div class="div_jls7s2">
                        <el-select v-model="daylight_saving_time.date_mode_config.starting_time.minute" size="mini" class="el-select_pczl6y">
                          <el-option v-for="(minuteItem3, minuteIndex3) in 60" :key="minuteIndex3" :label="minuteItem3 &lt; 10 ? '0'+minuteItem3: minuteItem3" :value="minuteItem3"></el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <!-- Ending Time-->
                  <div class="two-column-row">
                    <div class="col-1">Starting Time:</div>
                    <div class="col-2">
                      <!--年-->
                      <div class="div_2d4d9f">
                        <el-select v-model="daylight_saving_time.date_mode_config.ending_time.year" size="mini" class="el-select_hc0lbf">
                          <el-option v-for="(yearItem2, yearIndex2) in daylight_saving_time_date_mode_options.years" :key="yearIndex2" :label="yearItem2" :value="yearItem2"></el-option>
                        </el-select>
                      </div>
                      <span class="span_3u0fmh">-</span>

                      <!-- 月-->
                      <div class="div_ldj9n8">
                        <el-select v-model="daylight_saving_time.date_mode_config.ending_time.month" size="mini" class="el-select_an0k7z">
                          <el-option v-for="(monthItem4, monthIndex4) in daylight_saving_time_date_mode_options.month" :key="monthIndex4" :label="monthItem4" :value="monthItem4"></el-option>
                        </el-select>
                      </div>
                      <span class="span_lamzgy">-</span>

                      <!-- 日 -->
                      <div class="div_err7tp">
                        <el-select v-model="daylight_saving_time.date_mode_config.ending_time.day" size="mini" class="el-select_w95siu">
                          <el-option v-for="(dayItem2, dayIndex2) in daylight_saving_time_date_mode_options.day" :key="dayIndex2" :label="dayItem2" :value="dayItem2"></el-option>
                        </el-select>
                      </div>
                      <span class="span_2yb6pt">at</span>
                      <!-- 小时-->
                      <div class="div_ni56wf">
                        <el-select v-model="daylight_saving_time.date_mode_config.ending_time.hour" size="mini" class="el-select_njsxh3">
                          <el-option v-for="(hourItem4, hourIndex4) in 24" :key="hourIndex4" :label="hourItem4 &lt; 10 ? '0'+hourItem4: hourItem4" :value="hourItem4"></el-option>
                        </el-select>
                      </div>
                      <span class="span_cdexjl">:</span>

                      <!-- 分钟-->
                      <div class="div_siph9">
                        <el-select v-model="daylight_saving_time.date_mode_config.ending_time.minute" size="mini" class="el-select_585oxg">
                          <el-option v-for="(minuteItem4, minuteIndex4) in 60" :key="minuteIndex4" :label="minuteItem4 &lt; 10 ? '0'+minuteItem4: minuteItem4" :value="minuteItem4"></el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              <!-- Daylight Saving Time 保存按钮-->
              <div class="two-column-row div_a2tufs">
                <div class="col-1">
                  <el-button size="mini" @click="onDayLightSavingTimeClick">Save</el-button>
                </div>
                <div class="col-2"></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>

import { getTime, parseTime } from '@/utils'
import timezoneJSON from '@/utils/timezone.json'

export default {
  name: 'TimeSettings',
  data() {
    return {
      activeName: 'TimeSettings',
      thatTimezone: timezoneJSON.timezone,
      currentTime: 0,
      time_settings: {
        get_time_from: 1,
        timezone: '',
        primary_ntp_server: '',
        secondary_ntp_server: '',
        manually: {
          date: '',
          time: {
            hour: '00',
            mm: '00',
            second: '00'
          }
        }
      },
      daylight_saving_time: {
        enable_dst: false,
        mode: 2,
        predefined_mode_config: {
          predefined_country: ''
        },
        recurring_mode_config: {
          time_offset: '',
          starting_time: {
            start_day: 'Last',
            week: 'Mon',
            month: 'Jan',
            hour: '00',
            minute: '00'
          },
          ending_time: {
            start_day: 'Last',
            week: 'Mon',
            month: 'Jan',
            hour: '00',
            minute: '00'
          }
        },
        date_mode_config: {
          time_offset: '',
          starting_time: {
            year: 2014,
            week: 'Mon',
            month: 'Jan',
            day: '00',
            hour: '00',
            minute: '00'
          },
          ending_time: {
            year: 2014,
            week: 'Mon',
            month: 'Jan',
            day: '00',
            hour: '00',
            minute: '00'
          }
        }
      },
      daylight_saving_time_predefined_options: [
        'USA',
        'Europe',
        'Australia',
        'New Zealand'
      ],
      daylight_saving_time_recurring_mode_options: {
        start_day: ['Last', 'First', 'Second', 'Third', 'Fourth'],
        week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      daylight_saving_time_date_mode_options: {
        years: this.genYears(2014, 2038),
        day: this.genDays(),
        start_day: ['Last', 'First', 'Second', 'Third', 'Fourth'],
        week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    }
  },

  mounted() {
    setInterval(() => {
      this.currentTime = parseTime(getTime('start'))
    }, 1000)
  },
  methods: {
    genDays() {
      const arr = []
      for (let i = 0; i < 31; i++) {
        if (i < 10) {
          arr.push('0' + i)
        } else {
          arr.push('' + i)
        }
      }
      return arr
    },
    genYears(start, end) {
      const arr = []
      for (let i = start; i < end; i++) {
        arr.push(i)
      }
      return arr
    },
    onDayLightSavingTimeClick() {
      console.log('onDayLightSavingTimeClick')
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


.el-select_m8lu9h {
  width: 400px
}

.el-input_4tunhj {
  width: 260px
}

.el-input_gj6kjx {
  width: 260px
}

.span_7x9dv0 {
  margin-left: 5px
}

.el-input_ozi510 {
  width: 243px
}

.span_k6gaoj {
  margin-left: 5px
}

.div_ds4q2y {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_e7qzjn {
  width: 75px
}

.span_aml6p8 {
  margin: 0 2px;
  display: inline-block
}

.div_l8wy8r {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_cuj4sv {
  width: 75px
}

.span_kach8n {
  margin: 0 2px;
  display: inline-block
}

.div_l4zz8x {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_g5qdfd {
  width: 75px
}

.span_w26dwe {
  margin-left: 5px;
  display: inline-block
}

.div_nnqhun {
  margin-top: 20px
}

.div_hvr61a {
  margin-top: 30px
}

.el-row_7vqbq3 {
  margin-top: 30px
}

.el-select_lhs0mn {
  width: 400px
}

.div_x3avti {
  margin-top: 20px
}

.el-input_va7wka {
  width: 100px
}

.span_y0fur4 {
  margin-left: 5px
}

.div_faxfk7 {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_g5osnp {
  width: 75px
}

.span_dhevzt {
  margin: 0 2px;
  display: inline-block
}

.div_6z6edj {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_m9by48 {
  width: 75px
}

.span_ada47r {
  margin: 0 2px;
  display: inline-block
}

.div_yspac4 {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_kkqczg {
  width: 75px
}

.span_gzwi9c {
  margin: 0 2px;
  display: inline-block
}

.div_hysyrp {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_u870ly {
  width: 75px
}

.span_6ignh {
  margin: 0 2px;
  display: inline-block
}

.div_ulbqnf {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_ufyvh {
  width: 75px
}

.div_v6y51p {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_4iluvu {
  width: 75px
}

.span_6qar50 {
  margin: 0 2px;
  display: inline-block
}

.div_yv7gd6 {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_jlbo23 {
  width: 75px
}

.span_80e9lz {
  margin: 0 2px;
  display: inline-block
}

.div_595bln {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_vbn0gd {
  width: 75px
}

.span_e8kfk4 {
  margin: 0 2px;
  display: inline-block
}

.div_dsnm59 {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_rpglda {
  width: 75px
}

.span_9pe0ae {
  margin: 0 2px;
  display: inline-block
}

.div_bymufr {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_8aeg7r {
  width: 75px
}

.el-input_6s2gmx {
  width: 100px
}

.span_ctok49 {
  margin-left: 5px
}

.div_qy3xlp {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_eiyfq2 {
  width: 75px
}

.span_n2jfbk {
  margin: 0 2px;
  display: inline-block
}

.div_babzv3 {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_n8wueh {
  width: 75px
}

.span_k9sc8a {
  margin: 0 2px;
  display: inline-block
}

.div_1hs4nw {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_h3nhp0 {
  width: 75px
}

.span_xnoggv {
  margin: 0 2px;
  display: inline-block
}

.div_f6oeoy {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_leefqm {
  width: 75px
}

.span_7tldkf {
  margin: 0 2px;
  display: inline-block
}

.div_jls7s2 {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_pczl6y {
  width: 75px
}

.div_2d4d9f {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_hc0lbf {
  width: 75px
}

.span_3u0fmh {
  margin: 0 2px;
  display: inline-block
}

.div_ldj9n8 {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_an0k7z {
  width: 75px
}

.span_lamzgy {
  margin: 0 2px;
  display: inline-block
}

.div_err7tp {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_w95siu {
  width: 75px
}

.span_2yb6pt {
  margin: 0 2px;
  display: inline-block
}

.div_ni56wf {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_njsxh3 {
  width: 75px
}

.span_cdexjl {
  margin: 0 2px;
  display: inline-block
}

.div_siph9 {
  width: auto;
  height: 28px;
  display: flex;
  display: inline-block
}

.el-select_585oxg {
  width: 75px
}

.div_a2tufs {
  margin-top: 30px
}

</style>
