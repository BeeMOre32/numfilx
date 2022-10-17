const API_KEY = "db9c87e46d9712a85cc583ce85257968";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getNowPlayingMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=kr`
  ).then((res) => res.json());
}

export function getTopRatingMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko&page=1`
  ).then((res) => res.json());
}

export function getUpComingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1&`
  ).then((res) => res.json());
}

export function getDetailsMovies(movieId: string | undefined) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((res) => res.json());
}
