const API_URL = "https://api.themoviedb.org/3/";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjMxMmIwYjkwMTlmZTQ3YWY1YjczMmMyN2EyNTZmMSIsIm5iZiI6MTc1Mzg5ODc4OS4zODMwMDAxLCJzdWIiOiI2ODhhNWYyNWY3YWU4MzI5ZTc1ODE0ZjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IZ7lvSFQiJgt2EO4tc0VhRt1JV0KtmYbA4ilIbIKWHs'
  }
};

// Helper fucntions

function createMovies (movies, container) {
  container.innerHTML = "";

  movies.forEach(movie => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.addEventListener("click", () => {
      location.hash = "#movie="+ movie.id;
    })

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + movie.poster_path);

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

function createCategories (categories, container) {
  container.innerHTML = "";

  for (const category of categories) {
      const categoryContainer = document.createElement("div");
      categoryContainer.classList.add("category-container");

      const categoryTitle = document.createElement("h3");
      categoryTitle.classList.add("category-title");
      categoryTitle.setAttribute("id", "id" + category.id);
      categoryTitle.textContent = category.name;

      categoryTitle.addEventListener("click", () => {
        location.hash ="#category=" + category.id + "-" + category.name;
      })

      categoryContainer.appendChild(categoryTitle);
      container.appendChild(categoryContainer);
    }
}

// API Calls
async function getTrendingMoviesPreview() {
    const res = await fetch(API_URL + "trending/movie/week?language=en-US", options);
    const data = await res.json();

    const movies = data.results;
    createMovies (movies, trendingMoviesPreviewList)
}

async function getCategoriesPreview() {
    const res = await fetch(API_URL + "genre/movie/list?language=en", options);
    const data = await res.json();

    const categories = data.genres;

    createCategories (categories, categoriesPreviewList)
}

async function getMoviesByCategory(id) {
  const res = await fetch(API_URL + "discover/movie?with_genres=" + id, options);
    const data = await res.json();

    const movies = data.results;
    createMovies (movies, genericSection)
}

async function getMovieBySearch (query) {
  const res = await fetch(API_URL + `search/movie?query=${query}&include_adult=false&language=en-US&page=1'`, options);
    const data = await res.json();

    const movies = data.results;
    createMovies (movies, genericSection)
}

async function getTrendingMovies() {
    const res = await fetch(API_URL + "trending/movie/week?language=en-US", options);
    const data = await res.json();

    const movies = data.results;
    createMovies (movies, genericSection)
}

async function getMovieByID(id) {
    const res = await fetch(API_URL + `movie/${id}`, options);
    const movie = await res.json();

    const movieImgURL = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgURL})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average.toFixed(1);

    createCategories(movie.genres, movieDetailCategoriesList)

    getRelatedMovies(id)
}

async function getRelatedMovies(id) {
  const res = await fetch(API_URL + `movie/${id}/recommendations`, options);
    const data = await res.json();

    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer)
}