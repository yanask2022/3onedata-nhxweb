<template>
  <div class="root">
    <!--              <el-input class="field-value-column-input" size="small" />-->
    <!--              <span class="field-value-column-input-tips"> Use ISO/IEC 3166 alpha2 country codes.</span>-->

    <br>
    <el-card
      shadow="never"
    >
      <div slot="header">
        <span>VAP config</span>
      </div>
      <div class="card-panel-editable-content-wrapper" style="width: 100%">
        <NXHTableExtends
          ref="tableRef"
          default-slot-width="100"
          :table-data="tableData"
          :columns="columns"
        >
          <template v-slot:default="{scope}">
            <div>
              <el-button type="primary" @click="onRowEdit(scope.row)">Edit</el-button>
              <!--              <el-button type="danger" @click="onDelEdit(value)">Delete</el-button>-->
            </div>
          </template>
        </NXHTableExtends>
      </div>

    </el-card>
  </div>

</template>

<script>
import NXHTableExtends from '@/components/NXHTableExtends/index'
import { mapGetters } from 'vuex'
import * as _ from 'lodash'
import { extractNumberFromString } from '@/utils'

export default {
  name: 'AP_5GHz_1',
  components: {
    NXHTableExtends
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    paramsKey: {
      type: String,
      default: ''
    },
    freq: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      columns: [
        { label: 'ifname', prop: 'ifname', fixed: 'left' },
        { label: 'wifi-iface', prop: 'paramsKey' },
        { label: 'device', prop: 'device' },
        { label: 'disabled', prop: 'disabled' },
        { label: 'ssid', prop: 'ssid' },
        { label: 'encryption', prop: 'encryption' },
        { label: 'network', prop: 'network' },
        { label: 'hidden', prop: 'hidden' },
        { label: 'rrm', prop: 'rrm' },
        { label: '11ai', prop: 'ieee80211ai' },
        { label: 'wds', prop: 'wds' },
        { label: 'wnm', prop: 'wnm' },
        { label: 'isolate', prop: 'isolate' },
        { label: 'mcastenhance', prop: 'mcastenhance' },
        { label: 'mcast_rate', prop: 'mcast_rate' }

      ]
    }
  },

  computed: {
    ...mapGetters([
      'wifi'
    ]),
    tableData() {
      const tableArr = []
      const entries = Object.entries(this.wifi).filter(wifiConfig => {
        return wifiConfig[0].startsWith('wlan')
      })
      for (const [key, value] of entries) {
        // 如果value.device == this.params
        const configDeviceNumber = extractNumberFromString(value.device)
        const frequencyBandNumber = extractNumberFromString(this.paramsKey)
        if (configDeviceNumber === frequencyBandNumber) {
          tableArr.push({ ...value, paramsKey: key, key: '', highlight: value.disabled == '1' ? 'warning' : '', frequencyName: '2.4GHz' })
        }
      }
      return _.orderBy(tableArr, ['ifname'], ['asc'])
    }
  },
  watch: {
    isActive(newValue) {
      if (newValue === true) {
        this.$nextTick(() => {
          this.$refs.tableRef.doLayout()
        })
      }
    }
  },
  methods: {
    onRowEdit(row) {
      this.$router.push({
        name: 'APEdit',
        params: { ...row, WireLessAPTabName: this.paramsKey + '_' + this.freq }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.highlight {
  //animation: blink 1s 3 steps(1);
  background: #8ebdf5 !important;
}

@keyframes blink {
  50% {
    color: transparent;
  }
}

::v-deep .el-card__header {
  //border: unset;
}

::v-deep .el-button {
  color: #FFFFFF;
}

</style>
