<template>
  <div class="root">
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header" style="width: 100%; display: flex; flex-direction: row; align-items: center;justify-content:space-between">
        <span>redirect edit</span>
        <el-button v-if="$route.params.isNew" class="reset-btn" size="small" @click="onSave">
          Save
        </el-button>
      </div>
      <div class="card-panel-editable-content-wrapper">
        <!-- enabled -->
        <div class="field-row" :class="{'highlight' : hash === 'enabled'}">
          <div class="field-key">
            <span class="field-key-text">Enable</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-checkbox
                  v-model="settings.enabled"
                  true-label="0"
                  false-label="1"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- proto -->
        <div class="field-row" :class="{'highlight' : hash === 'proto'}">
          <div class="field-key">
            <span class="field-key-text">protocol</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select v-model="settings.proto" size="mini" style="width: 100%">
                  <el-option value="tcpudp" label="TCP+UDP" />
                  <el-option value="tcp" label="TCP" />
                  <el-option value="udp" label="UDP" />
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <div class="field-row" :class="{'highlight' : hash === 'src_ip'}">
          <div class="field-key">
            <span class="field-key-text">src_ip</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input v-model="settings.src_ip" sizi="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- src_dport -->
        <div class="field-row" :class="{'highlight' : hash === 'src_dport'}">
          <div class="field-key">
            <span class="field-key-text">src_dport</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input v-model="settings.src_dport" sizi="small" />
              </div>
            </div>
          </div>
        </div>

        <!--dest_ip-->
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

        <!-- dest_port -->
        <div class="field-row" :class="{'highlight' : hash === 'dest_port'}">
          <div class="field-key">
            <span class="field-key-text">dest_port</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-input v-model="settings.dest_port" sizi="small" />
              </div>
            </div>
          </div>
        </div>

        <!-- target -->
        <div class="field-row" :class="{'highlight' : hash === 'target'}">
          <div class="field-key">
            <span class="field-key-text">target</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select v-model="settings.target" size="mini" style="width: 100%">
                  <el-option value="SNAT" label="SNAT" />
                  <el-option value="DNAT" label="DNAT" />
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <!--src-->
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

        <!--dest-->
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

        <!--nhx_redirect-->
        <!--<div class="field-row" :class="{'highlight' : hash === 'nhx_redirect'}">-->
        <!--  <div class="field-key">-->
        <!--    <span class="field-key-text">nhx_redirect</span>-->
        <!--  </div>-->
        <!--  <div class="field-value">-->
        <!--    <div class="field-value-column">-->
        <!--      <div class="field-value-column-input">-->
        <!--        <el-checkbox-->
        <!--          v-model="settings.nhx_redirect"-->
        <!--          true-label="0"-->
        <!--          false-label="1"-->
        <!--        />-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->

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

      </div>
    </el-card>
  </div>
</template>

<script>
import { addRedirect } from '@/api/network'
import * as _ from 'lodash'
import { mapGetters } from 'vuex'
import { syncAllChangesToStore } from '@/utils/diff'
export default {
  name: 'RedirectEdit',
  data() {
    return {
      hash: '',
      settings: {
        enabled: '1',
        proto: '',
        src_ip: '',
        src_dport: '',
        dest_ip: '',
        dest_port: '',
        target: '',
        src: '',
        dest: '',
        // nhx_redirect: '',
        name: ''
      }
    }
  },

  computed: {
    ...mapGetters(['redirect', 'originalRedirect'])
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
          this.originalRedirect.find((item) => item.index === newValue.index),
          referKey,
          (updateKey, updateValue) => {
            return {
              path: referKey + updateKey,
              data: {
                api: 'redirect-set',
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
        // this.$store.commit('configs/SET_REDIRECT_CONFIG', [this.settings.index, this.settings])
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
    getData() {
      if (!this.$route.params.isNew) {
        this.settings = this.redirect[this.$route.params.index]
        this.hash = this.$route.params.updatedKey ? this.$route.params.updatedKey : ''
      }
    },
    onGlobalSaveClick() {
      setTimeout(() => {
        this.$router.replace({ name: 'FirewallIndex' })
      }, 1000)
    },
    onSave() {
      const loading = this.$loading({
        lock: true,
        text: 'Send Request...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      addRedirect({
        redirect: [this.settings]
      }).then(res => {
        this.$message({ message: 'Success', type: 'success' })
        this.$store.dispatch('configs/getRedirects', true).then(() => {})
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

</style>
