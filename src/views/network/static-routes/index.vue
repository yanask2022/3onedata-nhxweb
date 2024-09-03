<template>
  <div class="root">
    <span class="title">Routes</span>
    <span style="color: rgb(132,119,116);margin-bottom: 10px;font-size: small;padding-left: 5px;">Routes specify over which interface and gateway a certain host or network can be reached.</span>
    <el-card>
      <div slot="header">
        Static IPv4 Routes
      </div>
      <div class="content-wrapper">
        <el-table
          ref="mTable"
          :border="true"
          :data="ipv4_routes"
          :stripe="false"
          style="width: 100%"
        >
          <el-table-column
            header-align="center"
            align="center"
            label="Interface"
          >
            <template slot-scope="{ row }">
              <template v-if="row.isEditing">
                <el-select
                  v-model="row.interface"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    value="lan"
                  />
                  <el-option
                    value="wan"
                  />
                  <el-option
                    value="wan6"
                  />
                  <el-option
                    value="wwan0"
                  />
                  <el-option
                    value="wwan1"
                  />
                </el-select>
              </template>
              <span v-else>{{ row.interface }}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="Target"
          >
            <template slot-scope="{ row }">
              <template v-if="row.isEditing">
                <el-input v-model="row.target" size="mini" />
              </template>
              <span v-else>{{ row.target }}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="IPv4-Netmask"
          >
            <template slot-scope="{ row }">
              <template v-if="row.isEditing">
                <el-input v-model="row.netmask" size="mini" />
              </template>
              <span v-else>{{ row.netmask }}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="IPv4-Gateway"
          >
            <template slot-scope="{ row }">
              <template v-if="row.isEditing">
                <el-input v-model="row.gateway" size="mini" />
              </template>
              <span v-else>{{ row.gateway }}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="Metric"
          >
            <template slot-scope="{ row }">
              <template v-if="row.isEditing">
                <el-input v-model="row.metric" size="mini" />
              </template>
              <span v-else>{{ row.metric }}</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            :resizable="false"
            header-align="center"
            label="Actions"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-button v-if="!scope.row.isEditing" type="info" @click="onEditIpv4Routes(scope.row)">Edit</el-button>
                <el-button v-if="!scope.row.isEditing" type="warning" @click="onDelIpv4Routes(scope.row)">Delete</el-button>

                <el-button v-if="scope.row.isEditing" type="info" @click="onSaveIpv4Routes(scope.row)">Save</el-button>
                <el-button v-if="scope.row.isEditing" type="warning" @click="onCancelIpv4Routes(scope.row, scope.$index)">Cancel</el-button>

              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button size="mini" @click="onAddIpv4Route"> ADD </el-button>
        </div>
      </div>
    </el-card>
    <br>
    <el-card>
      <div slot="header">
        Static IPv6 Routes
      </div>
      <div class="content-wrapper">
        <el-table
          :border="true"
          :data="ipv6_routes"
          :stripe="false"
          style="width: 100%"
        >
          <el-table-column
            header-align="center"
            align="center"
            label="Interface"
          >
            <template slot-scope="{ row }">
              <template v-if="row.isEditing">
                <el-select
                  v-model="row.interface"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    value="lan"
                  />
                  <el-option
                    value="wan"
                  />
                  <el-option
                    value="wan6"
                  />
                  <el-option
                    value="wwan0"
                  />
                  <el-option
                    value="wwan1"
                  />
                </el-select>
              </template>
              <span v-else>{{ row.interface }}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="Target"
          >
            <template slot-scope="{ row }">
              <template v-if="row.isEditing">
                <el-input v-model="row.target" size="mini" />
              </template>
              <span v-else>{{ row.target }}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="IPv6-Gateway"
          >
            <template slot-scope="{ row }">
              <template v-if="row.isEditing">
                <el-input v-model="row.gateway" size="mini" />
              </template>
              <span v-else>{{ row.gateway }}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="Metric"
          >
            <template slot-scope="{ row }">
              <template v-if="row.isEditing">
                <el-input v-model="row.metric" size="mini" />
              </template>
              <span v-else>{{ row.metric }}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="MTU"
          >
            <template slot-scope="{ row }">
              <template v-if="row.isEditing">
                <el-input v-model="row.mtu" size="mini" />
              </template>
              <span v-else>{{ row.mtu }}</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            :resizable="false"
            header-align="center"
            label="Actions"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-button v-if="!scope.row.isEditing" type="info" @click="onEditIpv6Routes(scope.row)">Edit</el-button>
                <el-button v-if="!scope.row.isEditing" type="warning" @click="onDelIpv6Routes(scope.row)">Delete</el-button>

                <el-button v-if="scope.row.isEditing" type="info" @click="onSaveIpv6Routes(scope.row)">Save</el-button>
                <el-button v-if="scope.row.isEditing" type="warning" @click="onCancelIpv6Routes(scope.row, scope.$index)">Cancel</el-button>

              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button size="mini" @click="onAddIpv6Route"> ADD </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import lodash from 'lodash'
export default {
  name: 'StaticRoutesIndex',
  data() {
    return {
      ipv4_routes: [
        { isEditing: false, interface: 'wan', target: '192.168.1.32', netmask: '255.255.255.0', gateway: '192.168.1.1', metric: '0' },
        { isEditing: false, interface: 'wan', target: '192.168.1.32', netmask: '255.255.255.0', gateway: '192.168.1.1', metric: '0' }
      ],
      ipv4CurrentEditCopy: null,
      ipv6_routes: [
        { isEditing: false, interface: 'lan', target: '192.168.1.3', gateway: '192.168.1.1', metric: '0', mtu: '144' },
        { isEditing: false, interface: 'lan', target: '192.168.1.3', gateway: '192.168.1.1', metric: '0', mtu: '144' }
      ],
      ipv6CurrentEditCopy: null
    }
  },
  methods: {
    // v4
    onAddIpv4Route() {
      this.ipv4_routes.splice(0, 0, { isEditing: false, interface: '', target: '', netmask: '255.255.255.0', gateway: '192.168.1.1', metric: '0' })
    },
    onEditIpv4Routes(row) {
      this.ipv4CurrentEditCopy = lodash.cloneDeep(row)
      row.isEditing = true
    },
    onDelIpv4Routes(row) {

    },
    onSaveIpv4Routes(row) {
      row.isEditing = false
    },
    onCancelIpv4Routes(row, index) {
      row.isEditing = false
      this.ipv4_routes.splice(index, 1, this.ipv4CurrentEditCopy)
    },

    // v6
    onAddIpv6Route() {
      this.ipv6_routes.splice(0, 0, { isEditing: false, interface: '', target: '', gateway: '', metric: '0', mtu: '144' })
    },
    onEditIpv6Routes(row) {
      this.ipv6CurrentEditCopy = lodash.cloneDeep(row)
      row.isEditing = true
    },
    onDelIpv6Routes(row) {

    },
    onSaveIpv6Routes(row) {
      row.isEditing = false
    },
    onCancelIpv6Routes(row, index) {
      row.isEditing = false
      this.ipv6_routes.splice(index, 1, this.ipv6CurrentEditCopy)
    }
  }
}
</script>

<style scoped>

</style>
