'use strict';
/*global devourr, $*/

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

trace('Welcome to Devourr!');

var App = App || {
  url: 'https://devourapi.herokuapp.com'
},
$header = $('#header'),
$container = $('#container'),

Router = Backbone.Router.extend({
  routes: {
    'home': 'home',  //http://localhost:9000/#/home
    'about': 'about',
    // 'users': 'users', // http://localhost:9000/users
    'users/:id': 'user',  //http://localhost:9000/#/users/1
    'posts': 'posts', //http://localhost:9000/#/posts
    'posts/:id': 'post',  //http://localhost:9000/#/posts/1
    'new-post': 'newpost',//http://localhost:9000/#/new-post
    'edit-post': 'editpost',//http://localhost:9000/#/edit-post
    'update-post': 'updatepost',//http://localhost:9000/#/update-post
    'tasks': 'tasks', //http://localhost:9000/#/tasks
    'tasks/:id': 'task',  //http://localhost:9000/#/tasks/1
  },

  home: function(){
    $container.empty();
  },

  about: function(){
    $container.empty().load('partials/about.html');
  },

  user: function(id){
    $container.empty();
    $.ajax({
      url: App.url + '/users/' + id,
      type: 'GET',
    })
    .done(function(response) {
      console.log(response);
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
        $(this).toggleClass('fa-heart-o fa-heart');
      });

      $('.fa-heart').on('click', function(){
        var $thisUnlike = ($(this).attr('id'));;
        var point = $thisUnlike.lastIndexOf('-');
        var post_id = parseInt($thisUnlike.substring(point+1, $thisUnlike.length));
        App.liked(post_id);
        $(this).toggleClass('fa-heart fa-heart-o');
      });

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      trace('Backbone user: fail!', jqXHR, textStatus, errorThrown);
    });
  },

  posts: App.getPosts,

  post: function (id){
    $container.empty();
    $.ajax({
      url: App.url + '/posts/' + id,
      type: 'GET',
    })
    .done(function(response) {
      console.log(response);
      var template = Handlebars.compile($('#postTemplate').html());
      $container.html(template({
        post: response.post
      }));

      $('.posts').css('width','50%');
      $('.posts').css('left','25%');
      var currentUser = 1;

      $('#edit-post').on('click', function(){
        var locate = window.location.hash;
        var point = locate.lastIndexOf('/');
        var post_id = parseInt(locate.substring(point+1, locate.length));
        var data = response.post;
        App.editpost(post_id,data);
      });

      $('#delete-post').on('click', function(){
        var locate = window.location.hash;
        var point = locate.lastIndexOf('/');
        var post_id = parseInt(locate.substring(point+1, locate.length));
        trace('Deleting post ID: ' + post_id + "!");
        var data = response.post;

        var confirm = window.confirm("Do you want to delete this post?");
        if(confirm == true){
          App.deletePost(post_id,data);
        } else {
         trace("bye");
        }

      });

      $('#comment-submit').on('click', function(){
        App.addComment();
      });

      var $deleteComment = $('.deleteComment');
      $deleteComment.hide();
      var $comment = $('.commentsText');
      $comment.mouseenter(function(){
        var $thisDelete = $deleteComment.eq($(this).index($comment));
        $thisDelete.show();
      }).mouseleave(function(){
        var $thisDelete = $deleteComment.eq($(this).index($comment));
        $thisDelete.hide();
      });

      $deleteComment.on('click', function(){
        var locate = $comment.attr('id');
        var point = locate.lastIndexOf('-');
        var comment_id = parseInt(locate.substring(point+1, locate.length));
        App.deleteComment(comment_id);
      });

      //load full red hearts for my liked posts
      if (response.post.likes.length > 0) {
        jQuery.each(response.post.likes, function(i, val) {
          if (val.user_id === currentUser) {
            var $myLikes = $('#like-' + val.post_id);
            $myLikes.replaceWith('<i class="fa fa-heart" id="like-' + val.post_id + '"></i>');
          }
        });
      }

      var $like = $('.fa-heart-o');
      $like.on('click', function(){
        var $thisLike = ($(this).attr('id'));
        var point = $thisLike.lastIndexOf('-');
        var post_id = parseInt($thisLike.substring(point+1, $thisLike.length));
        App.liked(post_id);
        var likeCount = $(this).parent().children('.statLikes').html();
        trace(likeCount);
        // debugger
        $(this).toggleClass('fa-heart-o fa-heart');
      });

      $('.fa-heart').on('click', function(){
        var $thisUnlike = ($(this).attr('id'));;
        var point = $thisUnlike.lastIndexOf('-');
        var post_id = parseInt($thisUnlike.substring(point+1, $thisUnlike.length));
        App.liked(post_id);
        var likeCount = $(this).parent().children('.statLikes').html();
        trace(likeCount);
        // debugger
        $(this).toggleClass('fa-heart fa-heart-o');
      });

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      trace('Backbone post: fail!', jqXHR, textStatus, errorThrown);
    });
  },

  newpost: function(){
    $('#container').empty().load('partials/new-post-form.html', function(response,status,xhr){
      var $newform = $('#new-post-form');
      $('#new-post-form').on('submit',function(event){
        App.newPostForm(event,$newform,router);
      });
    });
  },

});

