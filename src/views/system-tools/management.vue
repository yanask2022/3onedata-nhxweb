<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="Factory Default Restore" name="factory_default_restore">
        <div class="content-container">
          <el-col>
            <el-col :span="24">
              <h1 class="panel-title">
                Factory Defaults
              </h1>

              <div class="three-column-row div_h6o5f0">
                <span>Revert all the configuration to factory default.</span>
              </div>

              <div class="three-column-row div_ok8bfc">
                <div class="three-column-row-cell-1">
                  <el-button size="mini" @click="restore_factory">Factory Restore</el-button>
                </div>
                <div class="three-column-row-cell-2" />
                <div class="three-column-row-cell-3" />
              </div>
            </el-col>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="BackUp Restore" name="backup_restore">
        <div class="content-container">
          <el-col>
            <el-col :span="24">
              <h1 class="panel-title">
                Backup
              </h1>
              <div class="three-column-row div_6mnlg2">
                <span>Click Backup to save a copy of your current settings. It is recommended to back up your settings before changing configurations or upgrading firmware.</span>
              </div>

              <div class="three-column-row div_zivko3">
                <div class="three-column-row-cell-1">
                  <el-button size="mini" @click="sys_backup">Backup</el-button>
                </div>
                <div class="three-column-row-cell-2" />
                <div class="three-column-row-cell-3" />
              </div>
            </el-col>
          </el-col>
        </div>
        <div class="content-container">
          <el-col>
            <el-col :span="24">
              <h1 class="panel-title">
                Restore
              </h1>
              <div class="three-column-row div_42ckoo">
                <span>Restore saved settings from a file.</span>
              </div>

              <div class="three-column-row div_oonhfi">
                <div class="three-column-row-cell-1">
                  <span>File</span>
                </div>
                <div class="three-column-row-cell-3">
                  <span class="span_e28vcw" />
                  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-remove="handleRemove" :before-remove="beforeRemove" :multiple="false" :limit="1" :on-exceed="handleExceed">

                    <el-button size="mini">Upload</el-button>
                    <!--<div slot="tip" class="el-upload__tip">注意：只能上传.xxx格式文件</div>-->
                  </el-upload>
                </div>
              </div>

              <div class="three-column-row div_k1n8pa">
                <div class="three-column-row-cell-1">
                  <el-button size="mini" @click="sys_restore">Restore</el-button>
                </div>
                <div class="three-column-row-cell-2" />
                <div class="three-column-row-cell-3" />
              </div>
            </el-col>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Reboot" name="reboot">
        <div class="content-container">
          <el-col>
            <el-col :span="24">
              <h1 class="panel-title">
                Reboot
              </h1>

              <!-- 保存按钮-->
              <div class="three-column-row div_43boxq">
                <div class="three-column-row-cell-1">
                  <el-button size="mini" @click="sys_reboot">Reboot</el-button>
                </div>
                <div class="three-column-row-cell-2" />
                <div class="three-column-row-cell-3" />
              </div>

            </el-col>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Firmware Upgrade" name="firmware_upgrade">
        <div class="content-container">
          <el-col>
            <el-col :span="24">
              <h1 class="panel-title">
                Firmware Upgrade
              </h1>

              <div class="three-column-row div_atybdo">
                <div class="three-column-row-cell-1">
                  <span>Firmware Version:</span>
                </div>
                <div class="three-column-row-cell-2 div_7lapd6" style="width: auto">
                  <span>{{ soft_version }}</span>
                </div>
                <div class="three-column-row-cell-3" />
              </div>
              <div class="three-column-row div_uf0j51">
                <div class="three-column-row-cell-1">
                  <span>Hardware Version:</span>
                </div>
                <div class="three-column-row-cell-2" style="width: auto">
                  <span>{{ hw_name }}</span>
                </div>
                <div class="three-column-row-cell-3" />
              </div>

              <div class="three-column-row div_7jb0ce" style="align-items: flex-start">
                <div class="three-column-row-cell-1" style="height: 14px">
                  <span>New Firmware File:</span>
                </div>
                <!--<div class="three-column-row-cell-2" style="min-width:180px; width: auto">-->
                <!--  <span class="span_9mn10x"  style="min-width:180px; width: auto;text-align: center">{{readyFileName}}</span>-->
                <!--</div>-->
                <div class="three-column-row-cell-3">
                  <el-upload
                    class="upload-demo"
                    :action="uploadURL"
                    name="filedata"
                    :multiple="false"
                    :limit="1"
                    :data="uploadData"
                    :on-success="onFileUploadSuccess"
                    :on-error="onFileUploadFail"
                    :on-change="onFileChange"
                  >
                    <el-button size="mini">Upload</el-button>
                  </el-upload>
                </div>
              </div>

              <!-- 保存按钮-->
              <div class="three-column-row div_gf38f0">
                <div class="three-column-row-cell-1">
                  <el-button size="mini" @click="sys_upgrade">Upgrade</el-button>
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
import { getToken } from '@/utils/auth'
import { factory, reboot, get_info, sbackup, srestore } from '@/api/system'
import { upgrade } from '@/api/upgrade'

