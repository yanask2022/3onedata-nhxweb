<template>
  <div class="root">
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header" style="width: 100%; display: flex; flex-direction: row; align-items: center;justify-content:space-between">
        <span>pforward edit</span>
        <el-button v-if="$route.params.isNew" class="reset-btn" size="small" @click="onSave">
          Save
        </el-button>
      </div>
      <div class="card-panel-editable-content-wrapper">
        <div class="field-row" :class="{'highlight' : hash === 'enabled'}">
          <div class="field-key">
            <span class="field-key-text">Enable</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-checkbox
                  v-model="settings.enabled"
                  true-label="1"
                  false-label="0"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field-row" :class="{'highlight' : hash === 'name'}">
          <div class="field-key">
            <span class="field-key-text">name</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input v-model="settings.name" sizi="small" />
              </div>
            </div>
          </div>
        </div>

        <div class="field-row" :class="{'highlight' : hash === 'src'}">
          <div class="field-key">
            <span class="field-key-text">src</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select v-model="settings.src" size="mini" style="width: 100%">
                  <el-option value="lan" label="lan" />
                  <el-option value="wan" label="wan" />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="field-row" :class="{'highlight' : hash === 'dest'}">
          <div class="field-key">
            <span class="field-key-text">dest</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.dest"
                  style="width: 100%"
                  size="small"
                >
                  <el-option value="lan" label="lan" />
                  <el-option value="wan" label="wan" />
                </el-select></div>
            </div>
          </div>
        </div>
        <div class="field-row" :class="{'highlight' : hash === 'proto'}">
          <div class="field-key">
            <span class="field-key-text">proto</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select v-model="settings.proto" size="mini" style="width: 100%">
                  <el-option value="tcp" label="tcp" />
                  <el-option value="udp" label="udp" />
                  <el-option value="tcpudp" label="tcp+udp" />
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <div class="field-row" :class="{'highlight' : hash === 'src_dport'}">
          <div class="field-key">
            <span class="field-key-text">src_dport</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input v-model="settings.src_dport" type="number" :min="0" :max="65535" sizi="small" @change="limitSrcDPortRange" />
              </div>
            </div>
          </div>
        </div>
        <div class="field-row" :class="{'highlight' : hash === 'dest_ip'}">
          <div class="field-key">
            <span class="field-key-text">dest_ip</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input v-model="settings.dest_ip" sizi="small" />
              </div>
            </div>
          </div>
        </div>
        <div class="field-row" :class="{'highlight' : hash === 'dest_port'}">
          <div class="field-key">
            <span class="field-key-text">dest_port</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input v-model="settings.dest_port" type="number" :min="0" :max="65535" sizi="small" @change="limitDestPortRange" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addPForward } from '@/api/network'
import * as _ from 'lodash'
import { mapGetters } from 'vuex'
import { syncAllChangesToStore } from '@/utils/diff'

export default {
  name: 'PortForwardsEdit',
  data() {
    return {
      hash: '',
      settings: {
        // target: '',
        src: '',
        dest: '',
        proto: '',
        src_dport: '',
        dest_ip: '',
        dest_port: '',
        name: '',
        enabled: '1'
      }
    }
  },
  computed: {
    ...mapGetters(['portForwards', 'originPortForwards'])
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
        if (this.$route.params.isNew) return
        const referKey = this.$route.path + '?index=' + newValue.index
        const hasChanges = syncAllChangesToStore.apply(this, [
          newValue,
          this.originPortForwards.find((item) => item.index === newValue.index),
          referKey,
          (updateKey, updateValue) => {
            return {
              path: referKey + updateKey,
              data: {
                api: 'port-forwards-set',
                snapshot: _.cloneDeep(newValue),
                name: this.$route.name,
                updatedKey: updateKey,
                updateValue: updateValue,
                routers: [
                  {
                    title: this.$route.path,
                    query: { updatedKey: updateKey, index: newValue.index },
                    params: { updatedKey: updateKey, index: newValue.index }
                  }
                ]
              }
            }
          }
        ])
        if (!hasChanges) {
          this.hash = ''
        }
        // this.$store.commit('configs/SET_PORTFORWARD_CONFIG', [this.settings.index, this.settings])
      },
      deep: true
    }
  },
  mounted() {
    this.getData()
    this.$EventBus.$on('GlobalSaveClick', this.onGlobalSaveClick)
  },

  beforeDestroy() {
    this.$EventBus.$off('GlobalSaveClick', this.onGlobalSaveClick)
  },
  methods: {
    limitSrcDPortRange(value) {
      if (value) {
        if (value > 65535) {
          this.settings.src_dport = 65535
        } else if (value < 0) {
          this.settings.src_dport = 0
        }
      } else {
        this.settings.src_dport = 0
      }
    },
    limitDestPortRange(value) {
      if (value) {
        if (value > 65535) {
          this.settings.dest_port = 65535
        } else if (value < 0) {
          this.settings.dest_port = 0
        }
      } else {
        this.settings.dest_port = 0
      }
    },
    onGlobalSaveClick() {
      setTimeout(() => {
        this.$router.replace({ name: 'FirewallIndex' })
      }, 1000)
    },
    getData() {
      if (!this.$route.params.isNew) {
        this.settings = this.portForwards[this.$route.params.index]
        this.hash = this.$route.params.updatedKey ? this.$route.params.updatedKey : ''
      }
    },
    onSave() {
      const loading = this.$loading({
        lock: true,
        text: 'Send Request...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      const params = _.cloneDeep(this.settings)
      // params.proto = params.proto.join(' ')
      addPForward({
        pforward: [params] }).then(res => {
        this.$message({ message: 'Success', type: 'success' })
        this.$store.dispatch('configs/getPortForwards', true).then(() => {})
        setTimeout(() => {
          this.$router.replace({ name: 'FirewallIndex' })
        }, 1000)
      }).finally(() => {
        loading.close()
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
</style>
