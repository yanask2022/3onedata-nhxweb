<template>
  <div class="container">
    <el-popover
      v-show="showSaveBtn"
      popper-class="popper-clazz"
      style="margin-right: 20px"
      placement="bottom"
      width="auto"
      trigger="click"
    >
      <div class="popover-wrapper">
        <span class="popover-header">{{ unSavedChanges.length || '0' }} Configuration changes:</span>
        <div class="popover-content">
          <div v-for="({data}, index) in unSavedChanges" :key="index" class="record-wrapper">
            <div class="row">
              <router-link
                v-for="(route) in data.routers"
                :key="route.title"
                :to="{name: data.name, query: route.query, params: {snapshot:data.snapshot, ...route.params}}"
                class="cate-link"
              >
                <span class="cate">{{ route.title }}</span>
              </router-link>
            </div>
            <div class="row">
              <span class="changed-attr">{{ data.updatedKey +': '+ data.updateValue }}</span>
            </div>
          </div>
        </div>
      </div>
      <el-button slot="reference" plain size="small" class="counter">
        {{ unSavedChanges.length || '0' }}
        <svg-icon icon-class="changes" style="font-size: 7px" />
      </el-button>
    </el-popover>
    <el-button-group v-show="showSaveBtn">
      <el-button class="reset-btn" size="small" @click="onSave">
        Save
      </el-button>
      <el-button class="reset-btn" size="small" icon="el-icon-arrow-down" />
    </el-button-group>
    <el-button v-show="showSaveBtn" plain size="small" class="discard" @click="onDiscard">
      Discard
    </el-button>
  </div>
</template>

