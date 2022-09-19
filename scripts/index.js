
async function main() {
    let query = document.querySelector("#searchField").value;
    let data = await getData(query);
    append(data.Search);
}

async function getData(query) {
    let url = `https://www.omdbapi.com/?apikey=1b4a829f&s=${query}`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
}

function append(data) {
    if (!data) {
        console.log(data);
        return;
    }
    let container = document.querySelector(".result-holder");
    container.innerHTML = "";
    data.forEach((el) => {
        let img = document.createElement("img");
        img.src = el.Poster;
        let h3 = document.createElement("h3");
        h3.innerText = el.Title;

        let div = document.createElement("div");
        div.classList.add("movies-search");
        div.append(img, h3);

        container.appendChild(div);
    });
}
let repeat;
function debounce(func, delay) {
    // console.log(repeat)
    if (repeat) {
        clearTimeout(repeat);
    }
    repeat = setTimeout(function () {
        func();
    }, delay);
}

function myFocus() {
    console.log("focus");
    document.querySelector(".result-holder").classList.add("focusActive");
}

let input = document.querySelector(".search-container>input")
input.addEventListener("blur", function () {
    console.log("blur");
    document.querySelector(".result-holder").classList.remove("focusActive");
    input.value = ""
    let container = document.querySelector(".result-holder");
    container.innerHTML = "";
})




const tmdbKey = "api_key=8d161379f654c57bcc85080c93e2ac4f";
const url = "https://api.themoviedb.org/3"
const recommended_url = `${url}/discover/movie?sort_by=popularity.desc&${tmdbKey}`
const drama_url = url + "/discover/movie?with_genres=18&primary_release_year=2022&" + tmdbKey

function getRecommendedMovies(url) {
    fetch(url)
        .then(res => res.json()).then(data => {
            // console.log(data.results)
            showMovies(data.results, ".recommended-list")
            showMovies(data.results, ".recommended-list-1")
        })
}
function getDramaMovies(url) {
    fetch(url)
        .then(res => res.json()).then(data => {
            // console.log(data.results)
            showMovies(data.results, ".drama-list")
            showMovies(data.results, ".drama-list-1")
        })
}
getRecommendedMovies(recommended_url)
getDramaMovies(drama_url)

async function showMovies(data, className) {
    data.forEach(el => {
        let div = document.createElement('div')
        div.classList.add('card-container')
        let div3 = document.createElement('div')
        div3.classList.add('card')
        let img = document.createElement('img')
        img.src = `https://image.tmdb.org/t/p/original${el.poster_path}`
        img.classList.add('card-img')
        let div2 = document.createElement('div')
        div2.classList.add('card-body')
        let h2 = document.createElement("h2")
        h2.classList.add('name')
        h2.innerText = el.title
        let h6 = document.createElement("h6")
        h6.classList.add('des')
        h6.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing"
        let button = document.createElement("button")
        button.classList.add('watchlist-btn')
        button.innerText = `+   Add to Watchlist`
        div2.append(h2, h6, button)
        div3.append(img, div2)
        div.append(div3)
        document.querySelector(className).append(div)
    })
    await sliders()
}


// card sliders
function sliders() {

    let cardsContainers = document.querySelectorAll(".movie-cards")
    let preBtn = document.querySelectorAll(".pre-btn")
    let nxtBtn = document.querySelectorAll(".nxt-btn")
    cardsContainers.forEach((el, i) => {
        let containerDimensions = el.getBoundingClientRect();
        let containerWidth = containerDimensions.width;
        // console.log(containerWidth);
        nxtBtn[i].addEventListener("click", () => {
            el.scrollLeft += containerWidth - 60;
        })
        preBtn[i].addEventListener("click", () => {
            el.scrollLeft -= containerWidth - 60;

        })
    })
}
