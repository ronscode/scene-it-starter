

document.addEventListener('DOMContentLoaded', function () {
  var moviesContainer = document.getElementById('movies-container')

  function renderMovies(movieArray) {
    var movieHTML = movieArray.map(function (currentMovie) {
      console.log(currentMovie)
      return `     <!-- Single Movie -->
      <div class="col-xs-12 col-sm-6 col-md-3">
          <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
              <div class="mainflip">
                  <div class="frontside">
                      <div class="card">
                          <div class="card-body text-center">
                             <div> <p><img class=" img-fluid" src="${currentMovie.Poster}" alt="card image"></p></div>
                              <h3 class="card-title mb-2 text-truncate">${currentMovie.Title}</h3>
                              <h5>${currentMovie.Year}</h5>
                              <button class="btn btn-primary" onclick='saveToWatchlist("${currentMovie.imdbID}")'>Add Movie</button>
                          </div>
                      </div>
                  </div>
                  <div class="backside">
                      <div class="card">
                          <div class="card-body text-center mt-4">
                              <h4 class="card-title">${currentMovie.Title}</h4>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <!-- ./Single Movie -->
      
      `
    });

    return movieHTML.join('');
  }

  document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var searchString = document.getElementById('search-bar').value;
    console.log("The search value is " + searchString);

    var urlEncodedSearchString = encodeURIComponent(searchString);
    axios.get("http://www.omdbapi.com/?apikey=8e9acca9&s=" + urlEncodedSearchString
    ).then(function (response) {
      console.log(response.data.Search)
      saveMovies = response.data.Search;
      let movieHTML = renderMovies(saveMovies);
      moviesContainer.innerHTML = movieHTML;

    });
  });
});

function saveToWatchlist(imdbID) {

  var movie = saveMovies.find(function (currentMovie) {
    return currentMovie.imdbID;
  });

  console.log("The movie is " + movie)

  var watchlistJSON = localStorage.getItem('watchlist');
  var watchlist = JSON.parse(watchlistJSON);
  if (watchlist == null) {
    watchlist = [];
  }
  watchlist.push(movie)
  watchlistJSON = JSON.stringify(watchlist);
  localStorage.setItem('watchlist', watchlistJSON);
}


// <div class="col-3">
//       <div><img id="movieImage" class="img-fluid mw-20" src="${currentMovie.Poster}" alt="Movie Image">
//       <div class="">
//         <h5 id="movieTitle" class="">${currentMovie.Title}</h5>
//         <p id="movieYear" class="">${currentMovie.Year}</p>
//         <button class="btn btn-primary" onclick='saveToWatchlist("${currentMovie.imdbID}")'>Add Movie</button>
//       </div></div>
//     </div>