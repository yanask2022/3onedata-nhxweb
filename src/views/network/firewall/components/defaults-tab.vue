<template>
  <div class="root">
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header" style="width: 100%; display: flex; flex-direction: row; align-items: center;justify-content:space-between">
        <span>Defaults</span>
        <!--<el-button class="reset-btn" size="small" @click="onSave">-->
        <!--  Save-->
        <!--</el-button>-->
      </div>
      <div class="card-panel-editable-content-wrapper">
        <!--<div class="field-row" :class="{'highlight' : hash === 'input'}">-->
        <!--  <div class="field-key">-->
        <!--    <span class="field-key-text">input</span>-->
        <!--  </div>-->
        <!--  <div class="field-value">-->
        <!--    <div class="field-value-column">-->
        <!--      <div class="field-value-column-input">-->
        <!--        <el-select-->
        <!--          v-model="settings.input"-->
        <!--          style="width: 100%"-->
        <!--          size="small"-->
        <!--        >-->
        <!--          <el-option-->
        <!--            value="ACCEPT"-->
        <!--          />-->
        <!--          <el-option-->
        <!--            value="REJECT"-->
        <!--          />-->
        <!--        </el-select>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->
        <!--<div class="field-row" :class="{'highlight' : hash === 'output'}">-->
        <!--  <div class="field-key">-->
        <!--    <span class="field-key-text">output</span>-->
        <!--  </div>-->
        <!--  <div class="field-value">-->
        <!--    <div class="field-value-column">-->
        <!--      <div class="field-value-column-input">-->
        <!--        <el-select-->
        <!--          v-model="settings.output"-->
        <!--          style="width: 100%"-->
        <!--          size="small"-->
        <!--        >-->
        <!--          <el-option-->
        <!--            value="ACCEPT"-->
        <!--          />-->
        <!--          <el-option-->
        <!--            value="REJECT"-->
        <!--          />-->
        <!--        </el-select>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->
        <!--<div class="field-row" :class="{'highlight' : hash === 'forward'}">-->
        <!--  <div class="field-key">-->
        <!--    <span class="field-key-text">forward</span>-->
        <!--  </div>-->
        <!--  <div class="field-value">-->
        <!--    <div class="field-value-column">-->
        <!--      <div class="field-value-column-input">-->
        <!--        <el-select-->
        <!--          v-model="settings.forward"-->
        <!--          style="width: 100%"-->
        <!--          size="small"-->
        <!--        >-->
        <!--          <el-option-->
        <!--            value="ACCEPT"-->
        <!--          />-->
        <!--          <el-option-->
        <!--            value="REJECT"-->
        <!--          />-->
        <!--        </el-select>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->
        <!--<div class="field-row" :class="{'highlight' : hash === 'custom_chains'}">-->
        <!--  <div class="field-key">-->
        <!--    <span class="field-key-text">custom_chains</span>-->
        <!--  </div>-->
        <!--  <div class="field-value">-->
        <!--    <div class="field-value-column">-->
        <!--      <div class="field-value-column-input">-->
        <!--        <el-checkbox-->
        <!--          v-model="settings.custom_chains"-->
        <!--          label="Enable"-->
        <!--          true-label="0"-->
        <!--          false-label="1"-->
        <!--        />-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->
        <div class="field-row" :class="{'highlight' : hash === 'drop_invalid'}">
          <div class="field-key">
            <span class="field-key-text">drop_invalid</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-checkbox
                  v-model="settings.drop_invalid"
                  label="Enable"
                  true-label="0"
                  false-label="1"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field-row" :class="{'highlight' : hash === 'syn_flood'}">
          <div class="field-key">
            <span class="field-key-text">syn_flood</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-checkbox
                  v-model="settings.syn_flood"
                  label="Enable"
                  true-label="0"
                  false-label="1"
                />
              </div>
            </div>
          </div>
        </div>
        <!--<div class="field-row" :class="{'highlight' : hash === 'synflood_rate'}">
          <div class="field-key">
            <span class="field-key-text">synflood_rate</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input v-model="settings.synflood_rate" sizi="small" />
              </div>
            </div>
          </div>
        </div>
        <div class="field-row" :class="{'highlight' : hash === 'synflood_burst'}">
          <div class="field-key">
            <span class="field-key-text">synflood_burst</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input v-model="settings.synflood_burst" sizi="small" />
              </div>
            </div>
          </div>
        </div>
        <div class="field-row" :class="{'highlight' : hash === 'tcp_ecn'}">
          <div class="field-key">
            <span class="field-key-text">tcp_ecn</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-checkbox
                  v-model="settings.tcp_ecn"
                  label="Enable"
                  true-label="0"
                  false-label="1"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field-row" :class="{'highlight' : hash === 'tcp_syncookies'}">
          <div class="field-key">
            <span class="field-key-text">tcp_syncookies</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-checkbox
                  v-model="settings.tcp_syncookies"
                  label="Enable"
                  true-label="0"
                  false-label="1"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field-row" :class="{'highlight' : hash === 'tcp_window_scaling'}">
          <div class="field-key">
            <span class="field-key-text">tcp_window_scaling</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-checkbox
                  v-model="settings.tcp_window_scaling"
                  label="Enable"
                  true-label="0"
                  false-label="1"
                />
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { syncAllChangesToStore } from '@/utils/diff'
import * as _ from 'lodash'

export default {
  name: 'DefaultsTab',
  data() {
    return {
      hash: ''
      // settings: {
      //   // input: '',
      //   // output: '',
      //   // forward: '',
      //   // custom_chains: '',
      //   drop_invalid: 1,
      //   syn_flood:  1,
      //   // synflood_rate: '',
      //   // synflood_burst: '',
      //   // tcp_ecn: '',
      //   // tcp_syncookies: '',
      //   // tcp_window_scaling: ''
      // }
    }
  },

  computed: {
    ...mapGetters(['defaults', 'originalDefaults']),
    settings() {
      return this.defaults
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.fullPath !== from.fullPath) {
          this.hash = this.$route.params.updatedKey ? this.$route.params.updatedKey : ''
        }
      },
      deep: true
    },
    settings: {
      handler(newValue) {
        const referKey = this.$route.path
        const hasChanges = syncAllChangesToStore.apply(this, [
          newValue,
          this.originalDefaults,
          referKey,
          (updateKey, updateValue) => {
            return {
              path: referKey + updateKey,
              data: {
                api: 'default-set',
                snapshot: _.cloneDeep(newValue),
                name: this.$route.name,
                updatedKey: updateKey,
                updateValue: updateValue,
                routers: [
                  {
                    title: this.$route.path,
                    query: { updatedKey: updateKey, updateValue: updateValue },
                    params: { updatedKey: updateKey, updateValue: updateValue }
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

  }
}
</script>

<style scoped lang="scss">

</style>
