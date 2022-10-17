const API_KEY = "db9c87e46d9712a85cc583ce85257968";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getSearchTv(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko&page=1&query=${keyword}`
  ).then((res) => res.json());
}
export function getSearchMovie(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko&page=1&query=${keyword}`
  ).then((res) => res.json());
}
