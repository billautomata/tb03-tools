var test = require('tape')
var fs = require('fs')

test('parse pattern file', function(t){
  t.plan(8)

  var pattern_file_lines = fs.readFileSync(__dirname + '/../PATTERNS/TB03_PTN1_01.PRM', 'utf-8')
  t.ok(pattern_file_lines, 'pattern file lines load')

  var parse_pattern_file = require('../lib/parse_pattern_file.js')
  t.ok(parse_pattern_file, 'parse pattern file imports')
  t.equal(parse_pattern_file(''), null, 'returns null when passed bad info')

  var pattern_object = parse_pattern_file(pattern_file_lines)
  t.ok(pattern_object.end_step, 'end step field present')
  t.ok(pattern_object.triplet, 'triplet field present')
  t.ok(pattern_object.steps, 'steps field present')
  t.ok(Array.isArray(pattern_object.steps), 'steps is an array')
  t.equal(pattern_object.steps.length, 16, 'steps is a 16 element array')
})

test('write pattern file', function(t){
  t.plan(5)

  var pattern_file_lines = fs.readFileSync(__dirname + '/../PATTERNS/TB03_PTN1_01.PRM', 'utf-8')
  t.ok(pattern_file_lines, 'pattern file lines load')

  var parse_pattern_file = require('../lib/parse_pattern_file.js')
  var write_pattern_file = require('../lib/write_pattern_file.js')
  t.ok(parse_pattern_file, 'parse pattern file imports')
  t.ok(write_pattern_file, 'write pattern file imports')

  var pattern_object = parse_pattern_file(pattern_file_lines)
  t.ok(pattern_object, 'pattern object returns')

  var written_file_lines = write_pattern_file(pattern_object)
  t.equal(written_file_lines, pattern_file_lines, 'written file lines match imported file lines')

})
