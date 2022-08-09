import { useEffect, useState } from "react";

const Account = () => {
  const [user, setUser] = useState({});
  const [usersGames, setUsersGames] = useState({});

  useEffect(() => {
    const fetchFunc = async () => {
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
    };
    fetchFunc();
  }, [setUser]);

  if (!user.displayName) {
    return (
      <>
        <h2>Echelon Gaming</h2>
      </>
    );
  }

  return <div>hello {user.displayName}</div>;
};

export default Account;

// import { useContext } from "react";
// import { AccountContext } from "./AccountContext";

// const Account = () => {
//   const { user, setUser } = useContext(AccountContext);
//   const { usersGames, setUsersGames } = useContext(AccountContext);

//   return (
//     <>
//       <div>Hello {user.displayName}</div>
//       <div></div>
//     </>
//   );
// };

// export default Account;
