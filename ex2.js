const request = require('request-promise');

async function getMovies(title) {
  const url = `http://www.omdbapi.com/?apikey=8be02b5e&s=${title}`;

  request.get(url)
    .then((data) => {
      let movies = JSON.parse(data).Search;
      const promises = prepareReqs(movies);

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

function prepareReqs(list) {
  const arr = [];

  for (const movie of list) {
    const url2 = `http://www.omdbapi.com/?apikey=8be02b5e&i=${movie.imdbID}`;

    arr.push(getInfo(list, url2));
  }

  return arr;
}

getMovies('Star Wars');
