const URLSCHEDULE = "https://636b935c7f47ef51e13457fd.mockapi.io/Schedule"
const url = 'https://localhost:44308/api';
const genre = 'genre';
const film = 'film';
const show = 'show';
const room = 'room';
const bill = 'bill';
const refund = 'refund';
var idglobal = -1;

var overlayAddSchedule = document.getElementById("overlayAddSchedule");
var btAddSchedule = document.getElementById("btAddSchedule");
var overlay = document.getElementById("overlay");
var formFilm = document.getElementById("formFilm");
var formRoom = document.getElementById("formRoom");
var formFilmUpdate = document.getElementById("formFilmUpdate");
var formRoomUpdate = document.getElementById("formRoomUpdate");
var buttonAddSchedule = document.getElementById("buttonAddSchedule");
var scheduleform = document.getElementById("schedule-form");
var selectTimeSchedule = document.getElementById("selectTimeSchedule");
var overlayUpdateSchedule = document.getElementById("overlayUpdateSchedule");
var formUpdateSchedule = document.getElementById("schedule-form-Update");
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
                        tdEndTime.innerHTML = formatTime(new Date(data[i][j].endTime)) + " - " + formatDate(new Date(data[i][j].endTime));
                        //tdEndTime.innerHTML = data[i][j].endTime;
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
                        var checkdelete = true;
                        btnDelete.addEventListener("click", function () {
                            checkdelete = false;
                            // showAlert("Khi xóa lịch chiếu có vé sẽ hoàn tiền lại cho khách hàng, bạn có chắn chắn muốn xóa");
                            Swal.fire({
                                title: 'Khi xóa lịch chiếu có vé sẽ hoàn tiền cho khách hàng đã mua, Bạn có chắc chắn muốn xóa',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'OK'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteSchedule(data[i][j].id);
                                  Swal.fire(
                                    'Deleted!',
                                    'Lịch chiếu đã được xóa',
                                    'success'
                                  )
                                }
                              })
                            // btCancel.addEventListener('click', function () {
                            //     const modal = document.getElementById('exampleModal');
                            //     const modalInstance = bootstrap.Modal.getInstance(modal);
                            //     modalInstance.hide();
                            // });
                            // btOK.addEventListener('click', function () {
                            //     const modal = document.getElementById('exampleModal');
                            //     const modalInstance = bootstrap.Modal.getInstance(modal);
                            //     modalInstance.hide();
                            //     deleteSchedule(data[i][j].id);
                            // });
                        });
                        trFilmTable.addEventListener("click", function () {
                            if (checkdelete == true) {
                                // const id = this.getAttribute("data-id");
                                updateSchedule(data[i][j].id);
                            }
                        });

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
                        //tdStartTime.innerHTML = formatTime(new Date(data[i][j].startTime)) + " - " + formatDate(new Date(data[i][j].startTime));
                        //tdStartTime.innerHTML = data[i][j].startTime;
                        //tdEndTime.innerHTML = data[i][j].endTime;
                        tdStartTime.innerHTML = formatTime(new Date(data[i][j].startTime)) + " - " + formatDate(new Date(data[i][j].startTime));
                        tdEndTime.innerHTML = formatTime(new Date(data[i][j].endTime)) + " - " + formatDate(new Date(data[i][j].endTime));
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
                        var checkdelete = true;
                        btnDelete.addEventListener("click", function () {
                            checkdelete = false;
                            // showAlert("Khi xóa lịch chiếu có vé sẽ hoàn tiền lại cho khách hàng, bạn có chắn chắn muốn xóa");
                            Swal.fire({
                                title: 'Khi xóa lịch chiếu có vé sẽ hoàn tiền cho khách hàng đã mua, Bạn có chắc chắn muốn xóa',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'OK'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteSchedule(data[i][j].id);
                                  Swal.fire(
                                    'Deleted!',
                                    'Lịch chiếu đã được xóa',
                                    'success'
                                  )
                                }
                              })
                            // btCancel.addEventListener('click', function () {
                            //     const modal = document.getElementById('exampleModal');
                            //     const modalInstance = bootstrap.Modal.getInstance(modal);
                            //     modalInstance.hide();
                            // });
                            // btOK.addEventListener('click', function () {
                            //     const modal = document.getElementById('exampleModal');
                            //     const modalInstance = bootstrap.Modal.getInstance(modal);
                            //     modalInstance.hide();
                            //     deleteSchedule(data[i][j].id);
                            // });
                        });
                        trFilmTable.addEventListener("click", function () {
                            if (checkdelete == true) {
                                // const id = this.getAttribute("data-id");
                                updateSchedule(data[i][j].id);
                            }
                        });

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
                        //tdStartTime.innerHTML = data[i][j].startTime;
                        //tdEndTime.innerHTML = data[i][j].endTime;
                        tdStartTime.innerHTML = formatTime(new Date(data[i][j].startTime)) + " - " + formatDate(new Date(data[i][j].startTime));
                        tdEndTime.innerHTML = formatTime(new Date(data[i][j].endTime)) + " - " + formatDate(new Date(data[i][j].endTime));
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
                        var checkdelete = true;
                        btnDelete.addEventListener("click", function () {
                            checkdelete = false;
                            //showAlert("Khi xóa lịch chiếu có vé sẽ hoàn tiền lại cho khách hàng, bạn có chắn chắn muốn xóa");
                            Swal.fire({
                                title: 'Khi xóa lịch chiếu có vé sẽ hoàn tiền cho khách hàng đã mua, Bạn có chắc chắn muốn xóa',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'OK'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteSchedule(data[i][j].id);
                                  Swal.fire(
                                    'Deleted!',
                                    'Lịch chiếu đã được xóa',
                                    'success'
                                  )
                                }
                              })
                            // btCancel.addEventListener('click', function () {
                            //     const modal = document.getElementById('exampleModal');
                            //     const modalInstance = bootstrap.Modal.getInstance(modal);
                            //     modalInstance.hide();
                            // });
                            // btOK.addEventListener('click', function () {
                            //     const modal = document.getElementById('exampleModal');
                            //     const modalInstance = bootstrap.Modal.getInstance(modal);
                            //     modalInstance.hide();
                            //     deleteSchedule(data[i][j].id);
                            // });
                        });
                        trFilmTable.addEventListener("click", function () {
                            if (checkdelete == true) {
                                // const id = this.getAttribute("data-id");
                                updateSchedule(data[i][j].id);
                            }
                        });

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