<script>
import * as _ from 'lodash'
import { setWifi, applyWifi } from '@/api/wifi'
import { setInterfaces } from '@/api/interface'
import { group_set_config } from '@/api/ac'
import { vlan_set } from '@/api/vlan'
import { mapGetters } from 'vuex'
import { modifyForward, setRedirect, setZone, setDefaults } from '@/api/network'
import { splitObject } from '@/utils'
export default {
  name: 'SaveAndApply',
  data() {
    return {
      visible: false,
      showSaveBtn: false
    }
  },
  computed: {
    ...mapGetters(['wifi', 'originPortForwards', 'originalRedirect', 'defaults']),
    unSavedChanges() {
      return _.orderBy(this.$store.state.app.unSavedChanges, ['path'], ['asc'])
    }
  },
  watch: {
    'unSavedChanges': {
      handler(newValue) {
        this.showSaveBtn = newValue.length > 0
      },
      deep: true
    }
  },
  methods: {
    uniqueFuncForVLanSet(arr, uniId) {
      const res = new Map()
      return arr.filter((item) => !res.has(item.data.snapshot[uniId]) && res.set(item.data.snapshot[uniId], 1))
    },
    // wifi-set 中， 如果paramsKey相同，改动的是同一个配置
    uniqueFuncForWifiSet(arr, uniId) {
      const res = new Map()
      return arr.filter((item) => !res.has(item.data.snapshot[uniId]) && res.set(item.data.snapshot[uniId], 1))
    },
    // interface-set 中，如果name相同，改动的是同一个配置
    uniqueFuncForInterfaceSet(arr, uniId) {
      const res = new Map()
      return arr.filter((item) => !res.has(item.data.snapshot[uniId]) && res.set(item.data.snapshot[uniId], 1))
    },
    // group-set 中，如果group相同且paramsKey相同，改动的是同一个配置
    uniqueFuncForGroupSet(arr, group, paramsKey) {
      const res = new Map()
      return arr.filter((item) => !res.has(item.data.snapshot[group] + item.data.snapshot[paramsKey]) && res.set((item.data.snapshot[group] + item.data.snapshot[paramsKey]), 1))
    },
    // wifi-set-spec 中，如果index相同且paramsKey相同且frequencyName(2.4Ghz/5GHz/...)相同，改动的是同一个配置
    uniqueFuncForWifiSpec(arr, index, paramsKey, frequencyName) {
      const res = new Map()
      return arr.filter((item) => !res.has(item.data.snapshot[index] + item.data.snapshot[paramsKey] + item.data.snapshot[frequencyName]) &&
        res.set((item.data.snapshot[index] + item.data.snapshot[paramsKey] + item.data.snapshot[frequencyName]), 1))
    },
    uniqueFuncForForwards(arr, key) {
      const res = new Map()
      return arr.filter((item) => !res.has(item.data.snapshot[key]) &&
        res.set((item.data.snapshot[key]), 1))
    },
    uniqueFuncForRedirect(arr, key) {
      const res = new Map()
      return arr.filter((item) => !res.has(item.data.snapshot[key]) &&
        res.set((item.data.snapshot[key]), 1))
    },
    findOriginForwards(arr, key) {
      const uniqueForwards = this.uniqueFuncForForwards(arr, key)
      return uniqueForwards.map(item => {
        const oldAndNew = {}
        oldAndNew.new = item.data.snapshot
        oldAndNew.old = this.originPortForwards.find(originItem => originItem.index === item.data.snapshot.index)
        return oldAndNew
      })
    },

    findOriginRedirect(arr, key) {
      return arr.map(item => {
        const oldAndNew = {}
        oldAndNew.new = item.data.snapshot
        oldAndNew.old = this.originalRedirect.find(originItem => originItem.index === item.data.snapshot.index)
        return oldAndNew
      })
    },

    uniqueFuncForZoneSet(arr, key) {
      const res = new Map()
      return arr.filter((item) => !res.has(item.data.snapshot[key]) &&
        res.set((item.data.snapshot[key]), 1))
    },

    async onSave() {
      // 显示请求中
      const loading = this.$loading({
        lock: true,
        text: 'Send Request...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      // 根据不同的api分组
      const groupedArr = _.groupBy(this.unSavedChanges, (item) => {
        return item.data.api
      })

      for (const key of Object.keys(groupedArr)) {
        switch (key) {
          case 'wifi-set': {
            // wifi-set 中， 如果paramsKey相同，改动的是同一个配置
            // 去重(去重前应该先合并对象， 但此处不用处理， 因为syncAllChangesToStore时snapshot 是浅拷贝（引用复制）)
            const APIArr = this.uniqueFuncForWifiSet(groupedArr[key], 'paramsKey')
            // 改动的配置对象
            const params = {}
            for (let i = 0; i < APIArr.length; i++) {
              params[APIArr[i].data.snapshot.paramsKey] = APIArr[i].data.snapshot
            }
            // "set的时候不能超过6组数据" (超过6分开set)
            if (Object.keys(params).length > 6) {
              const splitArr = splitObject(params, 6)
              for (let i = 0; i < splitArr.length; i++) {
                await this.requestWifiSet(splitArr[i])
              }
            } else {
              await this.requestWifiSet(params)
            }
            this.$message({ message: 'wifi set request sent', type: 'success' })
            await this.requestWifiApply()
            this.$EventBus.$emit('GlobalSaveClick', { api: 'wifi-set', params: params })
            break
          }
          case 'interface-set': {
            const APIArr = this.uniqueFuncForInterfaceSet(groupedArr[key], 'name')
            // 调用API
            for (let i = 0; i < APIArr.length; i++) {
              await this.requestInterfaceSet(APIArr[i].data.snapshot)
              this.$message({ message: 'interface set request sent', type: 'success' })
              this.$EventBus.$emit('GlobalSaveClick', APIArr[i])
            }
            break
          }
          case 'group-set': {
            // 去重： group相同且paramsKey 相同的是同一个配置
            const APIArr = this.uniqueFuncForGroupSet(groupedArr[key], 'group', 'paramsKey')
            // 再次分组： group相同的分成一组。输入：data.snapshot.group. 输出： {group: 'g1',wlan0: {xxxx: xxxx} }
            const diffGroupArr = _.groupBy(APIArr, (item) => {
              return item.data.snapshot.group
            })
            for (const diffGroupKey of Object.keys(diffGroupArr)) {
              const params = {
                group: diffGroupKey
              }
              for (let i = 0; i < diffGroupArr[diffGroupKey].length; i++) {
                params[diffGroupArr[diffGroupKey][i].data.snapshot.paramsKey] = diffGroupArr[diffGroupKey][i].data.snapshot
              }
              await this.requestGroupSet(params)
              this.$message({ message: 'group set request sent', type: 'success' })
              // this.$EventBus.$emit('GlobalSaveClick', APIArr[i])
            }
            break
          }
          case 'wifi-set-spec': {
            // 同一份配置
            const APIArr = this.uniqueFuncForWifiSpec(groupedArr[key], 'index', 'paramsKey', 'frequencyName')
            // 再次分组： paramsKey相同的分成一组。
            // 输入：[{data: {...,snapshot:{paramsKey: 'sta0', ....},...}, path: 'xxx'},{data: {...,snapshot:{paramsKey: 'sta1', ....},...}, path: 'xxx'},].
            // 输出：{sta0: [{}, {}], sta1: [{},{}]}
            const staGroup = _.groupBy(APIArr, (item) => {
              return item.data.snapshot.paramsKey
            })
            for (const key1 of Object.keys(staGroup)) {
              await this.requestWifiSetSpec(key1)
              this.$EventBus.$emit('GlobalSaveClick', '')
            }
            this.$message({ message: 'wifi set request sent', type: 'success' })
            this.requestWifiApply()
            await this.$store.dispatch('configs/getWifi', true)
            break
          }
          case 'vlan-set': {
            const APIArr = this.uniqueFuncForVLanSet(groupedArr[key], 'name')
            // 调用API
            for (let i = 0; i < APIArr.length; i++) {
              await this.requestVLANSet(APIArr[i].data.snapshot)
              this.$message({ message: 'interface set request sent', type: 'success' })
              this.$EventBus.$emit('GlobalSaveClick', APIArr[i])
            }
            await this.$store.dispatch('configs/getVLan', true)
            break
          }
          case 'port-forwards-set': {
            const APIForwardsArr = this.findOriginForwards(groupedArr[key], 'index')
            for (let i = 0; i < APIForwardsArr.length; i++) {
              await this.requestPortForwardsModify(APIForwardsArr[i])
            }
            this.$message({ message: 'port forward set request sent', type: 'success' })
            this.$store.dispatch('configs/getPortForwards', true).then(() => {})
            this.$EventBus.$emit('GlobalSaveClick', true)
            break
          }
          case 'zone-set': {
            const APIZoneArr = this.uniqueFuncForZoneSet(groupedArr[key], 'key')
            for (let i = 0; i < APIZoneArr.length; i++) {
              await this.requestZoneSet(APIZoneArr[i])
            }
            this.$message({ message: 'zone set request sent', type: 'success' })
            this.$store.dispatch('configs/getZone', true).then(() => {})
            this.$EventBus.$emit('GlobalSaveClick', true)
            break
          }
          case 'redirect-set': {
            console.log(groupedArr[key])
            const unique = this.uniqueFuncForRedirect(groupedArr[key], 'index')
            const originRedirect = this.findOriginRedirect(unique, 'index')
            for (let i = 0; i < originRedirect.length; i++) {
              await this.requestRedirectSet(originRedirect[i])
            }
            this.$message({ message: 'redirect set request sent', type: 'success' })
            this.$store.dispatch('configs/getRedirects', true).then(() => {})
            this.$EventBus.$emit('GlobalSaveClick', true)
            break
          }
          case 'default-set': {
            setDefaults(this.defaults).then(res => {
              this.$message({ message: 'Success', type: 'success' })
              this.$store.dispatch('configs/getDefaults', true).then(() => {})
              setTimeout(() => {
                this.$router.replace({ name: 'FirewallIndex' })
              }, 1000)
            }).finally(() => {
            })
            break
          }
        }
      }
      loading.close()
      // 请求完成通知页面刷新
      // 保存成功后清除缓存
      this.$store.dispatch('app/clearUnsaved')
      // location.reload()
    },
    requestGroupConfigSet(data) {
      const params = {}
      params[data.snapshot.paramsKey] = this.ap
      params['group'] = data.snapshot.groupId
      return group_set_config(params)
    },
    requestWifiSetSpec(staKey) {
      var params = {}
      params[`${staKey}`] = this.wifi[staKey]
      return setWifi(params)
    },
    requestWifiSet(params) {
      // var params = {}
      // params[`${snapshot.paramsKey}`] = { ...snapshot }
      return setWifi(params)
    },
    requestWifiApply(snapshot) {
      var params = {}
      return applyWifi(params)
    },
    requestGroupSet(params) {
      // const params = {}
      // params[snapshot.paramsKey] = snapshot
      // params['group'] = snapshot.group
      return group_set_config(params)
    },
    requestInterfaceSet(snapshot) {
      // var params = {}
      // params = snapshot
      return setInterfaces(snapshot)
    },
    requestVLANSet(snapshot) {
      return vlan_set(snapshot)
    },
    requestPortForwardsModify(param) {
      return modifyForward(param)
    },
    requestZoneSet(data) {
      const p = {}
      p[data.data.snapshot.key] = data.data.snapshot
      delete data.data.snapshot.key
      return setZone(p)
    },

    requestRedirectSet(param) {
      return setRedirect(param)
    },
    onDiscard() {
      this.$store.dispatch('app/clearUnsaved')
      this.$store.commit('configs/REST_ALL_CONFIG_TO_ORIGIN')
      this.$EventBus.$emit('GlobalDiscard', { path: this.$route.path })
    }
  }
}
</script>

<style scoped lang="scss">
//todo remove like this before custom theme
.reset-btn {
  background-color: #4a90e2;
  color: #ffffff;
}

::v-deep .el-icon-arrow-down {
  color: #FFFFFF;
  //font-size: 14px;
}

.counter {
  background-color: #ffffff;
  color: #4a90e2;
}

.discard {
  margin-left: 10px;
  background-color: transparent;
  border: 1px solid #8c8c94;
  color: #8c8c94;
}

.popover-wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;

  .popover-header {
    background-color: #f5f5f5;
    padding: 10px;
    font-size: 14px;
    font-weight: 400;
    color: rgb(50, 50, 50);
    border-radius: 7px 7px 0 0;
  }

  .popover-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 500px;
    overflow: scroll;
    overflow-x: hidden;
    padding: 0 10px;

    .record-wrapper {
      width: 100%;
      border-bottom: 1px solid #f5f5f6;

      .row {
        width: 100%;
        display: flex;
        align-items: center;
        padding-bottom: 8px;
        padding-top: 8px;
        //cursor: pointer;

        .cate-link {
          position: relative;

          .cate {
            color: #8c8c94;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 600;
          }

          &:after {
            content: '>';
            color: #8c8c94;
            font-size: 10px;
            font-weight: 100;
            margin-left: 4px;
            margin-right: 6px;
          }

          &:last-child:after {
            content: '';
          }
        }

        .changed-attr {
          position: relative;
          color: #000000;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 800;

          &:before {
            content: '>';
            color: #8c8c94;
            font-size: 12px;
            font-weight: 100;
            margin-left: 4px;
            margin-right: 6px;
          }
        }
      }
    }

  }
}

.container {

}
</style>
