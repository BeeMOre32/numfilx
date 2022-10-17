import { useQuery } from "react-query";
import { getAirTodayTv, getPopularTv, getTopRatingTv } from "../api/tvapi";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import { ITvResult } from "../interface";
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

export default function Tv() {
  const { data: TopRateTv, isLoading: TopRateLoading } = useQuery<ITvResult>(
    ["TopRate", "tv"],
    getTopRatingTv
  );
  const { data: AirTodayTv, isLoading: AirTodayLoading } = useQuery<ITvResult>(
    ["AirToday", "tv"],
    getAirTodayTv
  );
  const { data: PopularTv, isLoading: PopularLoading } = useQuery<ITvResult>(
    ["Popular", "tv"],
    getPopularTv
  );

  const isLoading = TopRateLoading || AirTodayLoading || PopularLoading;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(TopRateTv?.results[0].backdrop_path || "")}
          >
            <Title>{TopRateTv?.results[0].name}</Title>
            <Overview>{TopRateTv?.results[0].overview}</Overview>
          </Banner>
          <SliderShow type={"tv"} kind={"Top Rate"} data={TopRateTv!} />
          <SliderShow type={"tv"} kind={"Air Today"} data={AirTodayTv!} />
          <SliderShow type={"tv"} kind={"Popular"} data={PopularTv!} />
        </>
      )}
    </Wrapper>
  );
}
