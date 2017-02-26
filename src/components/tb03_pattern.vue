
<template>
  <div id='tb03-pattern' class='pattern-parent'>
  </div>
</template>

<script>
var d3 = require('d3')
export default {
  name: 'tb03-pattern',
  props: [
    'pattern',
    'index'
  ],
  data() {
    return {}
  },
  mounted(){
    // console.log(this.pattern)
    // console.log(d3.select(this.$el))
    require('../../lib/draw_pattern.js')({
      parent: d3.select(this.$el),
      name: this.pattern.name,
      data: this.pattern
    })
  }
}
</script>

<style>
div.pattern-parent {
  width: 50%;
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
