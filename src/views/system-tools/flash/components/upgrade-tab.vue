<template>
  <div class="root">
    <el-card
      shadow="never"
    >
      <div slot="header">
        <span>Firmware Upgrade</span>
      </div>
      <div class="content-wrapper">
        <div class="field-row">
          <div class="field-key">Firmware Version:</div>
          <div class="field-value">
            {{ soft_version }}
          </div>
        </div>
        <div class="field-row">
          <div class="field-key">Hardware Version:</div>
          <div class="field-value">
            {{ hw_name }}
          </div>
        </div>
        <div class="field-row">
          <div class="field-key">New Firmware File:</div>
          <div class="field-value" style="display: flex;flex-direction: column">
            <!--            <span v-if="alreadyFileName" style="margin-right: 10px">{{alreadyFileName}}</span>-->
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
              :on-progress="onProgress"
            >
              <el-button type="primary">{{ uploadBtnText }}</el-button>
            </el-upload>
            <!--            <el-progress v-show="alreadyFileName" :percentage="uploadPercentage" style="width:50%;"></el-progress>-->
          </div>
        </div>

        <div v-if="alreadyFileName" class="field-row">
          <div class="field-key" />
          <div class="field-value" style="display: flex;flex-direction: column">
            <span style="margin-right: 10px">{{ alreadyFileName }}</span>
            <el-progress :percentage="uploadPercentage" style="width:50%;" />
          </div>
        </div>

        <div class="opt-btn-wrapper">
          <el-button type="danger" :disabled="!canUpgrade" @click="SysUpgrade">Upgrade</el-button>
        </div>

      </div>
    </el-card>
  </div>

</template>

<script>
import { get_info } from '@/api/system'
import { getToken } from '@/utils/auth'
import { upgrade } from '@/api/upgrade'

const uploadHost = process.env.NODE_ENV === 'development'
  ? '/cgi/nhxcgi'
  : '//' + window.location.hostname + '/cgi-bin/nhxcgi'

export default {
  name: 'UpgradeTab',
  data() {
    return {
      uploadURL: uploadHost,
      soft_version: '1.0.0',
      hw_name: 'NHX',
      alreadyFileName: '',
      uploadPercentage: 0,
      uploadBtnText: 'Upload',
      canUpgrade: false
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
        this.uploadPercentage = 0
      }
    },
    onProgress(event1, file, fileList) {
      console.log('file.percentage', file.percentage)
      this.uploadPercentage = Math.round(Number(file.percentage))
    },
    onFileUploadFail(err, file, fileList) {
      this.canUpgrade = false
      this.$message.error('upload failed：network error')
      this.uploadBtnText = 'Upload'
    },
    onFileUploadSuccess(response, file, fileList) {
      console.log('onFileUploadSuccess')
      this.uploadBtnText = 'Re-upload'
      if (response.errcode != 0) {
        this.$message.error('upload failed')
      } else {
        this.uploadPercentage = 100
        this.canUpgrade = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
