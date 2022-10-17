import { HashRouter, Route, Routes } from "react-router-dom";
import Tv from "./Routes/Tv";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Header from "./Components/Header";

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:id" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </HashRouter>
  );
}
