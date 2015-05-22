'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.newFollow = function(id){
    trace('I am gonna follow user #' + id);
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
      trace(response);
      module.showUserFollowers(response);

    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  };

  module.showUserFollowers = function(response){
    var $followers = $('#statFollowers');
    var myFollowers = [];
    for (var i = 0; i < response.follows.length; i++) {
      if (response.follows[i].follow_user_id === App.findUserId()){
        myFollowers.push(response.follows[i])
      }
    };
    $followers.text(myFollowers.length);
  };

  return module;

})(App || {});
