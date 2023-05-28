$(function(){
  $("#header").load("header.html",function(){ 
    $("#homepage-link").removeClass("text-white");
    $("#homepage-link").addClass("text-secondary");
  });  
  $("#footer").load("footer.html"); 
}) 
window.onload = loadSlide();
function loadSlide() {
  fetch("https://localhost:44308/api/film/showing")
    .then(response => response.json())
    .then(data => {
      var length = data.length;
      if (length > 5) length = 5;
      for (var i = 1; i <= length; i++) {
        var id = "slide-img" + i;
        document.getElementById(id).src = data[i - 1].adPosterUrl;
      }
    })
    .catch(error => console.error(error));
    $("#header-homepage").addClass("text-secondary"); 
}
function showmore() {
  window.location.href = "/LayoutFilm.html";
}