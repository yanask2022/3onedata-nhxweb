<template>
  <div>
    <!--<keep-alive include="STAIndex">-->
      <router-view :key="key" />
    <!--</keep-alive>-->
  </div>
</template>

<script>
export default {
  name: 'STALayout',
  computed: {
    key() {
      return this.$route.path
    }
  },
  mounted() {
    this.$store.dispatch('configs/getWifi').then(() => {
      // this.getData()
    })
  }
}
</script>

<style scoped>

</style>
