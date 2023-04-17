const url = 'https://localhost:44308';
const Login = 'login';
const signup = 'register';


var Overlay = document.getElementById("overlay");

var loginButton = document.getElementById("login-button");
var buttonLogin = document.getElementById("buttonLogin");
var OverlayLogin = document.getElementById("overlayLogin");

var buttonSignup = document.getElementById("signup-button");
var signupButton = document.getElementById("signupButton");
var OverlaySignup = document.getElementById("overlaySignup");

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


// buttonLogin.addEventListener("click", function () {
//   if (document.getElementById("emailLogin").value == "") {
//     document.getElementById("emailLogin").classList.add("is-invalid");
//     document.getElementById("emailLogin").nextElementSibling.classList.add("d-block");
//     return;
//   } else {
//     document.getElementById("emailLogin").classList.remove("is-invalid");
//     document.getElementById("emailLogin").nextElementSibling.classList.remove("d-block");
//   }
//   if (document.getElementById("passwordLogin").value == "") {
//     document.getElementById("passwordLogin").classList.add("is-invalid");
//     document.getElementById("passwordLogin").nextElementSibling.classList.add("d-block");
//     return;
//   } else {
//     document.getElementById("passwordLogin").classList.remove("is-invalid");
//     document.getElementById("passwordLogin").nextElementSibling.classList.remove("d-block");
//   }
//   const username = document.getElementById("emailLogin").value;
//   const password = document.getElementById("passwordLogin").value;
//   fetch(`${url}/${Login}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       email: username,
//       password: password,
//     }),
//   })
//     .then(response => {
//       console.log(response.status.toString());
//       if (!response.ok) {
//         throw new Error('Unauthorized');
//       }
//       else {
//         window.location.assign("./Layoutuser.html");
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(data.accessToken);
//       localStorage.setItem('token', data.accessToken);
//     });
// })

document.querySelector('#formSiginup').addEventListener('submit', function(event) {
  event.preventDefault(); 
  event.stopPropagation(); 
  if (!event.target.checkValidity()) {
    event.target.classList.add('was-validated');
    return;
  }
  if (document.getElementById("passwordConfirm").value != document.getElementById("password").value) {
    document.getElementById("passwordConfirm").classList.add("is-invalid");
    return;
  } else {
    document.getElementById("passwordConfirm").classList.remove("is-invalid");
  }
  fetch(`${url}/${signup}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, name, email, gender, birth, phone, address, password, role })
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
        window.location.assign("./Layoutuser.html");
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('token', data.accessToken);
    });
});