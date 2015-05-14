'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.addComment = function(){
    var $form = $('#comment-form');
    $form.on('submit',function(event){
      module.newCommentForm(event,$form,router);
    });
  };

  module.newCommentForm = function(e,form,router){
    if(e.preventDefault) e.preventDefault();
    var body = $(form).find("input[name='comment-body']").val();
    var picture = "";
    var user_id = 1;//current user
    module.newCommentParams(body, picture, user_id, router);
  };

  module.newCommentParams = function(body, picture, user_id, router){
    var locate = window.location.hash;
    var point = locate.lastIndexOf('/');
    var post_id = parseInt(locate.substring(point+1, locate.length));
    // var user = parseInt(localStorage.getItem('currentUser'));
    $.ajax({
      url: App.url + '/posts/' + post_id + '/comments',
      type: 'POST',
      data: {
        comment: {
          body: body,
          picture: picture,
          user_id: user_id,
        }
      },
      complete: function(jqXHR,textStatus){
        trace(jqXHR, textStatus, "complete comment!!");
      },
      success: function(data, textStatus, jqXHR){
        // router.navigate("posts",{trigger: true});
        window.location.reload(); //would prefer not to have to reload, but this will do for now
        trace(data,textStatus, jqXHR, "successful comment!!");
      },
      error: function(jqXHR,error,exception){
        trace(jqXHR,error,exception);
      },
    }).done(function(response){
      trace(response, "posted comment!!");
    }).fail(function(jqXHR, textStatus, thrownError){
      trace(jqXHR, textStatus, thrownError);
      router.navigate("posts",{trigger: true});
    }).always(function(response){
      trace(response);
    });
  };

  return module;

})(App || {});
