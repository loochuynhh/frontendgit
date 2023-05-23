const url = 'https://localhost:44308/api';
const Login = 'login';
const signup = 'register';
const genre = 'genre';
const Users = `users`;
const Password = "change-password";
const ForgotPassword = "forgot-password";
const token = localStorage.getItem('token');
// const myObject = new wn();
var Overlay = document.getElementById("overlay");
var loginButton = document.getElementById("login-button");
var buttonLogin = document.getElementById("buttonLogin");
var OverlayLogin = document.getElementById("overlayLogin");
var buttonSignup = document.getElementById("signup-button");
var signupButton = document.getElementById("signupButton");
var OverlaySignup = document.getElementById("overlaySignup");
var homeLink = document.getElementById('home');
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
var forgotPasswordLink = document.getElementById('forgot-password-link');
var overlayForgotPassword = document.getElementById('overlayForgotPassword');

document.querySelector('#formForgotPassword').addEventListener('submit', function (event) {
  event.preventDefault();
  event.stopPropagation();

  const username = document.getElementById("emailForgotPassword").value;
  if (!event.target.checkValidity()) {
    event.target.classList.add('was-validated');
    return;
  }
  const params = new URLSearchParams({
    email: username
  });
  // getNewPassword(params);
  fetch(`${url}/${Users}/${ForgotPassword}?`+ params.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Lỗi',
          text: 'Email không hợp lệ',
          timer: 1000
        })
        throw new Error('Unauthorized');
      }else{
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Mật khẩu mới được gửi về Email',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
});

function handleOutsideClickForgotPassword(event) {
  if (!overlayForgotPassword.contains(event.target)) {
    overlayForgotPassword.style.display = "none";
    Overlay.style.display = "block";
    OverlayLogin.style.display = "block";
    document.addEventListener("click", handleOutsideClickLogin, true);
    document.removeEventListener("click", handleOutsideClickForgotPassword, true);
  }
}
forgotPasswordLink.addEventListener("click", function () {
  Overlay.style.display = "block";
  OverlayLogin.style.display = "none";
  overlayForgotPassword.style.display = "block";
  document.removeEventListener("click", handleOutsideClickLogin, true);
  document.addEventListener("click", handleOutsideClickForgotPassword, true);
});

// window.onload = loadSlide();

// function loadSlide() {
//   if (localStorage.getItem('token') != null) {
//     console.log(localStorage.getItem('token'));
//     document.getElementById('overlayUser').style.display = 'block';
//     document.getElementById('overlayHome').style.display = 'none';
//   } 
//   else {
//     document.getElementById('overlayUser').style.display = 'none';
//     document.getElementById('overlayHome').style.display = 'block';
//   }
// }


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
//   var modal = document.getElementById('exampleModal')
//   // Đặt tiêu đề cho modal
//   modal.querySelector('.modal-title').textContent = title
//   // Đặt thông báo cho modal
//   modal.querySelector('.modal-body #overlay-message').textContent = message
//   // Hiển thị modal
//   modal.classList.add('show')
//   modal.style.display = 'block'
//   modal.removeAttribute('aria-hidden')
//   setTimeout(function () {
//     modal.classList.remove('show')
//     modal.style.display = 'none'
//     modal.setAttribute('aria-hidden', 'true')
//   }, 2000)
// }
// function showAlert(message) {
//   document.getElementById("modal-message").innerHTML = message;
//   var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
//   myModal.show();
// }
// function showAlertVer2(message) {
//   document.getElementById("modal-message").innerHTML = message;
//   var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
//   Overlay.style.display = "none";
//   OverlayLogin.style.display = "none";
//   OverlaySignup.style.display = "none";
//   myModal.show();
// }

// function showAlertTimeOut(message) {
//   document.getElementById("modal-message").innerHTML = message;
//   var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
//   Overlay.style.display = "none";
//   OverlayLogin.style.display = "none";
//   OverlaySignup.style.display = "none";
//   myModal.show();
//   setTimeout(function () {
//     myModal.hide();
//   }, 800);
// }
// function showAlertTimeOutLogin(message) {
//   document.getElementById("modal-message").innerHTML = message;
//   var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
//   Overlay.style.display = "block";
//   OverlayLogin.style.display = "block";
//   OverlaySignup.style.display = "none";
//   myModal.show();
//   setTimeout(function () {
//     myModal.hide();
//   }, 800);
// }
// function showAlertTimeOutSignup(message) {
//   document.getElementById("modal-message").innerHTML = message;
//   var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
//   Overlay.style.display = "block";
//   OverlayLogin.style.display = "none";
//   OverlaySignup.style.display = "block";
//   myModal.show();
//   setTimeout(function () {
//     myModal.hide();
//   }, 1000);
// }
// function showAlertTimeOutInfo(message) {
//   document.getElementById("modal-message").innerHTML = message;
//   var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
//   Overlay.style.display = "block";
//   OverlayLogin.style.display = "none";
//   OverlaySignup.style.display = "none";
//   OverlayInfor.style.display = "block";
//   myModal.show();
//   setTimeout(function () {
//     myModal.hide();
//   }, 800);
// }
// function showSuccess() {
//   var alertSuccess = document.querySelector('.alert-success');
//   alertSuccess.style.display = 'block';
//   Overlay.style.display = "none";
//   OverlaySignup.style.display = "none";
//   OverlayLogin.style.display = "none";
//   setTimeout(function () {
//     alertSuccess.style.display = 'none';
//   }, 2000);
// }
// function showUnsuccess() {
//   var alertDanger = document.querySelector('.alert-danger');
//   alertDanger.style.display = 'block';
//   setTimeout(function () {
//     alertDanger.style.display = 'none';
//   }, 2000);
// }

