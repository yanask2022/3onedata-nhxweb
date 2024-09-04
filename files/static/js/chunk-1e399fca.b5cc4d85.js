(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e399fca"],{"035e":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"root"},[a("span",{staticClass:"title"},[e._v("Create Interface")]),a("el-card",[a("div",{staticClass:"card-panel-editable-content-wrapper"},[a("el-form",{ref:"postForm",staticClass:"form-container",attrs:{model:e.form,rules:e.rules}},[a("div",{staticClass:"field-row",class:{highlight:"name"===e.hash}},[a("div",{staticClass:"field-key"},[a("span",{staticClass:"field-key-text"},[e._v("Name of the new interface")])]),a("div",{staticClass:"field-value"},[a("div",{staticClass:"field-value-column"},[a("div",{staticClass:"field-value-column-input"},[a("el-input",{staticStyle:{width:"350px"},attrs:{sizi:"small"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("span",{staticClass:"field-value-column-input-tips"},[e._v(" Maximum length of the name is 15 characters including the automatic protocol/bridge prefix (br-, 6in4-,pppoe-etc.)")])])])]),a("div",{staticClass:"field-row",class:{highlight:"region"===e.hash}},[a("div",{staticClass:"field-key"},[a("span",{staticClass:"field-key-text"},[e._v("Protocol of the new interface")])]),a("div",{staticClass:"field-value"},[a("div",{staticClass:"field-value-column"},[a("div",{staticClass:"field-value-column-input"},[a("el-select",{staticStyle:{width:"100%"},attrs:{size:"small"},model:{value:e.form.region,callback:function(t){e.$set(e.form,"region",t)},expression:"form.region"}},e._l(e.protocolList,(function(e,t){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)])])]),e.showLastSecondFormItem?a("div",{staticClass:"field-row",class:{highlight:"interfaceChecked"===e.hash}},[a("div",{staticClass:"field-key"},[a("span",{staticClass:"field-key-text"},[e._v("Create a bridge over multiple interfaces")])]),a("div",{staticClass:"field-value"},[a("div",{staticClass:"field-value-column"},[a("div",{staticClass:"field-value-column-input"},[a("el-checkbox",{model:{value:e.form.interfaceChecked,callback:function(t){e.$set(e.form,"interfaceChecked",t)},expression:"form.interfaceChecked"}})],1)])])]):e._e(),e.showLastSecondFormItem?a("div",{staticClass:"field-row",class:{highlight:"interfaceChecked"===e.hash}},[a("div",{staticClass:"field-key"},[a("span",{staticClass:"field-key-text"},[e._v("Cover the following interface")])]),a("div",{staticClass:"field-value"},[a("div",{staticClass:"field-value-column"})])]):e._e(),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showLastSecondFormItem,expression:"showLastSecondFormItem"}],staticStyle:{width:"100%"}},[a("NXH-Table",{directives:[{name:"show",rawName:"v-show",value:e.form.interfaceChecked,expression:"form.interfaceChecked"}],attrs:{selection:!0,"table-data":e.tableData,columns:e.columns},on:{"selection-change":e.onSelectChange}}),a("NXHSingleTable",{directives:[{name:"show",rawName:"v-show",value:!e.form.interfaceChecked,expression:"!form.interfaceChecked"}],attrs:{radio:!0,"table-data":e.tableData,columns:e.columns},on:{"on-radio":e.onRadio}})],1)])],1)]),a("div",{staticStyle:{width:"100%","margin-top":"22px",display:"flex","justify-content":"space-between"}},[a("el-button",{attrs:{type:"success",size:"small"},on:{click:e.back}},[e._v("BACK TO OVERVIEW")]),a("el-button",{attrs:{type:"success",size:"small"},on:{click:e.createInterface}},[e._v("SUBMIT")])],1)],1)},l=[],s=a("5530"),n=(a("d9e2"),a("7db0"),a("caad"),a("b0c0"),a("d3b7"),a("ac1f"),a("00b4"),a("2532"),a("ad60")),i=a("bc48"),o=a("2226"),c={components:{NXHTable:n["a"],NXHSingleTable:i["a"]},data:function(){var e=function(e,t,a){var r=/^[A-Za-z0-9]+$/;""===t?a(new Error("The selected protocol needs a device assigned")):r.test(t)?a():a(new Error("The user name must be a string of 6 to 18 uppercase and lowercase digits"))};return{hash:"",columns:[{label:"Network",prop:"ifname"},{label:"ifname",prop:"interface"},{label:"Device",prop:"network"}],tableData:[],form:{name:"",region:"static",interfaceChecked:!1,interfaces:[]},rules:{name:[{required:!0,message:"No network name specified",trigger:"blur"},{required:!0,validator:e,trigger:"blur"}],region:[{required:!0,message:"must bu required",trigger:"change"}]},protocolList:[{label:"Static address",value:"static",children:[{label:'Ethernet Adapter: "bond0"',key:"1"},{label:'Ethernet Adapter: "eth0" (lan, test)',key:"2"},{label:'Ethernet Adapter: "eth1" (aedd, lan)',key:"3"},{label:'Ethernet Adapter: "eth2" (lan)',key:"4"},{label:'Ethernet Adapter: "eth3" (lan)',key:"5"},{label:'Ethernet Adapter: "eth4" (wan, wan6)',key:"6"},{label:'Ethernet Adapter: "gretap0"',key:"7"},{label:'Ethernet Adapter: "ip6gre0"',key:"8"},{label:'Ethernet Adapter: "ip6tnl0"',key:"9"},{label:'Ethernet Adapter: "ipsecdummy"',key:"10"},{label:'Ethernet Adapter: "miireg"',key:"11"},{label:'Ethernet Adapter: "mmo" (okoo)',key:"12"},{label:'Ethernet Adapter: "soc0"',key:"13"},{label:'Ethernet Adapter: "teql0"',key:"14"},{label:'Ethernet Adapter: "teste3333" (teset1111)',key:"15"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"16"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"17"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"18"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"19"},{label:'Wireless Network: Master "nhx-son-backhaul" (lan)',key:"20"},{label:'Wireless Network: Client "OpenWrt-Sta" (lan)',key:"21"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"22"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"23"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"24"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"25"},{label:'Wireless Network: Master "nhx-son-backhaul" (lan)',key:"26"},{label:'Wireless Network: Client "OpenWrt-Sta" (lan)',key:"27"},{label:"Custom Interface:",key:"28"}]},{label:"DHCP client",value:"dhcp",children:[{label:'Ethernet Adapter: "bond0"',key:"1"},{label:'Ethernet Adapter: "eth0" (lan, test)',key:"2"},{label:'Ethernet Adapter: "eth1" (aedd, lan)',key:"3"},{label:'Ethernet Adapter: "eth2" (lan)',key:"4"},{label:'Ethernet Adapter: "eth3" (lan)',key:"5"},{label:'Ethernet Adapter: "eth4" (wan, wan6)',key:"6"},{label:'Ethernet Adapter: "gretap0"',key:"7"},{label:'Ethernet Adapter: "ip6gre0"',key:"8"},{label:'Ethernet Adapter: "ip6tnl0"',key:"9"},{label:'Ethernet Adapter: "ipsecdummy"',key:"10"},{label:'Ethernet Adapter: "miireg"',key:"11"},{label:'Ethernet Adapter: "mmo" (okoo)',key:"12"},{label:'Ethernet Adapter: "soc0"',key:"13"},{label:'Ethernet Adapter: "teql0"',key:"14"},{label:'Ethernet Adapter: "teste3333" (teset1111)',key:"15"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"16"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"17"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"18"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"19"},{label:'Wireless Network: Master "nhx-son-backhaul" (lan)',key:"20"},{label:'Wireless Network: Client "OpenWrt-Sta" (lan)',key:"21"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"22"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"23"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"24"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"25"},{label:'Wireless Network: Master "nhx-son-backhaul" (lan)',key:"26"},{label:'Wireless Network: Client "OpenWrt-Sta" (lan)',key:"27"},{label:"Custom Interface:",key:"28"}]},{label:"PPPoE",value:"pppoe",children:[{label:'Ethernet Adapter: "bond0"',key:"1"},{label:'Ethernet Adapter: "eth0" (lan, test)',key:"2"},{label:'Ethernet Adapter: "eth1" (aedd, lan)',key:"3"},{label:'Ethernet Adapter: "eth2" (lan)',key:"4"},{label:'Ethernet Adapter: "eth3" (lan)',key:"5"},{label:'Ethernet Adapter: "eth4" (wan, wan6)',key:"6"},{label:'Ethernet Adapter: "gretap0"',key:"7"},{label:'Ethernet Adapter: "ip6gre0"',key:"8"},{label:'Ethernet Adapter: "ip6tnl0"',key:"9"},{label:'Ethernet Adapter: "ipsecdummy"',key:"10"},{label:'Ethernet Adapter: "miireg"',key:"11"},{label:'Ethernet Adapter: "mmo" (okoo)',key:"12"},{label:'Ethernet Adapter: "soc0"',key:"13"},{label:'Ethernet Adapter: "teql0"',key:"14"},{label:'Ethernet Adapter: "teste3333" (teset1111)',key:"15"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"16"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"17"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"18"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"19"},{label:'Wireless Network: Master "nhx-son-backhaul" (lan)',key:"20"},{label:'Wireless Network: Client "OpenWrt-Sta" (lan)',key:"21"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"22"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"23"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"24"},{label:'Wireless Network: Master "OpenWrt" (lan)',key:"25"},{label:'Wireless Network: Master "nhx-son-backhaul" (lan)',key:"26"},{label:'Wireless Network: Client "OpenWrt-Sta" (lan)',key:"27"},{label:"Custom Interface:",key:"28"}]}],interfaceRadio:"",childrenList:[],noChildrenArr:["Dual-Stack Lite (RFC63333)","IPv6-over-IPv4 (6rd)","PPP","PPtP","L2TP"],checkedBoxItem:[],protocolErrMsg:"The selected protocol needs a device assigned",nameErrMsg:"No network name specified",errMsg:"",isShowErrMsg:!1}},computed:{showLastSecondFormItem:function(){var e=this.noChildrenArr.includes(this.form.region);return!e}},watch:{"form.interfaceChecked":function(){this.columns=[{label:"Network",prop:"ifname"},{label:"ifname",prop:"interface"},{label:"Device",prop:"network"}]},"form.region":{handler:function(e,t){if(e){var a=this.protocolList.find((function(t){return t.label===e}));this.childrenList=null===a||void 0===a?void 0:a.children}},deep:!0,immediate:!0}},mounted:function(){var e=this;Object(o["d"])({}).then((function(t){e.tableData=t}))},methods:{onRadio:function(e){console.log("onRadio",e),this.form.interfaces=[Object(s["a"])({},e)]},onSelectChange:function(e){console.log("onSelectChange:",e),this.form.interfaces=e},createInterface:function(){var e=this,t={},a="";if(t["name"]=this.form.name,t["proto"]=this.form.region,this.form.interfaceChecked&&(t["type"]="bridge"),this.form.interfaces.length>0){a="";for(var r=!0,l=0;l<this.form.interfaces.length;l++)a=r?this.form.interfaces[l].ifname:a+" "+this.form.interfaces[l].ifname,r=!1;t["ifname"]=a}Object(o["b"])(t).then((function(a){e.$message({type:"success",message:"Save success"}),e.$EventBus.$emit("RefreshInterfaceTab",{activeName:t.name}),e.$router.back()})).catch((function(){}))},back:function(){this.$router.back()},showErrMsg:function(){""===this.form.name&&(this.errMsg="No network name specified",this.isShowErrMsg=!0),this.form.interfaceChecked&&0===this.checkedBoxItem.length&&(this.errMsg="The selected protocol needs a device assigned",this.isShowErrMsg=!0),this.form.interfaceChecked||""!==this.interfaceRadio||(this.errMsg="The selected protocol needs a device assigned",this.isShowErrMsg=!0)}}},d=c,h=(a("5b96"),a("2877")),k=Object(h["a"])(d,r,l,!1,null,"706ae0c4",null);t["default"]=k.exports},"5b96":function(e,t,a){"use strict";a("5c46")},"5c46":function(e,t,a){},"857a":function(e,t,a){"use strict";var r=a("e330"),l=a("1d80"),s=a("577e"),n=/"/g,i=r("".replace);e.exports=function(e,t,a,r){var o=s(l(e)),c="<"+t;return""!==a&&(c+=" "+a+'="'+i(s(r),n,"&quot;")+'"'),c+">"+o+"</"+t+">"}},af03:function(e,t,a){"use strict";var r=a("d039");e.exports=function(e){return r((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},c7cd:function(e,t,a){"use strict";var r=a("23e7"),l=a("857a"),s=a("af03");r({target:"String",proto:!0,forced:s("fixed")},{fixed:function(){return l(this,"tt","","")}})}}]);