(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d05d8"],{6855:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{width:"100%",height:"80vh"}},[i("MonacoEditor",{attrs:{value:t.value,language:"json","diff-editor":!0,original:t.origin,options:t.options},on:{change:t.onChange}})],1)},n=[],r=i("5530"),a=(i("a9e3"),i("ac1f"),i("00b4"),i("f33e"));function s(){}var d={name:"MonacoEditor",props:{diffEditor:{type:Boolean,default:!1},width:{type:[String,Number],default:"100%"},height:{type:[String,Number],default:"100%"},original:String,value:String,language:{type:String,default:"javascript"},theme:{type:String,default:"vs"},options:{type:Object,default:function(){return{}}},editorMounted:{type:Function,default:s},editorBeforeMount:{type:Function,default:s}},watch:{options:{deep:!0,handler:function(t){this.editor&&this.editor.updateOptions(t)}},value:function(){this.editor&&this.value!==this._getValue()&&this._setValue(this.value)},original:function(){if(this.diffEditor){var t=this.editor.getModel(),e=t.original;e.setValue(this.original)}},language:function(){if(this.editor)if(this.diffEditor){var t=this.editor.getModel(),e=t.original,i=t.modified;a["editor"].setModelLanguage(e,this.language),a["editor"].setModelLanguage(i,this.language)}else a["editor"].setModelLanguage(this.editor.getModel(),this.language)},theme:function(){this.editor&&a["editor"].setTheme(this.theme)},style:function(){var t=this;this.editor&&this.$nextTick((function(){t.editor.layout()}))}},computed:{style:function(){return{width:/^\d+$/.test(this.width)?"".concat(this.width,"px"):this.width,height:/^\d+$/.test(this.height)?"".concat(this.height,"px"):this.height}}},mounted:function(){this.initMonaco()},beforeDestroy:function(){this.editor&&this.editor.dispose()},render:function(t){return t("div",{class:"monaco_editor_container",style:this.style})},methods:{initMonaco:function(){var t=this.value,e=this.language,i=this.theme,o=this.options;Object.assign(o,this._editorBeforeMount()),this.editor=a["editor"][this.diffEditor?"createDiffEditor":"create"](this.$el,Object(r["a"])({value:t,language:e,theme:i},o)),this.diffEditor&&this._setModel(this.value,this.original),this._editorMounted(this.editor)},_getEditor:function(){return this.editor?this.diffEditor?this.editor.modifiedEditor:this.editor:null},_setModel:function(t,e){var i=this.language,o=a["editor"].createModel(e,i),n=a["editor"].createModel(t,i);this.editor.setModel({original:o,modified:n})},_setValue:function(t){var e=this._getEditor();if(e)return e.setValue(t)},_getValue:function(){var t=this._getEditor();return t?t.getValue():""},_editorBeforeMount:function(){var t=this.editorBeforeMount(a);return t||{}},_editorMounted:function(t){var e=this;this.editorMounted(t,a),this.diffEditor?t.onDidUpdateDiff((function(t){var i=e._getValue();e._emitChange(i,t)})):t.onDidChangeModelContent((function(t){var i=e._getValue();e._emitChange(i,t)}))},_emitChange:function(t,e){this.$emit("change",t,e),this.$emit("input",t)}}},u=(i("d3b7"),i("bc3a")),h=i.n(u),c=i("5c96"),l=i("4360"),f=i("5f87"),g=h.a.create({timeout:6e4});g.interceptors.request.use((function(t){return t.data["version"]="1.0",l["a"].getters.token?t.data["sid"]=Object(f["a"])():t.data["sid"]="000000000000000000000000000000",t}),(function(t){return Promise.reject(t)})),g.interceptors.response.use((function(t){return t}),(function(t){return Object(c["Message"])({message:t.message,type:"error",duration:5e3}),Promise.reject(t)}));var p=g;function v(){return p({url:"/",method:"get",data:{}})}var m={components:{MonacoEditor:d},data:function(){return{origin:"",value:"",options:{}}},created:function(){v().then((function(t){}))},methods:{onChange:function(t){console.log(t)}}},M=m,_=i("2877"),y=Object(_["a"])(M,o,n,!1,null,null,null);e["default"]=y.exports}}]);