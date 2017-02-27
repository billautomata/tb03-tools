<template>
  <div id="root">
    <h1>TB03 tools</h1>
    <input type="file" id="files" name="files[]" multiple />
    <output id="list"></output>
    <!-- <div id='patterns'></div> -->
    <div id='hmm'></div>
    <tb03-pattern
      v-for='(pattern,index) in patterns'
      v-bind:pattern='pattern'
      v-bind:index='index'>
    </tb03-pattern>
  </div>
</template>

<script>
import tb03_pattern from './tb03_pattern.vue'

export default {
  name: 'root',
  components: {
    'tb03-pattern': tb03_pattern
  },
  data () {
    return {
      patterns: []
    }
  },
  mounted () {
    console.log('mounted!')
    var patterns = require('../../lib/main.js')()
    // console.log(patterns, Array.isArray(this.patterns))
    var self = this
    patterns.forEach(function(p){
      self.patterns.push(p)
    })
    var d3 = require('d3')
    require('../../lib/force_directed_graph.js')({
      parent: d3.select(this.$el).select('div#hmm'),
      data: this.patterns
    })

  }
}
</script>

<style></style>
