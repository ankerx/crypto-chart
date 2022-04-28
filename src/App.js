import { Routes, Route } from "react-router-dom";
import Main from "./Components/Main";
import Navbar from "./Components/Navbar";
import { HashRouter } from "react-router-dom";
import CoinDetails from "./Components/CoinDetails";
function App() {
  return (
    <HashRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/coindetails/:id" element={<CoinDetails />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
