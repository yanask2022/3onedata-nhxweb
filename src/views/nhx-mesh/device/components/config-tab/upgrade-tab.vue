<template>
  <div class="root">
    <el-card
      shadow="never"
    >
      <!-- <div slot="header">
        <span>Firmware Upgrade</span>
      </div> -->
      <div class="content-wrapper">
        <!-- <div class="field-row">
          <div class="field-key">Firmware Version:</div>
          <div class="field-value">
            {{ soft_version }}
          </div>
        </div> -->
        <div class="field-row">
          <div class="field-key">Hardware Version:</div>
          <div class="field-value">
            NHX6018-0-NPN-256M32-D4
          </div>
        </div>
        <div class="field-row">
          <div class="field-key">New Firmware File:</div>
          <div class="field-value" style="display: flex; align-items: center">
            <span v-if="alreadyFileName" style="margin-right: 10px">{{ alreadyFileName }}</span>
            <el-upload
              :show-file-list="false"
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
              <el-button v-if="alreadyFileName" type="primary">Re-upload</el-button>
              <el-button v-else type="primary">Upload</el-button>
            </el-upload>
          </div>
        </div>

      </div>
      <div class="content-wrapper mt20">
        <div class="field-row">
          <div class="field-key">Hardware Version:</div>
          <div class="field-value">
            NHX5018-NPN-256M16-D3
          </div>
        </div>
        <div class="field-row">
          <div class="field-key">New Firmware File:</div>
          <div class="field-value" style="display: flex; align-items: center">
            <span v-if="alreadyFileName" style="margin-right: 10px">{{ alreadyFileName }}</span>
            <el-upload
              :show-file-list="false"
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
              <el-button v-if="alreadyFileName" type="primary">Re-upload</el-button>
              <el-button v-else type="primary">Upload</el-button>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="content-wrapper mt20">
        <div class="field-row">
          <div class="field-key">Hardware Version:</div>
          <div class="field-value">
            NHX6018-1-NPN-512M32-D4
          </div>
        </div>
        <div class="field-row">
          <div class="field-key">New Firmware File:</div>
          <div class="field-value" style="display: flex; align-items: center">
            <span v-if="alreadyFileName" style="margin-right: 10px">{{ alreadyFileName }}</span>
            <el-upload
              :show-file-list="false"
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
              <el-button v-if="alreadyFileName" type="primary">Re-upload</el-button>
              <el-button v-else type="primary">Upload</el-button>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="opt-btn-wrapper mt20">
        <el-button type="danger" @click="SysUpgrade">Upgrade</el-button>
      </div>
    </el-card>
  </div>

</template>

<script>
import { get_info } from '@/api/system'
import { getToken } from '@/utils/auth'
import { upgrade } from '@/api/upgrade'
let uploadHost = ''
if (process.env.NODE_ENV === 'development') {
  // '//': 兼容http和https
  uploadHost = '//' + process.env.VUE_APP_UPLOAD_URL + '/cgi-bin/nhxcgi'
} else {
  uploadHost = '//' + window.location.hostname + '/cgi-bin/nhxcgi'
}
export default {
  name: 'UpgradeTab',
  data() {
    return {
      uploadURL: uploadHost,
      soft_version: '1.0.0',
      hw_name: 'NHX',
      alreadyFileName: ''
    }
  },
  computed: {
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
    SysUpgrade() {
      if (!this.alreadyFileName) {
        this.$message.error('Please upload new firmware file first')
        return
      }
      this.$confirm('Really Upgrade?', '', {
        confirmButtonText: ' OK ',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
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
      }).catch(() => {
      })
    },
    onFileChange(file, fileList) {
      if (file.status === 'ready') {
        this.alreadyFileName = file.name
      } else if (file.status === 'fail') {
        this.alreadyFileName = ''
      }
    },
    onFileUploadFail(err, file, fileList) {
      this.$message.error('upload failed：network error')
    },
    onFileUploadSuccess(response, file, fileList) {
      if (response.errcode != 0) {
        this.$message.error('upload failed')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.mt20 {
  margin-top: 20px;
}
::v-deep .el-card {
  border: unset;
}
::v-deep .el-card__header {
  border: unset;
}

::v-deep .el-button {
  color: #FFFFFF;
}
</style>
