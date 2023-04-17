const Users = `users`;
const url = `https://localhost:44308`;
const token = localStorage.getItem('token');

var Overlay = document.getElementById("overlay");
var OverlayInfor = document.getElementById("inforoverlay");
var dropdowninfo = document.getElementById("info");
var dropdownlogout = document.getElementById("logout");


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
            gender.value = "Nam";
        }
        else{gender.value = "Nu"}
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
        person = {
            name: data.name, 
            email: data.email,
            gender: data.gender,
            birth: data.birth,
            phone: data.phone,
            address: data.address,
            // password: data.password
        }
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


    
    
        

    
