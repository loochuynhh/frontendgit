//Khai báo các hằng
const url = 'https://localhost:44308/api';
const Login = 'login';
const signup = 'register';
const genre = 'genre';
const Users = `users`;
const Password = "change-password";
const ForgotPassword = "forgot-password";
const token = localStorage.getItem('token');
//Khai báo các biến
var Overlay = document.getElementById("overlay");
var loginButton = document.getElementById("login-button");
var OverlayLogin = document.getElementById("overlayLogin");
var signupButton = document.getElementById("signupButton");
var OverlaySignup = document.getElementById("overlaySignup");
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
var overlaySignuplink = document.getElementById('overlaySignup-link');
document.getElementById("emailInfo").disabled = true;
document.getElementById("dateOfBirthInfo").disabled = true;
//Chức năng search
function Search() {
  console.log("Giá trị đã nhập:", document.getElementById("search").value);
  window.location.href = "http://127.0.0.1:5502/LayoutFilm.html" + "?filmName=" + document.getElementById("search").value;
}
//Chức năng quên mật khẩu
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
  fetch(`${url}/${Users}/${ForgotPassword}?` + params.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        document.removeEventListener("click", handleOutsideClickForgotPassword, true);
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Lỗi',
          text: 'Email không hợp lệ',
          timer: 2000
        }).then(() => { document.addEventListener("click", handleOutsideClickForgotPassword, true); });
        throw new Error('Unauthorized');
      } else {
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
//Xử lý sự kiện kích ra ngoài quên mật khẩu
function handleOutsideClickForgotPassword(event) {
  if (!overlayForgotPassword.contains(event.target)) {
    overlayForgotPassword.style.display = "none";
    Overlay.style.display = "block";
    OverlayLogin.style.display = "block";
    document.addEventListener("click", handleOutsideClickLogin, true);
    document.removeEventListener("click", handleOutsideClickForgotPassword, true);
  }
}
//Mở overlay Quên mật khẩu
forgotPasswordLink.addEventListener("click", function () {
  Overlay.style.display = "block";
  OverlayLogin.style.display = "none";
  overlayForgotPassword.style.display = "block";
  document.removeEventListener("click", handleOutsideClickLogin, true);
  document.addEventListener("click", handleOutsideClickForgotPassword, true);
});
//Chuyển sang từ đăng nhập overlay Đăng ký
overlaySignuplink.addEventListener("click", function () {
  Overlay.style.display = "block";
  OverlayLogin.style.display = "none";
  OverlaySignup.style.display = "block";
  document.removeEventListener("click", handleOutsideClickLogin, true);
  document.addEventListener("click", handleOutsideClickSignup, true);
});
//Xử lý sự kiện kích chuột ra ngoài đăng nhập
function handleOutsideClickLogin(event) {
  if (!OverlayLogin.contains(event.target)) {
    OverlayLogin.style.display = "none";
    Overlay.style.display = "none";
    document.removeEventListener("click", handleOutsideClickLogin, true);
  }
}
//Xử lý sự kiện Nút đăng nhập ngoài Header
loginButton.addEventListener("click", function () {
  Overlay.style.display = "block";
  OverlayLogin.style.display = "block";
  OverlaySignup.style.display = "none";
  document.addEventListener("click", handleOutsideClickLogin, true);
});
//Xử lý sự kiện Kích chuột ngoài overlay đăng ký
function handleOutsideClickSignup(event) {
  if (!OverlaySignup.contains(event.target)) {
    OverlaySignup.style.display = "none";
    Overlay.style.display = "none";
    document.removeEventListener("click", handleOutsideClickSignup, true);
  }
}
//Xử lý sự kiện kích chuột nút đăng ký ngoài header
signupButton.addEventListener("click", function () {
  Overlay.style.display = "block";
  OverlaySignup.style.display = "block";
  OverlayLogin.style.display = "none";
  document.addEventListener("click", handleOutsideClickSignup, true);
});
//Xác thực số điện thoại
function isValidPhoneNumber(phoneNumber) {
  // Xác thực theo chuẩn số điện thoại Việt Nam
  const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{8}$/;
  return regex.test(phoneNumber);
}
//Submit đăng ký tài khoản mới
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
    document.removeEventListener("click", handleOutsideClickSignup, true);
    Swal.fire({
      position: 'top',
      icon: 'warning',
      text: 'Mật khẩu tối thiểu 6 kí tự và có cả chữ lẫn số',
      confirmButtonText: 'OK'
    }).then(() => { document.addEventListener("click", handleOutsideClickSignup, true); });
    return;
  }

  var Name = document.getElementById("name").value;
  var Email = document.getElementById("email").value;
  var Address = document.getElementById("address").value;
  var Phone = document.getElementById("phoneNumber").value;
  var gender = document.getElementById("gender").value;
  var Gender = false;
  if (gender == "0") {
    Gender = true;
  }
  if (!isValidPhoneNumber(Phone)) {
    document.removeEventListener("click", handleOutsideClickSignup, true);
    Swal.fire({
      position: 'top',
      icon: 'warning',
      text: 'Số điện thoại gồm 10 số',
      confirmButtonText: 'OK'
    }).then(() => { document.addEventListener("click", handleOutsideClickSignup, true); });
    return;
  }
  var Birth = document.getElementById("dateOfBirth").value;
  let dateObj = new Date(Birth);
  let year = dateObj.getFullYear();
  let currentYear = new Date().getFullYear() - 3;
  if (year >= 1900 && year <= currentYear) {
  } else {
    document.removeEventListener("click", handleOutsideClickSignup, true);
    Swal.fire({
      position: 'top',
      icon: 'warning',
      text: 'Tối thiểu 3 tuổi và năm sinh sau 1900',
      confirmButtonText: 'OK'
    }).then(() => { document.addEventListener("click", handleOutsideClickSignup, true); });
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
      if (!response.ok) {
        response.text().then(errorMessage => {
          if (errorMessage == 'Email already exist') {
            document.removeEventListener("click", handleOutsideClickSignup, true);
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'THẤT BẠI',
              text: 'Email này đã được sử dụng',
            }).then(() => {
              document.addEventListener("click", handleOutsideClickSignup, true);
            });
          }
          else {
            document.removeEventListener("click", handleOutsideClickSignup, true);
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'THẤT BẠI',
              text: 'Đăng ký thất bại',
            }).then(() => {
              document.addEventListener("click", handleOutsideClickSignup, true);
            });
          }
        })
      }
      if (response.ok) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Đăng ký thành công',
          showConfirmButton: false,
          timer: 1500
        })
        // Đặt giá trị rỗng cho thẻ input có id "name"
        document.getElementById("name").value = "";

        // Đặt giá trị rỗng cho thẻ input có id "email"
        document.getElementById("email").value = "";

        // Đặt giá trị rỗng cho thẻ input có id "phoneNumber"
        document.getElementById("phoneNumber").value = "";

        // Đặt giá trị rỗng cho thẻ input có id "address"
        document.getElementById("address").value = "";

        // Đặt giá trị rỗng cho thẻ select có id "gender"
        document.getElementById("gender").value = "0";

        // Đặt giá trị rỗng cho thẻ input có id "dateOfBirth"
        document.getElementById("dateOfBirth").value = "";

        // Đặt giá trị rỗng cho thẻ input có id "password"
        document.getElementById("password").value = "";

        // Đặt giá trị rỗng cho thẻ input có id "passwordConfirm"
        document.getElementById("passwordConfirm").value = "";

        Overlay.style.display = "none";
        OverlaySignup.style.display = "none";
      }
    })
    .catch(error => {
      console.error("Lỗi khi đăng ký tài khoản:", error);
    });
});
//Submit Đăng nhập tài khoản
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
    document.removeEventListener("click", handleOutsideClickLogin, true);
    Swal.fire({
      position: 'top',
      icon: 'warning',
      text: 'Mật khẩu tối thiểu 6 kí tự và có cả chữ lẫn số',
      confirmButtonText: 'OK'
    }).then(() => {
      document.addEventListener("click", handleOutsideClickLogin, true);
    });
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
        document.removeEventListener("click", handleOutsideClickLogin, true);
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Tài khoản không chính xác',
          text: 'Có thể bạn đã nhập sai mật khẩu hoặc tài khoản không tồn tại',
          confirmButtonText: 'OK',
          width: '45%'
        }).then(() => {
          document.addEventListener("click", handleOutsideClickLogin, true);
        });
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
              timer: 1500
            })
            overlayHome.style.display = "none";
            overlayUser.style.display = "block";
            Overlay.style.display = "none";
            OverlayLogin.style.display = "none";
          }
          else if (response.status == '200') {
            window.location.assign("./Admin/Statistics.html");
          }

        })

    });
});
//Sự kiện Thay đổi password
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
//Mở dropdown
dropdownlogout.onclick = function () {
  overlayHome.style.display = "block";
  overlayUser.style.display = "none";
  Overlay.style.display = "none";
  OverlayLogin.style.display = "none";
  passwordLogin.value = '';
  localStorage.clear();
}
//Hiện dữ liệu trong chỉnh sửa tài khoản
function showdata(person) {
  var name = document.getElementById("nameInfo");
  var email = document.getElementById("emailInfo");
  var address = document.getElementById("addressInfo");
  var phoneNumber = document.getElementById("phoneNumberInfo");
  var gender = document.getElementById("genderInfo");
  var dateOfBirth = document.getElementById("dateOfBirthInfo");

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
}
//Lấy dữ liệu tài khoản
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
//Sự kiện kích ngoài overlay Chỉnh sửa tài khoản
function handleOutsideClickInfo(event) {
  if (!OverlayInfor.contains(event.target)) {
    OverlaySignup.style.display = "none";
    Overlay.style.display = "none";
    OverlayInfor.style.display = "none";
    document.removeEventListener("click", handleOutsideClickInfo, true);
  }
}
//dropdown info
dropdowninfo.addEventListener("click", function () {
  Overlay.style.display = "block";
  OverlayInfor.style.display = "block";
  getInfo();
  document.addEventListener("click", handleOutsideClickInfo, true);
});
//Submit form chỉnh sửa thông tin
document.querySelector('#formInfo').addEventListener('submit', async (event) => {
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
    document.removeEventListener("click", handleOutsideClickInfo, true);
    Swal.fire({
      position: 'top',
      icon: 'warning',
      text: 'Số điện thoại chỉ được gồm 10 số',
      confirmButtonText: 'OK'
    }).then(() => {
      document.addEventListener("click", handleOutsideClickInfo, true);
    });
    return;
  }
  let dateObj = new Date(birth);
  let year = dateObj.getFullYear();
  let currentYear = new Date().getFullYear() - 3;
  if (year >= 1900 && year <= currentYear) {
  } else {
    document.removeEventListener("click", handleOutsideClickInfo, true);
    Swal.fire({
      position: 'top',
      icon: 'warning',
      text: 'Tối thiểu 3 tuổi và năm sinh sau 1900',
      confirmButtonText: 'OK'
    }).then(() => {
      document.addEventListener("click", handleOutsideClickInfo, true);
    });
    return;
  }
  const inforUserFetch = {
    id: localStorage.getItem('id'),
    name: name,
    email: email,
    gender: gender,
    birth: birth,
    phone: phoneNumber,
    address: address,
    RoleName: localStorage.getItem('roleName')
  }
  var passwordFetch = "";
  if (changePasswordForm.style.display == 'block') {
    if (newPassword != newPasswordConfirm) {
      document.getElementById("newPasswordConfirmInfo").classList.add("is-invalid");
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (passwordRegex.test(newPassword)) {
    } else {
      document.removeEventListener("click", handleOutsideClickInfo, true);
      Swal.fire({
        position: 'top',
        icon: 'warning',
        text: 'Mật khẩu tối thiểu 6 kí tự và có cả chữ lẫn số',
        confirmButtonText: 'OK'
      }).then(() => {
        document.addEventListener("click", handleOutsideClickInfo, true);
      });
      return;
    }
    passwordFetch = {
      oldPassword: oldPassword,
      newPassword: newPassword
    }
  }
  UpdateInfor(inforUserFetch, passwordFetch);
});
async function UpdateInfor(inforUserFetch, passwordFetch) {
  try {
    var checkResponse = true;
    var checkChangePassword = false;
    const response = await fetch(`${url}/${Users}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + token
      },
      body: JSON.stringify(inforUserFetch)
    })
    console.log(response.status);
    if (!response.ok) {
      checkResponse = false;
      const errorMessage = await response.text();
      console.log(errorMessage);
      document.removeEventListener("click", handleOutsideClickInfo, true);
      await Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'THẤT BẠI',
        text: 'Đã xảy ra lỗi khi chỉnh sửa tài khoản',
      });
      document.addEventListener("click", handleOutsideClickInfo, true);

      throw new Error('Đã xảy ra lỗi khi chỉnh sửa tài khoản');
    }
    if (changePasswordForm.style.display == 'block') {
      checkChangePassword = true;
      const responsePassword = await fetch(`${url}/${Users}/${Password}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(passwordFetch)
      })
      console.log("Vô passwordchange");
      console.log(responsePassword.status);
      if (!responsePassword.ok) {
        checkResponse = false;
        const errorMessage = await responsePassword.text();
        console.log(errorMessage);
        if (errorMessage == 'Wrong password') {
          document.removeEventListener("click", handleOutsideClickInfo, true);
          Swal.fire({
            position: 'top',
            icon: 'warning',
            text: 'Mật khẩu cũ không chính xác',
            confirmButtonText: 'OK'
          }).then(() => {
            document.addEventListener("click", handleOutsideClickInfo, true);
          });
        }
        else {
          document.removeEventListener("click", handleOutsideClickInfo, true);
          Swal.fire({
            position: 'top',
            icon: 'warning',
            title: 'Chỉnh sửa mật khẩu thất bại',
            confirmButtonText: 'OK'
          }).then(() => {
            document.addEventListener("click", handleOutsideClickInfo, true);
          });
        }
        throw new Error('Đã xảy ra lỗi khi chỉnh sửa mật khẩu');
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log(checkResponse);
    if (checkResponse == true) {
      await Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Chỉnh sửa tài khoản thành công',
        showConfirmButton: false,
        timer: 1500
      });
      passwordChange.checked = false;
      oldPassword.value = "";
      newPassword.value = "";
      newPasswordConfirm.value = "";
      changePasswordForm.style.display = 'none';
      Overlay.style.display = "none";
      OverlayInfor.style.display = "none";
    }
  }
}