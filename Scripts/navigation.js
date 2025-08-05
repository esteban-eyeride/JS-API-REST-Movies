window.addEventListener("hashchange", navigator, false)
window.addEventListener("DOMContentLoaded", navigator, false)

searchFormBtn.addEventListener("click", () => {
    
    location.hash = "#search=" + searchFormInput.value;
});

trendingBtn.addEventListener("click", () => {
    location.hash = "#trends"
});

arrowBtn.addEventListener("click", () => {
   location.hash = "";
});

function navigator () {
    console.log(location.hash)

    if (location.hash.startsWith("#trends")) {
        trendsPage()
    } else if (location.hash.startsWith("#search=")){
        searchPage()
    } else if (location.hash.startsWith("#movie=")){
        movieDetailsPage()
    } else if (location.hash.startsWith("#category=")){
        categoriesPage()
    } else {
        homePage()
    }
}

function homePage() {
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.add("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerCategoryTitle.classList.add("inactive");
    headerTitle.classList.remove("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.remove("inactive");
    categoriesPreviewList.classList.remove("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.add("inactive");

    getTrendingMoviesPreview()
    getCategoriesPreview()
    console.log ("home")
}

function trendsPage() {
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerCategoryTitle.classList.remove("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewList.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    getTrendingMovies()
    headerCategoryTitle.textContent = "tendencias";
}

function movieDetailsPage() {
    headerSection.classList.add("header-container--long");
    //headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.add("header-arrow--white");
    headerCategoryTitle.classList.add("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewList.classList.add("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.remove("inactive");

    const [_,movieId] = location.hash.split("=");
    getMovieByID(movieId)
}

function categoriesPage() {
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerCategoryTitle.classList.remove("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewList.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
    console.log ("categories");

    const [_,categoryData] = location.hash.split("=");
    const [categoryID, categoryName] = categoryData.split("-");

    headerCategoryTitle.textContent = categoryName.replace("%20", " ");

    getMoviesByCategory(categoryID)
}

function searchPage() {
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerCategoryTitle.classList.add("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewList.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    const [_,query] = location.hash.split("=");

    getMovieBySearch(query);
}
