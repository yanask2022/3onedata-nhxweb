<template>
  <div class="root">
    <!-- 当前tab数据 -->
    <el-card shadow="never">
      <div class="card-panel-editable-content-wrapper">
        <el-form ref="form" :model="form" :rules="rules">

          <div class="field-row" :class="{'highlight' : hash === 'proto'}">
            <div class="field-key">
              <span class="field-key-text">Protocol</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="form.proto"
                    style="width: 100%"
                    size="small"
                    @change="selectChange"
                  >
                    <el-option v-for="(item) in protocolList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <template v-if="showPppoeFormItem">
            <div class="field-row" :class="{'highlight' : hash === 'username'}">
              <div class="field-key">
                <span class="field-key-text">Username</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.username" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
            <div class="field-row" :class="{'highlight' : hash === 'password'}">
              <div class="field-key">
                <span class="field-key-text">Password</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.password" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-if="showOtherFormItem">
            <div class="field-row" :class="{'highlight' : hash === 'ipv4_address'}">
              <div class="field-key">
                <span class="field-key-text">IPv4 address</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv4addr" sizi="small" />
                  </div>
                </div>
              </div>
            </div>

            <div class="field-row" :class="{'highlight' : hash === 'ipv4_netmask'}">
              <div class="field-key">
                <span class="field-key-text">IPv4 netmask</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-select
                      v-model="form.ipv4mask"
                      style="width: 100%"
                      allow-create
                      filterable
                      size="small"
                    >
                      <el-option v-for="(item) in ipv4List" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </div>
              </div>
            </div>

            <!--            -->
            <div class="field-row" :class="{'highlight' : hash === 'ipv4_gateway'}">
              <div class="field-key">
                <span class="field-key-text">IPv4 gateway</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv4gateway" sizi="small" />
                  </div>
                </div>
              </div>
            </div>

            <!--
            <div  class="field-row" :class="{'highlight' : hash === 'ipv4_broadcast'}">
              <div class="field-key">
                <span class="field-key-text">IPv4 broadcast</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv4_broadcast" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
