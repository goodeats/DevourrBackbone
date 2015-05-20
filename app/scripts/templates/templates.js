'use strict';
/*global devourr, $*/

function getTemplateAjax(path, target, jsonData) {
  var source;
  var template;

  $.ajax({
    url: path, //ex. js/templates/mytemplate.handlebars
    cache: true,
    success: function(data) {
      source    = data;
      template  = Handlebars.compile(source);
      $(target).html(template(jsonData));
    }
  });
}
