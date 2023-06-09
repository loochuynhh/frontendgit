$(function () {
    $("#header").load("header.html");
    $("#footer").load("footer.html");
})

window.load = loadBill(getCurrentDate(), getCurrentDate());


$('input[name="dates"]').daterangepicker({
    opens: 'right',
    locale: {
        format: 'DD/MM/YYYY'
    }
}, function (start, end) { 
    loadBill(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
})

function loadBill(startTime, endTime) {
    var URLBILL = "https://localhost:44308/api/bill?startDate=" + startTime + "&endDate=" + endTime;
    fetch(URLBILL, {
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
            document.getElementById("tbody-bill").innerHTML = "";
            data.forEach(bill => {
                const trBill = document.createElement("tr");
                const td1 = document.createElement("td");
                td1.innerHTML = formatDate(new Date(bill.datePurchased));
                const td2 = document.createElement("td");
                td2.innerHTML = formatTime(new Date(bill.showDTO.startTime)) + " - " + formatTime(new Date(bill.showDTO.endTime));
                const td3 = document.createElement("td");
                td3.innerHTML = bill.showDTO.filmName;
                td3.className = "text-start"
                const td4 = document.createElement("td");
                td4.innerHTML = bill.showDTO.roomName;
                const td5 = document.createElement("td");
                td5.innerHTML = (bill.reservations).length;
                const td6 = document.createElement("td");
                td6.innerHTML = (bill.totalCost).toLocaleString();
                const td7 = document.createElement("td");
                if (bill.billStatus === "PAID") td7.innerHTML = "Thành Công"
                if (bill.billStatus === "REFUNDED") td7.innerHTML = "Hoàn Tiền"

                trBill.appendChild(td1);
                trBill.appendChild(td2);
                trBill.appendChild(td3);
                trBill.appendChild(td4);
                trBill.appendChild(td5);
                trBill.appendChild(td6);
                trBill.appendChild(td7);

                document.getElementById("tbody-bill").appendChild(trBill);
            });


        })
        .catch(error => console.error(error));
}
function showmore() {
    window.location.href = "/LayoutFilm.html";
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
function getCurrentDate() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var day = String(currentDate.getDate()).padStart(2, '0');
    var formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
}   