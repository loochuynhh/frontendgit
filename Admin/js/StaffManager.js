const url = 'https://localhost:44308/api';
const admins = 'admins';
const getStaff = 'get-staff';
const addStaffAPI = 'add-staff';
const deleteStaff = 'delete-staff';
var Overlay = document.getElementById("overlay");
var overlaySignup = document.getElementById("overlaySignup");
var addStaff = document.getElementById("addStaff");
var overlayView = document.getElementById("overlayView");
document.getElementById("nameView").disabled = true;
document.getElementById("emailView").disabled = true;
document.getElementById("phoneNumberView").disabled = true;
document.getElementById("addressView").disabled = true;
document.getElementById("genderView").disabled = true;
document.getElementById("dateOfBirthView").disabled = true;
function handleOutsideClickAddStaff(event) {
  if (!overlaySignup.contains(event.target)) {
    overlaySignup.style.display = "none";
    Overlay.style.display = "none";
    document.removeEventListener("click", handleOutsideClickAddStaff, true);
  }
}
addStaff.addEventListener("click", function () {
  Overlay.style.display = "block";
  overlaySignup.style.display = "block";
  document.addEventListener("click", handleOutsideClickAddStaff, true);
});

function handleOutsideClickViewStaff(event) {
  if (!overlayView.contains(event.target)) {
    overlayView.style.display = "none";
    Overlay.style.display = "none";
    document.removeEventListener("click", handleOutsideClickViewStaff, true);
  }
}
function viewStaff(id) {
  Overlay.style.display = "block";
  overlayView.style.display = "block";
  document.addEventListener("click", handleOutsideClickViewStaff, true);
  fetch(`${url}/${admins}/${getStaff}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization': "bearer " + localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          document.getElementById('nameView').value = data[i].name;
          document.getElementById('emailView').value = data[i].email;
          document.getElementById('phoneNumberView').value = data[i].phone;
          document.getElementById('addressView').value = data[i].address;
          var gender = document.getElementById("genderView");
          if (data[i].gender == true) {
            gender.value = "0";
          }
          else { gender.value = "1" }
          var date = new Date(data[i].birth);
          var day = date.getDate();
          var month = date.getMonth() + 1; // Tháng tính từ 0 đến 11, cần cộng thêm 1 để đúng tháng
          var year = date.getFullYear();

          // Đặt giá trị vào các thẻ input
          document.getElementById("dateOfBirthView").value = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
        }
      }
    })
}

getStaffFunction();
function getStaffFunction() {
  fetch(`${url}/${admins}/${getStaff}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization': "bearer " + localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then(data => {
      let tbody = document.getElementById("body-table");
      tbody.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        let trFilmTable = document.createElement("tr");
        trFilmTable.setAttribute("data-id", data[i].id);

        let tdNameStaff = document.createElement("td");
        tdNameStaff.classList.add("text-start")

        let tdEmail = document.createElement("td");
        tdEmail.classList.add("tdCenter", "col-4");

        let tdGender = document.createElement("td");
        tdGender.classList.add("tdCenter", "col-2");

        let tdPhoneNumber = document.createElement("td");
        tdPhoneNumber.classList.add("tdCenter", "col-2");

        let tdDelete = document.createElement("td");
        tdDelete.className = "tdCenter";
        let btnDelete = document.createElement("button");
        btnDelete.className = "btnDelete";

        // btnDelete.className = "tdCenter";
        // btnDelete.classList.add("btn","btn-danger");
        btnDelete.innerHTML = "X";
        tdDelete.appendChild(btnDelete);
        tdNameStaff.innerHTML = data[i].name;
        tdEmail.innerHTML = data[i].email;
        console.log(data[i].gender);
        if(data[i].gender == false){
          tdGender.innerHTML = "Nữ";
        }else{
          tdGender.innerHTML = "Nam";
        }
        // tdGender.innerHTML = data[i].gender;
        tdPhoneNumber.innerHTML = data[i].phone;
        var checkdelete = true;
        btnDelete.addEventListener("click", function () {
          checkdelete = false;
          //showAlert("Bạn có chắc chắn muốn xóa");
          Swal.fire({
            position: 'top',
            title: 'Bạn có chắc chắn muốn xóa',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              deleteUsers(data[i].id);
              
            }
            checkdelete = true;
            
          })
        });
        trFilmTable.addEventListener("click", function () {
          if (checkdelete == true) {
            viewStaff(data[i].id);
          }
        });
        trFilmTable.appendChild(tdNameStaff);
        trFilmTable.appendChild(tdEmail);
        trFilmTable.appendChild(tdGender);
        trFilmTable.appendChild(tdPhoneNumber);
        trFilmTable.appendChild(tdDelete);
        tbody.appendChild(trFilmTable);
      }
      hover();
    })
    .catch(error => console.error(error));
}

