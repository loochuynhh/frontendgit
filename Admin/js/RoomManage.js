const URLROOM = "https://localhost:44308/api/room"; 
var genre = 1, roomSelected = "", checkUpdate = 1, checkRoomStatus;

window.onload = init();

function init(){
    let select = document.getElementById("RoomNameForSelect");
    for (let i = select.options.length - 1; i >= 2; i--) {
        select.remove(i);
    } 
    document.getElementById("RoomNameForSelect").value = "-1";
    document.getElementById("roomName").value = "";
    document.getElementById("row").value = "";
    document.getElementById("col").value = "";  
    loadListRoom();
    loadData();
}

function loadListRoom() {
    document.getElementById("roomName").value = "";
    document.getElementById("row").value = "";
    document.getElementById("col").value = "";  
    fetch(URLROOM, {
        method: 'GET',
        headers: {
            'Authorization': "bearer " + localStorage.getItem('token')
        },
    })
        .then(response => {
            if (response.status == '403') {
                window.location.href = "/Forbidden.html"
            }
            if (response.status == '401') {
                window.location.href = "/Unauthorized.html"
            }
            return response.json()
        })
        .then(data => {
            let selName = document.getElementById("RoomNameForSelect");
            for (let i = 0; i < data.length; i++) {
                let optName = document.createElement("option");
                optName.innerHTML = data[i].name;
                optName.setAttribute("value", data[i].id);

                selName.appendChild(optName);
            }
        }).catch(error => console.error(error));
}
function loadData() {
    checkUpdate = 1;
    roomSelected = document.getElementById("RoomNameForSelect").value;
    document.getElementById("selectedRoomStatus").disabled = false;
    if (roomSelected !== "-1" && roomSelected !== "-2") {
        fetch(URLROOM + "/" + roomSelected, {
            method: 'GET',
            headers: {
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
            .then(response => {
                if (response.status == '403') {
                    window.location.href = "http://127.0.0.1:5502/Forbidden.html"
                }
                if (response.status == '401') {
                    window.location.href = "http://127.0.0.1:5502/Unauthorized.html"
                }
                return response.json()
            })
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

                if (data.roomStatus === "READY") {
                    document.getElementById("selectedRoomStatus").value = "Bình thường";
                    document.getElementById("roomName").disabled = true;
                    document.getElementById("row").disabled = true;
                    document.getElementById("col").disabled = true;
                    document.getElementById("selectedSeatGenre").disabled = true;
                    checkRoomStatus = "Bình thường";

                }
                if (data.roomStatus === "REPAIRING") {
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
    } else { 
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
                if (j == "0" || j == parseInt(col) + 1) {
                    li.className = "seat-root"; 
                    li.textContent = String.fromCharCode(64 + i);
                } else {
                    li.className = "seatMap";
                    li.textContent = j;
                    if (checkRoomStatus === "Đang sửa") {
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
        btnSave.addEventListener("click", async (event) => {
            if (document.getElementById("roomName").value == '') { 
                Swal.fire('Vui lòng nhập tên phòng');
            } else { Save(); }
        })
        let btnCancel = document.createElement("button");
        btnCancel.classList.add("btn", "btn-outline-secondary", "btn-save-cancel");
        btnCancel.addEventListener("click", function(){
            document.getElementById("roomName").value = "";
            document.getElementById("row").value = "";
            document.getElementById("col").value = "";  
            loadData();
        });
        btnCancel.textContent = "HỦY BỎ";

        divSaveCancel.appendChild(btnSave);
        divSaveCancel.appendChild(btnCancel);

        document.getElementById("seat").appendChild(divSaveCancel);
    }

}
function GetRowCol() {
    row = document.getElementById("row").value;
    col = document.getElementById("col").value; 
    if(parseInt(row) > 25){
        Swal.fire({
            position: 'top',
            text: 'Số lượng hàng ghế không được lớn hơn 25',
            icon: 'error', 
            confirmButtonText: 'OK'
        }).then((result) => { 
            document.getElementById("row").value = "";
        });
    }else if (parseInt(col) > 20){
        Swal.fire({
            position: 'top',
            text: 'Số lượng cột ghế không được lớn hơn 20',
            icon: 'error', 
            confirmButtonText: 'OK'
        }).then((result) => { 
            document.getElementById("col").value = "";
        }); 
    }else{
        document.getElementById("seat").innerHTML = "";
        Seat();
    } 
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
function createRoom() {
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
function createRoomforUpdate() {
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
                        'Authorization': "bearer " + localStorage.getItem('token')
                    },
                }).then(response => {
                    console.log(response.status);
                    if (response.status == '403') {
                        window.location.href = "http://127.0.0.1:5502/Forbidden.html"
                    }
                    if (response.status == '401') {
                        window.location.href = "http://127.0.0.1:5502/Unauthorized.html"
                    } 
                    if (response.status == '400') { 
                        Swal.fire({
                            position: 'top',
                            icon: 'error',
                            title: 'Xóa phòng chiếu thất bại',
                            text: 'Phòng chiếu đã tồn tại lịch chiếu',
                            timer: 2000
                        })
                    }
                    if (response.ok) { 
                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'Xóa phòng chiếu thành công',
                            showConfirmButton: false,
                            timer: 1500
                        }).then((result) => { 
                            init(); 
                        });  
                    }
                })

            }
        }
    })
}

