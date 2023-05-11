const url = 'https://localhost:44308/api';
const Login = 'login';
const signup = 'register';
const genre = 'genre';
const Users = `users`;
const Password = "";
const token = localStorage.getItem('token');

var Overlay = document.getElementById("overlay");

var loginButton = document.getElementById("login-button");
var buttonLogin = document.getElementById("buttonLogin");
var OverlayLogin = document.getElementById("overlayLogin");

var buttonSignup = document.getElementById("signup-button");
var signupButton = document.getElementById("signupButton");
var OverlaySignup = document.getElementById("overlaySignup");
var homeLink = document.getElementById('home'); 
var overlayAddFilm = document.getElementById('overlayAddFilm'); 
var overlayUser = document.getElementById("overlayUser");
var overlayHome = document.getElementById("overlayHome");
var OverlayInfor = document.getElementById("overlayInfo");
var dropdowninfo = document.getElementById("info");
var dropdownlogout = document.getElementById("logout");
var passwordChange = document.getElementById("passwordChangeInfo");
var changePasswordForm = document.getElementById("changePasswordFormInfo");
var oldPassword = document.getElementById("oldPasswordInfo");
var newPassword = document.getElementById("newPasswordInfo");
var newPasswordConfirm = document.getElementById("newPasswordConfirmInfo");
var passwordLogin = document.getElementById('passwordLogin');

window.onload = loadSlide();

function loadSlide(){ 
    fetch("https://localhost:44308/api/film/showing")
    .then(response => response.json())
    .then(data => {
      document.getElementById("slide-img1").src = data[0].adPosterUrl;
      document.getElementById("slide-img2").src = data[1].adPosterUrl;
      document.getElementById("slide-img3").src = data[2].adPosterUrl;
      document.getElementById("slide-img4").src = data[3].adPosterUrl;
      document.getElementById("slide-img5").src = data[4].adPosterUrl;
    })
    .catch(error => console.error(error));
} 
function showmore(){
  window.location.href = "/LayoutFilm.html";
}
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

// function showOverlay(title, message) {
//   // Lấy thẻ modal
//   var modal = $('#exampleModal')
//   // Đặt tiêu đề cho modal
//   modal.find('.modal-title').text(title)
//   // Đặt thông báo cho modal
//   modal.find('.modal-body #overlay-message').text(message)
//   // Hiển thị modal
//   modal.modal('show')
//   // Tự động đóng overlay sau 2 giây
//   setTimeout(function() {
//     modal.modal('hide')
//   }, 2000);
// }
function showOverlay(title, message) {
  // Lấy thẻ modal
  var modal = document.getElementById('exampleModal')
  // Đặt tiêu đề cho modal
  modal.querySelector('.modal-title').textContent = title
  // Đặt thông báo cho modal
  modal.querySelector('.modal-body #overlay-message').textContent = message
  // Hiển thị modal
  modal.classList.add('show')
  modal.style.display = 'block'
  modal.removeAttribute('aria-hidden')
  setTimeout(function(){
    modal.classList.remove('show')
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
  }, 2000)
}
function showAlert(message) {
  document.getElementById("modal-message").innerHTML = message;
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
  myModal.show();
}
function showAlertVer2(message) {
  document.getElementById("modal-message").innerHTML = message;
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
  Overlay.style.display = "none";
  OverlayLogin.style.display = "none";
  OverlaySignup.style.display = "none";
  myModal.show();
}

