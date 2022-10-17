import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getSearchMovie, getSearchTv } from "../api/searchapi";
import { ISearchMovie, ISearchTv } from "../interface";
import styled from "styled-components";

import SliderShow from "../Components/Slider";

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin-top: 20vh;
`;

const Error = styled.h1`
  font-size: 3em;
  margin-top: 50vh;
`;

export default function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search).get("keyword");

  const { data: searchTv, isLoading: searchTvLoading } = useQuery<ISearchTv>(
    ["SearchTv", searchParams],
    () => getSearchTv(searchParams ? searchParams : "")
  );
  const { data: searchMovie, isLoading: searchMovieLoading } =
    useQuery<ISearchMovie>(["SearchMovie", searchParams], () =>
      getSearchMovie(searchParams ? searchParams : "")
    );

  const isLoading = searchTvLoading || searchMovieLoading;

  return (
    <>
      {searchParams ? (
        isLoading ? (
          <span>Loading...</span>
        ) : (
          <Wrapper>
            <SliderShow
              type={`tv`}
              kind={"키워드 내 드라마 겸색결과 "}
              data={searchTv!}
              keyword={searchParams}
            />
            <SliderShow
              type={`movies`}
              kind={"키워드 내 영화 겸색결과 "}
              data={searchMovie!}
              keyword={searchParams}
            />
          </Wrapper>
        )
      ) : (
        <Error>반드시 키워드를 검색해야합니다!</Error>
      )}
    </>
  );
}
