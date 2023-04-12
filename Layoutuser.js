const Users = `users`;
const url = `https://localhost:44308`;
const token = localStorage.getItem('token');

var dropdownlogout = document.getElementById("logout")
    dropdownlogout.onclick = function (){
        window.location.assign("./Layoutanonymous.html");
    }

const token2 = localStorage.getItem('token');
function getInfo() {
// Gửi request đến API để lấy thông tin người dùng
    fetch(`${url}/${Users}`, {
        method: 'GET',
        headers: {
        //'Authorization': `Bearer ${token2}` // Thêm token vào header Authorization
        'Authorization' : "bearer " + token2
        }
    })
    .then(response => {
        if(response.status === 401){
            handleUnauthorized();
        }
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Xử lý dữ liệu nhận được
        console.log(data);
    })
    .catch(error => {
        // Xử lý lỗi
        console.error('There was a problem with the fetch operation:', error);
    });
}
function users() {
        fetch(`${url}/${Users}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            console.log(response.status.toString());
            if (!response.ok) {
                throw new Error('Unauthorized');
            }
            else 
            { 
                //window.location.assign("./Layoutuser.html"); 
                return response.json();
            }
            
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
      }
var dropdowninfo = document.getElementById("info");
    dropdowninfo.onclick = function (){
        console.log(token);
        getInfo();
    }
