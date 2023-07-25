import { useEffect, useState } from "react";
import "./App.css";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Todo } from "./pages/Todo";
import { login, signup } from "./api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("loggedin")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignup = (data: any) =>
    signup(data)
      .then((data: any) => {
        localStorage.setItem("loggedin", "true");
        localStorage.setItem("access_token", data.access_token);
        setIsLoggedIn(true);
      })
      .catch(console.error);

  const handleLogin = (data: any) =>
    login(data)
      .then((data: any) => {
        localStorage.setItem("loggedin", "true");
        localStorage.setItem("access_token", data.access_token);
        setIsLoggedIn(true);
      })
      .catch(console.error);

  const handleLogout = () => {
    document.cookie = "token=";
    localStorage.removeItem("loggedin");
    setIsLoggedIn(false);
  };

  if (isLoggedIn)
    return (
      <div>
        <button className="absolute top-5 right-5" onClick={handleLogout}>
          Logout
        </button>
        <Todo />
      </div>
    );

  switch (window.location.pathname) {
    case "/login":
      return <Login onLogin={handleLogin} />;
    case "/signup":
      return <Signup onSignup={handleSignup} />;
    default:
      return <Signup onSignup={handleSignup} />;
  }
}

export default App;
