<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="Admin Setup" name="admin_setup">
        <div class="content-container">
          <el-col>
            <el-col :span="24">
              <h1 class="panel-title">
                Account
              </h1>

              <!--<div class="three-column-row div_x9uoe7">
                <div class="three-column-row-cell-1">
                  <span>Old Username:</span>
                </div>
                <div class="three-column-row-cell-2">
                  <el-input size="mini"></el-input>
                </div>
                <div class="three-column-row-cell-3">
                  <span>(1-15 letters, digits or special characters)</span>
                </div>
              </div>

              <div class="three-column-row div_pfet0h">
                <div class="three-column-row-cell-1">
                  <span>Old Password:</span>
                </div>
                <div class="three-column-row-cell-2">
                  <el-input size="mini"></el-input>
                </div>
                <div class="three-column-row-cell-3">
                  <span>(6-15 letters, digits or special characters)</span>
                </div>
              </div>

              <div class="three-column-row div_dbqm95">
                <div class="three-column-row-cell-1">
                  <span>New Username:</span>
                </div>
                <div class="three-column-row-cell-2">
                  <el-input size="mini"></el-input>
                </div>
                <div class="three-column-row-cell-3">
                  <span>(1-15 letters, digits or special characters)</span>
                </div>
              </div>-->

              <div class="three-column-row div_uhbomp">
                <div class="three-column-row-cell-1">
                  <span>New Password:</span>
                </div>
                <div class="three-column-row-cell-2">
                  <el-input v-model="newPassword" type="password" size="mini" />
                </div>
                <div class="three-column-row-cell-3">
                  <span>(6-15 letters, digits or special characters)</span>
                </div>
              </div>

              <div class="three-column-row div_b3rxpy">
                <div class="three-column-row-cell-1">
                  <!--<span>Confirm New Password:</span>-->
                </div>
                <div class="three-column-row-cell-2">
                  <div class="div_cx4jg6">
                    <password-level :active-level="passwordLevel" />
                  </div>
                </div>
                <div class="three-column-row-cell-3">
                  <!--<span>(6-15 letters, digits or special characters)</span>-->
                </div>
              </div>

              <div class="three-column-row div_db6t3q">
                <div class="three-column-row-cell-1">
                  <span>Confirm New Password:</span>
                </div>
                <div class="three-column-row-cell-2">
                  <el-input v-model="confirmPassword" type="password" size="mini" />
                </div>
                <div class="three-column-row-cell-3">
                  <span>(6-15 letters, digits or special characters)</span>
                </div>
              </div>

              <div class="three-column-row div_2e730g">
                <div class="three-column-row-cell-1">
                  <el-button size="mini" @click="onSave">Save</el-button>
                </div>
                <div class="three-column-row-cell-2" />
                <div class="three-column-row-cell-3" />
              </div>

            </el-col>
          </el-col>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PasswordLevel from '@/components/PasswordLevel'
import { passwordStrength } from 'check-password-strength'
import { set } from '@/api/admin'

