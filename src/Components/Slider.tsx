import { AnimatePresence, motion, Variants } from "framer-motion";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { ISliderProp } from "../interface";
import MovieDetails from "./MovieDetails";
import TvDetails from "./TvDetails";

const OverLay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const ContentModal = styled(motion.div)`
  z-index: 2;
  position: fixed;
  width: 80vw;
  height: 80vh;
  top: 12vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(p) => p.theme.black.darker};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 1em;
  overflow: hidden;
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  width: 100%;
  height: 200px;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  font-size: 2em;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

interface ICustom {
  prev: boolean;
}

const rowVar: Variants = {
  hidden: ({ prev }: ICustom) => ({
    x: prev ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: ({ prev }: ICustom) => ({
    x: prev ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

const boxVar: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,

    y: -50,
    transition: {
      delay: 0.35,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVar: Variants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.35,
      duration: 0.3,
      type: "tween",
    },
  },
};

const offSet = 6;

const LeftArrow = styled.button`
  width: 25px;
  height: 50px;
  background-color: white;
  border: none;
  z-index: 1;
  position: absolute;
  top: 40%;
  left: 0;
`;

const RightArrow = styled.button`
  width: 25px;
  height: 50px;
  background-color: white;
  border: none;
  z-index: 1;
  position: absolute;
  top: 40%;
  right: 0;
`;

const Slider = styled(motion.div)`
  margin-top: 14em;
  width: 100%;
  height: 20vh;
  position: relative;
  top: -25vh;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(p) => p.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 1rem;
  }
`;

const KindTitle = styled.span`
  position: absolute;
  left: 2vw;
  top: -70px;
  font-size: 2.5em;
`;

export default function SliderShow({ kind, data, type, keyword }: ISliderProp) {
  const bigContentMatch: PathMatch | null = useMatch(`/${type}/:id`);

  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [prev, setPrev] = useState(false);

  const toggleLeaving = () => {
    setLeaving((prevState) => !prevState);
  };
  const inCreaseIndex = () => {
    if (data) {
      if (leaving) {
        return null;
      }
      toggleLeaving();
      setPrev(false);
      const totalContent = data.results.length - 1;
      const maxIndex = Math.floor(totalContent / offSet) - 1;
      setIndex((prevState) => (prevState === maxIndex ? 0 : prevState + 1));
    }
  };

  const deCreaseIndex = () => {
    if (data) {
      if (leaving) {
        return null;
      }
      toggleLeaving();
      setPrev(true);
      const totalContent = data.results.length - 1;
      const maxIndex = Math.floor(totalContent / offSet) - 1;
      setIndex((prevState) => (prevState === 0 ? maxIndex : prevState - 1));
    }
  };

  const onBoxClick = (movieId: number) => {
    if (type === "search") {
      navigate(`/search?keyword=${keyword}/${movieId}`);
    }
    navigate(`/${type}/${movieId}`);
  };

  return (
    <Slider>
      <KindTitle>{kind}</KindTitle>
      <RightArrow onClick={inCreaseIndex}> &gt; </RightArrow>
      <LeftArrow onClick={deCreaseIndex}> &lt; </LeftArrow>
      <AnimatePresence
        custom={{ prev }}
        initial={false}
        onExitComplete={toggleLeaving}
      >
        <Row
          custom={{ prev }}
          variants={rowVar}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            type: "tween",
            duration: 0.45,
          }}
          key={index}
        >
          {data.results
            .slice(1)
            .slice(offSet * index, offSet * index + offSet)
            .map((value) =>
              value.backdrop_path ? (
                <Box
                  layoutId={value.id + kind}
                  transition={{
                    type: "tween",
                  }}
                  onClick={() => {
                    onBoxClick(value.id);
                  }}
                  variants={boxVar}
                  initial="normal"
                  whileHover="hover"
                  key={value.id}
                  bgphoto={makeImagePath(value.backdrop_path, "w500")}
                >
                  <Info variants={infoVar}>
                    <h4>{"title" in value ? value.title : value.name}</h4>
                  </Info>
                </Box>
              ) : (
                <Box
                  layoutId={value.id + kind}
                  transition={{
                    type: "tween",
                  }}
                  onClick={() => {
                    onBoxClick(value.id);
                  }}
                  variants={boxVar}
                  initial="normal"
                  whileHover="hover"
                  key={value.id}
                  bgphoto={makeImagePath("", "w500")}
                >
                  <Info variants={infoVar}>
                    <h4>{"title" in value ? value.title : value.name}</h4>
                  </Info>
                </Box>
              )
            )}
        </Row>
      </AnimatePresence>

      {bigContentMatch ? (
        type === "movies" ? (
          <AnimatePresence>
            <OverLay
              onClick={() => {
                navigate("/");
              }}
              exit={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            />
            <ContentModal
              key={bigContentMatch.params.id}
              layoutId={bigContentMatch.params.id + kind}
            >
              <MovieDetails />
            </ContentModal>
          </AnimatePresence>
        ) : type === "tv" ? (
          <AnimatePresence>
            <OverLay
              onClick={() => {
                navigate("/tv");
              }}
              exit={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            />
            <ContentModal
              key={bigContentMatch.params.id}
              layoutId={bigContentMatch.params.id + kind}
            >
              <TvDetails />
            </ContentModal>
          </AnimatePresence>
        ) : type === "search" ? (
          <AnimatePresence>
            <OverLay
              onClick={() => {
                navigate(`/search?keyword=${keyword}`);
              }}
              exit={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            />
            <ContentModal
              key={bigContentMatch.params.id}
              layoutId={bigContentMatch.params.id + kind}
            >
              <TvDetails />
            </ContentModal>
          </AnimatePresence>
        ) : (
          <span>Oops! Error!!</span>
        )
      ) : null}
    </Slider>
  );
}
