import styled from "styled-components";
import { motion, useAnimation, useScroll, Variants } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  color: white;
  font-size: 1.5rem;
  height: 4.8rem;
  padding: 10px;
  box-sizing: border-box;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  width: 95px;
  height: 25px;
  margin-right: 3rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: red;
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Item = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.red};
  bottom: -10px;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

const Items = styled.li`
  margin-right: 1.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

const Search = styled.span`
  margin-right: 1rem;
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const logoVar: Variants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1],
    transition: {
      repeat: Infinity,
    },
  },
};

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  background-color: transparent;
  font-size: 16px;
  color: white;
  border: 1px solid ${(p) => p.theme.white.lighter};
  padding: 5px 10px 5px 30px;
  z-index: -1;
  right: 0;
`;

const navVar: Variants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: { backgroundColor: "rgba(0,0,0,1)" },
};

export default function Header() {
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("tv");
  const navAnimation = useAnimation();
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => {
    setSearchOpen((prevState) => !prevState);
  };
  const { scrollY } = useScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);
  return (
    <Nav variants={navVar} animate={navAnimation} initial="top">
      <Col>
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
          whileHover="active"
          initial="normal"
          variants={logoVar}
        >
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Item>
          <Items>
            <Link to="/">
              Home
              {homeMatch && <Circle layoutId="circle" />}
            </Link>
          </Items>
          <Items>
            <Link to="/tv">
              Tv Shows
              {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Items>
        </Item>
      </Col>
      <Col>
        <Search>
          <motion.svg
            animate={{ x: searchOpen ? -200 : 0 }}
            style={{ marginRight: "10px" }}
            onClick={toggleSearch}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            placeholder="Search for movie or tv show."
          ></Input>
        </Search>
      </Col>
    </Nav>
  );
}
