<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="false"
        :unique-opened="false"
        active-text-color="#FFFFFF"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <span class="product">{{hardwareVersion}}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { get_info } from '@/api/system'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      const pathLevel = (path.match(/\//g) || []).length
      if (pathLevel > 2) {
        return path.substring(0, this.findThirdSlashIndex(path))
      }
      return path
    },
    variables() {
      return variables
    }
  },

  methods: {
    findThirdSlashIndex(str) {
      var count = 0
      for (var i = 0; i < str.length; i++) {
        if (str[i] === '/') {
          count++
          if (count === 3) {
            return i
          }
        }
      }
      return -1
    }
  },
  data() {
    return {
      hardwareVersion: ''
    }
  },
  mounted() {
    get_info({}).then(res => {
      this.hardwareVersion = res.name
    })
  }
}
</script>
<style lang="scss" scoped>
.product {
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding-top: 40px;
  //margin-top: 4px;
//line-height: 60px;
//  color: #555555;
  color: rgb(111,42,142);
  cursor: default;
  display: block;
//float: left;
  font-weight: 300;
}
</style>
