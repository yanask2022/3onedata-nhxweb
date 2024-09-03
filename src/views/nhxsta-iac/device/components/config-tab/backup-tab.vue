<template>
  <div class="root">
    <!--    backup-->
    <el-card
      shadow="never"
    >
      <div slot="header">
        <span>Backup</span>
      </div>
      <div class="content-wrapper">
        <div class="field-row">
          <div class="field-key">Click Backup to save a copy of your current settings. It is recommended to back up your
            settings before changing configurations or upgrading firmware.
          </div>
        </div>
        <div class="opt-btn-wrapper">
          <el-button type="primary" @click="SysBackup">Backup</el-button>
        </div>
      </div>
    </el-card>

    <!-- Restore -->
    <el-card
      shadow="never"
    >
      <div slot="header">
        <span>Restore</span>
      </div>
      <div class="content-wrapper">
        <div class="field-row">
          <div class="field-key">Restore saved settings from a file.</div>
        </div>
        <div class="field-row">
          <div class="field-key">File: {{ alreadyFileName }}</div>
          <div class="field-value">
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
              <el-button type="primary">Upload</el-button>
            </el-upload>
          </div>
        </div>
        <div class="opt-btn-wrapper">
          <el-button type="danger" @click="SysRestore">Restore</el-button>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
import { factory, sbackup, srestore } from '@/api/system'
import { getToken } from '@/utils/auth'

export default {
  name: 'BackupTab',
  data() {
    return {
      alreadyFileName: '',
      uploadURL: 'https://jsonplaceholder.typicode.com/posts/' // TODO replace that
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
  methods: {
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
    },
    SysBackup() {
      const loading = this.$loading({
        lock: true,
        text: 'Saving...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      sbackup({}).then(res => {
        loading.close()
        console.log(res.filename)
        const url = 'http://' + window.location.hostname + '/' + res.filename
        window.open(url)
        this.$message.success('success')
      }).catch(() => {
        loading.close()
      })
    },
    SysRestore() {
      // TODO uncomment this
      // if (!this.alreadyFileName) {
      //   this.$message.error('Please upload file first')
      //   return
      // }
      this.$confirm('Really restore?', '', {
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

        srestore({
        }).then(res => {
          loading.close()
          this.$message.success('success')
        }).catch(() => {
          loading.close()
        })
      }).catch(() => {
      })
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
