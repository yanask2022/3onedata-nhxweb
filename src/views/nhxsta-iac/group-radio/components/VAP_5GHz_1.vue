<template>
  <div class="root">
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header">
        <span>radio config: {{ $route.query.comment }} / {{ $route.query.iname }}</span>
      </div>
      <div class="card-panel-editable-content-wrapper">

        <!-- wireless radio-->
        <div class="field-row" :class="{'highlight' : hash === 'disabled'}">
          <div class="field-key">
            <span class="field-key-text">5GHz Wireless Radio</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-checkbox
                  id="disabled"
                  v-model="settings.disabled"
                  :disabled="!canEdit"
                  label="Enable"
                  true-label="0"
                  false-label="1"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- wireless mode -->
        <div class="field-row" :class="{'highlight' : hash === 'hwmode'}">
          <div class="field-key">
            <span id="hwmode" class="field-key-text">Wireless Mode</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.hwmode"
                  :disabled="!canEdit"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    value="11axa"
                  />
                  <el-option
                    value="11ac"
                  />
                  <el-option
                    value="11na"
                  />
                  <el-option
                    value="11a"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <!-- channel Width -->
        <div class="field-row" :class="{'highlight' : hash === 'htmode'}">
          <div class="field-key">
            <span class="field-key-text">Channel Width</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.htmode"
                  :disabled="!canEdit"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    value="auto"
                  />
                  <el-option
                    value="HT160"
                  />
                  <el-option
                    value="HT80"
                  />
                  <el-option
                    value="HT40"
                  />
                  <el-option
                    value="HT20"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <!-- channel -->
        <div class="field-row" :class="{'highlight' : hash === 'channel'}">
          <div class="field-key">
            <span class="field-key-text">Channel</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.channel"
                  :disabled="!canEdit"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    v-for="(chanOpt, chanOptIndex) in chanlist"
                    :key="chanOptIndex"
                    :value="chanOpt"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div v-if="settings.txpower" class="field-row">
          <div class="field-key">
            <span class="field-key-text">Tx Power</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input
                  v-model="settings.txpower"
                  :disabled="!canEdit"
                  type="number"
                  size="mini"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

    </el-card>
    <br>

  </div>

</template>

<script>
// import { wifi } from '@/api/wifi'
import { group_get_config, group_set_config } from '@/api/ac'
import lodash from 'lodash'
import { syncAllChangesToStore } from '@/utils/diff'
import * as _ from 'lodash'

