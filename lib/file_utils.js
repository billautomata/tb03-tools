module.exports.append_file = append_file
module.exports.get_files = get_files
module.exports.save_files = save_files

function append_file (file, data) {
  var files = get_files()
  if (files.filter(function (o) { return o.name === file.name }).length === 0) {
    files.push({
      name: file.name,
      data: data
    })
  } else {
    console.log(['already seen', file.name].join(' '))
  }
  save_files(files)
}
function get_files () {
  var disk = window.localStorage.getItem('disk')
  if (disk === null) {
    disk = []
  } else {
    disk = JSON.parse(disk)
  }
  return disk
}
function save_files (d) {
  window.localStorage.setItem('disk', JSON.stringify(d))
}
