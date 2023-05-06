const queryString = window.location.search; 
const urlParams = new URLSearchParams(queryString); 
const id = urlParams.get('filmId'); 

// Truy vấn API để lấy tên của ảnh
const URLFILM = `https://636b935c7f47ef51e13457fd.mockapi.io/product/${id}`;
fetch(URLFILM)
    .then(response => response.json())
    .then(data => { 
        
        console.log(data);
        const h2Name = document.createElement("h2");
        h2Name.classList.add("text-uppercase", "fw-bold");

        const divInfoDirector = document.createElement("div"); 
        divInfoDirector.className = "film-info"; 

        const divInfoActor = document.createElement("div"); 
        divInfoActor.className = "film-info"; 

        const divInfoGenre = document.createElement("div"); 
        divInfoGenre.className = "film-info"; 

        const divInfoPremiere = document.createElement("div"); 
        divInfoPremiere.className = "film-info"; 

        const divInfoLength = document.createElement("div"); 
        divInfoLength.className = "film-info"; 
        
        const divInfoAgeLimit = document.createElement("div"); 
        divInfoAgeLimit.className = "film-info"; 

        
        const sptxtDirector = document.createElement("span");
        sptxtDirector.className = "sptxt";
        sptxtDirector.textContent = "Đạo diễn:           ";
        const sptxtActor = document.createElement("span");
        sptxtActor.className = "sptxt";
        sptxtActor.textContent = "Diễn viên:          ";
        const sptxtGenre = document.createElement("span");
        sptxtGenre.className = "sptxt";
        sptxtGenre.textContent = "Thể loại:             ";
        const sptxtPremiere = document.createElement("span");
        sptxtPremiere.className = "sptxt";
        sptxtPremiere.textContent = "Khởi chiếu:       ";
        const sptxtLength = document.createElement("span");
        sptxtLength.className = "sptxt";
        sptxtLength.textContent = "Thời lượng:       ";
        const sptxtAgeLimit = document.createElement("span"); 
        sptxtAgeLimit.className = "sptxt";
        sptxtAgeLimit.textContent = "Giới hạn tuổi:    ";

        const spDirector = document.createElement("span");
        spDirector.className = "spInfo"; 
        const spActor = document.createElement("span");
        spActor.className = "spInfo"; 
        const spGenre = document.createElement("span");
        spGenre.className = "spInfo"; 
        const spPremiere = document.createElement("span");
        spPremiere.className = "spInfo"; 
        const spLength = document.createElement("span");
        spLength.className = "spInfo"; 
        const spAgeLimit = document.createElement("span"); 
        spAgeLimit.className = "spInfo"; 

        h2Name.append(data.Name);
        spDirector.append(data.Director)
        spActor.append(data.Actor);
        spGenre.append(data.Genre);
        spPremiere.append(data.Premiere);
        spLength.append(data.Length);
        spAgeLimit.append(data.AgeLimit);


        divInfoDirector.appendChild(sptxtDirector);
        divInfoDirector.appendChild(spDirector);

        divInfoActor.appendChild(sptxtActor);
        divInfoActor.appendChild(spActor);

        divInfoGenre.appendChild(sptxtGenre);
        divInfoGenre.appendChild(spGenre);

        divInfoPremiere.appendChild(sptxtPremiere);
        divInfoPremiere.appendChild(spPremiere);  

        divInfoLength.appendChild(sptxtLength);
        divInfoLength.appendChild(spLength);

        divInfoAgeLimit.appendChild(sptxtAgeLimit);
        divInfoAgeLimit.appendChild(spAgeLimit); 

        const img = document.getElementById("imgFilm");
        img.src = data.Poster;
        // document.getElementById("imgFilm").appendChild(data.Poster);
        document.getElementById("list-info").appendChild(h2Name);
        document.getElementById("list-info").appendChild(divInfoDirector);
        document.getElementById("list-info").appendChild(divInfoActor);
        document.getElementById("list-info").appendChild(divInfoGenre);
        document.getElementById("list-info").appendChild(divInfoPremiere);
        document.getElementById("list-info").appendChild(divInfoLength);
        document.getElementById("list-info").appendChild(divInfoAgeLimit);
    });
