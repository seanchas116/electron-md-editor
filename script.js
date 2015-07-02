var Vue = require("vue");
var marked = require("marked");

new Vue({
  el: '#editor',
  data: {
    input: '# hello'
  },
  filters: {
    marked: marked
  }
});

var remote = require('remote');
var Menu = remote.require('menu');
var template = [
  {
    label: 'Markdown Editor',
  },
  {
    label: 'File',
    submenu: [
      {
        label: "Open",
        click: function () {}
      },
      {
        label: "Save",
        click: function () {}
      },
    ]
  }
];
menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
