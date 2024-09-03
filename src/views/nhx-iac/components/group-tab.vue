<template>
  <div class="root">
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header">
        <div class="buttons-wrapper">
          <div>Group overview</div>
          <div class="left-panel-opt">
            <el-button
              type="primary"
              style="background-color: #409eff;border-color: #409eff;"
              @click="onAddGroup"
            >Add</el-button>
          </div>
        </div>
      </div>
      <div class="card-panel-editable-content-wrapper" style="width: 100%">
        <NXHTableExtends
          :key="randomKey"
          :selection="false"
          :table-data="tableData"
          :columns="columns"
          default-slot-width="500"
          @cell-dblclick="handleCellDoubleClick"
        >
          <template v-slot:group="{ scope }">
            <span>{{ scope.row.group }}</span>
          </template>
          <template v-slot:comment="{ scope }">
            <el-input
              v-if="scope.row[scope.column.property + 'isShow']"
              :ref="scope.column.property"
              v-model="scope.row.comment"
              @change="alterData(scope.row,scope.column)"
            />
            <span v-else>{{ scope.row.comment }}</span>
          </template>
          <template v-slot:default="{ scope }">
            <div>
              <el-button type="primary" @click="goGeneralConfig(scope.row, scope.row.group != 'g0')">General Config</el-button>
              <!-- https://dev.azure.com/lede/NHX-PACKAGES/_workitems/edit/55/ group id 为g0的时候 不允许有任何操作, 所以这些按钮变成不可编辑 -->
              <el-button type="primary" @click="goGroupRadio(scope.row, scope.row.group != 'g0')">RADIO CONFIG</el-button>
              <el-button type="primary" @click="goApConfig(scope.row, scope.row.group != 'g0')">AP CONFIG</el-button>
              <el-button type="danger" :disabled="scope.row.group == 'g0'" @click="handleDelete(scope.row)">DELETE</el-button>
            </div>
          </template>

        </NXHTableExtends>
      </div>
    </el-card>
  </div>
