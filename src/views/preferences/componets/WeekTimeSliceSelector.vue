<template>
  <div>
    <el-dialog
      :visible="innerVisible"
      :append-to-body="true"
      :modal="true"
      :destroy-on-close="true"
      width="40%"
      @close="onClose"
    >
      <div class="table-container">
        <div style="display: flex;width: 100%;flex-direction: row">

          <!--     左侧24小时     -->
          <div style="width: 84px;">
            <div class="table-column">
              <div class="place-holder" style="margin-bottom: 10px">
                <!-- 占位-->
              </div>
              <div
                v-for="(hourItem, hourIndex) in 24"
                :key="hourIndex"
                class="hours"
              >
                {{ hourItem < 10 ? ('0' + hourItem + ':00') : (hourItem + ':00') }}
              </div>
            </div>
          </div>

          <div>
            <!--          头部-->
            <div class="table-wrapper" style="margin-bottom: 10px">
              <div class="table-column">
                <div class="table-column-head">Monday</div>
              </div>
              <div class="table-column">
                <div class="table-column-head">Tuesday</div>
              </div>
              <div class="table-column">
                <div class="table-column-head">Wednesday</div>
              </div>
              <div class="table-column">
                <div class="table-column-head">Thursday</div>
              </div>
              <div class="table-column">
                <div class="table-column-head">Friday</div>
              </div>
              <div class="table-column">
                <div class="table-column-head">Saturday</div>
              </div>
              <div class="table-column">
                <div class="table-column-head">Sunday</div>
              </div>
            </div>
            <!--    表格        -->
            <div class="table-wrapper">
              <div v-for="(day, dayIndex) in tableData" :key="dayIndex" class="table-column">
                <div
                  v-for="(hourItem2, hourIndex2) in day"
                  :key="hourIndex2"
                  class="table-column-cell"
                  @click="onCellItemClick(hourItem2)"
                >
                  <div class="table-column-cell-inner" :class="{'cell-active': hourItem2.checked }">
                    <!--                    {{ hourItem2.checked }} {{ hourItem2.value }}-->
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div style="display: flex; width: 100%;flex-direction: row; margin-top: 20px;align-items: center">
          <div style="width: 20px;height: 20px;background: green;margin-left: 84px;margin-right: 10px" />
          <span style="">Time</span>
        </div>

        <div v-if="editable" style="display: flex;width: 100%;margin-top: 10px;justify-content: flex-end;">
          <el-button size="mini" @click="onSaveClick">OK</el-button>
          <el-button size="mini" @click="onReset">Reset</el-button>
          <el-button size="mini" @click="onCancel">Cancel</el-button>
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'WeekTimeSliceSelector',
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    slices: {
      type: Array,
      required: true
    },
    visible: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      initSlices: [],
      innerVisible: false,
      tableData: []
    }
  },
  watch: {
    'visible': {
      handler: function(newValue) {
        this.innerVisible = newValue
      },
      immediate: true
    },
    'slices': {
      handler: function(newValue) {
        this.tableData = newValue
        this.initSlices = JSON.parse(JSON.stringify(newValue))
      },
      immediate: true
    }
  },
  methods: {
    onClose() {
      this.innerVisible = false
      this.$emit('update:visible', this.innerVisible)
    },
    onCellItemClick(item) {
      if (this.editable) {
        item.checked = !item.checked
      }
    },
    onSaveClick() {
      this.innerVisible = false
      this.$emit('update:visible', this.innerVisible)
      this.$emit('onSlicesSelected', this.tableData)
    },
    onReset() {
      this.tableData = JSON.parse(JSON.stringify(this.initSlices))
      this.$emit('onReset', this.tableData)
    },
    onCancel() {
      this.innerVisible = false
      this.$emit('update:visible', this.innerVisible)
    }
  }
}
</script>
<style scoped lang="scss">

.table-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  font-size: 12px;
}

.place-holder {
  width: 82px;
  height: 17px;
}

.table-column-head {
  width: 82px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hours {
  width: 82px;
  padding-right: 10px;
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.table-column-cell {
  border-left: 1px solid #e5e6e6;
  border-top: 1px solid #e5e6e6;
  width: 82px;
  height: 19px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;

  &:last-child {
    border-bottom: 1px solid #e5e6e6;
  }
}

.table-column {
  display: flex;
  flex-direction: column;
}

.table-wrapper {
  display: grid;
  grid-template-columns: repeat(7, 82px);

}

.table-column:last-child {
  .table-column-cell {
    border-right: 1px solid #e5e6e6;
  }
}

.table-column-cell-inner {
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.cell-active {
  background: green;
}
</style>
