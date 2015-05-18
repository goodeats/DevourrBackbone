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

      var currentUser = 1;

      if (response.likes.length > 0) {
        for (var i = 0; i < response.likes.length; i++) {
          if (response.likes[i].user_id === currentUser){
            App.unlike(post_id, response.likes[i].id);
          }
        };
      } else {
        App.like(post_id);
      }

    })
    .fail(function() {
      console.log("ERROR!: could not determine if this has been liked yet");
    });

  };

  module.like = function(post_id){
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
      console.log("successful like");
    })
    .fail(function(response) {
      console.log("like error" + response);
    });
  };

  module.unlike = function(post_id, like_id){
    $.ajax({
      url: App.url + '/posts/' + post_id + '/likes/' + like_id,
      type: 'DELETE',
    })
    .done(function(response) {
      console.log("successful unlike");
    })
    .fail(function() {
      console.log("unlike error" + response);
    });

  };

  return module;

})(App || {});



$(document).ready(function(){

});
