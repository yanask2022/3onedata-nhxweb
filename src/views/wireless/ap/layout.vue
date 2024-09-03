<template>
  <div>
    <!--<keep-alive include="APIndex">-->
    <router-view :key="key" />
    <!--</keep-alive>-->
  </div>
</template>

<script>
export default {
  name: 'WirelessAPLayout',
  computed: {
    key() {
      return this.$route.path
    }
  },
  mounted() {
    this.$store.dispatch('configs/getWifi').then(() => {
    })
  }
}
</script>

<style scoped>

</style>
