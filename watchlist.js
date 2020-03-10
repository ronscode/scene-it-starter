document.addEventListener('DOMContentLoaded', function () {
  var myWatchlist = localStorage.getItem('watchlist');
  var watchlistJSON = JSON.parse(myWatchlist);
  // console.log(myWatchlist)
  console.log(watchlistJSON)

  var moviesContainer = document.getElementById('movies-container')
  function renderMovies(movieArray) {
    var movieHTML = movieArray.map(function (currentMovie) {
      console.log(currentMovie)
      return `<div class="card m-2" style="width: 14rem;">
              <img id="movieImage" class="card-img-top" src="${currentMovie.Poster}" alt="Movie Image">
              <div class="card-body">
                <h5 id="movieTitle" class="card-title">${currentMovie.Title}</h5>
                <p id="movieYear" class="card-text">${currentMovie.Year}</p>
                <button class="btn btn-primary" onclick='saveToWatchlist("${currentMovie.imdbID}")'>Add Movie</button>
              </div>
            </div>`
    });
    console.log(movieHTML)
    return movieHTML.join('');
  }
  moviesContainer.innerHTML = renderMovies(watchlistJSON);
});