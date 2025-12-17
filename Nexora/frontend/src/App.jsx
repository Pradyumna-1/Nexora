import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ConditionalRendeing from "./ConditionalRendering/ConditionalRendeing";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "./Components/Navbar";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCustom from "./MyCustom";
import ParentComponet from "./LiftingStateUp/ParentComponet";
import PrivateRoute from "./routes/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });

  const handleLogin = () => {
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };
  return (
    <>
      {/* <ConditionalRendeing/> */}
      {/* <MyCustom/> */}
      {/* <ParentComponet/> */}
      <ToastContainer position="top-center" autoClose={700} />
      <BrowserRouter>
        {isAuth && (
          <UserProvider>
            <Navbar />
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </UserProvider>
        )}

        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              isAuth ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Private Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute isAuth={isAuth}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/product"
            element={
              <PrivateRoute isAuth={isAuth}>
                <Product />
              </PrivateRoute>
            }
          />

          <Route
            path="/logout"
            element={
              <PrivateRoute isAuth={isAuth}>
                <Logout onLogout={handleLogout} />
                
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
