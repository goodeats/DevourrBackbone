'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.liked = function(post_id){
    $.ajax({
      url: App.url + '/posts/' + post_id + '/likes',
      type: 'GET',
    })
    .done(function(response) {
      trace('get likes');
      trace(response);
      trace('got the likes');

      if (response.likes.length > 0){
        trace('has likes');
        trace(response.likes);
      } else {
        trace('has no likes');
        trace(response.likes);
      }


    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  };

  module.like = function(post_id){
    trace('yo ' + post_id);
    var user_id = 1;
    $.ajax({
      url: App.url + '/posts/' + post_id + '/likes',
      type: 'POST',
      data: {
        like: {
          count: 1,
          post_id: post_id,
          user_id: user_id
        }
      },
    })
    .done(function(response) {
      console.log("success" + response);
    })
    .fail(function(response) {
      console.log("error" + response);
    })
    .always(function(response) {
      console.log("complete" + response);
    });
  };

  module.unlike = function(){
    trace('yo');
  };

  return module;

})(App || {});
