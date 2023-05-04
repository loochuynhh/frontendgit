// const URLROOM = "https://636b935c7f47ef51e13457fd.mockapi.io/room";
const URLROOM = "https://localhost:44308/api/room";
const token = localStorage.getItem('token'); 
var genre = 1, roomSelected = "", checkUpdate = 1;

window.onload = loadListRoom();
window.onload = loadData();

function loadListRoom() {
    console.log(token);
    fetch(URLROOM,{
        method: 'GET',
        headers: {
            'Authorization' : "bearer " + token
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
    console.log(roomSelected);
    if (roomSelected !== "-1" && roomSelected !== "-2") {
        fetch(URLROOM + "/" + roomSelected, {
            method: 'GET',
            headers: {
            'Authorization' : "bearer " + token
            },
        })
            .then(response => response.json())
            .then(data => {
                //console.log(roomSelected);
                document.getElementById("roomName").value = data.name;
                document.getElementById("row").value = data.row;
                document.getElementById("col").value = data.col;

                if (data.roomStatus === "READY") 
                    document.getElementById("selectedRoomStatus").value ="Bình thường";
                if (data.roomStatus === "REPAIRING")
                    document.getElementById("selectedRoomStatus").value ="Đang sửa";
                // document.getElementById("selectedSeatGenre").value = data.Col;
                GetRowCol(); 
            })
            .catch(error => console.error(error));
    }
}
function getSeatOption() {
    genre = document.getElementById("selectedSeatGenre").value;
    console.log(genre);
}
function Seat() {
    if (col !== "" && row !== "") {
        for (let i = 1; i <= row; i++) {
            let ul = document.createElement("ul");
            for (let j = 1; j <= col; j++) {
                let li = document.createElement("li");
                li.textContent = j;
                li.addEventListener("click", () => {
                    getSeatOption();
                    if (genre === "VIP") {
                        if (!li.classList.contains("selected")) { 
                            li.classList.add("selected","VIP");
                        } else { 
                            if(li.classList.contains("Double")){
                                li.classList.remove("Double");
                                li.classList.add("VIP");
                            }else
                            li.classList.remove("selected","Double", "VIP");
                        }
                    }
                    if (genre === "Đôi") {
                        if (!li.classList.contains("selected")) { 
                            li.classList.add("selected", "Double");
                        } else {
                            if(li.classList.contains("VIP")){
                                li.classList.remove("VIP");
                                li.classList.add("Double");
                            }else
                            li.classList.remove("selected","Double", "VIP"); 
                        }
                    }
                    if (genre === "Thường") { 
                        li.classList.remove("selected", "VIP", "Double");
                    }

                });
                ul.appendChild(li);
            }
            document.getElementById("seat").appendChild(ul);
        }
        let divSaveCancel = document.createElement("div");
        divSaveCancel.className = "divSaveCancel";

        let btnSave = document.createElement("button");
        btnSave.classList.add("btn", "btn-success", "btn-save-cancel");
        btnSave.textContent = "LƯU";
        btnSave.addEventListener("click", Save);
        let btnCancel = document.createElement("button");
        btnCancel.classList.add("btn", "btn-secondary", "btn-save-cancel");
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
    // console.log(row);
    // console.log(col);
    // if (col === "") console.log("col");
    document.getElementById("seat").innerHTML = "";
    Seat();
}
function AddRoom() {
    checkUpdate = 0;
    document.getElementById("roomName").value = "";
    document.getElementById("row").value = "";
    document.getElementById("col").value = "";
    document.getElementById("selectedRoomStatus").value = "Bình thường";
    document.getElementById("selectedSeatGenre").value = "VIP";
    document.getElementById("RoomNameForSelect").value = "-2";

    const newRoom = {
        name: document.getElementById("roomName").value,
        row: document.getElementById("row").value,
        col: document.getElementById("col").value, 
    }

    console.log(newRoom);
    // fetch(URLROOM + "/" + roomSelected, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization' : "bearer " + token
    //     },
    //     body: JSON.stringify({
    //         email: username,
    //         password: password,
    //     }),
    // })
    //     .then(response => response.json())
    //     .then(data => {

    //     })
    //     .catch(error => console.error(error));
}

function DeleteRoom() {
    if (roomSelected !== "-1" && roomSelected !== "-2") {
        fetch(URLROOM + "/" + roomSelected, {
            method: 'DELETE',
            headers: {
                'Authorization' : "bearer " + token
            },
        })
        let select = document.getElementById("RoomNameForSelect");
        for (let i = select.options.length - 1; i >= 2; i--) {
            select.remove(i);
        }
        location.reload(); 
    }
}

function Save() {
    if (checkUpdate === 1) {
        console.log("update");
        fetch(URLROOM + "/" + roomSelected, {
            method: 'PUT',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({
                IdRoom: document.getElementById("roomName").value,
                Row: document.getElementById("row").value,
                Col: document.getElementById("col").value,
                RoomName: document.getElementById("selectedRoomStatus").value,
                Status: document.getElementById("selectedSeatGenre").value,
                // IdRoom: roomSelected,
                // Row: 9,
                // Col: 7,
                // RoomName: "Bình thường",
                // Status: "VIP",
            }),
        })
            .then(response => {
                if (response.ok) {
                    console.log("succes update");
                } else {
                    console.log("fail update");
                }
            })
            .catch(error => {
                console.log("fail update");
            });
    }
    if (checkUpdate === 1) {
        console.log("add");
        fetch(URLROOM, {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({
                IdRoom: document.getElementById("roomName").value,
                Row: document.getElementById("row").value,
                Col: document.getElementById("col").value,
                RoomName: document.getElementById("selectedRoomStatus").value,
                Status: document.getElementById("selectedSeatGenre").value,
                // IdRoom: roomSelected,
                // Row: 9,
                // Col: 7,
                // RoomName: "Bình thường",
                // Status: "VIP",
            }),
        })
            .then(response => {
                if (response.ok) {
                    console.log("succes update");
                } else {
                    console.log("fail update");
                }
            })
            .catch(error => {
                console.log("fail update");
            });
    }
}



