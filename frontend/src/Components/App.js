import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./Account";
import Background from "./Background";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";

const App = () => {
  const [user, setUser] = useState(null);
  const [usersGames, setUsersGames] = useState({});
  const [userStatus, setUserStatus] = useState("");
  //Fetch for gathering all needed data regarding signed in user.
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const res = await fetch("http://localhost:8000/account", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
        const data = await res.json();
        console.log({ data });
        setUser(data.user);
        setUsersGames(data.body);
      } catch (err) {
        setUserStatus("Error");
        console.log(err.stack, err.message);
      }
    };
    fetchFunc();
  }, [setUser]);
  return (
    <>
      <Router>
        <GlobalStyles />
        <Background />
        <Header user={user} usersGames={usersGames} />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route
            exact
            path="/account"
            element={<Account user={user} usersGames={usersGames} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
