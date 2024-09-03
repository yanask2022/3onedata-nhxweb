<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="Mac" name="mac">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <div class="title">
                <h1 class="panel-title">
                  MAC
                </h1>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="content-container">
                <div class="buttons-wrapper" />
                <div class="table-wrapper">
                  <el-table
                    :data="tableData"
                    header-cell-class-name="header-class"
                    cell-class-name="cell-class"
                    border
                  >
                    <el-table-column
                      prop="interface_name"
                      header-align="center"
                      align="center"
                      label="Interface Name"
                    />
                    <el-table-column
                      prop="currentMACAddress"
                      header-align="center"
                      align="center"
                      label="Current MAC Address"
                    >
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.currentMACAddress" />
                      </template>
                    </el-table-column>
                    <el-table-column
                      header-align="center"
                      align="center"
                      label="MAC Clone"
                    >
                      <template slot-scope="scope">
                        <div>
                          <el-button size="mini" @click="scope.row.currentMACAddress = ''">Restore Factory Mac
                          </el-button>
                          <el-button
                            v-if="scope.row.type != 'lan'"
                            size="mini"
                            @click="scope.row.currentMACAddress = '00-14-78-00-00-03'"
                          >Clone Current PC's MAC
                          </el-button>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>

              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-button size="mini" class="margin-top-20">Save</el-button>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'MAC',
  data() {
    return {
      activeName: 'mac',
      tableData: [
        { interface_name: 'WAN1', currentMACAddress: '00-14-78-00-00-01', type: 'wan' },
        { interface_name: 'WAN2', currentMACAddress: '00-14-78-00-00-02', type: 'wan' },
        { interface_name: 'LAN1', currentMACAddress: '00-14-78-00-00-03', type: 'lan' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";
.title {
  h3 {
    color: $primary-color;
    font-size: 12px;
    padding: 8px 0 8px 15px;
    background: #F0F0F0;
    font-weight: normal;
  }

  margin-bottom: 8px;
}


  .buttons-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .left {
      display: flex;
      align-items: center;

      ::v-deep .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
    }

    .right {
      display: flex;
    }
  }

  .table-wrapper {
    margin-top: 20px;
  }


</style>
