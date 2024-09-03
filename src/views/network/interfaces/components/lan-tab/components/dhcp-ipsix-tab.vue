<template>
  <div class="root">
    <!-- 当前tab数据 -->
    {{ fatherData }}
    <el-card shadow="never">
      <div class="card-panel-editable-content-wrapper">
        <el-form ref="form" :model="form" :rules="rules">
          <div class="field-row" :class="{'highlight' : hash === 'router_ad_service'}">
            <div class="field-key">
              <span class="field-key-text">Router Advertisement-Service</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="form.router_ad_service"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option v-for="(item ) in routerAdList" :key="item.value" :lable="item.label" :value="item.value" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'dhcpv6_service'}">
            <div class="field-key">
              <span class="field-key-text">DHCPv6-Service</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">

                  <el-select
                    v-model="form.dhcpv6_service"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option v-for="(item) in dchpv6List" :key="item.value" :lable="item.label" :value="item.value" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'ndp_proxy'}">
            <div class="field-key">
              <span class="field-key-text">NDP-Proxy</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="form.ndp_proxy"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option v-for="(item) in dhcpProxyList" :key="item.value" :lable="item.label" :value="item.value" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'ndp_mode'}">
            <div class="field-key">
              <span class="field-key-text">DHCPv6-Mode</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="form.ndp_mode"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option v-for="(item) in dhcpModeList" :key="item.value" :lable="item.label" :value="item.value" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'alwasys_router'}">
            <div class="field-key">
              <span class="field-key-text">Always announce default router</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="form.alwasys_router"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'an_dns_service'}">
            <div class="field-key">
              <span class="field-key-text">Announced DNS servers</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="form.an_dns_service"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="field-row" :class="{'highlight' : hash === 'an_dn_domain'}">
            <div class="field-key">
              <span class="field-key-text">Announced DNS domains</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.an_dn_domain" sizi="small" />
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
export default {
  name: 'RouterAdminV2DhcpIpsixTab',
  props: {
    fatherData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      hash: '',
      deepCopyData: {},
      form: {
        router_ad_service: '',
        dhcpv6_service: '',
        ndp_proxy: '',
        ndp_mode: '',
        alwasys_router: false,
        an_dns_service: '',
        an_dn_domain: ''
      },
      routerAdList: [{
        label: 'disabled',
        value: 'disabled'
      },
      {
        label: 'server mode',
        value: 'server mode'
      },
      {
        label: 'relay mode',
        value: 'relay mode'
      },
      {
        label: 'hybird mode',
        value: 'hybird mode'
      }
      ],
      dchpv6List: [{
        label: 'disabled',
        value: 'disabled'
      },
      {
        label: 'server mode',
        value: 'server mode'
      },
      {
        label: 'relay mode',
        value: 'relay mode'
      },
      {
        label: 'hybird mode',
        value: 'hybird mode'
      }
      ],
      dhcpProxyList: [{
        label: 'disabled',
        value: 'disabled'
      },
      {
        label: 'relay mode',
        value: 'relay mode'
      },
      {
        label: 'hybird mode',
        value: 'hybird mode'
      }
      ],
      dhcpModeList: [{
        label: 'stateless',
        value: 'stateless'
      },
      {
        label: 'stateless + stateful',
        value: 'stateless + stateful'
      },
      {
        label: 'stateful-only',
        value: 'stateful-only'
      }
      ],

      rules: {
        an_dns_service: [{
          required: true,
          message: 'please enter Announced DNS servers',
          trigger: 'blur'
        }],
        an_dn_domain: [{
          required: true,
          message: 'please enter Announced DNS domains',
          trigger: 'blur'
        }]
      }
    }
  },

  mounted() {

  },

  methods: {

  }
}

</script>

<style lang="scss" scoped>
.el-input {

}
</style>
