<template>
  <div class="app-wrapper">
    <div class="top-header">
      <div class="top-header-left">
        <a class="brand">
          <span class="brand-text">3ONEDATA</span>
        </a>

      </div>
      <div style="color:#000000; margin-left: 0; margin-right: auto">
        <breadcrumb id="breadcrumb-container" />
      </div>
      <div class="top-header-right">
        <save-and-apply style="margin-right: 40px"/>
        <div class="top-header-right-btn" @click="onReboot">
          <i class="el-icon-switch-button" />
          Reboot
        </div>
        <div class="top-header-right-btn log-out" @click="onLogout">
          <i class="el-icon-refresh-right" />
          Logout
        </div>

      </div>
    </div>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <tags-view style="display: none" />
<!--      <tags-view  />-->
      <!--      -->
      <!--      <div style="height: 30px; background-color: #FFFFFF;position: fixed;top: 67px; left: 230px;right: 0;z-index:99;display: flex; align-items: center">-->
      <!--        <span>home/status</span>-->
      <!--      </div>-->
      <app-main />
    </div>


  </div>
</template>

<script>
import { AppMain, Sidebar, SaveAndApply,TagsView } from './components'
import { mockError, getInfo, logout } from '@/api/user'
import Breadcrumb from '@/components/Breadcrumb'
import store from '@/store'
import { reboot } from '@/api/system'

// import ThemePicker from '@/components/ThemePicker'
export default {
  name: 'Layout',
  components: {
    SaveAndApply,
    AppMain,
    Sidebar,
    Breadcrumb,
    TagsView
    // ThemePicker
  },
  data() {
    return {
      name: 'NHX'
    }
  },
  created() {
    this.getData()
  },

  mounted() {
    getInfo({}).then(res => {
      this.name = res.name
    })
  },
  methods: {
    getData() {
      // this.$store.dispatch('configs/getWifi')
    },
    onReboot() {
      this.$confirm('Confirm reboot?', {
        confirmButtonText: ' Reboot ',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        reboot().then(res => {
          this.$router.replace('/')
        })
      })
    },
    onLogout(){
      this.$confirm('Confirm logout?', {
        confirmButtonText: ' Logout ',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        logout(this.$store.state.user.token).then(res => {
          this.$store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      })
    },
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    },
    onNHXClick() {
      mockError({}).then(res => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.top-header {
  top:0;
  z-index: 9;
  position: fixed;
  //height: $topHeaderHeight;
  //padding-left: 60px;
  //padding-right: 50px;
  background: #fff;
  color: white;
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  transition: box-shadow .2s;

  .top-header-left {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px 0;
    .brand {
      font-size: 32px;
      //line-height: 60px;
      color: rgb(111,42,142);
      cursor: default;
      display: block;
      width: $sideBarWidth;
      padding-right: 10px;
      //height: 60px;
      text-align: center;
      font-weight: 900;
      letter-spacing: 3px;

      .brand-text {
        position: relative;
        &:after {
          content: "®";
          font-size: 14px;
          font-family: Tahoma;
          position: absolute;
          top: -4px;
          right: -14px;
          font-weight: normal !important;
        }
      }
    }
    .product {
      font-size: 12px;
      margin-top: 4px;
      //line-height: 60px;
      color: #555555;
      cursor: default;
      display: block;
      text-align: left;
      //float: left;
      font-weight: 300;
    }
  }

  .top-header-right {
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 10px;
    color: white;
    .top-header-right-btn {
      color: #fff !important;
      background-color: #617486;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
      text-transform: uppercase;
      margin-right: 6px;

      &:last-child {
        margin-right: unset;
      }

      i {
        color: #FFFFFF !important;
        margin-right: 10px;
      }
    }
    .log-out {
      background-color: rgb(148,143,225);
    }
  }

}

//.sidebar-container {
//  margin-top: 2px;
//  transition: width 0.28s;
//  width: $sideBarWidth !important;
//  //background-color: $menu-container-bg;
//  background-color: rgb(229,229,229);
//  height:calc(100% - #{$topHeaderHeight});
//  position: fixed;
//  //font-size: 0px;
//  top: $topHeaderHeight;
//  bottom: 0;
//  left: 0;
//  z-index: 1001;
//  overflow: hidden;
//}

//.main-container {
//  height:calc(100% - #{$topHeaderHeight});
//  width: calc(100% - #{$sideBarWidth});;
//  margin-left: $sideBarWidth;
//  position: fixed;
//  overflow: scroll;
//  top: $topHeaderHeight;
//  margin-top: 2px;
//  background: #f1f4f5;
//}
</style>
