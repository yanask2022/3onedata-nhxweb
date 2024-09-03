<template>
  <div class="root">
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header">
        <span>Zone</span>
      </div>
      <div class="card-panel-editable-content-wrapper">
        <div class="field-row" :class="{'highlight' : hash === 'name'}">
          <div class="field-key">
            <span class="field-key-text">name</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <!--<el-input v-model="settings.name" sizi="small" />-->
                {{ settings.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- 不允许修改 -->
        <!--<div class="field-row" :class="{'highlight' : hash === 'network'}">-->
        <!--  <div class="field-key">-->
        <!--    <span class="field-key-text">network</span>-->
        <!--  </div>-->
        <!--  <div class="field-value">-->
        <!--    <div class="field-value-column">-->
        <!--      <div class="field-value-column-input">-->
        <!--        <el-select v-model="settings.network" size="mini" multiple>-->
        <!--          <el-option :value="network" :label="network" v-for="network in networkOptions" />-->
        <!--        </el-select>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->
        <div class="field-row" :class="{'highlight' : hash === 'input'}">
          <div class="field-key">
            <span class="field-key-text">input</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.input"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    value="ACCEPT"
                  />
                  <el-option
                    value="REJECT"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="field-row" :class="{'highlight' : hash === 'output'}">
          <div class="field-key">
            <span class="field-key-text">output</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.output"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    value="ACCEPT"
                  />
                  <el-option
                    value="REJECT"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="field-row" :class="{'highlight' : hash === 'forward'}">
          <div class="field-key">
            <span class="field-key-text">forward</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.forward"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    value="ACCEPT"
                  />
                  <el-option
                    value="REJECT"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="field-row" :class="{'highlight' : hash === 'masq'}">-->
        <!--  <div class="field-key">-->
        <!--    <span class="field-key-text">masq</span>-->
        <!--  </div>-->
        <!--  <div class="field-value">-->
        <!--    <div class="field-value-column">-->
        <!--      <div class="field-value-column-input">-->
        <!--        <el-checkbox-->
        <!--          v-model="settings.masq"-->
        <!--          label="Enable"-->
        <!--          true-label="0"-->
        <!--          false-label="1"-->
        <!--        />-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->
        <!--<div class="field-row" :class="{'highlight' : hash === 'mtu_fix'}">-->
        <!--  <div class="field-key">-->
        <!--    <span class="field-key-text">mtu_fix</span>-->
        <!--  </div>-->
        <!--  <div class="field-value">-->
        <!--    <div class="field-value-column">-->
        <!--      <div class="field-value-column-input">-->
        <!--        <el-checkbox-->
        <!--          v-model="settings.mtu_fix"-->
        <!--          label="Enable"-->
        <!--          true-label="0"-->
        <!--          false-label="1"-->
        <!--        />-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->
      </div>
    </el-card>
  </div>
</template>

<script>
import { getInterfaces } from '@/api/interface'

import * as _ from 'lodash'
import { mapGetters } from 'vuex'
import { syncAllChangesToStore } from '@/utils/diff'

export default {
  name: 'ZoneEdit',
  data() {
    return {
      hash: '',
      networkOptions: [],
      settings: {
        name: '',
        network: [],
        input: '',
        output: '',
        forward: ''
        // masq: '',
        // mtu_fix: ''
      }
    }
  },

  computed: {
    ...mapGetters(['zone', 'originalZone'])
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
    settings: {
      handler(newValue, oldValue) {
        const referKey = this.$route.path + '?name=' + newValue.key
        const hasChanges = syncAllChangesToStore.apply(this, [
          _.cloneDeep(newValue),
          this.originalZone[newValue.key],
          referKey,
          (updateKey, updateValue) => {
            return {
              path: referKey + updateKey,
              data: {
                api: 'zone-set',
                snapshot: _.cloneDeep(newValue),
                name: this.$route.name,
                updatedKey: updateKey,
                updateValue: updateValue,
                routers: [
                  {
                    title: this.$route.path + ': ' + newValue.key,
                    query: { updatedKey: updateKey, key: newValue.key },
                    params: { updatedKey: updateKey, key: newValue.key }
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
  mounted() {
    // this.getLan()
    this.getData()
    this.$EventBus.$on('GlobalSaveClick', this.onGlobalSaveClick)
  },
  methods: {
    onGlobalSaveClick() {
      setTimeout(() => {
        this.$router.replace({ name: 'FirewallIndex' })
      }, 1000)
    },
    getData() {
      this.settings = this.zone[this.$route.params.key]
      this.hash = this.$route.params.updatedKey ? this.$route.params.updatedKey : ''
    },
    getLan() {
      getInterfaces({}).then(res => {
        this.networkOptions = Object.keys(res.interfaces).map(key => {
          return key
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