</template>
<script>
// import NXHTable from '@/components/NXHTable'
import NXHTableExtends from '@/components/NXHTableExtends/index'
import { get_group, group_add, del_group, group_modify, group_get_config, group_set_config } from '@/api/ac'
export default {
  name: 'GroupTab',
  components: {
    NXHTableExtends
  },

  directives: {
    // 通过自定义指令实现的表单自动获得光标的操作
    focus: {
      inserted: function(el) {
        if (el.tagName.toLocaleLowerCase() == 'input') {
          el.focus()
        } else {
          if (el.getElementsByTagName('input')) {
            el.getElementsByTagName('input')[0].focus()
          }
        }
        el.focus()
      }
    },
    focusTextarea: {
      inserted: function(el) {
        if (el.tagName.toLocaleLowerCase() == 'textarea') {
          el.focus()
        } else {
          if (el.getElementsByTagName('textarea')) {
            el.getElementsByTagName('textarea')[0].focus()
          }
        }
        el.focus()
      }
    }
  },
  data() {
    return {
      postAddLoading: null,
      randomKey: Math.random(),
      tableData: [],
      currentPage: 1,
      columns: [
        { label: 'Group ID', prop: 'group', custom: true },
        { label: 'Group name', prop: 'comment', custom: true }
      ],
      row: null,
      showInput: '',
      oldData: {}
    }
  },

  mounted() {
    this.getGroup()
  },

  methods: {
    refreshTable() {
      this.randomKey = Math.random()
    },
    handleCellDoubleClick(row, column, cell, event) {
      row[column.property + 'isShow' ] = true
      this.refreshTable()
      this.$nextTick(() => {
        this.$refs[column.property] && this.$refs[column.property].focus()
      })
    },
    // 提交更改
    alterData(row, column) {
      row[column.property + 'isShow'] = false
      this.saveCurrentGroupName(row.group, row.comment)
      this.refreshTable()
    },
    getGroup() {
      const loading = this.$loading({
        lock: true,
        text: 'Please wait...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      get_group({}).then(res => {
        if (Array.isArray(res)) {
          this.tableData = res
        }
      }).finally(() => {
        loading.close()
      })
    },

    blurInput(id, name, value) {
      const obj = {}
      // 判断数据是否有所改变，如果数据有改变则调用修改接口
      if (this.oldData[name] != value) {
        obj[name] = value// 被改变的数据
        // 然后再写调用接口，提交内容的东西就可以了
        this.saveCurrentGroupName(id, obj.comment)
      }
      this.showInput = ''
    },
    tableDbEdit(row, column, event) {
      this.showInput = column.property + row.group
      this.oldData[column.property] = row[column.property]
    },

    onRowEdit(row) {
      this.$router.push({
        name: 'APEdit',
        params: { ...row }
      })
    },
    goGeneralConfig(value, canEdit) {
      this.$router.push({
        name: 'groupGeneralConfig',
        query: { ...value, canEdit: canEdit }
      })
    },
    goApConfig(value, canEdit) {
      // sessionStorage.setItem('groupNameValue', value.group)
      this.$router.push({
        name: 'GroupAP',
        query: { ...value, canEdit: canEdit }
      })
    },
    goGroupRadio(value, canEdit) {
      this.$router.push({
        name: 'groupRadio',
        query: { ...value, canEdit: canEdit }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除此条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del_group({
          group: row.group
        }).then(() => {
          this.getGroup()
          // this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        // TODO
      })
    },
    onAddGroup() {
      // not editing
      if (!this.row) {
        this.postAddGroup().then((groupId) => {
          this.postDefaultSettings(groupId)
        })
      } else {
        // user confirm and continue
        this.$confirm('Unsaved changes will be lost. Discard?', 'alert', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.row = null
          this.postAddGroup().then((groupId) => {
            this.postDefaultSettings(groupId)
          })
        }).catch(() => {
        })
      }
    },

    postDefaultSettings(groupComment) {
      if (this.tableData.length > 1) {
        // this.items.findIndex((item) => item.id === id);
        const index = this.tableData.findIndex((item) => item.comment === groupComment)
        if (index >= 0) {
          const groupId = this.tableData[index].group
          // get g0 group config
          group_get_config({
            group: 'g0'
          }).then(async g0Res => {
            // set to new group
            var params = {
              group: groupId,
              radio0: g0Res.raido0,
              radio1: g0Res.raido1,
              radio2: g0Res.raido2,
              radio3: g0Res.raido3,
              ...g0Res
            }
            // raido0 和 radio0 不同
            delete params['raido0']
            delete params['raido1']
            delete params['raido2']
            delete params['raido3']

            const paramKeys = Object.keys(params)
            for (let i = 0; i < paramKeys.length; i++) {
              const currentKey = paramKeys[i]
              if (currentKey !== 'group') {
                const temp = {}
                temp.group = groupId
                temp[currentKey] = params[currentKey]
                await group_set_config(temp)
              }
            }
            this.postAddLoading.close()
          })
        }
      }
    },
    saveCurrentGroupName(groupId, commentVal) {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      group_modify({
        group: groupId,
        comment: commentVal
      }).then(res => {
        loading.close()
        this.getGroup()
        this.$message({
          type: 'success',
          message: 'Save success'
        })
      }).catch(() => {
        loading.close()
      })
    },
    postAddGroup() {
      return new Promise((resolve, reject) => {
        this.postAddLoading = this.$loading({
          lock: true,
          text: 'Saving...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        // post to backend
        const newGroupID = 'default' + Math.floor(Math.random() * 100)
        group_add({
          comment: newGroupID
        }).then(group_add_res => {
          // refresh group table
          get_group({}).then(res => {
            if (Array.isArray(res)) {
              this.tableData = res
              // set current editing row
              const newGroupIndex = this.tableData.findIndex(item => item.group === group_add_res.group)
              if (newGroupIndex) {
                this.row = this.tableData[newGroupIndex]
              }
            }
            resolve(newGroupID)
          }).catch((error) => {
            this.postAddLoading.close()
            reject(error)
          })
        }).catch(() => {
        })
      })
    }
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`)
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`)
    // }
  }
}
</script>
<style lang="scss" scoped>
.pagination-container {
  background: #fff;
  padding: 32px 0;
}
.buttons-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* padding: 30px 0 10px 0; */
}
::v-deep .el-card__header {
  //border: unset;
}
::v-deep .el-button--primary {
  /* background-color: #409eff; */
  /* border-color: #409eff; */
  color: #fff;
}
::v-deep .el-button--danger {
  /* background-color: #f56c6c; */
  /* border-color: #f56c6c; */
  color: #fff;
}
::v-deep .el-icon-circle-plus {
  color: #fff;
}
</style>
