import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./Account";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";

const App = () => {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/account" element={<Account />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
