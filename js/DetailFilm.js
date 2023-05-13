const queryString = window.location.search; 
const urlParams = new URLSearchParams(queryString); 
const id = urlParams.get('filmId'); 

window.onload = setLayout();
function setLayout(){
    if (localStorage.getItem('token') != null) {
        console.log('user');
        document.getElementById('overlayUser').style.display = 'block';
        document.getElementById('overlayHome').style.display = 'none';
      } else {
        console.log('home');
        document.getElementById('overlayUser').style.display = 'none';
        document.getElementById('overlayHome').style.display = 'block';
      }
}
// Truy vấn API để lấy tên của ảnh
// const URLFILM = `https://636b935c7f47ef51e13457fd.mockapi.io/product/${id}`;
const URLFILM = `https://localhost:44308/api/film/${id}`;
fetch(URLFILM)
    .then(response => response.json())
    .then(data => {  
        console.log(data);
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
        for(let j = 0; j<genres.length; j++){
            if (j != genres.length - 1) nameGenres += genres[j].name + ", ";
            else nameGenres += genres[j].name;
        }
        spGenre.append(nameGenres); 
        
        const datetimeString = data.releaseDate;
        const datetime = new Date(datetimeString);
        const formattedDate = datetime.toLocaleDateString(); 
        spPremiere.append(formattedDate);

        spLength.append(data.length);
        spAgeLimit.append("C" + data.ageLimit);

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
