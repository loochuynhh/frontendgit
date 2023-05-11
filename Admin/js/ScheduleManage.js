const URLSCHEDULE = "https://636b935c7f47ef51e13457fd.mockapi.io/Schedule"
const url = 'https://localhost:44308/api';
const genre = 'genre';
const film = 'film';
const show = 'show';
const room = 'room';
var overlayAddSchedule = document.getElementById("overlayAddSchedule");
var btAddSchedule = document.getElementById("btAddSchedule");
var overlay = document.getElementById("overlay");
var formFilm = document.getElementById("formFilm");
var formRoom = document.getElementById("formRoom");
var buttonAddSchedule = document.getElementById("buttonAddSchedule");
var scheduleform = document.getElementById("schedule-form");
var selectTimeSchedule = document.getElementById("selectTimeSchedule");
// var overlayAddSchedule = document.getElementById("overlayAddSchedule");
// var overlayAddSchedule = document.getElementById("overlayAddSchedule");
// var overlayAddSchedule = document.getElementById("overlayAddSchedule");
// var overlayAddSchedule = document.getElementById("overlayAddSchedule");
// var overlayAddSchedule = document.getElementById("overlayAddSchedule");


load();

function showAlert(message) {
    document.getElementById("modal-message").innerHTML = message;
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    myModal.show();
}

