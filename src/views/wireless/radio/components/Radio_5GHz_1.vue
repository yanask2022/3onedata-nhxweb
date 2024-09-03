<template>
  <div class="root">
    <!--              <el-input class="field-value-column-input" size="small" />-->
    <!--              <span class="field-value-column-input-tips"> Use ISO/IEC 3166 alpha2 country codes.</span>-->
    <br>
    <el-card
      shadow="never"
    >
      <div slot="header">
        <span>Radio config</span>
      </div>
      <div class="card-panel-editable-content-wrapper">

        <!-- wireless radio-->
        <div class="field-row" :class="{'highlight' : hash === 'disabled'}">
          <div class="field-key">
            <span class="field-key-text">5GHz Wireless Radio</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-checkbox
                  id="disabled"
                  v-model="settings.disabled"
                  label="Enable"
                  true-label="0"
                  false-label="1"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- wireless mode -->
        <div class="field-row" :class="{'highlight' : hash === 'hwmode'}">
          <div class="field-key">
            <span id="hwmode" class="field-key-text">Wireless Mode</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.hwmode"
                  style="width: 100%"
                  size="small"
                >
                  <el-option v-for="(mode, modeIndex) in wireless_modes" :key="modeIndex" :value="mode" />
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <!-- channel Width -->
        <div class="field-row" :class="{'highlight' : hash === 'htmode'}">
          <div class="field-key">
            <span class="field-key-text">Channel Width</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.htmode"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    v-for="(channelWidth, channelWidthIndex) in channel_width_arr"
                    :key="channelWidthIndex"
                    :value="channelWidth"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <!-- channel -->
        <div class="field-row" :class="{'highlight' : hash === 'channel'}">
          <div class="field-key">
            <span class="field-key-text">Channel</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.channel"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    v-for="(chanOpt, chanOptIndex) in settings.chanlist"
                    :key="chanOptIndex"
                    :value="chanOpt"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <!--    current channel    -->
        <div class="field-row">
          <div class="field-key">
            <span class="field-key-text">Current Channel</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <span>{{ settings.current_channel }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="field-row">
          <div class="field-key">
            <span class="field-key-text">Country Code</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.country"
                  filterable
                  style="width: 100%"
                  size="small"
                >
                  <el-option id="cbi-wireless-wifi0-country-00" value="00" label="00 - World" />
                  <el-option id="cbi-wireless-wifi0-country-AD" value="AD" label="AD - Andorra" />
                  <el-option id="cbi-wireless-wifi0-country-AE" value="AE" label="AE - United Arab Emirates" />
                  <el-option id="cbi-wireless-wifi0-country-AF" value="AF" label="AF - Afghanistan" />
                  <el-option id="cbi-wireless-wifi0-country-AG" value="AG" label="AG - Antigua and Barbuda" />
                  <el-option id="cbi-wireless-wifi0-country-AI" value="AI" label="AI - Anguilla" />
                  <el-option id="cbi-wireless-wifi0-country-AL" value="AL" label="AL - Albania" />
                  <el-option id="cbi-wireless-wifi0-country-AM" value="AM" label="AM - Armenia" />
                  <el-option id="cbi-wireless-wifi0-country-AN" value="AN" label="AN - Netherlands Antilles" />
                  <el-option id="cbi-wireless-wifi0-country-AO" value="AO" label="AO - Angola" />
                  <el-option id="cbi-wireless-wifi0-country-AQ" value="AQ" label="AQ - Antarctica" />
                  <el-option id="cbi-wireless-wifi0-country-AR" value="AR" label="AR - Argentina" />
                  <el-option id="cbi-wireless-wifi0-country-AS" value="AS" label="AS - American Samoa" />
                  <el-option id="cbi-wireless-wifi0-country-AT" value="AT" label="AT - Austria" />
                  <el-option id="cbi-wireless-wifi0-country-AU" value="AU" label="AU - Australia" />
                  <el-option id="cbi-wireless-wifi0-country-AW" value="AW" label="AW - Aruba" />
                  <el-option id="cbi-wireless-wifi0-country-AX" value="AX" label="AX - Aland Islands" />
                  <el-option id="cbi-wireless-wifi0-country-AZ" value="AZ" label="AZ - Azerbaijan" />
                  <el-option id="cbi-wireless-wifi0-country-BA" value="BA" label="BA - Bosnia and Herzegovina" />
                  <el-option id="cbi-wireless-wifi0-country-BB" value="BB" label="BB - Barbados" />
                  <el-option id="cbi-wireless-wifi0-country-BD" value="BD" label="BD - Bangladesh" />
                  <el-option id="cbi-wireless-wifi0-country-BE" value="BE" label="BE - Belgium" />
                  <el-option id="cbi-wireless-wifi0-country-BF" value="BF" label="BF - Burkina Faso" />
                  <el-option id="cbi-wireless-wifi0-country-BG" value="BG" label="BG - Bulgaria" />
                  <el-option id="cbi-wireless-wifi0-country-BH" value="BH" label="BH - Bahrain" />
                  <el-option id="cbi-wireless-wifi0-country-BI" value="BI" label="BI - Burundi" />
                  <el-option id="cbi-wireless-wifi0-country-BJ" value="BJ" label="BJ - Benin" />
                  <el-option id="cbi-wireless-wifi0-country-BL" value="BL" label="BL - Saint Barthelemy" />
                  <el-option id="cbi-wireless-wifi0-country-BM" value="BM" label="BM - Bermuda" />
                  <el-option id="cbi-wireless-wifi0-country-BN" value="BN" label="BN - Brunei Darussalam" />
                  <el-option id="cbi-wireless-wifi0-country-BO" value="BO" label="BO - Bolivia" />
                  <el-option id="cbi-wireless-wifi0-country-BR" value="BR" label="BR - Brazil" />
                  <el-option id="cbi-wireless-wifi0-country-BS" value="BS" label="BS - Bahamas" />
                  <el-option id="cbi-wireless-wifi0-country-BT" value="BT" label="BT - Bhutan" />
                  <el-option id="cbi-wireless-wifi0-country-BV" value="BV" label="BV - Bouvet Island" />
                  <el-option id="cbi-wireless-wifi0-country-BW" value="BW" label="BW - Botswana" />
                  <el-option id="cbi-wireless-wifi0-country-BY" value="BY" label="BY - Belarus" />
                  <el-option id="cbi-wireless-wifi0-country-BZ" value="BZ" label="BZ - Belize" />
                  <el-option id="cbi-wireless-wifi0-country-CA" value="CA" label="CA - Canada" />
                  <el-option id="cbi-wireless-wifi0-country-CC" value="CC" label="CC - Cocos (Keeling) Islands" />
                  <el-option id="cbi-wireless-wifi0-country-CD" value="CD" label="CD - Congo" />
                  <el-option id="cbi-wireless-wifi0-country-CF" value="CF" label="CF - Central African Republic" />
                  <el-option id="cbi-wireless-wifi0-country-CG" value="CG" label="CG - Congo" />
                  <el-option id="cbi-wireless-wifi0-country-CH" value="CH" label="CH - Switzerland" />
                  <el-option id="cbi-wireless-wifi0-country-CI" value="CI" label="CI - Cote d &#39;Ivoire" />
                  <el-option id="cbi-wireless-wifi0-country-CK" value="CK" label="CK - Cook Islands" />
                  <el-option id="cbi-wireless-wifi0-country-CL" value="CL" label="CL - Chile" />
                  <el-option id="cbi-wireless-wifi0-country-CM" value="CM" label="CM - Cameroon" />
                  <el-option id="cbi-wireless-wifi0-country-CN" value="CN" label="CN - China" />
                  <el-option id="cbi-wireless-wifi0-country-CO" value="CO" label="CO - Colombia" />
                  <el-option id="cbi-wireless-wifi0-country-CR" value="CR" label="CR - Costa Rica" />
                  <el-option id="cbi-wireless-wifi0-country-CU" value="CU" label="CU - Cuba" />
                  <el-option id="cbi-wireless-wifi0-country-CV" value="CV" label="CV - Cape Verde" />
                  <el-option id="cbi-wireless-wifi0-country-CX" value="CX" label="CX - Christmas Island" />
                  <el-option id="cbi-wireless-wifi0-country-CY" value="CY" label="CY - Cyprus" />
                  <el-option id="cbi-wireless-wifi0-country-CZ" value="CZ" label="CZ - Czech Republic" />
                  <el-option id="cbi-wireless-wifi0-country-DE" value="DE" label="DE - Germany" />
                  <el-option id="cbi-wireless-wifi0-country-DJ" value="DJ" label="DJ - Djibouti" />
                  <el-option id="cbi-wireless-wifi0-country-DK" value="DK" label="DK - Denmark" />
                  <el-option id="cbi-wireless-wifi0-country-DM" value="DM" label="DM - Dominica" />
                  <el-option id="cbi-wireless-wifi0-country-DO" value="DO" label="DO - Dominican Republic" />
                  <el-option id="cbi-wireless-wifi0-country-DZ" value="DZ" label="DZ - Algeria" />
                  <el-option id="cbi-wireless-wifi0-country-EC" value="EC" label="EC - Ecuador" />
                  <el-option id="cbi-wireless-wifi0-country-EE" value="EE" label="EE - Estonia" />
                  <el-option id="cbi-wireless-wifi0-country-EG" value="EG" label="EG - Egypt" />
                  <el-option id="cbi-wireless-wifi0-country-EH" value="EH" label="EH - Western Sahara" />
                  <el-option id="cbi-wireless-wifi0-country-ER" value="ER" label="ER - Eritrea" />
                  <el-option id="cbi-wireless-wifi0-country-ES" value="ES" label="ES - Spain" />
                  <el-option id="cbi-wireless-wifi0-country-ET" value="ET" label="ET - Ethiopia" />
                  <el-option id="cbi-wireless-wifi0-country-FI" value="FI" label="FI - Finland" />
                  <el-option id="cbi-wireless-wifi0-country-FJ" value="FJ" label="FJ - Fiji" />
                  <el-option id="cbi-wireless-wifi0-country-FK" value="FK" label="FK - Falkland Islands" />
                  <el-option id="cbi-wireless-wifi0-country-FM" value="FM" label="FM - Micronesia" />
                  <el-option id="cbi-wireless-wifi0-country-FO" value="FO" label="FO - Faroe Islands" />
                  <el-option id="cbi-wireless-wifi0-country-FR" value="FR" label="FR - France" />
                  <el-option id="cbi-wireless-wifi0-country-GA" value="GA" label="GA - Gabon" />
                  <el-option id="cbi-wireless-wifi0-country-GB" value="GB" label="GB - United Kingdom" />
                  <el-option id="cbi-wireless-wifi0-country-GD" value="GD" label="GD - Grenada" />
                  <el-option id="cbi-wireless-wifi0-country-GE" value="GE" label="GE - Georgia" />
                  <el-option id="cbi-wireless-wifi0-country-GF" value="GF" label="GF - French Guiana" />
                  <el-option id="cbi-wireless-wifi0-country-GG" value="GG" label="GG - Guernsey" />
                  <el-option id="cbi-wireless-wifi0-country-GH" value="GH" label="GH - Ghana" />
                  <el-option id="cbi-wireless-wifi0-country-GI" value="GI" label="GI - Gibraltar" />
                  <el-option id="cbi-wireless-wifi0-country-GL" value="GL" label="GL - Greenland" />
                  <el-option id="cbi-wireless-wifi0-country-GM" value="GM" label="GM - Gambia" />
                  <el-option id="cbi-wireless-wifi0-country-GN" value="GN" label="GN - Guinea" />
                  <el-option id="cbi-wireless-wifi0-country-GP" value="GP" label="GP - Guadeloupe" />
                  <el-option id="cbi-wireless-wifi0-country-GQ" value="GQ" label="GQ - Equatorial Guinea" />
                  <el-option id="cbi-wireless-wifi0-country-GR" value="GR" label="GR - Greece" />
                  <el-option id="cbi-wireless-wifi0-country-GS" value="GS" label="GS - South Georgia" />
                  <el-option id="cbi-wireless-wifi0-country-GT" value="GT" label="GT - Guatemala" />
                  <el-option id="cbi-wireless-wifi0-country-GU" value="GU" label="GU - Guam" />
                  <el-option id="cbi-wireless-wifi0-country-GW" value="GW" label="GW - Guinea-Bissau" />
                  <el-option id="cbi-wireless-wifi0-country-GY" value="GY" label="GY - Guyana" />
                  <el-option id="cbi-wireless-wifi0-country-HK" value="HK" label="HK - Hong Kong" />
                  <el-option id="cbi-wireless-wifi0-country-HM" value="HM" label="HM - Heard and McDonald Islands" />
                  <el-option id="cbi-wireless-wifi0-country-HN" value="HN" label="HN - Honduras" />
                  <el-option id="cbi-wireless-wifi0-country-HR" value="HR" label="HR - Croatia" />
                  <el-option id="cbi-wireless-wifi0-country-HT" value="HT" label="HT - Haiti" />
                  <el-option id="cbi-wireless-wifi0-country-HU" value="HU" label="HU - Hungary" />
                  <el-option id="cbi-wireless-wifi0-country-ID" value="ID" label="ID - Indonesia" />
                  <el-option id="cbi-wireless-wifi0-country-IE" value="IE" label="IE - Ireland" />
                  <el-option id="cbi-wireless-wifi0-country-IL" value="IL" label="IL - Israel" />
                  <el-option id="cbi-wireless-wifi0-country-IM" value="IM" label="IM - Isle of Man" />
                  <el-option id="cbi-wireless-wifi0-country-IN" value="IN" label="IN - India" />
                  <el-option id="cbi-wireless-wifi0-country-IO" value="IO" label="IO - Chagos Islands" />
                  <el-option id="cbi-wireless-wifi0-country-IQ" value="IQ" label="IQ - Iraq" />
                  <el-option id="cbi-wireless-wifi0-country-IR" value="IR" label="IR - Iran" />
                  <el-option id="cbi-wireless-wifi0-country-IS" value="IS" label="IS - Iceland" />
                  <el-option id="cbi-wireless-wifi0-country-IT" value="IT" label="IT - Italy" />
                  <el-option id="cbi-wireless-wifi0-country-JE" value="JE" label="JE - Jersey" />
                  <el-option id="cbi-wireless-wifi0-country-JM" value="JM" label="JM - Jamaica" />
                  <el-option id="cbi-wireless-wifi0-country-JO" value="JO" label="JO - Jordan" />
                  <el-option id="cbi-wireless-wifi0-country-JP" value="JP" label="JP - Japan" />
                  <el-option id="cbi-wireless-wifi0-country-KE" value="KE" label="KE - Kenya" />
                  <el-option id="cbi-wireless-wifi0-country-KG" value="KG" label="KG - Kyrgyzstan" />
                  <el-option id="cbi-wireless-wifi0-country-KH" value="KH" label="KH - Cambodia" />
                  <el-option id="cbi-wireless-wifi0-country-KI" value="KI" label="KI - Kiribati" />
                  <el-option id="cbi-wireless-wifi0-country-KM" value="KM" label="KM - Comoros" />
                  <el-option id="cbi-wireless-wifi0-country-KN" value="KN" label="KN - Saint Kitts and Nevis" />
                  <el-option id="cbi-wireless-wifi0-country-KP" value="KP" label="KP - North Korea" />
                  <el-option id="cbi-wireless-wifi0-country-KR" value="KR" label="KR - South Korea" />
                  <el-option id="cbi-wireless-wifi0-country-KW" value="KW" label="KW - Kuwait" />
                  <el-option id="cbi-wireless-wifi0-country-KY" value="KY" label="KY - Cayman Islands" />
                  <el-option id="cbi-wireless-wifi0-country-KZ" value="KZ" label="KZ - Kazakhstan" />
                  <el-option id="cbi-wireless-wifi0-country-LA" value="LA" label="LA - Laos" />
                  <el-option id="cbi-wireless-wifi0-country-LB" value="LB" label="LB - Lebanon" />
                  <el-option id="cbi-wireless-wifi0-country-LC" value="LC" label="LC - Saint Lucia" />
                  <el-option id="cbi-wireless-wifi0-country-LI" value="LI" label="LI - Liechtenstein" />
                  <el-option id="cbi-wireless-wifi0-country-LK" value="LK" label="LK - Sri Lanka" />
                  <el-option id="cbi-wireless-wifi0-country-LR" value="LR" label="LR - Liberia" />
                  <el-option id="cbi-wireless-wifi0-country-LS" value="LS" label="LS - Lesotho" />
                  <el-option id="cbi-wireless-wifi0-country-LT" value="LT" label="LT - Lithuania" />
                  <el-option id="cbi-wireless-wifi0-country-LU" value="LU" label="LU - Luxembourg" />
                  <el-option id="cbi-wireless-wifi0-country-LV" value="LV" label="LV - Latvia" />
                  <el-option id="cbi-wireless-wifi0-country-LY" value="LY" label="LY - Libyan Arab Jamahiriya" />
                  <el-option id="cbi-wireless-wifi0-country-MA" value="MA" label="MA - Morocco" />
                  <el-option id="cbi-wireless-wifi0-country-MC" value="MC" label="MC - Monaco" />
                  <el-option id="cbi-wireless-wifi0-country-MD" value="MD" label="MD - Moldova" />
                  <el-option id="cbi-wireless-wifi0-country-ME" value="ME" label="ME - Montenegro" />
                  <el-option id="cbi-wireless-wifi0-country-MF" value="MF" label="MF - Saint Martin (French part)" />
                  <el-option id="cbi-wireless-wifi0-country-MG" value="MG" label="MG - Madagascar" />
                  <el-option id="cbi-wireless-wifi0-country-MH" value="MH" label="MH - Marshall Islands" />
                  <el-option id="cbi-wireless-wifi0-country-MK" value="MK" label="MK - Macedonia" />
                  <el-option id="cbi-wireless-wifi0-country-ML" value="ML" label="ML - Mali" />
                  <el-option id="cbi-wireless-wifi0-country-MM" value="MM" label="MM - Myanmar" />
                  <el-option id="cbi-wireless-wifi0-country-MN" value="MN" label="MN - Mongolia" />
                  <el-option id="cbi-wireless-wifi0-country-MO" value="MO" label="MO - Macao" />
                  <el-option id="cbi-wireless-wifi0-country-MP" value="MP" label="MP - Northern Mariana Islands" />
                  <el-option id="cbi-wireless-wifi0-country-MQ" value="MQ" label="MQ - Martinique" />
                  <el-option id="cbi-wireless-wifi0-country-MR" value="MR" label="MR - Mauritania" />
                  <el-option id="cbi-wireless-wifi0-country-MS" value="MS" label="MS - Montserrat" />
                  <el-option id="cbi-wireless-wifi0-country-MT" value="MT" label="MT - Malta" />
                  <el-option id="cbi-wireless-wifi0-country-MU" value="MU" label="MU - Mauritius" />
                  <el-option id="cbi-wireless-wifi0-country-MV" value="MV" label="MV - Maldives" />
                  <el-option id="cbi-wireless-wifi0-country-MW" value="MW" label="MW - Malawi" />
                  <el-option id="cbi-wireless-wifi0-country-MX" value="MX" label="MX - Mexico" />
                  <el-option id="cbi-wireless-wifi0-country-MY" value="MY" label="MY - Malaysia" />
                  <el-option id="cbi-wireless-wifi0-country-MZ" value="MZ" label="MZ - Mozambique" />
                  <el-option id="cbi-wireless-wifi0-country-NA" value="NA" label="NA - Namibia" />
                  <el-option id="cbi-wireless-wifi0-country-NC" value="NC" label="NC - New Caledonia" />
                  <el-option id="cbi-wireless-wifi0-country-NE" value="NE" label="NE - Niger" />
                  <el-option id="cbi-wireless-wifi0-country-NF" value="NF" label="NF - Norfolk Island" />
                  <el-option id="cbi-wireless-wifi0-country-NG" value="NG" label="NG - Nigeria" />
                  <el-option id="cbi-wireless-wifi0-country-NI" value="NI" label="NI - Nicaragua" />
                  <el-option id="cbi-wireless-wifi0-country-NL" value="NL" label="NL - Netherlands" />
                  <el-option id="cbi-wireless-wifi0-country-NO" value="NO" label="NO - Norway" />
                  <el-option id="cbi-wireless-wifi0-country-NP" value="NP" label="NP - Nepal" />
                  <el-option id="cbi-wireless-wifi0-country-NR" value="NR" label="NR - Nauru" />
                  <el-option id="cbi-wireless-wifi0-country-NU" value="NU" label="NU - Niue" />
                  <el-option id="cbi-wireless-wifi0-country-NZ" value="NZ" label="NZ - New Zealand" />
                  <el-option id="cbi-wireless-wifi0-country-OM" value="OM" label="OM - Oman" />
                  <el-option id="cbi-wireless-wifi0-country-PA" value="PA" label="PA - Panama" />
                  <el-option id="cbi-wireless-wifi0-country-PE" value="PE" label="PE - Peru" />
                  <el-option id="cbi-wireless-wifi0-country-PF" value="PF" label="PF - French Polynesia" />
                  <el-option id="cbi-wireless-wifi0-country-PG" value="PG" label="PG - Papua New Guinea" />
                  <el-option id="cbi-wireless-wifi0-country-PH" value="PH" label="PH - Philippines" />
                  <el-option id="cbi-wireless-wifi0-country-PK" value="PK" label="PK - Pakistan" />
                  <el-option id="cbi-wireless-wifi0-country-PL" value="PL" label="PL - Poland" />
                  <el-option id="cbi-wireless-wifi0-country-PM" value="PM" label="PM - Saint Pierre and Miquelon" />
                  <el-option id="cbi-wireless-wifi0-country-PN" value="PN" label="PN - Pitcairn" />
                  <el-option id="cbi-wireless-wifi0-country-PR" value="PR" label="PR - Puerto Rico" />
                  <el-option id="cbi-wireless-wifi0-country-PS" value="PS" label="PS - Palestinian Territory" />
                  <el-option id="cbi-wireless-wifi0-country-PT" value="PT" label="PT - Portugal" />
                  <el-option id="cbi-wireless-wifi0-country-PW" value="PW" label="PW - Palau" />
                  <el-option id="cbi-wireless-wifi0-country-PY" value="PY" label="PY - Paraguay" />
                  <el-option id="cbi-wireless-wifi0-country-QA" value="QA" label="QA - Qatar" />
                  <el-option id="cbi-wireless-wifi0-country-RE" value="RE" label="RE - Reunion" />
                  <el-option id="cbi-wireless-wifi0-country-RO" value="RO" label="RO - Romania" />
                  <el-option id="cbi-wireless-wifi0-country-RS" value="RS" label="RS - Serbia" />
                  <el-option id="cbi-wireless-wifi0-country-RU" value="RU" label="RU - Russian Federation" />
                  <el-option id="cbi-wireless-wifi0-country-RW" value="RW" label="RW - Rwanda" />
                  <el-option id="cbi-wireless-wifi0-country-SA" value="SA" label="SA - Saudi Arabia" />
                  <el-option id="cbi-wireless-wifi0-country-SB" value="SB" label="SB - Solomon Islands" />
                  <el-option id="cbi-wireless-wifi0-country-SC" value="SC" label="SC - Seychelles" />
                  <el-option id="cbi-wireless-wifi0-country-SD" value="SD" label="SD - Sudan" />
                  <el-option id="cbi-wireless-wifi0-country-SE" value="SE" label="SE - Sweden" />
                  <el-option id="cbi-wireless-wifi0-country-SG" value="SG" label="SG - Singapore" />
                  <el-option id="cbi-wireless-wifi0-country-SH" value="SH" label="SH - St. Helena and Dependencies" />
                  <el-option id="cbi-wireless-wifi0-country-SI" value="SI" label="SI - Slovenia" />
                  <el-option id="cbi-wireless-wifi0-country-SJ" value="SJ" label="SJ - Svalbard and Jan Mayen" />
                  <el-option id="cbi-wireless-wifi0-country-SK" value="SK" label="SK - Slovakia" />
                  <el-option id="cbi-wireless-wifi0-country-SL" value="SL" label="SL - Sierra Leone" />
                  <el-option id="cbi-wireless-wifi0-country-SM" value="SM" label="SM - San Marino" />
                  <el-option id="cbi-wireless-wifi0-country-SN" value="SN" label="SN - Senegal" />
                  <el-option id="cbi-wireless-wifi0-country-SO" value="SO" label="SO - Somalia" />
                  <el-option id="cbi-wireless-wifi0-country-SR" value="SR" label="SR - Suriname" />
                  <el-option id="cbi-wireless-wifi0-country-ST" value="ST" label="ST - Sao Tome and Principe" />
                  <el-option id="cbi-wireless-wifi0-country-SV" value="SV" label="SV - El Salvador" />
                  <el-option id="cbi-wireless-wifi0-country-SY" value="SY" label="SY - Syrian Arab Republic" />
                  <el-option id="cbi-wireless-wifi0-country-SZ" value="SZ" label="SZ - Swaziland" />
                  <el-option id="cbi-wireless-wifi0-country-TC" value="TC" label="TC - Turks and Caicos Islands" />
                  <el-option id="cbi-wireless-wifi0-country-TD" value="TD" label="TD - Chad" />
                  <el-option id="cbi-wireless-wifi0-country-TF" value="TF" label="TF - French Southern Territories" />
                  <el-option id="cbi-wireless-wifi0-country-TG" value="TG" label="TG - Togo" />
                  <el-option id="cbi-wireless-wifi0-country-TH" value="TH" label="TH - Thailand" />
                  <el-option id="cbi-wireless-wifi0-country-TJ" value="TJ" label="TJ - Tajikistan" />
                  <el-option id="cbi-wireless-wifi0-country-TK" value="TK" label="TK - Tokelau" />
                  <el-option id="cbi-wireless-wifi0-country-TL" value="TL" label="TL - Timor-Leste" />
                  <el-option id="cbi-wireless-wifi0-country-TM" value="TM" label="TM - Turkmenistan" />
                  <el-option id="cbi-wireless-wifi0-country-TN" value="TN" label="TN - Tunisia" />
                  <el-option id="cbi-wireless-wifi0-country-TO" value="TO" label="TO - Tonga" />
                  <el-option id="cbi-wireless-wifi0-country-TR" value="TR" label="TR - Turkey" />
                  <el-option id="cbi-wireless-wifi0-country-TT" value="TT" label="TT - Trinidad and Tobago" />
                  <el-option id="cbi-wireless-wifi0-country-TV" value="TV" label="TV - Tuvalu" />
                  <el-option id="cbi-wireless-wifi0-country-TW" value="TW" label="TW - Taiwan" />
                  <el-option id="cbi-wireless-wifi0-country-TZ" value="TZ" label="TZ - Tanzania" />
                  <el-option id="cbi-wireless-wifi0-country-UA" value="UA" label="UA - Ukraine" />
                  <el-option id="cbi-wireless-wifi0-country-UG" value="UG" label="UG - Uganda" />
                  <el-option id="cbi-wireless-wifi0-country-UM" value="UM" label="UM - U.S. Minor Outlying Islands" />
                  <el-option id="cbi-wireless-wifi0-country-US" value="US" label="US - United States" />
                  <el-option id="cbi-wireless-wifi0-country-UY" value="UY" label="UY - Uruguay" />
                  <el-option id="cbi-wireless-wifi0-country-UZ" value="UZ" label="UZ - Uzbekistan" />
                  <el-option id="cbi-wireless-wifi0-country-VA" value="VA" label="VA - Vatican City State" />
                  <el-option id="cbi-wireless-wifi0-country-VC" value="VC" label="VC - St. Vincent and Grenadines" />
                  <el-option id="cbi-wireless-wifi0-country-VE" value="VE" label="VE - Venezuela" />
                  <el-option id="cbi-wireless-wifi0-country-VG" value="VG" label="VG - Virgin Islands, British" />
                  <el-option id="cbi-wireless-wifi0-country-VI" value="VI" label="VI - Virgin Islands, U.S." />
                  <el-option id="cbi-wireless-wifi0-country-VN" value="VN" label="VN - Viet Nam" />
                  <el-option id="cbi-wireless-wifi0-country-VU" value="VU" label="VU - Vanuatu" />
                  <el-option id="cbi-wireless-wifi0-country-WF" value="WF" label="WF - Wallis and Futuna" />
                  <el-option id="cbi-wireless-wifi0-country-WS" value="WS" label="WS - Samoa" />
                  <el-option id="cbi-wireless-wifi0-country-YE" value="YE" label="YE - Yemen" />
                  <el-option id="cbi-wireless-wifi0-country-YT" value="YT" label="YT - Mayotte" />
                  <el-option id="cbi-wireless-wifi0-country-ZA" value="ZA" label="ZA - South Africa" />
                  <el-option id="cbi-wireless-wifi0-country-ZM" value="ZM" label="ZM - Zambia" />
                  <el-option id="cbi-wireless-wifi0-country-ZW" value="ZW" label="ZW - Zimbabwe" />
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <!-- nhxarq-->
        <div class="field-row">
          <div class="field-key">
            <span class="field-key-text">nhxarq</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.nhxarq"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    :value="0"
                  />
                  <el-option
                    :value="1"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <!-- nhxarq-->
        <div class="field-row">
          <div class="field-key">
            <span class="field-key-text">no_vlan</span>
          </div>
          <div class="field-value">
            <div class="field-value-column">
              <div class="field-value-column-input">
                <el-select
                  v-model="settings.no_vlan"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    :value="0"
                  />
                  <el-option
                    :value="1"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>
      </div>

    </el-card>
    <br>
  </div>

</template>

<script>
import { wifi } from '@/api/wifi'
import lodash from 'lodash'
import { syncAllChangesToStore } from '@/utils/diff'
import { mapGetters } from 'vuex'
const API_NAME = 'wifi-set'

export default {
  name: 'Radio5GHz1',
  props: {
    paramsKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      wireless_modes: [
        '11a', '11na', '11ac', '11axa', '11bea'
      ],
      settings: {
        nhxarq: '',
        no_vlan: '',
        country: '00',
        disabled: 0,
        hwmode: '',
        htmode: '',
        channel: '',
        chanlist: [],
        current_channel: '',
        txpower: ''
      },
      settingsCopy: null,
      globalSaveClickEventCallback: null,
      globalDiscardEventCallback: null,
      changesCounter: 0,
      hash: ''
    }
  },

  computed: {
    ...mapGetters(['wifi', 'originalWifi']),
    channel_width_arr() {
      if (this.settings.hwmode === '11a') {
        return ['auto', 'HT20']
      } else if (this.settings.hwmode === '11na') {
        return ['auto', 'HT20', 'HT40', 'HT40-', 'HT40+']
      } else if (this.settings.hwmode === '11ac') {
        return ['auto', 'HT20', 'HT40', 'HT40-', 'HT40+', 'HT80']
      } else if (this.settings.hwmode === '11axa') {
        return ['auto', 'HT20', 'HT40', 'HT40-', 'HT40+', 'HT80', 'HT80_80', 'HT160']
      } else if (this.settings.hwmode === '11bea') {
        return ['auto', 'HT20', 'HT40', 'HT40-', 'HT40+', 'HT80', 'HT80_80', 'HT160']
      } else {
        return []
      }
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (
          to.path === this.$route.path &&
          to.params &&
          to.params.paramsKey &&
          to.params.paramsKey === this.paramsKey &&
          to.params.updatedKey) {
          this.hash = to.params.updatedKey
          this.getData()
        } else {
          this.hash = ''
        }
      },
      deep: true
    },
    'settings': {
      handler(newValue, oldValue) {
        // 查找差异
        const referKey = this.$route.path + '?tab=' + this.$options.name + '&paramsKey=' + this.paramsKey + '#'
        const hasChanges = syncAllChangesToStore.apply(this, [
          // 新值
          newValue,
          // 网络getdata回来的copy
          this.originalWifi[this.paramsKey],
          // 保存到store中的key， 颗粒度指到当前改动字段
          referKey,
          (updateKey, updateValue) => {
            return {
              path: referKey + updateKey,
              data: {
                api: API_NAME,
                // 当前改动
                snapshot: { ...newValue, paramsKey: this.paramsKey },
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
                    params: { paramsKey: this.paramsKey, freq: newValue.freq, updatedKey: updateKey }
                  },
                  {
                    title: this.$options.name,
                    query: { tabName: this.$options.name },
                    params: { paramsKey: this.paramsKey, freq: newValue.freq, updatedKey: updateKey }
                  },
                  {
                    title: updateKey,
                    query: { tabName: this.$options.name + '#' + updateKey },
                    params: { paramsKey: this.paramsKey, freq: newValue.freq, updatedKey: updateKey }
                  }
                ]
              }
            }
          }
        ])
        if (!hasChanges) {
          this.hash = ''
        } else {
          this.$store.commit('configs/SET_WIFI_CONFIG', [this.paramsKey, this.settings])
        }
      },
      deep: true
    }
  },

  mounted() {
    this.$store.dispatch('configs/getWifi').then(wifi => {
      this.getData()
    })
    this.globalSaveClickEventCallback = ({ api, params }) => {
      if (api === API_NAME && Object.keys(params).includes(this.paramsKey)) {
        this.$store.dispatch('configs/getWifi', true).then(wifi => {
          lodash.delay(this.getData, 1500, () => {})
        })
      }
    }
    this.globalDiscardEventCallback = ({ path }) => {
      this.hash = ''
      this.$store.dispatch('configs/getWifi').then(wifi => {
        this.getData()
      })
    }
    this.$EventBus.$on('GlobalSaveClick', this.globalSaveClickEventCallback)
    this.$EventBus.$on('GlobalDiscard', this.globalDiscardEventCallback)
  },
  beforeDestroy() {
    this.$EventBus.$off('GlobalSaveClick', this.globalSaveClickEventCallback)
    this.$EventBus.$off('GlobalDiscard', this.globalDiscardEventCallback)
  },
  methods: {
    updateView() {
      this.$forceUpdate()
    },
    getData(callback) {
      this.settings = lodash.cloneDeep(this.wifi[this.paramsKey])
      callback && callback()
      // wifi({}).then(res =                     > {
      //   // freq有2个5g的时候，radio数字小的为5GHz_1，radio数字大的为5GHz_2
      //   const fiveGRadioArr = []
      //   for (const [key, value] of Object.entries(res)) {
      //     if (key.startsWith('radio') && value.freq === '5G') {
      //       fiveGRadioArr.push({ key: key, ...value })
      //     }
      //   }
      //   if (fiveGRadioArr.length > 1) {
      //     const radioNumber1 = extractNumberFromString(fiveGRadioArr[0].key)
      //     const radioNumber2 = extractNumberFromString(fiveGRadioArr[1].key)
      //
      //     if (radioNumber1 < radioNumber2) {
      //       this.settingsCopy = lodash.cloneDeep({ ...fiveGRadioArr[0], paramsKey: fiveGRadioArr[0].key })
      //       this.settings = { ...fiveGRadioArr[0], paramsKey: fiveGRadioArr[0].key }
      //     } else {
      //       this.settingsCopy = lodash.cloneDeep({ ...fiveGRadioArr[1], paramsKey: fiveGRadioArr[1].key })
      //       this.settings = { ...fiveGRadioArr[1], paramsKey: fiveGRadioArr[1].key }
      //     }
      //
      //     delete this.settingsCopy['key']
      //     delete this.settings['key']
      //   } else if (fiveGRadioArr.length === 1) {
      //     this.settingsCopy = lodash.cloneDeep({ ...fiveGRadioArr[0], paramsKey: fiveGRadioArr[0].key })
      //     this.settings = { ...fiveGRadioArr[0], paramsKey: fiveGRadioArr[0].key }
      //
      //     delete this.settingsCopy['key']
      //     delete this.settings['key']
      //   }
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.highlight {
  //animation: blink 1s 3 steps(1);
  background: #8ebdf5 !important;
}

@keyframes blink {
  50% {
    color: transparent;
  }
}

::v-deep .el-card__header {
  //border: unset;
}

::v-deep .el-button {
  color: #FFFFFF;
}

</style>
