import { makeImagePath } from "../utils";
import { PathMatch, useMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { getDetailsMovies } from "../api/movieapi";
import { IMovieDetails } from "../interface";
import styled from "styled-components";

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
    font-size: 1.6em;
    margin-top: 1em;
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

export default function MovieDetails() {
  const bigMovieMatch: PathMatch | null = useMatch("/movies/:id");
  const { data, isLoading } = useQuery<IMovieDetails>(
    [bigMovieMatch?.params.id, "movies"],
    () => getDetailsMovies(bigMovieMatch?.params.id)
  );

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : data ? (
        <Wrapper key={bigMovieMatch?.params.id}>
          <Poster>
            <img src={makeImagePath(data.poster_path, "w500")} alt="Detail" />
          </Poster>
          <About>
            <h2>{data.title}</h2>
            <h4>{data.original_title}</h4>
            <span className="run_time">Running Time : {data.runtime}Min</span>
            <GenresList>
              {data.genres.map((genres) => (
                <Genres>{genres.name}</Genres>
              ))}
            </GenresList>
            <h6>{data.overview}</h6>
          </About>
        </Wrapper>
      ) : (
        <span>Oops! there is an error. I Can't show details to you... 😥 </span>
      )}
    </>
  );
}
