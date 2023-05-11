const url = 'https://localhost:44308/api';
const genre = 'genre';
const film = 'film';
const poster = 'poster';
const adsposter = 'ad-poster';

var idglobal = -1;
var addFilm = document.getElementById("addFilm");
var overlay = document.getElementById("overlay");
var overlayAddFilm = document.getElementById("overlayAddFilm");
var overlayUpdateFilm = document.getElementById("overlayUpdateFilm");
var btCancel = document.getElementById("btCancel");
var btOK = document.getElementById("btOK");
var updateMoviePoster = document.getElementById('updateMoviePoster');
var updateMovieAdposter = document.getElementById('updateMovieAdposter');

const genreListDiv1 = document.getElementById('genre-list1');
const genreListDiv2 = document.getElementById('genre-list2');
const reviewImagePoster = document.getElementById('reviewImagePoster');
const reviewImageAdPoster = document.getElementById('reviewImageAdPoster');
const form = document.querySelector('#movie-form');
const formUpdate = document.querySelector('#movieformUpdate');
const posterChange = document.getElementById("posterChange"); 
const poterfile = document.getElementById("poterfile");
const viewImagePoster = document.getElementById("viewImagePoster");
const viewImageAdPoster = document.getElementById("viewImageAdPoster");
const reviewPoster = document.getElementById("reviewPoster");
const reviewAdPoster = document.getElementById("reviewAdPoster");
const overlayReview = document.getElementById("overlayReview");

posterChange.addEventListener("change", function() {
  if (this.checked) {
    poterfile.style.display = "block";
    viewImagePoster.style.display = "none";
    viewImageAdPoster.style.display = "none";
  } else {
    poterfile.style.display = "none";
    viewImagePoster.style.display = "inline-block";
    viewImageAdPoster.style.display = "inline-block";
  }
});

addFilm.addEventListener("click", function () {
  overlay.style.display = "block";
  overlayAddFilm.style.display = "block";
  document.addEventListener("click", handleOutsideClickAddFilm, true);
});

function hover(){
  // Lấy danh sách tất cả các hàng trong bảng
  let rows = document.querySelectorAll('tr');

  // Duyệt qua từng hàng và gán sự kiện hover
  rows.forEach(row => {
    row.addEventListener('mouseover', () => {
      row.classList.add('highlight-row');
    });

    row.addEventListener('mouseout', () => {
      row.classList.remove('highlight-row');
    });
  });
}

function showAlert(message) {
  document.getElementById("modal-message").innerHTML = message;
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
  myModal.show();
}

function showAlertTimeOut(message) {
  document.getElementById("modal-message2").innerHTML = message;
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal2'), {});
  myModal.show();
  setTimeout(function(){
    myModal.hide();
  }, 800);
}

function deleteUsers(i){
  console.log(`${url}/${film}/${i}`);
  fetch(`${url}/${film}/${i}`, {
    method: "DELETE",
    headers: {
      'Authorization' : "bearer " + localStorage.getItem('token')
    },
  })
    .then(response => {
      console.log(response.status);
      if (!response.ok) {
        showAlertTimeOut('Xóa phim thất bại');
        location.reload();
        throw new Error('Đã xảy ra lỗi khi thêm phim mới');
      }
      showAlertTimeOut('Đã xóa phim');
      location.reload();
    })
    .catch((error) => {
      location.reload();
      console.error("Error:", error);
    });
}

function handleOutsideClickUpdateFilm(event) {
  if (!overlayUpdateFilm.contains(event.target)) {
      overlay.style.display = "none";
      overlayUpdateFilm.style.display = "none";
      document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
  }
}

