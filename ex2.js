const request = require('request-promise');

async function getMovies(title) {
  const url = `http://www.omdbapi.com/?apikey=8be02b5e&s=${title}`;

  request.get(url)
    .then((data) => {
      const promises = [];
      let movies = JSON.parse(data).Search;

      for (const movie of movies) {
        const url2 = `http://www.omdbapi.com/?apikey=8be02b5e&i=${movie.imdbID}`

        promises.push(getInfo(movies, url2));
      }

      return Promise.all(promises);
    })
    .then((data) => {
      console.log(data);
    });
}

function getInfo(list, url) {
  return request.get(url)
    .then((data) => {
      const info = JSON.parse(data);
      let moviePlus;

      for (const movie of list) {
        if (movie.imdbID === info.imdbID) {
          movie.plot = info.Plot;
          movie.actors = info.Actors;

          return movie;
        }
      }
    })
}

getMovies('Star Wars');
