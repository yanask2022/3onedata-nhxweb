<template>
  <div class="root">
    <span class="title">VAP Edit</span>
    <el-card>
      <div slot="header">
        <span>{{ frequencyName }} / VAP {{ ap.ifname }}: {{ ap.ssid }}</span>
      </div>
      <div class="card-panel-editable-content-wrapper">
        <el-form ref="postForm" :model="ap" :rules="rules" class="form-container">

          <!--          <div class="field-row" :class="{'highlight' : hash === 'priority'}">-->
          <!--            <div class="field-key">-->
          <!--              <span class="field-key-text">Priority</span>-->
          <!--            </div>-->
          <!--            <div class="field-value">-->
          <!--              <div class="field-value-column">-->
          <!--                <div class="field-value-column-input">-->
          <!--                  <el-input v-model="ap.priority" sizi="small" />-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->

          <!-- ifname -->
          <div class="field-row" :class="{'highlight' : hash === 'ifname'}">
            <div class="field-key">
              <span class="field-key-text">ifname</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <span>{{ ap.ifname }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- device -->
          <div class="field-row" :class="{'highlight' : hash === 'device'}">
            <div class="field-key">
              <span class="field-key-text">device</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <span>{{ ap.device }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- enable-->
          <div class="field-row" :class="{'highlight' : hash === 'disabled'}">
            <div class="field-key">
              <span class="field-key-text">Enable</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="ap.disabled"
                    true-label="0"
                    false-label="1"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- SSID -->
          <div class="field-row" :class="{'highlight' : hash === 'ssid'}">
            <div class="field-key">
              <span class="field-key-text">SSID</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.ssid" sizi="small" @input="onSSIDInput" />
                  <el-checkbox
                    v-model="lockSSIDWithBSSID"
                    style="margin-right: -120px;margin-left: 20px"
                    label="Lock bssid"
                    @change="onLockChange"
                  />
                  <!--                  <el-select-->
                  <!--                    :value="ap.ssid"-->
                  <!--                    style="width: 100%"-->
                  <!--                    value-key="ssid"-->
                  <!--                    size="small"-->
                  <!--                    filterable-->
                  <!--                    allow-create-->
                  <!--                    default-first-option-->
                  <!--                    @change="onSSIDChange"-->
                  <!--                  >-->
                  <!--                    <el-option-->
                  <!--                      v-for="item in scanAPList"-->
                  <!--                      :key="item.bssid"-->
                  <!--                      :label="item.ssid"-->
                  <!--                      :value="item"-->
                  <!--                    />-->
                  <!--                  </el-select>-->
                </div>
              </div>
            </div>
          </div>

          <!-- bSSID -->
          <div class="field-row" :class="{'highlight' : hash === 'bssid'}">
            <div class="field-key">
              <span class="field-key-text">bssid</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.bssid" disabled sizi="small" />
                  <!--                  <el-select-->
                  <!--                    :value="ap.bssid"-->
                  <!--                    style="width: 100%"-->
                  <!--                    value-key="ssid"-->
                  <!--                    size="small"-->
                  <!--                    filterable-->
                  <!--                    allow-create-->
                  <!--                    default-first-option-->
                  <!--                    @change="onBSSIDChange"-->
                  <!--                  >-->
                  <!--                    <el-option-->
                  <!--                      v-for="item in scanAPList"-->
                  <!--                      :key="item.bssid"-->
                  <!--                      :label="item.bssid"-->
                  <!--                      :value="item"-->
                  <!--                    />-->
                  <!--                  </el-select>-->

                </div>

              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'wpa_version'}">
            <div class="field-key">
              <span class="field-key-text">wpa version</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="ap.wpa_version"
                    style="width: 100%"
                    size="small"
                    @change="wapVersionChange"
                  >
                    <el-option v-for="(wvOpt, wvIndex) in wapVersionOptions" :key="wvIndex" :value="wvOpt" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Mode -->
          <div class="field-row" :class="{'highlight' : hash === 'encryption'}">
            <div class="field-key">
              <span class="field-key-text">encryption</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="ap.encryption"
                    style="width: 100%"
                    allow-create
                    filterable
                    size="small"
                  >
                    <el-option v-for="(op, opIndex) in encryptionOptions" :key="opIndex" :value="op" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.encryption === 'sae' || ap.encryption === 'sae-mixed'" class="field-row" :class="{'highlight' : hash === 'sae'}">
            <div class="field-key">
              <span class="field-key-text">sae</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="ap.sae"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise'" class="field-row" :class="{'highlight' : hash === 'eap_type'}">
            <div class="field-key">
              <span class="field-key-text">eap_type</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="ap.eap_type"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option value="tls" />
                    <el-option value="peap" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <!-- key -->
          <div v-if="!((ap.wpa_version === 'personal' && ap.encryption === 'none') || (ap.wpa_version === 'enterprise'))" class="field-row" :class="{'highlight' : hash === 'key'}">
            <div class="field-key">
              <span class="field-key-text">key</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.key" sizi="small" />
                </div>
              </div>
            </div>
          </div>
          <template v-if="ap.wpa_version === 'enterprise'">
            <div v-if="!ap.eap_type == ''" class="field-row" :class="{'highlight' : hash === 'auth'}">
              <div class="field-key">
                <span class="field-key-text">auth</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-select
                      v-model="ap.auth"
                      style="width: 100%"
                      size="small"
                      @change="$forceUpdate()"
                    >
                      <el-option v-for="(authOpt, optIndex) in authOptions" :key="optIndex" :value="authOpt" />
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div v-if="ap.wpa_version === 'enterprise' && ap.eap_type === 'tls'" class="field-row" :class="{'highlight' : hash === 'priv_key'}">
            <div class="field-key">
              <span class="field-key-text">priv_key</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input :value="ap.priv_key" sizi="small" disabled />
                  <el-upload
                    v-if="frequencyName.endsWith('2.4G')"
                    style="margin-right: -120px;margin-left: 20px"
                    :show-file-list="false"
                    class="upload-demo"
                    :action="host + '/nhxcgipriv2'"
                    name="filedata"
                    :multiple="false"
                    :limit="1"
                    :data="uploadData"
                    :on-success="onPrivKeyUploadSuccess"
                    :on-error="onPrivFileUploadFail"
                    :on-change="onPrivKeyChange"
                  >
                    <el-button style="color:#FFFFFF" type="primary">Upload</el-button>
                  </el-upload>

                  <!-- 5G -->
                  <el-upload
                    v-if="frequencyName.endsWith('5G') || frequencyName.endsWith('6G')"
                    style="margin-right: -120px;margin-left: 20px"
                    :show-file-list="false"
                    class="upload-demo"
                    :action="host + 'nhxcgipriv'"
                    name="filedata"
                    :multiple="false"
                    :limit="1"
                    :data="uploadData"
                    :on-success="onPrivKeyUploadSuccess"
                    :on-error="onPrivFileUploadFail"
                    :on-change="onPrivKeyChange"
                  >
                    <el-button style="color:#FFFFFF" type="primary">Upload</el-button>
                  </el-upload>
                </div>
              </div>
            </div>
          </div>

          <div v-if="ap.wpa_version === 'enterprise' && ap.eap_type === 'tls'" class="field-row" :class="{'highlight' : hash === 'priv_key_pwd'}">
            <div class="field-key">
              <span class="field-key-text">priv_key_pwd</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.priv_key_pwd" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <!-- identity-->
          <template v-if="ap.wpa_version === 'enterprise'">
            <div v-if="!ap.eap_type == ''" class="field-row" :class="{'highlight' : hash === 'identity'}">
              <div class="field-key">
                <span class="field-key-text">identity</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="ap.identity" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-if="ap.wpa_version === 'enterprise'">
            <div v-if="!ap.eap_type == ''" class="field-row" :class="{'highlight' : hash === 'password'}">
              <div class="field-key">
                <span class="field-key-text">password</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="ap.password" sizi="small" />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-if="ap.wpa_version === 'enterprise'">
            <div v-if="!ap.eap_type == ''" class="field-row" :class="{'highlight' : hash === 'ca_cert'}">
              <div class="field-key">
                <span class="field-key-text">ca_cert</span>
              </div>
              <div class="field-value">
                <div class="field-value-column">
                  <div class="field-value-column-input">
                    <el-input v-model="ap.ca_cert" sizi="small" disabled="" />
                    <el-upload
                      v-if="frequencyName.endsWith('2.4G')"
                      style="margin-right: -120px;margin-left: 20px"
                      :show-file-list="false"
                      class="upload-demo"
                      :action="host + '/nhxcgica2'"
                      name="filedata"
                      :multiple="false"
                      :limit="1"
                      :data="uploadData"
                      :on-success="onCertFileUploadSuccess"
                      :on-error="onCertFileUploadFail"
                      :on-change="onCertFileChange"
                    >
                      <el-button style="color:#FFFFFF" type="primary">Upload</el-button>
                    </el-upload>

                    <el-upload
                      v-if="frequencyName.endsWith('5G') || frequencyName.endsWith('6G')"
                      style="margin-right: -120px;margin-left: 20px"
                      :show-file-list="false"
                      class="upload-demo"
                      :action="host + '/nhxcgica'"
                      name="filedata"
                      :multiple="false"
                      :limit="1"
                      :data="uploadData"
                      :on-success="onCertFileUploadSuccess"
                      :on-error="onCertFileUploadFail"
                      :on-change="onCertFileChange"
                    >
                      <el-button style="color:#FFFFFF" type="primary">Upload</el-button>
                    </el-upload>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div v-if="ap.wpa_version === 'enterprise' && ap.eap_type === 'tls'" class="field-row" :class="{'highlight' : hash === 'client_cert'}">
            <div class="field-key">
              <span class="field-key-text">client_cert</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.client_cert" sizi="small" disabled />
                  <el-upload
                    v-if="frequencyName.endsWith('2.4G')"
                    style="margin-right: -120px;margin-left: 20px"
                    :show-file-list="false"
                    class="upload-demo"
                    :action="host + '/nhxcgiclient2'"
                    name="filedata"
                    :multiple="false"
                    :limit="1"
                    :data="uploadData"
                    :on-success="onClientCertFileUploadSuccess"
                    :on-error="onClientCertFileUploadFail"
                    :on-change="onClientCertFileChange"
                  >
                    <el-button style="color:#FFFFFF" type="primary">Upload</el-button>
                  </el-upload>

                  <el-upload
                    v-if="frequencyName.endsWith('5G') || frequencyName.endsWith('6G')"
                    style="margin-right: -120px;margin-left: 20px"
                    :show-file-list="false"
                    class="upload-demo"
                    :action="host + '/nhxcgiclient'"
                    name="filedata"
                    :multiple="false"
                    :limit="1"
                    :data="uploadData"
                    :on-success="onClientCertFileUploadSuccess"
                    :on-error="onClientCertFileUploadFail"
                    :on-change="onClientCertFileChange"
                  >
                    <el-button style="color:#FFFFFF" type="primary">Upload</el-button>
                  </el-upload>
                </div>
              </div>
            </div>
          </div>

          <!-- r_r -->
          <div class="field-row" :class="{'highlight' : hash === 'bssid'}">
            <div class="field-key">
              <span class="field-key-text">r_r</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.r_r" type="number" sizi="small" />
                </div>
              </div>
            </div>
          </div>

          <!-- s_s1 -->
          <div class="field-row" :class="{'highlight' : hash === 'bssid'}">
            <div class="field-key">
              <span class="field-key-text">s_s1</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.s_s1" type="number" :min="1" :max="30" sizi="small" @change="limitOne2Thirty('s_s1', $event)" />
                </div>
              </div>
            </div>
          </div>

          <!-- s_s2 -->
          <div class="field-row" :class="{'highlight' : hash === 'bssid'}">
            <div class="field-key">
              <span class="field-key-text">s_s2</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.s_s2" type="number" :min="1" :max="30" sizi="small" @change="limitOne2Thirty('s_s2', $event)" />
                </div>
              </div>
            </div>
          </div>

          <!-- s_s3 -->
          <div class="field-row" :class="{'highlight' : hash === 'bssid'}">
            <div class="field-key">
              <span class="field-key-text">s_s3</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.s_s3" type="number" :min="1" :max="30" sizi="small" @change="limitOne2Thirty('s_s3', $event)" />
                </div>
              </div>
            </div>
          </div>

          <!-- r_s0 -->
          <div class="field-row" :class="{'highlight' : hash === 'bssid'}">
            <div class="field-key">
              <span class="field-key-text">r_s0</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.r_s0" type="number" :min="1" :max="30" sizi="small" @change="limitOne2Thirty('r_s0', $event)" />
                </div>
              </div>
            </div>
          </div>

          <!-- r_s1 -->
          <div class="field-row" :class="{'highlight' : hash === 'bssid'}">
            <div class="field-key">
              <span class="field-key-text">r_s1</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.r_s1" type="number" :min="1" :max="30" sizi="small" @change="limitOne2Thirty('r_s1', $event)" />
                </div>
              </div>
            </div>
          </div>

          <!-- s_r_d -->
          <div class="field-row" :class="{'highlight' : hash === 'bssid'}">
            <div class="field-key">
              <span class="field-key-text">s_r_d</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.s_r_d" type="number" :min="1" :max="30" sizi="small" @change="limitOne2Thirty('s_r_d', $event)" />
                </div>
              </div>
            </div>
          </div>

          <!-- s_f_r -->
          <div class="field-row" :class="{'highlight' : hash === 'bssid'}">
            <div class="field-key">
              <span class="field-key-text">s_f_r</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.s_f_r" type="number" />
                </div>
              </div>
            </div>
          </div>

          <!-- nhxroam_age -->
          <div class="field-row" :class="{'highlight' : hash === 'bssid'}">
            <div class="field-key">
              <span class="field-key-text">nhxroam_age</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.nhxroam_age" type="number" />
                </div>
              </div>
            </div>
          </div>

          <div class="field-row" :class="{'highlight' : hash === 'roam_freq'}" style="align-items: center">
            <div class="field-key">
              <span class="field-key-text">roam_freq</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input" style="height: auto;">

                  <el-select
                    ref="roamFreqRef"
                    v-model="temp_roam_freq_input"
                    v-create-input-limit
                    multiple
                    allow-create
                    filterable
                    :multiple-limit="6"
                    style="width: 100%"
                    size="small"
                    @change="onRoamFreqChange"
                  >
                    <el-option
                      v-for="(roamOption, roamIndex) in roamFreqOptions"
                      :key="roamIndex"
                      :value="roamOption.value"
                      :label="roamOption.label + ': '+roamOption.value"
                    />
                    <!--<el-option value="wwan0" label="wwan0" />-->
                    <!--<el-option value="wwan1" label="wwan1" />-->
                  </el-select>

                  <!--<div-->
                  <!--  v-for="(roam, roamIndex) in ap_roam_freq_input"-->
                  <!--  :key="roamIndex"-->
                  <!--  style="margin-top: 5px; width: 100%;display: flex; align-items: center"-->
                  <!--&gt;-->
                  <!--  <el-input-->
                  <!--    v-model="roam.value"-->
                  <!--    min="2000"-->
                  <!--    max="8000"-->
                  <!--    placeholder="Enter at least one entry"-->
                  <!--    type="number"-->
                  <!--    @change="onAPRoamFreqChange($event,0)"-->
                  <!--  />-->
                  <!--  <i-->
                  <!--    v-if="roamIndex !== 0"-->
                  <!--    style="margin-left: 20px;font-size: 18px"-->
                  <!--    class="el-icon-remove"-->
                  <!--    :style="{'margin-right':roamIndex === ap_roam_freq_input.length -1 ? '': '-120px'}"-->
                  <!--    @click="onRemoveRoamFreq(roamIndex)"-->
                  <!--  />-->
                  <!--  <i-->
                  <!--    v-if="roamIndex === ap_roam_freq_input.length -1"-->
                  <!--    style="margin-right: -120px;margin-left: 20px;font-size: 18px"-->
                  <!--    class="el-icon-circle-plus"-->
                  <!--    @click="onAddRoamFreq(roamIndex)"-->
                  <!--  />-->
                  <!--</div>-->

                </div>
              </div>
            </div>
          </div>

          <!-- set_max_rate -->
          <div class="field-row" :class="{'highlight' : hash === 'set_max_rate'}">
            <div class="field-key">
              <span class="field-key-text">set_max_rate</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-input v-model="ap.set_max_rate" />
                </div>
              </div>
            </div>
          </div>

          <!--11K-->
          <div class="field-row" :class="{'highlight' : hash === 'rrm'}">
            <div class="field-key">
              <span class="field-key-text">11K</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <!-- <el-select
                    v-model="ap.wnm"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option value="1" label="Enable" />
                    <el-option value="0" label="Disabled" />
                  </el-select> -->
                  <el-checkbox
                    v-model="ap.rrm"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <!--11V-->
          <div class="field-row" :class="{'highlight' : hash === 'wnm'}">
            <div class="field-key">
              <span class="field-key-text">11V</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <!-- <el-select
                    v-model="ap.rrm"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option value="1" label="Enable" />
                    <el-option value="0" label="Disabled" />
                  </el-select> -->
                  <el-checkbox
                    v-model="ap.wnm"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- 11r -->
          <div class="field-row" :class="{'highlight' : hash === 'ieee80211r'}">
            <div class="field-key">
              <span class="field-key-text">11R</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <!-- <el-select
                    v-model="ap.rrm"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option value="1" label="Enable" />
                    <el-option value="0" label="Disabled" />
                  </el-select> -->
                  <el-checkbox
                    v-model="ap.ieee80211r"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- wds -->
          <div class="field-row" :class="{'highlight' : hash === 'wds'}">
            <div class="field-key">
              <span class="field-key-text">WDS</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="ap.wds"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- staDFSEn -->
          <div class="field-row" :class="{'highlight' : hash === 'staDFSEn'}">
            <div class="field-key">
              <span class="field-key-text">staDFSEn</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-checkbox
                    v-model="ap.staDFSEn"
                    true-label="1"
                    false-label="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Mac Of remote AP-->
          <!--          <div class="field-row" :class="{'highlight' : hash === 'mac_of_remote_ap'}">-->
          <!--            <div class="field-key">-->
          <!--              <span class="field-key-text">MAC of remote AP</span>-->
          <!--            </div>-->
          <!--            <div class="field-value">-->
          <!--              <div class="field-value-column">-->
          <!--                <div class="field-value-column-input">-->
          <!--                  <el-select-->
          <!--                    v-model="ap.mac_of_remote_ap"-->
          <!--                    allow-create-->
          <!--                    default-first-option-->
          <!--                    filterable-->
          <!--                    style="width: 100%"-->
          <!--                    size="small"-->
          <!--                  >-->
          <!--                    <el-option-->
          <!--                      v-for="(remoteAP, remoteAPIndex) in scanAPList"-->
          <!--                      :key="remoteAPIndex"-->
          <!--                      :value="remoteAP.bssid"-->
          <!--                      :label="remoteAP.bssid"-->
          <!--                    />-->
          <!--                  </el-select>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->

          <!-- NetWork -->
          <div class="field-row" :class="{'highlight' : hash === 'network'}">
            <div class="field-key">
              <span class="field-key-text">Network</span>
            </div>
            <div class="field-value">
              <div class="field-value-column">
                <div class="field-value-column-input">
                  <el-select
                    v-model="ap.network"
                    style="width: 100%"
                    allow-create
                    filterable
                    size="small"
                  >
                    <el-option
                      v-for="(networkOption, index) in networkOptions"
                      :key="index"
                      :value="networkOption"
                      :lable="networkOption"
                    />
                    <!--<el-option value="wwan0" label="wwan0" />-->
                    <!--<el-option value="wwan1" label="wwan1" />-->
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </el-card>
    <br>
    <br>
    <el-card>
      <div slot="header">
        <div class="header-wrapper">
          <span>AP List</span>
          <el-button icon="el-icon-refresh" class="reset-btn" size="small" @click="onScan">
            Scan
          </el-button>
        </div>
      </div>
      <div class="card-panel-editable-content-wrapper" style="width: 100%">
        <!--        <NXH-Table :table-data="scanAPList" :columns="scanAPColumns"></NXH-Table>-->
        <NXHSingleTable :default-sort="{prop: 'signal', order: 'descending'}" :radio="true" :table-data="scanAPList" :columns="scanAPColumns" @on-radio="onRadio" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { scan } from '@/api/wifi'
import * as _ from 'lodash'
import NXHSingleTable from '@/components/NXHSingleTable'
import { syncAllChangesToStore } from '@/utils/diff'
import { mapGetters } from 'vuex'
import { getInterfaces } from '@/api/interface'
import { getToken } from '@/utils/auth'

const uploadHost = process.env.NODE_ENV === 'development'
  ? '/cgi'
  : '//' + window.location.hostname + '/cgi-bin'

export default {
  name: 'STAAPEdit',
  components: {
    NXHSingleTable
  },
  data() {
    return {
      wanName: '',
      wapVersionOptions: [
        'personal',
        'enterprise'
      ],
      host: uploadHost,
      lockSSIDWithBSSID: false,
      selectedAP: null,
      paramsKey: '',
      index: '',
      frequencyName: '',
      scanAPList: [],
      scanAPColumns: [
        { label: 'SSID', prop: 'ssid' },
        { label: 'BSSID', prop: 'bssid' },
        { label: 'Signal', prop: 'signal', sortable: true },
        { label: 'Channel', prop: 'channel', sortable: true },
        { label: 'Quality', prop: 'quality', sortable: true },
        { label: 'Encryption', prop: 'description' }
      ],
      rules: {},
      ap: {
        sae: '',
        set_max_rate: '',
        staDFSEn: '',
        ieee80211r: '',
        client_cert: '',
        ca_cert: '',
        identity: '',
        priv_key: '',
        priv_key_pwd: '',
        wpa_version: 'none',
        bssid: '',
        device: '',
        disabled: '',
        encryption: '',
        ifname: '',
        key: '',
        network: '',
        rrm: 0,
        ssid: '',
        wds: '',
        wnm: 0,

        ownip: '',
        auth_server: '',
        auth_port: '',
        auth_secret: '',
        rsn_preauth: '',
        rsn_preauth_interfaces: '',
        acct_server: '',
        acct_port: '',
        acct_secret: '',
        auth: '',
        dae_secret: '',
        dae_port: '',
        dae_client: '',
        r_r: '',
        s_s1: '',
        s_s2: '',
        s_s3: '',
        r_s0: '',
        r_s1: '',
        s_r_d: '',
        s_f_r: '',
        nhxroam_age: '',
        eap_type: '',
        roam_freq: ''
      },
      hash: '',
      apCopy: null,
      // 用于wifi/scan 接口的参数。
      scanParams: null,
      ap_roam_freq_input: [],
      temp_roam_freq_input: [],
      globalDiscardEventCallback: null
    }
  },
  computed: {
    ...mapGetters(['wifi', 'originalWifi']),
    roamFreqOptions() {
      if (this.frequencyName.endsWith('2.4G')) {
        return [
          { value: 2412, label: 'Channel 01' },
          { value: 2417, label: 'Channel 02' },
          { value: 2422, label: 'Channel 03' },
          { value: 2427, label: 'Channel 04' },
          { value: 2432, label: 'Channel 05' },
          { value: 2437, label: 'Channel 06' },
          { value: 2442, label: 'Channel 07' },
          { value: 2447, label: 'Channel 08' },
          { value: 2452, label: 'Channel 09' },
          { value: 2457, label: 'Channel 10' },
          { value: 2462, label: 'Channel 11' },
          { value: 2467, label: 'Channel 12' },
          { value: 2472, label: 'Channel 13' }
        ]
      } else if (this.frequencyName.endsWith('5G')) {
        return [
          { label: 'Channel 36 ', value: 5180 },
          { label: 'Channel 40 ', value: 5200 },
          { label: 'Channel 44 ', value: 5220 },
          { label: 'Channel 48 ', value: 5240 },
          { label: 'Channel 52 ', value: 5260 },
          { label: 'Channel 56 ', value: 5280 },
          { label: 'Channel 60 ', value: 5300 },
          { label: 'Channel 64 ', value: 5320 },
          { label: 'Channel 100', value: 5500 },
          { label: 'Channel 104', value: 5520 },
          { label: 'Channel 108', value: 5540 },
          { label: 'Channel 112', value: 5560 },
          { label: 'Channel 116', value: 5580 },
          { label: 'Channel 120', value: 5600 },
          { label: 'Channel 124', value: 5620 },
          { label: 'Channel 128', value: 5640 },
          { label: 'Channel 132', value: 5660 },
          { label: 'Channel 136', value: 5680 },
          { label: 'Channel 140', value: 5700 },
          { label: 'Channel 144', value: 5720 },
          { label: 'Channel 149', value: 5745 },
          { label: 'Channel 153', value: 5765 },
          { label: 'Channel 157', value: 5785 },
          { label: 'Channel 161', value: 5805 },
          { label: 'Channel 165', value: 5825 }
        ]
      } else if (this.frequencyName.endsWith('6G')) {
        return [
          {
            label: 'Channel 1',
            value: 5955
          },
          {
            label: 'Channel 5',
            value: 5975
          },
          {
            label: 'Channel 9',
            value: 5995
          },
          {
            label: 'Channel 13',
            value: 6015
          },
          {
            label: 'Channel 17',
            value: 6035
          },
          {
            label: 'Channel 21',
            value: 6055
          },
          {
            label: 'Channel 25',
            value: 6075
          },
          {
            label: 'Channel 29',
            value: 6095
          },
          {
            label: 'Channel 33',
            value: 6115
          },
          {
            label: 'Channel 37',
            value: 6135
          },
          {
            label: 'Channel 41',
            value: 6155
          },
          {
            label: 'Channel 45',
            value: 6175
          },
          {
            label: 'Channel 49',
            value: 6195
          },
          {
            label: 'Channel 53',
            value: 6215
          },
          {
            label: 'Channel 57',
            value: 6235
          },
          {
            label: 'Channel 61',
            value: 6255
          },
          {
            label: 'Channel 65',
            value: 6275
          },
          {
            label: 'Channel 69',
            value: 6295
          },
          {
            label: 'Channel 73',
            value: 6315
          },
          {
            label: 'Channel 77',
            value: 6335
          },
          {
            label: 'Channel 81',
            value: 6355
          },
          {
            label: 'Channel 85',
            value: 6375
          },
          {
            label: 'Channel 89',
            value: 6395
          },
          {
            label: 'Channel 93',
            value: 6415
          },
          {
            label: 'Channel 97',
            value: 6435
          },
          {
            label: 'Channel 101',
            value: 6455
          },
          {
            label: 'Channel 105',
            value: 6475
          },
          {
            label: 'Channel 109',
            value: 6495
          },
          {
            label: 'Channel 113',
            value: 6515
          },
          {
            label: 'Channel 117',
            value: 6535
          },
          {
            label: 'Channel 121',
            value: 6555
          },
          {
            label: 'Channel 125',
            value: 6575
          },
          {
            label: 'Channel 129',
            value: 6595
          },
          {
            label: 'Channel 133',
            value: 6615
          },
          {
            label: 'Channel 137',
            value: 6635
          },
          {
            label: 'Channel 141',
            value: 6655
          },
          {
            label: 'Channel 145',
            value: 6675
          },
          {
            label: 'Channel 149',
            value: 6695
          },
          {
            label: 'Channel 153',
            value: 6715
          },
          {
            label: 'Channel 157',
            value: 6735
          },
          {
            label: 'Channel 161',
            value: 6755
          },
          {
            label: 'Channel 165',
            value: 6775
          },
          {
            label: 'Channel 169',
            value: 6795
          },
          {
            label: 'Channel 173',
            value: 6815
          },
          {
            label: 'Channel 177',
            value: 6835
          },
          {
            label: 'Channel 181',
            value: 6855
          },
          {
            label: 'Channel 185',
            value: 6875
          },
          {
            label: 'Channel 189',
            value: 6895
          },
          {
            label: 'Channel 193',
            value: 6915
          },
          {
            label: 'Channel 197',
            value: 6935
          },
          {
            label: 'Channel 201',
            value: 6955
          },
          {
            label: 'Channel 205',
            value: 6975
          },
          {
            label: 'Channel 209',
            value: 6995
          },
          {
            label: 'Channel 213',
            value: 7015
          },
          {
            label: 'Channel 217',
            value: 7035
          },
          {
            label: 'Channel 221',
            value: 7055
          },
          {
            label: 'Channel 225',
            value: 7075
          },
          {
            label: 'Channel 229',
            value: 7095
          },
          {
            label: 'Channel 233',
            value: 7115
          }
        ]
      }
    },
    networkOptions() {
      return ['lan', this.wanName]
    },

    encryptionOptions() {
      if (this.ap.wpa_version === 'personal') {
        return [
          'none',
          'mixed-psk',
          'psk2+tkip+ccmp',
          'psk2+ccmp',
          'psk2+tkip+aes',
          'psk2+aes',
          'sae',
          'sae-mixed'
        ]
      } else if (this.ap.wpa_version === 'enterprise') {
        return [
          '8021x',
          '8021x-ccmp',
          '8021x-tkip',
          '8021x-wpa3'
        ]
      } else {
        return []
      }
    },

    authOptions() {
      if (this.ap.wpa_version === 'enterprise') {
        if (this.ap.eap_type === 'tls') {
          return ['EAP-MSCHAPV2']
        } else if (this.ap.eap_type === 'peap') {
          return ['MSCHAPV2']
        } else {
          return []
        }
      } else {
        return []
      }
    },
    uploadData() {
      return {
        sessionid: getToken()
      }
    }
  },
  watch: {
    ap: {
      handler(newValue, oldValue) {
        // 每次改动时， 将当前改动保存到sta数组中
        this.extra[this.index] = this.ap
        this.$store.commit('configs/SET_WIFI_CONFIG', [this.paramsKey, this.extra])

        // 查找差异
        const referKey = this.$route.path + '&paramsKey=' + this.paramsKey + '&index=' +
          this.index +
        '&frequencyName=' +
        this.frequencyName + '#'

        const hasChanges = syncAllChangesToStore.apply(this, [
          // 新值
          { ...newValue, paramsKey: this.paramsKey },
          // 原始值
          { ...this.originalWifi[this.paramsKey][this.index], paramsKey: this.paramsKey },
          // 保存到store中的key， 颗粒度指到当前改动字段
          referKey,
          (updateKey, updateValue) => {
            return {
              path: referKey + updateKey,
              data: {
                api: 'wifi-set-spec',
                // extra: _.cloneDeep(this.extra),
                // 当前改动
                snapshot: { ...newValue, index: this.index, frequencyName: this.frequencyName, paramsKey: this.paramsKey },
                // 用于 router-link to:name 方式跳转回来
                name: this.$route.name,
                // 当前改动键
                updatedKey: updateKey,
                // 当前改动值
                updateValue: updateValue,
                routers: [
                  {
                    // 显示在改动列表的路由tag
                    title: this.$route.path,
                    // 用于触发 $route 的 watch
                    query: '',
                    // 用于从改动列表跳转回来时标识当前改动
                    params: { scanParams: this.scanParams, updatedKey: updateKey, frequencyName: this.frequencyName, paramsKey: this.paramsKey, index: this.index, STAAPTabName: this.STAAPTabName }
                  },
                  {
                    title: this.frequencyName + '/' + this.paramsKey + '-' + this.index + ':' + updateKey,
                    query: { paramsKey: this.paramsKey + '#' + updateKey + '=' + updateValue },
                    params: { scanParams: this.scanParams, updatedKey: updateKey, frequencyName: this.frequencyName, paramsKey: this.paramsKey, index: this.index, STAAPTabName: this.STAAPTabName }
                  }
                ]
              }
            }
          }
        ])
        if (!hasChanges) {
          this.hash = ''
        }
      },
      deep: true
    },
    'ap.eap_type': {
      handler(value) {
        if (value === 'tls') {
          this.ap.auth = 'EAP-MSCHAPV2'
        }
        if (value === 'peap') {
          this.ap.auth = 'MSCHAPV2'
        }
      }
    },
    'ap.wpa_version': {
      handler(value) {
        if (value === 'personal') {
          // this.ap.encryption = ''
          this.ap.auth = ''
        }
        if (value === 'enterprise') {
          this.ap.encryption = '8021x'
          if (this.ap.eap_type === 'tls') {
            this.ap.auth = 'EAP-MSCHAPV2'
          } else if (this.ap.eap_type === 'peap') {
            this.ap.auth = 'MSCHAPV2'
          }
        }
      }
    },
    $route: {
      // 监听路由对象(path变化时才能监听到， params 变化监听不到)
      handler(to, from) {
        if (to.fullPath !== from.fullPath) {
          this.getData()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.STAAPTabName = this.$route.params.STAAPTabName
    sessionStorage.setItem('STAAPTabName', this.STAAPTabName)
    this.$store.dispatch('configs/getWifi').then(() => {
      this.getData()
    })
    this.globalDiscardEventCallback = ({ path }) => {
      this.$store.dispatch('configs/getWifi').then(() => {
        this.getData()
      })
    }
    this.$EventBus.$on('GlobalDiscard', this.globalDiscardEventCallback)
  },
  beforeDestroy() {
    this.$EventBus.$off('GlobalDiscard', this.globalDiscardEventCallback)
  },

  methods: {
    onRoamFreqChange(selected) {
      this.ap.roam_freq = ''
      this.temp_roam_freq_input = selected.map(item => {
        let itemInt = parseInt(item)
        if (itemInt < 2000) {
          itemInt = 2000
        } else if (itemInt > 8000) {
          itemInt = 8000
        }
        return itemInt
      })
      if (this.temp_roam_freq_input.length > 1) {
        this.temp_roam_freq_input = _.uniq(this.temp_roam_freq_input)
        this.temp_roam_freq_input = this.temp_roam_freq_input.sort((a, b) => parseInt(a) - parseInt(b))
        // 拼接
        this.temp_roam_freq_input.map(item => {
          this.ap.roam_freq += item + ','
        })
        // remove last comma
        if (!_.isEmpty(this.ap.roam_freq)) {
          this.ap.roam_freq = this.trimCommas(this.ap.roam_freq)
        }
      } else if (this.temp_roam_freq_input.length === 1) {
        this.ap.roam_freq = this.temp_roam_freq_input[0]
      }
    },
    limitOne2Thirty(key, currentValue) {
      if (currentValue) {
        if (currentValue > 30) {
          this.ap[key] = 30
        } else if (currentValue < 1) {
          this.ap[key] = 1
        }
      } else {
        this.ap[key] = 1
      }
    },
    trimCommas(str) {
      return str.replace(/^,+|,+$/g, '')
    },
    // onAddRoamFreq(index) {
    //   if (index === 5) {
    //     return
    //   }
    //   this.ap_roam_freq_input.push({ value: 2000 })
    //   this.setAPRoamFreq()
    // },
    // onRemoveRoamFreq(index) {
    //   if (index === 0) {
    //     return
    //   }
    //   this.ap_roam_freq_input.splice(index, 1)
    //   this.setAPRoamFreq()
    // },
    wapVersionChange(v) {
      if (v === 'personal') {
        this.ap.encryption = 'none'
      }
    },
    // setAPRoamFreq() {
    //   this.ap.roam_freq = ''
    //   if (this.ap_roam_freq_input.length > 1) {
    //     const uniqueArray = _.uniqBy(this.ap_roam_freq_input, 'value')
    //     const sorted = uniqueArray.sort((a, b) => parseInt(a.value) - parseInt(b.value))
    //     sorted.map(item => {
    //       if (!_.isEmpty(item)) {
    //         this.ap.roam_freq += item.value + ','
    //       }
    //     })
    //     // remove last comma
    //     if (!_.isEmpty(this.ap.roam_freq)) {
    //       this.ap.roam_freq = this.trimCommas(this.ap.roam_freq)
    //     }
    //   } else if (this.ap_roam_freq_input.length === 1) {
    //     this.ap.roam_freq = this.ap_roam_freq_input[0].value
    //   }
    // },
    // onAPRoamFreqChange(value, freqIndex) {
    //   if (parseInt(value) < 2000) {
    //     this.ap_roam_freq_input.splice(freqIndex, 1, { value: '2000' })
    //   } else if (parseInt(value) > 8000) {
    //     this.ap_roam_freq_input.splice(freqIndex, 1, { value: '8000' })
    //   }
    //   this.setAPRoamFreq()
    // },
    onPrivKeyUploadSuccess(response) {
      if (response.errcode !== 0) {
        this.$message.error('priv_key upload failed')
      } else {
        if (this.frequencyName.endsWith('2.4G')) {
          this.ap.priv_key = '/etc/8021x-priv2'
        }
        if (this.frequencyName.endsWith('5G') || this.frequencyName.endsWith('6G')) {
          this.ap.priv_key = '/etc/8021x-priv'
        }
        this.$message.success('priv_key upload success')
      }
    },

    onPrivFileUploadFail(err, file, fileList) {
      this.$message.error('upload failed：network error')
    },

    onPrivKeyChange(file, fileList) {
      if (file.status === 'ready') {
        this.ap.priv_key = file.name
      } else if (file.status === 'fail') {
        // TODO 可能不应该改
        // this.ap.priv_key = ''
      }
    },
    onCertFileUploadSuccess(response) {
      if (response.errcode !== 0) {
        this.$message.error('cert file upload failed')
      } else {
        if (this.frequencyName.endsWith('2.4G')) {
          this.ap.ca_cert = '/etc/8021x-ca-cert2'
        }
        if (this.frequencyName.endsWith('5G') || this.frequencyName.endsWith('6G')) {
          this.ap.ca_cert = '/etc/8021x-ca-cert'
        }
        this.$message.success('cert file upload success')
      }
    },

    onCertFileUploadFail(err, file, fileList) {
      this.$message.error('cert file upload failed：network error')
    },

    onCertFileChange(file, fileList) {
      if (file.status === 'ready') {
        this.ap.ca_cert = file.name
      } else if (file.status === 'fail') {
        // TODO 可能不应该改
        // this.ap.ca_cert = ''
      }
    },
    onClientCertFileUploadSuccess(response) {
      if (response.errcode !== 0) {
        this.$message.error('client cert file upload failed')
      } else {
        if (this.frequencyName.endsWith('2.4G')) {
          this.ap.client_cert = '/etc/8021x-client-cert2'
        }
        if (this.frequencyName.endsWith('5G') || this.frequencyName.endsWith('5G')) {
          this.ap.client_cert = '/etc/8021x-client-cert'
        }
        this.$message.success('client cert file upload success')
      }
    },

    onClientCertFileUploadFail(err, file, fileList) {
      this.$message.error('client cert file upload failed：network error')
    },

    onClientCertFileChange(file, fileList) {
      if (file.status === 'ready') {
        this.ap.client_cert = file.name
      } else if (file.status === 'fail') {
        // TODO 可能不应该改
        // this.ap.ca_cert = ''
      }
    },

    convertRoamFreq(ap) {
      if (ap && ap.length > 0) {
        this.temp_roam_freq_input = ap.split(',').map(roam => {
          return parseInt(roam.trim())
        })
      } else {
        this.temp_roam_freq_input = []
      }
    },
    getData() {
      this.scanParams = this.$route.params.scanParams
      this.paramsKey = this.$route.params.paramsKey
      this.index = this.$route.params.index
      this.frequencyName = this.$route.params.frequencyName
      this.hash = this.$route.params.updatedKey ? this.$route.params.updatedKey : ''
      this.ap = _.cloneDeep(this.wifi[this.paramsKey][this.index])
      // 将5500, 8888 格式ap_roam_freq 转换成数组形式
      this.convertRoamFreq(this.ap.roam_freq)
      getInterfaces({}).then(res => {
        const interfaceConfig = Object.entries(res['interfaces']).find((element) => {
          if (element[0].startsWith('wwan')) {
            return element[1]?.status?.ifname === this.ap.ifname
          }
          return false
        })
        this.wanName = interfaceConfig ? interfaceConfig[0] : ''
      }).catch(() => {

      })
      //
      // this.ap.w = 'MSCHAPV2'
      // this.ap.acct_port = '1813'
      // this.ap.auth_port = '1812'
      // if (this.personalOptions.some((item) => {
      //   return item === this.ap.encryption
      // })) {
      //   this.encryptionOptions = this.personalOptions
      // }
      //
      // if (this.enterpriseOptions.some((item) => {
      //   return item === this.ap.encryption
      // })) {
      //   this.encryptionOptions = this.enterpriseOptions
      // }
      this.extra = _.cloneDeep(this.wifi[this.paramsKey])
    },
    onLockChange(e) {
      if (e === false) {
        this.ap.bssid = this.apCopy.bssid
      }
      if (e === true && this.selectedAP && this.ap.ssid === this.selectedAP.ssid) {
        this.ap.bssid = this.selectedAP.bssid
      }
    },

    onSSIDInput(e) {
      this.lockSSIDWithBSSID = false
      this.ap.bssid = ''
    },
    onRadio(row) {
      this.ap.ssid = row.ssid
      // if (this.lockSSIDWithBSSID) {
      // this.ap.bssid = row.bssid
      this.selectedAP = row
      // }
    },
    onScan() {
      const loading = this.$loading({
        lock: true,
        text: 'Scanning...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      scan({
        [this.scanParams.scanKey]: this.scanParams.scanKey
      }).then(res => {
        res[this.scanParams.scanKey + '_scan'].map(item => {
          item.description = item.encryption.description
        })
        this.scanAPList = res[this.scanParams.scanKey + '_scan']
        loading.close()
        this.$message({
          type: 'success',
          message: 'Scan completed'
        })
      }).catch(() => {
        loading.close()
      })
    }

  }
}
</script>

<style scoped lang="scss">
.reset-btn {
  background-color: #4a90e2;
  color: #ffffff;
}

::v-deep .el-icon-refresh {
  color: #FFFFFF;
//font-size: 14px;
}
.header-wrapper {
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
.el-checkbox__inner {
  border: 1px solid ;
}
</style>