let uploadHost = ''
if (process.env.NODE_ENV === 'development') {
  // '//': 兼容http和https
  uploadHost = '//' + process.env.VUE_APP_UPLOAD_URL + '/cgi-bin/nhxcgi'
} else {
  uploadHost = '//' + window.location.hostname + '/cgi-bin/nhxcgi'
}
export default {
  name: 'Management',
  data() {
    return {
      uploadURL: uploadHost,
      passwordLevel: 0,
      soft_version: '1.0.0',
      hw_name: 'NHX',
      activeName: 'factory_default_restore',
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
      remoteManagementTableEditing: false,
      readyFileName: ''
    }
  },
  computed: {
    // 上传固件附带的表单数据
    uploadData() {
      return {
        sessionid: getToken()
      }
    }
  },
  mounted() {
    get_info({}).then(res => {
      this.hw_name = res.name
      this.soft_version = res.soft_version
    })
  },
  methods: {
    onFileChange(file, fileList) {
      if (file.status === 'ready') {
        this.readyFileName = file.name

      } else if (file.status === 'fail') {
        this.readyFileName = ''

      }
    },
    onFileUploadFail(err, file, fileList) {
      // network error
      this.$message.error('upload failed：network error')
    },
    onFileUploadSuccess(response, file, fileList) {
      if (response.errcode != 0) {
        this.$message.error('upload failed')
      }
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
    },
    restore_factory() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      factory({
      }).then(res => {
        loading.close()
        this.$message.success('success')
      }).catch(() => {
        loading.close()
      })
    },
    sys_reboot() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      reboot({
      }).then(res => {
        loading.close()
        this.$message.success('success')
      }).catch(() => {
        loading.close()
      })
    },
    sys_backup() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      sbackup({
      }).then(res => {
        loading.close()
        console.log(res.filename)
        const url = 'http://' + window.location.hostname + '/' + res.filename
        window.open(url)
        this.$message.success('success')
      }).catch(() => {
        loading.close()
      })
    },
    sys_restore() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      srestore({
      }).then(res => {
        loading.close()
        this.$message.success('success')
      }).catch(() => {
        loading.close()
      })
    },
    sys_upgrade() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      upgrade({
      }).then(res => {
        loading.close()
        this.$message.success('success')
      }).catch(() => {
        loading.close()
      })
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
    //margin-left: 10px;
  }
}

.div_h6o5f0 {
  margin-top: 20px
}

.div_ok8bfc {
  margin-top: 30px
}

.div_6mnlg2 {
  margin-top: 20px
}

.div_zivko3 {
  margin-top: 30px;
  margin-bottom: 30px
}

.div_42ckoo {
  margin-top: 20px
}

.div_oonhfi {
  margin-top: 20px
}

.span_e28vcw {
  background-color: #f5f5f5;
  border: 1px solid #e6e6e6;
  width: 180px;
  height: 32px;
;
  margin-right: 12px
}

.div_k1n8pa {
  margin-top: 30px
}

.div_43boxq {
  margin-top: 30px
}

.div_atybdo {
  margin-top: 30px;
  margin-bottom: 30px
}

.div_7lapd6 {
  width: auto
}

.div_uf0j51 {
  margin-top: 30px;
  margin-bottom: 30px
}

.div_7jb0ce {
  margin-top: 30px;
  margin-bottom: 30px
}

.span_9mn10x {
  background-color: #f5f5f5;
  border: 1px solid #e6e6e6;
  width: 180px;
  height: 32px;
  line-height: 32px;
}

.div_gf38f0 {
  margin-top: 30px
}

</style>

