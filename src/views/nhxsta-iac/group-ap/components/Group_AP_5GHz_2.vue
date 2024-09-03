<template>
  <div class="root">
    <!--              <el-input class="field-value-column-input" size="small" />-->
    <!--              <span class="field-value-column-input-tips"> Use ISO/IEC 3166 alpha2 country codes.</span>-->

    <br>
    <el-card
      shadow="never"
    >
      <div slot="header">
        <span>VAP config: {{ comment }} / {{ groupVal }}</span>
      </div>
      <div class="card-panel-editable-content-wrapper" style="width: 100%">
        <NXH-Table ref="tableRef" :table-data="tableData" :columns="columns">
          <template v-slot:default="{value}">
            <div>
              <el-button v-if="canEdit" type="primary" @click="onRowEdit(value)">Edit</el-button>
              <el-button v-else type="primary" @click="onRowEdit(value)">View</el-button>
              <!--<el-button :disabled="!canEdit" type="danger" @click="onDelEdit(value)">Delete</el-button>-->
            </div>
          </template>
        </NXH-Table>
      </div>

    </el-card>
  </div>

</template>

<script>
import NXHTable from '@/components/NXHTable'
import { mapGetters } from 'vuex'
export default {
  name: 'GroupAP5GHz2',
  components: {
    NXHTable
  },

  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      canEdit: true,
      comment: '',
      columns: [
        { label: 'wifi-iface', prop: 'paramsKey' },
        { label: 'disabled', prop: 'disabled' },
        { label: 'ssid', prop: 'ssid' },
        { label: 'encryption', prop: 'encryption' },
        { label: 'network', prop: 'network' },
        { label: 'hidden', prop: 'hidden' },
        { label: 'rrm', prop: 'rrm' },
        { label: '11ai', prop: 'ieee80211ai' },
        { label: 'wds', prop: 'wds' },
        { label: 'wnm', prop: 'wnm' },
        { label: 'isolate', prop: 'isolate' }
      ],
      groupVal: ''
    }
  },

  computed: {
    ...mapGetters(['group']),
    tableData() {
      const tableArr = []
      let groupKey = ''
      if (sessionStorage.getItem('fromAPEdit') === 'false') {
        groupKey = this.$route.query.group
      } else {
        groupKey = sessionStorage.getItem('group')
      }
      if (!this.group || !this.group[groupKey]) {
        return []
      }
      for (let i = 0; i < 9; i++) {
        const key = 'wlan2' + i
        if (this.group[groupKey][key]) {
          tableArr.push({ ...this.group[groupKey][key], paramsKey: key, highlight: this.group[groupKey][key].disabled == '1' ? 'warning' : '' })
        }
      }
      return tableArr
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
  mounted() {
    const fromFlag = sessionStorage.getItem('fromAPEdit')
    if (fromFlag === 'false') {
      this.groupVal = this.$route.query.group
      this.canEdit = this.$route.query.canEdit
      this.comment = this.$route.query.comment
    } else {
      this.groupVal = sessionStorage.getItem('group')
      this.canEdit = sessionStorage.getItem('canEdit')
      this.comment = sessionStorage.getItem('comment')
    }
  },
  methods: {
    onRowEdit(row) {
      this.$router.push({
        name: 'GroupAPEdit',
        params: { ...row, frequencyName: '5GHz_2', canEdit: this.canEdit, group: this.groupVal, comment: this.comment, APTabName: this.$options.name }
      })
    },
    updateView() {
      this.$forceUpdate()
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
