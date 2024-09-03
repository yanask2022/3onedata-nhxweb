<template>
  <div>
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="Interfaces" name="first" />
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Interfaces',

  data() {
    return {
      activeName: 'first'
    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/tab.scss";
</style>
