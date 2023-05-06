const currentMonth = new Date().getMonth() + 1;

const currentDate = new Date();
const daysOfWeek = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
const dayOfWeek = daysOfWeek[currentDate.getDay()];

document.getElementById("month").textContent = "Tháng " + currentMonth;
document.getElementById("day").textContent = "Ngày " + currentDate.getDate();
document.getElementById("dayofweek").textContent = dayOfWeek;