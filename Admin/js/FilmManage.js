const URLFILM = "https://636b935c7f47ef51e13457fd.mockapi.io/product";
fetch(URLFILM)
    .then(response => response.json())
    .then(data => {
        let tbody = document.getElementById("body-table");
        for (let i = 0; i < data.length; i++) {
            let trFilmTable = document.createElement("tr");
            let tdName = document.createElement("td"); 
            let tdLength = document.createElement("td");
            // tdLength.className = "tdCenter"; 
            tdLength.classList.add("tdCenter","col-4");
            let tdFilmStatus = document.createElement("td");
            // tdFilmStatus.className = "tdCenter";
            tdFilmStatus.classList.add("tdCenter","col-2");
            let tdDelete = document.createElement("td");
            tdDelete.className = "tdCenter";
            let btnDelete = document.createElement("button");
            btnDelete.className = "btnDelete";
            // btnDelete.className = "tdCenter";
            // btnDelete.classList.add("btn","btn-danger");
            btnDelete.innerHTML = "X";
            tdDelete.appendChild(btnDelete);

            tdName.innerHTML = data[i].Name;
            tdLength.innerHTML = data[i].Length;
            tdFilmStatus.innerHTML = data[i].FilmStatus;

            trFilmTable.appendChild(tdName);
            trFilmTable.appendChild(tdLength);
            trFilmTable.appendChild(tdFilmStatus);
            trFilmTable.appendChild(tdDelete);
            // trFilmTable.appendChild(tdDelete);

            tbody.appendChild(trFilmTable);
        }

    })
    .catch(error => console.error(error));
 