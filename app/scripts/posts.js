'use strict';
/*global devourr, $*/

var App = App || {
  url: 'https://devourapi.herokuapp.com'
};

App = (function(module){

  module.getPosts = function(){
    $container.empty();
    $.ajax({
      url: App.url + '/posts',
      type: 'GET'
    }).done(function(response) {
      var template = Handlebars.compile($('#postsTemplate').html());
      $container.html(template({
        posts: response.posts
      }));

      var $post = $('.post');
      var $like = $('.fa-heart-o');

      $post.css('width','30%');


      $like.on('click', function(){
        var $thisLike = ($(this).attr('id'));;
        var point = $thisLike.lastIndexOf('-');
        var post_id = parseInt($thisLike.substring(point+1, $thisLike.length));
        App.like(post_id);
      });

    }).fail(function(jqXHR, textStatus, errorThrown) {
      trace('Backbone posts: fail!', jqXHR, textStatus, errorThrown);
    }).always(function(response) {
      trace(response);
    });
  };

  return module;

})(App || {});
