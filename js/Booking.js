const URLFILMSHOWING = "https://localhost:44308/api/film/showing";
var showId;
var maxRowCoords = 0;
var maxColCoords = 0;
var seatId = [];
var billInfo = {}
billInfo.seat = [];
// window.onload = test();
// console.log("token",token);
// if (localStorage.getItem('token') === null){
//     console.log("chua dn");
//     handleOutsideClickLogin(true);
// }

// const token1 = localStorage.getItem('token');
// const tokenAtBooking = localStorage.getItem('token');
// console.log(token1);
fetch(URLFILMSHOWING)
    .then(response => response.json())
    .then(data => {
        data.forEach(film => {
            // console.log(film);
            const liFilm = document.createElement("li");
            liFilm.classList.add("d-flex", "align-items-center", "border", "text-wrap", "py-2", "list-film-select");

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
                document.getElementById("list-showpanel").innerHTML = ""; 
                billInfo.filmName = film.name; 
                loadShow(film.id);
            })

            document.getElementById("list-filmpanel").appendChild(liFilm);
        });
    })
    .catch(error => console.error(error));

function loadShow(filmId) {
    console.log(filmId);
    const URLSHOW = "https://localhost:44308/api/show?filmId=" + filmId + "&roomId=0";
    fetch(URLSHOW)
        .then(response => response.json())
        .then(data => {
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
                        billInfo.room =  time.roomName;
                        billInfo.filmShow = btnSchedule.innerHTML + ", " + formatDate(result.Day);
                        showId = time.showId; 
                        loadSeat(time.showId, time.roomId);
                    })
                    divBtn.appendChild(btnSchedule);
                })

                liFilm.appendChild(pDay);
                liFilm.appendChild(divBtn);
                document.getElementById("list-showpanel").appendChild(liFilm);
            })
        })
        .catch(error => console.error(error));


}
function loadSeat(showId, roomId) {
    document.getElementById("select-film-schedule-panel").classList.add("d-none");
    document.getElementById("select-seat").classList.remove("d-none");
    document.getElementById("select-food").classList.remove("d-none");
    const URLSEAT = "https://localhost:44308/api/seat?roomId=" + roomId + "&showId=" + showId;
    console.log(URLSEAT);
    fetch(URLSEAT, {
        method: 'GET',
        headers: {
            'Authorization': "bearer " + token
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log("seat", data);

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

    // console.log("Max rowCoords:", maxRowCoords);
    // console.log("Max colCoords:", maxColCoords);

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
                // console.log(65 + i);
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
    // let colCount = document.getElementById("col").value;

    liList.forEach((li, index) => {
        let rowCoords = Math.floor(index / maxColCoords) + 1; // lấy tọa độ hàng
        let colCoords = index % maxColCoords + 1; // lấy tọa độ cột  
        listSeat.forEach(element => { 
            if (rowCoords == element.rowCoords && colCoords == element.colCoords) {
                console.log("map", element.rowCoords, element.colCoords);
                if (element.isBooked) liList[index].classList.add("Booked");
                else{
                    liList[index].setAttribute("data-value",element.seatId);
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

    availableSeat.forEach(element =>{
        element.addEventListener("click", function(){
            if(element.classList.contains("selected")){
                element.classList.remove("selected");
                const index = seatId.indexOf(element.getAttribute("data-value"));
                if( index > -1){
                    seatId.splice(index,1);
                } 
                console.log("remove");
                console.log(seatId);

                const idxBill = billInfo.seat.indexOf(element.getAttribute("position-value"));
                if(idxBill > -1) billInfo.seat.splice(idxBill,1);
            } 
            else{
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
function prevToSeat(){
    document.getElementById("bill").classList.add("d-none");
    document.getElementById("select-seat").classList.remove("d-none");
    document.getElementById("select-food").classList.remove("d-none");
}
function prev(){
    document.getElementById("select-film-schedule-panel").classList.remove("d-none");
    document.getElementById("select-seat").classList.add("d-none");
    document.getElementById("select-food").classList.add("d-none");
    location.reload();
}
function contToPay(){ 
    // console.log(document.querySelectorAll(".selected .seatMap").length);
    if (billInfo.seat.length === 0){
        // alert("Vui lòng chọn số ghế");
        Swal.fire('Vui lòng chọn số ghế');
    }else{
        document.getElementById("select-seat").classList.add("d-none");
        document.getElementById("select-food").classList.add("d-none");
        document.getElementById("bill").classList.remove("d-none");
    
        var food = ""
        if(parseInt(document.getElementById("number1").value) !== 0){
            if(food.length === 0) food += "Bắp (" + document.getElementById("number1").value + ")"
            else food += ", " + "Bắp (" + document.getElementById("number1").value + ")"
        }
        if(parseInt(document.getElementById("number2").value) !== 0){
            if(food.length === 0) food += "Nước Cola (" + document.getElementById("number2").value + ")"
            else food += ", " + "Nước Cola (" + document.getElementById("number2").value + ")"
        }
        if(parseInt(document.getElementById("number3").value) !== 0){
            if(food.length === 0) food += "Combo bắp nước (" + document.getElementById("number3").value + ")"
            else food += ", " + "Combo bắp nước (" + document.getElementById("number3").value + ")"
        }
        if(parseInt(document.getElementById("number4").value) !== 0){
            if(food.length === 0) food += "Combo cặp đôi (" + document.getElementById("number4").value + ")"
            else food += ", " + "Combo cặp đôi (" + document.getElementById("number4").value + ")"
        }
    
        billInfo.food = food;
        let seat = "";
        billInfo.seat.forEach((element,idx) =>{
            if (idx === 0) seat += element;
            else seat += ", " + element
        })
    
        document.getElementById("bill-film-name").innerHTML = billInfo.filmName;
        document.getElementById("bill-show").innerHTML = billInfo.filmShow;
        document.getElementById("bill-room").innerHTML = billInfo.room;
        document.getElementById("bill-food").innerHTML = billInfo.food;
        document.getElementById("bill-seat").innerHTML = seat; 
    
        var totalCost = 0;
        totalCost = ((parseInt(document.getElementById("number1").value)) *20000) + ((parseInt(document.getElementById("number2").value)) * 15000) 
                    + ((parseInt(document.getElementById("number3").value)) * 30000) + ((parseInt(document.getElementById("number4").value)) * 50000);
    
        let availableSeat = document.querySelectorAll(".seatMap:not(.Booked)");
        availableSeat.forEach(element =>{
            if(element.classList.contains("selected")){
                if(element.classList.contains("VIP")) totalCost += 80000;
                else if(element.classList.contains("Double")) totalCost += 70000;
                else totalCost += 50000;
            }
        })
        document.getElementById("total-cost").innerHTML = totalCost.toLocaleString();
    } 

}
function pay(){ 
 
    console.log("showid",showId);
    console.log("seat",seatId);

    var foodOrderDTOs = [
        {
            foodId: 1,
            count: document.getElementById("number1").value
        },
        {
            foodId: 2,
            count: document.getElementById("number2").value
        },
        {
            foodId: 3,
            count: document.getElementById("number3").value
        },
        {
            foodId: 4,
            count: document.getElementById("number4").value
        },
    ]
    var food = ""
    if(parseInt(document.getElementById("number1").value) !== 0){
        if(food.length === 0) food += "Bắp (" + document.getElementById("number1").value + ")"
        else food += ", " + "Bắp (" + document.getElementById("number1").value + ")"
    }
    if(parseInt(document.getElementById("number2").value) !== 0){
        if(food.length === 0) food += "Nước Cola (" + document.getElementById("number2").value + ")"
        else food += ", " + "Nước Cola (" + document.getElementById("number2").value + ")"
    }
    if(parseInt(document.getElementById("number3").value) !== 0){
        if(food.length === 0) food += "Combo bắp nước (" + document.getElementById("number3").value + ")"
        else food += ", " + "Combo bắp nước (" + document.getElementById("number3").value + ")"
    }
    if(parseInt(document.getElementById("number4").value) !== 0){
        if(food.length === 0) food += "Combo cặp đôi (" + document.getElementById("number4").value + ")"
        else food += ", " + "Combo cặp đôi (" + document.getElementById("number4").value + ")"
    }

    billInfo.food = food;
    console.log("food", foodOrderDTOs);
    console.log("showid",showId);
    console.log("seatid",seatId);
    console.log("billin4",billInfo);
    const URLBILL = "https://localhost:44308/api/bill";
    fetch(URLBILL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token
        },
        body: JSON.stringify({
            showId: showId,
            seatIds: seatId,
            foodOrderDTOs: foodOrderDTOs
        })
    }) 
    // alert("Mua vé thành công");
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Mua vé thành công',
        showConfirmButton: false,
        timer: 800
      })
    location.reload();
    
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
function selectfood1(){
    document.getElementById("cost1").textContent = ((parseInt(document.getElementById("number1").value)) *20000).toLocaleString();
}
function selectfood2(){
    document.getElementById("cost2").textContent = ((parseInt(document.getElementById("number2").value)) * 15000).toLocaleString();
}
function selectfood3(){
    document.getElementById("cost3").textContent = ((parseInt(document.getElementById("number3").value)) * 30000).toLocaleString();
}
function selectfood4(){
    document.getElementById("cost4").textContent = ((parseInt(document.getElementById("number4").value)) * 50000).toLocaleString();
}