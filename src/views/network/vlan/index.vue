<template>
  <router-view />
</template>

<script>
import { vlan_get } from '@/api/vlan'

export default {
  name: 'VLanIndex',
  created() {
    this.$store.dispatch('configs/getVLan')
  }
}
</script>

<style scoped>

</style>
