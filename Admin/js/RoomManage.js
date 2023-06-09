const URLROOM = "https://localhost:44308/api/room"; 
var genre = 1, roomSelected = "", checkUpdate = 1, checkRoomStatus, row, col;

window.onload = init();

function init(){
    //Xóa các option của select phòng chiếu
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
//Thêm các option cho thẻ select
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
//Lấy dữ liệu phòng chiếu
function loadData() {
    checkUpdate = 1;
    roomSelected = document.getElementById("RoomNameForSelect").value;          //Id được gán vào value
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
                GetRowCol();                //Lấy số lượng hàng cột, sau đó tạo sơ đồ ghế
                loadTypeSeat(listSeat);     //Load loại ghế vào sơ đồ
            })
            .catch(error => console.error(error));
    } else { 
        document.getElementById("roomName").disabled = true;
        document.getElementById("row").disabled = true;
        document.getElementById("col").disabled = true;
        document.getElementById("selectedRoomStatus").disabled = true;
        document.getElementById("selectedSeatGenre").disabled = true;
        document.getElementById("RoomNameForSelect").disabled = false; 
        document.getElementById("seat").innerHTML = "";
    }
}
//Load loại ghế vào sơ đồ
function loadTypeSeat(listSeat) {
    let liList = document.querySelectorAll(".seatMap");
    let colCount = document.getElementById("col").value;

    liList.forEach((li, index) => {
        let rowCoords = Math.floor(index / colCount) + 1;       // lấy tọa độ hàng
        let colCoords = index % colCount + 1;                   // lấy tọa độ cột  
        listSeat.forEach(element => {
            if (rowCoords == element.rowCoords && colCoords == element.colCoords) { 
                switch (element.seatTypeId) {
                    case 1:
                        {
                            li.classList.add("selected", "VIP");
                            li.style.backgroundImage = "url('./Image/seatVip.svg')";
                            li.style.backgroundSize = "cover";
                            li.style.backgroundPosition = "center";
                            break;
                        }
                    case 2:
                        {
                            li.classList.add("selected", "Double");
                            li.style.backgroundImage = "url('./Image/seatDouble.svg')";
                            li.style.backgroundSize = "cover";
                            li.style.backgroundPosition = "center";
                            break;
                        }
                }
            }
        })
    });
}
//Khi loại ghế thay đổi
function getSeatOption() {
    genre = document.getElementById("selectedSeatGenre").value;
}
function changeSeatOption(li) {
    getSeatOption();
    if (genre === "VIP") {
        if (!li.classList.contains("selected")) {
            li.classList.add("selected", "VIP");
            li.style.backgroundImage = "url('./Image/seatVip.svg')";
            li.style.backgroundSize = "cover";
            li.style.backgroundPosition = "center";
        } else {
            if (li.classList.contains("Double")) {
                li.classList.remove("Double");
                li.classList.add("VIP");
                li.style.backgroundImage = "url('./Image/seatVip.svg')";
                li.style.backgroundSize = "cover";
                li.style.backgroundPosition = "center";
            } else{
                li.classList.remove("selected", "Double", "VIP");
                li.style.backgroundImage = "url('./Image/seatNormal.svg')";
                li.style.backgroundSize = "cover";
                li.style.backgroundPosition = "center";
            }
        }
    }
    if (genre === "Đôi") {
        if (!li.classList.contains("selected")) {
            li.classList.add("selected", "Double");
            li.style.backgroundImage = "url('./Image/seatDouble.svg')";
            li.style.backgroundSize = "cover";
            li.style.backgroundPosition = "center";
        } else {
            if (li.classList.contains("VIP")) {
                li.classList.remove("VIP");
                li.classList.add("Double");
                li.style.backgroundImage = "url('./Image/seatDouble.svg')";
                li.style.backgroundSize = "cover";
                li.style.backgroundPosition = "center";
            } else{
                li.classList.remove("selected", "Double", "VIP");
                li.style.backgroundImage = "url('./Image/seatNormal.svg')";
                li.style.backgroundSize = "cover";
                li.style.backgroundPosition = "center";
            }
        }
    }
    if (genre === "Thường") {
        li.classList.remove("selected", "VIP", "Double");
        li.style.backgroundImage = "url('./Image/seatNormal.svg')";
        li.style.backgroundSize = "cover";
        li.style.backgroundPosition = "center";
    }
}
function changeRowSeatOption(liRow, rowIndex){
    getSeatOption();
    let liList = document.querySelectorAll(".seatMap");
    let colCount = document.getElementById("col").value; 

    liList.forEach((li, index) => {
        let rowCoords = Math.floor(index / colCount) + 1;   // lấy tọa độ hàng
        let colCoords = index % colCount + 1;               // lấy tọa độ cột   
        if (rowCoords == rowIndex){ 
            if (genre === "VIP") {
                if (!liRow.classList.contains("selected") || (liRow.classList.contains("selected") && liRow.classList.contains("seatRootDouble"))) {
                    li.classList.remove("Double");
                    li.classList.add("selected", "VIP");
                    li.style.backgroundImage = "url('./Image/seatVip.svg')";
                    li.style.backgroundSize = "cover";
                    li.style.backgroundPosition = "center";  
                } else {
                    li.classList.remove("selected", "Double", "VIP");
                    li.style.backgroundImage = "url('./Image/seatNormal.svg')";
                    li.style.backgroundSize = "cover";
                    li.style.backgroundPosition = "center";  
                }
            }
            else if (genre === "Đôi") {
                if (!liRow.classList.contains("selected") || (liRow.classList.contains("selected") && liRow.classList.contains("seatRootVIP"))) {
                    li.classList.remove("VIP");
                    li.classList.add("selected", "Double");
                    li.style.backgroundImage = "url('./Image/seatDouble.svg')";
                    li.style.backgroundSize = "cover";
                    li.style.backgroundPosition = "center"; 
                    // liRow.classList.add("seatRootDouble");
                } else {
                    li.classList.remove("selected", "Double", "VIP");
                    li.style.backgroundImage = "url('./Image/seatNormal.svg')";
                    li.style.backgroundSize = "cover";
                    li.style.backgroundPosition = "center";   
                }
            }
            else if (genre === "Thường") {
                li.classList.remove("selected", "Double", "VIP");
                li.style.backgroundImage = "url('./Image/seatNormal.svg')";
                li.style.backgroundSize = "cover";
                li.style.backgroundPosition = "center";  
            }
        } 
    }); 
    if (genre === "VIP") {
        if (!liRow.classList.contains("selected")) { 
            liRow.classList.add("seatRootVIP");
            liRow.classList.add("selected");
        } else {
            if (liRow.classList.contains("seatRootDouble")){ 
                liRow.classList.remove("seatRootDouble");
                liRow.classList.add("seatRootVIP");
            } 
            liRow.classList.remove("selected");
        }
    }
    else if (genre === "Đôi") {
        if (!liRow.classList.contains("selected")) { 
            liRow.classList.add("seatRootDouble");
            liRow.classList.add("selected");
        } else {
            if(liRow.classList.contains("seatRootVIP")){ 
                liRow.classList.remove("seatRootVIP");
                liRow.classList.add("seatRootDouble");
            }  
            liRow.classList.remove("selected");
        }
    }
    else if (genre === "Thường") {
        liRow.classList.remove("seatRootVIP", "seatRootDouble","selected");  
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
                    li.addEventListener("click", function () { 
                        changeRowSeatOption(this,i);
                    });
                } else {
                    li.className = "seatMap"; 
                    li.style.backgroundImage = "url('./Image/seatNormal.svg')";
                    li.style.backgroundSize = "cover";
                    li.style.backgroundPosition = "center";
                    let span = document.createElement("span");
                    span.textContent = j;
                    span.classList.add("seat-label");
                    li.appendChild(span); 
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
                Swal.fire({
                    position: 'top',
                    text: 'Vui lòng nhập tên phòng',
                    icon: 'warning', 
                    confirmButtonText: 'OK'
                }) 
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
            icon: 'warning', 
            confirmButtonText: 'OK'
        }).then(() => { 
            document.getElementById("row").value = "";
        });
    }else if (parseInt(col) > 15){
        Swal.fire({
            position: 'top',
            text: 'Số lượng cột ghế không được lớn hơn 15',
            icon: 'warning', 
            confirmButtonText: 'OK'
        }).then(() => { 
            document.getElementById("col").value = "";
        }); 
    }else if(parseInt(row) === 0){
        Swal.fire({
            position: 'top',
            text: 'Số lượng hàng ghế không được bằng 0',
            icon: 'warning', 
            confirmButtonText: 'OK'
        }).then(() => { 
            document.getElementById("row").value = "";
        });
    }else if(parseInt(col) === 0){
        Swal.fire({
            position: 'top',
            text: 'Số lượng cột ghế không được bằng 0',
            icon: 'warning', 
            confirmButtonText: 'OK'
        }).then(() => { 
            document.getElementById("col").value = "";
        }); 
    }else{
        document.getElementById("seat").innerHTML = "";
        Seat();
    } 
}
// Khi ấn vào btn thêm phòng chiếu
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
    if (roomSelected !== "-1" && roomSelected !== "-2"){
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa phòng này',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',  
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(URLROOM + "/" + roomSelected, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': "bearer " + localStorage.getItem('token')
                    },
                }).then(response => { 
                    if (response.status == '403') {
                        window.location.href = "/Forbidden.html"
                    }
                    if (response.status == '401') {
                        window.location.href = "/Unauthorized.html"
                    } 
                    if (response.status == '400') { 
                        Swal.fire({
                            position: 'top',
                            icon: 'error',
                            title: 'THẤT BẠI',
                            text: 'Phòng chiếu đã tồn tại lịch chiếu', 
                        })
                    }
                    if (response.ok) { 
                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'Xóa Phòng Chiếu Thành Công',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => { 
                            init(); 
                        });  
                    }
                })
            }
        })
    }else{
        Swal.fire({
            position: 'top',
            text: 'Chọn 1 phòng chiếu để xóa',
            icon: 'warning', 
            confirmButtonText: 'OK'
        }) 
    }
    
}

