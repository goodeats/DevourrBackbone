'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.getUser = function(id){
    $container.empty();
    $.ajax({
      url: App.url + '/users/' + id,
      type: 'GET',
    })
    .done(function(response) {
      var template = Handlebars.compile($('#userTemplate').html());
      $container.html(template({
        user: response.user
      }));

      $('#edit-user').on('click', function(){
        var locate = window.location.hash;
        var point = locate.lastIndexOf('/');
        var user_id = parseInt(locate.substring(point+1, locate.length));
        var data = response.user;
        App.edituser(user_id,data);
      });

      var currentUser = 1;

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

      var $like = $('.fa-heart-o');
      $like.on('click', function(){
        var $thisLike = ($(this).attr('id'));
        var point = $thisLike.lastIndexOf('-');
        var post_id = parseInt($thisLike.substring(point+1, $thisLike.length));
        App.liked(post_id);

        var likeCount = $(this).parent().children('.statLikes').html();
        var likeCountToInt = (parseInt(likeCount));
        var hiddenLikeCount = $(this).parent().children('.hiddenLikeCounter').html();
        var hiddenLikeCountToInt = parseInt(hiddenLikeCount);
        var userLikedCount = $('#statLiked').html();
        var userLikedCountToInt = parseInt(userLikedCount);

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

        var userLikeCounter = function(){
          if (hiddenLikeCountToInt === 0){
            var newCount = userLikedCountToInt - 1;
          } else {
            var newCount = userLikedCountToInt + 1;
          }
          return newCount;
        }
        $('#statLiked').text(userLikeCounter());

        var toggleLikeCount = $(this).parent().children('.statLikes').text(likeCounter());

        $(this).toggleClass('fa-heart-o fa-heart');
      });

      $('.fa-heart').on('click', function(){
        var $thisUnlike = ($(this).attr('id'));;
        var point = $thisUnlike.lastIndexOf('-');
        var post_id = parseInt($thisUnlike.substring(point+1, $thisUnlike.length));
        App.liked(post_id);

        var likeCount = $(this).parent().children('.statLikes').html();
        var likeCountToInt = (parseInt(likeCount));
        var hiddenLikeCount = $(this).parent().children('.hiddenLikeCounter').html();
        var hiddenLikeCountToInt = parseInt(hiddenLikeCount);
        var userLikedCount = $('#statLiked').html();
        var userLikedCountToInt = parseInt(userLikedCount);


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

        var userLikeCounter = function(){
          if (hiddenLikeCountToInt === 1){
            var newCount = userLikedCountToInt - 1;
          } else {
            var newCount = userLikedCountToInt + 1;
          }
          return newCount;
        }
        $('#statLiked').text(userLikeCounter());

        var toggleLikeCount = $(this).parent().children('.statLikes').text(likeCounter());

        $(this).toggleClass('fa-heart fa-heart-o');
      });

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      trace('Backbone user: fail!', jqXHR, textStatus, errorThrown);
    });
  };

  module.edituser = function(user_id,data){
    $('#container').empty().load('partials/edit-user-form.html', function(response,status,xhr){
      var $editform = $('#edit-user-form');
      $editform.find("input[name='user-name']").val(data.name);
      $editform.find("input[name='user-username']").val(data.username);
      $editform.find("input[name='user-avatar']").val(data.avatar);
      $editform.find("input[name='user-bio']").val(data.bio);
      $editform.find("input[name='user-website']").val(data.website);
      $editform.find("input[name='user-location']").val(data.location);
      $editform.on('submit',function(event,user_id){
        module.editUserForm(event,$editform,router);
      });
    });
  };

  module.editUserForm = function(e,$editform,user_id){
    var locate = window.location.hash;
    var point = locate.lastIndexOf('/');
    var user_id = parseInt(locate.substring(point+1, locate.length));
    if(e.preventDefault) e.preventDefault();

    var name = $editform.find("input[name='user-name']").val();
    var username = $editform.find("input[name='user-username']").val();
    var avatar = $editform.find("input[name='user-avatar']").val();
    var bio = $editform.find("input[name='user-bio']").val();
    var website = $editform.find("input[name='user-website']").val();
    var location = $editform.find("input[name='user-location']").val();

    module.editUserParams(name, username, avatar, bio, website, location, user_id, router);
  };

  module.editUserParams = function(name, username, avatar, bio, website, location, user_id, router){
    $.ajax({
      url: App.url + '/users/' + user_id,
      type: 'PATCH',
      data: {
        user: {
          id: user_id,
          name: name,
          username: username,
          avatar: avatar,
          bio: bio,
          website: website,
          location: location
        },
      },
      complete: function(jqXHR,textStatus){
        // trace(jqXHR, textStatus, "complete profile update!!");
      },
      success: function(data, textStatus, jqXHR){
        window.location.reload();
        // trace(data,textStatus, jqXHR, "successful update!!");
      },
      error: function(jqXHR,error,exception){
        trace("Backbone edituser: fail",jqXHR,error,exception);
      },
    }).done(function(response){
    }).fail(function(jqXHR, textStatus, thrownError){
      trace(jqXHR, textStatus, thrownError);
      router.navigate("users/" + user_id,{trigger: true});
    });
  };

  return module;

})(App || {});
