const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var filmIdSended = urlParams.get('filmId');
var showIdSended = urlParams.get('showId');
var roomIdSended = urlParams.get('roomId');
var roomNameSended = urlParams.get('roomName');
var showTimeSended = urlParams.get('showTime');
var Overlay = document.getElementById("overlay");
var OverlayLogin = document.getElementById("overlayLogin");
var OverlaySignup = document.getElementById("overlaySignup");

const URLALLFILM = "https://localhost:44308/api/film";
var showId;                 //dùng cho hàm LoadSeat()
var seatId = [];            //dùng lưu position, type của ghế

var maxRowCoords = 0;
var maxColCoords = 0;

var billInfo = {}
billInfo.seat = [];
$(function() {
    $("#header").load("header.html", function() {
      $("#booking-link").removeClass("text-white").addClass("text-secondary");
      if (!localStorage.getItem('token')) {
        $('#overlay').css('display', 'block');
        $('#overlayLogin').css('display', 'block');
        $(document).on("click", handleOutsideClickLogin);
      }
    }); 
    $("#footer").load("footer.html");
  });
  
function handleOutsideClickLogin(event) {
    if (!OverlayLogin.contains(event.target)) {
      OverlayLogin.style.display = "none";
      Overlay.style.display = "none";
      document.removeEventListener("click", handleOutsideClickLogin, true);
    }
}
fetch(URLALLFILM)
    .then(response => response.json())
    .then(data => {
        data.forEach(film => {
            const liFilm = document.createElement("li");
            liFilm.classList.add("d-flex", "align-items-center", "border", "text-wrap", "py-2", "list-film-select");
            liFilm.setAttribute("film-id-value", film.id);
            liFilm.setAttribute("film-name-value", film.name);

            const imgFilm = document.createElement("img");
            imgFilm.classList.add("ms-4");
            imgFilm.setAttribute("width", "10%");
            imgFilm.src = film.posterUrl;

            const pFilmName = document.createElement("p");
            pFilmName.classList.add("text-uppercase", "ms-3");
            pFilmName.innerHTML = film.name;

            const pAgeLimit = document.createElement("p");
            pAgeLimit.classList.add("age-limit");
            pAgeLimit.innerHTML = "C" + film.ageLimit;

            liFilm.appendChild(imgFilm);
            liFilm.appendChild(pFilmName);
            liFilm.appendChild(pAgeLimit);

            liFilm.addEventListener("click", function () {
                const li = document.querySelectorAll("li");
                li.forEach(element => {
                    element.classList.remove("film-selected");
                })
                liFilm.classList.add("film-selected")
                document.getElementById("list-showpanel").innerHTML = "";
                billInfo.filmName = film.name;
                filmIdSended = null;
                loadShow(film.id);
            })
            document.getElementById("list-filmpanel").appendChild(liFilm);
        });
        if (filmIdSended !== null && showIdSended !== null && roomIdSended !== null) {
            showId = showIdSended;
            loadSeat(showIdSended, roomIdSended);
        
            const allFilmSelect = document.querySelectorAll(".list-film-select");
            allFilmSelect.forEach(element => { 
                if (element.getAttribute("film-id-value") === filmIdSended){
                    billInfo.filmName = element.getAttribute("film-name-value"); 
                }  
            }) 
            billInfo.room = roomNameSended;
            billInfo.filmShow = showTimeSended; 
        }
        if (filmIdSended !== null) {
            const allFilmSelect = document.querySelectorAll(".list-film-select");
            allFilmSelect.forEach(element => {
                if (element.getAttribute("film-id-value") === filmIdSended) {
                    element.classList.add("film-selected");
                    billInfo.filmName = element.getAttribute("film-name-value");
                }
            })
            loadShow(filmIdSended);
        }
    })
    .catch(error => console.error(error)); 

