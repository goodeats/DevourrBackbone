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

      //load full red hearts for my liked posts
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


      $('.fa-heart').on('click', function(){
        var $thisUnlike = ($(this).attr('id'));;
        var point = $thisUnlike.lastIndexOf('-');
        var post_id = parseInt($thisUnlike.substring(point+1, $thisUnlike.length));
        // trace($(this));
        App.liked(post_id);
        $(this).toggleClass('fa-heart fa-heart-o');
        // $(this).removeClass('fa-heart').addClass('fa-heart-o');
        // trace($(this));
      });

      $like.on('click', function(){
        var $thisLike = ($(this).attr('id'));;
        var point = $thisLike.lastIndexOf('-');
        var post_id = parseInt($thisLike.substring(point+1, $thisLike.length));
        App.liked(post_id);
        // trace($(this));
        $(this).toggleClass('fa-heart-o fa-heart');
        // $(this).removeClass('fa-heart-o').addClass('fa-heart');
        // trace($(this));
      });

    }).fail(function(jqXHR, textStatus, errorThrown) {
      trace('Backbone posts: fail!', jqXHR, textStatus, errorThrown);
    }).always(function(response) {
      trace(response);
    });
  };

  return module;

})(App || {});
