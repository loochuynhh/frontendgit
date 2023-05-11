// const URLFILM = 'https://636b935c7f47ef51e13457fd.mockapi.io/product';
// const URLFILMDETAIL =  'http://127.0.0.1:5502/FilmDetails.html';
// var URLFILM = '';
// const URLFILM = 'https://localhost:44308/api/film';
var URLFILM = 'https://localhost:44308/api/film/showing';
const URLFILMDETAIL = 'http://127.0.0.1:5502/FilmDetails.html';

window.onload = function(){ 
    loadFilm(URLFILM);
}

function selectShowingFilm(event) {  
    const links = document.querySelectorAll('.status-film');
    links.forEach(function (link) {
        link.classList.remove('active-film-status');
    });  
    event.target.classList.add('active-film-status'); 

    URLFILM = "https://localhost:44308/api/film/showing";
    console.log(URLFILM);
    document.getElementById("film-list").innerHTML = "";
    loadFilm(URLFILM)
}
function selectIncomingFilm(event){
    const links = document.querySelectorAll('.status-film');
    links.forEach(function (link) {
        link.classList.remove('active-film-status');
    });  
    event.target.classList.add('active-film-status');

    URLFILM = "https://localhost:44308/api/film/incoming";
    console.log(URLFILM);
    document.getElementById("film-list").innerHTML = "";
    loadFilm(URLFILM)
}

function loadFilm(URLFILM){
    console.log(URLFILM);
    fetch(URLFILM)
    .then(response => response.json())
    .then(data => {
        // const divRow = document.createElement('div');
        // divRow.classList.add('row','float-md-start');
        console.log(data);
        let divRow = document.getElementById('film-list');

        for (let i = 0; i < data.length; i++) {

            const ulFilm = document.createElement('ul');
            ulFilm.classList.add('col-md-3', 'col-sm-6', 'col-xs-12','px-4');

            const liFilm = document.createElement('li');

            const divImage = document.createElement('div');
            const aImage = document.createElement('a');
            const imgImage = document.createElement('img');
            imgImage.className = 'poster-film';

            const divInfo = document.createElement('div');
            divInfo.className = 'divInfo';

            const divName = document.createElement('div');
            divName.classList.add('Name', 'hide-content');
            const aName = document.createElement('a');

            const divGenre = document.createElement('div');
            divGenre.className = 'hide-content';
            const sptxtGenre = document.createElement('span');
            sptxtGenre.className = 'sptxtGenre';
            sptxtGenre.textContent = 'Thể loại: ';
            const spGenre = document.createElement('span');

            const divLength = document.createElement('div');
            const spLength = document.createElement('span');
            spLength.className = 'spLength';
            const spAgeLimit = document.createElement('span');
            spAgeLimit.className = 'spAgeLimit';

            const divSchedule = document.createElement('div');
            const sptxtSchedule = document.createElement('span');
            sptxtSchedule.className = 'sptxtSchedule';
            sptxtSchedule.textContent = 'Khởi chiếu: ';
            const spDate = document.createElement('span');

            const btnBook = document.createElement('button');
            btnBook.className = 'btn-book';
            btnBook.textContent = 'ĐẶT VÉ';
            btnBook.addEventListener('click', function () {
                window.location.href = 'https://www.youtube.com/';
            });

            imgImage.src = data[i].posterUrl;
            aImage.setAttribute('href', URLFILMDETAIL + '?filmId=' + data[i].id);
            aImage.appendChild(imgImage);
            divImage.appendChild(aImage);

            divName.append(data[i].name);
            divName.addEventListener('click', function () {
                window.location.href = URLFILMDETAIL + '?filmId=' + data[i].id;
            });
            divName.appendChild(aName);

            let genres = data[i].genres;
            let nameGenres = "";
            for (let j = 0; j < genres.length; j++) {
                if (j != genres.length - 1) nameGenres += genres[j].name + ", ";
                else nameGenres += genres[j].name;
            }
            console.log(genres);
            spGenre.append(nameGenres);
            divGenre.appendChild(sptxtGenre);
            divGenre.appendChild(spGenre);

            spLength.append(data[i].length + " Phút   |");
            spAgeLimit.append("C" + data[i].ageLimit);
            divLength.appendChild(spLength);
            divLength.appendChild(spAgeLimit);

            const datetimeString = data[i].releaseDate;
            const datetime = new Date(datetimeString);
            const day = datetime.getDate();
            const month = datetime.getMonth() + 1; 
            const year = datetime.getFullYear(); 
            const formattedDay = (day < 10) ? '0' + day : day;
            const formattedMonth = (month < 10) ? '0' + month : month;
            const formattedDate = formattedDay + '/' + formattedMonth + '/' + year; 
            spDate.append(formattedDate);
            divSchedule.appendChild(sptxtSchedule);
            divSchedule.appendChild(spDate);

            divInfo.appendChild(divName);
            divInfo.appendChild(divGenre);
            divInfo.appendChild(divLength);
            divInfo.appendChild(divSchedule);

            liFilm.appendChild(divImage);
            liFilm.appendChild(divInfo);
            liFilm.appendChild(btnBook);

            ulFilm.appendChild(liFilm);

            divRow.appendChild(ulFilm);
        }
        // document.body.appendChild(divRow);
    })
    .catch(error => console.error(error));
}
 