module.exports = function parse_pattern_file_data(file_lines){
  // console.log(file_lines.split('\n'))

  var VERBOSE = false

  var pattern = {
    end_step: 0,
    triplet: 0,
    steps: [
    ]
  }

  if(file_lines.length === 0){
    pattern = null
  } else {
    file_lines.split('\n').forEach(function(line,line_idx){
      if(line.length === 0){
        // pattern = null
        return
      }
      if(line_idx === 0){
        pattern.end_step = line.split(' ')[1]
        if(VERBOSE){
          console.log('end step', line.split(' ')[1])
        }
      } else if (line_idx === 1){
        pattern.triplet = line.split(' ')[1]
        if(VERBOSE){
          console.log('triplet', line.split(' ')[1])
        }

      } else {
        var step = line_idx-1
        var state = line.split(' ')[2].split('=')[1]
        var note = line.split(' ')[3].split('=')[1]
        var accent = line.split(' ')[4].split('=')[1]
        var slide = line.split(' ')[5].split('=')[1]
        pattern.steps.push({
          step: Number(step),
          state: Number(state),
          note: Number(note),
          accent: Number(accent),
          slide: Number(slide)
        })
        if(VERBOSE){
          console.log(pattern.steps[pattern.steps.length-1])
        }
      }
    })
  }
  return pattern
}