function Save() {
    if (checkUpdate === 1) {            //Thuc hien update
        console.log("update");
        if (document.getElementById("selectedRoomStatus").value !== checkRoomStatus) {
            console.log("request change status");
            var roomStatus = "READY";
            if (document.getElementById("selectedRoomStatus").value === "Đang sửa") roomStatus = "REPAIRING";
            const URLSTATUSROOM = 'https://localhost:44308/api/room/status/' + document.getElementById("RoomNameForSelect").value + '?roomStatus=' + roomStatus
            console.log("idroom url:", URLSTATUSROOM);
            fetch(URLSTATUSROOM, {
                method: "PUT",
                headers: {
                    "Authorization": "bearer " + localStorage.getItem('token')
                },
            }).then(response => {
                if (response.status == '403') {
                    window.location.href = "http://127.0.0.1:5502/Forbidden.html"
                }
                if (response.status == '401') {
                    window.location.href = "http://127.0.0.1:5502/Unauthorized.html"
                } 
                if (response.status == '400') {
                    // alert("Đổi trạng thái phòng chiếu thất bại! Phòng chiếu đã có lịch đặt");
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'Đổi trạng thái phòng chiếu thất bại',
                        text: 'Phòng chiếu đã có lịch đặt',
                        // footer: '<a>Phòng chiếu đã có lịch đặt</a>',
                        timer: 2000
                    })
                }
                if (response.ok) {
                    // alert("Đổi trạng thái phòng chiếu thành công!");
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Đổi trạng thái phòng chiếu thành công',
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        init();
                    });  
                }
            })

        } else {
            console.log("request change room");
            var newRoomforUpdate = createRoomforUpdate();
            console.log(newRoomforUpdate);
            const URLSTATUSROOM = 'https://localhost:44308/api/room';
            fetch(URLSTATUSROOM, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + localStorage.getItem('token')
                },
                body: JSON.stringify(newRoomforUpdate)
            }).then(response => { 
                if (response.status == '403') {
                    window.location.href = "http://127.0.0.1:5502/Forbidden.html"
                }
                if (response.status == '401') {
                    window.location.href = "http://127.0.0.1:5502/Unauthorized.html"
                } 
                if (response.status == '400'){
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'Đổi trạng thái phòng chiếu thất bại',
                        text: 'Phòng chiếu phải ở trạng thái đang sửa',
                        timer: 2000, 
                    })
                } 
                if (response.ok) {
                    // alert("Cập nhật phòng chiếu thành công!");
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Cập nhật phòng chiếu thành công',
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        init();
                    });  
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
                "Authorization": "bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(newRoom)
        }).then(response => {
            console.log(response.status);
            if (response.status == '403') {
                window.location.href = "http://127.0.0.1:5502/Forbidden.html"
            }
            if (response.status == '401') {
                window.location.href = "http://127.0.0.1:5502/Unauthorized.html"
            } 
            if (response.status == '400') { 
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Thêm phòng chiếu thất bại',
                    text: 'Tên phòng chiếu đã tồn tại',
                    timer: 2000
                })
            }
            if (response.ok) { 
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Thêm phòng chiếu thành công',
                    showConfirmButton: false,
                    timer: 1000
                }).then((result) => {
                    init();
                });  
            }
        }) 
    } 
}