function showAlertTimeOut(message) {
  document.getElementById("modal-message").innerHTML = message;
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
  Overlay.style.display = "none";
  OverlayLogin.style.display = "none";
  OverlaySignup.style.display = "none";
  myModal.show();
  setTimeout(function(){
    myModal.hide();
  }, 800);
}
function showAlertTimeOutLogin(message) {
  document.getElementById("modal-message").innerHTML = message;
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
  Overlay.style.display = "block";
  OverlayLogin.style.display = "block";
  OverlaySignup.style.display = "none";
  myModal.show();
  setTimeout(function(){
    myModal.hide();
  }, 800);
}
function showAlertTimeOutSignup(message) {
  document.getElementById("modal-message").innerHTML = message;
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
  Overlay.style.display = "block";
  OverlayLogin.style.display = "none";
  OverlaySignup.style.display = "block";
  myModal.show();
  setTimeout(function(){
    myModal.hide();
  }, 1000);
}
function showAlertTimeOutInfo(message) {
  document.getElementById("modal-message").innerHTML = message;
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
  Overlay.style.display = "block";
  OverlayLogin.style.display = "none";
  OverlaySignup.style.display = "none";
  OverlayInfor.style.display = "block";
  myModal.show();
  setTimeout(function(){
    myModal.hide();
  }, 800);
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

function isValidPhoneNumber(phoneNumber) {
  // Xác thực theo chuẩn số điện thoại Việt Nam
  const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{8}$/;
  return regex.test(phoneNumber);
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

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  var Password = document.getElementById("password").value;
  if (!event.target.checkValidity()) {
    event.target.classList.add('was-validated');
    return;
  }
  if (passwordRegex.test(Password)) {
  } else {
    showAlertTimeOutSignup('Mật khẩu tối thiểu 6 kí tự và có cả chữ lẫn số');
    return;
  }
  
  var Name = document.getElementById("name").value;
  var Email = document.getElementById("email").value;
  var Address = document.getElementById("address").value;
  var Phone = document.getElementById("phoneNumber").value;
  var gender = document.getElementById("gender").value;
  var Gender = false;
  if(gender.value === "0") {
    Gender = true;
  }
  if (!isValidPhoneNumber(Phone)) {
    showAlertTimeOutSignup('Số điện thoại không hợp lệ!');
    return;
  }
  var Birth = document.getElementById("dateOfBirth").value;
  let dateObj = new Date(Birth);
  let year = dateObj.getFullYear();
  let currentYear = new Date().getFullYear() - 3;
  if (year >= 1900 && year <= currentYear) {
  } else{
    showAlertTimeOutSignup('Ngày sinh không quá 3 tuổi và trước 1900');
    return;
  }
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
      showAlertTimeOutSignup("Đăng ký thất bại!");
    }
  })
  .catch(error => {
    // showUnsuccess();
    showAlertTimeOutSignup("Đăng ký thất bại!");
    console.error("Lỗi khi đăng ký tài khoản:", error);
  });
});

document.querySelector('#formLogin').addEventListener('submit', function(event) {
  event.preventDefault(); 
  event.stopPropagation(); 
  
  const username = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!event.target.checkValidity()) {
    event.target.classList.add('was-validated');
    return;
  }
  if (passwordRegex.test(password)) {
  } else {
    showAlertTimeOutLogin('Mật khẩu có tối thiểu 6 kí tự và có cả chữ lẫn số');
    return;
  }
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
        showAlertTimeOutLogin('Tài khoản không chính xác');
        throw new Error('Unauthorized');
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('token', data.accessToken);
      console.log(localStorage.getItem('token'));
      fetch(`${url}/${genre}`, {
        method: 'GET',
        headers: {
        'Authorization' : "bearer " + localStorage.getItem('token')
        }
      })
      .then(response => {
          if(response.status == '403'){
            showAlertTimeOut('Đăng nhập thành công');
            overlayHome.style.display = "none";
            overlayUser.style.display = "block";
            Overlay.style.display = "none";
            OverlayLogin.style.display = "none";
          }
          else if(response.status == '200'){
            showAlertTimeOut('Đăng nhập thành công');
            window.location.assign("./Admin/Index.html");
          }
          
      })
      
    });
});

passwordChange.addEventListener("change", function() {
  if (this.checked) {
    changePasswordForm.style.display = 'block';
    oldPassword.setAttribute('required', '');
    newPassword.setAttribute('required', '');
    newPasswordConfirm.setAttribute('required', '');
  } else {
    changePasswordForm.style.display = 'none';
    oldPassword.removeAttribute('required');
    newPassword.removeAttribute('required');
    newPasswordConfirm.removeAttribute('required');
  }
});

dropdownlogout.onclick = function (){
  overlayHome.style.display = "block";
  overlayUser.style.display = "none";
  Overlay.style.display = "none";
  OverlayLogin.style.display = "none";
  passwordLogin.value = '';
  localStorage.clear();
}
function showdata(person){
        var name = document.getElementById("nameInfo");
        var email = document.getElementById("emailInfo");
        var address = document.getElementById("addressInfo");
        var phoneNumber = document.getElementById("phoneNumberInfo");
        var gender = document.getElementById("genderInfo");
        var dateOfBirth = document.getElementById("dateOfBirthInfo");
        //var password = document.getElementById("password");
        //var passwordConfirm = document.getElementById("passwordConfirm");
    
        name.value = person.name;
        email.value = person.email;
        address.value = person.address;
        phoneNumber.value = person.phone;
        if(person.gender == true){
            gender.value = "0";
        }
        else{gender.value = "1"}
        const dateISO = person.birth.split('T')[0];
        dateOfBirth.value = dateISO;
        // console.log(person);
}
function getInfo() {
    fetch(`${url}/${Users}`, {
        method: 'GET',
        headers: {
        'Authorization' : "bearer " + localStorage.getItem('token')
        }
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('id', data.id);
        localStorage.setItem('roleName', data.roleName);
        showdata(data);
    })
    .catch(error => {
        console.error('Lỗi API: ', error);
    });
} 

