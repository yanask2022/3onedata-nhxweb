<template>
  <div class="root">
    <!-- 当前tab数据 -->
    <el-card shadow="never">
      <div class="card-panel-editable-content-wrapper">
        <el-form ref="form" :model="form" :rules="rules">
          <div class="field-row" :class="{'highlight' : hash === 'ignore'}">
            <div class="field-key">
              <span class="field-key-text">Ignore interface</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox v-model="form.ignore" true-label="1" false-label="0" />
                </div>
              </div>
            </div>
          </div>

          <div v-show="form.ignore == '0'" class="field-row" :class="{'highlight' : hash === 'start'}">
            <div class="field-key">
              <span class="field-key-text">Start</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.start" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div v-show="form.ignore == '0'" class="field-row" :class="{'highlight' : hash === 'limit'}">
            <div class="field-key">
              <span class="field-key-text">Limit</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.limit" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div v-show="form.ignore == '0'" class="field-row" :class="{'highlight' : hash === 'leasetime'}">
            <div class="field-key">
              <span class="field-key-text">Leasetime</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.leasetime" sizi="small" />
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { syncAllChangesToStore } from '@/utils/diff'
import * as _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
  name: 'DhcpGeneralTab',
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
      hash: '',
      form: {
        ignore: false,
        start: '',
        limit: '',
        leasetime: ''
      },
      rules: {
        start: [{
          required: true,
          message: 'please enter start',
          trigger: 'blur'
        }
        ],
        limit: [{
          required: true,
          message: 'please enter limit',
          trigger: 'blur'
        }
        ],
        leasetime: [{
          required: true,
          message: 'please enter leasetime',
          trigger: 'blur'
        }
        ]

      }
    }
  },
  computed: {
    ...mapGetters(['interfaces', 'originalInterfaces']),
    interfaceConfig() {
      return this.interfaces[this.config.name]
    },
    interfaceOriginConfig() {
      return this.originalInterfaces[this.config.name]
    }
  },
  watch: {
    interfaceConfig(newValue) {
      this.form.ignore = newValue.dhcps.ignore
      this.form.force = newValue.dhcps.force
      this.form.start = newValue.dhcps.start
      this.form.limit = newValue.dhcps.limit
      this.form.leasetime = newValue.dhcps.leasetime
    },
    $route: {
      handler(to, from) {
        if (
          to.path === this.$route.path &&
          to.params &&
          to.params.tabName &&
          to.params.tabName === this.firstTabName &&
          to.params.secondTabName === this.$options.name &&
          to.params.updatedKey) {
          this.hash = to.params.updatedKey
          // this.settings = to.params.snapshot
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
          this.interfaceOriginConfig.dhcps,
          // 保存到store中的key， 颗粒度指到当前改动字段
          referKey,
          (updateKey, updateValue) => {
            this.$store.commit('configs/SET_INTERFACE_CONFIG', [this.config.name, 'dhcps', newValue])
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
                    // 页面
                    title: this.$route.path,
                    // 用于触发 $route 的 watch
                    query: '',
                    // 用于从改动列表跳转回来时标识当前改动
                    params: { tabName: this.firstTabName, updatedKey: updateKey }
                  },
                  {
                    // 第一级tab
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
                    // 改动键
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
    }
  }
}

</script>
