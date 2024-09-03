<template>
  <div class="container">
    <span class="password-level" :class="{'password-level-active' : activeLevel == 0}">Too weak</span>
    <span class="password-level" :class="{'password-level-active' : activeLevel == 1}">Weak</span>
    <span class="password-level" :class="{'password-level-active' : activeLevel == 2}">Medium</span>
    <span class="password-level" :class="{'password-level-active' : activeLevel == 3}">Strong</span>
  </div>
</template>
<script>
export default {
  name: 'PasswordLevel',
  props: {
    activeLevel: {
      default: 0,
      type: Number
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
}

.password-level {
  flex: 1;
  background-color: #c9c9ca;
  color: #ffffff;
  font-size: 10px;
  height: 13px;
  line-height: 13px;
  text-align: center;
  margin-right: 1px;
}

.password-level-active {
  background-color: #4acbd6
}

</style>
