var Vue = require("vue");
var marked = require("marked");
var fs = require("fs");

var openFile = null;

var editor = new Vue({
  el: '#editor',
  data: {
    input: '# hello',
    filename: null
  },
  filters: {
    marked: marked
  }
});

var remote = require('remote');
var dialog = remote.require("dialog");

function openFileDialog() {
  dialog.showOpenDialog(function (filenames) {
    console.log(filenames);
    var filename = filenames[0];
    if (filename) {
      fs.readFile(filename, "utf8", function (err, data) {
        if (err) { throw err; }
        editor.$data.filename = filename;
        editor.$data.input = data;
      });
    }
  });
}

function saveFileDialog() {
  function save(filename) {
    fs.writeFile(filename, editor.$data.input, function (err) {
      if (err) { throw err; }
      alert("Saved!");
    });
  }

  if (editor.$data.filename) {
    save(editor.$data.filename);
  } else {
    dialog.showSaveDialog(function (filename) {
      if (filename) {
        save(filename);
        editor.$data.filename = filename;
      }
    });
  }
}

var Menu = remote.require('menu');
var template = [
  {
    label: 'Markdown Editor',
    submenu: [
      {
        label: "Quit",
        accelerator: "Command+Q",
        selector: 'terminate:'
      }
    ]
  },
  {
    label: 'File',
    submenu: [
      {
        label: "Open",
        accelerator: "Command+O",
        click: openFileDialog
      },
      {
        label: "Save",
        accelerator: "Command+S",
        click: saveFileDialog
      },
    ]
  }
];
menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
