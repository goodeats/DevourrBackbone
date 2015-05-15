'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.getPosts = function(){
    $container.empty();
    $.ajax({
      url: App.url + '/posts',
      type: 'GET'
    }).done(function(response) {
      var template = Handlebars.compile($('#postsTemplate').html());
      $container.html(template({
        posts: response.posts
      }));

      var $post = $('.post');
      var $like = $('.fa-heart-o');
      var currentUser = 1;

      $post.css('width','30%');


      for (var i = 0; i < response.posts.length; i++) {
        if (response.posts[i].likes.length > 0) {

          jQuery.each(response.posts[i].likes, function(i, val) {
            trace('has been liked by user: ' + val.user_id);

            if (val.user_id === currentUser) {
              trace('find your heart');
              $like.css('background','blue');
            }

          });

        }
      };




      $like.on('click', function(){
        var $thisLike = ($(this).attr('id'));;
        var point = $thisLike.lastIndexOf('-');
        var post_id = parseInt($thisLike.substring(point+1, $thisLike.length));
        App.liked(post_id);
      });

    }).fail(function(jqXHR, textStatus, errorThrown) {
      trace('Backbone posts: fail!', jqXHR, textStatus, errorThrown);
    }).always(function(response) {
      trace(response);
    });
  };

  return module;

})(App || {});
