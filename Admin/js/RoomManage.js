// const URLROOM = "https://636b935c7f47ef51e13457fd.mockapi.io/room";
const URLROOM = "https://localhost:44308/api/room";
const token = localStorage.getItem('token');
var genre = 1, roomSelected = "", checkUpdate = 1, checkRoomStatus;

window.onload = loadListRoom();
window.onload = loadData();

function loadListRoom() { 
    fetch(URLROOM, {
        method: 'GET',
        headers: {
            'Authorization': "bearer " + token
        },
    })
        .then(response => response.json())
        .then(data => {
            let selName = document.getElementById("RoomNameForSelect");
            for (let i = 0; i < data.length; i++) {
                let optName = document.createElement("option");
                optName.innerHTML = data[i].name;
                optName.setAttribute("value", data[i].id);

                selName.appendChild(optName);
            }
        })
        .catch(error => console.error(error));
}
function loadData() {
    roomSelected = document.getElementById("RoomNameForSelect").value;
    document.getElementById("selectedRoomStatus").disabled = false; 
    if (roomSelected !== "-1" && roomSelected !== "-2") {
        fetch(URLROOM + "/" + roomSelected, {
            method: 'GET',
            headers: {
                'Authorization': "bearer " + token
            },
        })
            .then(response => response.json())
            .then(data => { 
                document.getElementById("roomName").value = data.name;
                document.getElementById("row").value = data.row; 
                document.getElementById("col").value = data.col; 

                var listSeat = [];
                (data.seats).forEach(element => {
                    var seat = {
                        rowCoords: (element.position).substring(0, (element.position).indexOf("-")),
                        colCoords: (element.position).substring((element.position).indexOf("-") + 1),
                        seatTypeId: element.seatTypeId
                    };
                    listSeat.push(seat);
                }); 

                if (data.roomStatus === "READY"){
                    document.getElementById("selectedRoomStatus").value = "Bình thường";
                    document.getElementById("roomName").disabled = true;
                    document.getElementById("row").disabled = true;
                    document.getElementById("col").disabled = true;
                    document.getElementById("selectedSeatGenre").disabled = true; 
                    checkRoomStatus = "Bình thường";

                }
                if (data.roomStatus === "REPAIRING"){
                    document.getElementById("selectedRoomStatus").value = "Đang sửa"; 
                    document.getElementById("roomName").disabled = false;
                    document.getElementById("row").disabled = false;
                    document.getElementById("col").disabled = false;
                    document.getElementById("selectedSeatGenre").disabled = false;
                    checkRoomStatus = "Đang sửa";
                }
                GetRowCol();
                loadTypeSeat(listSeat);
                 
                
            })
            .catch(error => console.error(error));
    }else{
        // document.getElementById("roomName").value = "";
        // document.getElementById("row").value = "";
        // document.getElementById("col").value = "";
        // document.getElementById("selectedRoomStatus").value = "Bình thường";
        // document.getElementById("selectedSeatGenre").value = "VIP";  
        // document.getElementById("RoomNameForSelect").value = "-1";

        document.getElementById("roomName").disabled = true;
        document.getElementById("row").disabled = true; 
        document.getElementById("col").disabled = true; 
        document.getElementById("selectedRoomStatus").disabled = true;
        document.getElementById("selectedSeatGenre").disabled = true;
        document.getElementById("RoomNameForSelect").disabled = false;
        // document.getElementById("selectedRoomStatus").disabled = false;
        document.getElementById("seat").innerHTML = "";
    }
}
function loadTypeSeat(listSeat) {
    let liList = document.querySelectorAll(".seatMap");
    let colCount = document.getElementById("col").value;

    liList.forEach((li, index) => {
        let rowCoords = Math.floor(index / colCount) + 1; // lấy tọa độ hàng
        let colCoords = index % colCount + 1; // lấy tọa độ cột  
        listSeat.forEach(element => { 
            if (rowCoords == element.rowCoords && colCoords == element.colCoords) {
                console.log("map", element.rowCoords, element.colCoords);
                switch (element.seatTypeId) {
                    case 1:
                        { 
                            liList[index].classList.add("selected", "VIP");
                            break;
                        }
                    case 2:
                        { 
                            liList[index].classList.add("selected", "Double");
                            break;
                        }
                }
            }
        })
    });
}
function getSeatOption() {
    genre = document.getElementById("selectedSeatGenre").value; 
}
function changeSeatOption(li) {
    getSeatOption();
    if (genre === "VIP") {
        if (!li.classList.contains("selected")) {
            li.classList.add("selected", "VIP");
        } else {
            if (li.classList.contains("Double")) {
                li.classList.remove("Double");
                li.classList.add("VIP");
            } else
                li.classList.remove("selected", "Double", "VIP");
        }
    }
    if (genre === "Đôi") {
        if (!li.classList.contains("selected")) {
            li.classList.add("selected", "Double");
        } else {
            if (li.classList.contains("VIP")) {
                li.classList.remove("VIP");
                li.classList.add("Double");
            } else
                li.classList.remove("selected", "Double", "VIP");
        }
    }
    if (genre === "Thường") {
        li.classList.remove("selected", "VIP", "Double");
    }
}
function Seat() {
    if (col !== "" && row !== "") {
        const divScreen = document.createElement("div");
        divScreen.innerHTML = "MÀN HÌNH";
        divScreen.classList.add("screen");
        document.getElementById("seat").appendChild(divScreen);
        for (let i = 1; i <= row; i++) {
            let ul = document.createElement("ul");
            ul.className = "p-0";
            for (let j = 0; j <= parseInt(col) + 1; j++) {
                let li = document.createElement("li"); 
                if(j == "0" || j == parseInt(col) + 1){
                    li.className = "seat-root"; 
                    // console.log(65 + i);
                    li.textContent = String.fromCharCode(64 + i);
                }else{
                    li.className = "seatMap";
                    li.textContent = j;
                    if(checkRoomStatus === "Đang sửa"){
                        li.addEventListener("click", function () {
                            changeSeatOption(this);
                        });
                    } 
                }
                
                ul.appendChild(li);
            }
            document.getElementById("seat").appendChild(ul);
        }

        let divSaveCancel = document.createElement("div");
        divSaveCancel.className = "divSaveCancel";

        let btnSave = document.createElement("button");
        btnSave.classList.add("btn", "btn-outline-primary", "btn-save-cancel");
        btnSave.textContent = "LƯU";
        //btnSave.addEventListener("click", Save);
        btnSave.addEventListener("click", async (event) => {
            if(document.getElementById("roomName").value == ''){
                // alert("Vui lòng nhập tên phòng");
                Swal.fire('Vui lòng nhập tên phòng', 1000);
            }else{ Save();}
        })
        let btnCancel = document.createElement("button");
        btnCancel.classList.add("btn", "btn-outline-secondary", "btn-save-cancel");
        btnCancel.addEventListener("click", loadData);
        btnCancel.textContent = "HỦY BỎ";

        divSaveCancel.appendChild(btnSave);
        divSaveCancel.appendChild(btnCancel);

        document.getElementById("seat").appendChild(divSaveCancel);
    }

}
function GetRowCol() {
    row = document.getElementById("row").value;
    col = document.getElementById("col").value;
    document.getElementById("seat").innerHTML = "";
    Seat();
} 
function AddRoom() {
    checkUpdate = 0; 
    checkRoomStatus = "Đang sửa";
    document.getElementById("roomName").disabled = false;
    document.getElementById("row").disabled = false;
    document.getElementById("col").disabled = false;
    document.getElementById("selectedSeatGenre").disabled = false;

    document.getElementById("roomName").value = "";
    document.getElementById("row").value = "";
    document.getElementById("col").value = "";
    document.getElementById("selectedRoomStatus").value = "Bình thường";
    document.getElementById("selectedSeatGenre").value = "VIP";  
    document.getElementById("RoomNameForSelect").value = "-2";
    document.getElementById("selectedRoomStatus").disabled = true;
    document.getElementById("seat").innerHTML = "";
    createRoom(); 
}
function createRoom(){
    let liList = document.querySelectorAll(".seatMap");
    let colCount = document.getElementById("col").value;
    let listSeat = [];

    liList.forEach((li, index) => {
        let rowCoords = Math.floor(index / colCount) + 1; // lấy tọa độ hàng
        let colCoords = index % colCount + 1; // lấy tọa độ cột 
        let seatType = 3;
        if (li.classList.contains("VIP")) seatType = 1;
        if (li.classList.contains("Double")) seatType = 2;

        let seat = {
            position: rowCoords + "-" + colCoords,
            seatTypeId: seatType
        };
        listSeat.push(seat);
    });

    var newRoom = {
        name: document.getElementById("roomName").value,
        row: document.getElementById("row").value,
        col: document.getElementById("col").value,
        seats: listSeat
    } 
    return newRoom;
}
function createRoomforUpdate(){
    let liList = document.querySelectorAll(".seatMap");
    let colCount = document.getElementById("col").value;
    let listSeat = [];

    liList.forEach((li, index) => {
        let rowCoords = Math.floor(index / colCount) + 1; // lấy tọa độ hàng
        let colCoords = index % colCount + 1; // lấy tọa độ cột 
        let seatType = 3;
        if (li.classList.contains("VIP")) seatType = 1;
        if (li.classList.contains("Double")) seatType = 2;

        let seat = { 
            position: rowCoords + "-" + colCoords,
            seatTypeId: seatType
        };
        listSeat.push(seat);
    });

    var newRoom = {
        id: document.getElementById("RoomNameForSelect").value,
        name: document.getElementById("roomName").value,
        row: document.getElementById("row").value,
        col: document.getElementById("col").value,
        seats: listSeat
    } 
    return newRoom;
}
function DeleteRoom() {
    Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa phòng này',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
            if (roomSelected !== "-1" && roomSelected !== "-2") {
                fetch(URLROOM + "/" + roomSelected, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': "bearer " + token
                    },
                }).then(response => {
                    console.log(response.status);
                    if (response.status == '400') {
                        // alert("Xóa phòng chiếu thất bại! Phòng chiếu đã tồn tại lịch chiếu");
                        Swal.fire({
                            position: 'top',
                            icon: 'error',
                            title: 'Lỗi',
                            text: 'Xóa phòng chiếu thất bại',
                            timer: 1000
                          })
                    }
                    if(response.ok){
                        // alert("Xóa phòng chiếu thành công");
                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'Xóa phòng chiếu thành công',
                            showConfirmButton: false,
                            timer: 800
                          })
                        let select = document.getElementById("RoomNameForSelect");
                        for (let i = select.options.length - 1; i >= 2; i--) {
                            select.remove(i);
                        }
                        location.reload(); 
                    }
                })
                
            }
        }
      })
}