async function getMovieById(id) {
  try {
    const response = await fetch(`${url}/${film}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.error(error);
  }
}

async function updateFilm(id){
  overlay.style.display = "block";
  overlayUpdateFilm.style.display = "block";
  document.addEventListener("click", handleOutsideClickUpdateFilm, true);

  var movie = await getMovieById(id);
  document.getElementById('updateMovieName').value = movie.name;
  document.getElementById('updateMovieCountry').value = movie.country;
  document.getElementById('updateMovieActor').value = movie.actor;
  document.getElementById('updateMovieDirector').value = movie.director;
  document.getElementById('updateMovieTrailer').value = movie.trailer;
  document.getElementById('updateMovieLength').value = movie.length;
  document.getElementById('updateMovieAge').value = movie.ageLimit;
  document.getElementById('updateMovieContent').value = movie.content;
  const releaseDate = new Date(movie.releaseDate);
  const formattedReleaseDate = releaseDate.toISOString().slice(0,10);
  document.getElementById('updateMovieDateOfRelease').value = formattedReleaseDate;
  
  const checkboxes = document.querySelectorAll('#genre-list2 input[type=checkbox]');
  if (movie && movie.genres) {
    const genres = movie.genres;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      genres.forEach((genre) => {
        if(genre.id == checkbox.value){
          checkbox.checked = true;
        }
      })
    });
  }
  viewImagePoster.addEventListener("click", function () {
    window.open(movie.posterUrl, 'Ảnh Poster');
  });
  viewImageAdPoster.addEventListener("click", function () {
    window.open(movie.adPosterUrl, 'Ảnh Poser');
  });
  idglobal = id;
}
function handleOutsideClickReviewPoster(event) {
  if (!reviewPoster.contains(event.target)) {
    overlayReview.style.display = 'none';
    reviewPoster.style.display = 'none';
    overlay.style.display = 'block';
    overlayUpdateFilm.style.display = 'block';
    document.removeEventListener("click", handleOutsideClickReviewPoster, true);
    document.addEventListener("click", handleOutsideClickUpdateFilm, true);
  }
}
reviewImagePoster.addEventListener('click', function() {
  //const file = updateMoviePoster.files[0]; 
  if (updateMoviePoster.files && updateMoviePoster.files[0]) {
    const reader = new FileReader(); 
    reader.addEventListener('load', function() {
      reviewPoster.src = reader.result;
      overlayUpdateFilm.style.display = 'none';
      overlayReview.style.display = 'block';
      reviewPoster.style.display = 'block';
      document.addEventListener("click", handleOutsideClickReviewPoster, true);
    });
    reader.readAsDataURL(updateMoviePoster.files[0]);
  } else {
    alert('Vui lòng chọn file');
  }
});
function handleOutsideClickReviewAdPoster(event) {
  if (!reviewAdPoster.contains(event.target)) {
    overlayReview.style.display = 'none';
    reviewAdPoster.style.display = 'none';
    overlay.style.display = 'block';
    overlayUpdateFilm.style.display = 'block';
    document.removeEventListener("click", handleOutsideClickReviewAdPoster, true);
    document.addEventListener("click", handleOutsideClickUpdateFilm, true);
  }
}
reviewImageAdPoster.addEventListener('click', function() {
  if (updateMovieAdposter.files && updateMovieAdposter.files[0]) {
    const reader = new FileReader(); 
    reader.addEventListener('load', function() {
      reviewAdPoster.src = reader.result;
      overlayUpdateFilm.style.display = 'none';
      overlayReview.style.display = 'block';
      reviewAdPoster.style.display = 'block';
      document.addEventListener("click", handleOutsideClickReviewAdPoster, true);
    });
    reader.readAsDataURL(updateMovieAdposter.files[0]);
  } else {
    alert('Vui lòng chọn file');
  }
});

formUpdate.addEventListener('submit', async (event) => {
  event.preventDefault();
  if(poterfile.style.display == "none"){
    const checkboxes = document.querySelectorAll('#genre-list2 input[type=checkbox]:checked');
    let isChecked = false;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        isChecked = true;
      }
    });
    if (!isChecked) {
      alert('Vui lòng chọn ít nhất một thể loại!');
      return;
    }
    const name = document.getElementById('updateMovieName').value;
    const country = document.getElementById('updateMovieCountry').value;
    const actor = document.getElementById('updateMovieActor').value;
    const director = document.getElementById('updateMovieDirector').value;
    const trailer = document.getElementById('updateMovieTrailer').value;
    const length = document.getElementById('updateMovieLength').value;
    const ageLimit = document.getElementById('updateMovieAge').value;
    const content = document.getElementById('updateMovieContent').value;
    const Genres = [];
    checkboxes.forEach((checkbox) => {
      Genres.push({
        id: checkbox.value,
        name: checkbox.name
      });
    });
    const ReleaseDate = document.getElementById('updateMovieDateOfRelease').value;
    const filmStatus = "NOSCHEDULED";

    const Movie = {
      id: idglobal,
      name,
      country,
      actor,
      director,
      length,
      Genres,
      ageLimit,
      content: content,
      trailer,
      ReleaseDate,
      filmStatus
    };
    fetch(`${url}/${film}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        'Authorization' : "bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify(Movie)
    })
    .then(response => {
      if (!response.ok) {
        showAlertTimeOut('Chỉnh sửa không thành công');
        location.reload();
        throw new Error('Đã xảy ra lỗi khi chỉnh sửa phim');
      }
      showAlertTimeOut('Sửa phim thành công');
      location.reload();
    })
    .catch(error => {
      location.reload();
      console.error(error);
    });
  }
  else{
    // const checkboxes = document.querySelectorAll('#genre-list2 input[type=checkbox]:checked');
    // let isChecked = false;
    // checkboxes.forEach((checkbox) => {
    //   if (checkbox.checked) {
    //     isChecked = true;
    //   }
    // });
    // if (!isChecked) {
    //   alert('Vui lòng chọn ít nhất một thể loại!');
    //   return;
    // }

    if (!updateMoviePoster.files || updateMoviePoster.files.length === 0) {
      alert('Vui lòng chọn ảnh Poster');
      return;
    }
    if (!updateMovieAdposter.files || updateMovieAdposter.files.length === 0) {
      alert('Vui lòng chọn ảnh AdsPoster');
      return;
    }
    // const name = document.getElementById('updateMovieName').value;
    // const country = document.getElementById('updateMovieCountry').value;
    // const actor = document.getElementById('updateMovieActor').value;
    // const director = document.getElementById('updateMovieDirector').value;
    // const trailer = document.getElementById('updateMovieTrailer').value;
    // const length = document.getElementById('updateMovieLength').value;
    // const ageLimit = document.getElementById('updateMovieAge').value;
    // const content = document.getElementById('updateMovieContent').value;
    // const Genres = [];
    // checkboxes.forEach((checkbox) => {
    //   Genres.push({
    //     id: checkbox.value,
    //     name: checkbox.name
    //   });
    // });
    // const ReleaseDate = document.getElementById('updateMovieDateOfRelease').value;
    // const filmStatus = "NOSCHEDULED";
    var check = 0;

    const formData = new FormData();
    const inputFile1 = document.querySelector('#updateMoviePoster');
    formData.append('poster', inputFile1.files[0]);
    
    const formData2 = new FormData();
    const inputFile2 = document.querySelector('#updateMovieAdposter');
    formData2.append('adposter', inputFile2.files[0]);
    // const Movie = {
    //   id: idglobal,
    //   name,
    //   country,
    //   actor,
    //   director,
    //   length,
    //   Genres,
    //   ageLimit,
    //   content,
    //   trailer,
    //   ReleaseDate,
    //   filmStatus
    // };
    const checkboxes = document.querySelectorAll('#genre-list2 input[type=checkbox]:checked');
    let isChecked = false;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        isChecked = true;
      }
    });
    if (!isChecked) {
      alert('Vui lòng chọn ít nhất một thể loại!');
      return;
    }
    const name = document.getElementById('updateMovieName').value;
    const country = document.getElementById('updateMovieCountry').value;
    const actor = document.getElementById('updateMovieActor').value;
    const director = document.getElementById('updateMovieDirector').value;
    const trailer = document.getElementById('updateMovieTrailer').value;
    const length = document.getElementById('updateMovieLength').value;
    const ageLimit = document.getElementById('updateMovieAge').value;
    const content = document.getElementById('updateMovieContent').value;
    const Genres = [];
    checkboxes.forEach((checkbox) => {
      Genres.push({
        id: checkbox.value,
        name: checkbox.name
      });
    });
    const ReleaseDate = document.getElementById('updateMovieDateOfRelease').value;
    const filmStatus = "NOSCHEDULED";

    const Movie = {
      id: idglobal,
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
    fetch(`${url}/${film}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        'Authorization' : "bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify(Movie)
    })
    .then(response => {
      if (!response.ok) {
        check = 1;
        throw new Error('Đã xảy ra lỗi khi chỉnh sửa phim');
      }
      console.log(idglobal);
      change = true;
    })
    .catch(error => {
      console.error(error);
    });


    fetch(`${url}/${film}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        'Authorization' : "bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify(Movie)
    })
    .then(response => {
      if (!response.ok) {
        check = 1;
        throw new Error('Đã xảy ra lỗi khi chỉnh sửa phim');
      }
      console.log(idglobal);
      change = true;
    })
    .catch(error => {
      check = 1;
      console.error(error);
    });

    fetch(`${url}/${film}/${poster}/${idglobal}`, {
      method: 'PUT',
      headers: {
        'Authorization' : "bearer " + localStorage.getItem('token')
      },
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        check = 2;
        throw new Error('Đã xảy ra lỗi khi thêm Poster');
      }
      console.log(idglobal);
      change = true;
    })
    .catch(error => {
      check = 2;
      console.error(error);
    });

    fetch(`${url}/${film}/${adsposter}/${idglobal}`, {
      method: 'PUT',
      headers: {
        'Authorization' : "bearer " + localStorage.getItem('token')
      },
      body: formData2
    })
    .then(response => {
      if (!response.ok) {
        check = 3;
        throw new Error('Đã xảy ra lỗi khi thêm AdsPoster');
      }
      console.log(response.status);
      change = true;
    })
    .catch(error => {
      check = 3;
      console.error(error);
    });

    if(check == 0){
      showAlertTimeOut('Chỉnh sửa phim thành công');
      location.reload();
    }else if(check == 1){
      showAlertTimeOut('Thông tin phim mới không hợp lệ');
      location.reload();
    }else if(check == 2){
      showAlertTimeOut('Ảnh thêm vào Poster không hợp lệ')
      location.reload();
    }else{
      showAlertTimeOut('Ảnh thêm vào AdsPoster không hợp lệ');
      location.reload();
    }
  }
})

