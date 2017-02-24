var fs = require('fs')
var parse_pattern_file_data = require('./parse_pattern_file.js')
var write_pattern_file = require('./write_pattern_file.js')
var verify_lines = require('./verify_routines.js').verify_lines
var verify_buffer_bytes = require('./verify_routines.js').verify_buffer_bytes

var file_lines = fs.readFileSync('./input_data/TB03_PTN1_01.PRM').toString()
var test_lines = write_pattern_file(parse_pattern_file_data(file_lines))

console.log('file lines\n',file_lines,'test lines\n',test_lines)

// compare buffers
console.log('line level verify', verify_lines(file_lines.split('\n'),test_lines.split('\n')))
console.log('buffer level verify', verify_buffer_bytes(file_lines, test_lines))
