import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./Account";
import Favorites from "./Favorites";
import GameDetails from "./GameDetails";
import GameNews from "./GameNews";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import PageFour from "./PageFour";
import PageThree from "./PageThree";
import PageTwo from "./PageTwo";
import Pc from "./Pc";
import PsFive from "./PsFive";
import PsFour from "./PsFour";
import XboxOne from "./XboxOne";
import XboxSeries from "./XboxSeries";

const App = () => {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/game/:id" element={<GameNews />} />
          <Route exact path="/pagetwo" element={<PageTwo />} />
          <Route exact path="/pagethree" element={<PageThree />} />
          <Route exact path="/pagefour" element={<PageFour />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/pc" element={<Pc />} />
          <Route exact path="/psfive" element={<PsFive />} />
          <Route exact path="/xboxseries" element={<XboxSeries />} />
          <Route exact path="/psfour" element={<PsFour />} />
          <Route exact path="/xboxone" element={<XboxOne />} />
          <Route exact path="/gamedetails/:id" element={<GameDetails />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
