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
    'projects': 'projects', //http://localhost:9000/#/projects
    'projects/:id': 'project',  //http://localhost:9000/#/projects/1
    'new-project': 'newProject',//http://localhost:9000/#/new-project
    'update-project': 'updateProject',//http://localhost:9000/#/update-project
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
  }

});

var router = new Router();
Backbone.history.start();

$(document).ready(function(){

  var $nav = $('#navbar');
  $header.empty().load('partials/nav.html',function(response,status,xhr){

  });


});