-->

            <!--<div  class="field-row" :class="{'highlight' : hash === 'ipv6_assignment_length'}">
              <div class="field-key">
                <span class="field-key-text">IPv6 assignment length</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-select
                      v-model="form.ipv6_assignment_length"
                      style="width: 100%"
                      size="small"
                    >
                      <el-option v-for="(item) in ipv6AssignmentLength" :label="item.label" :value="item.value" :key="item.value" />
                    </el-select>
                  </div>
                </div>
              </div>
            </div>-->
          </template>

          <template v-if="showDHCPFormItem">
            <div v-if="config.status.ipaddrs[0]" class="field-row" :class="{'highlight' : hash === 'ipv4_address'}">
              <div class="field-key">
                <span class="field-key-text">IPv4 address</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="config.status.ipaddrs[0].addr" disabled sizi="small" />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="config.status.ipaddrs[0]" class="field-row" :class="{'highlight' : hash === 'ipv4_netmask'}">
              <div class="field-key">
                <span class="field-key-text">IPv4 netmask</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="config.status.ipaddrs[0].netmask" disabled sizi="small" />
                  </div>
                </div>
              </div>
            </div>

            <!--            -->
            <div v-if="config.status.ipaddrs[0]" class="field-row" :class="{'highlight' : hash === 'ipv4_gateway'}">
              <div class="field-key">
                <span class="field-key-text">IPv4 gateway</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <!-- TODO 没有网关字段-->
                    <el-input v-model="config.status.ipaddrs[0].gateway" disabled sizi="small" />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div class="field-row" :class="{'highlight' : hash === 'dns'}">
            <div class="field-key">
              <span class="field-key-text">dns</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.dns" sizi="small" @input="onDNSInput" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'peerdns'}">
            <div class="field-key">
              <span class="field-key-text">peerdns</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="form.peerdns"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option  :value="0" />
                    <el-option  :value="1" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <template v-if="showIPv6FormItem">
            <div class="field-row" :class="{'highlight' : hash === 'ipv6_assignment_hint'}">
              <div class="field-key">
                <span class="field-key-text">IPv6 assignment hint</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv6_assignment_hint" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
            <!--            -->
            <div class="field-row" :class="{'highlight' : hash === 'ipv6_address'}">
              <div class="field-key">
                <span class="field-key-text">IPv6 address</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv6_address" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
            <!--            -->
            <div class="field-row" :class="{'highlight' : hash === 'ipv6_gateway'}">
              <div class="field-key">
                <span class="field-key-text">IPv6 gateway</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv6_gateway" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!--<template v-else>
            <div  class="field-row" :class="{'highlight' : hash === 'ipv6_routed_prefix'}">
              <div class="field-key">
                <span class="field-key-text">IPv6 routed prefix</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="form.ipv6_routed_prefix" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
          </template>-->
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<script>
import { syncAllChangesToStore } from '@/utils/diff'
import { mapGetters } from 'vuex'
export default {
  name: 'GeneralSetupTab',
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
        proto: 'static',
        ipv4addr: '',
        ipv4mask: '255.255.255.0',
        ipv4gateway: '',
        // ipv4_broadcast: '',
        dns: '',
        peerdns: ''
        // ipv6_assignment_length: '60',
        // ipv6_assignment_hint: '',
        // ipv6_address: '',
        // ipv6_gateway: '',
        // ipv6_routed_prefix: ''
      },
      protocolList: [
        { label: 'Static address', value: 'static' },
        { label: 'DHCP Client', value: 'dhcp' },
        { label: 'PPPoE', value: 'pppoe' }
      ],
      ipv4List: [
        { label: '255.255.255.0', value: '255.255.255.0' },
        { label: '255.255.0.0', value: '255.255.0.0' },
        { label: '255.0.0.0', value: '255.0.0.0' }
      ],
      ipv6AssignmentLength: [
        { label: '60', value: '60' },
        { label: '64', value: '64' },
        { label: 'disabled', value: 'disabled' }
      ],
      rules: {
        proto: [{
          required: true,
          message: 'Please select a protocol',
          trigger: 'blur'
        }],
        ipv4addr: [{
          required: true,
          message: 'Please enter the ipv4 address',
          trigger: 'blur'
        }],
        ipv4gateway: [{
          required: true,
          message: 'Please slect ipv4 of gateway',
          trigger: 'blur'
        }],
        ipv4_broadcast: [{
          required: true,
          message: 'Please enter the ipv4 broadcast',
          trigger: 'blur'
        }],
        dns: [{
          required: true,
          message: 'Please enter the dns serve',
          trigger: 'blur'
        }],
        ipv6_assignment_length: [{
          required: true,
          message: 'Please slect ipv6 of ipv6_assignment_length',
          trigger: 'blur'
        }],
        ipv6_assignment_hint: [{
          required: true,
          message: 'Please enter the ipv6_assignment_hint',
          trigger: 'blur'
        }],
        ipv6_address: [{
          required: true,
          message: 'Please enter the ipv6 address',
          trigger: 'blur'
        }],
        ipv6_gateway: [{
          required: true,
          message: 'Please enter the ipv4 gateway',
          trigger: 'blur'
        }],
        ipv6_routed_prefix: [{
          required: true,
          message: 'Please enter the ipv4 ipv6_routed_prefix',
          trigger: 'blur'
        }]
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
    },
    showOtherFormItem() {
      return this.form.proto === 'static'
    },
    showPppoeFormItem() {
      return this.form.proto === 'pppoe'
    },
    showDHCPFormItem() {
      return this.form.proto === 'dhcp'
    },
    showIPv6FormItem() {
      return this.form.ipv6_assignment_length === 'disabled'
    }
  },
  watch: {
    interfaceConfig(newValue) {
      this.form.proto = newValue.proto
      this.form.ipv4addr = newValue.ipv4addr
      this.form.ipv4mask = newValue.ipv4mask
      this.form.ipv4gateway = newValue.ipv4gateway
      this.form.dns = newValue.dns
      this.form.name = newValue.name
      this.form.peerdns = newValue.peerdns
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
          // 原始未改动的配置
          this.interfaceOriginConfig,
          // 保存到store中的key， 颗粒度指到当前改动字段
          referKey,
          (updateKey, updateValue) => {
          // 1.将当前改动同步到vuex 中的 interfaces
            this.$store.commit('configs/SET_INTERFACE_CONFIG', [this.config.name, updateKey, updateValue])
            // 2.返回保存到改动数组的item
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
      },
      deep: true
    }
  },
  methods: {
    onDNSInput(value) {
      this.form.dns = value.replace(/[^0-9.]/g, '')
    },
    selectChange(e) {
      this.$emit('onProtoChange', e)
    }
  }
}

</script>

<style scoped>
.el-input {

}
</style>
