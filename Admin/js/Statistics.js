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
    if (selectedYear > currentYear) {
        Swal.fire({
            position: 'top',
            icon: 'warning',
            text: 'Năm thống kê không được lớn hơn năm hiện tại',
            showConfirmButton: true, 
        }).then(() => {
            location.reload();
        });
    }
    document.getElementById('yearpicker').setAttribute("max", currentYear);
    document.getElementById('yearSeatType').innerHTML = "Năm " + selectedYear; 
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
    if (months.length !== 0) { 
        URLSTATISTIC = "https://localhost:44308/api/statistic?year=" + document.getElementById('yearpicker').value; 

        fetch(URLSTATISTIC, {
            method: 'GET',
            headers: {
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
            .then(response => {
                if (response.status == '403') {
                    window.location.href = "/Forbidden.html"
                }
                if (response.status == '401') {
                    window.location.href = "/Unauthorized.html"
                }
                return response.json()
            })
            .then(data => { 
                var revenue = []
                var sumByYear = 0;
                for (let i = 0; i < months.length; i++) {
                    revenue.push(data.monthlyRevenue[i]);
                    sumByYear += data.monthlyRevenue[i];
                } 
                var chartData = {
                    labels: months,
                    datasets: [{
                        label: "Doanh thu (VNĐ)",
                        data: revenue,
                        backgroundColor: 'rgb(28, 15, 245)', // Màu nền của thanh 
                        borderRadius: Number.MAX_VALUE,
                        borderSkipped: false,
                    }]
                };

                var options = {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
                    indexAxis: 'x',
                    barThickness: 20,
                    scales: {
                        x: {
                            ticks: {
                                font: { 
                                    weight: 'bold',
                                    size: 13,
                                    color: 'black'
                                },
                            },
                        },
                        y: {
                            ticks: {
                                font: { 
                                    weight: 'bold',
                                    size: 13,
                                    color: 'black'
                                },
                            },
                        },
                    }
                };

                var ctx = document.getElementById("revenueByMonth").getContext("2d");
                if (window.chartRevenueByMonth) {
                    window.chartRevenueByMonth.destroy();
                }
                chartRevenueByMonth = new Chart(ctx, {
                    type: "bar",
                    data: chartData,
                    options: options
                });

                loadRevenueBySeatType(data);
                loadRevenueByFilm(data);
                loadRevenueBySeatStatus(data);

                document.getElementById("sumByYear").innerHTML = sumByYear.toLocaleString() + " VNĐ"; 
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
    var monthpicker = document.getElementById('monthPicker');

    monthpicker.innerHTML = '';
    if (year < currentYear) {
        for (var j = 1; j <= 12; j++) {
            var option = document.createElement('option');
            option.value = j;
            option.text = 'Tháng ' + j;
            monthpicker.appendChild(option);
        }
        monthpicker.value = 1;
    }
    if (year === currentYear) {
        for (var j = 1; j <= currentMonth; j++) {
            var option = document.createElement('option');
            option.value = j;
            option.text = 'Tháng ' + j;
            monthpicker.appendChild(option);
        }
        monthpicker.value = currentMonth;
    }
}
//2 chart ở phía dưới
function loadRevenueDetail() {
    URLSTATISTIC = "https://localhost:44308/api/statistic?year=" + document.getElementById('yearpicker').value; 

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
            loadRevenueByFilm(data);
            loadRevenueBySeatStatus(data);
        })
        .catch(error => console.error(error));
}
//chart đôi, thường, vip
function loadRevenueBySeatType(data) {
    var revenue = []
    if (data.seatRevenue.Thường !== undefined) revenue.push(data.seatRevenue.Thường);
    else revenue.push(0);
    if (data.seatRevenue.Đôi !== undefined) revenue.push(data.seatRevenue.Đôi);
    else revenue.push(0);
    if (data.seatRevenue.VIP !== undefined) revenue.push(data.seatRevenue.VIP);
    else revenue.push(0);
    var sumAllSeat = revenue[0] + revenue[1] + revenue[2]
    if (sumAllSeat !== 0) {
        pcThuong = ((revenue[0] / sumAllSeat) * 100).toFixed(1) + "%";
        pcDoi = ((revenue[1] / sumAllSeat) * 100).toFixed(1) + "%";
        pcVip = ((revenue[2] / sumAllSeat) * 100).toFixed(1) + "%";
    } 
    var chartData = {
        labels: ["Thường", "Đôi", "VIP"],
        datasets: [{
            label: "Doanh thu (VNĐ)",
            data: revenue,
            backgroundColor: ["rgb(116, 201, 143)", "rgb(78, 70, 220)", "rgb(236, 203, 82)"]
        }]
    };

    var options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            datalabels: {
                formatter: function (value, context) {
                    if (context.dataIndex === 0) {
                        return pcThuong;
                    } else if (context.dataIndex === 1) {
                        return pcDoi;
                    } else if (context.dataIndex === 2) {
                        return pcVip;
                    }
                },
                font: {
                    weight: 'bold',
                    size: 13,
                },
                color: 'white'
            }
        },

    }

    var ctx = document.getElementById("revenueBySeatType").getContext("2d");
    if (window.chartRevenueBySeatType) {
        window.chartRevenueBySeatType.destroy();
    } 
    if (revenue[0] == 0 && revenue[1] == 0 && revenue[2] == 0) {
        // document.getElementById("sumSeatType").innerHTML = "0 VNĐ"; 
    } else {
        chartRevenueBySeatType = new Chart(ctx, {
            type: "doughnut",
            data: chartData,
            options: options,
            plugins: [ChartDataLabels]
        }); 
    }
}
function loadRevenueByFilm(data) {
    var keys = Object.keys(data.filmRevenue[document.getElementById("monthPicker").value - 1]);
    //Lọc những giá trị undefined
    var filteredKeys = keys.filter(function (key) {
        return key !== "undefined";
    });

    var filmnames = filteredKeys; // Mảng chứa các giá trị tên phim

    var filmvalues = filteredKeys.map(function (key) {          // Mảng chứa các giá trị doanh thu
        return data.filmRevenue[document.getElementById("monthPicker").value - 1][key];
    }); 

    var chartData = {
        labels: filmnames,
        datasets: [{
            label: "Số vé được đặt",
            backgroundColor: "#FE6244",
            data: filmvalues
        }]
    }
    var options = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    font: { 
                        weight: 'bold',
                        size: 11,
                        color: 'black'
                    },
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    font: { 
                        weight: 'italic', 
                        size: 12,
                        color: 'black'
                    },
                },
            },
        },
        indexAxis: 'y',
        barThickness: 12,
        elements: {
            bar: {
                borderWidth: 2,
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        }
    };
    var ctx = document.getElementById("revenueByFilm").getContext("2d");
    if (window.chartRevenueByFilm) {
        window.chartRevenueByFilm.destroy();
    }
    chartRevenueByFilm = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: options,
    }); 
}
function loadRevenueBySeatStatus(data) {
    var seatSold = data.seatSold[document.getElementById("monthPicker").value - 1];
    var seatRefund = data.seatRefund[document.getElementById("monthPicker").value - 1];
    var percentSeatSold, percentSeatRefund;
    if ((seatSold + seatRefund) !== 0) {
        percentSeatSold = (seatSold / (seatSold + seatRefund) * 100).toFixed(1) + "%"
        percentSeatRefund = (seatRefund / (seatSold + seatRefund) * 100).toFixed(1) + "%"
    }
    var chartData = {
        labels: ["Vé Chiếu Thành Công", "Vé Hoàn Tiền"],
        datasets: [{
            label: "Số lượng",
            data: [seatSold, seatRefund],
            backgroundColor: ["rgb(246, 195, 68)", "rgb(64, 133, 88)"]
        }]
    }
    var options = {
        responsive: true,
        plugins: {
            legend: { 
                display: false
            },
            tooltips: {
                enabled: false
            },
            datalabels: {
                formatter: function (value, context) {
                    if (context.dataIndex === 0) {
                        return percentSeatSold;
                    } else if (context.dataIndex === 1) {
                        return percentSeatRefund;
                    }
                },
                font: {
                    weight: 'bold',
                    size: 14,
                },
                color: 'white'
            }
        }
    };
    var ctx = document.getElementById("revenueBySeatStatus").getContext("2d");
    if (window.chartRevenueBySeatStatus) {
        window.chartRevenueBySeatStatus.destroy();
    }
    chartRevenueBySeatStatus = new Chart(ctx, {
        type: "pie",
        data: chartData,
        options: options,
        plugins: [ChartDataLabels]
    });
    document.getElementById("sumSoldTicket").innerHTML = seatSold + " vé";
    document.getElementById("sumRefundTicket").innerHTML = seatRefund + " vé";
    document.getElementById("sumTicket").innerHTML = (parseInt(seatSold) + parseInt(seatRefund)).toLocaleString() + " vé";
    document.getElementById("sumFoodDrinks").innerHTML = data.foodRevenue[document.getElementById("monthPicker").value - 1].toLocaleString() + " VNĐ"
} 