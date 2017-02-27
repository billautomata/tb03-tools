
<template>
  <div id='tb03-pattern' class='pattern-parent'>
    <h1>{{ name }}</h1>
    <div class='individual-step'>
      <div class='step-note'>note</div>
      <div class='step-state'>state</div>
      <div class='step-accent'>accent</div>
      <div class='step-slide'>slide</div>
    </div>
    <template
      v-for="(step,idx) in steps"
      v-bind:step="step">
      <div class='individual-step' style='border: 1px solid green;'>
        <div class='step-note'>{{ step.note }}</div>
        <button class='step-state'>{{ step.state }}</button><br>
        <button class='step-state'>{{ step.accent }}</button><br>
        <button class='step-state'>{{ step.slide }}</button><br>
      </div>
    </template>
    <div id='sheet-music'></div>

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
    return {
      name: '',
      steps: [],
    }
  },
  mounted(){
    this.steps = this.pattern.steps
    this.name = this.pattern.name
    require('../../lib/draw_sheet_music.js')({
      parent: d3.select(this.$el).select('div#sheet-music'),
      data: { steps: this.steps }
    })

    // console.log(this.pattern)
    // console.log(d3.select(this.$el))
    // require('../../lib/draw_pattern.js')({
    //   parent: d3.select(this.$el),
    //   name: this.pattern.name,
    //   data: this.pattern
    // })
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
  text-align: right;
  /*width: 6%;*/
}
div.step-note {
  padding: 4px;
}
.step-state {
}
.step-accent {
}
.step-slide {
}
</style>
