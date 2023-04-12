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
        username: username, 
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
      return response.text();
  })
  .then(data => {
    console.log(data);
    localStorage.setItem('token', data);
  });
}
function Signup() {
  const id = 0;
  const name = document.getElementById("firstName").value + document.getElementById("lastName").value;
  const username = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phoneNumber").value;
  const address = document.getElementById("address").value;
  const Gender = document.getElementById("gender").value;
  const birth = document.getElementById("dateOfBirth").value;
  const password = document.getElementById("password").value;
  var gender = true;
  if(Gender === "Nu"){
    gender = false;
  }
  fetch(`${url}/${signup}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, name, email, gender, birth, phone, address, username, password })
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
}
function testlogin(){
  window.location.assign("./Layoutuser.html");
  // await(1);
}
function testsignup(){
  window.location.assign("./Layoutuser.html");
  // await(1);
}
var Overlay = document.getElementById("overlay");

var loginButton = document.getElementById("login-button");
var signupButton = document.getElementById("signupButton");
    
var OverlayLogin = document.getElementById("overlayLogin");
var OverlaySignup = document.getElementById("overlaySignup");
    // Thêm sự kiện click vào button
    loginButton.addEventListener("click", function() {
      // Hiển thị overlay
      Overlay.style.display = "block";
      OverlayLogin.style.display = "block";
      OverlaySignup.style.display = "none";
    });
    signupButton.addEventListener("click", function() {
        // Hiển thị overlay
        Overlay.style.display = "block";
        OverlaySignup.style.display = "block";
        OverlayLogin.style.display = "none";
    });

var buttonLogin = document.getElementById("buttonLogin");
    buttonLogin.addEventListener("click", function() {
      login();
      // testlogin();
    })
var buttonSignup = document.getElementById("signup-button");
    buttonSignup.addEventListener("click", function(){
      Signup();
      // testsignup();
    });