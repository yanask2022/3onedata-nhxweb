<template>
  <div class="root">
    <el-card shadow="never">
      <div class="card-panel-editable-content-wrapper">
        <el-form ref="form" :model="form" :rules="rules">
          <div class="field-row" :class="{'highlight' : hash === 'ignore_interface'}">
            <div class="field-key">
              <span class="field-key-text">Ignore interface</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox v-model="form.ignore_interface" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'start'}">
            <div class="field-key">
              <span class="field-key-text">Start</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.start" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'limit'}">
            <div class="field-key">
              <span class="field-key-text">Limit</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.limit" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'leasetime'}">
            <div class="field-key">
              <span class="field-key-text">Leasetime</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="form.leasetime" sizi="small" />
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'RouterAdminV2DhcpGeneralTab',

  data() {
    return {
      form: {
        ignore_interface: false,
        start: '',
        limit: '',
        leasetime: ''
      },
      rules: {
        start: [{
          required: true,
          message: 'please enter start',
          trigger: 'blur'
        }
        ],
        limit: [{
          required: true,
          message: 'please enter limit',
          trigger: 'blur'
        }
        ],
        leasetime: [{
          required: true,
          message: 'please enter leasetime',
          trigger: 'blur'
        }
        ]

      }
    }
  },

  mounted() {

  },

  methods: {

  }
}

</script>

<style lang="scss" scoped>
.el-input {

}
</style>
