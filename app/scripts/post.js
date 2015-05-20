'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.findPostId = function(){
    var locate = window.location.hash;
    var point = locate.lastIndexOf('/');
    return parseInt(locate.substring(point+1, locate.length));
  }

  module.getPost = function(id){
    trace('this post yo');
    $container.empty();
    $.ajax({
      url: App.url + '/posts/' + id,
      type: 'GET',
    })
    .done(function(response) {
      var template = Handlebars.compile($('#postTemplate').html());
      $container.html(template({
        post: response.post
      }));

      $('.posts').css('width','50%');
      $('.posts').css('left','25%');
      var currentUser = 1;

      $('#edit-post').on('click', function(){
        App.editpost(module.findPostId(), response.post);
      });

      $('#delete-post').on('click', function(){
        var confirm = window.confirm("Do you want to delete this post?");
        if(confirm == true){
          App.deletePost(module.findPostId(), response.post);
        }
      });

      $('#comment-submit').on('click', function(){
        App.addComment();
      });

      var $deleteComment = $('.deleteComment');
      $deleteComment.hide();
      var $comment = $('.commentsText');

      $comment.mouseenter(function(){
        var $thisDelete = $(this).children('p').children('span');
        trace('parent: ' + $thisDelete.parent());

        $thisDelete.show().on('click', function(){
          var locate = $(this).attr('id');
          var point = locate.lastIndexOf('-');
          var comment_id = parseInt(locate.substring(point+1, locate.length));
          App.deleteComment(comment_id);
        });
      }).mouseleave(function(){
        var $thisDelete = $(this).children('p').children('span');
        $thisDelete.hide();
      });

      App.loadPostLike(response);

      var $like = $('.fa-heart-o');
      $like.on('click', function(){
        var $thisLike = ($(this).attr('id'));
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

      $('.fa-heart').on('click', function(){
        var $thisUnlike = ($(this).attr('id'));;
        var point = $thisUnlike.lastIndexOf('-');
        var post_id = parseInt($thisUnlike.substring(point+1, $thisUnlike.length));
        App.liked(post_id);
        var likeCount = $(this).parent().children('.statLikes').html();

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

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      trace('Backbone post: fail!', jqXHR, textStatus, errorThrown);
    });



  };

  module.newPost = function(){
    $('#container').empty().load('partials/new-post-form.html', function(response,status,xhr){
      var $newform = $('#new-post-form');
      $('#new-post-form').on('submit',function(event){
        module.newPostForm(event,$newform,router);
      });
    });
  };

  module.newPostForm = function(e,$newform,router){
    if(e.preventDefault) e.preventDefault();
    var title = $newform.find("input[name='post-title']").val();
    var description = $newform.find("input[name='post-description']").val();
    var picture = $newform.find("input[name='post-picture']").val();
    var location = $newform.find("input[name='post-location']").val();
    var user_id = 1;//localStorage.getItem('currentUser');

    module.newPostParams(title, description, picture, location, user_id, router);
  };

  module.newPostParams = function(title, description, picture, location, user_id, router){
    $.ajax({
      url: App.url + '/posts',
      type: 'POST',
      data: {
        post: {
          title: title,
          description: description,
          picture: picture,
          location: location,
          user_id: user_id
        },
      },
      complete: function(jqXHR,textStatus){
        // trace(jqXHR, textStatus, "complete post!!");
      },
      success: function(data, textStatus, jqXHR){
        router.navigate("posts/" + data.post.id,{trigger: true});
        // trace(data,textStatus, jqXHR, "successful post!!");
      },
      error: function(jqXHR,error,exception){
        trace("Backbone newpost: fail",jqXHR,error,exception);
      },
    }).done(function(response){
      // trace(response, "posted post!!");
    }).fail(function(jqXHR, textStatus, thrownError){
      trace(jqXHR, textStatus, thrownError);
    });
  };

  module.editpost = function(post_id,data){
    $('#container').empty().load('partials/edit-post-form.html', function(response,status,xhr){
      var $editform = $('#edit-post-form');
      $editform.find("input[name='post-title']").val(data.title);
      $editform.find("input[name='post-description']").val(data.description);
      $editform.find("input[name='post-picture']").val(data.picture);
      $editform.find("input[name='post-location']").val(data.location);
      $editform.on('submit',function(event,post_id){
        module.editPostForm(event,$editform,router);
      });
    });
  },

  module.editPostForm = function(e,$editform,post_id){
    var locate = window.location.hash;
    var point = locate.lastIndexOf('/');
    var post_id = parseInt(locate.substring(point+1, locate.length));
    if(e.preventDefault) e.preventDefault();
    var title = $editform.find("input[name='post-title']").val();
    var description = $editform.find("input[name='post-description']").val();
    var picture = $editform.find("input[name='post-picture']").val();
    var location = $editform.find("input[name='post-location']").val();
    var user_id = 1;//localStorage.getItem('currentUser');

    module.editPostParams(title, description, picture, location, user_id, post_id, router);
  };

  module.editPostParams = function(title, description, picture, location, user_id, post_id, router){
    $.ajax({
      url: App.url + '/posts/' + post_id,
      type: 'PATCH',
      data: {
        post: {
          title: title,
          description: description,
          picture: picture,
          location: location,
          user_id: user_id
        },
      },
      complete: function(jqXHR,textStatus){
        // trace(jqXHR, textStatus, "complete post!!");
      },
      success: function(data, textStatus, jqXHR){
        router.navigate("posts",{trigger: true});
        // trace(data,textStatus, jqXHR, "successful post!!");
      },
      error: function(jqXHR,error,exception){
        trace("Backbone editpost: fail",jqXHR,error,exception);
      },
    }).done(function(response){
      // trace(response, "posted!!");
    }).fail(function(jqXHR, textStatus, thrownError){
      trace(jqXHR, textStatus, thrownError);
      router.navigate("failed edit of post",{trigger: true});
    });
  };

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

$(document).ready(function(){



});
