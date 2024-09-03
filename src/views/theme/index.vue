<template>
  <div class="app-container">
    <theme-picker style="height: 26px;margin: -3px 8px 0 0;"/>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
// import variables from '@/styles/variables.scss'
// const ORIGINAL_THEME = variables.primaryColor // default color
export default {
  components: { ThemePicker },
  name: 'Theme',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    // themeChange(val) {
    //   this.$store.dispatch('settings/changeSetting', {
    //     key: 'theme',
    //     value: val
    //   })
    // }
  }
}
</script>

<style scoped>
.field-label{
  vertical-align: middle;
}
.box-card {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.block {
  padding: 30px 24px;
}

.tag-item {
  margin-right: 15px;
}
</style>
