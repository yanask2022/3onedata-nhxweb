<template>
  <div class="content-container">
    <el-card shadow="never">
      <!-- <div slot="header">
                <div class="header-wrapper">
                    <span>Statistics List</span>
                </div>
            </div> -->
      <el-row>

        <el-checkbox-group
          v-model="checkedModes"
          :min="0"
          :max="1"
        >
          <el-col :span="24">
            <div class="mode-wrapper">
              <el-checkbox key="ap-iac" label="ap-iac">ap-iac</el-checkbox>
              <hr style="width: 100%">
              <div class="mode-desc">
                <span>Note:</span>
                <span>In this mode, supports route deployment and nhx-iac deployment.</span>
              </div>
            </div>
            <div class="mode-wrapper">
              <el-checkbox key="router" label="router">router</el-checkbox>
              <hr style="width: 100%">
              <div class="mode-desc">
                <span>Note:</span>
                <span>In this mode, the device enables multiple users to share the internet. The wireless ports share the same IP address as the Ethernet WAN port to connect to the ISP. The wireless port can be regarded as a LAN port while in AP Router mode.</span>
              </div>
            </div>
            <div class="mode-wrapper">
              <el-checkbox key="ap" label="ap">ap</el-checkbox>
              <hr style="width: 100%">
              <div class="mode-desc">
                <span>Note:</span>
                <span>In this mode , the AP will as a central hub for different wireless Lan client.
                  Multi-SSID is
                  also available in this mode. Which supports up to 4different SSIDs and passwords.</span>
              </div>
            </div>
            <!--<div class="mode-wrapper">-->
            <!--  <el-checkbox :value="options[3].checked" @change="onModeChange(3, $event)">STA</el-checkbox>-->
            <!--  <hr style="width: 100%">-->
            <!--  <div class="mode-desc">-->
            <!--    <span>Note:</span>-->
            <!--    <span>In this mode , the AP will as a central hub for different wireless Lan client.-->
            <!--      Multi-SSID is-->
            <!--      also available in this mode. Which supports up to 4different SSIDs and passwords.</span>-->
            <!--  </div>-->
            <!--</div>-->
            <div class="mode-wrapper">
              <el-checkbox key="sta-iac" label="sta-iac">sta-iac</el-checkbox>
              <hr style="width: 100%">
              <div class="mode-desc">
                <span>Note:</span>
                <span>In this mode , the AP will as a central hub for different wireless Lan client.
                  Multi-SSID is
                  also available in this mode. Which supports up to 4different SSIDs and passwords.</span>
              </div>
            </div>
            <div class="mode-wrapper">
              <el-checkbox key="sta" label="sta">sta</el-checkbox>
              <hr style="width: 100%">
              <div class="mode-desc">
                <span>Note:</span>
                <span>In this mode , the AP will as a central hub for different wireless Lan client.
                  Multi-SSID is
                  also available in this mode. Which supports up to 4different SSIDs and passwords.</span>
              </div>
            </div>
            <div class="mode-wrapper">
              <el-checkbox key="client" label="client">client</el-checkbox>
              <hr style="width: 100%">
              <div class="mode-desc">
                <span>Note:</span>
                <span>In this mode , the AP will as a central hub for different wireless Lan client.
                  Multi-SSID is
                  also available in this mode. Which supports up to 4different SSIDs and passwords.</span>
              </div>
            </div>


            <div class="margin-top-50">
              <el-button size="mini" @click="onSaveClick">Save</el-button>
            </div>
          </el-col>
        </el-checkbox-group>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setMode } from '@/api/user'
import { getInfo } from '@/api/user'
export default {
  name: 'OperationMode',
  data() {
    return {
      checkedModes: [],
      // modes: ['ap-iac', 'router', 'ap', 'sta', 'sta-iac', 'client'],
      count: '',
      timer: null,
      role: 'ac',
      activeName: 'operationMode',
      tabs: [
        { label: 'Operation Mode', name: 'operationMode' }
      ],
      options: [
        { checked: false, value: 'ap-iac' },
        { checked: false, value: 'router' },
        { checked: false, value: 'ap' },
        { checked: false, value: 'sta-iac' },
        { checked: false, value: 'sta' },
        { checked: false, value: 'client' }
      ]
    }
  },
  mounted() {
    getInfo({}).then(res => {
      this.checkedModes = [res.roles[0]]

    })
  },
  methods: {
    onSaveClick() {
      if (this.checkedModes.length < 1) {
        this.$message({
          showClose: true,
          message: 'A mode must be selected',
          type: 'error'
        })
        return
      }
      this.$confirm('After switching modes, you need to log in again, confirm switching?', 'Tip', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        console.log(this.role)
        setMode(this.checkedModes[0]).then(res => {

        })
        await this.openTimer()
      }).catch(() => {
      })
    },
    openTimer() {
      const TIME_COUNT = 20
      if (!this.timer) {
        this.count = TIME_COUNT
        const loading = this.$loading({
          lock: true,
          text: `Rebooting...please wait ${this.count} seconds`,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count -= 1
            loading.text = `Rebooting...please wait ${this.count} seconds`
          } else {
            loading.close()
            clearInterval(this.timer)
            this.timer = null
            this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          }
        }, 1000)
      }
    },

  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/tab.scss";
    .root {
      display: flex;
      flex-direction: column;
    }
    .mode-wrapper {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding-left: 15px;
      font-size: 12px;

      .mode-desc {
        padding-left: 20px;
        width: 100%;
        //border-top: 1px #e3e3e3 solid;
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        padding-top: 5px;
      }
    }
        .header-wrapper {
            width: 100%;
            align-items: center;
            justify-content: space-between;
            display: flex;
        }
</style>