function Save() {
    if (checkUpdate === 1) {            //Thuc hien update
        console.log("update");
        if(document.getElementById("selectedRoomStatus").value !== checkRoomStatus){
            console.log("request change status");
            var roomStatus = "READY";
            if (document.getElementById("selectedRoomStatus").value === "Đang sửa") roomStatus = "REPAIRING"; 
            const URLSTATUSROOM = 'https://localhost:44308/api/room/status/' + document.getElementById("RoomNameForSelect").value + '?roomStatus=' + roomStatus
            console.log("idroom url:", URLSTATUSROOM);
            fetch(URLSTATUSROOM, {
                method: "PUT",
                headers: {  
                    "Authorization": "bearer " + token
                }, 
            }).then(response => {
                console.log(response.status); 
                if (response.status == '400') {
                    // alert("Đổi trạng thái phòng chiếu thất bại! Phòng chiếu đã có lịch đặt");
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Đổi trạng thái phòng chiếu thất bại!',
                        footer: '<a>Phòng chiếu đã có lịch đặt</a>',
                        timer: 1000
                      })
                }
                if(response.ok){
                    // alert("Đổi trạng thái phòng chiếu thành công!");
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Đổi trạng thái phòng chiếu thành công',
                        showConfirmButton: false,
                        timer: 800
                      })
                    location.reload();
                }
            })
            
        }else{
            console.log("request change room");
            var newRoomforUpdate = createRoomforUpdate(); 
            console.log(newRoomforUpdate);
            const URLSTATUSROOM = 'https://localhost:44308/api/room';
            fetch(URLSTATUSROOM, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + token
                },
                body: JSON.stringify(newRoomforUpdate)
            }).then(response => {
                console.log(response.status); 
                if (response.status == '400') alert("Đổi trạng thái phòng chiếu thất bại! Phòng chiếu phải ở trạng thái đang sửa");
                if(response.ok){
                    // alert("Cập nhật phòng chiếu thành công!");
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Cập nhật phòng chiếu thành công',
                        showConfirmButton: false,
                        timer: 800
                      })
                    location.reload();
                }
            }) 
        }
        
    }
    if (checkUpdate === 0) {
        console.log("add");
        var newRoom = createRoom(); 
        fetch(URLROOM, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify(newRoom)
        }).then(response => {
            console.log(response.status);
            if (response.status == '400') {
                // alert("Thêm phòng chiếu thất bại! Tên phòng chiếu đã tồn tại");
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Thêm phòng chiếu thất bại! Tên phòng chiếu đã tồn tại',
                    timer: 1000
                  })
            }
            if(response.ok){
                // alert("Thêm phòng chiếu thành công");
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Thêm phòng chiếu thành công',
                    showConfirmButton: false,
                    timer: 800
                  })
                location.reload();
            }
        })
        
        
    }

}



