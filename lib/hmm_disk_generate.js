// load the patterns from disk
// train the hmm
// generate 96 new patterns
// write output files

var fs = require('fs')
var d3 = require('d3')
var parse_pattern_file = require('./parse_pattern_file.js')
var write_pattern_file = require('./write_pattern_file.js')

var hmm = require('./HMM.js')()

var filenames = []
var patterns = []

d3.range(1, 5).forEach(function (pattern_block) {
  d3.range(1, 25).forEach(function (pattern_name) {
    if (pattern_name < 10) {
      pattern_name = '0' + String(pattern_name)
    }
    var filename = ['TB03_PTN', pattern_block, '_', pattern_name, '.PRM'].join('')
    // console.log(filename)
    filenames.push(filename)
    var file_lines = fs.readFileSync(__dirname + '/../PATTERNS/' + filename, 'utf-8')
    var pattern = parse_pattern_file(file_lines)
    // console.log(pattern)
    patterns.push(pattern)
  })
})

hmm.load(patterns)
hmm.train()

filenames.forEach(function (filename) {
  var pattern = hmm.generate(48)
  // console.log(filename)
  var filelines = write_pattern_file(pattern)
  fs.writeFileSync(__dirname + '/../GENERATED_PATTERNS/' + filename, filelines, 'utf-8')
})