formUpdateSchedule.addEventListener('submit', async (event) => {
    event.preventDefault();
    if(document.getElementById('formFilmUpdate').value == 'Chọn một phim'){
        // showAlertTimeOut('Vui lòng chọn 1 phim');
        Swal.fire('Vui lòng chọn 1 phim', 1000);
        return;
    }
    if(document.getElementById('formRoomUpdate').value == 'Chọn một phòng chiếu'){
        // showAlertTimeOut('Vui lòng chọn 1 phòng chiếu');
        Swal.fire('Vui lòng chọn 1 phòng chiếu', 1000);
        return;
    }
    const filmEl = document.querySelector('#formFilmUpdate');
    const roomEl = document.querySelector('#formRoomUpdate');
    const dateValue = document.getElementById('dateScheduleUpdate').value;
    const timeValue = document.getElementById('hourScheduleUpdate').value;
    const datetimeString = dateValue + 'T' + timeValue + ':00.000Z';
    const startTime = new Date(datetimeString);
    const Schedule = {
        id: idglobal,
        startTime: startTime,
        endTime: "2023-05-11T01:56:00",
        filmName: "filmName",
        poster: "poster",
        filmId: filmEl.options[formFilmUpdate.selectedIndex].id,
        ageLimit: 0,
        roomId: roomEl.options[formRoomUpdate.selectedIndex].id
    };
    fetch(`${url}/${show}`, {
    method: 'PUT',
    headers: {
        "Content-Type": "application/json",
        'Authorization' : "bearer " + localStorage.getItem('token')
    },
    body: JSON.stringify(Schedule)
    })
    .then(response => {
    if (!response.ok) {
        response.text().then(errorMessage => {
            if(errorMessage == 'This room has schedule conflict'){
                // showAlertTimeOut("Phòng chiếu này đã có lịch chiếu trong khung giờ này");
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Sửa lịch chiếu không thành công',
                    footer: '<a>Phòng chiếu đã có lịch trong khung giờ này</a>',
                    timer: 1000
                  })
            }
            if(errorMessage == 'Film deleted'){
                // showAlertTimeOut("Phim này đã bị xóa");
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Sửa lịch chiếu không thành công',
                    footer: '<a>Phim này đã bị xóa</a>',
                    timer: 1000
                  })
            }
            if(errorMessage == 'Room is repairing'){
                // showAlertTimeOut("Phòng chiếu đang sửa chữa");
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Sửa lịch chiếu không thành công',
                    footer: '<a>Phòng chiếu đang sửa chữa</a>',
                    timer: 1000
                  })
            }
        })
        //showAlertTimeOut('Chỉnh sửa không thành công');
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Lỗi',
            text: 'Chỉnh sửa không thành công',
            timer: 1000
          })
        //location.reload();
        throw new Error('Đã xảy ra lỗi khi chỉnh sửa phim');
    }
    // showAlertTimeOut('Sửa lịch chiếu thành công');
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Sửa lịch chiếu thành công',
        showConfirmButton: false,
        timer: 800
      })
    //location.reload();
    })
    .catch(error => {
    //location.reload();
    console.error(error);
    });
    
})
  

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
            const optionEl2 = document.createElement('option');
            optionEl2.value = movie.name;
            optionEl2.id = movie.id;
            optionEl2.textContent = movie.name;
            formFilmUpdate.appendChild(optionEl2);
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
                const optionEl2 = document.createElement('option');
                optionEl2.value = room.name;
                optionEl2.id = room.id;
                optionEl2.textContent = room.name;
                formRoomUpdate.appendChild(optionEl2);
            });
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
        // showAlertTimeOut('Vui lòng chọn một phim.');
        Swal.fire('Vui lòng chọn 1 phim', 1000);
        return;
    }

    if (!roomEl.value || roomEl.value === 'Chọn một phòng chiếu') {
        // showAlertTimeOut('Vui lòng chọn một phòng chiếu.');
        Swal.fire('Vui lòng chọn 1 phòng chiếu', 1000);
        return;
    }

    if (!dateEl.value) {
        // showAlertTimeOut('Vui lòng nhập ngày chiếu.');
        Swal.fire('Vui lòng nhập ngày chiếu', 1000);
        return;
    }

    if (!timeEl.value) {
        // showAlertTimeOut('Vui lòng nhập giờ chiếu.');
        Swal.fire('Vui lòng nhập giờ chiếu', 1000);
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
                //location.reload();
                // showAlertTimeOut('Thêm lịch chiếu mới không thành công');
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Thêm lịch chiếu mới không thành công',
                    timer: 1000
                  })
                throw new Error('Đã xảy ra lỗi khi thêm phim mới');
            }
            //location.reload();
            // showAlertTimeOut('Thêm lịch chiếu mới thành công');
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Thêm lịch chiếu mới thành công',
                showConfirmButton: false,
                timer: 800
              })
        })
        .catch(error => {
            //location.reload();
            // showAlertTimeOut('Thêm lịch chiếu không thành công');
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Lỗi',
                text: 'Thêm lịch chiếu mới không thành công',
                timer: 1000
              })
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

