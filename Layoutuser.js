const Users = `users`;
const url = `https://localhost:44308`;
const token = localStorage.getItem('token');

var Overlay = document.getElementById("overlay");
var OverlayInfor = document.getElementById("inforoverlay");
var dropdowninfo = document.getElementById("info");
var dropdownlogout = document.getElementById("logout");

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
        // var password = document.getElementById("password");
        // var passwordConfirm = document.getElementById("passwordConfirm");
    
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
        console.log(response.status.toString());
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
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
    var role = "USER";
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var Gender = document.getElementById("gender").value;
    var gender = false;
    if(Gender.value == "0") {
        gender = true;
    }
    var birth = document.getElementById("dateOfBirth").value;
    
    fetch(`${url}/${Users}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : "bearer " + token
      },
      body: JSON.stringify({
        id: 0,
        name: name,
        email: email,
        gender: gender,
        birth: birth,
        phone: phoneNumber,
        address: address,
        RoleName: role
      })
    })
      .then(response => {
        if (response.ok) {
            showAlert("Chỉnh sửa thành công!");
          } else {
            showAlert("Chỉnh sửa thất bại!");
          }
      })
      .catch(error => {
        showAlert("Chỉnh sửa thất bại!");
        console.error(error);
      });
  });

    
    
        

    
