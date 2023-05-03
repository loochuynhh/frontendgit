const URLFILM = "https://636b935c7f47ef51e13457fd.mockapi.io/product";
const url = 'https://localhost:44308/api';
const genre = 'genre';

var addFilm = document.getElementById("addFilm");
var overlay = document.getElementById("overlay");
var overlayAddFilm = document.getElementById("overlayAddFilm")
var btCancel = document.getElementById("btCancel");
var btbtOK = document.getElementById("btOK");
const genreListDiv = document.getElementById('genre-list');

function deleteUsers(i) {
    let url = "https://636b935c7f47ef51e13457fd.mockapi.io/product" + i;
  
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // data?.map((user) => addRowJs(user));
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
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
            btnDelete.addEventListener("click", function () {
                showAlert("Are you about that?");
                btCancel.addEventListener('click', function() {
                    // Đóng modal khi nhấn Cancel
                    const modal = document.getElementById('exampleModal');
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    modalInstance.hide();
                  });
                  btOK.addEventListener('click', function() {
                    deleteUsers(i);
                  });
            });
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

function showAlert(message) {
    document.getElementById("modal-message").innerHTML = message;
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    myModal.show();
}
function handleOutsideClickAddFilm(event) {
    if (!overlayAddFilm.contains(event.target)) {
        overlay.style.display = "none";
        overlayAddFilm.style.display = "none";
        document.removeEventListener("click", handleOutsideClickAddFilm, true);
    }
}
addFilm.addEventListener("click", function () {
    overlay.style.display = "block";
    overlayAddFilm.style.display = "block";
    document.addEventListener("click", handleOutsideClickAddFilm, true);
});

console.log(localStorage.getItem('token'));

fetch(`${url}/${genre}`, {
  method: 'GET',
  headers: {
  'Authorization' : "bearer " + localStorage.getItem('token')
  }
  })
  .then(response => response.json())
  .then(genres => {
    console.log(genres);
    genres.forEach(genre => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = genre.name;
      checkbox.value = genre.id;
      checkbox.id = `genre-${genre.id}`;

      const label = document.createElement('label');
      label.htmlFor = `genre-${genre.id}`;
      label.appendChild(document.createTextNode(genre.name));

      genreListDiv.appendChild(checkbox);
      genreListDiv.appendChild(label);
    });
  });