function handleOutsideClickInfo(event) {
  if (!OverlayInfor.contains(event.target)) {
    OverlaySignup.style.display = "none";
    Overlay.style.display = "none";
    OverlayInfor.style.display = "none";
    document.removeEventListener("click", handleOutsideClickInfo, true);
  }
}
dropdowninfo.addEventListener("click", function() {
    Overlay.style.display = "block";
    OverlayInfor.style.display = "block";
    getInfo();
    document.addEventListener("click", handleOutsideClickInfo, true);
});

document.querySelector('#formInfo').addEventListener('submit', function(event) {
    event.preventDefault(); 
    event.stopPropagation(); 

    if (!event.target.checkValidity()) {
      event.target.classList.add('was-validated');
      console.log("1");
      return;
    }
    
    var name = document.getElementById("nameInfo").value;
    var email = document.getElementById("emailInfo").value;
    var address = document.getElementById("addressInfo").value;
    var phoneNumber = document.getElementById("phoneNumberInfo").value;
    var Gender = document.getElementById("genderInfo").value;
    var birth = document.getElementById("dateOfBirthInfo").value;
    var oldPassword = document.getElementById("oldPasswordInfo").value;
    var newPassword = document.getElementById("newPasswordInfo").value;
    var newPasswordConfirm = document.getElementById("newPasswordConfirmInfo").value;
    var gender = false;
    if(Gender == '0') {
        gender = true;
    }
    
    if (!isValidPhoneNumber(phoneNumber)) {
      showAlertTimeOutSignup('Số điện thoại không hợp lệ!');
      return;
    }
    let dateObj = new Date(birth);
    let year = dateObj.getFullYear();
    let currentYear = new Date().getFullYear() - 3;
    if (year >= 1900 && year <= currentYear) {
    } else{
      showAlertTimeOutSignup('Ngày sinh không quá 3 tuổi và trước 1900');
      return;
    }
    localStorage.setItem('put', 0);
    fetch(`${url}/${Users}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : "bearer " + token
      },
      body: JSON.stringify({
        id: localStorage.getItem('id'),
        name: name,
        email: email,
        gender: gender,
        birth: birth,
        phone: phoneNumber,
        address: address,
        RoleName: localStorage.getItem('roleName')
      })
    })
    .then(response => {
      if (response.ok) {
          // showAlert("Chỉnh sửa thành công!");
          
        } else {
          // showAlert("Chỉnh sửa thất bại!");
          localStorage.setItem('put', 1);

        }
    })
    .catch(error => {
      localStorage.setItem('put', 1);
      console.error(error);
    });

    if (changePasswordForm.style.display == 'block') {
      if(newPassword != newPasswordConfirm){
        document.getElementById("newPasswordConfirmInfo").classList.add("is-invalid");
        console.log("2");
        return;
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (passwordRegex.test(newPassword)) {
      } else {
        showAlertTimeOutInfo('Mật khẩu tối thiểu 6 kí tự và có cả chữ lẫn số');
        return;
      }
      fetch(`${url}/${Password}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : "bearer " + token
        },
        body: JSON.stringify({
          id: localStorage.getItem('id'),
          oldPassword: oldPassword,
          newPassword: newPassword, 
          RoleName: localStorage.getItem('roleName')
        })
      })
      .then(response => {
        if (response.ok) {
            // showAlert("Thay đổi thành công!");
          } else {
            // showAlert("Thay đổi thất thất bại!");
            localStorage.setItem('put', 2);
          }
      })
      .catch(error => {
        localStorage.setItem('put', 2);
        console.error(error);
      });
    }     

    if(localStorage.getItem('put') == 0){
      showAlert("Chỉnh sửa thành công");
    }else if(localStorage.getItem('put') == 1){
      showAlertTimeOutInfo("Thông tin cá nhân không hợp lệ");
    }
    else{
      showAlertTimeOutInfo("Thay đổi mật khẩu không thành công");
    }
});


