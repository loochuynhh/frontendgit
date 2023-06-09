const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('filmId');
const URLBOOKING = "http://127.0.0.1:5502/LayoutBooking.html"

$(function () {
    $("#header").load("header.html", function () {
        $("#film-link").removeClass("text-white");
        $("#film-link").addClass("text-secondary");
    });
    $("#footer").load("footer.html");
})

const URLFILM = `https://localhost:44308/api/film/${id}`;
fetch(URLFILM)
    .then(response => response.json())
    .then(data => {
        const h2Name = document.createElement("h2");
        h2Name.classList.add("text-uppercase", "fw-bold");

        const divInfoDirector = document.getElementById("divInfoDirector");
        const divInfoActor = document.getElementById("divInfoActor");
        const divInfoGenre = document.getElementById("divInfoGenre");
        const divInfoPremiere = document.getElementById("divInfoPremiere");
        const divInfoLength = document.getElementById("divInfoLength");
        const divInfoAgeLimit = document.getElementById("divInfoAgeLimit");

        const spDirector = document.createElement("div");
        spDirector.className = "spInfo";
        const spActor = document.createElement("div");
        spActor.className = "spInfo";
        const spGenre = document.createElement("div");
        spGenre.className = "spInfo";
        const spPremiere = document.createElement("div");
        spPremiere.className = "spInfo";
        const spLength = document.createElement("div");
        spLength.className = "spInfo";
        const spAgeLimit = document.createElement("div");
        spAgeLimit.classList.add("spInfo", "fw-bold", "text-danger");

        h2Name.append(data.name);
        spDirector.append(data.director)
        spActor.append(data.actor);

        let genres = data.genres;
        let nameGenres = "";
        for (let j = 0; j < genres.length; j++) {
            if (j != genres.length - 1) nameGenres += genres[j].name + ", ";
            else nameGenres += genres[j].name;
        }
        spGenre.append(nameGenres);

        const datetimeString = data.releaseDate;
        const datetime = new Date(datetimeString);
        const day = datetime.getDate();
        const month = datetime.getMonth() + 1;
        const year = datetime.getFullYear();
        const formattedDay = (day < 10) ? '0' + day : day;
        const formattedMonth = (month < 10) ? '0' + month : month;
        const formattedDate = formattedDay + '/' + formattedMonth + '/' + year;
        spPremiere.append(formattedDate);

        spLength.append(data.length);
        if (data.ageLimit === 0) {
            spAgeLimit.append("P");
            spAgeLimit.classList.add("text-success");
        } else {
            spAgeLimit.append("C" + data.ageLimit);
        }

        const img = document.getElementById("imgFilm");
        img.src = data.posterUrl;

        divInfoDirector.appendChild(spDirector);
        divInfoActor.appendChild(spActor);
        divInfoGenre.appendChild(spGenre);
        divInfoPremiere.appendChild(spPremiere);
        divInfoLength.appendChild(spLength);
        divInfoAgeLimit.appendChild(spAgeLimit);

        document.getElementById("list-info").appendChild(h2Name);
        document.getElementById("list-info").appendChild(divInfoDirector);
        document.getElementById("list-info").appendChild(divInfoActor);
        document.getElementById("list-info").appendChild(divInfoGenre);
        document.getElementById("list-info").appendChild(divInfoPremiere);
        document.getElementById("list-info").appendChild(divInfoLength);
        document.getElementById("list-info").appendChild(divInfoAgeLimit);
        document.getElementById("content-film").innerHTML = data.content;

        const urlTrailer = data.trailer;
        document.getElementById("trailer").src = "https://www.youtube.com/embed/" + urlTrailer.substring(urlTrailer.indexOf("=") + 1);

    });
//Chuyển sang giao dịch đặt vé
function Booking() {
    window.location.href = URLBOOKING + '?filmId=' + id;
}

function formatDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('vi-VN', options);
    return formattedDate;
}
