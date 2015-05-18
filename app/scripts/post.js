'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.deletePost = function(post_id,data){
    trace('delete this post yo');
  };

  return module;

})(App || {});
