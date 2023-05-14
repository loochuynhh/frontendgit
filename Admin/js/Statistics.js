// var URLSTATISTIC = "https://localhost:44308/api/statistic?year=";
// const token = localStorage.getItem('token');
var chartRevenueByMonth = null;
var chartRevenueByFilm = null;
var chartRevenueBySeatType = null;
var chartRevenueBySeatStatus = null;
document.getElementById('yearpicker').value = new Date().getFullYear();  

window.onload = loadRevenueByMonth(); 

function loadRevenueByMonth() {
    generateCalendar();
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;

    var selectedYear = parseInt(document.getElementById('yearpicker').value);
    // console.log(selectedYear); 
    var months = [];
    if (selectedYear < currentYear) {
        for (var i = 1; i <= 12; i++) {
            months.push("Tháng " + i);
        }
    }
    if (selectedYear === currentYear) {
        for (var i = 1; i <= currentMonth; i++) {
            months.push("Tháng " + i);
        }
    }
    // console.log("m",months);  
    if (months.length !== 0) {
        // var URLSTATISTIC = "";
        URLSTATISTIC = "https://localhost:44308/api/statistic?year=" + document.getElementById('yearpicker').value;
        console.log(URLSTATISTIC);

        fetch(URLSTATISTIC, {
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
                console.log(data);
                var revenue = []
                for (let i = 0; i < months.length; i++) {
                    revenue.push(data.monthlyRevenue[i]);
                }
                console.log("month",revenue)
                var chartData = {
                    labels: months,
                    datasets: [{
                        label: "Doanh thu (VNĐ)",
                        data: revenue
                    }]
                }
                var options = {
                    responsive: true,
                    // maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                };
                var ctx = document.getElementById("revenueByMonth").getContext("2d");
                if (window.chartRevenueByMonth) {
                    window.chartRevenueByMonth.destroy();
                }
                chartRevenueByMonth = new Chart(ctx, {
                    type: "line",
                    data: chartData,
                    options: options
                });
                loadRevenueByFilm();
                loadRevenueBySeatType();
                loadRevenueBySeatStatus()

            })
            .catch(error => console.error(error));
    } else {
        if (window.chartRevenueByMonth) {
            window.chartRevenueByMonth.destroy();
        }
    }
}
function generateCalendar() {
    year = parseInt(document.getElementById('yearpicker').value) 

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var monthpickers = document.getElementsByClassName('monthpicker');

    // Xóa các option cũ
    for (var i = 0; i < monthpickers.length; i++) {
        monthpickers[i].innerHTML = '';
        if (year < currentYear) {
            for (var j = 1; j <= 12; j++) {
                var option = document.createElement('option');
                option.value = j;
                option.text = 'Tháng ' + j;
                monthpickers[i].appendChild(option);
            }
            monthpickers[i].value = 1;
        }
        if (year === currentYear) {
            for (var j = 1; j <= currentMonth; j++) {
                var option = document.createElement('option');
                option.value = j;
                option.text = 'Tháng ' + j;
                monthpickers[i].appendChild(option);
            }
            monthpickers[i].value = currentMonth;
        }
    }
}

function loadRevenueByFilm() {
    URLSTATISTIC = "https://localhost:44308/api/statistic?year=" + document.getElementById('yearpicker').value;
    console.log(URLSTATISTIC);

    fetch(URLSTATISTIC, {
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
            console.log("film", data.filmRevenue[document.getElementById("monthPickerForFilm").value - 1]);
            var keys = Object.keys(data.filmRevenue[document.getElementById("monthPickerForFilm").value - 1]);
            console.log("key", keys)
            var filteredKeys = keys.filter(function (key) {
                return key !== "undefined";
            });

            var filmnames = filteredKeys; // Mảng chứa các giá trị "cc", "duy"

            var filmvalues = filteredKeys.map(function (key) {
                return data.filmRevenue[document.getElementById("monthPickerForFilm").value - 1][key];
            }); // Mảng chứa các giá trị 520000, 150000

            console.log(filmnames); // Output: ["cc", "duy"]
            console.log(filmvalues); // Output: [520000, 150000] 

            var chartData = {
                labels: filmnames,
                datasets: [{
                    label: "Số vé được đặt",
                    backgroundColor: "rgba(75, 192, 100, 1)",
                    data: filmvalues
                }]
            }
            var options = {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            };
            var ctx = document.getElementById("revenueByFilm").getContext("2d");
            if (window.chartRevenueByFilm) {
                window.chartRevenueByFilm.destroy();
            }
            chartRevenueByFilm = new Chart(ctx, {
                type: "bar",
                data: chartData,
                options: options
            });

        })
        .catch(error => console.error(error));
}

function loadRevenueBySeatType() { 
    URLSTATISTIC = "https://localhost:44308/api/statistic?year=" + document.getElementById('yearpicker').value;
    console.log(URLSTATISTIC);

    fetch(URLSTATISTIC, {
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

            var revenue = []
            revenue.push(data.seatRevenue.VIP);
            revenue.push(data.seatRevenue.Đôi);
            revenue.push(data.seatRevenue.Thường);

            console.log("seat",revenue); 
            var chartData = {
                labels: ["VIP", "Đôi", "Thường"],
                datasets: [{
                    label: "Doanh thu (VNĐ)",
                    data: revenue
                }]
            }
            var options = {
                responsive: true, 
                plugins: {
                    legend: {
                        position: 'right', 
                    },
                    // title: {
                    //     display: true,
                    //     text: 'Chart.js Pie Chart'
                    // }
                }
            };
            var ctx = document.getElementById("revenueBySeatType").getContext("2d");
            if (window.chartRevenueBySeatType) {
                window.chartRevenueBySeatType.destroy();
            }
            chartRevenueBySeatType = new Chart(ctx, {
                type: "pie",
                data: chartData,
                options: options
            });

        })
        .catch(error => console.error(error)); 
}

function loadRevenueBySeatStatus() {
    URLSTATISTIC = "https://localhost:44308/api/statistic?year=" + document.getElementById('yearpicker').value;
    console.log(URLSTATISTIC);

    fetch(URLSTATISTIC, {
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

            var seatSold  = data.seatSold[document.getElementById("monthPickerForSeatStatus").value - 1];
            var seatRefund  = data.seatRefund[document.getElementById("monthPickerForSeatStatus").value - 1];

            var chartData = {
                labels: ["Vé bán", "Vé hoàn tiền"],
                datasets: [{
                    label: "Tổng số vé",
                    data: [seatSold, seatRefund]
                }]
            }
            var options = {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    }, 
                } 
            };
            var ctx = document.getElementById("revenueBySeatStatus").getContext("2d");
            if (window.chartRevenueBySeatStatus) {
                window.chartRevenueBySeatStatus.destroy();
            }
            chartRevenueBySeatStatus = new Chart(ctx, {
                type: "pie",
                data: chartData,
                options: options
            }); 
        })
        .catch(error => console.error(error));
}