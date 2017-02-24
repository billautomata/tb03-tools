module.exports = function write_pattern_file(pattern){
  var file_lines = []
  file_lines.push(['END_STEP\t=', pattern.end_step].join(' '))
  file_lines.push(['TRIPLET\t=', pattern.triplet].join(' '))
  pattern.steps.forEach(function(step,step_idx){
    file_lines.push(['STEP '+(step_idx+1)+'\t=',
      'STATE=' + step.state,
      'NOTE=' + step.note,
      'ACCENT=' + step.accent,
      'SLIDE=' + step.slide
    ].join(' '))
  })
  file_lines.push('')
  return file_lines.join('\n')
}
