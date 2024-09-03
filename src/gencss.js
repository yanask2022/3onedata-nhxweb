// import extract from 'extract-inline-css'
const extract = require('extract-inline-css')

extract('./src/views/nhx-iac/components/ExpandTmplate.vue', {
  dist: './gen-css',
  formatHtml: false
})
