"use strict";var trace=function(){for(var a=0;a<arguments.length;a++)console.log(arguments[a])};trace("Welcome to Devourr!");var App=App||{url:"https://devourapi.herokuapp.com"},$header=$("#header"),$container=$("#container"),Router=Backbone.Router.extend({routes:{home:"home",about:"about","users/:id":"user",posts:"posts","posts/:id":"post","new-post":"newpost","edit-post":"editpost","update-post":"updatepost",tasks:"tasks","tasks/:id":"task"},home:function(){$container.empty()},about:function(){$container.empty().load("partials/about.html")},user:function(a){$container.empty(),$.ajax({url:App.url+"/users/"+a,type:"GET"}).done(function(a){console.log(a);var b=Handlebars.compile($("#userTemplate").html());$container.html(b({user:a.user}))}).fail(function(a,b,c){trace("Backbone user: fail!",a,b,c)}).always(function(a){trace(a)})},posts:function(){$container.empty(),$.ajax({url:App.url+"/posts",type:"GET"}).done(function(a){var b=Handlebars.compile($("#postsTemplate").html());$container.html(b({posts:a.posts}))}).fail(function(a,b,c){trace("Backbone posts: fail!",a,b,c)}).always(function(a){trace(a)})},post:function(a){$container.empty(),$.ajax({url:App.url+"/posts/"+a,type:"GET"}).done(function(a){console.log(a);var b=Handlebars.compile($("#postTemplate").html());$container.html(b({post:a.post})),$("#edit-post").on("click",function(){var b=window.location.hash,c=b.lastIndexOf("/"),d=parseInt(b.substring(c+1,b.length));trace("Editing post ID: "+d+"!");var e=a.post;App.editpost(d,e)})}).fail(function(a,b,c){trace("Backbone post: fail!",a,b,c)}).always(function(a){trace(a)})},newpost:function(){$("#container").empty().load("partials/new-post-form.html",function(a,b,c){var d=$("#new-post-form");$("#new-post-form").on("submit",function(a){App.newPostForm(a,d,router)})})}});App.newPostForm=function(a,b,c){a.preventDefault&&a.preventDefault();var d=b.find("input[name='post-title']").val(),e=b.find("input[name='post-description']").val(),f=b.find("input[name='post-picture']").val(),g=b.find("input[name='post-location']").val(),h=1;App.newPostParams(d,e,f,g,h,c)},App.newPostParams=function(a,b,c,d,e,f){$.ajax({url:App.url+"/posts",type:"POST",data:{post:{title:a,description:b,picture:c,location:d,user_id:e}},complete:function(a,b){trace(a,b,"complete post!!")},success:function(a,b,c){f.navigate("posts/"+a.post.id,{trigger:!0}),trace(a,b,c,"successful post!!")},error:function(a,b,c){trace("Backbone newpost: fail",a,b,c)}}).done(function(a){trace(a,"posted post!!")}).fail(function(a,b,c){trace(a,b,c)}).always(function(a){trace(a)})},App.editpost=function(a,b){trace("Post ID came thru on the router: "+a+"!"),$("#container").empty().load("partials/edit-post-form.html",function(a,c,d){trace("data"+b),trace("response"+a);var e=$("#edit-post-form");e.find("input[name='post-title']").val(b.title),e.find("input[name='post-description']").val(b.description),e.find("input[name='post-picture']").val(b.picture),e.find("input[name='post-location']").val(b.location),e.on("submit",function(a,b){App.editPostForm(a,e,router)})})},App.editPostForm=function(a,b,c){trace("Post ID came thru on the editPostForm: "+c+"!");var d=window.location.hash,e=d.lastIndexOf("/"),c=parseInt(d.substring(e+1,d.length));a.preventDefault&&a.preventDefault();var f=b.find("input[name='post-title']").val(),g=b.find("input[name='post-description']").val(),h=b.find("input[name='post-picture']").val(),i=b.find("input[name='post-location']").val(),j=1;App.editPostParams(f,g,h,i,j,c,router)},App.editPostParams=function(a,b,c,d,e,f,g){$.ajax({url:App.url+"/posts/"+f,type:"PATCH",data:{post:{title:a,description:b,picture:c,location:d,user_id:e}},complete:function(a,b){trace(a,b,"complete post!!")},success:function(a,b,c){g.navigate("posts",{trigger:!0}),trace(a,b,c,"successful post!!")},error:function(a,b,c){trace("Backbone editpost: fail",a,b,c)}}).done(function(a){trace(a,"posted!!")}).fail(function(a,b,c){trace(a,b,c),g.navigate("failed edit of post",{trigger:!0})}).always(function(a){trace(a)})};var router=new Router;Backbone.history.start(),$(document).ready(function(){var a=$("#navbar");$header.empty().load("partials/nav.html",function(b,c,d){a.hide()})});