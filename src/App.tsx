import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tv from "./Routes/Tv";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Header from "./Components/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}
