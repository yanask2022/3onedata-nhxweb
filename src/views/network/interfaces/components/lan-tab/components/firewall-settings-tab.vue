<template>
  <div class="root">
    <!-- 当前tab数据 -->
    <el-card shadow="never">
      <div class="card-panel-editable-content-wrapper">
        <div class="field-row" :class="{'highlight' : hash === 'zone'}">
          <div class="field-key">
            <span class="field-key-text">firewall-zone</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <el-select v-model="form.zone" size="mini" placeholder="" style="width:203px" @change="handleChange">
                <el-option
                  v-for="item in zoneOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { syncAllChangesToStore } from '@/utils/diff'
import { mapGetters } from 'vuex'
import { getZone } from '@/api/network'
import * as _ from 'lodash'
export default {
  name: 'FirewallSettingsTab',
  props: {
    config: {
      type: Object,
      default: null
    },
    firstTabName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      deepCopyData: {},
      form: {
        name: '',
        zone: ''
      },

      hash: ''
    }
  },

  computed: {
    ...mapGetters(['interfaces', 'originalInterfaces', 'zone']),
    interfaceConfig() {
      return this.interfaces[this.config.name]
    },
    interfaceOriginConfig() {
      return this.originalInterfaces[this.config.name]
    },
    zoneOptions() {
      const options = Object.keys(this.zone).map((key) => this.zone[key].name)
      if (!Array.isArray(options)) {
        return []
      }
      return options
    }
  },
  watch: {
    interfaceConfig(newValue) {
      this.form.zone = newValue.zone
      this.form.name = newValue.name
    },
    $route: {
      // 监听路由对象
      // 是要进入当前路由
      // 从params 中取snapshot 作为当前对象
      handler(to, from) {
        if (
          to.path === this.$route.path &&
          to.params &&
          to.params.tabName &&
          to.params.tabName === this.firstTabName &&
          to.params.secondTabName === this.$options.name &&
          to.params.updatedKey) {
          this.hash = to.params.updatedKey
          this.settings = to.params.snapshot
        } else {
          this.hash = ''
        }
      },
      deep: true
    },
    form: {
      handler(newValue, oldValue) {
        // 查找差异
        const referKey = this.$route.path + '?tab=' + this.firstTabName + '&secondTabName=' + this.$options.name + '#'

        const hasChanges = syncAllChangesToStore.apply(this, [
          // 新值
          newValue,
          // 网络getdata回来的copy
          this.interfaceOriginConfig,
          // 保存到store中的key， 颗粒度指到当前改动字段
          referKey,
          (updateKey, updateValue) => {
            this.$store.commit('configs/SET_INTERFACE_CONFIG', [this.config.name, updateKey, updateValue])

            return {
              path: referKey + updateKey,
              data: {
                api: `interface-set`,
                // 当前改动
                snapshot: this.interfaceConfig,
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
                    params: { tabName: this.firstTabName, updatedKey: updateKey }
                  },
                  {
                    title: this.firstTabName,
                    query: { tabName: this.firstTabName },
                    params: { tabName: this.firstTabName, updatedKey: updateKey }
                  },
                  {
                    // 第二级tab
                    title: this.$options.name,
                    query: { tabName: this.firstTabName, secondTabName: this.$options.name },
                    params: { tabName: this.firstTabName, secondTabName: this.$options.name, updatedKey: updateKey }
                  },
                  {
                    title: updateKey,
                    query: { tabName: this.firstTabName, secondTabName: this.$options.name + '#' + updateKey },
                    params: { tabName: this.firstTabName, secondTabName: this.$options.name, updatedKey: updateKey }
                  }
                ]
              }
            }
          }
        ])
        if (!hasChanges) {
          this.hash = ''
        }
        // this.$emit('onEditStatusChange', { tableName: this.$options.name, isEdit: hasChanges })
      },
      deep: true
    },
    deep: true
  },
  methods: {
    handleChange(e) {
      // this.$emit('onChangeDHCP', e)
    }
  }
}
</script>

<style scoped>

</style>
