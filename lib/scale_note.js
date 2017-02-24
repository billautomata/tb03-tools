var d3 = require('d3')
module.exports = function scale_note () {
  // console.log('hello from scale note.js')
  var note_number_to_note_name = []
  var note_lut = {}
  d3.range(12, 121).forEach(function (v, idx) {
    note_number_to_note_name.push(all_notes[idx % all_notes.length])
    note_lut[v] = {
      midi_number: v,
      name: all_notes[idx % all_notes.length]
    }
  })
  // console.log(note_lut)
  // crawl note_lut and increment the draw index
  var current_draw_index = 0
  var octave = -1
  var isLine = true
  d3.range(12, 121).forEach(function (v, idx) {
    var note = note_lut[v]
    if (note.name === 'C') {
      octave += 1
    }
    note.octave = octave
    note.draw_index = current_draw_index
    if (current_draw_index % 2 === 0) {
      note.isLine = true
    } else {
      note.isLIne = false
    }
    // increment the draw index
    // if the note name is sharp, or E, or B
    if (note.name.indexOf('#') !== -1 || note.name === 'E' || note.name === 'B') {
      current_draw_index += 1
    }
  // console.log(note)
  })
  return note_lut
}

var all_notes = [ 'C', 'C#', 'D', 'D#', 'E', 'F',
  'F#', 'G', 'G#', 'A', 'A#', 'B' ]
