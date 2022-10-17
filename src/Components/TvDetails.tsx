import { makeImagePath } from "../utils";
import { PathMatch, useMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { ITvDetails } from "../interface";
import styled from "styled-components";
import { getDetailsTv } from "../api/tvapi";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Poster = styled.div``;

const About = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 10px 20px;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .run_time {
    font-size: 1.2em;
    margin-top: 1em;
  }
  .number_season {
    font-size: 1.2em;
    margin-top: 1em;
  }
  .number_episode {
    font-size: 1.2em;
  }
  h2 {
    font-size: 2em;
  }
  h6 {
    margin-top: 2em;
    font-size: 1.3em;
  }
`;

const GenresList = styled.div`
  margin-top: 1em;
  display: flex;
`;

const Genres = styled.span`
  background-color: dodgerblue;
  color: black;
  border-radius: 5px;
  font-size: 1.5em;
  margin-left: 10px;
  letter-spacing: 0.5px;
  width: fit-content;
  height: 1.3em;
`;

export default function TvDetails() {
  const bigContentMatch: PathMatch | null = useMatch("/tv/:id");
  const { data, isLoading } = useQuery<ITvDetails>(
    [bigContentMatch?.params.id, "tv"],
    () => getDetailsTv(bigContentMatch?.params.id)
  );

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : data ? (
        <Wrapper key={bigContentMatch?.params.id}>
          <Poster>
            <img src={makeImagePath(data.poster_path, "w500")} alt="Detail" />
          </Poster>
          <About>
            <h2>{data.name}</h2>
            <h4>{data.original_name}</h4>
            <span className="run_time">
              에피소드 당 재생시간: {data.episode_run_time}Min
            </span>
            <GenresList>
              {data.genres.map((genres) => (
                <Genres>{genres.name}</Genres>
              ))}
            </GenresList>
            <span className="number_season">
              여태까지 방영헀던 시즌 : {data.number_of_seasons}
            </span>
            <span className="number_episode">
              여태까지 방영헀던 회차 : {data.number_of_episodes}개
            </span>
            <h6>{data.overview}</h6>
          </About>
        </Wrapper>
      ) : (
        <span>Oops! there is an error. I Can't show details to you... 😥 </span>
      )}
    </>
  );
}
