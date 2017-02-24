module.exports = function () {
  document.getElementById('files').addEventListener('change', handleFileSelect, false)
}

var file_utils = require('./file_utils.js')

function handleFileSelect (evt) {
  var files = evt.target.files // FileList object

  console.log(files)
  console.log(evt)

  // files is a FileList of File objects. List some properties.
  var output = []
  for (var i = files.length - 1, f; f = files[i]; i--) {
    var reader = new FileReader()
    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        // console.log(e.target.result)
        var fileData = e.target.result
        // console.log(window.m = fileData)
        // console.log(theFile)
        file_utils.append_file(theFile, fileData)
      // Render thumbnail.
      // var span = document.createElement('span')
      // span.innerHTML = ['<img class="thumb" src="', e.target.result,
      //                   '" title="', escape(theFile.name), '"/>'].join('')
      // document.getElementById('list').insertBefore(span, null)
      }
    })(f)
    // Read in the image file as a data URL.
    reader.readAsDataURL(f)

    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
      f.size, ' bytes, last modified: ',
      f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
      '</li>')
  }
  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>'
}
