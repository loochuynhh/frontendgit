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
var errorMessageglobal = '';
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

posterChange.addEventListener("change", function () {
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

function hover() {
  // Lấy danh sách tất cả các hàng trong bảng
  let rows = document.querySelectorAll('tbody tr');

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

function deleteUsers(i) {
  console.log(`${url}/${film}/${i}`);
  fetch(`${url}/${film}/${i}`, {
    method: "DELETE",
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
      if (response.status == '400') {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'THẤT BẠI',
          text: 'Phim đã có lịch chiếu', 
        })
      }
      else if (response.ok) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Xóa Phim Thành Công',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          GetFilm();
        });
      }
    })
    .catch((error) => {
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

async function updateFilm(id) {
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
  const formattedReleaseDate = releaseDate.toISOString().slice(0, 10);
  document.getElementById('updateMovieDateOfRelease').value = formattedReleaseDate;

  const checkboxes = document.querySelectorAll('#genre-list2 input[type=checkbox]');
  if (movie && movie.genres) {
    const genres = movie.genres;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      genres.forEach((genre) => {
        if (genre.id == checkbox.value) {
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
reviewImagePoster.addEventListener('click', function (event) {
  event.preventDefault();
  //const file = updateMoviePoster.files[0]; 
  if (updateMoviePoster.files && updateMoviePoster.files[0]) {
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      reviewPoster.src = reader.result;
      overlayUpdateFilm.style.display = 'none';
      overlayReview.style.display = 'block';
      reviewPoster.style.display = 'block';
      document.addEventListener("click", handleOutsideClickReviewPoster, true);
    });
    reader.readAsDataURL(updateMoviePoster.files[0]);
  } else {
    // alert('Vui lòng chọn file');
    document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
    Swal.fire({
      position: 'top',
      icon: 'warning',
      text: 'Vui lòng chọn file',
      showConfirmButton: true, 
    }).then(() => {
      document.addEventListener("click", handleOutsideClickUpdateFilm, true);
    });

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
reviewImageAdPoster.addEventListener('click', function (event) {
  event.preventDefault();
  if (updateMovieAdposter.files && updateMovieAdposter.files[0]) {
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      reviewAdPoster.src = reader.result;
      overlayUpdateFilm.style.display = 'none';
      overlayReview.style.display = 'block';
      reviewAdPoster.style.display = 'block';
      document.addEventListener("click", handleOutsideClickReviewAdPoster, true);
    });
    reader.readAsDataURL(updateMovieAdposter.files[0]);
  } else {
    document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
    Swal.fire({
      position: 'top',
      icon: 'warning',
      text: 'Vui lòng chọn file',
      showConfirmButton: true, 
    }).then(() => {
      document.addEventListener("click", handleOutsideClickUpdateFilm, true);
    });
    // Swal.fire('Vui lòng chọn file', 1500).then(() => {
    //   document.addEventListener("click", handleOutsideClickUpdateFilm, true);
    // });
  }
});

formUpdate.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (poterfile.style.display == "none") {
    const checkboxes = document.querySelectorAll('#genre-list2 input[type=checkbox]:checked');
    let isChecked = false;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        isChecked = true;
      }
    });
    if (!isChecked) {
      // alert('Vui lòng chọn ít nhất một thể loại!');
      //Swal.fire('Vui lòng chọn ít nhất 1 thể loại', 1500);
      document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
      // Swal.fire('Vui lòng chọn ít nhất 1 thể loại', 1500).then(() => {
      //   document.addEventListener("click", handleOutsideClickUpdateFilm, true);
      // });
      Swal.fire({
        position: 'top',
        icon: 'warning',
        text: 'Vui lòng chọn ít nhất 1 thể loại',
        showConfirmButton: true, 
      }).then(() => {
        document.addEventListener("click", handleOutsideClickUpdateFilm, true);
      });
  
      return;
    }
    Swal.fire({
      title: 'Lưu các chỉnh sửa',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Lưu',
      denyButtonText: `Không lưu`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
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
        const filmStatus = "AVAILABLE";

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
            'Authorization': "bearer " + localStorage.getItem('token')
          },
          body: JSON.stringify(Movie)
        })
          .then(response => {
            if (!response.ok) {
              console.log(response);
              response.text().then(errorMessage => {
                console.log(errorMessage);
                if (errorMessage == 'Can\'t update length when have show') {
                  // showAlertTimeOut("Phim đã có đặt lịch chiếu");
                  document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
                  Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'THẤT BẠI',
                    text: 'Không thể chỉnh độ dài phim khi có lịch chiếu', 
                  }).then(() => {
                    document.addEventListener("click", handleOutsideClickUpdateFilm, true);
                  });
                }
                else {
                  // showAlertTimeOut('Chỉnh sửa không thành công');
                  document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
                  Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'THẤT BẠI',
                    text: 'Chỉnh sửa phim thất bại', 
                  }).then(() => {
                    document.addEventListener("click", handleOutsideClickUpdateFilm, true);
                  });
                }
              })
              //location.reload();
              throw new Error('Đã xảy ra lỗi khi chỉnh sửa phim');
            }
            // showAlertTimeOut('Sửa phim thành công');
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Sửa phim thành công',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              GetFilm();
            });
          })
          .catch(error => {
            //location.reload();
            console.error(error);
          });
        //Swal.fire('Đã lưu', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Các thay đổi không được lưu', '', 'info')
        Swal.fire({
          position: 'top',
          icon: 'warning',
          text: 'Các thay đổi không được lưu',
          showConfirmButton: true, 
        })  
      }
    })

  }
  else {
    if (!updateMoviePoster.files || updateMoviePoster.files.length === 0) {
      // alert('Vui lòng chọn Poster');
      // Swal.fire('Vui lòng chọn ảnh Poster', 1500);
      document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
      // Swal.fire('Vui lòng chọn ảnh Poster', 1500).then(() => {
      //   document.addEventListener("click", handleOutsideClickUpdateFilm, true);
      // });
      Swal.fire({
        position: 'top',
        icon: 'warning',
        text: 'Vui lòng chọn ảnh Poster',
        showConfirmButton: true, 
      }).then(() => {
        document.addEventListener("click", handleOutsideClickUpdateFilm, true);
      });
  
      return;
    }
    if (!updateMovieAdposter.files || updateMovieAdposter.files.length === 0) {
      // alert('Vui lòng chọn ảnh AdsPoster');
      // Swal.fire('Vui lòng chọn AdsPoster', 1500);
      document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
      // Swal.fire('Vui lòng chọn AdsPoster', 1500).then(() => {
      //   document.addEventListener("click", handleOutsideClickUpdateFilm, true);
      // });
      Swal.fire({
        position: 'top',
        icon: 'warning',
        text: 'Vui lòng chọn AdsPoster',
        showConfirmButton: true, 
      }).then(() => {
        document.addEventListener("click", handleOutsideClickUpdateFilm, true);
      });
  
      return;
    }

    var check = 0;

    const formData = new FormData();
    const inputFile1 = document.querySelector('#updateMoviePoster');
    formData.append('poster', inputFile1.files[0]);

    const formData2 = new FormData();
    const inputFile2 = document.querySelector('#updateMovieAdposter');
    formData2.append('adposter', inputFile2.files[0]);

    const checkboxes = document.querySelectorAll('#genre-list2 input[type=checkbox]:checked');
    let isChecked = false;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        isChecked = true;
      }
    });
    if (!isChecked) {
      // alert('Vui lòng chọn ít nhất một thể loại!');
      // Swal.fire('Vui lòng chọn ít nhất 1 thể loại', 1500);
      document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
      // Swal.fire('Vui lòng chọn ít nhất 1 thể loại', 1500).then(() => {
      //   document.addEventListener("click", handleOutsideClickUpdateFilm, true);
      // });
      Swal.fire({
        position: 'top',
        icon: 'warning',
        text: 'Vui lòng chọn ít nhất 1 thể loại',
        showConfirmButton: true, 
      }).then(() => {
        document.addEventListener("click", handleOutsideClickUpdateFilm, true);
      });
  
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
    const filmStatus = "AVAILABLE";

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
    Swal.fire({
      title: 'Lưu các chỉnh sửa',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Lưu',
      denyButtonText: `Không lưu`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(`${url}/${film}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            'Authorization': "bearer " + localStorage.getItem('token')
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
            'Authorization': "bearer " + localStorage.getItem('token')
          },
          body: JSON.stringify(Movie)
        })
          .then(response => {
            if (!response.ok) {
              response.text().then(errorMessage => {
                errorMessageglobal = errorMessage;
              })
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
            'Authorization': "bearer " + localStorage.getItem('token')
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
            'Authorization': "bearer " + localStorage.getItem('token')
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
        console.log(check);
        if (check == 0) {
          // showAlertTimeOut('Chỉnh sửa phim thành công');
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Chỉnh sửa phim thành công',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            
            GetFilm();
          });
          //location.reload();
        } else if (check == 1) {
          if (errorMessageglobal != '') {
            //showAlertTimeOut('Phim đã đặt lịch chiếu');
            document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'THẤT BẠI',
              text: 'Phim đã đặt lịch chiếu', 
            }).then(() => {
              document.addEventListener("click", handleOutsideClickUpdateFilm, true);
            });
          }
          // showAlertTimeOut('Thông tin phim mới không hợp lệ');
          document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'THẤT BẠI',
            text: 'Thông tin phim mới không hợp lệ', 
          }).then(() => {
            document.addEventListener("click", handleOutsideClickUpdateFilm, true);
          });
          //location.reload();
        } else if (check == 2) {
          // showAlertTimeOut('Ảnh thêm vào Poster không hợp lệ')
          document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'THẤT BẠI',
            text: 'Ảnh thêm vào poster không hợp lệ', 
          }).then(() => {
            document.addEventListener("click", handleOutsideClickUpdateFilm, true);
          });
          //location.reload();
        } else {
          // showAlertTimeOut('Ảnh thêm vào AdsPoster không hợp lệ');
          document.removeEventListener("click", handleOutsideClickUpdateFilm, true);
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'THẤT BẠI',
            text: 'Ảnh thêm vào AdsPoster không hợp lệ', 
          }).then(() => {
            document.addEventListener("click", handleOutsideClickUpdateFilm, true);
          });
          //location.reload();
        }
        //Swal.fire('Đã lưu', '', 'success')
      }
      else if (result.isDenied) {
        // Swal.fire('Các thay đổi không được lưu', '', 'info')
        Swal.fire({
          position: 'top',
          icon: 'warning',
          text: 'Các thay đổi không được lưu',
          showConfirmButton: true, 
        })  
      }
    })
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
async function callApi1(Movie) {
  fetch(`${url}/${film}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      'Authorization': "bearer " + localStorage.getItem('token')
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
async function callApi2(formData) {
  fetch(`${url}/${film}/${poster}/${idglobal}`, {
    method: 'PUT',
    headers: {
      'Authorization': "bearer " + localStorage.getItem('token')
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
async function callApi3(formData3) {
  fetch(`${url}/${film}/${poster}/${idglobal}`, {
    method: 'PUT',
    headers: {
      'Authorization': "bearer " + localStorage.getItem('token')
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
GetFilm();
function GetFilm() {
  fetch(`${url}/${film}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(response => response.json())
    .then(data => {
      let tbody = document.getElementById("body-table");
      tbody.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
        let trFilmTable = document.createElement("tr");
        trFilmTable.setAttribute("data-id", data[i].id);
        let tdName = document.createElement("td");
        tdName.classList.add("text-start")
        let tdLength = document.createElement("td");
        let tdDirector = document.createElement("td");
        // tdLength.className = "tdCenter"; 
        tdLength.classList.add("tdCenter", "col-4");
        let tdFilmStatus = document.createElement("td");
        // tdFilmStatus.className = "tdCenter";
        tdFilmStatus.classList.add("tdCenter", "col-2");
        let tdDelete = document.createElement("td");
        tdDelete.className = "tdCenter";
        let btnDelete = document.createElement("button");
        btnDelete.className = "btnDelete";
        // btnDelete.className = "tdCenter";
        // btnDelete.classList.add("btn","btn-danger");
        btnDelete.innerHTML = "X";
        tdDelete.appendChild(btnDelete);
        tdName.innerHTML = data[i].name;
        tdDirector.innerHTML = data[i].director;
        tdLength.innerHTML = data[i].length;
        tdFilmStatus.innerHTML = data[i].country;
        var checkdelete = true;
        btnDelete.addEventListener("click", function () {
          checkdelete = false;
          //showAlert("Bạn có chắc chắn muốn xóa");
          Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              deleteUsers(data[i].id);
            }
            checkdelete = true;
          })
        });
        trFilmTable.addEventListener("click", function () {
          if (checkdelete == true) {
            const id = this.getAttribute("data-id");
            updateFilm(id);
          }
        });
        trFilmTable.appendChild(tdName);
        trFilmTable.appendChild(tdDirector);
        trFilmTable.appendChild(tdLength);
        trFilmTable.appendChild(tdFilmStatus);
        trFilmTable.appendChild(tdDelete);
        tbody.appendChild(trFilmTable);
      }
      hover();
    })
    .catch(error => console.error(error));
}

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
    'Authorization': "bearer " + localStorage.getItem('token')
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
      checkbox.className = 'chk-genre-film';
      const label = document.createElement('label');
      label.htmlFor = `genre-${genre.id}`;
      label.appendChild(document.createTextNode(genre.name));
      label.className = 'lb-genre-film'
      genreListDiv1.appendChild(checkbox);
      genreListDiv1.appendChild(label);
    });
  });

fetch(`${url}/${genre}`, {
  method: 'GET',
  headers: {
    'Authorization': "bearer " + localStorage.getItem('token')
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
      checkbox.className = 'chk-genre-film';
      const label = document.createElement('label');
      label.htmlFor = `genre-${genre.id}`;
      label.appendChild(document.createTextNode(genre.name));
      label.className = 'lb-genre-film';
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
    // alert('Vui lòng chọn ít nhất một thể loại!');
    // Swal.fire('Vui lòng chọn ít nhất 1 thể loại', 1500);
    document.removeEventListener("click", handleOutsideClickAddFilm, true);
      // Swal.fire('Vui lòng chọn ít nhất 1 thể loại', 1500).then(() => {
      //   document.addEventListener("click", handleOutsideClickAddFilm, true);
      // });
      Swal.fire({
        position: 'top',
        icon: 'warning',
        text: 'Vui lòng chọn ít nhất 1 thể loại',
        showConfirmButton: true, 
      }).then(() => {
        document.addEventListener("click", handleOutsideClickAddFilm, true);
      });
  
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
  const filmStatus = "AVAILABLE";
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
  formData.append('film', newMovieJson);
  formData.append('poster', inputFile1.files[0]);
  formData.append('adposter', inputFile2.files[0]);
  // formData.forEach((value, key) => {
  //       console.log(`${key}: ${value}`);
  //     });
  fetch(`${url}/${film}`, {
    method: 'POST',
    headers: {
      'Authorization': "bearer " + localStorage.getItem('token')
    },
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        
        // showAlertTimeOut('Thêm phim mới không thành công');
        document.removeEventListener("click", handleOutsideClickAddFilm, true);
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'THẤT BẠI',
          text: 'Thông tin bạn nhập vào không hợp lệ',
          // footer: '<a>Thông tin bạn nhập vào không hợp lệ</a>',
          // timer: 2000
        }).then(() => {
          document.addEventListener("click", handleOutsideClickAddFilm, true);
        });
        //location.reload();
        throw new Error('Đã xảy ra lỗi khi thêm phim mới');
      }
      // showAlertTimeOut('Thêm phim mới thành công');
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Thêm phim mới thành công',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        for (var i = 0; i < form.elements.length; i++) {
          var element = form.elements[i];
          if (element.type !== "submit" && element.type !== "button") {
            element.value = "";
          }
          var checkboxes = document.querySelectorAll('#genre-list1 input[type=checkbox]');
          checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
          });
        }
        overlay.style.display = "none";
        overlayAddFilm.style.display = "none";
        GetFilm();
      });

    })
    .catch(error => {
      //location.reload();
      console.error(error);
    });
});


