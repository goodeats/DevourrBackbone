'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  var follow_id;

  module.getFollowers = function(){
    var user_id = App.findUserId();
    $.ajax({
      url: App.url + '/follows',
      type: 'GET',
    })
    .done(function(response) {
      module.findUserFollowers(response);
    })
    .fail(function() {
      console.log("error getting all follows");
    });
  };

  module.findUserFollowers = function(response){
    var $followers = $('#statFollowers');
    var myFollowers = [];
    for (var i = 0; i < response.follows.length; i++) {
      if (response.follows[i].follow_user_id === App.findUserId()){
        myFollowers.push(response.follows[i])
      }
    };
    $followers.text(myFollowers.length);
    module.checkIfFollowing(myFollowers);
  };

  module.checkIfFollowing = function(response){
    var currentUser = 1;
    var status = false;
    if (response.length > 0){
      for (var i = 0; i < response.length; i++) {
        if (response[i].user_id === currentUser){
          follow_id = response[i].id;
          status = true;
        }
      }
    }
    module.followStatus(status);
  };

  module.followStatus = function(status){
    if (status){
      $('#follow-user').hide();
      $('#unfollow-user').show();
    } else {
      $('#unfollow-user').hide();
      $('#follow-user').show();
    }
    module.toggleFollow();
  };

  module.toggleFollow = function(){

    $('#unfollow-user').unbind('click');
    $('#unfollow-user').on('click', function(){
      App.deleteFollow();
      $('#unfollow-user').toggle();
      $('#follow-user').toggle();
    });

    $('#follow-user').on('click', function(){
      App.newFollow(module.findUserId());
      $('#unfollow-user').toggle();
      $('#follow-user').toggle();
    });
  };

  module.newFollow = function(id){
    var currentUser = 1;
    $.ajax({
      url: App.url + '/users/' + currentUser + '/follows',
      type: 'POST',
      data: {
        follow: {
          follow_user_id: id,
          user_id: currentUser,
        }
      },
    })
    .done(function(response) {
      console.log("successful follow");
      follow_id = response.follow.id;
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("follow error" + jqXHR, textStatus, errorThrown);
    });
  };

  module.deleteFollow = function(){
    var currentUser = 1;
    $.ajax({
      url: App.url + '/users/' + currentUser + '/follows/' + follow_id,
      type: 'DELETE',
    })
    .done(function() {
      console.log("successful unfollow");
    })
    .fail(function() {
      console.log("error deleting follow");
    });

  };

  return module;

})(App || {});
