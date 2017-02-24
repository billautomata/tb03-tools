module.exports = function main(){
  console.log('loaded')

  var d3 = require('d3')
  var parse_pattern = require('./parse_pattern_file.js')

  require('./file_event_listener.js')()

  var file_utils = require('./file_utils.js')

  var disk = file_utils.get_files()
  console.log(disk)

  disk.forEach(function (file) {
    if (file.name.indexOf('TRACK') !== -1) {
      // track file
    } else {
      require('./draw_pattern.js')({
        parent: d3.select('div#patterns'),
        name: file.name,
        data: parse_pattern(window.atob(file.data.split(',')[1]))
      })
    }
  })
  require('./scale_note.js')()
}
