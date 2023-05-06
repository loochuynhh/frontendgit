const URLSCHEDULE = "https://636b935c7f47ef51e13457fd.mockapi.io/Schedule"

window.onload = load();
// window.onload = click();

function load(){
    fetch(URLSCHEDULE)
    .then(response => response.json())
    .then(data => {
        let tbody = document.getElementById("body-table");
        for (let i = 0; i < data.length; i++) {
            let trFilmTable = document.createElement("tr");
            trFilmTable.addEventListener('dblclick', function () {
                click(data[i]);
            });
            let tdStartTime = document.createElement("td");
            let tdEndTime = document.createElement("td");
            // tdLength.className = "tdCenter"; 
            // tdLength.classList.add("tdCenter","col-4");
            let tdFilm = document.createElement("td");
            // tdFilmStatus.className = "tdCenter";
            // tdFilmStatus.classList.add("tdCenter","col-2");
            let tdDelete = document.createElement("td");
            // tdDelete.className = "tdCenter";
            let btnDelete = document.createElement("button");
            btnDelete.className = "btnDelete";
            // btnDelete.className = "tdCenter";
            // btnDelete.classList.add("btn","btn-danger");
            btnDelete.innerHTML = "X";
            tdDelete.appendChild(btnDelete);
            let tdRoom = document.createElement("td");

            tdStartTime.innerHTML = data[i].StartTime;
            tdEndTime.innerHTML = data[i].EndTime;
            tdFilm.innerHTML = data[i].Film;
            tdRoom.innerHTML = data[i].Room;

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
            // trFilmTable.appendChild(tdDelete);

            tbody.appendChild(trFilmTable);
        }

    })
    .catch(error => console.error(error));
}

function click(data){
    console.log(data);
}

