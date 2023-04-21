const Users = `users`;
const Password = "";
const url = `https://localhost:44308`;
const token = localStorage.getItem('token');

var Overlay = document.getElementById("overlay");
var OverlayInfor = document.getElementById("inforoverlay");
var dropdowninfo = document.getElementById("info");
var dropdownlogout = document.getElementById("logout");
var passwordChange = document.getElementById("passwordChange");
var changePasswordForm = document.getElementById("changePasswordForm");


passwordChange.addEventListener("change", function() {
  if (this.checked) {
    changePasswordForm.style.display = 'block';
  } else {
    changePasswordForm.style.display = 'none';
  }
});

function showAlert(message) {
    document.getElementById("modal-message").innerHTML = message;
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    myModal.show();
}

dropdownlogout.onclick = function (){
    window.location.assign("./Layoutanonymous.html");
    localStorage.clear();
}
function showdata(person){
        var name = document.getElementById("name");
        var email = document.getElementById("email");
        var address = document.getElementById("address");
        var phoneNumber = document.getElementById("phoneNumber");
        var gender = document.getElementById("gender");
        var dateOfBirth = document.getElementById("dateOfBirth");
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
        // password.value = person.password;
        // passwordConfirm.value = person.password;
    
}
function getInfo() {
    fetch(`${url}/${Users}`, {
        method: 'GET',
        headers: {
        'Authorization' : "bearer " + token
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


dropdowninfo.addEventListener("click", function() {
    Overlay.style.display = "block";
    OverlayInfor.style.display = "block";
    getInfo();
});

document.querySelector('#formInfo').addEventListener('submit', function(event) {
    event.preventDefault(); 
    event.stopPropagation(); 

    if (!event.target.checkValidity()) {
      event.target.classList.add('was-validated');
      return;
    }
    
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var Gender = document.getElementById("gender").value;
    var birth = document.getElementById("dateOfBirth").value;
    var oldPassword = document.getElementById("oldPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    var newPasswordConfirm = document.getElementById("newPasswordConfirm").value;
    var gender = false;
    if(Gender == '0') {
        gender = true;
    }
    if(newPassword != newPasswordConfirm){
      document.getElementById("newPasswordConfirm").classList.add("is-invalid");
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
        showAlert("Chỉnh sửa thất bại!");
        localStorage.setItem('put', 1);
        console.error(error);
      });

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
          showAlert("Thay đổi thất bại!");
          localStorage.setItem('put', 2);
          console.error(error);
        });
    if(localStorage.getItem('put') == 0){
      showAlert("Chỉnh sửa thành công");
    }else if(localStorage.getItem('put') == 1){
      showAlert("Thông tin cá nhân không hợp lệ");
    }
    else{
      showAlert("Thay đổi mật khẩu không thành công");
    }
  });

    
    
        

    
