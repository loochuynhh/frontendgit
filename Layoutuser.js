const Users = `users`;
const url = `https://localhost:44308`;
// let person = {
//     name: "", 
//     email: "",
//     gender: "",
//     birth: "",
//     phone: "",
//     address: "",
//     username: "",
//     password: ""
// };
// let person = {};
var dropdownlogout = document.getElementById("logout")
    dropdownlogout.onclick = function (){
        window.location.assign("./Layoutanonymous.html");
        localStorage.clear();
    }
function showdata(person){
        var firstName = document.getElementById("firstName");
        var lastName = document.getElementById("lastName");
        var userName = document.getElementById("userName");
        var email = document.getElementById("email");
        var address = document.getElementById("address");
        var phoneNumber = document.getElementById("phoneNumber");
        var gender = document.getElementById("gender");
        var dateOfBirth = document.getElementById("dateOfBirth");
        var password = document.getElementById("password");
        var passwordConfirm = document.getElementById("passwordConfirm");
    
        let words = person.name.split(" ");
        let lastWord = words[words.length - 1];
        let remainingWords = words.slice(0, -1);
        firstName.value = lastWord;
        lastName.value = remainingWords;
        userName.value = person.username;
        email.value = person.email;
        address.value = person.address;
        phoneNumber.value = person.phone;
        if(person.gender == true){
            gender.value = "Nam";
        }
        else{gender.value = "Nu"}
        const dateISO = person.birth.split('T')[0];
        dateOfBirth.value = dateISO;
        password.value = person.password;
        passwordConfirm.value = person.password;
    
    }
const token2 = localStorage.getItem('token');
function getInfo() {
    fetch(`${url}/${Users}`, {
        method: 'GET',
        headers: {
        'Authorization' : "bearer " + token2
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
            username: data.username,
            password: data.password
        }
        showdata(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
} 
var Overlay = document.getElementById("overlay");
var OverlayInfor = document.getElementById("inforoverlay");

// var firstName = document.getElementById("firstName");
// var lastName = document.getElementById("lastName");
// var userName = document.getElementById("userName");
// var email = document.getElementById("email");
// var address = document.getElementById("address");
// var phoneNumber = document.getElementById("phoneNumber");
// var gender = document.getElementById("gender");
// var dateOfBirth = document.getElementById("dateOfBirth");
// var password = document.getElementById("password");
// var passwordConfirm = document.getElementById("passwordConfirm");

// async function Show() {
//     Overlay.style.display = "block";
//     OverlayInfor.style.display = "block";
//     getInfo();
// }
// Show().then(function() {
//         console.log(person);
//         console.log(person.email);
//         console.log(person.name);

//         let words = person.name.split(" ");
//         let lastWord = words[words.length - 1];
//         let remainingWords = words.slice(0, -1);
//         firstName.value = lastWord;
//         lastName.value = remainingWords;
//         userName.value = person.username;
//         email.value = person.email;
//         address.value = person.address;
//         phoneNumber.value = person.phone;
//         gender.value = person.gender;
//         dateOfBirth.value = person.birth;
//         password.value = person.password;
//         passwordConfirm.value = person.password;
//     });

var dropdowninfo = document.getElementById("info");
dropdowninfo.addEventListener("click", function() {
    Overlay.style.display = "block";
    OverlayInfor.style.display = "block";
    getInfo();
});


    
    
        

    
