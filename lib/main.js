module.exports = function main () {
  console.log('loaded')

  var d3 = require('d3')
  var parse_pattern = require('./parse_pattern_file.js')
  var draw_pattern = require('./draw_pattern.js')

  require('./file_event_listener.js')()

  var file_utils = require('./file_utils.js')

  var disk = file_utils.get_files()
  console.log('disk')

  disk.sort(function (a, b) {
    return a.name < b.name ? -1 : 1
  })

  var patterns = []

  disk.forEach(function (file) {
    if (file.name.indexOf('TRACK') !== -1) {
      // track file
    } else {
      var pattern = parse_pattern(window.atob(file.data.split(',')[1]))
      patterns.push(pattern)
      // require('./draw_pattern.js')({
      //   parent: d3.select('div#patterns'),
      //   name: file.name,
      //   data: pattern
      // })
    }
  })

  console.log(patterns[0])

  console.log(patterns.length)
  var hmm = require('./HMM.js')()
  hmm.load(patterns)
  hmm.train()
  for (var i = 0; i < 32; i++) {
    draw_pattern({
      parent: d3.select('div#patterns'),
      name: 'generated',
      data: hmm.generate(48)
    })
  }

  // require('./scale_note.js')()
}
