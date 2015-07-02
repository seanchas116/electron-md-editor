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
