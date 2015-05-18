"use strict";var App=App||{url:"https://devourapi.herokuapp.com"};App=function(a){return a.addComment=function(){var b=$("#comment-form");b.on("submit",function(c){a.newCommentForm(c,b,router)})},a.newCommentForm=function(b,c,d){b.preventDefault&&b.preventDefault();var e=$(c).find("input[name='comment-body']").val(),f="",g=1;a.newCommentParams(e,f,g,d)},a.newCommentParams=function(a,b,c,d){var e=window.location.hash,f=e.lastIndexOf("/"),g=parseInt(e.substring(f+1,e.length));$.ajax({url:App.url+"/posts/"+g+"/comments",type:"POST",data:{comment:{body:a,picture:b,user_id:c}},complete:function(a,b){},success:function(a,b,c){window.location.reload()},error:function(a,b,c){trace(a,b,c)}}).done(function(a){}).fail(function(a,b,c){trace(a,b,c),d.navigate("posts",{trigger:!0})})},a.deleteComment=function(a){var b=window.location.hash,c=b.lastIndexOf("/"),d=parseInt(b.substring(c+1,b.length));$.ajax({url:App.url+"/posts/"+d+"/comments/"+a,type:"DELETE"}).done(function(){window.location.reload()}).fail(function(){console.log("error: could not delete comment")})},a}(App||{});var App=App||{url:"https://devourapi.herokuapp.com"};App=function(a){return a.getPosts=function(){$container.empty(),$.ajax({url:App.url+"/posts",type:"GET"}).done(function(a){var b=Handlebars.compile($("#postsTemplate").html());$container.html(b({posts:a.posts}));var c=$(".post"),d=$(".fa-heart-o"),e=1;c.css("width","30%");for(var f=0;f<a.posts.length;f++)a.posts[f].likes.length>0&&jQuery.each(a.posts[f].likes,function(a,b){if(b.user_id===e){var c=$("#like-"+b.post_id);c.replaceWith('<i class="fa fa-heart" id="like-'+b.post_id+'"></i>')}});var g=0;$(".fa-heart").on("click",function(){var a=$(this).attr("id"),b=a.lastIndexOf("-"),c=parseInt(a.substring(b+1,a.length));App.liked(c);var d=$(this).parent().children(".statLikes").html(),e=parseInt(d),f=function(){if(0===g){trace("heres what the counter starts as: "+g);var a=e-1;g++,trace("counter changed to "+g)}else{trace("heres what the counter starts as: "+g);var a=e+1;g--,trace("counter changed to "+g)}return trace("new counter is "+g),a};$(this).parent().children(".statLikes").text(f());$(this).toggleClass("fa-heart fa-heart-o")}),d.on("click",function(){var a=$(this).attr("id"),b=a.lastIndexOf("-"),c=parseInt(a.substring(b+1,a.length));App.liked(c);var d=$(this).parent().children(".statLikes").html(),e=parseInt(d),f=function(){if(0===g){trace("heres what the counter starts as: "+g);var a=e+1;g++,trace("counter changed to "+g)}else{trace("heres what the counter starts as: "+g);var a=e-1;g--,trace("counter changed to "+g)}return trace("new counter is "+g),a};$(this).parent().children(".statLikes").text(f());$(this).toggleClass("fa-heart-o fa-heart")})}).fail(function(a,b,c){trace("Backbone posts: fail!",a,b,c)})},a}(App||{});var App=App||{url:"https://devourapi.herokuapp.com"};App=function(a){return a.deletePost=function(){var a=window.location.hash,b=a.lastIndexOf("/"),c=parseInt(a.substring(b+1,a.length));$.ajax({url:App.url+"/posts/"+c,type:"DELETE"}).done(function(){router.navigate("posts",{trigger:!0})}).fail(function(){console.log("error: could not delete post")})},a}(App||{});var App=App||{url:"https://devourapi.herokuapp.com"};App=function(a){return a.edituser=function(b,c){trace("User ID came thru on the router: "+b+"!"),$("#container").empty().load("partials/edit-user-form.html",function(b,d,e){trace("data"+c),trace("response"+b);var f=$("#edit-user-form");f.find("input[name='user-name']").val(c.name),f.find("input[name='user-username']").val(c.username),f.find("input[name='user-avatar']").val(c.avatar),f.find("input[name='user-bio']").val(c.bio),f.find("input[name='user-website']").val(c.website),f.find("input[name='user-location']").val(c.location),f.on("submit",function(b,c){a.editUserForm(b,f,router)})})},a.editUserForm=function(b,c,d){trace("Post ID came thru on the editPostForm: "+d+"!");var e=window.location.hash,f=e.lastIndexOf("/"),d=parseInt(e.substring(f+1,e.length));b.preventDefault&&b.preventDefault();var g=c.find("input[name='user-name']").val(),h=c.find("input[name='user-username']").val(),i=c.find("input[name='user-avatar']").val(),j=c.find("input[name='user-bio']").val(),k=c.find("input[name='user-website']").val(),l=c.find("input[name='user-location']").val();a.editUserParams(g,h,i,j,k,l,d,router)},a.editUserParams=function(a,b,c,d,e,f,g,h){$.ajax({url:App.url+"/users/"+g,type:"PATCH",data:{user:{id:g,name:a,username:b,avatar:c,bio:d,website:e,location:f}},complete:function(a,b){trace(a,b,"complete profile update!!")},success:function(a,b,c){window.location.reload(),trace(a,b,c,"successful update!!")},error:function(a,b,c){trace("Backbone edituser: fail",a,b,c)}}).done(function(a){trace(a,"updated!!")}).fail(function(a,b,c){trace(a,b,c),h.navigate("failed edit of profile",{trigger:!0})}).always(function(a){trace(a)})},a}(App||{});var App=App||{url:"https://devourapi.herokuapp.com"};App=function(a){return a.liked=function(a){$.ajax({url:App.url+"/posts/"+a+"/likes",type:"GET"}).done(function(b){var c=1;if(b.likes.length>0)for(var d=0;d<b.likes.length;d++)b.likes[d].user_id===c&&App.unlike(a,b.likes[d].id);else App.like(a)}).fail(function(){console.log("ERROR!: could not determine if this has been liked yet")})},a.like=function(a){var b=1;$.ajax({url:App.url+"/posts/"+a+"/likes",type:"POST",data:{like:{count:1,post_id:a,user_id:b}}}).done(function(a){console.log("successful like")}).fail(function(a){console.log("like error"+a)})},a.unlike=function(a,b){$.ajax({url:App.url+"/posts/"+a+"/likes/"+b,type:"DELETE"}).done(function(a){console.log("successful unlike")}).fail(function(){console.log("unlike error"+response)})},a}(App||{}),$(document).ready(function(){});var trace=function(){for(var a=0;a<arguments.length;a++)console.log(arguments[a])};trace("Welcome to Devourr!");var App=App||{url:"https://devourapi.herokuapp.com"},$header=$("#header"),$container=$("#container"),Router=Backbone.Router.extend({routes:{home:"home",about:"about","users/:id":"user",posts:"posts","posts/:id":"post","new-post":"newpost","edit-post":"editpost","update-post":"updatepost",tasks:"tasks","tasks/:id":"task"},home:function(){$container.empty()},about:function(){$container.empty().load("partials/about.html")},user:function(a){$container.empty(),$.ajax({url:App.url+"/users/"+a,type:"GET"}).done(function(a){console.log(a);var b=Handlebars.compile($("#userTemplate").html());$container.html(b({user:a.user})),$("#edit-user").on("click",function(){var b=window.location.hash,c=b.lastIndexOf("/"),d=parseInt(b.substring(c+1,b.length)),e=a.user;App.edituser(d,e)});for(var c=1,d=0;d<a.user.posts.length;d++)a.user.posts[d].likes.length>0&&jQuery.each(a.user.posts[d].likes,function(a,b){if(b.user_id===c){var d=$("#like-"+b.post_id);d.replaceWith('<i class="fa fa-heart" id="like-'+b.post_id+'"></i>')}});var e=$(".fa-heart-o");e.on("click",function(){var a=$(this).attr("id"),b=a.lastIndexOf("-"),c=parseInt(a.substring(b+1,a.length));App.liked(c),$(this).toggleClass("fa-heart-o fa-heart")}),$(".fa-heart").on("click",function(){var a=$(this).attr("id"),b=a.lastIndexOf("-"),c=parseInt(a.substring(b+1,a.length));App.liked(c),$(this).toggleClass("fa-heart fa-heart-o")})}).fail(function(a,b,c){trace("Backbone user: fail!",a,b,c)})},posts:App.getPosts,post:function(a){$container.empty(),$.ajax({url:App.url+"/posts/"+a,type:"GET"}).done(function(a){console.log(a);var b=Handlebars.compile($("#postTemplate").html());$container.html(b({post:a.post})),$(".posts").css("width","50%"),$(".posts").css("left","25%");var c=1;$("#edit-post").on("click",function(){var b=window.location.hash,c=b.lastIndexOf("/"),d=parseInt(b.substring(c+1,b.length)),e=a.post;App.editpost(d,e)}),$("#delete-post").on("click",function(){var b=window.location.hash,c=b.lastIndexOf("/"),d=parseInt(b.substring(c+1,b.length));trace("Deleting post ID: "+d+"!");var e=a.post,f=window.confirm("Do you want to delete this post?");1==f?App.deletePost(d,e):trace("bye")}),$("#comment-submit").on("click",function(){App.addComment()});var d=$(".deleteComment");d.hide();var e=$(".commentsText");e.mouseenter(function(){var a=d.eq($(this).index(e));a.show()}).mouseleave(function(){var a=d.eq($(this).index(e));a.hide()}),d.on("click",function(){var a=e.attr("id"),b=a.lastIndexOf("-"),c=parseInt(a.substring(b+1,a.length));App.deleteComment(c)}),a.post.likes.length>0&&jQuery.each(a.post.likes,function(a,b){if(b.user_id===c){var d=$("#like-"+b.post_id);d.replaceWith('<i class="fa fa-heart" id="like-'+b.post_id+'"></i>')}});var f=$(".fa-heart-o");f.on("click",function(){var a=$(this).attr("id"),b=a.lastIndexOf("-"),c=parseInt(a.substring(b+1,a.length));App.liked(c);var d=$(this).parent().children(".statLikes").html();trace(d),$(this).toggleClass("fa-heart-o fa-heart")}),$(".fa-heart").on("click",function(){var a=$(this).attr("id"),b=a.lastIndexOf("-"),c=parseInt(a.substring(b+1,a.length));App.liked(c);var d=$(this).parent().children(".statLikes").html();trace(d),$(this).toggleClass("fa-heart fa-heart-o")})}).fail(function(a,b,c){trace("Backbone post: fail!",a,b,c)})},newpost:function(){$("#container").empty().load("partials/new-post-form.html",function(a,b,c){var d=$("#new-post-form");$("#new-post-form").on("submit",function(a){App.newPostForm(a,d,router)})})}});App.newPostForm=function(a,b,c){a.preventDefault&&a.preventDefault();var d=b.find("input[name='post-title']").val(),e=b.find("input[name='post-description']").val(),f=b.find("input[name='post-picture']").val(),g=b.find("input[name='post-location']").val(),h=1;App.newPostParams(d,e,f,g,h,c)},App.newPostParams=function(a,b,c,d,e,f){$.ajax({url:App.url+"/posts",type:"POST",data:{post:{title:a,description:b,picture:c,location:d,user_id:e}},complete:function(a,b){},success:function(a,b,c){f.navigate("posts/"+a.post.id,{trigger:!0})},error:function(a,b,c){trace("Backbone newpost: fail",a,b,c)}}).done(function(a){}).fail(function(a,b,c){trace(a,b,c)})},App.editpost=function(a,b){$("#container").empty().load("partials/edit-post-form.html",function(a,c,d){var e=$("#edit-post-form");e.find("input[name='post-title']").val(b.title),e.find("input[name='post-description']").val(b.description),e.find("input[name='post-picture']").val(b.picture),e.find("input[name='post-location']").val(b.location),e.on("submit",function(a,b){App.editPostForm(a,e,router)})})},App.editPostForm=function(a,b,c){var d=window.location.hash,e=d.lastIndexOf("/"),c=parseInt(d.substring(e+1,d.length));a.preventDefault&&a.preventDefault();var f=b.find("input[name='post-title']").val(),g=b.find("input[name='post-description']").val(),h=b.find("input[name='post-picture']").val(),i=b.find("input[name='post-location']").val(),j=1;App.editPostParams(f,g,h,i,j,c,router)},App.editPostParams=function(a,b,c,d,e,f,g){$.ajax({url:App.url+"/posts/"+f,type:"PATCH",data:{post:{title:a,description:b,picture:c,location:d,user_id:e}},complete:function(a,b){},success:function(a,b,c){g.navigate("posts",{trigger:!0})},error:function(a,b,c){trace("Backbone editpost: fail",a,b,c)}}).done(function(a){}).fail(function(a,b,c){trace(a,b,c),g.navigate("failed edit of post",{trigger:!0})})};var router=new Router;Backbone.history.start(),$(document).ready(function(){$("#navbar");$header.empty().load("partials/nav.html",function(a,b,c){})});