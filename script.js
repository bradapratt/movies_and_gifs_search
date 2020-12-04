let newSearch = document.getElementById("newSearch");
let apiGifString = "https://api.giphy.com/v1/gifs/search?api_key=qHgXunHUffbkeuOPa1RV6M5Lc3sL0zni&q=";
let apiMovString = "https://www.omdbapi.com/?i=tt3896198&apikey=c0c4d659&s=";
let color1 = "black";
let color2 = "black";
let color3 = "black";

newSearch.onsubmit = (event) => {
    event.preventDefault();
    document.getElementById("result_container").innerHTML = "";

    let searchTerm = event.target.search.value;

    randomColorPicker();

    document.getElementById("keyword_container").innerHTML += `
    <div class="card text-center mb-3" style="width: 18rem; border-color: ${color1}; border-width: medium;">
        <div class="card-body text-dark">
          <h5 class="card-title" id="searchTerm">${searchTerm}</h5>
          <a href="#" class="btn btn-primary" id="search-movies" style="background-color: ${color2}; border-color: ${color2};">Search Movies</a>
          <a href="#" class="btn btn-primary" id="search-gifs" style="background-color: ${color3}; border-color: ${color3};">Search GIFs</a>
        </div>
    </div>`;
    newSearch.reset();
}

onclick = (event) => {
    if (event.target.matches("a#search-movies")) {
        document.getElementById("result_container").innerHTML = "";
        let term = event.target.parentNode.querySelector("#searchTerm").innerHTML;
        getMovies(term);
    } else if (event.target.matches("a#search-gifs")) {
        document.getElementById("result_container").innerHTML = "";
        let term = event.target.parentNode.querySelector("#searchTerm").innerHTML;
        getGifs(term);
    }
}

function getGifs(term) {
    axios
        .get(apiGifString + term)
        .then(function (res) {
            const gifs = res.data.data;
            let tracker = 0;

            gifs.map((gif) => {
                if (tracker < 12) {
                    const url = gif.images.downsized.url;
                    const title = gif.title;
                    const newItem = document.createElement("div");
                    randomColorPicker();
                    newItem.innerHTML = `
                    <div class="card text-center mb-3" style="width: 18rem; border-color: ${color1}; border-width: 2px;">
                        <img class="card-img-top" src="${url}" alt="Card image cap">
                        <div class="card-body text-dark">
                            <h5 class="card-title" id="searchTerm">${title}</h5>
                        </div>
                    </div>`;
                    document.querySelector("#result_container").appendChild(newItem);
                    tracker++;
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getMovies(term) {
    axios
        .get(apiMovString + term)
        .then(function (res) {
            const movs = res.data.Search;
            console.log(movs[0]);
            let tracker = 0;

            movs.map((mov) => {
                if (tracker < 12) {
                    const url = mov.Poster;
                    const title = mov.Title;
                    const newItem = document.createElement("div");
                    randomColorPicker();
                    newItem.innerHTML = `
                    <div class="card text-center mb-3" style="width: 18rem; border-color: ${color1}; border-width: 2px;">
                        <img class="card-img-top" src="${url}" alt="Card image cap">
                        <div class="card-body text-dark">
                            <h5 class="card-title" id="searchTerm">${title}</h5>
                        </div>
                    </div>`;
                    document.querySelector("#result_container").appendChild(newItem);
                    tracker++;
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function randomColorPicker() {
    let ranNum = Math.floor(Math.random() * 9 + 1); //pick a random int between 1 and 9

    switch (ranNum) {
        case 1:
            color1 = "#ED2C18";
            color2 = "#E4510F";
            color3 = "#F2A703";
            break;
        case 2:
            color1 = "#E4510F";
            color2 = "#F2A703";
            color3 = "#B8D31A";
            break;
        case 3:
            color1 = "#F2A703";
            color2 = "#B8D31A";
            color3 = "#49A07C";
            break;
        case 4:
            color1 = "#B8D31A";
            color2 = "#49A07C";
            color3 = "#04829E";
            break;
        case 5:
            color1 = "#49A07C";
            color2 = "#04829E";
            color3 = "#2564A5";
            break;
        case 6:
            color1 = "#04829E";
            color2 = "#2564A5";
            color3 = "#9A4E9F";
            break;
        case 7:
            color1 = "#2564A5";
            color2 = "#9A4E9F";
            color3 = "#D03EA0";
            break;
        case 8:
            color1 = "#9A4E9F";
            color2 = "#D03EA0";
            color3 = "#ED2C18";
            break;
        case 9:
            color1 = "#D03EA0";
            color2 = "#ED2C18";
            color3 = "#E4510F";
            break;
        default:
            color1 = "black";
    }
}