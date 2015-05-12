"use strict";var trace=function(){for(var a=0;a<arguments.length;a++)console.log(arguments[a])};trace("Welcome to Devourr!");var App=App||{url:"http://localhost:3000/"},$header=$("#header"),$container=$("#container"),Router=Backbone.Router.extend({routes:{home:"home",about:"about","users/:id":"user",posts:"posts","posts/:id":"post","new-post":"newpost","update-post":"updatepost",tasks:"tasks","tasks/:id":"task"},home:function(){$container.empty()},about:function(){$container.empty().load("partials/about.html",function(a,b,c){})},posts:function(){$container.empty(),$.ajax({url:App.url+"/posts",type:"GET"}).done(function(a){var b=Handlebars.compile($("#postsTemplate").html());$container.html(b({posts:a.posts}))}).fail(function(a,b,c){trace("fail!",a,b,c)}).always(function(a){trace(a)})},post:function(a){$container.empty(),$.ajax({url:App.url+"/posts/"+a,type:"GET"}).done(function(a){console.log(a);var b=Handlebars.compile($("#postTemplate").html());$container.html(b({post:a.post}))}).fail(function(a,b,c){trace("fail!",a,b,c)}).always(function(a){trace(a)})},user:function(a){$container.empty(),$.ajax({url:App.url+"/users/"+a,type:"GET"}).done(function(a){console.log(a);var b=Handlebars.compile($("#userTemplate").html());$container.html(b({user:a.user}))}).fail(function(a,b,c){trace("fail!",a,b,c)}).always(function(a){trace(a)})},newpost:function(){$("#container").empty().load("partials/post-form.html",function(a,b,c){var d=$("#project-form");d.on("submit",function(a){App.newPostForm(a,d,router)})})}}),router=new Router;Backbone.history.start(),App.newPostForm=function(a,b,c){a.preventDefault&&a.preventDefault();var d=$(b).find("input[name='post-title']").val(),e=$(b).find("input[name='post-description']").val(),f=$(b).find("input[name='post-picture']").val(),g=$(b).find("select[name='post-location']").val(),h=1;App.newPostParams(d,e,f,g,h,c)},App.newPostParams=function(a,b,c,d,e,f){$.ajax({url:App.url+"/posts",type:"POST",data:{post:{title:a,description:b,picture:c,location:d}},complete:function(a,b){trace(a,b,"complete project!!")},success:function(a,b,c){f.navigate("projects",{trigger:!0}),trace(a,b,c,"successful post!!")},error:function(a,b,c){trace(a,b,c)}}).done(function(a){trace(a,"posted project!!")}).fail(function(a,b,c){trace(a,b,c),f.navigate("projects",{trigger:!0})}).always(function(a){trace(a)})},$(document).ready(function(){$("#navbar");$header.empty().load("partials/nav.html",function(a,b,c){})});