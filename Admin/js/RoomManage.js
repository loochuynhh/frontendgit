// const URLROOM = "https://636b935c7f47ef51e13457fd.mockapi.io/room";
const URLROOM = "https://localhost:7163/api/room";

window.onload = loadListRoom();
window.onload = loadData();

var genre = 1, roomSelected = "", checkUpdate = 1;
function loadListRoom() {
    fetch(URLROOM,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            password: password,
        }),
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
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify({
            //     email: username,
            //     password: password,
            // }),
        })
            .then(response => response.json())
            .then(data => {
                //console.log(roomSelected);
                document.getElementById("roomName").value = data.RoomName;
                document.getElementById("row").value = data.Row;
                document.getElementById("col").value = data.Col;
                document.getElementById("selectedRoomStatus").value = "Đang sửa"; //Chưa có data, khi nào có đổi thành data.Status;      
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
                            li.style.backgroundColor = "red";
                            li.style.color = "white";
                            li.classList.add("selected");
                        } else {
                            // Nếu ô li đang được chọn, thì xoá thuộc tính style
                            li.style.backgroundColor = "";
                            li.style.color = "";
                            li.classList.remove("selected");
                        }
                    }
                    if (genre === "Đôi") {
                        if (!li.classList.contains("selected")) {
                            li.style.backgroundColor = "green";
                            li.style.color = "white";
                            li.classList.add("selected");
                        } else {
                            // Nếu ô li đang được chọn, thì xoá thuộc tính style
                            li.style.backgroundColor = "";
                            li.style.color = "";
                            li.classList.remove("selected");
                        }
                    }
                    if (genre === "Thường") {
                        li.style.backgroundColor = "";
                        li.style.color = "";
                        li.classList.remove("selected");
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
    fetch(URLROOM + "/" + roomSelected, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify({
        //     email: username,
        //     password: password,
        // }),
    })
        .then(response => response.json())
        .then(data => {

        })
        .catch(error => console.error(error));
}

function DeleteRoom() {
    if (roomSelected !== "-1" && roomSelected !== "-2") {
        fetch(URLROOM + "/" + roomSelected, {
            method: 'Delete',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify({s
            //     email: username,
            //     password: password,
            // }),
        })
            .then(response => response.json())
            .then(data => {
                let select = document.getElementById("RoomNameForSelect");
                for (let i = select.options.length - 1; i >= 2; i--) {
                    select.remove(i);
                }
                loadListRoom();
                document.getElementById("roomName").value = "";
                document.getElementById("row").value = "";
                document.getElementById("col").value = "";
                document.getElementById("selectedRoomStatus").value = "Bình thường";
                document.getElementById("selectedSeatGenre").value = "VIP";
                document.getElementById("RoomNameForSelect").value = "-1";
            })
            .catch(error => console.error(error));
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