function Save() {
    if (checkUpdate === 1) {            //Thuc hien update 
        if (document.getElementById("selectedRoomStatus").value !== checkRoomStatus) {      //Thực hiện đổi trạng thái
            var roomStatus = "READY";
            if (document.getElementById("selectedRoomStatus").value === "Đang sửa") roomStatus = "REPAIRING";
            const URLSTATUSROOM = 'https://localhost:44308/api/room/status/' + document.getElementById("RoomNameForSelect").value + '?roomStatus=' + roomStatus; 
            fetch(URLSTATUSROOM, {
                method: "PUT",
                headers: {
                    "Authorization": "bearer " + localStorage.getItem('token')
                },
            }).then(response => {
                if (response.status == '403') {
                    window.location.href = "/Forbidden.html"
                }
                if (response.status == '401') {
                    window.location.href = "/Unauthorized.html"
                } 
                if (response.status == '400') { 
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'THẤT BẠI',
                        text: 'Phòng chiếu đã có lịch đặt',  
                    })
                }
                if (response.ok) { 
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Đổi Trạng Thái Phòng Chiếu Thành Công',
                        showConfirmButton: false, 
                        timer: 1500
                    }).then(() => {
                        init();
                    });  
                }
            })

        } else {                            // Thực hiện cập nhật phòng
            var newRoomforUpdate = createRoomforUpdate(); 
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
                    window.location.href = "/Forbidden.html"
                }
                if (response.status == '401') {
                    window.location.href = "/Unauthorized.html"
                } 
                if (response.status == '400'){
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'THẤT BẠI',
                        text: 'Phòng chiếu phải ở trạng thái đang sửa', 
                    })
                } 
                if (response.ok) { 
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Cập Nhật Phòng Chiếu Thành Công',
                        showConfirmButton: false,
                        timer: 1500,
                        width: '41%'
                    }).then(() => {
                        init();
                    });  
                }
            })
        }

    }
    if (checkUpdate === 0) {            //add phòng
        var newRoom = createRoom();
        fetch(URLROOM, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(newRoom)
        }).then(response => { 
            if (response.status == '403') {
                window.location.href = "/Forbidden.html"
            }
            if (response.status == '401') {
                window.location.href = "/Unauthorized.html"
            } 
            if (response.status == '400') { 
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'THẤT BẠI',
                    text: 'Tên Phòng Chiếu Đã Tồn Tại', 
                })
            }
            if (response.ok) { 
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Thêm Phòng Chiếu Thành Công',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    init();
                });  
            }
        }) 
    } 
}



