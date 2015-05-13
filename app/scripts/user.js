'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.edituser = function(user_id,data){
    trace('User ID came thru on the router: ' + user_id + "!")
    $('#container').empty().load('partials/edit-user-form.html', function(response,status,xhr){
      trace('data' + data);
      trace('response' + response);
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
    trace('Post ID came thru on the editPostForm: ' + user_id + "!");
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
        trace(jqXHR, textStatus, "complete profile update!!");
      },
      success: function(data, textStatus, jqXHR){
        window.location.reload();
        trace(data,textStatus, jqXHR, "successful update!!");
      },
      error: function(jqXHR,error,exception){
        trace("Backbone edituser: fail",jqXHR,error,exception);
      },
    }).done(function(response){
      trace(response, "updated!!");
    }).fail(function(jqXHR, textStatus, thrownError){
      trace(jqXHR, textStatus, thrownError);
      router.navigate("failed edit of profile",{trigger: true});
    }).always(function(response){
      trace(response);
    });
  };

  return module;

})(App || {});