App.newPostForm = function(e,$newform,router){
  if(e.preventDefault) e.preventDefault();
  var title = $newform.find("input[name='post-title']").val();
  var description = $newform.find("input[name='post-description']").val();
  var picture = $newform.find("input[name='post-picture']").val();
  var location = $newform.find("input[name='post-location']").val();
  var user_id = 1;//localStorage.getItem('currentUser');

  App.newPostParams(title, description, picture, location, user_id, router);
};

App.newPostParams = function(title, description, picture, location, user_id, router){
  $.ajax({
    url: App.url + '/posts',
    type: 'POST',
    data: {
      post: {
        title: title,
        description: description,
        picture: picture,
        location: location,
        user_id: user_id
      },
    },
    complete: function(jqXHR,textStatus){
      // trace(jqXHR, textStatus, "complete post!!");
    },
    success: function(data, textStatus, jqXHR){
      router.navigate("posts/" + data.post.id,{trigger: true});
      // trace(data,textStatus, jqXHR, "successful post!!");
    },
    error: function(jqXHR,error,exception){
      trace("Backbone newpost: fail",jqXHR,error,exception);
    },
  }).done(function(response){
    // trace(response, "posted post!!");
  }).fail(function(jqXHR, textStatus, thrownError){
    trace(jqXHR, textStatus, thrownError);
  });
};

App.editpost = function(post_id,data){
  $('#container').empty().load('partials/edit-post-form.html', function(response,status,xhr){
    var $editform = $('#edit-post-form');
    $editform.find("input[name='post-title']").val(data.title);
    $editform.find("input[name='post-description']").val(data.description);
    $editform.find("input[name='post-picture']").val(data.picture);
    $editform.find("input[name='post-location']").val(data.location);
    $editform.on('submit',function(event,post_id){
      App.editPostForm(event,$editform,router);
    });
  });
},

App.editPostForm = function(e,$editform,post_id){
  var locate = window.location.hash;
  var point = locate.lastIndexOf('/');
  var post_id = parseInt(locate.substring(point+1, locate.length));
  if(e.preventDefault) e.preventDefault();
  var title = $editform.find("input[name='post-title']").val();
  var description = $editform.find("input[name='post-description']").val();
  var picture = $editform.find("input[name='post-picture']").val();
  var location = $editform.find("input[name='post-location']").val();
  var user_id = 1;//localStorage.getItem('currentUser');

  App.editPostParams(title, description, picture, location, user_id, post_id, router);
};

App.editPostParams = function(title, description, picture, location, user_id, post_id, router){
  $.ajax({
    url: App.url + '/posts/' + post_id,
    type: 'PATCH',
    data: {
      post: {
        title: title,
        description: description,
        picture: picture,
        location: location,
        user_id: user_id
      },
    },
    complete: function(jqXHR,textStatus){
      // trace(jqXHR, textStatus, "complete post!!");
    },
    success: function(data, textStatus, jqXHR){
      router.navigate("posts",{trigger: true});
      // trace(data,textStatus, jqXHR, "successful post!!");
    },
    error: function(jqXHR,error,exception){
      trace("Backbone editpost: fail",jqXHR,error,exception);
    },
  }).done(function(response){
    // trace(response, "posted!!");
  }).fail(function(jqXHR, textStatus, thrownError){
    trace(jqXHR, textStatus, thrownError);
    router.navigate("failed edit of post",{trigger: true});
  });
};

var router = new Router();
Backbone.history.start();

$(document).ready(function(){

  var $nav = $('#navbar');
  $header.empty().load('partials/nav.html',function(response,status,xhr){
    // $nav.hide();
  });

});
