const api = "https://www.omdbapi.com/";
const apiKey = "e85267e5";

const movieContainer = document.querySelector(".movie-container");
const btnSearch = document.querySelector(".btn-search");
const btnReset = document.querySelector(".btn-reset");
const homeLinks = document.querySelectorAll(".home-icon");

const getMovieData = async function (movieTitle) {
  try {
    const response = await fetch(`${api}?t=${movieTitle}&apikey=${apiKey}`);
    const data = await response.json();
    displayMovieDetails(data);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

function displayMovieDetails(data) {
  if (data.Response === "True") {
    movieContainer.classList.remove("block");
    movieContainer.innerHTML = `
    <section class="movie-rating">
    <div class="img-container">
      <img
        src=${data.Poster}
        alt="${data.Title}"
        class="movie-img"
      />
    </div>
    <div class="rating-container">
      <p class="res-provider">
        <img
          src="img/half rating star.svg"
          alt="rating"
          width="25px"
        /><strong>IMDB: </strong>
      </p>
      <p class="res-rating"><strong>${
        data.Ratings[0]?.Value || "NA"
      }</strong></p>
      <p class="res-provider">
        <img src="img/half rating star.svg" alt="rating" width="25px" />
        <strong>Rotten Tomatoes: </strong>
      </p>
      <p class="res-rating"><strong>${
        data.Ratings[1]?.Value || "NA"
      }</strong></p>
      <p class="res-provider">
        <img
          src="img/half rating star.svg"
          alt="rating"
          width="25px"
        /><strong>Metacritic: </strong>
      </p>
      <p class="res-rating"><strong>${data.Ratings[2]?.Value || "NA"}
      </strong></p>
    </div>
  </section>
  <section class="movie-data">
    <p class="res-title">
      <strong>Title: </strong>${data.Title}
    </p>
    <p class="res-year"><strong>Year: </strong>${data.Year}</p>
    <p class="res-date"><strong>Released Date: </strong>${data.Released}</p>
    <p class="res-runtime"><strong>Runtime: </strong>${data.Runtime}</p>
    <p class="res-genre">
      <strong>Genre: </strong>${data.Genre}
    </p>
    <p class="res-director"><strong>Director: </strong>${data.Director}</p>
    <p class="res-actors">
      <strong>Actors: </strong>${data.Actors}
    </p>
    <p class="res-lang"><strong>Language: </strong>${data.Language}</p>
    <p class="res-country"><strong>Country: </strong>${data.Country}</p>
  </section>      
    `;
  } else {
    movieContainer.classList.add("block");
    movieContainer.innerHTML = `<p class="status">Movie Not Found</p>`;
  }
}

function handleSearch(event) {
  event.preventDefault();
  movieContainer.innerHTML = "";
  const inputEle = document.querySelector(".input-movie");
  const movieTitle = inputEle.value;
  getMovieData(movieTitle);
}

function handleReset(event) {
  event.preventDefault();
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  getMovieData("Joker");
});

btnSearch.addEventListener("click", handleSearch);
btnReset.addEventListener("click", handleReset);
homeLinks.forEach((link) => link.addEventListener("click", handleReset));