function isValidPhoneNumber(phoneNumber) {
  // Xác thực theo chuẩn số điện thoại Việt Nam
  const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{8}$/;
  return regex.test(phoneNumber);
}

document.querySelector('#formSignup').addEventListener('submit', function (event) {
  event.preventDefault();
  event.stopPropagation();
  if (!event.target.checkValidity()) {
    event.target.classList.add('was-validated');
    return;
  }
  if (document.getElementById("passwordConfirm").value != document.getElementById("password").value) {
    document.getElementById("passwordConfirm").classList.add("is-invalid");
    return;
  } else { document.getElementById("passwordConfirm").classList.remove("is-invalid"); }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  var Password = document.getElementById("password").value;
  if (!event.target.checkValidity()) {
    event.target.classList.add('was-validated');
    return;
  }
  if (passwordRegex.test(Password)) {
  } else {
    // showAlertTimeOutSignup('Mật khẩu tối thiểu 6 kí tự và có cả chữ lẫn số');
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Lỗi',
      text: 'Mật khẩu tối thiểu 6 kí tự và có cả chữ lẫn số',
      timer: 1000
    })
    return;
  }

  var Name = document.getElementById("name").value;
  var Email = document.getElementById("email").value;
  var Address = document.getElementById("address").value;
  var Phone = document.getElementById("phoneNumber").value;
  var gender = document.getElementById("gender").value;
  var Gender = false;
  if (gender.value === "0") {
    Gender = true;
  }
  if (!isValidPhoneNumber(Phone)) {
    // showAlertTimeOutSignup('Số điện thoại không hợp lệ!');
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Lỗi',
      text: 'Số điện thoại không hợp lệ',
      footer: '<a>Số điện thoại gồm 10 số</a>',
      timer: 1000
    })
    return;
  }
  var Birth = document.getElementById("dateOfBirth").value;
  let dateObj = new Date(Birth);
  let year = dateObj.getFullYear();
  let currentYear = new Date().getFullYear() - 3;
  if (year >= 1900 && year <= currentYear) {
  } else {
    // showAlertTimeOutSignup('Ngày sinh không quá 3 tuổi và trước 1900');
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Lỗi',
      text: 'Ngày sinh không quá 3 tuổi và trước 1900',
      timer: 1000
    })
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
        //showAlert("Đăng ký thành công!");
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Đăng ký thành công',
          showConfirmButton: false,
          timer: 800
        })
      } else {
        // showUnsuccess();
        // showAlertTimeOutSignup("Đăng ký thất bại!");
      }
    })
    .catch(error => {
      // showUnsuccess();
      // showAlertTimeOutSignup("Đăng ký thất bại!");
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Lỗi',
        text: 'Đăng ký thất bại',
        footer: '<a>Thông tin đăng ký không hợp lệ/a>',
        timer: 1000
      })
      console.error("Lỗi khi đăng ký tài khoản:", error);
    });
});

document.querySelector('#formLogin').addEventListener('submit', function (event) {
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
    // showAlertTimeOutLogin('Mật khẩu có tối thiểu 6 kí tự và có cả chữ lẫn số');
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Lỗi',
      text: 'Mật khẩu có tối thiểu 6 kí tự và có cả chữ lẫn số',
      timer: 1000
    })
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
        //showAlertTimeOutLogin('Tài khoản không chính xác');
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Lỗi',
          text: 'Tài khoản không chính xác',
          footer: '<a>Có thể bạn đã nhập sai mật khẩu hoặc tài khoản không tồn tại</a>',
          timer: 1000
        })
        throw new Error('Unauthorized');
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('token', data.accessToken);
      console.log('hi');
      fetch(`${url}/${genre}`, {
        method: 'GET',
        headers: {
          'Authorization': "bearer " + localStorage.getItem('token')
        }
      })
        .then(response => {
          if (response.status == '403') {
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Đăng nhập thành công',
              showConfirmButton: false,
              timer: 800
            })
            overlayHome.style.display = "none";
            overlayUser.style.display = "block";
            Overlay.style.display = "none";
            OverlayLogin.style.display = "none";
          }
          else if (response.status == '200') {
            // showAlertTimeOut('Đăng nhập thành công');
            window.location.assign("./Admin/Statistics.html");
            // new sweetAlert('Đăng nhập thành công');
          }

        })

    });
});

