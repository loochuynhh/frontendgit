const URLFILM = "https://636b935c7f47ef51e13457fd.mockapi.io/product";
const url = 'https://localhost:44308/api';
const genre = 'genre';
const addfilm = 'film';
var addFilm = document.getElementById("addFilm");
var overlay = document.getElementById("overlay");
var overlayAddFilm = document.getElementById("overlayAddFilm")
var btCancel = document.getElementById("btCancel");
var btbtOK = document.getElementById("btOK");
const genreListDiv1 = document.getElementById('genre-list1');

// form.addEventListener('submit', handleSubmit);

function showAlertTimeOut(message) {
  document.getElementById("modal-message").innerHTML = message;
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
  myModal.show();
  setTimeout(function(){
    myModal.hide();
  }, 2000);
}

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


fetch(`${url}/${genre}`, {
  method: 'GET',
  headers: {
  'Authorization' : "bearer " + localStorage.getItem('token')
  }
  })
  .then(response => response.json())
  .then(genres => {
    var a = 0;
    genres.forEach(genre => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = genre.name;
      checkbox.value = genre.id;
      checkbox.id = `genre-${genre.id}`;
      checkbox.style.marginRight = '15px';
      // checkbox.style.marginLeft = '20px';
      const label = document.createElement('label');
      label.htmlFor = `genre-${genre.id}`;
      label.appendChild(document.createTextNode(genre.name));
      // checkbox.style.marginLeft = '50px';
      label.style.width = '200px';
      // checkbox.style.marginLeft = '25px';
      genreListDiv1.appendChild(checkbox);
      genreListDiv1.appendChild(label);
    });
    
  });


// fetch(`${url}/${addfilm}`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer' +  localStorage.getItem('token')
//   },
//   body: JSON.stringify(
//     { 
//       id: 0,
//       name: Name, 
//       country: Country, 
//       length: Length, 
//       content: Content, 
//       director: Director, 
//       actor: Actor, 
//       poster: Poster,
//       trailer: Trailer,
//       filmStatus: FilmStatus,
//       ageLimit: AgeLimit, 
//       genres: Genres
//     }
//   )
// })
// .then(response => {
//   if (!response.ok) {
//     showAlertTimeOut('Đăng nhập không thành công');
//     throw new Error('Đã xảy ra lỗi khi thêm phim mới');
//   }
//   showAlertTimeOut('Đăng nhập thành công');
// })
// .catch(error => {
//   console.error(error);
// });

const form = document.querySelector('#movie-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // ngăn chặn form gửi đi và refresh trang

  // kiểm tra các trường bắt buộc
  // const requiredFields = ['name', 'country', 'actor', 'director', 'length', 'genre', 'age', 'content'];
  // const missingFields = requiredFields.filter(field => {
  //   const input = document.getElementById(field);
  //   return !input.value;
  // });

  // if (missingFields.length > 0) {
  //   alert(`Vui lòng điền đầy đủ các trường bắt buộc: ${missingFields.join(', ')}`);
  //   return; // dừng lại nếu có trường bắt buộc chưa điền
  // }

  const name = document.getElementById('name').value;
  const country = document.getElementById('country').value;
  const actor = document.getElementById('actor').value;
  const director = document.getElementById('director').value;
  const trailer = document.getElementById('trailer').value;
  const length = document.getElementById('length').value;
  const ageLimit = document.getElementById('age').value;
  const content = document.getElementById('content').value;
  const poster = document.getElementById('poster').value;
  const inputElement = document.getElementById("poster");
  const Genres = [];
  const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
  checkboxes.forEach((checkbox) => {
    Genres.push({
      id: checkbox.value,
      name: checkbox.name
    });
  });
  const ReleaseDate = document.getElementById('dateOfBirthRelease').value;
  const filmStatus = "NOSCHEDULED";

  // kiểm tra poster có được upload hay không
  // let posterUrl = '';
  // if (poster) {
  //   // nếu có thì lưu vào server và lấy url
  //   posterUrl = uploadPoster(poster);
  // }

//   // tạo object chứa thông tin phim
  const newMovie = {
    name,
    country,
    actor,
    director,
    length,
    Genres,
    ageLimit,
    content,
    trailer,
    ReleaseDate,
    filmStatus
  };
  const newMovieJson = JSON.stringify(newMovie);
  const formData = new FormData();
  const inputFile = document.querySelector('#poster');
  formData.append('film',newMovieJson);
  formData.append('poster', inputFile.files[0]);
  formData.append('adposter', inputFile.files[0]);
  formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
  fetch(`${url}/${addfilm}`, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'Authorization' : "bearer " + localStorage.getItem('token')
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      showAlertTimeOut('Thêm phim mới không thành công');
      throw new Error('Đã xảy ra lỗi khi thêm phim mới');
    }
    showAlertTimeOut('Thêm phim mới thành công');
  })
  .catch(error => {
    console.error(error);
  });
});


