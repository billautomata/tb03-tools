module.exports = function draw_patern (options) {
  // options.parent
  // options.name
  // options.data
  var div_local = options.parent.append('div').attr('class', 'pattern-parent')
  div_local.append('h4').html(options.name)
  var div_steps_parent = div_local.append('div')
  options.data.steps.forEach(function (step) {
    var s = div_steps_parent.append('div').attr('class', 'individual-step')
    // note number
    // slide
    // accent
    // state
    s.append('div').html(step.note).attr('class', 'step-note')
    s.append('br')
    s.append('button').html(step.state).attr('class', 'step-state')
    s.append('br')
    s.append('button').html(step.accent).attr('class', 'step-accent')
    s.append('br')
    s.append('button').html(step.slide).attr('class', 'step-slide')
  })

  require('./draw_sheet_music.js')({
    parent: div_local,
    data: options.data
  })

}
