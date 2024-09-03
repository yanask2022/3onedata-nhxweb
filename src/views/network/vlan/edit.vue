<template>
  <div class="root">
    <span class="title">Vlan Edit</span>
    <el-card>
      <div slot="header" style="width: 100%; display: flex; flex-direction: row; align-items: center;justify-content:space-between">
        <span>Vlan: {{ form.comment }}</span>
        <el-button v-if="$route.params.isNew" class="reset-btn" size="small" @click="onSave">
          Save
        </el-button>
      </div>
      <div class="card-panel-editable-content-wrapper">

        <el-form ref="postForm" :model="form" class="form-container">

          <div class="field-row" :class="{'highlight' : hash === 'comment'}">
            <div class="field-key">
              <span class="field-key-text">Comment:</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.comment" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'vid'}">
            <div class="field-key">
              <span class="field-key-text">VID:</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.vid" class="vid-clazz" min="2" max="4094" type="number" sizi="small" @input="onVIDInput" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'ipv4addr'}">
            <div class="field-key">
              <span class="field-key-text">IPV4 Address:</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.ipv4addr" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'netmask'}">
            <div class="field-key">
              <span class="field-key-text">IPV4 Netmask:</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.netmask" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'wlan'}">
            <div class="field-key">
              <span class="field-key-text">ifname:</span>
            </div>
            <div class="field-value" style="">
              <!--<NXHTableExtends-->
              <!--  default-slot-label="Mode"-->
              <!--  default-slot-width="180"-->
              <!--  style="width:700px;"-->
              <!--  :selection="false"-->
              <!--  :table-data="tableData"-->
              <!--  :columns="columns"-->
              <!--&gt;-->
              <!--  <template v-slot:access="{scope}">-->
              <!--    <el-tag v-if="scope.row.notAvailable" size="mini">{{ scope.row.access_holder_name }}</el-tag>-->
              <!--    <div v-else>-->
              <!--      <el-checkbox-->
              <!--        v-show="!scope.row.trunk"-->
              <!--        v-model="scope.row.access"-->
              <!--        @change="onAccessChecked($event, scope.row)"-->
              <!--      >-->
              <!--        <span v-if="scope.row.access">{{ scope.row.access_holder_name }}</span>-->
              <!--        <span v-else>Enable</span>-->
              <!--      </el-checkbox>-->
              <!--    </div>-->
              <!--  </template>-->
              <!--  <template v-slot:trunk="{scope}">-->

              <!--    <el-checkbox-->
              <!--      v-show="!scope.row.access"-->
              <!--      v-model="scope.row.trunk"-->
              <!--      @change="onTrunkChecked($event, scope.row)"-->
              <!--    >-->
              <!--      <span v-if="scope.row.trunk">{{ scope.row.trunk_holder_name }}</span>-->
              <!--      <span v-else>Enable</span>-->
              <!--    </el-checkbox>-->
              <!--  </template>-->
              <!--</NXHTableExtends>-->

              <NXHTableExtends
                ref="tableRef"
                :selection="true"
                :table-data="tableData"
                :columns="columns"
                style="width:350px;"
                @selection-change="onSelectChange"
              />
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
import { wifi } from '@/api/wifi'
import NXHTableExtends from '@/components/NXHTableExtends/index'
import { vlan_add } from '@/api/vlan'
import { mapGetters } from 'vuex'
export default {
  name: 'VLanEdit',
  components: {
    NXHTableExtends
  },
  data() {
    return {
      hash: '',
      enableBatch: false,
      currentSelectIfnameArr: [],
      tableData: [
        // notAvailable: access 被占用
        // { ifname: 'ath3', type: 'Wireless', mode: 'Access', notAvailable: false, access: false, access_holder_name: '', trunk: false, trunk_holder_name: '' }
      ],
      columns: [
        { label: 'ifname', prop: 'wlan' }
        // { label: 'Type', prop: 'type' }
      ],
      form: {
        comment: '',
        vid: '',
        // mode: '',
        // type: '',
        ipv4addr: '',
        netmask: '',
        wlan: ''
      }
    }
  },
  computed: {
    ...mapGetters(['vlan', 'originalVlan'])
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.path === this.$route.path &&
            to.params &&
            to.params.updatedKey) {
          this.hash = to.params.updatedKey
        } else {
          this.hash = ''
        }
      },
      deep: true
    },
    form: {
      handler(newValue, oldValue) {
        const referKey = this.$route.path + '#' + newValue.name
        const hasChange = syncAllChangesToStore.apply(this, [
          newValue,
          this.originalVlan[newValue.name],
          referKey,
          (updateKey, updateValue) => {
            this.$store.commit('configs/SET_VLAN_CONFIG', [newValue.name, newValue])
            return {
              path: referKey + updateKey,
              data: {
                api: 'vlan-set',
                snapshot: newValue,
                name: this.$route.name,
                updatedKey: updateKey,
                updateValue: updateValue,
                routers: [
                  {
                    // 页面
                    title: this.$route.path,
                    // 用于触发 $route 的 watch
                    query: '',
                    // 用于从改动列表跳转回来时标识当前改动
                    params: { updatedKey: updateKey }
                  },
                  {
                    title: updateKey,
                    query: { updatedKey: updateKey, vid: newValue.vid },
                    params: { updatedKey: updateKey }
                  }
                ]
              }
            }
          }
        ])
      },
      deep: true
    }
  },
  mounted() {
    // 获取 ifname
    // add
    if (this.$route.params.isNew) {
      this.form = {
        comment: 'new vlan',
        vid: '',
        // mode: '',
        // type: '',
        ipv4addr: '',
        netmask: '',
        wlan: ''
      }
      this.getWifi()
      return
    }

    if (this.$route.params && this.$route.params.vid) {
      // 第一次编辑
      this.form = { ...this.$route.params }
      this.setSelectedWLAN()
    } else if (this.$route.params && this.$route.params.snapshot) {
      this.form = { ...this.$route.params.snapshot }
      this.setSelectedWLAN()
      this.hash = this.$route.params.updatedKey
    }
  },
  methods: {
    setSelectedWLAN() {
      const selectedWLAN = this.form.wlan.split(' ')

      // 设置已经选择的wlan状态
      this.getWifi().then(() => {
        selectedWLAN.forEach(wlan => {
          this.tableData.forEach(tabwlanName => {
            if (tabwlanName.wlan === wlan) {
              this.$refs.tableRef.toggleRowSelection(tabwlanName, true)
            }
          })
        })
      })
    },
    getWifi() {
      return wifi({}).then(res => {
        const tempArr = []
        Object.keys(res).forEach(key => {
          if (key.startsWith('wlan')) {
            // tempArr.push(res[key])
            tempArr.push({ wlan: key })
          }
        })
        tempArr.sort()
        this.tableData = tempArr
      })
    },
    onSelectChange(selection) {
      this.form.wlan = ''
      if (selection.length > 0) {
        selection.forEach((item) => {
          this.form.wlan += item.wlan + ' '
        })
        this.form.wlan = this.form.wlan.trim()
      }
    },
    onSave() {
      const loading = this.$loading({
        lock: true,
        text: 'Send Request...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      if (this.$route.params.isNew) {
        vlan_add({ ...this.form }).then(res => {
          this.$message({ message: 'Success', type: 'success' })
          this.$router.replace({ name: 'VLanHome' })
        }).catch(error => {
          this.$message({ message: error, type: 'error' })
        }).finally(() => {
          loading.close()
        })
      }
      // else {
      //   vlan_set({ ...this.form }).then(res => {
      //     this.$message({ message: 'Success', type: 'success' })
      //   }).catch(error => {
      //     this.$message({ message: error, type: 'error' })
      //   }).finally(() => {
      //     loading.close()
      //   })
      // }
    },
    onVIDInput(value) {
      if (value < 2) {
        this.form.vid = 2
      }
      if (value > 4096) {
        this.form.vid = 4096
      }
    },
    onAccessChecked(event, row) {
      if (event) {
        row.access_holder_name = this.form.comment
        row.trunk = false
      } else {
        row.access_holder_name = ''
      }
    },
    onTrunkChecked(event, row) {
      if (event) {
        row.trunk_holder_name = this.form.comment
        row.access = false
      } else {
        row.trunk_holder_name = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">

.highlight {
  background: #8ebdf5 !important;
}

::v-deep {
  .el-button--mini {
    color: #FFFFFF;
  }
}
.vid-clazz {
  ::v-deep {
    .el-input__inner {
      padding-right: 0;
    }
  }
}
</style>
