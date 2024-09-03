<template>
  <div class="root">
    <!-- 当前tab数据 -->
    <el-card shadow="never">
      <div class="card-panel-editable-content-wrapper">
        <el-form ref="form" :model="form" :rules="rules">
          <!--<div class="field-row" :class="{'highlight' : hash === 'enbaleBoot'}">
            <div class="field-key">
              <span class="field-key-text">Bring up on boot</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox v-model="form.enbaleBoot" />
                </div>
              </div>
            </div>
          </div>
          <div class="field-row" :class="{'highlight' : hash === 'enableIpv6'}">
            <div class="field-key">
              <span class="field-key-text">Use builtin IPv6-management</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox v-model="form.enableIpv6" />
                </div>
              </div>
            </div>
          </div>-->

          <div class="field-row" :class="{'highlight' : hash === 'mac_address'}">
            <div class="field-key">
              <span class="field-key-text">Override MAC address</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.macaddr" sizi="small" />
                </div>
              </div>
            </div>
          </div>
          <div class="field-row" :class="{'highlight' : hash === 'mtu'}">
            <div class="field-key">
              <span class="field-key-text">Override MTU</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.mtu" sizi="small" />
                </div>
              </div>
            </div>
          </div>
          <div class="field-row" :class="{'highlight' : hash === 'use_gateway'}">
            <div class="field-key">
              <span class="field-key-text">Use gateway metric</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.metric" sizi="small" />
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
import { mapGetters } from 'vuex'
export default {
  name: 'AdvancedSettingsTab',
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
        name: '',
        macaddr: '',
        mtu: '1500',
        metric: '0'
      },
      rules: {
        macaddr: [
          {
            required: true,
            message: 'Please enter the mac address',
            trigger: 'blur'
          }
        ],
        mtu: [
          {
            required: true,
            message: 'Please enter the mtu',
            trigger: 'blur'
          }
        ],
        metric: [
          {
            required: true,
            message: 'Please enter the number of gateways',
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
      this.form.mtu = newValue.mtu
      this.form.macaddr = newValue.macaddr
      this.form.metric = newValue.metric
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
  }
}

</script>

<style scoped>
.el-input {

}

</style>
