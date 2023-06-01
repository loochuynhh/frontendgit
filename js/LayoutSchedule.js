window.onload = loadCalendar();
const URLBOOKING = "http://127.0.0.1:5502/LayoutBooking.html"
var daySended = ""
$(function () {
    $("#header").load("header.html", function () {
        $("#schedule-link").removeClass("text-white");
        $("#schedule-link").addClass("text-secondary");
    });
    $("#footer").load("footer.html");
})
function loadCalendar() {
    var currentDate = new Date();
    var nextDays = [];
    for (var i = 0; i <= 6; i++) {
        var nextDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
        nextDays.push(nextDate);
    }
    nextDays.forEach(function (date) {
        var dayOfWeek = date.toLocaleDateString("vi-VN", { weekday: "long" }, { day: "numeric" });
        var dayOfMonth = date.getDate();
        // console.log(dayOfWeek + ", ngày " + dayOfMonth);

        const btnDayOption = document.createElement("button");
        btnDayOption.className = "btn btn-outline-secondary mx-4 btn-sm w-100";
        const spDayOfWeek = document.createElement("span");
        spDayOfWeek.className = "d-block";
        const spDayOfMonth = document.createElement("span");
        spDayOfWeek.textContent = dayOfWeek;
        spDayOfMonth.textContent = dayOfMonth.toString().padStart(2, '0');

        btnDayOption.appendChild(spDayOfWeek);
        btnDayOption.appendChild(spDayOfMonth);

        btnDayOption.addEventListener("click", function () {
            const buttons = document.querySelectorAll("#day-option .btn");
            buttons.forEach(button => button.classList.remove('selectedButton'));
            this.classList.add("selectedButton");
            document.getElementById("film-for-select-schedule").innerHTML = "";

            const daySelected = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + dayOfMonth.toString().padStart(2, '0');
            const URLSCHEDULE = "https://localhost:44308/api/show?" + "date=" + daySelected + "&filmId=0&roomId=0";

            daySended = "Thứ " + getDayOfWeek(date) + ", " + formatDate(date);
            // const URLSCHEDULE = "https://localhost:44308/api/show?" + "date=" + "2023-05-08" +"&filmId=0&roomId=0";

            selectDay(URLSCHEDULE);
        })

        document.getElementById("day-option").appendChild(btnDayOption);
    });

    document.getElementById("center-month").innerHTML = "Tháng " + (currentDate.getMonth() + 1);
}

function selectDay(URLSCHEDULE) {
    const h4txtSelectSchedule = document.createElement("h4");
    h4txtSelectSchedule.innerHTML = "Chọn lịch chiếu";
    document.getElementById("film-for-select-schedule").appendChild(h4txtSelectSchedule);
    // document.getElementById("film-for-select-schedule").setAttribute("min-height", "1000px");

    fetch(URLSCHEDULE)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                const divNoSchedule = document.createElement("div");
                divNoSchedule.classList.add("text-center", "text-secondary");
                divNoSchedule.innerHTML = "Ngày Bạn Chọn Hiện Không Có Lịch Chiếu Nào. Vui Lòng Chọn Ngày Khác.";
                document.getElementById("film-for-select-schedule").appendChild(divNoSchedule);
            }
            console.log(data);
            for (let i = 0; i < data.length; i++) {

                console.log((data[i])[0].filmId);
                const divFilm = document.createElement("div");
                divFilm.classList.add("ms-4", "mt-3", "mb-3");

                const h6Name = document.createElement("h6");
                h6Name.classList.add("fw-bold", "text-uppercase");
                h6Name.textContent = (data[i])[0].filmName;
                console.log((data[i])[0].filmName);

                const divFilmInfo = document.createElement("div");
                divFilmInfo.classList.add("container", "d-flex");

                const imgFilm = document.createElement("img");
                imgFilm.setAttribute("width", "10%");
                imgFilm.src = (data[i])[0].poster;

                const divBtn = document.createElement("div");
                divBtn.classList.add("ms-5");
                data[i].forEach(element => {
                    const startTime = new Date(element.startTime);
                    const sthours = startTime.getHours();
                    const stminutes = startTime.getMinutes();
                    const startTimeFormated = `${sthours.toString().padStart(2, '0')}:${stminutes.toString().padStart(2, '0')}`;

                    const endTime = new Date(element.endTime);
                    const ethours = endTime.getHours();
                    const etminutes = endTime.getMinutes();
                    const endTimeFormated = `${ethours.toString().padStart(2, '0')}:${etminutes.toString().padStart(2, '0')}`;

                    const btnSchedule = document.createElement("button");
                    btnSchedule.classList.add("btn", "btn-outline-primary", "m-2", "btn-sm", "text-center");
                    btnSchedule.innerHTML = startTimeFormated + " - " + endTimeFormated;

                    var showTimeSended = startTimeFormated + " - " + endTimeFormated + " | " + daySended

                    btnSchedule.addEventListener("click", function () {
                        window.location.href = URLBOOKING + '?filmId=' + (data[i])[0].filmId + "&showId=" + (data[i])[0].id + "&roomId=" + (data[i])[0].roomId
                            + "&roomName=" + (data[i])[0].roomName + "&showTime=" + showTimeSended
                    })

                    divBtn.appendChild(btnSchedule);
                });

                divFilmInfo.appendChild(imgFilm);
                divFilmInfo.appendChild(divBtn);
                divFilm.appendChild(h6Name);
                divFilm.appendChild(divFilmInfo);

                document.getElementById("film-for-select-schedule").appendChild(divFilm);

            }
        })
        .catch(error => console.error(error));
}

function getDayOfWeek(date) {
    const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    return daysOfWeek[date.getDay()];
}

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
}
