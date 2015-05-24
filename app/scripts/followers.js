'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

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
    .done(function() {
      console.log("successful follow");
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("follow error" + jqXHR, textStatus, errorThrown);
    });
  };

  module.getFollowers = function(){
    var user_id = App.findUserId();
    $.ajax({
      url: App.url + '/follows',
      type: 'GET',
    })
    .done(function(response) {
      module.showUserFollowerCount(response);
      module.checkIfFollowing(response);
    })
    .fail(function() {
      console.log("error");
    });
  };

  module.showUserFollowerCount = function(response){
    var $followers = $('#statFollowers');
    var myFollowers = [];
    for (var i = 0; i < response.follows.length; i++) {
      if (response.follows[i].follow_user_id === App.findUserId()){
        myFollowers.push(response.follows[i])
      }
    };
    $followers.text(myFollowers.length);
  };

  module.checkIfFollowing = function(response){
    var currentUser = 1;
    var userFollowers = [];
    for (var i = 0; i < response.follows.length; i++) {
      if (response.follows[i].follow_user_id === App.findUserId()
        && response.follows[i].user_id === currentUser){//lost internet
        var $thisFollow = response.follows[i].id;

        $('#follow-user').text('Unfollow');

        $('#unfollow-user').on('click', function(){
          App.deleteFollow($thisFollow);
        });
      } else {
        $('#follow-user').on('click', function(){
          App.newFollow(module.findUserId());
        });
      }
    };
  };

  module.deleteFollow = function(follow_id){
    var currentUser = 1;
    trace('ima unfollow u');
    $.ajax({
      url: App.url + '/users/' + currentUser + '/follows/' + follow_id,
      type: 'DELETE',
    })
    .done(function() {
      console.log("successful unfollow");
    })
    .fail(function() {
      console.log("error deleting follower");
    });

  };

  return module;

})(App || {});
