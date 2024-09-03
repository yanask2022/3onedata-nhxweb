<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      // this.setOptions(this.chartData)
      this.setOptions()
    },

    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        color: ['#bf2266', '#51cbd5'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          data: [{
            name: 'Client',
            icon: 'circle'
          }, {
            name: 'Traffic',
            icon: 'circle'

          }],
          right: 30,
          top: 10
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          interval: 1000 * 3600,
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: 'Client',
            type: 'line',
            stack: 'Total',
            smooth: false,
            data: [
              ['2022-07-14 00:00:00', 0],
              ['2022-07-14 01:00:00', 0],
              ['2022-07-14 02:00:00', 0],
              ['2022-07-14 03:00:00', 0],
              ['2022-07-14 04:00:00', 0],
              ['2022-07-14 05:00:00', 0],
              ['2022-07-14 06:00:00', 0],
              ['2022-07-14 07:00:00', 0],
              ['2022-07-14 08:00:00', 0],
              ['2022-07-14 09:00:00', 0],
              ['2022-07-14 10:00:00', 0],
              ['2022-07-14 11:00:00', 0],
              ['2022-07-14 12:00:00', 0],
              ['2022-07-14 13:00:00', 0],
              ['2022-07-14 14:00:00', 0],
              ['2022-07-14 15:00:00', 0],
              ['2022-07-14 16:00:00', 0],
              ['2022-07-14 17:00:00', 0],
              ['2022-07-14 18:00:00', 0],
              ['2022-07-14 19:00:00', 0],
              ['2022-07-14 20:00:00', 0],
              ['2022-07-14 21:00:00', 1],
              ['2022-07-14 22:00:00', 5],
              ['2022-07-14 23:00:00', 7],
              ['2022-07-14 24:00:00', 10]
            ],
            tooltip: {
              formatter: '{b}: {c} GB'
            }
          },
          {
            name: 'Traffic',
            type: 'line',
            stack: 'Total',
            smooth: false,
            data: [
              ['2022-07-14 00:00:00', 0],
              ['2022-07-14 01:00:00', 0],
              ['2022-07-14 02:00:00', 0],
              ['2022-07-14 03:00:00', 0],
              ['2022-07-14 04:00:00', 0],
              ['2022-07-14 05:00:00', 0],
              ['2022-07-14 06:00:00', 0],
              ['2022-07-14 07:00:00', 0],
              ['2022-07-14 08:00:00', 0],
              ['2022-07-14 09:00:00', 0],
              ['2022-07-14 10:00:00', 0],
              ['2022-07-14 11:00:00', 0],
              ['2022-07-14 12:00:00', 0],
              ['2022-07-14 13:00:00', 0],
              ['2022-07-14 14:00:00', 0],
              ['2022-07-14 15:00:00', 0],
              ['2022-07-14 16:00:00', 0],
              ['2022-07-14 17:00:00', 0],
              ['2022-07-14 18:00:00', 0],
              ['2022-07-14 19:00:00', 0],
              ['2022-07-14 20:00:00', 0],
              ['2022-07-14 21:00:00', 0.50],
              ['2022-07-14 22:00:00', 3.09],
              ['2022-07-14 23:00:00', 6.38],
              ['2022-07-14 24:00:00', 11.26]
            ],
            tooltip: {
              formatter: '{b}: {c} GB'
            }
          }
        ]
      })
    }
  }
}
</script>