const options = [
  {
    id: 0, // correspond to the return id attribute.
    value: 0, // correspond to the return value attribute.
    minDiversity: 0, // between 0 and 4, correspond to the minimum of different criterias ('lowercase', 'uppercase', 'symbol', 'number') that should be met to pass the password strength
    minLength: 0 // minimum length of the password that should be met to pass the password strength
  },
  {
    id: 1,
    value: 1,
    minDiversity: 2,
    minLength: 6
  },
  {
    id: 2,
    value: 2,
    minDiversity: 4,
    minLength: 8
  },
  {
    id: 3,
    value: 3,
    minDiversity: 4,
    minLength: 10
  }
]
export default {
  name: 'AdminSetup',
  components: { PasswordLevel },
  data() {
    return {
      // password strength
      passwordLevel: 0,
      newPassword: '',
      confirmPassword: '',
      activeName: 'admin_setup',
      remoteManagementTableData: [
        {
          id: 1,
          subnet_mask: '102.31.70.1/24',
          disabled: true
        },
        {
          id: 2,
          subnet_mask: '102.31.71.0/24',
          disabled: true
        }
      ],
      remoteManagementTableEditing: false
    }
  },
  watch: {
    newPassword(inputValue) {
      this.passwordLevel = passwordStrength(inputValue, options).value
    }
  },
  methods: {
    onSave() {
      const params = {}
      if (this.newPassword !== this.confirmPassword) {
        this.$message.error('passwords do not match')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      params.password = btoa(this.newPassword)
      set(params).then(res => {
        this.$message.success('success')
        loading.close()
      }).catch(() => {
        loading.close()
      })
    },
    onRemoteManagementTableEditDone(row) {
      this.$refs.remoteManagementTable.toggleRowExpansion(row, false)
      this.remoteManagementTableEditing = false
    },
    onRemoteManagementTableEditCancel(row) {
      this.$refs.remoteManagementTable.toggleRowExpansion(row, false)
      this.remoteManagementTableEditing = false
    },
    handleRemoteManagementTableEdit(row) {
      if (!this.remoteManagementTableEditing) {
        this.$refs.remoteManagementTable.toggleRowExpansion(row, true)
        this.remoteManagementTableEditing = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";
.three-column-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;

  .three-column-row-cell-1 {
    display: flex;
    align-items: center;
    width: 174px;
  }

  .three-column-row-cell-2 {
    display: flex;
    align-items: center;
    width: 180px;
  }

  .three-column-row-cell-3 {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}

.div_x9uoe7 {
  margin-top: 20px
}

.div_pfet0h {
  margin-top: 10px
}

.div_dbqm95 {
  margin-top: 20px
}

.div_uhbomp {
  margin-top: 10px
}

.div_b3rxpy {
  padding: 4px 0
}

.div_cx4jg6 {
  width: 200px
}

.div_db6t3q {
  margin-top: 10px
}

.div_2e730g {
  margin-top: 30px
}

.div_y8d0ix {
  margin: 30px 0 10px 0;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  align-items: center
}

.div_ykb92d {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_9q5g2u {
  font-size: 18px
}

.span_8l02zl {
  font-size: 12px;
  margin-left: 5px
}

.div_tshjti {
  display: flex;
  align-items: center;
  margin-right: 20px
}

.i_w0ytxp {
  font-size: 18px
}

.span_r5l3yd {
  font-size: 12px;
  margin-left: 5px
}

.div_8rptik {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
}

.div_na5y8o {
  flex: 1;
}

.div_bx1hay {
  width: 100%;
  padding: 22px 18px;
  display: flex;
  flex-direction: column
}

.div_a2k63v {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_cixf6y {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_sp7i8g {
  flex: 1;
  display: flex;
  align-items: center
}

.el-input_t2fzot {
  max-width: 232px;
}

.span_wcnc6f {
  color: #000000;
  font-size: 12px;
  margin-left: 9px;
  margin-right: 9px
}

.el-input_kmz8dn {
  max-width: 80px;
}

.div_s2vy6l {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0
}

.span_9amuq {
  width: 174px;
  color: #000000;
  font-size: 12px
}

.div_vbd3bh {
  flex: 1;
  display: flex;
  align-items: center
}

.div_npemf {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 5px
}

.div_dejsv0 {
  width: 174px;
  flex: 1;
  display: flex;
  align-items: center
}

.div_hy3a1d {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

.span_6ol0ha {
  font-size: 16px
}

.span_hdm3pm {
  font-size: 16px;
  margin-left: 8px
}

.div_mwluce {
  margin-top: 20px
}

.div_tlqz1n {
  margin-top: 10px
}

.div_8vufe0 {
  margin-top: 10px
}

.div_ryukrv {
  margin-top: 10px
}

.div_o1m8rh {
  margin-top: 30px
}

</style>

