'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.deletePost = function(){
    var locate = window.location.hash;
    var point = locate.lastIndexOf('/');
    var post_id = parseInt(locate.substring(point+1, locate.length));
    $.ajax({
      url: App.url + '/posts/' + post_id,
      type: 'DELETE',
    })
    .done(function() {
      router.navigate("posts",{trigger: true});
    })
    .fail(function() {
      console.log("error: could not delete post");
    });

  }

  return module;

})(App || {});
