const url2 = "https://localhost:44308/api";
const genre2 = "genre";
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

fetch(`${url2}/${genre2}`, {
  method: 'GET',
  headers: {
    'Authorization': "bearer " + localStorage.getItem('token')
  }
})
  .then(response => {
    console.log(response.status);
    if (response.status == '200') {
      console.log("Hi");
      window.location.assign("./Admin/Statistics.html");
      // Swal.fire({
      //   position: 'top',
      //   icon: 'success',
      //   title: 'Đăng nhập thành công',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
      // overlayHome.style.display = "none";
      // overlayUser.style.display = "block";
      // Overlay.style.display = "none";
      // OverlayLogin.style.display = "none";
    }
    // else if (response.status == '200') {
    //   // showAlertTimeOut('Đăng nhập thành công');
      
    //   // new sweetAlert('Đăng nhập thành công');
    // }

  })