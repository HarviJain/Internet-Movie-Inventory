const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieBox = document.querySelector("#movie-box");
const search = document.querySelector("#search");
const prevPage = document.querySelector("#prevPage");
const nextPage = document.querySelector("#nextPage");
const currentPageSpan = document.querySelector("#currentPage");

let currentPage = 1;

const getMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results);
};

const showMovies = (movies) => {
    movieBox.innerHTML = "";
    
    movies.forEach((movie) => {
        const { poster_path, original_title, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("box");
        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="${original_title}" loading="lazy">
            <div class="overlay">
                <div class="title">
                    <h2>${original_title}</h2>
                    <span>${vote_average}</span>
                </div>
                <h3>Overview:</h3>
                <p>${overview}</p>
            </div>
        `;
        movieBox.appendChild(movieEl);
    });
};

const changePage = (direction) => {
    currentPage += direction;
    if (currentPage < 1) currentPage = 1;
    currentPageSpan.textContent = currentPage;
    getMovies(APIURL + currentPage);
};

search.addEventListener("keyup", () => {
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
    } else {
        getMovies(APIURL + currentPage);
    }
});

prevPage.addEventListener("click", () => changePage(-1));
nextPage.addEventListener("click", () => changePage(1));

getMovies(APIURL + currentPage);