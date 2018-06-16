/*
  Please add all Javascript code to this file.
*/
$.get("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json", function(results){
  console.log(results);
  results.data.feed.forEach(function(result){
    $("#main").append("<li>"+result.content.title+"</li>")
  })
})
