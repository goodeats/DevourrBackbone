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
    'users': 'users', // http://localhost:9000/users
    'users/:id': 'user',  //http://localhost:9000/#/users/1
    'posts': 'posts', //http://localhost:9000/#/posts
    'posts/:id': 'post',  //http://localhost:9000/#/posts/1
    'new-post': 'newpost',//http://localhost:9000/#/new-post
    'update-post': 'updatepost',//http://localhost:9000/#/update-post
    'tasks': 'tasks', //http://localhost:9000/#/tasks
    'tasks/:id': 'task',  //http://localhost:9000/#/tasks/1
  },

  home: function(){
    $container.empty();
  },

  about: function(){
    $container.empty().load('partials/about.html',function(response,status,xhr){
    // var template = Handlebars.compile($('#aboutTemplate').html());
    // debugger
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
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      trace('fail!', jqXHR, textStatus, errorThrown);
    }).always(function(response) {
      trace(response);
    });
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

  }

});

var router = new Router();
Backbone.history.start();

$(document).ready(function(){

  var $nav = $('#navbar');
  $header.empty().load('partials/nav.html',function(response,status,xhr){

  });


});
