'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.getMyLikes = function(){
    $container.empty();
    $.ajax({
      url: App.url + '/posts',
      type: 'GET'
    }).done(function(response) {
      var template = Handlebars.compile($('#myLikesTemplate').html());
      var currentUser = 1;
      var myLikesArray = [];
      for (var i = 0; i < response.posts.length; i++) {
        if (response.posts[i].likes.length > 0) {
          jQuery.each(response.posts[i].likes, function(j, val) {
            if (val.user_id === currentUser) {
              myLikesArray.push(response.posts[i]);
              $container.html(template({
                posts: myLikesArray
              }));
            }
          });
        }
      };

      var $post = $('.post');
      var $like = $('.fa-heart-o');
      var currentUser = 1;

      $post.css('width','30%');

      App.loadPostsLikes(response);

      $('.fa-heart').on('click', function(){
        var $thisUnlike = ($(this).attr('id'));;
        var point = $thisUnlike.lastIndexOf('-');
        var post_id = parseInt($thisUnlike.substring(point+1, $thisUnlike.length));
        App.checkIfLiked(post_id);

        var likeCount = $(this).parent().children('.statLikes').html();
        var likeCountToInt = (parseInt(likeCount));
        var hiddenLikeCount = $(this).parent().children('.hiddenLikeCounter').html();
        var hiddenLikeCountToInt = parseInt(hiddenLikeCount);

        //toggle hidden like count
        if (hiddenLikeCountToInt === 0){
          hiddenLikeCountToInt++;
          $(this).parent().children('.hiddenLikeCounter').text(hiddenLikeCountToInt);
        } else if (hiddenLikeCountToInt === 1) {
          hiddenLikeCountToInt--;
          $(this).parent().children('.hiddenLikeCounter').text(hiddenLikeCountToInt);
        }

        var likeCounter = function(){
          if (hiddenLikeCountToInt === 0){
            var newCount = likeCountToInt + 1;
          } else {
            var newCount = likeCountToInt - 1;
          }
          return newCount;
        }

        var toggleLikeCount = $(this).parent().children('.statLikes').text(likeCounter());

        $(this).toggleClass('fa-heart fa-heart-o');

      });

      $like.on('click', function(){
        var $thisLike = ($(this).attr('id'));;
        var point = $thisLike.lastIndexOf('-');
        var post_id = parseInt($thisLike.substring(point+1, $thisLike.length));
        App.checkIfLiked(post_id);

        var likeCount = $(this).parent().children('.statLikes').html();
        var likeCountToInt = (parseInt(likeCount));
        var hiddenLikeCount = $(this).parent().children('.hiddenLikeCounter').html();
        var hiddenLikeCountToInt = parseInt(hiddenLikeCount);

        if (hiddenLikeCountToInt === 0){
          hiddenLikeCountToInt++;
          $(this).parent().children('.hiddenLikeCounter').text(hiddenLikeCountToInt);
        } else if (hiddenLikeCountToInt === 1) {
          hiddenLikeCountToInt--;
          $(this).parent().children('.hiddenLikeCounter').text(hiddenLikeCountToInt);
        }

        var likeCounter = function(){
          if (hiddenLikeCountToInt === 0){
            var newCount = likeCountToInt - 1;
          } else {
            var newCount = likeCountToInt + 1;
          }
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
