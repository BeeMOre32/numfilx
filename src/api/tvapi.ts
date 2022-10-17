const API_KEY = "db9c87e46d9712a85cc583ce85257968";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getTopRatingTv() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko&page=1&region=kr`
  ).then((res) => res.json());
}

export function getAirTodayTv() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko&page=1&region=kr`
  ).then((res) => res.json());
}

export function getPopularTv() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko&page=1&region=kr`
  ).then((res) => res.json());
}

export function getDetailsTv(id: string | undefined) {
  return fetch(
    `${BASE_PATH}/tv/${id}?api_key=${API_KEY}&language=ko&page=1&region=kr`
  ).then((res) => res.json());
}
