<template>
  <div style="width: 100%;height: 80vh">
    <MonacoEditor
      :value="value"
      language="json"
      :diff-editor="true"
      :original="origin"
      :options="options"
      @change="onChange"
    ></MonacoEditor>
  </div>
</template>

<script>
import MonacoEditor from './editor';
import { jsonRequest } from '@/api/json-request'

export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      origin: '',
      value: '',
      options: {
        //Monaco Editor Options
      }
    }
  },
  created() {
    jsonRequest().then(res => {
      debugger
    })
    // fetch('http://172.16.1.88:9527/jsconfig.json')
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.text();
    //   })
    //   .then(text => {
    //     console.log(text);
    //     this.origin = text
    //     this.value = text
    //     // this.test = text
    //   })
    //   .catch(error => {
    //     console.error('There has been a problem with your fetch operation:', error);
    //   });

  },
  methods: {
    onChange(value) {
      console.log(value)
    }
  }
}
</script>
