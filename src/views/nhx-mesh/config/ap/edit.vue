<template>
  <div class="root">
    <span class="title">VAP Edit</span>
    <el-card>
      <div slot="header">
        <span> {{ comment }}:{{ groupId }} / {{ frequencyName }} / VAP :{{ paramsKey }} / {{ ap.ssid }}</span>
      </div>
      <div class="card-panel-editable-content-wrapper">
        <el-form ref="postForm" :model="ap" :rules="rules" class="form-container">

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
                    :disabled="!canEdit"
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
                  <el-input v-model="ap.ssid" :disabled="!canEdit" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'wpa_version'}">
            <div class="field-key">
              <span class="field-key-text">wap version</span>
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
                    <el-option value="personal" />
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
                    :disabled="!canEdit"
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
              <span class="field-key-text">Wireless Password</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.key" :disabled="!canEdit" sizi="small" />
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

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'ownip'}">
            <div class="field-key">
              <span class="field-key-text">ownip</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.ownip" sizi="small" />
                </div>
              </div>
            </div>
          </div>

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
                  <el-input v-model="ap.auth_port" sizi="small" placeholder="1812" />
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
                  <el-input v-model="ap.rsn_preauth_interfaces" sizi="small" />
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
                    :disabled="!canEdit"
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
                    :disabled="!canEdit"
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
                    :disabled="!canEdit"
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
                    :disabled="!canEdit"
                    true-label="0"
                    false-label="1"
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
                    :disabled="!canEdit"
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
                    :disabled="!canEdit"
                    true-label="1"
                    false-label="0"
                  />
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
import { group_get_config } from '@/api/ac'
import { mapGetters } from 'vuex'

export default {
  name: 'NHXMeshConfigAPEdit',
  // mixins: [UnsavedAlert],
  data() {
    return {
      encryptionOptions: [],
      groupId: '',
      canEdit: true,
      comment: '',
      APTabName: '',
      frequencyName: '',
      hash: '',
      paramsKey: '',
      rules: {
        //  TODO
      },
      ap: {
        disabled: '',
        encryption: '',
        hidden: '',
        highlight: '',
        ieee80211ai: '',
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
        auth: ''
      },
      // isEdit: false,
      updateCount: 0,
      apCopy: null,
      wlan: '',
      globalSaveClickEventCallback: null,
      globalDiscardEventCallback: null,
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
      ]
    }
  },

  computed: {
    ...mapGetters(['group', 'originalGroup'])
  },
  watch: {

    $route: {
      // 监听路由对象
      // 是要进入当前路由
      // 从params 中取snapshot 作为当前对象
      handler(to, from) {
        if (to.fullPath !== from.fullPath) {
          this.getData()
        }
      },
      deep: true
    },
    ap: {
      handler(newValue, oldValue) {
        // this.groupId + newValue.paramsKey  + this.options.name(this.frequencyName)
        const referKey = this.$route.path + '?tab=' + this.frequencyName + '&paramsKey=' + this.paramsKey + '&group=' + this.groupId + '#'
        const hasChanges = syncAllChangesToStore.apply(this, [
          // 新值
          newValue,
          this.originalGroup[this.groupId][this.paramsKey],
          // 保存到store中的key， 颗粒度指到当前改动字段
          referKey,
          (updateKey, updateValue) => {
            return {
              path: referKey + updateKey,
              data: {
                api: 'group-set',
                // 当前改动
                snapshot: { ...newValue, group: this.groupId, paramsKey: this.paramsKey },
                // 用于 router-link to:name 方式跳转回来
                name: this.$route.name,
                // 当前改动键
                updatedKey: updateKey,
                // 当前改动值
                updateValue: updateValue,
                routers: [
                  {
                    // 显示在改动列表的路由tag
                    title: this.$route.path + '/' + this.frequencyName,
                    // 用于触发 $route 的 watch
                    query: '',
                    params: { group: this.groupId, canEdit: this.canEdit, comment: this.comment, APTabName: this.APTabName, frequencyName: this.frequencyName, updatedKey: updateKey, paramsKey: this.paramsKey }
                  },
                  {
                    title: this.paramsKey + ':' + updateKey,
                    query: { paramsKey: this.paramsKey, group: this.groupId, tabName: this.$options.name + '#' + updateKey },
                    params: { group: this.groupId, canEdit: this.canEdit, comment: this.comment, APTabName: this.APTabName, frequencyName: this.frequencyName, updatedKey: updateKey, paramsKey: this.paramsKey }
                  }
                ]
              }
            }
          }
        ])
        if (!hasChanges) {
          this.hash = ''
        } else {
          this.$store.commit('configs/SET_GROUP_CONFIG', [this.groupId, this.paramsKey, newValue])
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch('configs/getGroup', [this.groupId, false]).then(() => {
      this.getData()
    })

    this.globalDiscardEventCallback = ({ path }) => {
      this.hash = ''
    }
    this.$EventBus.$on('GlobalDiscard', this.globalDiscardEventCallback)
  },
  beforeDestroy() {
    this.$EventBus.$off('GlobalSaveClick', this.globalSaveClickEventCallback)
    this.$EventBus.$off('GlobalDiscard', this.globalDiscardEventCallback)
  },
  methods: {
    onWapVersionChange(newVersion) {
      if (newVersion === 'personal') {
        this.ap.encryption = ''
        this.encryptionOptions = this.personalOptions
      } else if (newVersion === 'enterprise') {
        this.ap.encryption = ''
        this.encryptionOptions = this.enterpriseOptions
      }
    },
    getData() {
      this.groupId = this.$route.params.group
      this.canEdit = this.$route.params.canEdit
      this.comment = this.$route.params.comment
      this.APTabName = this.$route.params.APTabName
      this.frequencyName = this.$route.params.frequencyName
      this.hash = this.$route.params.updatedKey ? this.$route.params.updatedKey : ''
      this.paramsKey = this.$route.params.paramsKey

      sessionStorage.setItem('group', this.groupId)
      sessionStorage.setItem('canEdit', this.canEdit)
      sessionStorage.setItem('comment', this.comment)
      sessionStorage.setItem('APTabName', this.APTabName)
      this.ap = _.cloneDeep(this.group[this.groupId][this.paramsKey])
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
