'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){



  module.like = function(){

  };

  return module;

})(App || {});

$(document).ready(function() {
  var $like = $('.heart');
  $like.on('click', function(){
    trace('yo');
  });
});