function deleteSchedule(i) {
    // const param = new URLSearchParams({
    //     id: i
    // })
    fetch(`${url}/${bill}/${refund}/${i}`, {
        method: 'GET',
        headers: {
            'Authorization': "bearer " + localStorage.getItem('token')
        },
    })
        .then(response => {
            if (!response.ok) {
                //location.reload();
                // showAlertTimeOut('Xóa lịch chiếu không thành công');
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Xóa lịch chiếu không thành công',
                    footer: '<a>Thông tin bạn nhập vào không hợp lệ</a>',
                    timer: 1000
                  })
                throw new Error('Đã xảy ra lỗi khi thêm phim mới');
            }
            //location.reload();
            // showAlertTimeOut('Xóa lịch chiếu mới thành công');
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Lỗi',
                text: 'Xóa lịch chiếu không thành công',
                footer: '<a>Thông tin bạn nhập vào không hợp lệ</a>',
                timer: 1000
              })
        })
        .catch(error => {
            //location.reload();
            // showAlertTimeOut('Xóa lịch chiếu không thành công');
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Lỗi',
                text: 'Xóa lịch chiếu không thành công',
                footer: '<a>Thông tin bạn nhập vào không hợp lệ</a>',
                timer: 1000
              })
            console.error(error);
        });
}

