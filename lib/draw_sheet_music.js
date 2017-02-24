var d3 = require('d3')

var note_lut = require('./scale_note.js')()

var DEBUG = false

module.exports = function sheet_music (options) {
  // options.parent
  // options.data

  var div_local = options.parent.append('div')

  var w = 350
  var h = 150

  var midi_note_range = [12, 121]

  var note_range_to_display = [24, 80]
  var draw_index_range_to_display = [ note_lut[note_range_to_display[0]].draw_index, note_lut[note_range_to_display[1]].draw_index ]

  var scale_x = d3.scaleLinear().domain([0, 16]).range([(w * 0.2), (w - (w * 0.1))])
  var scale_x_all_notes = d3.scaleLinear().domain([0, 108]).range([(w * 0.25), (w - (w * 0.1))])
  var scale_y = d3.scaleLinear().domain(draw_index_range_to_display).range([h - 10, 10])

  // console.log('scale y 1', )

  var svg = div_local.append('svg')
    .attr('viewBox', [0, 0, w, h].join(' '))
    .attr('preserveAspectRatio', 'xMidYMid')
    .attr('width', '100%')
    // .style('background-color', 'rgb(200,200,200)')

  var staff_lines = [ 43, 47, 50, 53, 57, 64, 67, 71, 74, 77 ]

  // for each midi note
  d3.range(midi_note_range[0], midi_note_range[1]).forEach(function (note_value, display_idx) {
    var note = note_lut[note_value]
    if (note.name.indexOf('#') === -1) {
      if (staff_lines.indexOf(note_value) !== -1) {
        svg.append('line')
          .attr('id', '_' + note_value)
          .attr('x1', scale_x(-5))
          .attr('y1', scale_y(note.draw_index))
          .attr('x2', scale_x(16))
          .attr('y2', scale_y(note.draw_index))
          .attr('stroke', 'black')
          .attr('stroke-width', '0.5px')
      }
      if (DEBUG) {
        if (note.isLine === true) {
          svg.append('line')
            .attr('id', '_' + note_value)
            .attr('x1', scale_x_all_notes(display_idx))
            .attr('y1', scale_y(note.draw_index))
            .attr('x2', scale_x_all_notes(display_idx) + 15)
            .attr('y2', scale_y(note.draw_index))
            .attr('stroke', 'red')
            .attr('stroke-width', '0.2px')
        }
        svg.append('text').text([note_value, note.name, note.octave].join(' '))
          .attr('x', scale_x_all_notes(display_idx))
          .attr('y', scale_y(note.draw_index))
          .attr('dy', '0.33em')
          .style('font-size', '5px')
      }
    }
  })

  var font_height = (scale_y(1) - scale_y(2)) * 10

  svg.append('text').text('𝄞')
    .attr('x', 6)
    .attr('y', scale_y(note_lut[71].draw_index))
    .attr('dy', '0.33em')
    .attr('font-size', font_height + 'px')

  svg.append('text').text('𝄢')
    .attr('x', 6)
    .attr('y', scale_y(note_lut[50].draw_index))
    .attr('dy', '0.33em')
    .attr('font-size', font_height + 'px')

  // draw lines
  d3.range(midi_note_range[0], midi_note_range[1]).forEach(function (note_value, display_idx) {
    var note = note_lut[note_value]
    if (note.isLine === true) {
    }
  })

  var bottom = staff_lines[0]
  var top = staff_lines[staff_lines.length - 1]
  options.data.steps.forEach(function (step, step_idx) {
    // console.log(step)
    var note = note_lut[step.note]

    if (step.state === 1) {
      if (step.note < bottom) {
        for (var i = Number(step.note); i < bottom; i++) {
          if (note_lut[i].isLine) {
            svg.append('line')
              .attr('x1', scale_x(step_idx) - (scale_x(1) * 0.07))
              .attr('y1', scale_y(note_lut[i].draw_index))
              .attr('x2', scale_x(step_idx) + (scale_x(1) * 0.07))
              .attr('y2', scale_y(note_lut[i].draw_index))
              .attr('stroke', 'black')
              .attr('stroke-width', '0.5px')
          }
        }
      }
      // note head

      var g_notehead = svg.append('g').attr('transform', [
        'translate(',
        scale_x(step_idx),
        scale_y(note_lut[step.note].draw_index),
        ')'
      ].join(' '))

      g_notehead.append('ellipse')
        .attr('transform', 'rotate(-33)')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('rx', '3px')
        .attr('ry', '2.1px')
        .attr('fill', 'black')
        .attr('stroke', 'none')

      // draw sharps
      if (note_lut[step.note].name.indexOf('#') !== -1) {
        g_notehead.append('text')
          .text('#')
          .attr('x', -12)
          .attr('y', '0.33em')
          .attr('fill', 'black')
      }

      // flag
      var flag_dir = 1
      if (Number(step.note) < 55) {
      } else {
        flag_dir = -1
      }
      // flag
      svg.append('line')
        .attr('x1', scale_x(step_idx) + (2 * flag_dir))
        .attr('y1', scale_y(note_lut[step.note].draw_index) + 0.5)
        .attr('x2', scale_x(step_idx) + (2 * flag_dir))
        .attr('y2', scale_y(note_lut[step.note].draw_index + (5 * flag_dir)))
        .attr('stroke', 'black')
        .attr('stroke-width', '1px')
      // flag
      svg.append('line')
        .attr('x1', scale_x(step_idx) + (8 * flag_dir))
        .attr('y1', scale_y(note_lut[step.note].draw_index + (4 * flag_dir)))
        .attr('x2', scale_x(step_idx) + (2 * flag_dir))
        .attr('y2', scale_y(note_lut[step.note].draw_index + (5 * flag_dir)))
        .attr('stroke', 'black')
        .attr('stroke-width', '1px')
      svg.append('line')
        .attr('x1', scale_x(step_idx) + (8 * flag_dir))
        .attr('y1', scale_y(note_lut[step.note].draw_index + (3.5 * flag_dir)))
        .attr('x2', scale_x(step_idx) + (2 * flag_dir))
        .attr('y2', scale_y(note_lut[step.note].draw_index + (4.5 * flag_dir)))
        .attr('stroke', 'black')
        .attr('stroke-width', '1px')

      if (step.accent === 1) {
        svg.append('text').text('>')
          .attr('x', scale_x(step_idx))
          .attr('y', scale_y(note_lut[step.note].draw_index - (2 * flag_dir)))
          .attr('dy', '0.33em')
          .attr('text-anchor', 'middle')
          .style('font-size', '10px')
      }
    } else {
      // rest
      svg.append('circle')
        .attr('cx', scale_x(step_idx))
        .attr('cy', scale_y(note_lut[50].draw_index))
        .attr('r', '2px')
        .attr('fill', 'red')
        .attr('stroke', 'none')
    }
  })
}
