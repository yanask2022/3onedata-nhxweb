<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" class="tab">
      <el-tab-pane label="SNMP" name="SNMP">
        <div class="content-container">
          <el-row>
            <el-col :span="24">
              <h1 class="panel-title">SNMP</h1>
              <div class="two-column-row-container">
                <div class="two-column-row">
                  <div class="col-1">SNMP:</div>
                  <div class="col-2"><el-checkbox>Enable</el-checkbox></div>
                </div>

                <div class="two-column-row">
                  <div class="col-1">Contact:</div>
                  <div class="col-2">
                    <el-input size="mini"></el-input>
                  </div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">Device Name:</div>
                  <div class="col-2">
                    <el-input size="mini"></el-input>
                  </div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">Location:</div>
                  <div class="col-2">
                    <el-input size="mini"></el-input>
                  </div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">Get Community:</div>
                  <div class="col-2">
                    <el-input size="mini"></el-input>
                  </div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">Get Trusted Host:</div>
                  <div class="col-2">
                    <el-input size="mini"></el-input>
                  </div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">Set Community:</div>
                  <div class="col-2">
                    <el-input size="mini"></el-input>
                  </div>
                </div>
                <div class="two-column-row">
                  <div class="col-1">Set Trusted Host:</div>
                  <div class="col-2">
                    <el-input size="mini"></el-input>
                  </div>
                </div>

                <div class="two-column-row div_zljoo1">
                  <div class="col-1"><el-button size="mini">Save</el-button></div>
                  <div class="col-2">
                    <!--<el-input size="mini"></el-input>-->
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>




<script>
export default {
  name: 'SNMP',
  data() {
    return {
      activeName: 'SNMP'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/tab.scss";
@import "~@/styles/table.scss";

.two-column-row-container {
  padding-top: 15px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;

  .two-column-row {
    margin: 5px 0;
    width: 100%;
    display: flex;
    align-items: center;

    .col-1 {
      width: 184px;
    }

    .col-2 {
      width: 184px;
    }
  }
}



.chart-wrapper {
  background: #fff;
  height: 305px;
  width: 400px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e5e5;
}

.table-wrapper {
  background: #fff;
  height: 305px;
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e5e5e5;
}

.title-bar {
  padding-left: 10px;
  width: 100%;
  background: #eee;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 40px;
  color: #212121;
  font-weight: bold;
  justify-content: space-between;
}

.tab-btn {
  padding: 0 6px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 30px;
  background: #ffffff;
  color: #7d7e80;
  font-size: 14px;
  cursor: pointer
}

.tab-btn-selected {
  border-color: #4acbd6;
  background: #4acbd6;
  color: #ffffff;
}

.div_zljoo1 {
  margin-top: 30px
}
</style>
