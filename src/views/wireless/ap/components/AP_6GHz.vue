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
      <div class="card-panel-editable-content-wrapper" style="width: 100%;">
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

export default {
  name: 'AP_6GHz',
  components: {

    NXHTableExtends
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
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
      const keys = []
      const tableArr = []
      for (let i = 30; i < 39; i++) {
        keys.push('wlan' + i)
      }
      Object.keys(this.wifi).forEach(key => {
        if (keys.includes(key)) {
          tableArr.push({ ...this.wifi[key], paramsKey: key, key: '', highlight: this.wifi[key].disabled == '1' ? 'warning' : '', frequencyName: '6GHz' })
        }
      })
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
        params: { ...row, WireLessAPTabName: this.$options.name }
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
