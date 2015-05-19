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
    '/': 'home',
    'home': 'home',
    'about': 'about',
    'users/:id': 'user',
    'posts': 'posts',
    'posts/:id': 'post',
    'new-post': 'newpost',
  },

  home: function(){
    $container.empty();
  },

  about: function(){
    $container.empty().load('partials/about.html');
  },

  user: function(id){
    App.getUser(id);
  },

  posts: App.getPosts,

  post: function (id){
    App.getPost(id);
  },

  newpost: function(){
    App.newPost();
  },

});

var setClickHandlers = function(){
  $('#edit-post').on('click', function(){
    // var post_id = App.findPostId();
    // var data = response.post;
    trace('edit');
    // App.editpost(App.findPostId(),App.getPost(id).response.post);
  });
};


var router = new Router();
Backbone.history.start();

$(document).ready(function(){

  $header.empty().load('partials/nav.html');
  setClickHandlers();

});
