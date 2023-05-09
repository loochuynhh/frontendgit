const URLSCHEDULE = ""
window.onload = loadCalendar();

function loadCalendar() {  
    var currentDate = new Date(); 
    var nextDays = [];
    for (var i = 0; i <= 6; i++) {
        var nextDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
        nextDays.push(nextDate);
    } 
    nextDays.forEach(function (date) {
        var dayOfWeek = date.toLocaleDateString("vi-VN", { weekday: "long" } , { day: "numeric" });
        var dayOfMonth = date.getDate();
        // console.log(dayOfWeek + ", ngày " + dayOfMonth);

        const btnDayOption = document.createElement("button");
        btnDayOption.className = "btn btn-outline-secondary multiline-button mx-4 btn-sm w-100";  
        const spDayOfWeek = document.createElement("span");
        const spDayOfMonth = document.createElement("span");
        spDayOfWeek.textContent = dayOfWeek;
        spDayOfMonth.textContent = dayOfMonth.toString().padStart(2, '0');

        btnDayOption.appendChild(spDayOfWeek);
        btnDayOption.appendChild(spDayOfMonth);

        btnDayOption.addEventListener("click", function(){
            // if (this.classList.contains("selectedButton")){
            //     this.classList.remove('selectedButton')
            // }
            // else{
                const buttons = document.querySelectorAll("#day-option .btn");
                buttons.forEach(button => button.classList.remove('selectedButton'));
                this.classList.add("selectedButton");
            // }
            const daySelected = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" +  dayOfMonth.toString().padStart(2, '0'); 
            selectDay(daySelected);
        })

        document.getElementById("day-option").appendChild(btnDayOption);
    });

    document.getElementById("center-month").innerHTML = "Tháng " + (currentDate.getMonth() + 1); 
}

function selectDay(dayOfMonth){
    console.log(dayOfMonth)
}

