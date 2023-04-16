const url = 'https://localhost:44308';
const Login = 'login';
const signup = 'register';

function login() {
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
      console.log(response.status.toString());
      if (!response.ok) {
          throw new Error('Unauthorized');
      }
      else 
      { 
        window.location.assign("./Layoutuser.html"); 
      }
      return response.json();
  })
  .then(data => {
    console.log(data.accessToken);
    localStorage.setItem('token', data.accessToken);
  });
}

var Overlay = document.getElementById("overlay");

var loginButton = document.getElementById("login-button");
var signupButton = document.getElementById("signupButton");
    
var OverlayLogin = document.getElementById("overlayLogin");
var OverlaySignup = document.getElementById("overlaySignup");

function handleOutsideClickLogin(event) {
  if (!OverlayLogin.contains(event.target)) {
    OverlayLogin.classList.add("d-none");
    Overlay.classList.add("d-none");
    console.log("2");
    console.log(Overlay.style.display.toString());
    document.removeEventListener("click", handleOutsideClickLogin, true);
    console.log("3");
    console.log(Overlay.style.display.toString());

  }
}
loginButton.addEventListener("click", function() {
  Overlay.style.display = "block";
  OverlayLogin.style.display = "block";
  OverlaySignup.style.display = "none";
  console.log("1");
  console.log(Overlay.style.display.toString());
  document.addEventListener("click", handleOutsideClickLogin, true);
  console.log("4");
  console.log(Overlay.style.display.toString());

},50);

function handleOutsideClickSignup(event) {
  if (!OverlaySignup.contains(event.target)) {
    OverlaySignup.classList.add("d-none");
    Overlay.classList.add("d-none");
    console.log("b");
    document.removeEventListener("click", handleOutsideClickSignup, true);
  }
}
signupButton.addEventListener("click", function() {
    Overlay.style.display = "block";
    OverlaySignup.style.display = "block";
    OverlayLogin.style.display = "none";
    console.log("2");
    document.addEventListener("click", handleOutsideClickSignup, true);
},50);

var buttonLogin = document.getElementById("buttonLogin");
    buttonLogin.addEventListener("click", function() {
      login();
    })
var buttonSignup = document.getElementById("signup-button");
buttonSignup.addEventListener("click", function(){
  const id = 0;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phoneNumber").value;
  const address = document.getElementById("address").value;
  const Gender = document.getElementById("gender").value;
  const birth = document.getElementById("dateOfBirth").value;
  const password = document.getElementById("password").value;
  const role = "USER";
  var gender = true;
  if(Gender === "Nu"){
    gender = false;
  }
  if(document.getElementById("name").value == ""){
    document.getElementById("name").classList.add("is-invalid");
    document.getElementById("name").nextElementSibling.classList.add("d-block");
    return;
  }else{
    document.getElementById("name").classList.remove("is-invalid");
    document.getElementById("name").nextElementSibling.classList.remove("d-block");
  }

  if(document.getElementById("email").value == ""){
    document.getElementById("email").classList.add("is-invalid");
    document.getElementById("email").nextElementSibling.classList.add("d-block");
    return;
  }else{
    document.getElementById("email").classList.remove("is-invalid");
    document.getElementById("email").nextElementSibling.classList.remove("d-block");
  }

  if(document.getElementById("phoneNumber").value == ""){
    document.getElementById("phoneNumber").classList.add("is-invalid");
    document.getElementById("phoneNumber").nextElementSibling.classList.add("d-block");
    return;
  }else{
    document.getElementById("phoneNumber").classList.remove("is-invalid");
    document.getElementById("phoneNumber").nextElementSibling.classList.remove("d-block");
  }

  if(document.getElementById("dateOfBirth").value == ""){
    document.getElementById("dateOfBirth").classList.add("is-invalid");
    document.getElementById("dateOfBirth").nextElementSibling.classList.add("d-block");
    return;
  }else{
    document.getElementById("dateOfBirth").classList.remove("is-invalid");
    document.getElementById("dateOfBirth").nextElementSibling.classList.remove("d-block");
  }

  if(document.getElementById("password").value == ""){
    document.getElementById("password").classList.add("is-invalid");
    document.getElementById("password").nextElementSibling.classList.add("d-block");
    return;
  }else{
    document.getElementById("password").classList.remove("is-invalid");
    document.getElementById("password").nextElementSibling.classList.remove("d-block");
  }

  if(document.getElementById("passwordConfirm").value == "" || document.getElementById("passwordConfirm").value != document.getElementById("password").value){
    document.getElementById("passwordConfirm").classList.add("is-invalid");
    document.getElementById("passwordConfirm").nextElementSibling.classList.add("d-block");
    return;
  }else{
    document.getElementById("passwordConfirm").classList.remove("is-invalid");
    document.getElementById("passwordConfirm").nextElementSibling.classList.remove("d-block");
  }

  
  fetch(`${url}/${signup}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id, name, email, gender, birth, phone, address, password, role })
  })
  .then(response => {
    if (response.ok) {
      alert("Đăng ký tài khoản thành công!");
      window.location.assign("./Layoutuser.html");
      await(1);
      localStorage.setItem('token', data.token);
      console.log(data.token);
    } else {
      alert("Đăng ký tài khoản thất bại!");
    }
  })
  .catch(error => {
    console.error("Lỗi khi đăng ký tài khoản:", error);
  });
});
