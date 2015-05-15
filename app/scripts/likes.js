'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.like = function(id){
    trace('yo ' + id);
    $.ajax({
      url: App.url + '/posts/' ,
      type: 'default GET (Other values: POST)',
      dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
      data: {param1: 'value1'},
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  };

  return module;

})(App || {});
