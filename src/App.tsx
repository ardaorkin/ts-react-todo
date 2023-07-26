import { useEffect, useState } from "react";
import { Routes, Route, redirect } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Todo } from "./pages/Todo";
import { login, signup } from "./api";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignup = (data: any) =>
    signup(data)
      .then((data: any) => {
        localStorage.setItem("access_token", data.access_token);
        setIsLoggedIn(true);
        window.location.href = window.location.origin + "/todo";
      })
      .catch(console.error);

  const handleLogin = (data: any) =>
    login(data)
      .then((data: any) => {
        localStorage.setItem("access_token", data.access_token);
        setIsLoggedIn(true);
        window.location.href = window.location.origin + "/todo";
      })
      .catch(console.error);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    window.location.href = window.location.origin + "/signup";
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

  return (
    <Routes>
      <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/" element={<Signup onSignup={handleSignup} />}></Route>
    </Routes>
  );
}

export default App;
