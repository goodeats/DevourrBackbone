'use strict';
/*global devourr, $*/

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

trace('Welcome to Devourr!');

var App = App || {
  url: 'http://localhost:3000/'
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
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      trace('fail!', jqXHR, textStatus, errorThrown);
    }).always(function(response) {
      trace(response);
    });
  },

  posts: function(){
    $container.empty();
    $.ajax({
      url: App.url + '/posts',
      type: 'GET'
    }).done(function(response) {
      var template = Handlebars.compile($('#postsTemplate').html());
      $container.html(template({
        posts: response.posts
      }));
    }).fail(function(jqXHR, textStatus, errorThrown) {
      trace('fail!', jqXHR, textStatus, errorThrown);
    }).always(function(response) {
      trace(response);
    });
  },

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

      $('#edit-post').on('click', function(){
        var locate = window.location.hash;
        var point = locate.lastIndexOf('/');
        var post_id = parseInt(locate.substring(point+1, locate.length));
        trace('Editing post ID: ' + post_id + "!");
        App.editpost(post_id);
      });

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      trace('fail!', jqXHR, textStatus, errorThrown);
    }).always(function(response) {
      trace(response);
    });
  },

  newpost: function(){
    $('#container').empty().load('partials/new-post-form.html', function(response,status,xhr){
      var $form = $('#new-post-form');
      $form.on('submit',function(event){
        App.newPostForm(event,$form,router);
      });
    });
  },

});


App.newPostForm = function(e,form,router){
  if(e.preventDefault) e.preventDefault();
  var title = $(form).find("input[name='post-title']").val();
  var description = $(form).find("input[name='post-description']").val();
  var picture = $(form).find("input[name='post-picture']").val();
  var location = $(form).find("input[name='post-location']").val();
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
      trace(jqXHR, textStatus, "complete post!!");
    },
    success: function(data, textStatus, jqXHR){
      debugger
      router.navigate("posts/" + data.post.id,{trigger: true});
      trace(data,textStatus, jqXHR, "successful post!!");
    },
    error: function(jqXHR,error,exception){
      trace(jqXHR,error,exception);
    },
  }).done(function(response){
    trace(response, "posted post!!");
  }).fail(function(jqXHR, textStatus, thrownError){
    trace(jqXHR, textStatus, thrownError);
    router.navigate("posts",{trigger: true});
  }).always(function(response){
    trace(response);
  });
};

App.editpost = function(post_id){
  trace('Post ID came thru on the router: ' + post_id + "!")
  $('#container').empty().load('partials/edit-post-form.html', function(response,status,xhr){
    var $form = $('#edit-post-form');
    $form.on('submit',function(event,post_id){
      App.editPostForm(event,$form,router);
    });
  });
},

App.editPostForm = function(e,form,post_id){
  trace('Post ID came thru on the editPostForm: ' + post_id + "!");
  var locate = window.location.hash;
  var point = locate.lastIndexOf('/');
  var post_id = parseInt(locate.substring(point+1, locate.length));
  debugger
  if(e.preventDefault) e.preventDefault();
  var title = $(form).find("input[name='post-title']").val();
  var description = $(form).find("input[name='post-description']").val();
  var picture = $(form).find("input[name='post-picture']").val();
  var location = $(form).find("input[name='post-location']").val();
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
      trace(jqXHR, textStatus, "complete post!!");
    },
    success: function(data, textStatus, jqXHR){
      router.navigate("posts",{trigger: true});
      trace(data,textStatus, jqXHR, "successful post!!");
    },
    error: function(jqXHR,error,exception){
      trace(jqXHR,error,exception);
    },
  }).done(function(response){
    trace(response, "posted project!!");
  }).fail(function(jqXHR, textStatus, thrownError){
    trace(jqXHR, textStatus, thrownError);
    router.navigate("posts",{trigger: true});
  }).always(function(response){
    trace(response);
  });
};

var router = new Router();
Backbone.history.start();

$(document).ready(function(){

  var $nav = $('#navbar');
  $header.empty().load('partials/nav.html',function(response,status,xhr){

  });


});