function showAlertTimeOut(message) {
    document.getElementById("modal-message2").innerHTML = message;
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal2'), {});
    myModal.show();
    setTimeout(function () {
        myModal.hide();
    }, 800);
}
selectTimeSchedule.addEventListener('change', function () {
    if (this.value === 'Hôm nay') {
        let tbody = document.getElementById("body-table");
        tbody.innerHTML = '';
        const today = new Date();
        const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        const params = new URLSearchParams({
            date: dateStr,
            filmId: 0,
            roomId: 0
        });
        fetch(`${url}/${show}?` + params.toString(), {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let tbody = document.getElementById("body-table");
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].length; j++) {
                        let trFilmTable = document.createElement("tr");
                        trFilmTable.addEventListener('dblclick', function () {
                            click(data[i]);
                        });
                        let tdStartTime = document.createElement("td");
                        let tdEndTime = document.createElement("td");
                        tdStartTime.className = "tdCenter";
                        tdEndTime.classList.add("tdCenter", "col-4");
                        let tdFilm = document.createElement("td");
                        tdFilm.className = "tdCenter";
                        //tdFilmStatus.classList.add("tdCenter","col-2");
                        let tdDelete = document.createElement("td");
                        tdDelete.className = "tdCenter";
                        let btnDelete = document.createElement("button");
                        //tdRoom.className = "tdCenter";
                        //btnDelete.className = "btnDelete";
                        //btnDelete.className = "tdCenter";
                        btnDelete.classList.add("btn", "btn-danger");
                        btnDelete.innerHTML = "X";
                        tdDelete.appendChild(btnDelete);
                        let tdRoom = document.createElement("td");
                        tdRoom.className = "tdCenter";
                        tdStartTime.innerHTML = formatTime(new Date(data[i][j].startTime)) + " - " + formatDate(new Date(data[i][j].startTime)); 
                        tdEndTime.innerHTML = data[i][j].endTime;
                        tdFilm.innerHTML = data[i][j].filmName;
                        for (let t = 0; t < formRoom.options.length; t++) {
                            if (data[i][j].roomId == formRoom.options[t].id) {
                                tdRoom.innerHTML = formRoom.options[t].value;
                            }
                        }
                        // Hoover
                        let rows = document.querySelectorAll('tr');

                        rows.forEach(row => {
                            row.addEventListener('mouseover', () => {
                                row.classList.add('highlight-row');
                            });

                            row.addEventListener('mouseout', () => {
                                row.classList.remove('highlight-row');
                            });
                            // row.addEventListener("dblclick", function () {
                            //     // editRow(this);
                            //     console.log("abc");
                            // });
                        });
                        // Hoover

                        // dbclick


                        //dbclick

                        trFilmTable.appendChild(tdStartTime);
                        trFilmTable.appendChild(tdEndTime);
                        trFilmTable.appendChild(tdFilm);
                        trFilmTable.appendChild(tdRoom);
                        trFilmTable.appendChild(tdDelete);
                        tbody.appendChild(trFilmTable);
                    }
                }
            })
            .catch(error => console.error(error));
    }
    else if (this.value === 'Ngày mai') {
        let tbody = document.getElementById("body-table");
        tbody.innerHTML = '';
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        const dateStr = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`;
        const params = new URLSearchParams({
            date: dateStr,
            filmId: 0,
            roomId: 0
        });
        fetch(`${url}/${show}?` + params.toString(), {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                let tbody = document.getElementById("body-table");
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].length; j++) {
                        let trFilmTable = document.createElement("tr");
                        trFilmTable.addEventListener('dblclick', function () {
                            click(data[i]);
                        });
                        let tdStartTime = document.createElement("td");
                        let tdEndTime = document.createElement("td");
                        tdStartTime.className = "tdCenter";
                        tdEndTime.classList.add("tdCenter", "col-4");
                        let tdFilm = document.createElement("td");
                        tdFilm.className = "tdCenter";
                        //tdFilmStatus.classList.add("tdCenter","col-2");
                        let tdDelete = document.createElement("td");
                        tdDelete.className = "tdCenter";
                        let btnDelete = document.createElement("button");
                        //tdRoom.className = "tdCenter";
                        //btnDelete.className = "btnDelete";
                        //btnDelete.className = "tdCenter";
                        btnDelete.classList.add("btn", "btn-danger");
                        btnDelete.innerHTML = "X";
                        tdDelete.appendChild(btnDelete);
                        let tdRoom = document.createElement("td");
                        tdRoom.className = "tdCenter";
                        tdStartTime.innerHTML = data[i][j].startTime;
                        tdEndTime.innerHTML = data[i][j].endTime;
                        tdFilm.innerHTML = data[i][j].filmName;
                        console.log(formRoom.options.length);
                        for (let t = 0; t < formRoom.options.length; t++) {
                            if (data[i][j].roomId == formRoom.options[t].id) {
                                tdRoom.innerHTML = formRoom.options[t].value;
                            }
                        }
                        // Hoover
                        let rows = document.querySelectorAll('tr');

                        rows.forEach(row => {
                            row.addEventListener('mouseover', () => {
                                row.classList.add('highlight-row');
                            });

                            row.addEventListener('mouseout', () => {
                                row.classList.remove('highlight-row');
                            });
                            // row.addEventListener("dblclick", function () {
                            //     // editRow(this);
                            //     console.log("abc");
                            // });
                        });
                        // Hoover

                        // dbclick


                        //dbclick

                        trFilmTable.appendChild(tdStartTime);
                        trFilmTable.appendChild(tdEndTime);
                        trFilmTable.appendChild(tdFilm);
                        trFilmTable.appendChild(tdRoom);
                        trFilmTable.appendChild(tdDelete);
                        tbody.appendChild(trFilmTable);
                    }
                }
            })
            .catch(error => console.error(error));
    }
    else if (this.value === 'Ngày mốt') {
        let tbody = document.getElementById("body-table");
        tbody.innerHTML = '';
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        const dayAfterTomorrow = new Date(tomorrow.getTime() + (24 * 60 * 60 * 1000));
        const dateStr = `${dayAfterTomorrow.getFullYear()}-${dayAfterTomorrow.getMonth() + 1}-${dayAfterTomorrow.getDate()}`;
        const params = new URLSearchParams({
            date: dateStr,
            filmId: 0,
            roomId: 0
        });
        fetch(`${url}/${show}?` + params.toString(), {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                let tbody = document.getElementById("body-table");
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].length; j++) {
                        let trFilmTable = document.createElement("tr");
                        trFilmTable.addEventListener('dblclick', function () {
                            click(data[i]);
                        });
                        let tdStartTime = document.createElement("td");
                        let tdEndTime = document.createElement("td");
                        tdStartTime.className = "tdCenter";
                        tdEndTime.classList.add("tdCenter", "col-4");
                        let tdFilm = document.createElement("td");
                        tdFilm.className = "tdCenter";
                        //tdFilmStatus.classList.add("tdCenter","col-2");
                        let tdDelete = document.createElement("td");
                        tdDelete.className = "tdCenter";
                        let btnDelete = document.createElement("button");
                        //tdRoom.className = "tdCenter";
                        //btnDelete.className = "btnDelete";
                        //btnDelete.className = "tdCenter";
                        btnDelete.classList.add("btn", "btn-danger");
                        btnDelete.innerHTML = "X";
                        tdDelete.appendChild(btnDelete);
                        let tdRoom = document.createElement("td");
                        tdRoom.className = "tdCenter";
                        tdStartTime.innerHTML = data[i][j].startTime;
                        tdEndTime.innerHTML = data[i][j].endTime;
                        tdFilm.innerHTML = data[i][j].filmName;
                        console.log(formRoom.options.length);
                        for (let t = 0; t < formRoom.options.length; t++) {
                            if (data[i][j].roomId == formRoom.options[t].id) {
                                tdRoom.innerHTML = formRoom.options[t].value;
                            }
                        }
                        // Hoover
                        let rows = document.querySelectorAll('tr');

                        rows.forEach(row => {
                            row.addEventListener('mouseover', () => {
                                row.classList.add('highlight-row');
                            });

                            row.addEventListener('mouseout', () => {
                                row.classList.remove('highlight-row');
                            });
                            // row.addEventListener("dblclick", function () {
                            //     // editRow(this);
                            //     console.log("abc");
                            // });
                        });
                        // Hoover

                        // dbclick


                        //dbclick

                        trFilmTable.appendChild(tdStartTime);
                        trFilmTable.appendChild(tdEndTime);
                        trFilmTable.appendChild(tdFilm);
                        trFilmTable.appendChild(tdRoom);
                        trFilmTable.appendChild(tdDelete);
                        tbody.appendChild(trFilmTable);
                    }
                }
            })
            .catch(error => console.error(error));
    }
});


fetch(`${url}/${film}`, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json"
    },
})
    .then(response => response.json())
    .then(data => {

        data.forEach(movie => {
            const optionEl = document.createElement('option');
            optionEl.value = movie.name;
            optionEl.id = movie.id;
            optionEl.textContent = movie.name;
            formFilm.appendChild(optionEl);
        });
    })
    .catch(error => console.error(error));
async function getRoom() {
    await fetch(`${url}/${room}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': "bearer " + localStorage.getItem('token')
        },
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(room => {
                const optionEl = document.createElement('option');
                optionEl.value = room.name;
                optionEl.id = room.id;
                optionEl.textContent = room.name;
                formRoom.appendChild(optionEl);
            });
        })
        .then({

        })
        .catch(error => console.error(error));
}


