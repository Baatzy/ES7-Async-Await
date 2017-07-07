const request = require('request-promise');

async function getMovies(title) {
  const url = `http://www.omdbapi.com/?apikey=8be02b5e&s=${title}`
  let movies;

  return sendRequest(url)
    .then((data) => {
      const promises = [];

      movies = data.Search;

      for (const movie of movies) {
        const url2 = `http://www.omdbapi.com/?apikey=8be02b5e&i=${movie.imdbID}`

        promises.push(sendRequest(url2));
      }

      return Promise.all(promises);
    })
    .then((data) => {
      movies = movies.map(movie => {
        for (const dat of data) {
          if (movie.imdbID === dat.imdbID) {
            movie.plot = dat.Plot;
            movie.actors = dat.Actors;

            return movie;
          }
        }
      })

      console.log(movies)
    });
}

function sendRequest(url) {
  return request.get(url)
    .then((data) => {
      return JSON.parse(data);
    })
}

getMovies('Star Wars');