async function getScheduleById(id) {
    try {
        const response = await fetch(`${url}/${show}/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const Schedule = await response.json();
        return Schedule;
    } catch (error) {
        console.error(error);
    }
}

function handleOutsideClickUpdateSchedule(event) {
    if (!overlayUpdateSchedule.contains(event.target)) {
        overlay.style.display = "none";
        overlayUpdateSchedule.style.display = "none";
        document.removeEventListener("click", handleOutsideClickUpdateSchedule, true);
    }
}
async function updateSchedule(id) {
    overlay.style.display = "block";
    overlayUpdateSchedule.style.display = "block";
    document.addEventListener("click", handleOutsideClickUpdateSchedule, true);

    var Schedule = await getScheduleById(id);
    document.getElementById('formFilmUpdate').value = Schedule.filmName;
    document.getElementById('formRoomUpdate').value = Schedule.roomName;
    // document.getElementById('dateScheduleUpdate').value = movie.actor;
    // document.getElementById('hourScheduleUpdate').value = movie.director;
    var date = new Date(Schedule.startTime);
    var day = date.getDate();
    var month = date.getMonth() + 1; // Tháng tính từ 0 đến 11, cần cộng thêm 1 để đúng tháng
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();

    // Đặt giá trị vào các thẻ input
    document.getElementById("dateScheduleUpdate").value = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
    document.getElementById("hourScheduleUpdate").value = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
    // const releaseDate = new Date(movie.releaseDate);
    // const formattedReleaseDate = releaseDate.toISOString().slice(0,10);
    // document.getElementById('updateMovieDateOfRelease').value = formattedReleaseDate;

    // const checkboxes = document.querySelectorAll('#genre-list2 input[type=checkbox]');
    // if (movie && movie.genres) {
    //   const genres = movie.genres;
    //   checkboxes.forEach((checkbox) => {
    //     checkbox.checked = false;
    //     genres.forEach((genre) => {
    //       if(genre.id == checkbox.value){
    //         checkbox.checked = true;
    //       }
    //     })
    //   });
    // }
    // viewImagePoster.addEventListener("click", function () {
    //   window.open(movie.posterUrl, 'Ảnh Poster');
    // });
    // viewImageAdPoster.addEventListener("click", function () {
    //   window.open(movie.adPosterUrl, 'Ảnh Poser');
    // });
    idglobal = id;
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
                    //tdStartTime.innerHTML = data[i][j].startTime;
                    //tdEndTime.innerHTML = data[i][j].endTime;
                    tdStartTime.innerHTML = formatTime(new Date(data[i][j].startTime)) + " - " + formatDate(new Date(data[i][j].startTime));
                    tdEndTime.innerHTML = formatTime(new Date(data[i][j].endTime)) + " - " + formatDate(new Date(data[i][j].endTime));
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
                    var checkdelete = true;
                    btnDelete.addEventListener("click", function () {
                        checkdelete = false;
                        //showAlert("Khi xóa lịch chiếu có vé sẽ hoàn tiền lại cho khách hàng, bạn có chắn chắn muốn xóa");
                        Swal.fire({
                            title: 'Khi xóa lịch chiếu có vé sẽ hoàn tiền cho khách hàng đã mua, Bạn có chắc chắn muốn xóa',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'OK'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteSchedule(data[i][j].id);
                              Swal.fire(
                                'Deleted!',
                                'Lịch chiếu đã được xóa',
                                'success'
                              )
                            }
                          })
                        // btCancel.addEventListener('click', function () {
                        //     const modal = document.getElementById('exampleModal');
                        //     const modalInstance = bootstrap.Modal.getInstance(modal);
                        //     modalInstance.hide();
                        // });
                        // btOK.addEventListener('click', function () {
                        //     const modal = document.getElementById('exampleModal');
                        //     const modalInstance = bootstrap.Modal.getInstance(modal);
                        //     modalInstance.hide();
                        //     deleteSchedule(data[i][j].id);
                        // });
                    });
                    trFilmTable.addEventListener("click", function () {
                        if (checkdelete == true) {
                            // const id = this.getAttribute("data-id");
                            updateSchedule(data[i][j].id);
                        }
                    });

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