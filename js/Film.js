const URLFILM = 'https://636b935c7f47ef51e13457fd.mockapi.io/product';

fetch(URLFILM)
    .then(response => response.json())
    .then(data => { 
        // const divRow = document.createElement('div');
        // divRow.classList.add('row','float-md-start');

        let divRow = document.getElementById('film-list');

        for (let i = 0; i < data.length; i++) {

            const ulFilm = document.createElement('ul');
            ulFilm.classList.add('col-md-3');

            const liFilm = document.createElement('li'); 

            const divImage = document.createElement('div');
            const aImage = document.createElement('a'); 
            const imgImage = document.createElement('img');

            const divInfo = document.createElement('div');
            divInfo.className = 'divInfo';

            const divName = document.createElement('div');
            divName.className = 'Name';
            const aName = document.createElement('a');  

            const divGenre = document.createElement('div');
            const sptxtGenre = document.createElement('span');
            sptxtGenre.className = 'sptxtGenre';
            sptxtGenre.textContent = 'Thể loại: ';
            const spGenre = document.createElement('span'); 

            const divLength = document.createElement('div'); 
            const spLength = document.createElement('span');
            const spAgeLimit = document.createElement('span');
            spAgeLimit.className = 'spAgeLimit';

            const divSchedule = document.createElement('div'); 
            const sptxtSchedule = document.createElement('span');
            sptxtSchedule.className = 'sptxtSchedule';
            sptxtSchedule.textContent = 'Ngày chiếu: ';
            const spDate = document.createElement('span');

            const btnBook = document.createElement('button');  
            btnBook.className = 'btn';
            btnBook.textContent = 'ĐẶT VÉ';
            btnBook.addEventListener('click', function() {
                window.location.href = 'https://www.youtube.com/';
            });

            imgImage.src = data[i].Poster;
            aImage.setAttribute('href', 'https://www.youtube.com/');
            aImage.appendChild(imgImage);
            divImage.appendChild(aImage); 
            
            divName.append(data[i].Name);
            divName.addEventListener('click', function() {
                window.location.href = 'https://www.youtube.com/';
            });
            divName.appendChild(aName);

            spGenre.append(data[i].Genre);
            divGenre.appendChild(sptxtGenre);
            divGenre.appendChild(spGenre);

            spLength.append(data[i].Length);
            spAgeLimit.append(data[i].AgeLimit);
            divLength.appendChild(spLength);
            divLength.appendChild(spAgeLimit);

            spDate.append(data[i].Schedule);
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
