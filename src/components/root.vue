<template>
  <div id="root">
    <h1>TB03 tools</h1>
    <input type="file" id="files" name="files[]" multiple />
    <output id="list"></output>
    <div id='patterns'></div>
  </div>
</template>

<script>
export default {
  name: 'root',
  data () {
    return {}
  },
  mounted() {
    console.log('mounted!')
    require('../../lib/main.js')()
  }
}
</script>

<style>
div.pattern-parent {
  width: 25%;
  display: inline-block;
}
div.individual-step {
  display: inline-block;
  /*width: 6%;*/
}
div.step-note {
  padding: 4px;
}
button.step-state {
}
button.step-accent {
}
button.step-slide {
}
</style>
