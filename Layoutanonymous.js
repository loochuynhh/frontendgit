const url = 'https://localhost:44308/api';
const Login = 'login';
const signup = 'register';
const genre = 'genre';

var Overlay = document.getElementById("overlay");

var loginButton = document.getElementById("login-button");
var buttonLogin = document.getElementById("buttonLogin");
var OverlayLogin = document.getElementById("overlayLogin");

var buttonSignup = document.getElementById("signup-button");
var signupButton = document.getElementById("signupButton");
var OverlaySignup = document.getElementById("overlaySignup");
var homeLink = document.getElementById('home'); 
var overlayAddFilm = document.getElementById('overlayAddFilm'); 

function handleOutsideClickLogin(event) {
  if (!OverlayLogin.contains(event.target)) {
    OverlayLogin.style.display = "none";
    Overlay.style.display = "none";
    document.removeEventListener("click", handleOutsideClickLogin, true);
  }
}
loginButton.addEventListener("click", function () {
  Overlay.style.display = "block";
  OverlayLogin.style.display = "block";
  OverlaySignup.style.display = "none";
  document.addEventListener("click", handleOutsideClickLogin, true);
});

function handleOutsideClickSignup(event) {
  if (!OverlaySignup.contains(event.target)) {
    OverlaySignup.style.display = "none";
    Overlay.style.display = "none";
    document.removeEventListener("click", handleOutsideClickSignup, true);
  }
}
signupButton.addEventListener("click", function () {
  Overlay.style.display = "block";
  OverlaySignup.style.display = "block";
  OverlayLogin.style.display = "none";
  document.addEventListener("click", handleOutsideClickSignup, true);
});


function showAlert(message) {
  document.getElementById("modal-message").innerHTML = message;
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
  Overlay.style.display = "none";
  OverlayLogin.style.display = "none";
  OverlaySignup.style.display = "none";
  myModal.show();
}
function showSuccess(){
  var alertSuccess = document.querySelector('.alert-success'); 
  alertSuccess.style.display = 'block'; 
  Overlay.style.display = "none";
  OverlaySignup.style.display = "none";
  OverlayLogin.style.display = "none";
  setTimeout(function() {
    alertSuccess.style.display = 'none';
  }, 2000);
}

function showUnsuccess(){
  var alertDanger = document.querySelector('.alert-danger'); 
  alertDanger.style.display = 'block'; 
  setTimeout(function() {
    alertDanger.style.display = 'none';
  }, 2000);
}

document.querySelector('#formSignup').addEventListener('submit', function(event) {
  event.preventDefault(); 
  event.stopPropagation(); 
  if (!event.target.checkValidity()) {
    event.target.classList.add('was-validated');
    return;
  }
  if (document.getElementById("passwordConfirm").value != document.getElementById("password").value) {
    document.getElementById("passwordConfirm").classList.add("is-invalid");
    return;
  } else { document.getElementById("passwordConfirm").classList.remove("is-invalid");}

  var Name = document.getElementById("name").value;
  var Email = document.getElementById("email").value;
  var Address = document.getElementById("address").value;
  var Phone = document.getElementById("phoneNumber").value;
  var gender = document.getElementById("gender").value;
  var Gender = false;
  if(gender.value === "0") {
    Gender = true;
  }
  var Birth = document.getElementById("dateOfBirth").value;
  var Password = document.getElementById("password").value;
  var Role = "USER";

  fetch(`${url}/${signup}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      id: 0,
      name: Name, 
      email: Email, 
      gender: Gender, 
      birth: Birth, 
      phone: Phone, 
      address: Address, 
      password: Password, 
      role: Role
    })
  })
  .then(response => {
    if (response.ok) {
      // showSuccess();
      showAlert("Đăng ký thành công!");
    } else {
      // showUnsuccess();
      showAlert("Đăng ký thất bại!");
    }
  })
  .catch(error => {
    // showUnsuccess();
    showAlert("Đăng ký thất bại!");
    console.error("Lỗi khi đăng ký tài khoản:", error);
  });
});

document.querySelector('#formLogin').addEventListener('submit', function(event) {
  event.preventDefault(); 
  event.stopPropagation(); 
  if (!event.target.checkValidity()) {
    event.target.classList.add('was-validated');
    return;
  }
  const username = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;
  fetch(`${url}/${Login}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: username,
      password: password,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Unauthorized');
      }
      else {
        // 
        
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('token', data.accessToken);
      fetch(`${url}/${genre}`, {
        method: 'GET',
        headers: {
        'Authorization' : "bearer " + localStorage.getItem('token')
        }
      })
      .then(response => {
          if(response.status == '403'){
            window.location.assign("./Layoutuser.html");
          }
          else if(response.status == '200'){
            window.location.assign("./Admin/Index.html");
          }
          
      })
      
    });
});