export default {
  name: 'VAP5GHz1',
  props: {
    canEdit: {
      type: Boolean,
      default: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      chanlist: [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 149, 153, 157, 161, 165],
      settings: {
        disabled: 0,
        hwmode: '',
        htmode: '',
        channel: '',
        current_channel: '',
        txpower: ''
      },
      settingsCopy: null,
      globalSaveClickEventCallback: null,
      globalDiscardEventCallback: null,
      changesCounter: 0,
      hash: '',
      groupVal: { }
    }
  },
  watch: {
    $route: {
      // 监听路由对象
      // 是要进入当前路由
      // 从params 中取snapshot 作为当前对象
      handler(to, from) {
        if (
          to.path === this.$route.path &&
          to.params &&
          to.params.tabName &&
          to.params.tabName === this.$options.name &&
          to.params.updatedKey) {
          console.log('to.hash', to.params.updatedKey)
          this.hash = to.params.updatedKey
          this.settings = to.params.snapshot
        } else {
          this.hash = ''
        }
      },
      deep: true
    },
    'settings': {
      handler(newValue, oldValue) {
        // this.saveCurrentGroupRadio1Config()
        // 查找差异
        const referKey = this.$route.path + '?tab=' + this.$options.name + '#'
        const hasChanges = syncAllChangesToStore.apply(this, [
          // 新值
          newValue,
          // 网络getdata回来的copy
          this.settingsCopy,
          // 保存到store中的key， 颗粒度指到当前改动字段
          referKey,
          (updateKey, updateValue) => {
            return {
              path: referKey + updateKey,
              data: {
                api: 'group-set',
                // 当前改动
                snapshot: { ...newValue },
                // 用于 router-link to:name 方式跳转回来
                name: this.$route.name,
                // 当前改动键
                updatedKey: updateKey,
                // 当前改动值
                updateValue: updateValue,
                routers: [
                  {
                    // 显示在改动列表的路由tag
                    title: this.$route.path,
                    // 用于触发 $route 的 watch
                    query: '',
                    // 用于从改动列表跳转回来时标识当前改动
                    params: { tabName: this.$options.name, updatedKey: updateKey }
                  },
                  {
                    title: this.$options.name,
                    query: { tabName: this.$options.name },
                    params: { tabName: this.$options.name, updatedKey: updateKey }
                  },
                  {
                    title: updateKey,
                    query: {
                      tabName: this.$options.name,
                      group: this.$route.query.group
                    },
                    params: { tabName: this.$options.name, updatedKey: updateKey }
                  }
                ]
              }
            }
          }
        ])
        if (!hasChanges) {
          this.hash = ''
        }
        this.$emit('onEditStatusChange', { tableName: this.$options.name, isEdit: hasChanges })
      },
      deep: true
    }
  },
  created() {
    this.groupVal = this.$route.params
  },
  mounted() {
    // this.globalSaveClickEventCallback = ({ path }) => {
    //   const loading = this.$loading({
    //      lock: true,
    //      text: 'Saving...',
    //      spinner: 'el-icon-loading',
    //      background: 'rgba(0, 0, 0, 0.7)'
    //    })
    //    const params = {}
    //    params['radio1'] = this.settings
    //    params['group'] = this.groupVal.group
    //    group_set_config(params).then(res => {
    //      loading.close()
    //      this.$message({
    //        type: 'success',
    //        message: 'Save success'
    //      })
    //    }).catch(() => {
    //      loading.close()
    //    })
    // }
    // this.globalDiscardEventCallback = ({ path }) => {
    //   // if (this.$route.path == path) {
    //   this.settings = _.cloneDeep(this.settingsCopy)
    //   this.hash = ''
    //   this.$emit('onEditStatusChange', { tableName: this.$options.name, isEdit: false })
    //   // }
    // }
    // this.$EventBus.$on('GlobalSaveClick', this.globalSaveClickEventCallback)
    // this.$EventBus.$on('GlobalDiscard', this.globalDiscardEventCallback)
    this.getData()
  },
  beforeDestroy() {
    // this.$EventBus.$off('GlobalSaveClick', this.globalSaveClickEventCallback)
    // this.$EventBus.$off('GlobalDiscard', this.globalDiscardEventCallback)
  },
  methods: {
    submit() {
      // TODO submit
      console.log('submit')
    },
    updateView() {
      this.$forceUpdate()
    },
    // saveCurrentGroupRadio1Config() {
    //   const params = {}
    //   params['channel'] = this.settings.channel
    //   params['htmode'] = this.settings.htmode
    //   params['hwmode'] = this.settings.hwmode
    //   params['disabled'] = this.settings.disabled
    //   this.saveCurrentGroupConfig(this.groupVal.group, 'radio1', params)
    // },
    // saveCurrentGroupConfig(groupId, key, paramsObj) {
    //   const loading = this.$loading({
    //     lock: true,
    //     text: 'Saving...',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   })
    //   const params = {}
    //   params[`${key}`] = paramsObj
    //   params['group'] = groupId
    //   group_set_config(params).then(res => {
    //     loading.close()
    //     this.$message({
    //       type: 'success',
    //       message: 'Save success'
    //     })
    //   }).catch(() => {
    //     loading.close()
    //   })
    // },
    getData() {
      group_get_config({
        group: this.$route.query.group
      }).then(res => {
        res.raido1.paramsKey = 'radio1'
        res.raido1.group = this.$route.query.group
        this.settingsCopy = res.raido1
        this.settings = _.cloneDeep(res.raido1)
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
