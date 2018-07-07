/*
  Please add all Javascript code to this file.
*/
// listen for click on sources

// show loading screen
  $("#popUp").removeClass("hidden");

// hide loading screen. Call this function after promise is resolved.
function loader1() {
  var loader = document.getElementById("popUp");
  $("#popUp").addClass("hidden");
};


// dropdown menu functionality. Show articles from selected source.
document.getElementById('dropdown').onchange = function(e) {
  var selectedValue = document.getElementById('dropdown').value,
      options = document.getElementById('dropdown').options;
  for (i = options.length - 1; i >= 0; i -= 1) {
      document.getElementById(options[i].value).style.display =
      (options[i].value === selectedValue ? 'block' : 'none');
  }
}


function getNewsNYT(){
$.ajax({
  url: "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/Technology/7.json?api-key=c815c29fc61d40f3b48e4555736ab7a4",
  method: 'GET',
}).done(function(data) {
  loader1();
  console.log(data);
  data.results.forEach(function(article, i){
    $("#output1").append(`
    <div class="article" data-index="${i}">
    <div class="featuredImage">
      <img src="${article.media["0"]["media-metadata"]["0"].url}">
    </div>
      <div class="articleContent">
        <a href="#">
        <h3 data-url="${article.url}" >${article.title}</h3></a>
        <p>${article.byline}</p>
        <p>${article.abstract}</p>
      </div>
      <div class="impressions">
        ${article.published_date}
      </div>
      <div class="clearfix"></div>
      </div>
    `)
    popUp();

  });
}).fail(function(err) {
  throw err;
});
}
getNewsNYT();


function getNG(){
$.ajax({
  url: "https://newsapi.org/v2/top-headlines?sources=national-geographic&apiKey=a877b1d979274891bc30a1a3bf4f7e31",
  method: 'GET',
}).done(function(data) {
  var articles = data.articles;
  console.log(data);
  for (let i = 0; i < articles.length; i++) {
    $("#output2").append(`
      <div class="article" data-index=${[i]}>
        <div class="featuredImage">
          <img src="${articles[i].urlToImage}">
        </div>
        <div class="articleContent">
          <a href="#" >
            <h3 data-url="${articles[i].url}" >${articles[i].title}</h3></a>
          <p>${articles[i].author}</p>
          <p>${articles[i].description}</p>
        </div>
        <div class="impressions">
          ${articles[i].publishedAt.substring(0,10)}
        </div>
      <div class="clearfix"></div>
      </div>
    `);
  }
  popUp();

}).fail(function(err) {
  throw err;
});
}
getNG();



function getSports(){
$.ajax({
  url: "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=a877b1d979274891bc30a1a3bf4f7e31",
  method: 'GET',
}).done(function(data) {
  var articles = data.articles;
  console.log(data);
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].author == null) {
          articles[i].author = "ESPN";
        };
    $("#output3").append(`
      <div class="article" data-index=${[i]}>
        <div class="featuredImage">
          <img src="${articles[i].urlToImage}">
        </div>
        <div class="articleContent">
          <a class="title" >
          <h3 data-url="${articles[i].url}" >${articles[i].title}</h3></a>
          <p>${articles[i].author}</p>
          <p>${articles[i].description}</p>
        </div>
        <div class="impressions">
          ${articles[i].publishedAt.substring(0,10)}
        </div>
      <div class="clearfix"></div>
      </div>
      `);
    }
  popUp();

}).fail(function(err) {
  throw err;
});
}
getSports();


var links = document.querySelectorAll('.article');
  Array.from(links).forEach(link => {
    link.addEventListener('click', function(event) {
        alert(link);
        event.preventDefault();
    });
    console.log(links);
});

function popUp(){
  var delayInMilliseconds = 1000;
  $(".article h3").on("click", function() {
      document.getElementById("popUp").classList.remove("hidden");
      setTimeout(function() {
        document.getElementById("popUp").classList.remove("loader");
      }, delayInMilliseconds);
    });

  $(".closePopUp").on("click", function() {
      document.getElementById("popUp").classList.add("hidden");
    });

  $(".article").on("click", "h3", function () {
      var articleTitle = $(event.target).html();
      var articleUrl = $(event.target).data("url")
      var popUpChildren = $("#popUp").children(".container");
      //var storyIndex = $(event.target).parents(".article").data("index");
      var description = $(event.target).parents(".articleContent").children("p").eq(1).html();
      popUpChildren.children("h1").html(articleTitle);
      //popUpChildren.children("p").html(articles[storyIndex].description);
      popUpChildren.children("p").html(description);
      var myButton = $(".popUpAction").attr("href", articleUrl);
      var imgLg = $(".featuredImageLg").attr("src", imgUrl);
    });
}


function readMoreButton(){
  $(".popUpAction").on("click", function() {
    document.getElementById("popUp");
  })
}

$(document).ready(function(){
  $("#searchIcon").click(function(){
    $("input").toggleClass("active");
    $("#search").toggleClass("active");
  });
});