passwordChange.addEventListener("change", function () {
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

dropdownlogout.onclick = function () {
  overlayHome.style.display = "block";
  overlayUser.style.display = "none";
  Overlay.style.display = "none";
  OverlayLogin.style.display = "none";
  passwordLogin.value = '';
  localStorage.clear();
}
function showdata(person) {
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
  if (person.gender == true) {
    gender.value = "0";
  }
  else { gender.value = "1" }
  const dateISO = person.birth.split('T')[0];
  dateOfBirth.value = dateISO;
  // console.log(person);
}
function getInfo() {
  fetch(`${url}/${Users}`, {
    method: 'GET',
    headers: {
      'Authorization': "bearer " + localStorage.getItem('token')
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
dropdowninfo.addEventListener("click", function () {
  Overlay.style.display = "block";
  OverlayInfor.style.display = "block";
  getInfo();
  document.addEventListener("click", handleOutsideClickInfo, true);
});

document.querySelector('#formInfo').addEventListener('submit', function (event) {
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
  if (Gender == '0') {
    gender = true;
  }

  if (!isValidPhoneNumber(phoneNumber)) {
    // showAlertTimeOutSignup('Số điện thoại không hợp lệ!');
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Lỗi',
      text: 'Số điện thoại không hợp lệ',
      footer: '<a>Số điện thoại gồm 10 số</a>',
      timer: 1000
    })
    return;
  }
  let dateObj = new Date(birth);
  let year = dateObj.getFullYear();
  let currentYear = new Date().getFullYear() - 3;
  if (year >= 1900 && year <= currentYear) {
  } else {
    // showAlertTimeOutSignup('Ngày sinh không quá 3 tuổi và trước 1900');
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Lỗi',
      text: 'Ngày sinh không quá 3 tuổi và trước 1900',
      timer: 1000
    })
    return;
  }
  localStorage.setItem('put', 0);
  fetch(`${url}/${Users}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "bearer " + token
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
    if (newPassword != newPasswordConfirm) {
      document.getElementById("newPasswordConfirmInfo").classList.add("is-invalid");
      console.log("2");
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (passwordRegex.test(newPassword)) {
    } else {
      // showAlertTimeOutInfo('Mật khẩu tối thiểu 6 kí tự và có cả chữ lẫn số');
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Lỗi',
        text: 'Mật khẩu tối thiểu 6 kí tự và có cả chữ lẫn số',
        timer: 1000
      })
      return;
    }
    fetch(`${url}/${Users}/${Password}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword
      })
    })
      .then(response => {
        if (response.ok) {
          // showAlert("Thay đổi thành công!");
        } 
        else {
          response.text().then(errorMessage => {
            if (errorMessage == 'Wrong password') {
              // showAlertTimeOut("Phim đã có đặt lịch chiếu");
              Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Lỗi',
                text: 'Mật khẩu cũ không chính xác',
                timer: 1000
              })
              localStorage.setItem('put', 4);
            }
            else {
              // showAlertTimeOut('Chỉnh sửa không thành công');
              Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Lỗi',
                text: 'Chỉnh sửa mật khẩu thất bại',
                timer: 1000
              })
            }
            localStorage.setItem('put', 4);
          })
          // showAlert("Thay đổi thất thất bại!");
        }
      })
      .catch(error => {
        localStorage.setItem('put', 4);
        console.error(error);
      });
  }

  if (localStorage.getItem('put') == 0) {
    // showAlert("Chỉnh sửa thành công");
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Chỉnh sửa thành công',
      showConfirmButton: false,
      timer: 800
    })
  } else if (localStorage.getItem('put') == 1) {
    // showAlertTimeOutInfo("Thông tin cá nhân không hợp lệ");
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Lỗi',
      text: 'Thông tin cá nhân không hợp lệ',
      footer: '<a>Kiểm tra thông tin các trường bạn nhập vào',
      timer: 1000
    })
  }
});


function muaVe(){
  
  // Overlay.style.display = "block";
  // OverlayLogin.style.display = "block";
  // OverlaySignup.style.display = "none";
  // document.addEventListener("click", handleOutsideClickLogin, true);

}