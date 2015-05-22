'use strict';
/*global devourr, $*/

var App = App || {
  // url: 'https://devourapi.herokuapp.com'
  url: 'http://localhost:3000'
};

App = (function(module){

  module.newFollow = function(id){
    trace('I am gonna follow user #' + id);
    var currentUser = 1;
    $.ajax({
      url: 'http://localhost:3000' + '/users/' + id + '/followers',
      type: 'POST',
      data: {
        follower: {
          following_user_id: currentUser,
          user_id: id,
        }
      },
    })
    .done(function() {
      console.log("successful follow");
    })
    .fail(function(response, data) {
      console.log("follow error" + response, data);
      debugger
    });

  };

  return module;

})(App || {});