function hover() {
  // Lấy danh sách tất cả các hàng trong bảng
  let rows = document.querySelectorAll('tbody tr');

  // Duyệt qua từng hàng và gán sự kiện hover
  rows.forEach(row => {
    row.addEventListener('mouseover', () => {
      row.classList.add('highlight-row');
    });

    row.addEventListener('mouseout', () => {
      row.classList.remove('highlight-row');
    });
  });
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
    document.removeEventListener("click", handleOutsideClickAddStaff, true);
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'THẤT BẠI',
      text: 'Mật khẩu tối thiểu 6 kí tự và có cả chữ lẫn số',
    }).then(() => {
      document.addEventListener("click", handleOutsideClickAddStaff, true);
    });
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
    // showAlertTimeOutSignup('Số điện thoại không hợp lệ!');
    document.removeEventListener("click", handleOutsideClickAddStaff, true);
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'THẤT BẠI',
      text: 'Số điện thoại gồm 10 số',
      // footer: '<a>Số điện thoại gồm 10 số</a>',
      // timer: 2000
    }).then(() => {
      document.addEventListener("click", handleOutsideClickAddStaff, true);
    });
    return;
  }
  var Birth = document.getElementById("dateOfBirth").value;
  let dateObj = new Date(Birth);
  let year = dateObj.getFullYear();
  let currentYear = new Date().getFullYear() - 18;
  if (year >= 1900 && year <= currentYear) {
  } else {
    // showAlertTimeOutSignup('Ngày sinh không quá 3 tuổi và trước 1900');
    document.removeEventListener("click", handleOutsideClickAddStaff, true);
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'THẤT BẠI',
      text: 'Tối thiểu 18 tuổi và năm sinh sau 1900',
      // timer: 2000
    }).then(() => {
      document.addEventListener("click", handleOutsideClickAddStaff, true);
    });
    return;
  }
  var Role = "STAFF";

  fetch(`${url}/${admins}/${addStaffAPI}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': "bearer " + localStorage.getItem('token')
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
          console.log(errorMessage);
          if (errorMessage == 'Email already exist') {
            // showAlertTimeOut("Phòng chiếu này đã có lịch chiếu trong khung giờ này");
            document.removeEventListener("click", handleOutsideClickAddStaff, true);
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'THẤT BẠI',
              text: 'Email này đã được sử dụng',
            }).then(() => {
              document.addEventListener("click", handleOutsideClickAddStaff, true);
            });
          }

        })
        //showAlertTimeOut('Chỉnh sửa không thành công');
        document.removeEventListener("click", handleOutsideClickAddStaff, true);
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'THẤT BẠI',
          text: 'Thông tin nhập vào không hợp lệ',
        }).then(() => {
          document.addEventListener("click", handleOutsideClickAddStaff, true);
        });
        //location.reload();
        throw new Error('Đã xảy ra lỗi khi chỉnh sửa phim');
      }
      else {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Thêm nhân viên thành công',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          Overlay.style.display = "none";
          overlaySignup.style.display = "none";
          getStaffFunction();
        });
      }

    })
    .catch(error => {
      console.error("Lỗi khi thêm tài khoản nhân viên:", error);
    });
});
function isValidPhoneNumber(phoneNumber) {
  // Xác thực theo chuẩn số điện thoại Việt Nam
  const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{8}$/;
  return regex.test(phoneNumber);
}
function deleteUsers(i) {
  fetch(`${url}/${admins}/${deleteStaff}/${i}`, {
    method: "DELETE",
    headers: {
      'Authorization': "bearer " + localStorage.getItem('token')
    },
  })
    .then(response => {
      console.log(response.status);
      if (!response.ok) {
        // showAlertTimeOut('Xóa phim thất bại');
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'THẤT BẠI',
          text: 'Xóa nhân viên thất bại',
          // timer: 2000
        })
        //location.reload();
        throw new Error('Đã xảy ra lỗi khi xóa phim');
      }
      // showAlertTimeOut('Đã xóa phim');
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Xóa nhân viên thành công',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        getStaffFunction();
      });
      //location.reload();
    })
    .catch((error) => {
      //location.reload();
      console.error("Error:", error);
    });
}