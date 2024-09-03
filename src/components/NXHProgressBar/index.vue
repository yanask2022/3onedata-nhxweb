<template>
  <el-progress
    define-back-color=""
    :format="formatPercentageText"
    :text-inside="true"
    :color="customColorMethod"
    :stroke-width="height"
    :percentage="percentage"
  />
</template>

<script>
import { percentage } from '@/utils'

export default {
  name: 'NXHProgressBar',
  props: {
    height: {
      type: Number,
      default: 20
    },
    sum: {
      type: Number,
      default: 100
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dynamicStatus: '',
      percentage: 0
    }
  },
  watch: {
    progress: {
      handler(newValue) {
        this.percentage = percentage(newValue, this.sum)
      },
      immediate: true
    },
    sum: {
      handler(newValue) {
        this.percentage = percentage(this.progress, newValue)
      },
      immediate: true
    }
  },
  methods: {
    formatPercentageText(percentage) {
      return `${this.progress} / ${this.sum} (${percentage}%)`
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#9ca5b7'
      } else if (percentage < 70) {
        return '#d9a14d'
      } else {
        return '#9f1111'
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-progress-bar__inner {
  border-radius: 0;
}
::v-deep .el-progress-bar__outer {
  border-radius: 0;
}
</style>
