const config = {
  application_id: "01ce0e8ec99ffcb897a1261fdb9ef3ba",
  page: 1,
  yearSince: 2010,
  yearTo: 2019
};

const links = {
  movies_api: "https://api.themoviedb.org/3/discover/movie",
  images_api_w200: "https://image.tmdb.org/t/p/w200",
  images_api_w500: "https://image.tmdb.org/t/p/w500",
  images_api_original: "https://image.tmdb.org/t/p/original",
  database_api: "http://192.168.0.126:3500"
};

module.exports = {
  config,
  links
};
