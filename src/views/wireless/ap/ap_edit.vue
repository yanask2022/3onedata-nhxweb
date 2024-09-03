<template>
  <div class="root">
    <span class="title">VAP Edit</span>
    <el-card>
      <div slot="header">
        <span>{{ frequencyName }} / VAP {{ ap.ifname }}: {{ ap.ssid }}</span>
      </div>
      <div class="card-panel-editable-content-wrapper">
        <el-form ref="postForm" :model="ap" :rules="rules" class="form-container">

          <div class="field-row" :class="{'highlight' : hash === 'ifname'}">
            <div class="field-key">
              <span class="field-key-text">ifname</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <!--<el-checkbox-->
                  <!--  v-model="ap.ifname"-->
                  <!--  true-label="0"-->
                  <!--  false-label="1"-->
                  <!--/>-->
                  <span>{{ ap.ifname }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- device -->
          <div class="field-row" :class="{'highlight' : hash === 'device'}">
            <div class="field-key">
              <span class="field-key-text">device</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <span>{{ ap.device }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- enable-->
          <div class="field-row" :class="{'highlight' : hash === 'disabled'}">
            <div class="field-key">
              <span class="field-key-text">Enable</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="ap.disabled"
                    true-label="0"
                    false-label="1"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- SSID -->
          <div class="field-row" :class="{'highlight' : hash === 'ssid'}">
            <div class="field-key">
              <span class="field-key-text">SSID:</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.ssid" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'wpa_version'}">
            <div class="field-key">
              <span class="field-key-text">wpa version</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="ap.wpa_version"
                    style="width: 100%"
                    size="small"
                    @change="onWapVersionChange"
                  >
                    <el-option value="personal"  />
                    <el-option value="enterprise" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Mode -->
          <div class="field-row" :class="{'highlight' : hash === 'encryption'}">
            <div class="field-key">
              <span class="field-key-text">encryption</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="ap.encryption"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option v-for="(op, opIndex) in encryptionOptions" :key="opIndex" :value="op" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <!-- pwd -->
          <div v-if="ap.wpa_version === 'personal' && ap.encryption !== 'none' && ap.encryption !== ''" class="field-row" :class="{'highlight' : hash === 'key'}">
            <div class="field-key">
              <span class="field-key-text">key</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.key" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.encryption === 'sae' || ap.encryption === 'sae-mixed'" class="field-row" :class="{'highlight' : hash === 'sae'}">
            <div class="field-key">
              <span class="field-key-text">sae</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="ap.sae"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'nasid'}">
            <div class="field-key">
              <span class="field-key-text">nasid</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.nasid" sizi="small" />
                </div>
              </div>
            </div>
          </div>

<!--          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'ownip'}">-->
<!--            <div class="field-key">-->
<!--              <span class="field-key-text">ownip</span>-->
<!--            </div>-->
<!--            <div class="field-value">-->
<!--              <div class="field-value-column">-->
<!--                <div class="field-value-column-input">-->
<!--                  <el-input v-model="ap.ownip"  sizi="small" />-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'auth_server'}">
            <div class="field-key">
              <span class="field-key-text">auth_server</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.auth_server" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'auth_port'}">
            <div class="field-key">
              <span class="field-key-text">auth_port</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.auth_port" sizi="small" placeholder="1812"/>
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'auth_secret'}">
            <div class="field-key">
              <span class="field-key-text">auth_secret</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.auth_secret" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'rsn_preauth'}">
            <div class="field-key">
              <span class="field-key-text">rsn_preauth</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.rsn_preauth" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'rsn_preauth_interfaces'}">
            <div class="field-key">
              <span class="field-key-text">rsn_preauth_interfaces</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <!--<el-input v-model="ap.rsn_preauth_interfaces" sizi="small" />-->
                  <el-select
                    v-model="ap.rsn_preauth_interfaces"
                    style="width: 100%"
                    size="small"
                    allow-create
                    filterable
                    placeholder="Please select one or enter it directly"
                  >
                    <el-option value="br-lan"/>
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'acct_server'}">
            <div class="field-key">
              <span class="field-key-text">acct_server</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.acct_server" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'acct_port'}">
            <div class="field-key">
              <span class="field-key-text">acct_port</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.acct_port" sizi="small" placeholder="1813" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'acct_secret'}">
            <div class="field-key">
              <span class="field-key-text">acct_secret</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.acct_secret" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'dae_client'}">
            <div class="field-key">
              <span class="field-key-text">dae_client</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.dae_client" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'dae_port'}">
            <div class="field-key">
              <span class="field-key-text">dae_port</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.dae_port" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'dae_secret'}">
            <div class="field-key">
              <span class="field-key-text">dae_secret</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.dae_secret" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <!-- ssid broadcast -->
          <div class="field-row" :class="{'highlight' : hash === 'hidden'}">
            <div class="field-key">
              <span class="field-key-text">SSID Broadcast</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="ap.hidden"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- rrm -->
          <div class="field-row" :class="{'highlight' : hash === 'rrm'}">
            <div class="field-key">
              <span class="field-key-text">rrm</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="ap.rrm"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- network -->
          <div class="field-row" :class="{'highlight' : hash === 'network'}">
            <div class="field-key">
              <span class="field-key-text">network</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <span>{{ ap.network }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 11ai -->
          <div class="field-row" :class="{'highlight' : hash === 'ieee80211ai'}">
            <div class="field-key">
              <span class="field-key-text">ieee80211ai:</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="ap.ieee80211ai"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- wds -->
          <div class="field-row" :class="{'highlight' : hash === 'wds'}">
            <div class="field-key">
              <span class="field-key-text">wds</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="ap.wds"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- wnm -->
          <div class="field-row" :class="{'highlight' : hash === 'wnm'}">
            <div class="field-key">
              <span class="field-key-text">wnm</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="ap.wnm"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- SSID Isolation -->
          <div class="field-row" :class="{'highlight' : hash === 'isolate'}">
            <div class="field-key">
              <span class="field-key-text">SSID Isolation</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="ap.isolate"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'mcastenhance'}">
            <div class="field-key">
              <span class="field-key-text">mcastenhance</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="ap.mcastenhance"
                    style="width: 100%"
                    size="small"
                    allow-create
                    filterable
                    placeholder="Please select one or enter it directly"
                  >
                    <el-option value="0"/>
                    <el-option value="2"/>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <div class="field-row" :class="{'highlight' : hash === 'mcast_rate'}">
            <div class="field-key">
              <span class="field-key-text">mcast_rate</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.mcast_rate" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <!-- txpower-->
          <div class="field-row" :class="{'highlight' : hash === 'txpower'}">
            <div class="field-key">
              <span class="field-key-text">txpower</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="ap.txpower"
                    style="width: 100%"
                    size="small"
                    placeholder=""
                  >
                    <el-option value="" lable="" />
                    <el-option value="auto" lable="auto" />
                    <el-option v-for="index in 27" :key="index" :value="index + ''" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <!-- maxsta-->
          <div class="field-row" :class="{'highlight' : hash === 'maxsta'}">
            <div class="field-key">
              <span class="field-key-text">maxsta</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input :value="parseInt(ap.maxsta)" size="small" :min="1" :max="512" @change="modAPMaxSta" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'vid'}">
            <div class="field-key">
              <span class="field-key-text">vid</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.vid" type="number" sizi="small" />
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
// import UnsavedAlert from '@/mixins/unsaved-alert'
import { syncAllChangesToStore } from '@/utils/diff'
import * as _ from 'lodash'
import { mapGetters } from 'vuex'


