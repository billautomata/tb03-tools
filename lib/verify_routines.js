module.exports.verify_lines = verify_lines
module.exports.verify_buffer_bytes = verify_buffer_bytes

function verify_lines(a,b){
  console.log(a.length,b.length)
  var dirty = false
  if(a.length !== b.length){
    dirty = true
  }
  a.forEach(function(l,i){
    if(l !== b[i]){
      dirty = true
    }
  })
  return !dirty
}

function verify_buffer_bytes(a,b){
  a = new Buffer(a)
  b = new Buffer(b)
  var dirty = false
  a.forEach(function(v,idx){
    if(v !== b[idx]){
      dirty = true
    }
  })
  return !dirty
}
