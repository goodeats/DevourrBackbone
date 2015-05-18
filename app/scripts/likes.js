'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  var currentUser = 1;

  module.loadPostsLikes = function(response){
    for (var i = 0; i < response.posts.length; i++) {
      if (response.posts[i].likes.length > 0) {
        jQuery.each(response.posts[i].likes, function(i, val) {
          if (val.user_id === currentUser) {
            var $myLikes = $('#like-' + val.post_id);
            $myLikes.replaceWith('<i class="fa fa-heart" id="like-' + val.post_id + '"></i>');
          }
        });
      }
    };
  };

  module.loadPostLike = function(response){
    //load full red hearts for my liked posts
    if (response.post.likes.length > 0) {
      jQuery.each(response.post.likes, function(i, val) {
        if (val.user_id === currentUser) {
          var $myLikes = $('#like-' + val.post_id);
          $myLikes.replaceWith('<i class="fa fa-heart" id="like-' + val.post_id + '"></i>');
        }
      });
    }
  };

  module.loadUserLikes = function(response){
    //load full red hearts for my liked posts
    for (var i = 0; i < response.user.posts.length; i++) {
      if (response.user.posts[i].likes.length > 0) {
        jQuery.each(response.user.posts[i].likes, function(i, val) {
          if (val.user_id === currentUser) {
            var $myLikes = $('#like-' + val.post_id);
            $myLikes.replaceWith('<i class="fa fa-heart" id="like-' + val.post_id + '"></i>');
          }
        });
      }
    };
  };

  module.checkIfLiked = function(post_id){
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