async function makeApiCalls(Movie, formData, formData2) {
  
  try {
    await callApi1(Movie);
    // Xử lý kết quả của API thứ nhất

    await callApi2(formData);
    // Xử lý kết quả của API thứ hai

    await callApi3(formData2);
    // Xử lý kết quả của API thứ ba
  } catch (error) {
    // Xử lý lỗi nếu có
  }
}
async function callApi1(Movie){
  fetch(`${url}/${film}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      'Authorization' : "bearer " + localStorage.getItem('token')
    },
    body: JSON.stringify(Movie)
  })
  .then(response => {
    if (!response.ok) {
      check = 1;
      throw new Error('Đã xảy ra lỗi khi chỉnh sửa phim');
    }
    change = true;
  })
  .catch(error => {
    check = 1;
    console.error(error);
  });
}
async function callApi2(formData){
  fetch(`${url}/${film}/${poster}/${idglobal}`, {
    method: 'PUT',
    headers: {
      'Authorization' : "bearer " + localStorage.getItem('token')
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      check = 2;
      throw new Error('Đã xảy ra lỗi khi thêm Poster');
    }
    console.log(response.status);
    change = true;
  })
  .catch(error => {
    check = 2;
    console.error(error);
  });

}
async function callApi3(formData3){
  fetch(`${url}/${film}/${poster}/${idglobal}`, {
    method: 'PUT',
    headers: {
      'Authorization' : "bearer " + localStorage.getItem('token')
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      check = 2;
      throw new Error('Đã xảy ra lỗi khi thêm Poster');
    }
    console.log(response.status);
    change = true;
  })
  .catch(error => {
    check = 2;
    console.error(error);
  });

}

fetch(`${url}/${film}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(response => response.json())
  .then(data => {
    let tbody = document.getElementById("body-table");
    for (let i = 0; i < data.length; i++) {
      let trFilmTable = document.createElement("tr");
      trFilmTable.setAttribute("data-id", data[i].id);
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
      tdName.innerHTML = data[i].name;
      tdLength.innerHTML = data[i].length;
      tdFilmStatus.innerHTML = data[i].filmStatus;
      var checkdelete = true;
      btnDelete.addEventListener("click", function () {
        checkdelete = false;
        showAlert("Bạn có chắc chắn muốn xóa");
        btCancel.addEventListener('click', function() {
          const modal = document.getElementById('exampleModal');
          const modalInstance = bootstrap.Modal.getInstance(modal);
          modalInstance.hide();
        });
        btOK.addEventListener('click', function() {
          const modal = document.getElementById('exampleModal');
          const modalInstance = bootstrap.Modal.getInstance(modal);
          modalInstance.hide();
          deleteUsers(data[i].id);
        });
      });
      trFilmTable.addEventListener("click", function () {
        if(checkdelete == true){
        const id = this.getAttribute("data-id");
        updateFilm(id);
        }
      });
      trFilmTable.appendChild(tdName);
      trFilmTable.appendChild(tdLength);
      trFilmTable.appendChild(tdFilmStatus);
      trFilmTable.appendChild(tdDelete);
      tbody.appendChild(trFilmTable);
    }
    hover();
  })
  .catch(error => console.error(error));

function handleOutsideClickAddFilm(event) {
    if (!overlayAddFilm.contains(event.target)) {
        overlay.style.display = "none";
        overlayAddFilm.style.display = "none";
        document.removeEventListener("click", handleOutsideClickAddFilm, true);
    }
}

fetch(`${url}/${genre}`, {
    method: 'GET',
    headers: {
    'Authorization' : "bearer " + localStorage.getItem('token')
    }
  })
  .then(response => response.json())
  .then(genres => {
    genres.forEach(genre => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = genre.name;
      checkbox.value = genre.id;
      checkbox.id = `genre-${genre.id}`;
      checkbox.style.marginRight = '15px';
      checkbox.style.marginLeft = '30px';
      // checkbox.style.marginLeft = '20px';
      const label = document.createElement('label');
      label.htmlFor = `genre-${genre.id}`;
      label.appendChild(document.createTextNode(genre.name));
      // checkbox.style.marginLeft = '50px';
      label.style.width = '170px';
      // checkbox.style.marginLeft = '25px';
      genreListDiv1.appendChild(checkbox);
      genreListDiv1.appendChild(label);
    });
  });

fetch(`${url}/${genre}`, {
  method: 'GET',
  headers: {
  'Authorization' : "bearer " + localStorage.getItem('token')
  }
})
.then(response => response.json())
.then(genres => {
  genres.forEach(genre => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = genre.name;
    checkbox.value = genre.id;
    checkbox.id = `genre-${genre.id}`;
    checkbox.style.marginRight = '15px';
    checkbox.style.marginLeft = '30px';
    // checkbox.style.marginLeft = '20px';
    const label = document.createElement('label');
    label.htmlFor = `genre-${genre.id}`;
    label.appendChild(document.createTextNode(genre.name));
    // checkbox.style.marginLeft = '50px';
    label.style.width = '170px';
    // checkbox.style.marginLeft = '25px';
    genreListDiv2.appendChild(checkbox);
    genreListDiv2.appendChild(label);
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault(); 
  const checkboxes = document.querySelectorAll('#genre-list1 input[type=checkbox]:checked');
  let isChecked = false;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      isChecked = true;
    }
  });

  if (!isChecked) {
    alert('Vui lòng chọn ít nhất một thể loại!');
    return;
  }
  const name = document.getElementById('name').value;
  const country = document.getElementById('country').value;
  const actor = document.getElementById('actor').value;
  const director = document.getElementById('director').value;
  const trailer = document.getElementById('trailer').value;
  const length = document.getElementById('length').value;
  const ageLimit = document.getElementById('age').value;
  const content = document.getElementById('content').value;
  const Genres = [];
  checkboxes.forEach((checkbox) => {
    Genres.push({
      id: checkbox.value,
      name: checkbox.name
    });
  });
  const ReleaseDate = document.getElementById('dateOfRelease').value;
  const filmStatus = "NOSCHEDULED";
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
  const inputFile1 = document.querySelector('#poster');
  const inputFile2 = document.querySelector('#adposter');
  formData.append('film',newMovieJson);
  formData.append('poster', inputFile1.files[0]);
  formData.append('adposter', inputFile2.files[0]);
  // formData.forEach((value, key) => {
  //       console.log(`${key}: ${value}`);
  //     });
  fetch(`${url}/${film}`, {
    method: 'POST',
    headers: {
      'Authorization' : "bearer " + localStorage.getItem('token')
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      showAlertTimeOut('Thêm phim mới không thành công');
      location.reload();
      throw new Error('Đã xảy ra lỗi khi thêm phim mới');
    }
    showAlertTimeOut('Thêm phim mới thành công');
    location.reload();
  })
  .catch(error => {
    location.reload();
    console.error(error);
  });
});