function loadShow(filmId) {
    const URLSHOW = "https://localhost:44308/api/show?filmId=" + filmId + "&roomId=0";
    fetch(URLSHOW)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                const liFilm = document.createElement("li");
                liFilm.classList.add("border", "text-wrap", "py-2");
                const pNoti = document.createElement("p");
                pNoti.classList.add("text-center", "mt-3")
                pNoti.innerHTML = "Phim chưa có lịch chiếu, vui lòng chọn phim khác"
                liFilm.appendChild(pNoti);
                document.getElementById("list-showpanel").appendChild(liFilm);
            } else {
                const groupedShows = {};
                data[0].forEach(show => {
                    const date = show.startTime.split("T")[0]; // Lấy ngày từ startTime
                    if (!groupedShows[date]) {
                        // Nếu chưa có đối tượng với ngày tương ứng, tạo mới
                        groupedShows[date] = {
                            Day: date,
                            Time: []
                        };
                    }
                    // Thêm startTime và endTime vào mảng Time của đối tượng tương ứng
                    groupedShows[date].Time.push({
                        startTime: show.startTime,
                        endTime: show.endTime,
                        showId: show.id,
                        roomId: show.roomId,
                        roomName: show.roomName
                    });
                    // Sắp xếp mảng Time trong đối tượng theo thứ tự tăng dần
                    groupedShows[date].Time.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
                });

                // Chuyển đổi object thành mảng các đối tượng đã gom nhóm
                const results = Object.values(groupedShows);
                results.sort((a, b) => new Date(a.Day) - new Date(b.Day));

                results.forEach(result => {
                    const liFilm = document.createElement("li");
                    liFilm.classList.add("border", "text-wrap", "py-2");

                    const pDay = document.createElement("p");
                    pDay.classList.add("ms-4", "mt-2");
                    pDay.innerHTML = formatDate(result.Day);

                    const divBtn = document.createElement("div");
                    divBtn.classList.add("ms-5");

                    result.Time.forEach(time => {
                        const btnSchedule = document.createElement("button");
                        btnSchedule.classList.add("btn", "btn-outline-primary", "btn-sm", "m-2");
                        btnSchedule.innerHTML = formatTime(new Date(time.startTime)) + " - " + formatTime(new Date(time.endTime));

                        btnSchedule.addEventListener("click", function () {
                            document.getElementById("seat").innerHTML = "";
                            billInfo.room = time.roomName;
                            billInfo.filmShow = btnSchedule.innerHTML + " | " + formatDate(result.Day);
                            showId = time.showId;
                            loadSeat(time.showId, time.roomId);
                        })
                        divBtn.appendChild(btnSchedule);
                    })

                    liFilm.appendChild(pDay);
                    liFilm.appendChild(divBtn);
                    document.getElementById("list-showpanel").appendChild(liFilm);
                })
            }
        })
        .catch(error => console.error(error));


}
function loadSeat(showId, roomId) { 
    if(localStorage.getItem('token') == null){
        setLayout();
        return;
    }
    document.getElementById("select-film-schedule-panel").classList.add("d-none");
    document.getElementById("select-seat").classList.remove("d-none");
    document.getElementById("select-food").classList.remove("d-none");
    loadFood();
    const URLSEAT = "https://localhost:44308/api/seat?roomId=" + roomId + "&showId=" + showId;
    fetch(URLSEAT, {
        method: 'GET',
        headers: {
            'Authorization': "bearer " + localStorage.getItem('token')
        },
    })
        .then(response => {
            if (response.status == '403') {
                window.location.href = "./Forbidden.html"; 
            }
            if (response.status == '401') {
                window.location.href = "./Unauthorized.html" 
            }
            return response.json();
        })
        .then(data => {  
            var listSeat = [];
            data.forEach(element => {
                var seat = {
                    rowCoords: (element.position).substring(0, (element.position).indexOf("-")),
                    colCoords: (element.position).substring((element.position).indexOf("-") + 1),
                    seatTypeId: element.seatTypeId,
                    isBooked: element.isBooked,
                    seatId: element.id
                };
                listSeat.push(seat);
            });
            loadTypeSeat(listSeat);
        })
        .catch(error => console.error(error));
}
function loadTypeSeat(listSeat) {
    listSeat.forEach(seat => {
        var rowCoords = parseInt(seat.rowCoords);
        var colCoords = parseInt(seat.colCoords);

        if (rowCoords > maxRowCoords) {
            maxRowCoords = rowCoords;
        }

        if (colCoords > maxColCoords) {
            maxColCoords = colCoords;
        }
    });
    // Màn hình
    const divScreen = document.createElement("div");
    divScreen.innerHTML = "MÀN HÌNH";
    divScreen.classList.add("screen");
    document.getElementById("seat").appendChild(divScreen);

    // Load phòng chiếu
    for (let i = 1; i <= maxRowCoords; i++) {
        let ul = document.createElement("ul");
        ul.className = "p-0";
        for (let j = 0; j <= parseInt(maxColCoords) + 1; j++) {
            let li = document.createElement("li");
            if (j == "0" || j == parseInt(maxColCoords) + 1) {
                li.className = "seat-root";
                li.textContent = String.fromCharCode(64 + i);
            } else {
                li.className = "seatMap";
                li.setAttribute("position-value", String.fromCharCode(64 + i) + j);
                li.textContent = j;
            }
            ul.appendChild(li);
        }
        document.getElementById("seat").appendChild(ul);
    }

    //Thay doi trang thai ghe
    let liList = document.querySelectorAll(".seatMap");
    liList.forEach((li, index) => {
        let rowCoords = Math.floor(index / maxColCoords) + 1;       // lấy tọa độ hàng
        let colCoords = index % maxColCoords + 1;                   // lấy tọa độ cột  
        listSeat.forEach(element => {
            if (rowCoords == element.rowCoords && colCoords == element.colCoords) { 
                if (element.isBooked) liList[index].classList.add("Booked");
                else {
                    liList[index].setAttribute("data-value", element.seatId);
                    switch (element.seatTypeId) {
                        case 1:
                            {
                                liList[index].classList.add("VIP");
                                break;
                            }
                        case 2:
                            {
                                liList[index].classList.add("Double");
                                break;
                            }
                    }
                }

            }
        })
    });
    // Thêm sự kiện click ghế
    let availableSeat = document.querySelectorAll(".seatMap:not(.Booked)");

    availableSeat.forEach(element => {
        element.addEventListener("click", function () {
            if (element.classList.contains("selected")) {
                element.classList.remove("selected");
                const index = seatId.indexOf(element.getAttribute("data-value"));
                if (index > -1) {
                    seatId.splice(index, 1);
                }
                const idxBill = billInfo.seat.indexOf(element.getAttribute("position-value"));
                if (idxBill > -1) billInfo.seat.splice(idxBill, 1);
            }
            else {
                element.classList.add("selected");
                if (!seatId.includes(element.getAttribute("data-value"))) {
                    seatId.push(element.getAttribute("data-value"));
                }
                if (!billInfo.seat.includes(element.getAttribute("position-value"))) {
                    billInfo.seat.push(element.getAttribute("position-value"));
                }
            }
        })
    })

}
function prevToSeat() {
    document.getElementById("bill").classList.add("d-none");
    document.getElementById("select-seat").classList.remove("d-none");
    document.getElementById("select-food").classList.remove("d-none");
    // loadFood();
}
function prevToFilmAndShow() {
    document.getElementById("select-film-schedule-panel").classList.remove("d-none");
    document.getElementById("select-seat").classList.add("d-none");
    document.getElementById("select-food").classList.add("d-none");
    if (showIdSended !== null && roomIdSended !== null) window.location.href = "http://127.0.0.1:5502/LayoutSchedule.html"
}
function contToPay() {
    if (billInfo.seat.length === 0) {
        Swal.fire('Vui lòng chọn số ghế');
    } else {
        document.getElementById("select-seat").classList.add("d-none");
        document.getElementById("select-food").classList.add("d-none");
        document.getElementById("bill").classList.remove("d-none");

        var food = "";
        var totalCost = 0;  
        var tbody = document.getElementById("tbody-food"); 

        for (var i = 0; i < tbody.rows.length; i++) {
            var row = tbody.rows[i]; 
            var nameFood = row.cells[0].querySelector('span').innerText;
            var numberFood = row.cells[1].querySelector('input').value;
          
            if (parseInt(numberFood) !== 0) {
                // console.log("rowcell1",row.cells[1].value)
                if (food.length === 0) food += nameFood + "(" + numberFood + ")";
                else food += ", " + nameFood + "(" + numberFood + ")"; 
                totalCost += parseInt(row.cells[3].innerText.replace(/,/g, ''));
            }
        } 
        billInfo.food = food;
        let seat = "";
        billInfo.seat.forEach((element, idx) => {
            if (idx === 0) seat += element;
            else seat += ", " + element
        })

        document.getElementById("bill-film-name").innerHTML = billInfo.filmName;
        document.getElementById("bill-show").innerHTML = billInfo.filmShow;
        document.getElementById("bill-room").innerHTML = billInfo.room;
        document.getElementById("bill-food").innerHTML = billInfo.food;
        document.getElementById("bill-seat").innerHTML = seat; 

        let availableSeat = document.querySelectorAll(".seatMap:not(.Booked)");
        availableSeat.forEach(element => {
            if (element.classList.contains("selected")) {
                if (element.classList.contains("VIP")) totalCost += 80000;
                else if (element.classList.contains("Double")) totalCost += 70000;
                else totalCost += 50000;
            }
        })
        document.getElementById("total-cost").innerHTML = totalCost.toLocaleString();
    }

}
function pay() {
    var foodOrderDTOs = []
    var tbody = document.getElementById("tbody-food"); 

    for (var i = 0; i < tbody.rows.length; i++) {
        var row = tbody.rows[i];  
        
        if (parseInt(row.cells[1].querySelector('input').value) !== 0) {
            var food = {};
            food.foodId = row.cells[1].querySelector('input').id;
            food.count = row.cells[1].querySelector('input').value;
            foodOrderDTOs.push(food); 
        }
        
    } 
    const URLBILL = "https://localhost:44308/api/bill";
    fetch(URLBILL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({
            showId: showId,
            seatIds: seatId,
            foodOrderDTOs: foodOrderDTOs
        })
    }).then(response => {
        console.log(response.status);
        if (response.status == '403') { 
            window.location.href = "http://127.0.0.1:5502/Forbidden.html"
        }
        if (response.status == '401') { 
            window.location.href = "http://127.0.0.1:5502/Unauthorized.html"
        }
        if(response.status == '400'){
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Mua vé thất bại',
                text: 'Khách hàng chưa đủ tuổi đặt phim này',
                showConfirmButton: true,
                timer: 2000 
            }).then((result) => {
                if (result.isConfirmed) window.location.href = "http://127.0.0.1:5502/LayoutBooking.html"
                else window.location.href = "http://127.0.0.1:5502/LayoutBooking.html"
            }); 
        }
        if(response.ok){ 
            Swal.fire({
                position: 'top',
                icon: 'success',
                text: 'Mua vé thành công',
                showConfirmButton: false,
                timer: 1500
            }).then((result) => {
                window.location.href = "http://127.0.0.1:5502/LayoutBooking.html" 
            }); 
        }
    })  

}
function loadFood(){
    fetch("https://localhost:44308/api/food", {
        method: 'GET',
        headers: {
            'Authorization': "bearer " + localStorage.getItem('token')
        },
    })
        .then(response => {
            if (response.status == '403') {
                window.location.href = "./Forbidden.html"; 
            }
            if (response.status == '401') {
                window.location.href = "./Unauthorized.html" 
            }
            return response.json();
        })
        .then(data => {  
            document.getElementById("tbody-food").innerHTML = "";
            data.forEach(food =>{ 
                const td1 = document.createElement("td"); 
                const spFoodName = document.createElement("span");
                spFoodName.classList.add("fs-5", "fw-bold", "text-success");
                spFoodName.textContent = food.name;
                const pSize = document.createElement("p");
                pSize.classList.add("mt-2", "mb-0", "fst-italic", "fw-lighter", "fs-6");
                pSize.textContent = food.description; 
                td1.appendChild(spFoodName);
                td1.appendChild(pSize);

                const td4 = document.createElement("td");
                td4.classList.add("text-center");
                td4.textContent = "0"; 
                td4.setAttribute("id", "cost" + food.id);

                const td2 = document.createElement("td");
                td2.classList.add("text-center");
                var input = document.createElement("input");
                input.setAttribute("type", "number");                                                                            
                input.setAttribute("min", "0");
                input.setAttribute("value", "0");                                       
                input.setAttribute("step", "0");                                                           
                input.setAttribute("id", food.id);
                input.addEventListener("change", function(){
                    td4.textContent = (parseInt(food.cost) * parseInt(input.value)).toLocaleString();
                });
                td2.appendChild(input);

                const td3 = document.createElement("td");
                td3.classList.add("text-center");
                td3.textContent = (food.cost).toLocaleString(); 

                const trFood = document.createElement("tr");
                trFood.appendChild(td1);
                trFood.appendChild(td2);
                trFood.appendChild(td3);
                trFood.appendChild(td4);
                document.getElementById("tbody-food").appendChild(trFood);
            })
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