export default {
  name: 'APEdit',
  // mixins: [UnsavedAlert],
  data() {
    return {
      encryptionOptions: [],
      frequencyName: '',
      rules: {
        //  TODO
      },
      ap: {
        mcastenhance: '',
        sae: 1,
        vid: '',
        txpower: '',
        maxsta: '',
        device: '',
        disabled: '',
        encryption: '',
        hidden: '',
        highlight: '',
        ieee80211ai: '',
        ifname: '',
        isolate: '',
        key: '',
        network: '',
        paramsKey: '',
        rrm: '',
        ssid: '',
        wds: '',
        wnm: '',

        ownip: '',
        auth_server: '',
        auth_port: '',
        auth_secret: '',
        rsn_preauth: '',
        rsn_preauth_interfaces: '',
        acct_server: '',
        acct_port: '',
        acct_secret: '',
        auth: '',
        dae_secret: '',
        dae_port: '',
        dae_client: ''

      },
      // isEdit: false,
      updateCount: 0,
      apCopy: null,
      hash: '',
      paramsKey: '',
      WireLessAPTabName: '',
      personalOptions: [
        'none',
        'mixed-psk',
        'psk2+tkip+ccmp',
        'psk2+ccmp',
        'psk2+tkip+aes',
        'psk2+aes',
        'sae',
        'sae-mixed'
      ],
      enterpriseOptions: [
        'wpa2',
        'wpa3',
        'wpa3-mixed',
        'wpa2+tkip+ccmp',
        'wpa2+tkip+aes',
        'wpa2+ccmp',
        'wpa+tkip+ccmp',
        'wpa+tkip+aes'
      ],
      globalDiscardEventCallback: null,
      globalSaveClickEventCallback: null
    }
  },
  computed: {
    ...mapGetters(['wifi', 'originalWifi'])
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.fullPath !== from.fullPath) {
          this.getData()
        }
      },
      deep: true
    },
    'ap.encryption': {
      handler(v) {
        if (v === 'sae' || v === 'sae-mixed'){
          this.ap.sae = '1'
        } else {
          this.ap.sae = '0'
        }
      }

    },
    ap: {
      handler(newValue, oldValue) {
        // 查找差异
        const referKey = this.$route.path + '?ifname=' + newValue.ifname + '#'
        const hasChanges = syncAllChangesToStore.apply(this, [
          // 新值
          newValue,
          { ...this.originalWifi[this.paramsKey], paramsKey: this.paramsKey },
          // 保存到store中的key， 颗粒度指到当前改动字段
          referKey,
          (updateKey, updateValue) => {
            return {
              path: referKey + updateKey,
              data: {
                //
                api: 'wifi-set',
                // 当前改动
                snapshot: { ...newValue, paramsKey: this.paramsKey },
                // 用于 router-link to:name 方式跳转回来
                name: this.$route.name,
                // 当前改动键
                updatedKey: updateKey,
                // 当前改动值
                updateValue: updateValue,
                routers: [
                  {
                    title: this.$route.path,
                    query: { paramsKey: this.paramsKey, updatedKey: updateKey, frequencyName: this.frequencyName },
                    params: { paramsKey: this.paramsKey, updatedKey: updateKey, frequencyName: this.frequencyName, WireLessAPTabName: this.WireLessAPTabName }
                  },
                  {
                    title: newValue.ifname + ':' + updateKey,
                    query: { paramsKey: this.paramsKey, updatedKey: updateKey, frequencyName: this.frequencyName },
                    params: { paramsKey: this.paramsKey, updatedKey: updateKey, frequencyName: this.frequencyName, WireLessAPTabName: this.WireLessAPTabName }
                  }
                ]
              }
            }
          }
        ])
        if (!hasChanges) {
          this.hash = ''
        }
        this.$store.commit('configs/SET_WIFI_CONFIG', [this.paramsKey, this.ap])
      },
      deep: true
    }
  },
  mounted() {
    this.WireLessAPTabName = this.$route.params.WireLessAPTabName
    sessionStorage.setItem('WireLessAPTabName', this.WireLessAPTabName)
    this.$store.dispatch('configs/getWifi').then(wifi => {
      if (this.$route.params && this.$route.params.paramsKey) {
        this.getData()
      }
    })

    this.globalDiscardEventCallback = ({ path }) => {
      this.$store.dispatch('configs/getWifi').then(wifi => {
        if (this.$route.params && this.$route.params.paramsKey) {
          this.getData()
        }
      })
    }
    this.globalSaveClickEventCallback = ({ api, params }) => {
      if (api === 'wifi-set'  && Object.keys(params).includes(this.$route.params.paramsKey)) {
        this.$store.dispatch('configs/getWifi', true).then(wifi => {
          if (this.$route.params && this.$route.params.paramsKey) {
            this.getData()
          }
        })
      }
    }
    this.$EventBus.$on('GlobalDiscard', this.globalDiscardEventCallback)
    this.$EventBus.$on('GlobalSaveClick', this.globalSaveClickEventCallback)
  },
  beforeDestroy() {
    this.$EventBus.$off('GlobalSaveClick', this.globalSaveClickEventCallback)
    this.$EventBus.$off('GlobalDiscard', this.globalDiscardEventCallback)
  },
  methods: {
    //
    // getLan() {
    //   getInterfaces({}).then(res => {
    //     const lan = res.interfaces['lan']
    //     if (lan.status) {
    //       if (Array.isArray(lan.status.ipaddrs)) {
    //         this.ap.ownip = lan.status.ipaddrs[0].addr
    //       }
    //     }
    //   }).catch(() => {
    //   })
    // },

    onWapVersionChange(newVersion) {
      if (newVersion === 'personal') {
        this.ap.encryption = ''
        this.encryptionOptions = this.personalOptions
      } else if (newVersion === 'enterprise') {
        this.ap.encryption = ''
        this.encryptionOptions = this.enterpriseOptions
      }
    },
    modAPMaxSta(currentValue) {
      if (!currentValue) {
        this.ap.maxsta = '1'
      } else {
        this.ap.maxsta = currentValue + ''
      }
    },

    getData() {
      this.ap = _.cloneDeep(this.wifi[this.$route.params.paramsKey])
      // this.ap.auth = 'MSCHAPV2'
      // this.ap.acct_port = '1813'
      // this.ap.auth_port = '1812'
      if (this.personalOptions.some((item) => {
        return item === this.ap.encryption
      })) {
        this.encryptionOptions = this.personalOptions
      }

      if (this.enterpriseOptions.some((item) => {
        return item === this.ap.encryption
      })) {
        this.encryptionOptions = this.enterpriseOptions
      }
      this.paramsKey = this.$route.params.paramsKey
      this.frequencyName = this.$route.params.frequencyName
      this.hash = this.$route.params.updatedKey ? this.$route.params.updatedKey : ''
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
</style>
