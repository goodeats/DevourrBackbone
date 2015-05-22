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

  return module;

})(App || {});
