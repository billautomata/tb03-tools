var note_lut = require('./scale_note.js')()

 // [x] build a slide map relating the step idx to to the probability of slide
 // build a state map

module.exports = function HMM () {
  var patterns = []

  var hashmap = {}
  var normalized_hashmap = {}

  var slidehashmap = {}
  var normalized_slidemap = {}

  function load (v) {
    patterns = v
  }
  function train () {
    patterns.forEach(function (p) {
      p.steps.forEach(function (step, step_idx) {
        var key = note_lut[step.note].name
        if (step.state === 0) {
          key = 'rest'
        }
        if (hashmap[key] === undefined) {
          hashmap[key] = {}
        }
        var next_key_idx = step_idx + 1
        if (next_key_idx >= p.steps.length) {
          next_key_idx = next_key_idx - p.steps.length
        }
        var next_key = p.steps[next_key_idx].note
        if (p.steps[next_key_idx].state === 0) {
          next_key = 'rest'
        }
        if (hashmap[key][next_key] === undefined) {
          hashmap[key][next_key] = 0
        }
        hashmap[key][next_key] += 1

        // slide hashmap
        // is this step a slide or not
        if (slidehashmap[step_idx] === undefined) {
          slidehashmap[step_idx] = {
            0: 0,
            1: 0
          }
        }
        if (step.slide === 1) {
          slidehashmap[step_idx]['1'] += 1
        } else {
          slidehashmap[step_idx]['0'] += 1
        }
      })
    })
    // console.log(slidehashmap)
    // console.log(hashmap)
    normalize()
  }
  function normalize () {
    // normalize the note hashamp
    Object.keys(hashmap).forEach(function (note_name) {
      var note_object = hashmap[note_name]
      var sum = 0
      Object.keys(note_object).forEach(function (next_note_name) {
        var next_note_value = note_object[next_note_name]
        sum += next_note_value
      })
      var array_lut = []
      Object.keys(note_object).forEach(function (next_note_name) {
        var next_note_value = note_object[next_note_name]
        array_lut.push({
          key: next_note_name,
          name: note_lut[next_note_name].name,
          value: next_note_value / sum
        })
      })
      array_lut.sort(function (a, b) {
        return a.value - b.value
      })
      array_lut.forEach(function (o, idx) {
        if (idx > 0) {
          o.value += array_lut[idx - 1].value
        }
      })
      normalized_hashmap[note_name] = array_lut
    })

    // normalize the slide hashmap
    Object.keys(slidehashmap).forEach(function (step_index) {
      var slide_object = slidehashmap[step_index]
      var sum = 0
      Object.keys(slide_object).forEach(function (status_name) {
        var v = slide_object[status_name]
        sum += v
      })
      var array_lut = []
      Object.keys(slide_object).forEach(function (status_name) {
        var v = slide_object[status_name]
        array_lut.push({
          key: status_name,
          value: v / sum
        })
      })
      array_lut.sort(function (a, b) {
        return a.value - b.value
      })
      array_lut.forEach(function (o, idx) {
        if (idx > 0) {
          o.value += array_lut[idx - 1].value
        }
      })
      normalized_slidemap[step_index] = array_lut
    })

    // console.log(JSON.stringify(normalized_slidemap, null, 2))
    // console.log(JSON.stringify(normalized_hashmap,null,0))
  }
  function generate_sequence (v) {
    var note_name = note_lut[v].name
    var table = normalized_hashmap[note_name]
    var prediction = Math.random()

    // crawl the table until you find the value that fits between the prediction
    // and the next value
    // prediction 0.5
    // a 0.1
    // b 0.3
    // c 0.6
    // outputs c

    var output = 0
    var running_value = 0
    table.forEach(function (element) {
      if (prediction > running_value && prediction <= element.value) {
        output = element.key
      }
      running_value = element.value
    })
    return output
  }
  function generate_slide (step_index) {
    var table = normalized_slidemap[step_index]
    var prediction = Math.random()

    // crawl the table until you find the value that fits between the prediction
    // and the next value
    // prediction 0.5
    // a 0.1
    // b 0.3
    // c 0.6
    // outputs c

    var output = 0
    var running_value = 0
    table.forEach(function (element) {
      if (prediction > running_value && prediction <= element.value) {
        output = element.key
      }
      running_value = element.value
    })
    return output
  }

  function generate_pattern (input) {
    var output = []
    var slides = []
    while (output.length < 16) {
      var result = generate_sequence(input)
      slides.push(generate_slide(output.length))
      output.push(result)
      input = result
    }
    // console.log(slides)
    // console.log(output)

    var returned_pattern = {
      end_step: '15',
      steps: [],
      triplet: '0'
    }
    output.forEach(function (v, idx) {
      var accent = 0
      var note = v
      if (v === 'rest') {
        note = '48'
      }
      var slide = slides[idx]
      var state = 1
      if (v === 'rest') {
        state = 0
      }
      var step = idx + 1
      returned_pattern.steps.push({
        accent: accent,
        note: note,
        slide: slide,
        state: state,
        step: step
      })
    })
    // console.log(returned_pattern)
    return returned_pattern
  }

  return {
    load: load,
    train: train,
    generate: generate_pattern,
    data: function(){ return hashmap }    
  }
}
