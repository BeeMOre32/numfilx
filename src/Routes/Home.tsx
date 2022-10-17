import { useQuery } from "react-query";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IGetMoviesResult } from "../interface";
import {
  getNowPlayingMovies,
  getTopRatingMovies,
  getUpComingMovies,
} from "../api/movieapi";
import SliderShow from "../Components/Slider";

const Wrapper = styled.div`
  width: 100%;
  height: 200vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 5rem;
`;

const Overview = styled.p`
  font-size: 1.25rem;
  width: 50%;
`;

export default function Home() {
  const { data: NowplayingData, isLoading: NowplayingLoading } =
    useQuery<IGetMoviesResult>(["movie", "nowPlaying"], getNowPlayingMovies);
  const { data: TopRatingData, isLoading: TopRatingLoading } =
    useQuery<IGetMoviesResult>(["movie", "TopRating"], getTopRatingMovies);
  const { data: UpcomingData, isLoading: UpcomingLoading } =
    useQuery<IGetMoviesResult>(["movie", "Upcoming"], getUpComingMovies);

  const isLoading = NowplayingLoading || TopRatingLoading || UpcomingLoading;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              NowplayingData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{NowplayingData?.results[0].title}</Title>
            <Overview>{NowplayingData?.results[0].overview}</Overview>
          </Banner>
          <SliderShow
            type={"movies"}
            kind={"Now playing"}
            data={NowplayingData!}
          />
          <SliderShow
            type={"movies"}
            kind={"Top Rating"}
            data={TopRatingData!}
          />
          <SliderShow type={"movies"} kind={"UpComing"} data={UpcomingData!} />
        </>
      )}
    </Wrapper>
  );
}
