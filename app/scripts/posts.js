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

      var counter = 0;
      $('.fa-heart').on('click', function(){
        var $thisUnlike = ($(this).attr('id'));;
        var point = $thisUnlike.lastIndexOf('-');
        var post_id = parseInt($thisUnlike.substring(point+1, $thisUnlike.length));
        App.liked(post_id);

        var likeCount = $(this).parent().children('.statLikes').html();
        var likeCountToInt = (parseInt(likeCount));


        var likeCounter = function(){
          if (counter === 0){
            trace('heres what the counter starts as: ' + counter);
            var newCount = likeCountToInt - 1;
            counter++;
            trace('counter changed to ' + counter);
          } else {
            trace('heres what the counter starts as: ' + counter);
            var newCount = likeCountToInt + 1;
            counter--;
            trace('counter changed to ' + counter);
          }
          trace("new counter is " + counter);
          return newCount;
        }

        var toggleLikeCount = $(this).parent().children('.statLikes').text(likeCounter());

        $(this).toggleClass('fa-heart fa-heart-o');

      });

      $like.on('click', function(){
        var $thisLike = ($(this).attr('id'));;
        var point = $thisLike.lastIndexOf('-');
        var post_id = parseInt($thisLike.substring(point+1, $thisLike.length));
        App.liked(post_id);

        var likeCount = $(this).parent().children('.statLikes').html();
        var likeCountToInt = (parseInt(likeCount));


        var likeCounter = function(){
          if (counter === 0){
            trace('heres what the counter starts as: ' + counter);
            var newCount = likeCountToInt + 1;
            counter++;
            trace('counter changed to ' + counter);
          } else {
            trace('heres what the counter starts as: ' + counter);
            var newCount = likeCountToInt - 1;
            counter--;
            trace('counter changed to ' + counter);
          }
          trace("new counter is " + counter);
          return newCount;
        }

        var toggleLikeCount = $(this).parent().children('.statLikes').text(likeCounter());

        $(this).toggleClass('fa-heart-o fa-heart');

      });

    }).fail(function(jqXHR, textStatus, errorThrown) {
      trace('Backbone posts: fail!', jqXHR, textStatus, errorThrown);
    });
  };

  return module;

})(App || {});
