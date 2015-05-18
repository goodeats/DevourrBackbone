'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.findPostId = function(thisPost){
    var $thisLike = thisPost.attr('id');
    var point = $thisLike.lastIndexOf('-');
    return parseInt($thisLike.substring(point+1, $thisLike.length));
  };

  module.findPostLikes = function(thisLike){
    return parseInt(thisLike.parent().children('.statLikes').html());
  };

  module.findHiddenLikeToggle = function(thisLike){
    return parseInt(thisLike.parent().children('.hiddenLikeCounter').html());
  };

  module.hiddenToggleStatus = function(thisToggle, thisLike){
    if (thisToggle === 0){
      var status = thisToggle++;
      thisLike.parent().children('.hiddenLikeCounter').text(thisToggle);
    } else if (thisToggle === 1) {
      var status = thisToggle--;
      thisLike.parent().children('.hiddenLikeCounter').text(thisToggle);
    }
    return status;
  };

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

      App.loadUserLikes(response);

      var $like = $('.fa-heart-o');
      $like.on('click', function(){
        var post_id = module.findPostId($(this));
        App.checkIfLiked(post_id);
        $(this).toggleClass('fa-heart-o fa-heart');

        var currentUserLikeCount = module.findPostLikes($(this));
        var hiddenLikeToggle = module.findHiddenLikeToggle($(this));
        var toggleStatus = module.hiddenToggleStatus(module.findHiddenLikeToggle($(this)), $(this));

        var likeCounter = function(){
          if (toggleStatus === 0){
            var newCount = currentUserLikeCount + 1;
          } else {
            var newCount = currentUserLikeCount - 1;
          }
          return newCount;
        }
        $(this).parent().children('.statLikes').text(likeCounter());

        var userTotalLikeCount = parseInt($('#statLiked').html());
        var userLikeCounter = function(){
          if (toggleStatus === 0){
            var newCount = userTotalLikeCount + 1;
          } else {
            var newCount = userTotalLikeCount - 1;
          }
          return newCount;
        }
        $('#statLiked').text(userLikeCounter());


      });

      var $unlike = $('.fa-heart');
      $unlike.on('click', function(){
        var post_id = module.findPostId($(this));
        App.checkIfLiked(post_id);

        // the remaining code updates the page without the need to refresh
        $(this).toggleClass('fa-heart-o fa-heart');

        var currentUserLikeCount = module.findPostLikes($(this));
        var hiddenLikeToggle = module.findHiddenLikeToggle($(this));
        var toggleStatus = module.hiddenToggleStatus(module.findHiddenLikeToggle($(this)), $(this));

        var likeCounter = function(){
          if (toggleStatus === 0){
            var newCount = currentUserLikeCount - 1;
          } else {
            var newCount = currentUserLikeCount + 1;
          }
          return newCount;
        }
        $(this).parent().children('.statLikes').text(likeCounter());

        var userTotalLikeCount = parseInt($('#statLiked').html());
        var userLikeCounter = function(){
          if (toggleStatus === 1){
            var newCount = userTotalLikeCount + 1;
          } else {
            var newCount = userTotalLikeCount - 1;
          }
          return newCount;
        }
        $('#statLiked').text(userLikeCounter());

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