function handleOutsideClickAddSchedule(event) {
    if (!overlayAddSchedule.contains(event.target)) {
        overlay.style.display = "none";
        overlayAddSchedule.style.display = "none";
        document.removeEventListener("click", handleOutsideClickAddSchedule, true);
    }
}

btAddSchedule.addEventListener("click", function () {
    overlay.style.display = "block";
    overlayAddSchedule.style.display = "block";
    document.addEventListener("click", handleOutsideClickAddSchedule, true);
});
scheduleform.addEventListener('submit', async (event) => {
    event.preventDefault();
    const filmEl = document.querySelector('#formFilm');
    const roomEl = document.querySelector('#formRoom');
    const dateEl = document.querySelector('.form-select[type="date"]');
    const timeEl = document.querySelector('.form-select[type="time"]');
    if (!filmEl.value || filmEl.value === 'Chọn một phim') {
        showAlertTimeOut('Vui lòng chọn một phim.');
        return;
    }

    if (!roomEl.value || roomEl.value === 'Chọn một phòng chiếu') {
        showAlertTimeOut('Vui lòng chọn một phòng chiếu.');
        return;
    }

    if (!dateEl.value) {
        showAlertTimeOut('Vui lòng nhập ngày chiếu.');
        return;
    }

    if (!timeEl.value) {
        showAlertTimeOut('Vui lòng nhập giờ chiếu.');
        return;
    }
    const dateValue = document.getElementById('dateSchedule').value;
    const timeValue = document.getElementById('hourSchedule').value;
    const datetimeString = dateValue + 'T' + timeValue + ':00.000Z';
    const startTime = new Date(datetimeString);
    const newSchedule = {
        id: 0,
        startTime: startTime,
        endTime: "2023-05-11T01:56:00",
        filmName: "string",
        poster: "string",
        filmId: filmEl.options[formFilm.selectedIndex].id,
        ageLimit: 0,
        roomId: roomEl.options[formRoom.selectedIndex].id
    };
    fetch(`${url}/${show}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': "bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(newSchedule)
    })
        .then(response => {
            if (!response.ok) {
                location.reload();
                showAlertTimeOut('Thêm lịch chiếu mới không thành công');
                throw new Error('Đã xảy ra lỗi khi thêm phim mới');
            }
            location.reload();
            showAlertTimeOut('Thêm lịch chiếu mới thành công');
        })
        .catch(error => {
            location.reload();
            showAlertTimeOut('Thêm lịch chiếu không thành công');
            console.error(error);
        });

});

// fetch(`${url}/${show}`, {
//     method: 'GET',
//   })
// .then(response => response.json())
// .then(data => {
//     console.log(data);
//     let tbody = document.getElementById("body-table");
//     for (let i = 0; i < data.length; i++) {
//         let trFilmTable = document.createElement("tr");
//         trFilmTable.addEventListener('dblclick', function () {
//             click(data[i]);
//         });
//         let tdStartTime = document.createElement("td");
//         let tdEndTime = document.createElement("td");
//         // tdLength.className = "tdCenter"; 
//         // tdLength.classList.add("tdCenter","col-4");
//         let tdFilm = document.createElement("td");
//         // tdFilmStatus.className = "tdCenter";
//         // tdFilmStatus.classList.add("tdCenter","col-2");
//         let tdDelete = document.createElement("td");
//         // tdDelete.className = "tdCenter";
//         let btnDelete = document.createElement("button");
//         tdDelete.className = "tdCenter";
//         btnDelete.className = "btnDelete";
//         // btnDelete.className = "tdCenter";
//         // btnDelete.classList.add("btn","btn-danger");
//         btnDelete.innerHTML = "X";
//         tdDelete.appendChild(btnDelete);
//         let tdRoom = document.createElement("td");

//         tdStartTime.innerHTML = data[i].StartTime;
//         tdEndTime.innerHTML = data[i].EndTime;
//         tdFilm.innerHTML = data[i].Film;
//         tdRoom.innerHTML = data[i].Room;

//         // Hoover
//         let rows = document.querySelectorAll('tr'); 

//         rows.forEach(row => {
//             row.addEventListener('mouseover', () => {
//                 row.classList.add('highlight-row');
//             });

//             row.addEventListener('mouseout', () => {
//                 row.classList.remove('highlight-row');
//             });
//             // row.addEventListener("dblclick", function () {
//             //     // editRow(this);
//             //     console.log("abc");
//             // });
//         });
//         // Hoover

//         // dbclick


//         //dbclick

//         trFilmTable.appendChild(tdStartTime);
//         trFilmTable.appendChild(tdEndTime);
//         trFilmTable.appendChild(tdFilm);
//         trFilmTable.appendChild(tdRoom);
//         trFilmTable.appendChild(tdDelete);
//         // trFilmTable.appendChild(tdDelete);

//         tbody.appendChild(trFilmTable);
//     }

// })
// .catch(error => console.error(error));
async function load() {
    await getRoom();
    await getSchedule();
}

async function getSchedule() {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const params = new URLSearchParams({
        date: dateStr,
        filmId: 0,
        roomId: 0
    });
    await fetch(`${url}/${show}?` + params.toString(), {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {

            let tbody = document.getElementById("body-table");
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    let trFilmTable = document.createElement("tr");
                    trFilmTable.addEventListener('dblclick', function () {
                        click(data[i]);
                    });
                    let tdStartTime = document.createElement("td");
                    let tdEndTime = document.createElement("td");
                    tdStartTime.className = "tdCenter";
                    tdEndTime.classList.add("tdCenter", "col-4");
                    let tdFilm = document.createElement("td");
                    tdFilm.className = "tdCenter";
                    //tdFilmStatus.classList.add("tdCenter","col-2");
                    let tdDelete = document.createElement("td");
                    tdDelete.className = "tdCenter";
                    let btnDelete = document.createElement("button");
                    //tdRoom.className = "tdCenter";
                    //btnDelete.className = "btnDelete";
                    //btnDelete.className = "tdCenter";
                    btnDelete.classList.add("btn", "btn-danger");
                    btnDelete.innerHTML = "X";
                    tdDelete.appendChild(btnDelete);
                    let tdRoom = document.createElement("td");
                    tdRoom.className = "tdCenter";
                    tdStartTime.innerHTML = data[i][j].startTime;
                    tdEndTime.innerHTML = data[i][j].endTime;
                    tdFilm.innerHTML = data[i][j].filmName;
                    for (let t = 0; t < formRoom.options.length; t++) {
                        if (data[i][j].roomId == formRoom.options[t].id) {
                            tdRoom.innerHTML = formRoom.options[t].value;
                        }
                    }
                    // Hoover
                    let rows = document.querySelectorAll('tr');

                    rows.forEach(row => {
                        row.addEventListener('mouseover', () => {
                            row.classList.add('highlight-row');
                        });

                        row.addEventListener('mouseout', () => {
                            row.classList.remove('highlight-row');
                        });
                        // row.addEventListener("dblclick", function () {
                        //     // editRow(this);
                        //     console.log("abc");
                        // });
                    });
                    // Hoover

                    // dbclick


                    //dbclick

                    trFilmTable.appendChild(tdStartTime);
                    trFilmTable.appendChild(tdEndTime);
                    trFilmTable.appendChild(tdFilm);
                    trFilmTable.appendChild(tdRoom);
                    trFilmTable.appendChild(tdDelete);
                    tbody.appendChild(trFilmTable);
                }
            }
        })
        .catch(error => console.error(error));
}

function formatDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('vi-VN', options);
    return formattedDate;
}

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
}