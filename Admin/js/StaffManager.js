const url = 'https://localhost:44308/api';
const admins = 'admins';
const getStaff = 'get-staff';
const addStaffAPI = 'add-staff';
const deleteStaff = 'delete-staff';
var Overlay = document.getElementById("overlay");
var overlaySignup = document.getElementById("overlaySignup");
var addStaff = document.getElementById("addStaff");
// var Overlay = document.getElementById("overlay");
// var Overlay = document.getElementById("overlay");
// var Overlay = document.getElementById("overlay");
// var Overlay = document.getElementById("overlay");
// var Overlay = document.getElementById("overlay");

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

fetch(`${url}/${admins}/${getStaff}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization' : "bearer " + localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then(data => {
      let tbody = document.getElementById("body-table");
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
        tdGender.innerHTML = data[i].gender;
        tdPhoneNumber.innerHTML = data[i].phone;
        var checkdelete = true;
        btnDelete.addEventListener("click", function () {
          checkdelete = false;
          //showAlert("Bạn có chắc chắn muốn xóa");
          Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              deleteUsers(data[i].id);
              Swal.fire(
                'Deleted!',
                'Phim đã được xóa',
                'success'
              )
            }
          })
        });
        // trFilmTable.addEventListener("click", function () {
        //   if (checkdelete == true) {
        //     const id = this.getAttribute("data-id");
        //     updateFilm(id);
        //   }
        // });
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
      title: 'Lỗi',
      text: 'Mật khẩu tối thiểu 6 kí tự và có cả chữ lẫn số',
      timer: 2000
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
  if (gender.value === "0") {
    Gender = true;
  }
  if (!isValidPhoneNumber(Phone)) {
    // showAlertTimeOutSignup('Số điện thoại không hợp lệ!');
    document.removeEventListener("click", handleOutsideClickAddStaff, true);
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Lỗi',
      text: 'Số điện thoại không hợp lệ',
      footer: '<a>Số điện thoại gồm 10 số</a>',
      timer: 2000
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
      title: 'Lỗi',
      text: 'Tuôi không quá 18 tuổi và năm sinh nhỏ hơn 1900',
      timer: 2000
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
      'Authorization' : "bearer " + localStorage.getItem('token')
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
          title: 'Thêm nhân viên thành công',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        // showUnsuccess();
        // showAlertTimeOutSignup("Đăng ký thất bại!");
      }
    })
    .catch(error => {
      // showUnsuccess();
      // showAlertTimeOutSignup("Đăng ký thất bại!");
      document.removeEventListener("click", handleOutsideClickAddStaff, true);
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Lỗi',
        text: 'Thêm nhân viên thất bại',
        footer: '<a>Thông tin nhập vào không hợp lệ/a>',
        timer: 1000
      }).then(() => {
        document.addEventListener("click", handleOutsideClickAddStaff, true);
      });
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
          title: 'Lỗi',
          text: 'Xóa nhân viên thất bại',
          timer: 2000
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
        timer: 2000
      })
      //location.reload();
    })
    .catch((error) => {
      //location.reload();
      console.error("Error:", error);
    });
}